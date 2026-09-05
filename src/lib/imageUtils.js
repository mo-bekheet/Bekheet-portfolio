const R2_PUBLIC_DOMAIN = import.meta.env.VITE_R2_PUBLIC_DOMAIN || '';
const R2_BUCKET_NAME = import.meta.env.VITE_R2_BUCKET_NAME || '';
const R2_ACCOUNT_ID = import.meta.env.VITE_R2_ACCOUNT_ID || '';

function getBaseUrl() {
  if (R2_PUBLIC_DOMAIN) return R2_PUBLIC_DOMAIN.replace(/\/$/, '');
  if (R2_BUCKET_NAME && R2_ACCOUNT_ID) {
    return `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  }
  return '';
}

export function getImageUrl(path, options = {}) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;

  const baseUrl = getBaseUrl();
  if (!baseUrl) {
    console.warn('R2 configuration missing, falling back to Supabase URL pattern');
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  if (!options.transform) {
    return `${baseUrl}/${cleanPath}`;
  }

  const params = new URLSearchParams();
  if (options.width) params.set('w', String(options.width));
  if (options.height) params.set('h', String(options.height));
  if (options.format) params.set('format', options.format);
  if (options.quality) params.set('q', String(options.quality));
  if (options.fit) params.set('fit', options.fit);

  const query = params.toString();
  return `${baseUrl}/resize/${cleanPath}${query ? `?${query}` : ''}`;
}

export function getResponsiveImageUrls(path, widths = [400, 800, 1200, 1600]) {
  if (!path) return { src: '', srcSet: { webp: '', avif: '' }, fallback: '' };

  const formats = ['webp', 'avif'];
  const srcSet = {};

  for (const format of formats) {
    srcSet[format] = widths
      .map(w => `${getImageUrl(path, { width: w, format, quality: 80 })} ${w}w`)
      .join(', ');
  }

  const fallback = getImageUrl(path, { width: Math.max(...widths), format: 'webp', quality: 80 });

  return {
    src: fallback,
    srcSet,
    fallback,
    widths,
  };
}

export function getPictureSources(path, options = {}) {
  const { widths = [400, 800, 1200, 1600], formats = ['avif', 'webp'], fallbackFormat = 'webp', ...baseOptions } = options;

  const sources = formats.map(format => ({
    type: `image/${format}`,
    srcSet: widths
      .map(w => `${getImageUrl(path, { ...baseOptions, width: w, format, quality: 80 })} ${w}w`)
      .join(', '),
  }));

  const fallback = getImageUrl(path, { ...baseOptions, width: Math.max(...widths), format: fallbackFormat, quality: 80 });

  return { sources, fallback };
}

export function isR2Configured() {
  return Boolean(getBaseUrl());
}

export function getFallbackUrl(path) {
  return getImageUrl(path);
}