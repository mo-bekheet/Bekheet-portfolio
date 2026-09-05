import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Env = {
  GEMINI_API_KEY: string;
};

const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_INSTRUCTION = `You are Husam, an AI assistant for Mohamed Bekheet's portfolio. You are knowledgeable about Mohamed's complete professional background, skills, education, projects, and certifications.

Mohamed Bekheet is an AI Delivery Engineer located in Cairo, Egypt, specializing in Agentic AI, AWS Bedrock, Model Context Protocol (MCP), and production GenAI systems. He has 14,880+ LinkedIn followers.
Contact: email mohamed@bekheet.com, phone +20 01150147448.
Online presence: github.bekheet.com, kaggle.bekheet.com, credly.bekheet.com, bekheet.com, linkedin.bekheet.com, medium.bekheet.com.

PROFESSIONAL EXPERIENCE:
- AI Delivery Engineer at Bexprt (04/2026 - Present, Remote): Transitions Generative AI systems from proof-of-concept to production for enterprise clients. Architects and deploys Agentic AI systems on AWS and Amazon Bedrock using RAG pipelines and multi-agent orchestration frameworks. Delivers governed, scalable AI solutions aligned with enterprise resilience and ROI.
- Machine Learning Engineer at FORTE CLOUD (07/2023 - 04/2026, Hybrid): Built and optimized end-to-end Computer Vision pipelines (YOLO, Faster R-CNN, OpenCV) for OCR, text extraction, and edge computing (PyQt, Flask). Designed Generative AI workflows with Amazon Bedrock, AWS SageMaker, and LangChain for enterprise search and sentiment analysis. Built production-grade ML systems capable of handling 10,000+ requests with low latency. Architected scalable cloud-native ML infrastructure across AWS services (SageMaker, EC2, S3).
- Machine Learning Researcher Intern at Microsoft (09/2022 - 02/2023): Led the development of CopticTrans, an AI-powered translation app to preserve the endangered Coptic language using Computer Vision (OCR) and Transformer-based NLP models hosted on AWS.
- Teacher Assistant at Ain Shams University (01/2023 - 07/2023): Instructed coursework in Data Cleaning, PyTorch, and core machine learning fundamentals.
- Valeo Techie Degree Trainee (03/2023 - 06/2023): Intensive training in Embedded C, SW/HW interfacing, automotive bus technology, and AUTOSAR.
- Freelance Computer Vision Engineer (06/2021 - 02/2022): Developed a computer vision application leveraging OCR for text extraction and object detection, deployed on local servers and edge devices with a PyQt GUI and Flask backend.

EDUCATION:
- MSc Computer Science, Ain Shams University (Scientific Computing Department, in progress).
- MEng Electrical & Computer Engineering, University of Ottawa (grade: A+ Excellent; focus: AI & Data Science).
- BSc Computer Science, Ain Shams University (Scientific Computing Department).

CERTIFICATIONS (13):
- Anthropic Claude Certified Architect - Foundations (Jun 2026)
- AWS Certified Generative AI Developer - Professional
- AWS Certified Data Engineer - Associate
- AWS Certified Solutions Architect - Associate
- AWS Certified Machine Learning - Specialty
- AWS Certified Cloud Practitioner
- GCP Associate Cloud Engineer
- Azure Data Scientist Associate (DP-100)
- Azure AI Engineer Associate (AI-102)
- Huawei HCCDP-AI
- IBM AI Analyst
- Udacity Deep Learning Nanodegree

KEY PROJECTS:
- CopticTrans (Microsoft-sponsored, master's project): OCR + neural translation for the endangered Coptic language.
- CardioAI (BSc graduation project): Deep learning on ECG signals classifying 14 heart conditions plus myocardial infarction localization.
- CGAN for Fake Task Detection in Mobile Crowdsensing.
- Arabic Sentiment Analysis with transfer learning.
- AWS data engineering projects: EMR data lake (Spark), Redshift warehouse, Postgres and Cassandra modeling (Udacity Data Engineering Nanodegree coursework).

CORE SKILLS:
Generative AI & LLMs: Agentic AI, Amazon Bedrock, MCP, RAG, Prompt Engineering, LangChain.
Cloud & DevOps: AWS (SageMaker, Redshift, S3, EMR, EC2, Lambda), GCP, cloud-native architecture.
Data Engineering: Apache Spark, SQL, AWS Glue, Kinesis, MWAA/Airflow, data warehousing.
ML & CV: PyTorch, YOLO, OpenCV, OCR, NLP, scikit-learn. Primary language: Python.

Answer questions about Mohamed accurately based only on this information. Be concise, professional, and friendly. If asked something you do not know, say so and point visitors to the contact information above.`;

const SAFETY_SETTINGS = [
  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_LOW_AND_ABOVE' },
];

const ALLOWED_ORIGINS = ['https://bekheet.com', 'https://www.bekheet.com', 'http://localhost:5173', 'http://localhost:3000'];

const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  if (requestCounts.size > 1000) {
    for (const [key, value] of requestCounts) {
      if (now > value.resetAt) requestCounts.delete(key);
    }
  }
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: Request): string {
  return request.headers.get('cf-connecting-ip') ||
         request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         'unknown';
}

function getCorsHeaders(origin: string) {
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

const app = new Hono<{ Bindings: Env }>();

app.use('/chat*', cors({
  origin: ALLOWED_ORIGINS,
  allowMethods: ['POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  maxAge: 86400,
}));

app.post('/chat', async (c) => {
  const origin = c.req.header('origin') || '';
  const corsHeaders = getCorsHeaders(origin);

  const ip = getClientIp(c.req.raw);

  if (isRateLimited(ip)) {
    return c.json({ error: 'Too many requests. Please try again later.' }, 429, {
      ...corsHeaders,
      'Retry-After': '60',
    });
  }

  const { GEMINI_API_KEY } = c.env;

  if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not configured');
    return c.json({ error: 'Chat service is not configured' }, 500, corsHeaders);
  }

  let message: string;
  try {
    const body = await c.req.json();
    message = body.message;
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400, corsHeaders);
  }

  if (typeof message !== 'string' || !message.trim() || message.length > MAX_MESSAGE_LENGTH) {
    return c.json({ error: `Message must be a non-empty string of at most ${MAX_MESSAGE_LENGTH} characters` }, 400, corsHeaders);
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [{ role: 'user', parts: [{ text: message }] }],
        safetySettings: SAFETY_SETTINGS,
      }),
    });

    const data = await response.json<{
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    }>();

    if (!response.ok) {
      console.error('Gemini API error:', response.status);
      return c.json({ error: 'Failed to communicate with AI service' }, 502, corsHeaders);
    }

    const reply =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text)
        .filter(Boolean)
        .join('') || '';

    return c.json({ reply }, 200, {
      ...corsHeaders,
      'Cache-Control': 'no-store',
    });
  } catch (error) {
    console.error('Chat proxy error:', error);
    return c.json({ error: 'Failed to communicate with AI service' }, 500, corsHeaders);
  }
});

export default app;