import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { extname, join, normalize } from 'path';

const DIST = 'dist';
const PORT = 4199;
const ROUTES = ['/', '/about', '/project', '/certificate', '/resume', '/blog'];

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p === '/') p = '/index.html';
    let file = join(DIST, normalize(p).replace(/^(\.\.[/\\])+/, ''));
    let body = await readFile(file).catch(() => null);
    if (!body && !extname(p)) {
      body = await readFile(join(DIST, 'index.html'));
      res.setHeader('Content-Type', 'text/html');
      res.end(body);
      return;
    }
    if (!body) {
      res.statusCode = 404;
      res.end('nf');
      return;
    }
    res.setHeader('Content-Type', MIME[extname(p)] || 'application/octet-stream');
    res.end(body);
  } catch {
    res.statusCode = 500;
    res.end();
  }
});

await new Promise(r => server.listen(PORT, r));
const browser = await chromium.launch();

for (const route of ROUTES) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#preloader', { state: 'detached', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1200);
  const html = await page.evaluate(() => document.documentElement.outerHTML);
  const dir = route === '/' ? DIST : join(DIST, route.replace(/^\//, ''));
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), `<!doctype html>${html}`);
  console.log(`prerendered ${route}`);
  await page.close();
}

await browser.close();
server.close();
console.log('prerender complete');
