// Sample content for migration to Firestore
export const sampleContent = {
  profile: {
    name: "Mohamed Bekheet",
    title: "Software Engineer & AI Specialist",
    bio: "Passionate software engineer with expertise in AI and modern web technologies. I specialize in turning ideas into innovative solutions.",
    avatar: "/assets/images/avatar.jpg",
    introText: "Hi There! 👋🏻 I'M Mohamed Bekheet",
    quote: "Strive to build things that make a difference!",
    contact: {
      email: "mohamedbekheet33@gmail.com",
      phone: "+1-xxx-xxx-xxxx",
      location: "Ottawa, Canada"
    },
    social: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/mohamedbekheet-/",
        icon: "linkedin",
        label: "Connect on LinkedIn"
      },
      {
        platform: "github",
        url: "https://github.com/mohamedbakhet",
        icon: "github",
        label: "Follow on GitHub"
      },
      {
        platform: "kaggle",
        url: "https://www.kaggle.com/mohamedbakhet",
        icon: "kaggle",
        label: "Follow on Kaggle"
      },
      {
        platform: "devto",
        url: "https://dev.to/mohamed-bekheet",
        icon: "devto",
        label: "Read on Dev.to"
      },
      {
        platform: "whatsapp",
        url: "https://chatwith.io/s/mohamed-bekheet",
        icon: "whatsapp",
        label: "Chat on WhatsApp"
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  
  projects: [
    {
      id: "coptictrans",
      title: "CopticTrans",
      description: "(graduation project of my master), Sponsor: Microsoft. CopticTrans is a Translation application build base on AI for translating the Coptic language with an OCR feature to extract the Coptic text from images before translation.",
      imageUrl: "/assets/projects/coptic.png",
      githubUrl: "https://github.com/mohamedbakhet/CopticTrans",
      demoUrl: null,
      tags: ["AI", "Translation", "OCR", "Graduation Project"],
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "cardioai",
      title: "CardioAI",
      description: "Graduation project, Analysis ECG signal to diagnose severe heart disease. Build a Deep learning model that uses ECG signals to diagnose between 14 heart diseases, then use the second model to detect the location of myocardial infarction if found.",
      imageUrl: "/assets/projects/ocr.png",
      githubUrl: "https://github.com/mohamedbakhet/Analysis-ECG-signal-for-diagnosis-severe-heart-diseases.git",
      demoUrl: null,
      tags: ["Deep Learning", "Healthcare", "ECG Analysis"],
      featured: true,
      createdAt: new Date().toISOString()
    }
  ],
  
  skills: [
    {
      id: "python",
      name: "Python",
      category: "Programming Languages",
      level: 95,
      icon: "/assets/skills/python.svg",
      createdAt: new Date().toISOString()
    },
    {
      id: "javascript",
      name: "JavaScript",
      category: "Programming Languages",
      level: 85,
      icon: "/assets/skills/javascript.svg",
      createdAt: new Date().toISOString()
    },
    {
      id: "react",
      name: "React",
      category: "Frameworks & Libraries",
      level: 90,
      icon: "/assets/skills/react.svg",
      createdAt: new Date().toISOString()
    },
    {
      id: "tensorflow",
      name: "TensorFlow",
      category: "Frameworks & Libraries",
      level: 80,
      icon: "/assets/skills/TensorFlow.png",
      createdAt: new Date().toISOString()
    },
    {
      id: "aws",
      name: "AWS",
      category: "Tools",
      level: 85,
      icon: "/assets/skills/aws.svg",
      createdAt: new Date().toISOString()
    }
  ],
  
  experience: [
    {
      id: "machine-learning-engineer",
      title: "Machine Learning Engineer",
      company: "Forte Cloud",
      companyIcon: "/assets/company/forte.png",
      startDate: "2023-07",
      endDate: null, // null means current job
      description: "Developed and deployed machine learning models for computer vision, speech recognition, and natural language processing (NLP), utilizing LLM techniques to solve complex business challenges.",
      achievements: [
        "Specialized in Generative AI using AWS Bedrock for model generation and embedding, and implemented clustering algorithms.",
        "Designed and implemented AWS architecture, optimizing cloud services with EC2, S3, Bedrock, and SageMaker.",
        "Integrated AWS services (e.g., Comprehend, Tesseract, Rekognition) to enhance deployment efficiency and scalability."
      ],
      technologies: ["AWS", "Bedrock", "SageMaker", "LLM", "Generative AI"],
      createdAt: new Date().toISOString()
    },
    {
      id: "teacher-assistant",
      title: "Teacher Assistant",
      company: "Ain Shams University",
      companyIcon: "/assets/company/ain.png",
      startDate: "2023-01",
      endDate: "2023-06",
      description: "Assisted in teaching computer science and artificial intelligence courses, supporting both theoretical and practical aspects.",
      achievements: [
        "Provided guidance to students and faculty, enhancing the learning experience and course effectiveness."
      ],
      technologies: ["AI", "Teaching", "Academia"],
      createdAt: new Date().toISOString()
    }
  ],
  
  certifications: [
    {
      id: "aws-solution-architect",
      title: "AWS Solution Architect Associate",
      issuer: "Amazon Web Services",
      issuerIcon: "/assets/certifications/aws_sa.png",
      issueDate: "2025-03",
      expirationDate: "2028-03",
      credentialId: "4343705f74e048e7bf6eb4ba4bcb3256",
      credentialUrl: "https://www.credly.com/badges/4343705f74e048e7bf6eb4ba4bcb3256",
      description: "AWS Certified Solutions Architect - Associate demonstrates knowledge and skills in AWS technology, across a wide range of AWS services. The focus is on designing distributed systems that are cost-efficient, reliable, and scalable.",
      createdAt: new Date().toISOString()
    },
    {
      id: "gcp-cloud-engineer",
      title: "Associate Cloud Engineer",
      issuer: "Google Cloud",
      issuerIcon: "/assets/certifications/GCP.png",
      issueDate: "2024-01",
      expirationDate: null,
      credentialId: "004eae16-08b7-4598-b64b-05f57170e0c0",
      credentialUrl: "https://www.credly.com/badges/004eae16-08b7-4598-b64b-05f57170e0c0",
      description: "Associate Cloud Engineers deploy applications, monitor operations, and manage enterprise solutions. They use Google Cloud Console and the command-line interface to perform common platform-based tasks to maintain one or more deployed solutions that leverage Google-managed or self-managed services on Google Cloud.",
      createdAt: new Date().toISOString()
    }
  ],
  
  testimonials: [
    {
      id: "testimonial-1",
      author: "John Smith",
      position: "CTO at TechCorp",
      content: "Mohamed delivered exceptional results on our AI project. His expertise in machine learning and problem-solving skills were invaluable to our team.",
      rating: 5,
      date: "2024-05-15",
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "testimonial-2",
      author: "Sarah Johnson",
      position: "Product Manager at InnovateLab",
      content: "Working with Mohamed was a pleasure. He brought innovative solutions to complex problems and delivered ahead of schedule.",
      rating: 5,
      date: "2024-03-22",
      verified: true,
      createdAt: new Date().toISOString()
    }
  ]
};