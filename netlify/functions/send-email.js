const fetch = require('node-fetch');

const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestCounts = new Map();

function isRateLimited(ip) {
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

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function sanitizeInput(input) {
  return String(input).trim().slice(0, 5000);
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': 'https://bekheet.com',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': 'https://bekheet.com' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const ip =
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['client-ip'] ||
    event.headers['x-forwarded-for'] ||
    'unknown';

  if (isRateLimited(ip)) {
    return {
      statusCode: 429,
      headers: { 'Access-Control-Allow-Origin': 'https://bekheet.com', 'Retry-After': '60' },
      body: JSON.stringify({ error: 'Too many requests. Please try again later.' }),
    };
  }

  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
    console.error('EmailJS credentials not configured');
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': 'https://bekheet.com' },
      body: JSON.stringify({ error: 'Email service not configured' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': 'https://bekheet.com' },
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': 'https://bekheet.com' },
      body: JSON.stringify({ error: 'Name, email, and message are required' }),
    };
  }

  if (!validateEmail(email)) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': 'https://bekheet.com' },
      body: JSON.stringify({ error: 'Invalid email format' }),
    };
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
      return {
        statusCode: 502,
        headers: { 'Access-Control-Allow-Origin': 'https://bekheet.com' },
        body: JSON.stringify({ error: 'Failed to send email' }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://bekheet.com',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Send email error:', error.message);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': 'https://bekheet.com' },
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};