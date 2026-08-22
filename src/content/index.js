import { projectData } from '../components/Projects/projectsData.js';
import experiences from '../components/About/experiecesContent.js';
import { certifications } from '../components/Certificate/certificationData.js';

export const samplePosts = [
  {
    id: 1,
    title: 'Modernizing React Portfolio with Vite and Custom AI',
    date: 'April 2026',
    category: 'Architecture',
    content:
      'Building a modern web presence is no longer just about standard templates. By combining **React**, **Vite**, and **Zustand** state management along with an embedded AI Assistant via **Google Gemini**, you can turn a static brochure into an interactive experience. \n\n### Why Vite?\nVite provides instantaneous hot module replacement (HMR), making development incredibly fast...',
    readTime: '3 min read'
  },
  {
    id: 2,
    title: 'Optimizing Computer Vision at the Edge',
    date: 'March 2026',
    category: 'Machine Learning',
    content:
      'Deploying deep learning models to the edge comes with severe resource limitations. During my work, we extensively used OpenVINO and optimized ONNX models to achieve real-time text recognition on embedded devices running minimal Linux distributions.',
    readTime: '5 min read'
  }
];

export const sampleTestimonials = [
  {
    id: 1,
    imgSrc: '/Testimonial/img1.jpeg',
    link: 'https://www.linkedin.com/in/mahmoud-yahia-%F0%9F%87%B5%F0%9F%87%B8-4a98a2156/',
    quote:
      "Mohamed possesses a rare combination of technical prowess, creativity, and dedication that sets him apart in his field. His deep understanding of machine learning algorithms and techniques has been instrumental in tackling complex challenges and delivering innovative solutions. Whether it's developing predictive models, optimizing algorithms, or integrating AI technologies into our systems, Mohamed consistently demonstrates a remarkable level of expertise and proficiency.",
    clientName: 'Mahmoud Yahia',
    profession: 'Machine Learning Engineer'
  },
  {
    id: 2,
    imgSrc: '/Testimonial/img2.jpeg',
    link: 'https://www.linkedin.com/in/kirolos-ataallah-631755123/',
    quote:
      " worked with bekhet while studying for a master's degree in ottawa university. Bekhet is a hard worker and always have intelligent solutions for the problems. ",
    clientName: 'Kirolos A Ataallah',
    profession: 'Computer Vision Researcher at VisionCAIR Lab at KAUST university'
  },
  {
    id: 3,
    imgSrc: '/Testimonial/img3.jpeg',
    link: 'https://www.linkedin.com/in/mahmoud--saeed/',
    quote:
      'I have had the pleasure of working closely with Mohammed Bekhet during our time together at Ain Shams University. As fellow students pursuing degrees in Software Engineering and AI, Mohammed consistently impressed me with his dedication, intelligence, and passion for the field. Mohammed possesses a remarkable ability to grasp complex concepts quickly and apply them effectively in practical scenarios. Whether it was tackling challenging coding assignments or delving into advanced AI algorithms, he demonstrated a strong aptitude for problem-solving and critical thinking. What truly sets Mohammed apart is his collaborative spirit and natural leadership qualities. He not only contributed valuable insights to our group projects but also fostered a positive and supportive team environment. His willingness to help others, share knowledge, and take initiative greatly enriched our learning experience. Moreover, Mohammed exhibits a strong work ethic and a genuine enthusiasm for staying abreast of the latest advancements in technology. He eagerly took on extracurricular projects and sought out opportunities to expand his skill set, demonstrating a proactive approach to personal and professional growth. I have no doubt that Mohammed Bekheet will excel in any endeavor he pursues in the field of Software Engineering and AI. He would be a valuable asset to any team or organization, and I wholeheartedly recommend him for any opportunity that comes his way',
    clientName: 'Mahmoud Saeed',
    profession: 'Software Engineer | Flutter Developer'
  },
  {
    id: 4,
    imgSrc: '/Testimonial/img4.jfif',
    link: 'https://www.linkedin.com/in/mohamed-adel-aboeldahab/',
    quote:
      'Working with Mohamed has been an exceptional experience. He combines profound technical skills with innovative thinking, setting him apart in the realm of machine learning. His proficiency in analyzing intricate data sets, developing advanced algorithms, and constructing robust models is nothing short of remarkable. Beyond his technical prowess, Mohamed is an outstanding communicator and collaborator. He actively engages with feedback and works harmoniously with colleagues to reach shared objectives. His positive demeanor and readiness to assist whenever necessary have made him a crucial asset to our team. I wholeheartedly recommend Mohamed to anyone seeking a highly skilled and reliable machine learning professional.',
    clientName: 'mohamed adel',
    profession: 'Full-Stack Dot net Developer'
  },
  {
    id: 5,
    imgSrc: '/Testimonial/img5.jpeg',
    link: 'https://www.linkedin.com/in/eslamelassal/',
    quote:
      'I am excited to recommend Mohamed Bekheet, with whom I had the pleasure of working on several projects during our master’s program. From the outset, he demonstrated exceptional dedication and professionalism. Mohamed played a crucial role in our projects, bringing not only his technical skills but also a collaborative spirit that made our team stronger. His expertise in Natural Language Processing (NLP) was invaluable, allowing us to tackle complex challenges with innovative solutions. One of the standout moments was when Mohamed led the development of a project that involved analyzing sentiment in social media data. He took the initiative to implement advanced NLP techniques, resulting in significant improvements in our model\'s accuracy and performance. In addition to his technical expertise, Mohamed is a fantastic problem solver. He has a remarkable ability to analyze complex problems and propose effective solutions, often thinking outside the box. His contributions not only helped us achieve our goals but also inspired the entire team to push our limits. Moreover, Mohamed is an exceptional team player. He is always willing to share his knowledge and support others, creating an inclusive and motivating environment. I wholeheartedly recommend Mohamed Bekheet for any future endeavors. I am confident that he will continue to excel and make a positive impact in any team.',
    clientName: 'Eslam Elassal',
    profession: 'Business Intelligence | Big Data | Data Engineer | CDMP | AWS 2x Certified | Microsoft 1x | Denodo 1x'
  },
  {
    id: 6,
    imgSrc: '/Testimonial/img6.jpg',
    link: 'https://www.linkedin.com/search/results/all/?keywords=Mohamed%20Elesawy%20FORTE%20CLOUD',
    quote:
      'I enjoyed working with Bekheet during my master’s degree and in a professional setting while working in Forte Cloud. He is deeply dedicated to his work, sometimes to a fault, and consistently strives to think outside the box, bringing creative ideas that drive progress. What truly sets him apart is his unwavering passion for gaining knowledge and continuously improving himself.',
    clientName: 'Mohamed Elesawy',
    profession: 'Machine Learning Engineer @ FORTE CLOUD | Machine Learning'
  },
  {
    id: 7,
    imgSrc: '/Testimonial/img7.jpg',
    link: 'https://www.linkedin.com/in/1mohamed-salah/',
    quote:
      'I had the pleasure of working with Bekheet during our computer science studies at Ain Shams University, in the Scientific Computing department. We collaborated on several projects, including our graduation project—analyzing ECG signals to detect severe heart diseases—and worked on algorithms, OOP, signal processing, and geometry. Bekheet is hardworking, innovative, and a great communicator. He takes initiative, confidently handles responsibility, and faces challenges with a positive, practical mindset. Reliable and driven, he’s someone you can truly count on.',
    clientName: 'Mohamed Salah',
    profession: 'Software Developer @ Giza Systems | . Net Developer'
  }
];

export const staticSections = {
  posts: samplePosts,
  projects: projectData,
  experience: experiences,
  certifications: certifications,
  testimonials: sampleTestimonials
};
