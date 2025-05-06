// certificationData.js
import gcp from "../../assets/certifications/GCP.png";
import azure from "../../assets/certifications/dp100.svg";
import awsml from "../../assets/certifications/aws_ml.png";
import aws from "../../assets/certifications/aws.png";
import gen from "../../assets/certifications/gen.png";
import ibm from "../../assets/certifications/ibm.png";
import DL from "../../assets/certifications/DL.png";
import awssa from "../../assets/certifications/aws_sa.png";
import hccdpai from "../../assets/certifications/HCCDP-AI.jpeg";

export const certifications = [
  {
    title: "AWS Solution Architect Associate",
    img: awssa,
    alt: "AWS Solutions Architect Associate Certification",
    link: "https://www.credly.com/badges/4343705f74e048e7bf6eb4ba4bcb3256",
    description: "AWS Certified Solutions Architect - Associate demonstrates knowledge and skills in AWS technology, across a wide range of AWS services. The focus is on designing distributed systems that are cost-efficient, reliable, and scalable.",
    issueDate: "Mar 2025",
    expiryDate: "Mar 2028",
    credentialId: "4343705f74e048e7bf6eb4ba4bcb3256"
  },
  {
    title: "HCCDP-AI",
    img: hccdpai,
    alt: "Huawei Certified Cloud Database Professional - AI",
    link: "#",
    description: "Huawei Certified Cloud Database Professional certification in AI demonstrates expertise in Huawei's cloud AI technologies and solutions.",
    issueDate: "Mar 2025",
    credentialId: "HWENDCAIDP207018"
  },
  {
    title: "Associate Cloud Engineer",
    img: gcp,
    alt: "Google Cloud Engineer Certification",
    link: "https://www.credly.com/badges/004eae16-08b7-4598-b64b-05f57170e0c0",
    description:
      "Associate Cloud Engineers deploy applications, monitor operations, and manage enterprise solutions. They use Google Cloud Console and the command-line interface to perform common platform-based tasks to maintain one or more deployed solutions that leverage Google-managed or self-managed services on Google Cloud.",
    issueDate: "Jan 2024"
  },
  {
    title: "Azure Data Scientist Associate",
    img: azure,
    alt: "Azure Data Scientist Certification",
    link: "https://learn.microsoft.com/en-us/users/mohamedbekheetabdelallmohamed-6007/credentials/245fae1f406bb43c?ref=https%3A%2F%2Fwww.linkedin.com%2F",
    description:
      "Designing machine learning solutions starts with analyzing data and training models to address business needs. Next, models are optimized for deployment and integrated into production systems. Continuous monitoring and retraining ensure they remain effective over time.",
  },
  {
    title: "AWS Certified Machine Learning – Specialty",
    img: awsml,
    alt: "AWS Machine Learning Certification",
    link: "https://www.credly.com/badges/3b67bdfb-93e0-4611-96c6-899506559896",
    description:
      "Earners of this certification have an in-depth understanding of AWS machine learning (ML) services. They demonstrated ability to build, train, tune, and deploy ML models using the AWS Cloud. Badge owners can derive insight from AWS ML services using either pretrained models or custom models built from open-source frameworks.",
    issueDate: "Dec 2023",
    expiryDate: "Dec 2026"
  },
  {
    title: "AWS Certified Cloud Practitioner",
    img: aws,
    alt: "AWS Cloud Practitioner Certification",
    link: "https://www.credly.com/badges/61910338-f311-4a36-b24c-59bd8beb4edb",
    description:
      "Earners of this certification have a fundamental understanding of IT services and their uses in the AWS Cloud. They demonstrated cloud fluency and foundational AWS knowledge. Badge owners are able to identify essential AWS services necessary to set up AWS-focused projects.",
  },
  {
    title: "Generative AI Essentials",
    img: gen,
    alt: "AWS Generative AI Essentials Certification",
    link: "https://www.credly.com/badges/f143aa60-dcf6-45e9-8b9b-a0605e5c2a9a",
    description:
      "Earners of this badge are individuals at AWS Partners or Amazon employees who have demonstrated a foundational knowledge of AWS Generative AI Essentials Business Skill.",
  },
  {
    title: "Artificial Intelligence Analyst",
    img: ibm,
    alt: "IBM AI Analyst Certification",
    link: "https://www.credly.com/badges/e74f838c-e9ad-4cff-b99e-2b5f50c620c6",
    description:
      "This badge earner has proven expertise to apply machine learning algorithms and build AI solutions by using IBM Watson. The badge earner has demonstrated advanced proficiency in topics such as AI, Natural Language Processing (NLP), chatbots, and computer vision.",
  },
  {
    title: "Deep Learning - Nanodegree Program",
    img: DL,
    alt: "Deep Learning Certification",
    link: "https://www.udacity.com/certificate/PLUG6NGS",
    description:
      "The Deep Learning Nanodegree program provides a comprehensive introduction to AI, covering key concepts like neural networks, CNNs, RNNs, and GANs. You'll gain practical experience by building projects in PyTorch, equipping you to advance in the field or start a new career in deep learning.",
  },
];
