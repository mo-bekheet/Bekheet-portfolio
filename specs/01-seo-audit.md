# SEO Audit: bekheet.com

**Date:** 4 September 2026
**Auditor:** technical SEO review
**Input received:** Live URL only. Homepage crawled, server response checked for every nav route, rendered DOM and raw server HTML inspected. No Search Console or crawl export provided.
**Environment:** Vercel hosting, Vite + React SPA (React Router), Bootstrap 5.3.2 + Three.js bundles.

---

## Summary table

| # | Issue | Severity | Type |
|---|-------|----------|------|
| 1 | Every page except the homepage returns HTTP 404 | CRITICAL | MECHANICAL |
| 2 | Server sends an empty page, all content drawn by JavaScript | CRITICAL | DECISION |
| 3 | No structured data anywhere on the site | HIGH | MECHANICAL |
| 4 | All four routes share one title and one meta description | HIGH | DECISION |
| 5 | No canonical tag | HIGH | MECHANICAL |
| 6 | Four H1 headings on the homepage, none carrying a query | HIGH | MECHANICAL |
| 7 | Testimonial block duplicated three times in the page HTML | MEDIUM | MECHANICAL |
| 8 | No link preview tags, shared links render as bare URLs | MEDIUM | MECHANICAL |
| 9 | Missing and unhelpful image alt text | MEDIUM | MECHANICAL |
| 10 | Nav and social links have no readable anchor text | MEDIUM | MECHANICAL |
| 11 | No robots.txt and no sitemap.xml | MEDIUM | MECHANICAL |
| 12 | Third-party visitor counter loads on every page view | LOW | DECISION |
| 13 | Favicon type does not match the file | LOW | MECHANICAL |

---

## 1. Every page except the homepage returns a 404 to the server

**Severity:** CRITICAL | **Type:** MECHANICAL

**Evidence:** Each nav destination was requested directly. `/about`, `/project`, `/certificate`, `/resume` all return HTTP 404 with Vercel's "404: NOT_FOUND" page. Only `/` returns 200. Clicking the links inside the site works, because React Router swaps content in the browser without asking the server, but a direct visit, a refresh, a bookmark, or a Google crawl gets the 404 page.

**Why it matters:** Four of five URLs do not exist as far as Google, LinkedIn, or anyone pasting a link is concerned. Projects, certifications, and the resume cannot be indexed or shared at all. Everything else in this audit is cosmetic next to this.

**Fix:** Add `vercel.json` at the repo root so the server hands every unknown path to the app.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Redeploy, then test `https://bekheet.com/about` in a private window. It should return the About page, not the 404.

---

## 2. The server sends an empty page, all content is drawn by JavaScript

**Severity:** CRITICAL | **Type:** DECISION

**Evidence:** The raw HTML at `/` is 1,329 bytes. It contains the `<title>`, the meta description, and an empty `<div id="root">`. No headings, no body text. The roughly 13,000 characters of visible text only appear after the JavaScript bundle runs, which includes a Three.js bundle.

**Why it matters:** Google can run JavaScript, but it queues those pages for a second pass, so indexing is slower and less reliable. Most other crawlers do not run JavaScript at all, including LinkedIn, X and WhatsApp link previews, and the AI crawlers that answer "who is Mohamed Bekheet" questions. They all see a blank page with a title.

**Fix:** Decide how to get HTML out of the build.

- Cheapest option that fits the current setup: add prerendering to the Vite build (`vite-plugin-prerender` or `react-snap`) so each route ships as a static HTML file with its content already in it.
- Larger option: move to a framework that renders on the server, such as Next.js or Remix.

For a portfolio, prerendering is enough. Do not attempt this before fix 1, since prerendering also depends on the routes existing.

---

## 3. No structured data anywhere on the site

**Severity:** HIGH | **Type:** MECHANICAL

**Evidence:** Zero `<script type="application/ld+json">` blocks in the head or the rendered DOM.

**Why it matters:** Structured data is a block of machine-readable facts. It is what Google and AI assistants read to decide that "Mohamed Bekheet" is a specific person with a job, an employer and a set of profiles, rather than a string of text. For a personal brand site competing against its owner's own LinkedIn and GitHub profiles for their name, this is the biggest packaging win available.

**Fix:** Paste into `index.html` inside `<head>`, correcting job title and employer if the site should say something different from what it says now.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mohamed Bekheet",
  "url": "https://bekheet.com/",
  "jobTitle": "Machine Learning Engineer",
  "worksFor": { "@type": "Organization", "name": "Bexprt" },
  "knowsAbout": ["Machine Learning","Computer Vision","Optical Character Recognition","Generative AI","Retrieval-Augmented Generation","MLOps","AWS Bedrock","AWS SageMaker"],
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "Ain Shams University" },
  "sameAs": [
    "https://github.bekheet.com",
    "https://linkedin.bekheet.com",
    "https://kaggle.bekheet.com",
    "https://dev.to/mohamed-bekheet"
  ]
}
</script>
```

Every value above matches something already visible on the pages, which is the rule. Do not add a claim the page does not show.

---

## 4. All four routes share one title and one meta description

**Severity:** HIGH | **Type:** DECISION

**Evidence:** On `/about` the title was still "Mohamed Bekheet - Machine Learning Engineer | AI Specialist Portfolio" and the description was still the homepage's. The head is static in `index.html` and nothing updates it per route.

**Why it matters:** Once fix 1 lands and the four pages become real URLs, they will all present identically in search results. Google picks one and ignores the rest, and the one it shows will not match what the searcher asked for.

**Fix:** Add per-route head tags (`react-helmet-async`, or set them in the prerender step). Suggested targets, to sanity check against how you want to be found:

| Route | Title |
|-------|-------|
| `/` | Mohamed Bekheet \| Machine Learning Engineer, Computer Vision and Generative AI |
| `/about` | About Mohamed Bekheet \| ML Engineer, AWS Bedrock and SageMaker |
| `/project` | Machine Learning and Computer Vision Projects \| Mohamed Bekheet |
| `/certificate` | AI and Machine Learning Certifications \| Mohamed Bekheet |
| `/resume` | Mohamed Bekheet Resume \| Machine Learning Engineer |

Each route also needs its own description of roughly 150 characters describing that page specifically.

---

## 5. No canonical tag

**Severity:** HIGH | **Type:** MECHANICAL

**Evidence:** No `<link rel="canonical">` in the head or the DOM.

**Why it matters:** A canonical tag tells Google which address is the real one when the same page is reachable at several. Without it, `bekheet.com/`, a `www.` version, and any link shared with a tracking parameter attached can each be treated as a separate page, splitting the credit for the name.

**Fix:** Add now: `<link rel="canonical" href="https://bekheet.com/" />`. When fix 4 lands, make this per-route too, pointing at each page's own clean URL.

---

## 6. Four H1 headings on the homepage, and none says what the page is about

**Severity:** HIGH | **Type:** MECHANICAL

**Evidence:** Homepage H1s in order: "Hi There! 👋🏻", "I'M Mohamed Bekheet", "ABOUT ME", "Testimonial". The `/about` view has seven H1s. Several H3s are empty.

**Why it matters:** The H1 is the page's one-line answer to "what is this". The current one answers "hi there". Multiple H1s are not a penalty, but they leave Google guessing which is the summary, and none of the four carries a phrase anyone would search.

**Fix:** One H1 per page, everything below it H2 or H3. On the homepage make the H1 `Mohamed Bekheet, Machine Learning Engineer` and demote "Hi There!" to a styled `<p>` or `<span>`, "ABOUT ME" and "Testimonial" to `<h2>`. Style stays the same, only the tag changes. Also fill or remove the empty H3s on `/about`.

---

## 7. The testimonial block is duplicated three times in the page HTML

**Severity:** MEDIUM | **Type:** MECHANICAL

**Evidence:** The seven testimonials appear three times over in the rendered DOM, once as real content and twice as carousel clones. Of roughly 13,200 characters of text on the homepage, about 11,000 is testimonial text, and two thirds of that is duplicate.

**Why it matters:** The homepage's dominant content is other people's recommendation text repeated three times, while the text describing what the site owner actually does is six paragraphs. Google evaluates the page on the whole of it. Repeated blocks also dilute the keyword signal from the parts that matter.

**Fix:** In the carousel, mark cloned slides `aria-hidden="true"` and, better, render only the visible slide plus its neighbours rather than three full copies. Separately, consider moving the full testimonial set to its own page and keeping two or three on the homepage.

---

## 8. No link preview tags, shared links render as bare URLs

**Severity:** MEDIUM | **Type:** MECHANICAL

**Evidence:** No `og:` or `twitter:` meta tags at all.

**Why it matters:** Not a ranking factor, but this site gets shared on LinkedIn. Right now a shared bekheet.com shows no image, no title card and no summary, which measurably reduces clicks compared to a card with a photo and headline.

**Fix:** Add to `<head>`, after creating a 1200x630 preview image.

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://bekheet.com/">
<meta property="og:title" content="Mohamed Bekheet | Machine Learning Engineer">
<meta property="og:description" content="Production-grade AI systems across Computer Vision, OCR, Generative AI and MLOps, built on AWS Bedrock and SageMaker.">
<meta property="og:image" content="https://bekheet.com/og-image.png">
<meta name="twitter:card" content="summary_large_image">
```

---

## 9. Missing and unhelpful image alt text

**Severity:** MEDIUM | **Type:** MECHANICAL

**Evidence:** Of 26 images on the homepage, 14 have an empty `alt`. Others read `alt="brand"` and `alt="home pic"`.

**Why it matters:** Alt text is how Google reads an image, and how a screen reader user hears the page. "home pic" describes nothing.

**Fix:** Give every content image a description of what it shows. The 14 empty ones are carousel clones and disappear once finding 7 is fixed. Set `alt="Mohamed Bekheet"` on the hero image and `alt=""` deliberately on the logo if it sits next to the name in text.

---

## 10. Nav and social links have no readable anchor text

**Severity:** MEDIUM | **Type:** MECHANICAL

**Evidence:** Of 39 links on the homepage, 30 have empty text. They are icon-only links to GitHub, LinkedIn, Kaggle and dev.to, and to seven LinkedIn profiles, with no accessible label.

**Why it matters:** Anchor text tells search engines what is on the other end of a link. An empty link says nothing, and a screen reader announces it as "link". There are also no contextual links between the site's own pages, only the nav bar, so once the routes work each page will be reachable by one link and nothing more.

**Fix:** Add `aria-label="GitHub profile"` and equivalents to each icon link. Then add real text links in the body copy, for example a sentence at the end of the About text linking to `/project` with the anchor "computer vision and OCR projects".

---

## 11. No robots.txt and no sitemap.xml

**Severity:** MEDIUM | **Type:** MECHANICAL

**Evidence:** Both return HTTP 404.

**Why it matters:** Neither is required for a five-page site, and their absence does not block crawling. But a sitemap is how you tell Google that four new URLs just came into existence, which is exactly what happens the moment fix 1 deploys.

**Fix:** Add `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://bekheet.com/sitemap.xml
```

And `public/sitemap.xml` listing the five URLs. Then submit it in Search Console.

---

## 12. A third-party visitor counter loads on every page view

**Severity:** LOW | **Type:** DECISION

**Evidence:** An image request to `hitwebcounter.com/counter/counter.php` renders in the footer under "Visitors:".

**Why it matters:** An uncached external request on a hosted script you do not control, on a portfolio a recruiter or client might load on a phone. If that host is slow or down, the footer stalls or breaks. It also passes visitor data to a third party.

**Fix:** The call is whether a public visitor count is worth it. Recommendation: remove it and use Vercel Analytics, which is server side and adds nothing to the page.

---

## 13. Favicon type does not match the file

**Severity:** LOW | **Type:** MECHANICAL

**Evidence:** `<link rel="icon" type="image/svg+xml" href="/favicon.png">`. Declared type is SVG, the file is a PNG.

**Fix:** Change to `type="image/png"`.

---

## The one thing

Deploy the `vercel.json` rewrite from finding 1. Four of five pages currently return a 404 to every visitor who does not arrive by clicking inside the site, which means projects, certifications and the resume are unindexable and unshareable. Every other item on this list improves pages that are already reachable. This one turns pages that do not exist into pages that do. It is roughly a five-line file and a redeploy.

---

## What could not be checked

- **Content of /project, /certificate and /resume as served pages.** These were audited through client-side navigation only (see the UI/UX audit). As server-returned URLs they are 404s. Once fix 1 is live they can be requested directly and audited for headings, packaging and thin-content risk.
- **Whether these URLs are indexed, and which queries already get impressions.** Needs a Search Console export: Performance by page and by query for the last 3 months, plus the Pages report from Indexing. That shows whether the four 404 URLs were ever indexed and are now dropping out, and lets the packaging fixes be prioritised against queries the site already appears for.
- **Performance and Core Web Vitals.** No score is guessed here. `bootstrap.bundle.min.js` loads as a blocking script in the head, on top of a Vite bundle that includes Three.js, which is worth measuring. Needs a PageSpeed Insights report for `https://bekheet.com/`, or the Core Web Vitals report from Search Console.
- **www and http duplication.** `https://bekheet.com/` serves correctly. Whether `www.bekheet.com` and `http://bekheet.com` redirect to it or serve a second copy was not tested.
- **Backlinks and ranking for the owner's own name.** Needs Ahrefs, Semrush, or Search Console's Links report.
