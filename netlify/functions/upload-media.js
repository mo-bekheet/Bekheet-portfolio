const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_API_TOKEN = process.env.R2_API_TOKEN;
const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN;

const ALLOWED_MIME_TYPES = {
  'image/jpeg': { ext: '.jpg', magic: [0xFF, 0xD8, 0xFF] },
  'image/png': { ext: '.png', magic: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A] },
  'image/webp': { ext: '.webp', magic: [0x52, 0x49, 0x46, 0x46] },
  'application/pdf': { ext: '.pdf', magic: [0x25, 0x50, 0x44, 0x46] },
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FOLDERS = ['projects', 'profile', 'resume', 'experience', 'certifications', 'testimonials', 'misc'];

function getCorsHeaders(origin) {
  const allowed = ['https://bekheet.com', 'https://www.bekheet.com', 'http://localhost:5173', 'http://localhost:3000'];
  const allowOrigin = allowed.includes(origin) ? origin : allowed[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function detectMimeType(buffer) {
  for (const [mime, info] of Object.entries(ALLOWED_MIME_TYPES)) {
    const magic = info.magic;
    let matches = true;
    for (let i = 0; i < magic.length; i++) {
      if (buffer[i] !== magic[i]) {
        matches = false;
        break;
      }
    }
    if (matches) return mime;
  }
  if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) {
    if (buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) {
      return 'image/webp';
    }
  }
  return null;
}

function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .slice(0, 200);
}

function validateFolder(folder) {
  return ALLOWED_FOLDERS.includes(folder) ? folder : 'misc';
}

function buildR2Client() {
  if (!R2_ACCOUNT_ID || !R2_API_TOKEN) {
    throw new Error('R2 credentials not configured');
  }
  const [accessKeyId, secretAccessKey] = R2_API_TOKEN.split(':');
  if (!accessKeyId || !secretAccessKey) {
    throw new Error('R2_API_TOKEN must be in format "access_key:secret_key"');
  }
  return new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

exports.handler = async function (event) {
  const origin = event.headers.origin || event.headers.Origin || '';
  const corsHeaders = getCorsHeaders(origin);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  const { fileBase64, filename, folder } = body;

  if (!fileBase64 || !filename) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'fileBase64 and filename are required' }),
    };
  }

  let buffer;
  try {
    buffer = Buffer.from(fileBase64, 'base64');
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid base64 encoding' }),
    };
  }

  if (buffer.length === 0) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Empty file' }),
    };
  }

  if (buffer.length > MAX_FILE_SIZE) {
    return {
      statusCode: 413,
      headers: corsHeaders,
      body: JSON.stringify({ error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` }),
    };
  }

  const mimeType = detectMimeType(buffer);
  if (!mimeType) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'File type not allowed. Allowed: JPEG, PNG, WebP, PDF' }),
    };
  }

  const allowedFolder = validateFolder(folder);
  const safeName = sanitizeFilename(filename);
  const ext = ALLOWED_MIME_TYPES[mimeType].ext;
  const finalName = safeName.toLowerCase().endsWith(ext) ? safeName : safeName.replace(/\.[^.]+$/, '') + ext;
  const path = `${allowedFolder}/${Date.now()}-${finalName}`;

  let r2;
  try {
    r2 = buildR2Client();
  } catch (err) {
    console.error('R2 client error:', err.message);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Upload service not configured' }),
    };
  }

  try {
    await r2.send(new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: path,
      Body: buffer,
      ContentType: mimeType,
      CacheControl: 'public, max-age=31536000, immutable',
    }));

    const baseUrl = R2_PUBLIC_DOMAIN || `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
    const publicUrl = `${baseUrl}/${path}`;

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: publicUrl, path, mimeType }),
    };
  } catch (error) {
    console.error('R2 upload error:', error.message);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to upload file' }),
    };
  }
};