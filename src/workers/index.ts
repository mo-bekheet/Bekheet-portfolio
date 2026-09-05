import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { cors } from 'hono/cors';

import sendEmail from './send-email';
import chatProxy from './chat-proxy';
import uploadMedia from './upload-media';
import cspReport from './csp-report';

type Env = {
  ASSETS: Fetcher;
  MEDIA_BUCKET: R2Bucket;
  CSP_REPORTS: KVNamespace;
  GEMINI_API_KEY: string;
  EMAILJS_SERVICE_ID: string;
  EMAILJS_TEMPLATE_ID: string;
  EMAILJS_PUBLIC_KEY: string;
  EMAILJS_PRIVATE_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  R2_PUBLIC_DOMAIN: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use('/api/*', cors({
  origin: ['https://bekheet.com', 'https://www.bekheet.com', 'http://localhost:5173', 'http://localhost:3000'],
  allowMethods: ['POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  maxAge: 86400,
}));

app.route('/api/send-email', sendEmail);
app.route('/api/chat', chatProxy);
app.route('/api/upload-media', uploadMedia);
app.route('/api/csp-report', cspReport);

app.get('/api/health', (c) => c.json({ ok: true, timestamp: new Date().toISOString() }));

app.get('*', serveStatic({ root: './dist' }));
app.get('*', serveStatic({ path: './dist/index.html' }));

export default app;