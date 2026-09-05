#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const ROOT = path.resolve(process.cwd());
const FORCE = process.argv.includes('--force');

const envFile = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
const ENV = Object.fromEntries(
  envFile
    .split('\n')
    .map((line) => line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].trim()])
);

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || ENV.VITE_SUPABASE_URL;
const API_KEY = process.env.VITE_SUPABASE_ANON_KEY || ENV.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !API_KEY) {
  console.error('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || ENV.R2_ACCOUNT_ID;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || ENV.R2_BUCKET_NAME;
const R2_API_TOKEN = process.env.R2_API_TOKEN || ENV.R2_API_TOKEN;
const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN || ENV.R2_PUBLIC_DOMAIN;

let r2Client = null;
function getR2Client() {
  if (r2Client) return r2Client;
  if (!R2_ACCOUNT_ID || !R2_API_TOKEN) {
    console.warn('R2 credentials not configured, image uploads will be skipped');
    return null;
  }
  const [accessKeyId, secretAccessKey] = R2_API_TOKEN.split(':');
  if (!accessKeyId || !secretAccessKey) {
    throw new Error('R2_API_TOKEN must be in format "access_key:secret_key"');
  }
  r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
  return r2Client;
}

const argValue = (flag) => {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : undefined;
};

let EMAIL = argValue('--email') || process.env.SUPABASE_ADMIN_EMAIL || ENV.SUPABASE_ADMIN_EMAIL;
let PASSWORD = argValue('--password') || process.env.SUPABASE_ADMIN_PASSWORD || ENV.SUPABASE_ADMIN_PASSWORD;

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.jfif': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf'
};

const uploadedUrls = new Map();

function asset(...segments) {
  return path.join(ROOT, ...segments);
}

async function signIn() {
  if (!EMAIL || !PASSWORD) {
    const rl = readline.createInterface({ input, output });
    EMAIL = (await rl.question('Admin email: ')).trim();
    PASSWORD = await rl.question('Admin password: ');
    rl.close();
  }
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD })
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Sign-in failed (${res.status}): ${body.error_description || body.msg || 'unknown error'}`);
  }
  return body.access_token;
}

async function rowCount(token, table) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
    headers: { apikey: API_KEY, Authorization: `Bearer ${token}`, Range: '0-0', Prefer: 'count=exact' }
  });
  if (!res.ok) throw new Error(`count ${table}: ${res.status} ${await res.text()}`);
  const range = res.headers.get('content-range') || '*/0';
  return Number(range.split('/')[1] ?? 0);
}

async function insertRows(token, table, rows) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify(rows)
  });
  if (!res.ok) throw new Error(`insert ${table}: ${res.status} ${await res.text()}`);
}

async function uploadAsset(token, absolutePath, destination) {
  if (uploadedUrls.has(destination)) return uploadedUrls.get(destination);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`  ! missing file, skipping: ${path.relative(ROOT, absolutePath)}`);
    return null;
  }

  const client = getR2Client();
  if (!client) {
    console.warn(`  ! R2 not configured, skipping upload: ${destination}`);
    return null;
  }

  const buffer = fs.readFileSync(absolutePath);
  const mime = MIME[path.extname(absolutePath).toLowerCase()] || 'application/octet-stream';

  await client.send(new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: destination,
    Body: buffer,
    ContentType: mime,
    CacheControl: 'public, max-age=31536000, immutable',
  }));

  const baseUrl = R2_PUBLIC_DOMAIN || `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const url = `${baseUrl}/${destination}`;
  uploadedUrls.set(destination, url);
  return url;
}

async function seedSection(token, label, table, buildRows) {
  const existing = await rowCount(token, table === 'profile' ? 'profile' : table);
  if (existing > 0 && !FORCE) {
    console.log(`- ${label}: skipped (${existing} rows already present, use --force to append)`);
    return false;
  }
  const rows = await buildRows(token);
  await insertRows(token, table, rows);
  console.log(`- ${label}: inserted ${rows.length} row${rows.length === 1 ? '' : 's'}`);
  return true;
}

const PROJECTS = [
  ['CopticTrans', 'coptic.png', 'original', null, 'https://github.com/mohamedbakhet/CopticTrans',
    "Master's graduation project, sponsored by Microsoft. Built an end-to-end AI translation app for the Coptic language: a custom OCR pipeline extracts ancient Coptic text from manuscript photos, then a neural translation model converts it — making a 2,000-year-old language accessible from a phone camera."],
  ['CardioAI', 'ocr.png', 'original', null, 'https://github.com/mohamedbakhet/Analysis-ECG-signal-for-diagnosis-severe-heart-diseases.git',
    'BSc graduation project. Deep learning system that reads raw ECG signals and classifies 14 severe heart conditions, with a second-stage model localizing myocardial infarctions. Trained and validated on public ECG datasets; my first end-to-end medical AI pipeline.'],
  ['CGAN for Fake Task Detection', 'cgen.png', 'original', null,
    'https://github.com/mohamedbakhet/CGAN-for-Fake-Task-Detection-in-Mobile-Crowdsensing-Systems-MCS-',
    'Research project combining Conditional GANs with classical ML (Random Forest, AdaBoost) for Mobile Crowdsensing systems: the CGAN synthesizes realistic fake tasks used to train detectors that flag fraudulent submissions in crowdsourced platforms.'],
  ['Arabic Sentiment Analysis', 'sentiment.png', 'original', null, 'https://github.com/mohamedbakhet/Sentiment-Analysis-in-Arabic-tweets',
    'NLP pipeline classifying Arabic tweets as positive/negative/neutral using transfer learning. Tackles what makes Arabic hard: dialect variation and informal text. Fine-tuned pre-trained transformers against classical baselines to measure the gap.'],
  ['Amazon Book Reviews Analytics', 'amazon.png', 'original', null, 'https://github.com/mohamedbakhet/Amazon-book-reviews',
    'Data product covering the full lifecycle of Amazon book-review data: dataset construction, sentiment and trend analysis, and interactive visualizations surfacing what drives customer opinion across genres.'],
  ['Data Lake on AWS EMR', 'emr.png', 'coursework', 'Udacity Data Engineering Nanodegree', 'https://github.com/mohamedbakhet/DataLake-with-AWS-EMR-',
    'ETL pipeline on AWS EMR + Spark: ingested JSON user-activity and catalog data from S3, processed it into Parquet dimensional tables, and wrote partitioned output back to S3 for analytics. Focus areas: Spark job optimization, schema-on-read, cost-aware cluster sizing.'],
  ['Cloud Data Warehouse on Redshift', 'redshift.png', 'coursework', 'Udacity Data Engineering Nanodegree', 'https://github.com/mohamedbakhet/Data-Warehouse-With-AWS-Redshift/tree/main',
    'Moved a music-streaming analytics workload to AWS Redshift: built idempotent ETL in Python that stages S3 JSON logs and song metadata into a star schema (fact songplays + dimensions), tuned distribution/distkeys for the heaviest analyst queries.'],
  ['Data Modeling with Postgres', 'postg.png', 'coursework', 'Udacity Data Engineering Nanodegree', 'https://github.com/mohamedbakhet/Data-Modeling-with-Postgres-Sparkify-',
    "Designed a Postgres star schema for song-play analytics and the Python ETL that populates it from JSON logs: fact/dimension modeling, upsert handling, and query optimization for the analytics team's listening-pattern questions."],
  ['Data Modeling with Apache Cassandra', 'cassandra.png', 'coursework', 'Udacity Data Engineering Nanodegree', 'https://github.com/mohamedbakhet/Data-Modeling-with-Apache-Cassandra',
    'Modeled Cassandra tables for high-volume song-play events, applying query-first design: one denormalized table per access pattern (session history, user playlists), with composite partition/clustering keys chosen from actual query shapes.']
];

const EXPERIENCE = [
  ['AI Delivery Engineer', 'Bexprt', 'Apr 2026 - Present · Remote', 'https://www.bexprt.com/', 'free.png',
    [
      'Transitioning Generative AI systems from proof-of-concept to production for enterprise clients.',
      'Architecting and deploying Agentic AI systems on AWS and Amazon Bedrock using RAG pipelines and multi-agent orchestration frameworks.',
      'Delivering governed, scalable AI solutions aligned with enterprise resilience and ROI requirements.'
    ]],
  ['Machine Learning Engineer', 'FORTE CLOUD', 'Jul 2023 - Apr 2026 · Hybrid', 'https://fortecloud.com/', 'forte.png',
    [
      'Built and optimized end-to-end Computer Vision pipelines (YOLO, Faster R-CNN, OpenCV) for OCR, text extraction, and edge computing (PyQt, Flask).',
      'Designed Generative AI workflows with Amazon Bedrock, AWS SageMaker, and LangChain for enterprise search and sentiment analysis.',
      'Architected scalable, cloud-native ML infrastructure across AWS services (SageMaker, EC2, S3), handling 10,000+ production requests with low latency.',
      'Monitored and optimized AWS service costs, ensuring efficient resource usage and cost-effective ML solutions.',
      'Created Proof of Concepts (POCs) with Streamlit to demonstrate the potential impact of ML models.'
    ]],
  ['Machine Learning Researcher (Intern)', 'Microsoft', 'Sep 2022 - Feb 2023', 'https://www.microsoft.com/', 'free.png',
    [
      'Led the development of CopticTrans, an AI-powered translation app preserving the endangered Coptic language.',
      'Combined Computer Vision (OCR) for manuscript text extraction with Transformer-based NLP translation models hosted on AWS.'
    ]],
  ['Teacher Assistant', 'Ain Shams University', 'Jan 2023 - Jul 2023', 'https://cis.asu.edu.eg/', 'ain.png',
    [
      'Instructed coursework in Data Cleaning, PyTorch, and core machine learning fundamentals.',
      'Supported both theoretical and practical aspects, assisting students and faculty.'
    ]],
  ['Techie Degree Trainee', 'Valeo', 'Mar 2023 - Jun 2023', 'https://www.valeo.com/en/', 'valeo.png',
    [
      'Completed a rigorous 3-month training program focusing on Embedded C, SW to HW Interfacing, Automotive Bus Technology, and AUTOSAR.',
      'Gained hands-on experience in automotive technology and embedded systems.'
    ]],
  ['Computer Vision Engineer', 'Freelance', 'Jun 2021 - Feb 2022', null, 'free.png',
    [
      'Developed a computer vision application using OCR and object detection to extract text and identify objects in images.',
      'Implemented edge deployment for local servers and devices, ensuring smooth performance through load testing and Flask.',
      'Built a user-friendly interface with PyQt, demonstrating proficiency in computer vision and application development.'
    ]]
];

const CERTIFICATIONS = [
  ['Claude Certified Architect - Foundations', 'gen.png', '#', 'Jun 2026',
    'Anthropic certification covering agentic architecture, Model Context Protocol (MCP) integration, prompt engineering, and structured output reliability for production Claude applications.'],
  ['AWS Certified Generative AI Developer - Professional', 'genpa.png', '#', 'Mar 2026',
    'Demonstrates advanced expertise in building and deploying generative AI solutions on AWS, including foundation models and scalable architectures.'],
  ['AWS Certified Data Engineer - Associate', 'awsda.png', '#', 'Feb 2026',
    'Validates skills in designing, building, and maintaining data pipelines and data solutions on AWS.'],
  ['AWS Solution Architect Associate', 'aws_sa.png', 'https://www.credly.com/badges/4343705f74e048e7bf6eb4ba4bcb3256', 'Mar 2025',
    'AWS Certified Solutions Architect - Associate demonstrates knowledge and skills in AWS technology, across a wide range of AWS services. The focus is on designing distributed systems that are cost-efficient, reliable, and scalable.'],
  ['HCCDP-AI', 'HCCDP-AI.jpeg', '#', 'Mar 2025',
    "Huawei Certified Cloud Database Professional certification in AI demonstrates expertise in Huawei's cloud AI technologies and solutions."],
  ['Associate Cloud Engineer', 'GCP.png', 'https://www.credly.com/badges/004eae16-08b7-4598-b64b-05f57170e0c0', 'Jan 2024',
    'Associate Cloud Engineers deploy applications, monitor operations, and manage enterprise solutions. They use Google Cloud Console and the command-line interface to perform common platform-based tasks to maintain one or more deployed solutions that leverage Google-managed or self-managed services on Google Cloud.'],
  ['Azure Data Scientist Associate', 'dp100.png',
    'https://learn.microsoft.com/en-us/users/mohamedbekheetabdelallmohamed-6007/credentials/245fae1f406bb43c', null,
    'Designing machine learning solutions starts with analyzing data and training models to address business needs. Next, models are optimized for deployment and integrated into production systems. Continuous monitoring and retraining ensure they remain effective over time.'],
  ['Azure AI Engineer Associate', 'ai-102.png', '#', 'May 2025',
    'Validates skills in analyzing requirements for AI solutions, designing AI infrastructure, implementing and managing AI solutions.'],
  ['AWS Certified Machine Learning – Specialty', 'aws_ml.png', 'https://www.credly.com/badges/cd7eb90a-2d06-4c38-8b2e-6efdba5e9597/public_url', 'Dec 2023',
    'Earners of this certification have an in-depth understanding of AWS machine learning (ML) services. They demonstrated ability to build, train, tune, and deploy ML models using the AWS Cloud. Badge owners can derive insight from AWS ML services using either pretrained models or custom models built from open-source frameworks.'],
  ['AWS Certified Cloud Practitioner', 'aws.png', 'https://www.credly.com/badges/61910338-f311-4a36-b24c-59bd8beb4edb', null,
    'Earners of this certification have a fundamental understanding of IT services and their uses in the AWS Cloud. They demonstrated cloud fluency and foundational AWS knowledge. Badge owners are able to identify essential AWS services necessary to set up AWS-focused projects.'],
  ['Generative AI Essentials', 'gen.png', 'https://www.credly.com/badges/f143aa60-dcf6-45e9-8b9b-a0605e5c2a9a', null,
    'Earners of this badge are individuals at AWS Partners or Amazon employees who have demonstrated a foundational knowledge of AWS Generative AI Essentials Business Skill.'],
  ['Artificial Intelligence Analyst', 'ibm.png', 'https://www.credly.com/badges/e74f838c-e9ad-4cff-b99e-2b5f50c620c6', null,
    'This badge earner has proven expertise to apply machine learning algorithms and build AI solutions by using IBM Watson. The badge earner has demonstrated advanced proficiency in topics such as AI, Natural Language Processing (NLP), chatbots, and computer vision.'],
  ['Deep Learning - Nanodegree Program', 'DL.svg', 'https://www.udacity.com/certificate/PLUG6NGS', null,
    "The Deep Learning Nanodegree program provides a comprehensive introduction to AI, covering key concepts like neural networks, CNNs, RNNs, and GANs. You'll gain practical experience by building projects in PyTorch, equipping you to advance in the field or start a new career in deep learning."]
];

const TESTIMONIALS = [
  [1, 'img1.jpeg', 'Mahmoud Yahia', 'Machine Learning Engineer', 'https://www.linkedin.com/in/mahmoud-yahia-%F0%9F%87%B5%F0%9F%87%B8-4a98a2156/',
    "Mohamed possesses a rare combination of technical prowess, creativity, and dedication that sets him apart in his field. His deep understanding of machine learning algorithms and techniques has been instrumental in tackling complex challenges and delivering innovative solutions. Whether it's developing predictive models, optimizing algorithms, or integrating AI technologies into our systems, Mohamed consistently demonstrates a remarkable level of expertise and proficiency."],
  [2, 'img2.jpeg', 'Kirolos A Ataallah', 'Computer Vision Researcher at VisionCAIR Lab at KAUST university', 'https://www.linkedin.com/in/kirolos-ataallah-631755123/',
    " worked with bekhet while studying for a master's degree in ottawa university. Bekhet is a hard worker and always have intelligent solutions for the problems. "],
  [3, 'img3.jpeg', 'Mahmoud Saeed', 'Software Engineer | Flutter Developer', 'https://www.linkedin.com/in/mahmoud--saeed/',
    'I have had the pleasure of working closely with Mohammed Bekhet during our time together at Ain Shams University. As fellow students pursuing degrees in Software Engineering and AI, Mohammed consistently impressed me with his dedication, intelligence, and passion for the field. Mohammed possesses a remarkable ability to grasp complex concepts quickly and apply them effectively in practical scenarios. Whether it was tackling challenging coding assignments or delving into advanced AI algorithms, he demonstrated a strong aptitude for problem-solving and critical thinking. What truly sets Mohammed apart is his collaborative spirit and natural leadership qualities. He not only contributed valuable insights to our group projects but also fostered a positive and supportive team environment. His willingness to help others, share knowledge, and take initiative greatly enriched our learning experience. Moreover, Mohammed exhibits a strong work ethic and a genuine enthusiasm for staying abreast of the latest advancements in technology. He eagerly took on extracurricular projects and sought out opportunities to expand his skill set, demonstrating a proactive approach to personal and professional growth. I have no doubt that Mohammed Bekheet will excel in any endeavor he pursues in the field of Software Engineering and AI. He would be a valuable asset to any team or organization, and I wholeheartedly recommend him for any opportunity that comes his way'],
  [4, 'img4.jfif', 'mohamed adel', 'Full-Stack Dot net Developer', 'https://www.linkedin.com/in/mohamed-adel-aboeldahab/',
    'Working with Mohamed has been an exceptional experience. He combines profound technical skills with innovative thinking, setting him apart in the realm of machine learning. His proficiency in analyzing intricate data sets, developing advanced algorithms, and constructing robust models is nothing short of remarkable. Beyond his technical prowess, Mohamed is an outstanding communicator and collaborator. He actively engages with feedback and works harmoniously with colleagues to reach shared objectives. His positive demeanor and readiness to assist whenever necessary have made him a crucial asset to our team. I wholeheartedly recommend Mohamed to anyone seeking a highly skilled and reliable machine learning professional.'],
  [5, 'img5.jpeg', 'Eslam Elassal', 'Business Intelligence | Big Data | Data Engineer | CDMP | AWS 2x Certified | Microsoft 1x | Denodo 1x', 'https://www.linkedin.com/in/eslamelassal/',
    'I am excited to recommend Mohamed Bekheet, with whom I had the pleasure of working on several projects during our master’s program. From the outset, he demonstrated exceptional dedication and professionalism. Mohamed played a crucial role in our projects, bringing not only his technical skills but also a collaborative spirit that made our team stronger. His expertise in Natural Language Processing (NLP) was invaluable, allowing us to tackle complex challenges with innovative solutions. One of the standout moments was when Mohamed led the development of a project that involved analyzing sentiment in social media data. He took the initiative to implement advanced NLP techniques, resulting in significant improvements in our model\'s accuracy and performance. In addition to his technical expertise, Mohamed is a fantastic problem solver. He has a remarkable ability to analyze complex problems and propose effective solutions, often thinking outside the box. His contributions not only helped us achieve our goals but also inspired the entire team to push our limits. Moreover, Mohamed is an exceptional team player. He is always willing to share his knowledge and support others, creating an inclusive and motivating environment. I wholeheartedly recommend Mohamed Bekheet for any future endeavors. I am confident that he will continue to excel and make a positive impact in any team.'],
  [6, 'img6.jpg', 'Mohamed Elesawy', 'Machine Learning Engineer @ FORTE CLOUD | Machine Learning', 'https://www.linkedin.com/search/results/all/?keywords=Mohamed%20Elesawy%20FORTE%20CLOUD',
    'I enjoyed working with Bekheet during my master’s degree and in a professional setting while working in Forte Cloud. He is deeply dedicated to his work, sometimes to a fault, and consistently strives to think outside the box, bringing creative ideas that drive progress. What truly sets him apart is his unwavering passion for gaining knowledge and continuously improving himself.'],
  [7, 'img7.jpg', 'Mohamed Salah', 'Software Developer @ Giza Systems | . Net Developer', 'https://www.linkedin.com/in/1mohamed-salah/',
    'I had the pleasure of working with Bekheet during our computer science studies at Ain Shams University, in the Scientific Computing department. We collaborated on several projects, including our graduation project—analyzing ECG signals to detect severe heart diseases—and worked on algorithms, OOP, signal processing, and geometry. Bekheet is hardworking, innovative, and a great communicator. He takes initiative, confidently handles responsibility, and faces challenges with a positive, practical mindset. Reliable and driven, he’s someone you can truly count on.']
];

const POSTS = [
  ['Modernizing React Portfolio with Vite and Custom AI', 'Architecture', 'April 2026', '3 min read',
    'Building a modern web presence is no longer just about standard templates. By combining **React**, **Vite**, and **Zustand** state management along with an embedded AI Assistant via **Google Gemini**, you can turn a static brochure into an interactive experience.\n\n### Why Vite?\nVite provides instantaneous hot module replacement (HMR), making development incredibly fast...'],
  ['Optimizing Computer Vision at the Edge', 'Machine Learning', 'March 2026', '5 min read',
    'Deploying deep learning models to the edge comes with severe resource limitations. During my work, we extensively used OpenVINO and optimized ONNX models to achieve real-time text recognition on embedded devices running minimal Linux distributions.']
];

const BIO = [
  "I'm **Mohamed Bekheet**, a **Machine Learning Engineer** specializing in designing and deploying production-grade AI systems that solve real business problems.",
  'My work focuses on applied AI across **Computer Vision, Generative AI, MLOps, and Data Science**, where I build scalable solutions that transform complex workflows into automated, intelligent processes.',
  "I'm proficient in **Python** as my primary development language, with additional experience in *C++, Java, JavaScript, and R*, enabling me to design end-to-end systems from data pipelines to model deployment.",
  'My core expertise includes **Computer Vision, Optical Character Recognition (OCR), Generative AI, Retrieval-Augmented Generation (RAG), and AI Agents** — allowing me to deliver advanced AI applications for real-world environments.',
  'I have hands-on experience architecting scalable ML solutions on **AWS**, including *SageMaker and Bedrock*, as well as deploying models across cloud, on-premise, and edge environments to meet performance, latency, and reliability requirements.',
  'Driven by continuous learning, I actively explore **emerging AI technologies** and *optimize systems* for efficiency, scalability, and long-term maintainability.'
].join('\n\n');

async function main() {
  const token = await signIn();

  console.log(`Signed in as ${EMAIL}\nSeeding Supabase (${FORCE ? '--force' : 'append-only'})…`);

  const certImage = async (file) =>
    uploadAsset(token, asset('src/assets/certifications', file), `certifications/${file}`);

  if (FORCE || !(await rowCount(token, 'profile'))) {
    const resumeUrl = await uploadAsset(token, asset('src/assets/Mohamed-Bekheet.pdf'), 'resume/Mohamed-Bekheet.pdf');
    const previewUrl = await uploadAsset(token, asset('src/assets/Mohamed-Bekheet_page-0001.jpg'), 'resume/Mohamed-Bekheet-preview.jpg');
    const heroUrl = await uploadAsset(token, asset('src/assets/home-main.webp'), 'profile/home-main.webp');
    const avatarUrl = await uploadAsset(token, asset('src/assets/avatar.webp'), 'profile/avatar.webp');
    await insertRows(token, 'profile', [{
      id: 1,
      full_name: 'Mohamed Bekheet',
      tagline: 'Machine Learning Engineer',
      roles: ['AI Delivery Engineer', 'Agentic AI Engineer', 'Machine Learning Engineer', 'Generative AI Specialist', 'Computer Vision Engineer'],
      bio: BIO,
      location: null,
      email: null,
      phone: null,
      resume_url: resumeUrl,
      resume_preview_url: previewUrl,
      hero_image_url: heroUrl,
      avatar_url: avatarUrl,
      github_url: 'https://github.bekheet.com',
      linkedin_url: 'https://linkedin.bekheet.com/',
      kaggle_url: 'https://kaggle.bekheet.com',
      dev_url: 'https://dev.to/mohamed-bekheet',
      whatsapp_url: 'https://chatwith.io/s/mohamed-bekheet',
      updated_at: new Date().toISOString()
    }]);
    console.log('- profile: seeded');
  } else {
    console.log('- profile: skipped (already present, use --force to overwrite)');
  }

  await seedSection(token, 'projects', 'projects', async () => {
    const rows = [];
    for (let i = 0; i < PROJECTS.length; i++) {
      const [title, image, type, course, ghLink, description] = PROJECTS[i];
      rows.push({
        title,
        description,
        image_url: await uploadAsset(token, asset('src/assets/Projects', image), `projects/${image}`),
        gh_link: ghLink,
        demo_link: null,
        type,
        tags: course ? [course] : [],
        sort_order: i,
        published: true
      });
    }
    return rows;
  });

  await seedSection(token, 'experience', 'experience', async () => {
    const rows = [];
    for (let i = 0; i < EXPERIENCE.length; i++) {
      const [title, company, dateRange, link, icon, points] = EXPERIENCE[i];
      rows.push({
        title,
        company_name: company,
        date_range: dateRange,
        points,
        link,
        icon_bg: '#c95bf5',
        icon_url: await uploadAsset(token, asset('public/company', icon), `experience/${icon}`),
        sort_order: i,
        published: true
      });
    }
    return rows;
  });

  await seedSection(token, 'certifications', 'certifications', async () => {
    const rows = [];
    for (let i = 0; i < CERTIFICATIONS.length; i++) {
      const [title, image, link, issueDate, description] = CERTIFICATIONS[i];
      rows.push({
        title,
        description,
        image_url: await certImage(image),
        alt: `${title} Certification`,
        issue_date: issueDate,
        link: link === '#' ? null : link,
        sort_order: i,
        published: true
      });
    }
    return rows;
  });

  await seedSection(token, 'testimonials', 'testimonials', async () => {
    const rows = [];
    for (const [, image, name, profession, link, quote] of TESTIMONIALS) {
      rows.push({
        client_name: name,
        profession,
        quote,
        avatar_url: await uploadAsset(token, asset('public/Testimonial', image), `testimonials/${image}`),
        link,
        sort_order: TESTIMONIALS.findIndex((t) => t[1] === image),
        published: true
      });
    }
    return rows;
  });

  await seedSection(token, 'posts', 'posts', async () =>
    POSTS.map(([title, category, dateLabel, readTime, content]) => ({
      title,
      category,
      content,
      date_label: dateLabel,
      read_time: readTime,
      published: true
    }))
  );

  console.log('\nSeed complete. Open /admin to manage your content.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
