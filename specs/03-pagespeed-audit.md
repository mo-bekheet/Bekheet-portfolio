# PageSpeed Insights Audit — 2026-09-05

**URL Tested:** https://bekheet.com (portfolio homepage)  
**Date:** Sep 5, 2026, 1:49 AM GMT+3  
**Lighthouse Version:** 13.4.1  
**Environment:** Emulated Moto G Power (mobile) / Desktop

---

## Summary Scores

| Category | Mobile | Desktop |
|----------|--------|---------|
| **Performance** | 58 | 69 |
| **Accessibility** | 85 | 85 |
| **Best Practices** | 92 | 92 |
| **SEO** | 100 | 100 |
| **Agentic Browsing** | 1/2 | 1/2 |

---

## Core Web Vitals (Mobile)

| Metric | Value | Rating | Threshold |
|--------|-------|--------|-----------|
| **First Contentful Paint (FCP)** | 7.1 s | ❌ Poor | < 1.8 s |
| **Largest Contentful Paint (LCP)** | 9.4 s | ❌ Poor | < 2.5 s |
| **Total Blocking Time (TBT)** | 120 ms | ⚠️ Needs Improvement | < 200 ms |
| **Cumulative Layout Shift (CLS)** | 0.001 | ✅ Good | < 0.1 |
| **Speed Index (SI)** | 7.1 s | ❌ Poor | < 3.4 s |

## Core Web Vitals (Desktop)

| Metric | Value | Rating | Threshold |
|--------|-------|--------|-----------|
| **First Contentful Paint (FCP)** | 1.2 s | ✅ Good | < 1.8 s |
| **Largest Contentful Paint (LCP)** | 2.2 s | ✅ Good | < 2.5 s |
| **Total Blocking Time (TBT)** | 300 ms | ⚠️ Needs Improvement | < 200 ms |
| **Cumulative Layout Shift (CLS)** | 0.01 | ✅ Good | < 0.1 |
| **Speed Index (SI)** | 2.4 s | ✅ Good | < 3.4 s |

---

## Top Performance Opportunities

### Mobile (High Impact)
| Opportunity | Estimated Savings |
|-------------|-------------------|
| Eliminate render-blocking resources | 1,800 ms |
| Improve image delivery (WebP/AVIF, proper sizing) | 1,446 KiB |
| Font display optimization (`font-display: swap`) | 90 ms |

### Desktop (High Impact)
| Opportunity | Estimated Savings |
|-------------|-------------------|
| Improve image delivery (WebP/AVIF, proper sizing) | 1,435 KiB |
| Font display optimization | 280 ms |
| Eliminate render-blocking resources | 140 ms |

---

## Diagnostics

| Issue | Mobile | Desktop |
|-------|--------|---------|
| Reduce JavaScript execution time | 1.6 s | — |
| Minimize main-thread work | 3.8 s | 2.6 s |
| Reduce unused JavaScript | 228 KiB | 228 KiB |
| Reduce unused CSS | 66 KiB | 65 KiB |
| Image elements without explicit width/height | ✅ Flagged | ✅ Flagged |
| Avoid enormous network payloads | 4,889 KiB | 4,889 KiB |
| Avoid long main-thread tasks | 10 tasks | 6 tasks |
| Avoid non-composited animations | 17 elements | 17 elements |

---

## Accessibility Issues (Score: 85)

| Issue | Severity |
|-------|----------|
| Buttons do not have accessible name | High |
| Links do not have discernible name | High |
| `[aria-hidden="true"]` elements contain focusable descendants | Medium |
| Heading elements not in sequentially-descending order | Medium |
| Document does not have a `<main>` landmark | Medium |
| SVG elements with `role="img"` lack accessible text alternative | Medium |
| 10 additional items requiring manual review | — |

---

## Best Practices Issues (Score: 92)

| Issue | Severity |
|-------|----------|
| Images with incorrect aspect ratio | Medium |
| Browser errors logged to console | Medium |
| Missing source maps for large first-party JS (desktop only) | Low |
| CSP not fully effective against XSS | Medium |
| HSTS policy could be stronger | Low |
| COOP not properly configured | Low |
| Trusted Types not implemented for DOM XSS mitigation | Medium |

---

## SEO (Score: 100)

All automated audits pass. One manual check required:
- Structured data validity (manual validation recommended)

---

## Agentic Browsing (Score: 1/2)

| Issue | Severity |
|-------|----------|
| Accessibility tree not well-formed for AI agents | High |

---

## Priority Action Items

### Critical (Mobile Performance)
1. **Optimize LCP/FCP** — 9.4s LCP is 3.7x over threshold
   - Preload hero image (`home-main.webp`)
   - Convert hero to WebP/AVIF with responsive sizes
   - Remove render-blocking CSS/JS from critical path
2. **Reduce main-thread blocking** — 3.8s main-thread work
   - Code-split heavy components (`threejs`, `@react-three/fiber`, `About` page)
   - Defer non-critical JS (analytics, chatbot, particles)
   - Implement `react-lazy` for below-fold sections

### High (Both)
3. **Image optimization** — 1.4 MiB savings
   - Serve WebP/AVIF via `<picture>` or image CDN
   - Add explicit `width`/`height` to all `<img>` elements
   - Implement responsive images with `srcset`
4. **Font optimization** — 90-280ms savings
   - Add `font-display: swap` to Google Fonts
   - Preload critical font files
   - Self-host fonts if possible

### Medium
5. **Accessibility fixes** — Add accessible names, fix heading order, add `<main>` landmark
6. **CSP hardening** — Already addressed in `security-hardening` branch (removed `unsafe-eval`, added `report-uri`)
7. **Trusted Types** — Implement for DOM XSS mitigation
8. **Console errors** — Investigate and fix browser errors

---

## Related Files

| File | Purpose |
|------|---------|
| `netlify.toml` / `vercel.json` / `public/_headers` | CSP, HSTS, COOP, Permissions-Policy headers |
| `src/components/Home/Home.jsx` | Hero section (LCP candidate) |
| `src/components/Particle.jsx` | Canvas animations (main-thread work) |
| `src/components/chatEngine/index.jsx` | Chatbot (defer loading) |
| `src/components/About/About.jsx` | Heavy 3D/Three.js component (code-split candidate) |
| `vite.config.js` | Build optimization (chunking, minification) |

---

## Next Steps

1. **Merge `security-hardening` branch** — CSP, CORS, sanitization fixes already address several Best Practices flags
2. **Create performance optimization branch** — Target mobile LCP < 2.5s, TBT < 200ms
3. **Implement image optimization pipeline** — Sharp/Vite plugin for WebP/AVIF + `srcset`
4. **Add `<main>` landmark and fix heading hierarchy** — Improve accessibility score to 90+
5. **Configure Trusted Types** — Requires CSP `trusted-types` directive + policy