import { Hono } from 'hono';

type Env = {
  EMAILJS_SERVICE_ID: string;
  EMAILJS_TEMPLATE_ID: string;
  EMAILJS_PUBLIC_KEY: string;
  EMAILJS_PRIVATE_KEY: string;
};

const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
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

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function sanitizeInput(input: string): string {
  return String(input).trim().slice(0, 5000);
}

function getClientIp(request: Request): string {
  return request.headers.get('cf-connecting-ip') ||
         request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         'unknown';
}

const app = new Hono<{ Bindings: Env }>();

app.options('/send-email', (c) => c.newResponse(null, 204));

app.post('/send-email', async (c) => {
  const ip = getClientIp(c.req.raw);

  if (isRateLimited(ip)) {
    return c.json({ error: 'Too many requests. Please try again later.' }, 429, {
      'Retry-After': '60',
    });
  }

  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY } = c.env;

  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
    console.error('EmailJS credentials not configured');
    return c.json({ error: 'Email service not configured' }, 500);
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400);
  }

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return c.json({ error: 'Name, email, and message are required' }, 400);
  }

  if (!validateEmail(email)) {
    return c.json({ error: 'Invalid email format' }, 400);
  }

  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = sanitizeInput(email);
  const sanitizedMessage = sanitizeInput(message);

  try {
    const response = await fetch(EMAILJS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name: sanitizedName,
          to_name: 'Mohamed Bekheet',
          from_email: sanitizedEmail,
          to_email: 'mohamedbekheet33@gmail.com',
          message: sanitizedMessage,
        },
      }),
    });

    const data = await response.text();

    if (!response.ok) {
      console.error('EmailJS API error:', response.status, data);
      return c.json({ error: 'Failed to send email' }, 502);
    }

    return c.json({ success: true }, 200, { 'Cache-Control': 'no-store' });
  } catch (error) {
    console.error('Send email error:', error);
    return c.json({ error: 'Failed to send email' }, 500);
  }
});

export default app;