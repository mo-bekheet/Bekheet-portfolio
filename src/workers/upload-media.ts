import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Env = {
  MEDIA_BUCKET: R2Bucket;
  R2_PUBLIC_DOMAIN: string;
};

const ALLOWED_MIME_TYPES = {
  'image/jpeg': { ext: '.jpg', magic: [0xFF, 0xD8, 0xFF] },
  'image/png': { ext: '.png', magic: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A] },
  'image/webp': { ext: '.webp', magic: [0x52, 0x49, 0x46, 0x46] },
  'application/pdf': { ext: '.pdf', magic: [0x25, 0x50, 0x44, 0x46] },
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FOLDERS = ['projects', 'profile', 'resume', 'experience', 'certifications', 'testimonials', 'misc'];

const ALLOWED_ORIGINS = ['https://bekheet.com', 'https://www.bekheet.com', 'http://localhost:5173', 'http://localhost:3000'];

function detectMimeType(buffer: ArrayBuffer): string | null {
  const bytes = new Uint8Array(buffer);
  for (const [mime, info] of Object.entries(ALLOWED_MIME_TYPES)) {
    const magic = info.magic;
    let matches = true;
    for (let i = 0; i < magic.length; i++) {
      if (bytes[i] !== magic[i]) {
        matches = false;
        break;
      }
    }
    if (matches) return mime;
  }
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
    if (bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
      return 'image/webp';
    }
  }
  return null;
}

function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .slice(0, 200);
}

function validateFolder(folder: string): string {
  return ALLOWED_FOLDERS.includes(folder) ? folder : 'misc';
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

app.use('/upload-media*', cors({
  origin: ALLOWED_ORIGINS,
  allowMethods: ['POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  maxAge: 86400,
}));

app.post('/upload-media', async (c) => {
  const origin = c.req.header('origin') || '';
  const corsHeaders = getCorsHeaders(origin);

  const { MEDIA_BUCKET, R2_PUBLIC_DOMAIN } = c.env;

  if (!MEDIA_BUCKET || !R2_PUBLIC_DOMAIN) {
    console.error('R2 not configured');
    return c.json({ error: 'Upload service not configured' }, 500, corsHeaders);
  }

  let body: { fileBase64?: string; filename?: string; folder?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400, corsHeaders);
  }

  const { fileBase64, filename, folder } = body;

  if (!fileBase64 || !filename) {
    return c.json({ error: 'fileBase64 and filename are required' }, 400, corsHeaders);
  }

  let buffer: ArrayBuffer;
  try {
    const binary = atob(fileBase64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    buffer = bytes.buffer;
  } catch {
    return c.json({ error: 'Invalid base64 encoding' }, 400, corsHeaders);
  }

  if (buffer.byteLength === 0) {
    return c.json({ error: 'Empty file' }, 400, corsHeaders);
  }

  if (buffer.byteLength > MAX_FILE_SIZE) {
    return c.json({ error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` }, 413, corsHeaders);
  }

  const mimeType = detectMimeType(buffer);
  if (!mimeType) {
    return c.json({ error: 'File type not allowed. Allowed: JPEG, PNG, WebP, PDF' }, 400, corsHeaders);
  }

  const allowedFolder = validateFolder(folder);
  const safeName = sanitizeFilename(filename);
  const ext = ALLOWED_MIME_TYPES[mimeType].ext;
  const finalName = safeName.toLowerCase().endsWith(ext) ? safeName : safeName.replace(/\.[^.]+$/, '') + ext;
  const path = `${allowedFolder}/${Date.now()}-${finalName}`;

  try {
    await MEDIA_BUCKET.put(path, buffer, {
      httpMetadata: {
        contentType: mimeType,
        cacheControl: 'public, max-age=31536000, immutable',
      },
    });

    const publicUrl = `${R2_PUBLIC_DOMAIN}/${path}`;

    return c.json({ url: publicUrl, path, mimeType }, 200, corsHeaders);
  } catch (error) {
    console.error('R2 upload error:', error);
    return c.json({ error: 'Failed to upload file' }, 500, corsHeaders);
  }
});

export default app;