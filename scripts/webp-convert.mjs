import { chromium } from 'playwright';
import { writeFile } from 'fs/promises';
import { createServer } from 'http';
import { readFile } from 'fs/promises';

const server = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.slice(1));
  try {
    const body = await readFile(p);
    res.setHeader('Content-Type', p.endsWith('.png') ? 'image/png' : 'application/octet-stream');
    res.end(body);
  } catch {
    res.statusCode = 404;
    res.end();
  }
});
await new Promise(r => server.listen(4188, r));

const jobs = [
  { src: 'src/assets/avatar.png', out: 'src/assets/avatar.webp', w: 500 },
  { src: 'src/assets/home-main.png', out: 'src/assets/home-main.webp', w: 700 },
  { src: 'src/assets/Projects/amazon.png', out: 'src/assets/Projects/amazon.webp', w: 640 },
  { src: 'src/assets/Projects/cgen.png', out: 'src/assets/Projects/cgen.webp', w: 640 },
  { src: 'src/assets/Projects/coptic.png', out: 'src/assets/Projects/coptic.webp', w: 640 }
];

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:4188/');

for (const job of jobs) {
  const b64 = await page.evaluate(async ({ path, width }) => {
    const res = await fetch(path);
    const blob = await res.blob();
    const bmp = await createImageBitmap(blob);
    const scale = Math.min(1, width / bmp.width);
    const canvas = new OffscreenCanvas(bmp.width * scale, bmp.height * scale);
    canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const webp = await canvas.convertToBlob({ type: 'image/webp', quality: 0.82 });
    const buf = await webp.arrayBuffer();
    let bin = '';
    new Uint8Array(buf).forEach(b => (bin += String.fromCharCode(b)));
    return btoa(bin);
  }, { path: job.src, width: job.w });
  await writeFile(job.out, Buffer.from(b64, 'base64'));
  console.log(job.out);
}

await browser.close();
server.close();
