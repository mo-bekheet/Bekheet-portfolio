# Problem Register — Round 2 Audit (Aug 22, 2026)

Issues raised by the external screenshot-based evaluation, each re-verified against the codebase and live site (local build + bekheet.com). Companion to [`portfolio-evaluation.md`](./portfolio-evaluation.md).

## Critical

- [x] **P1. Apparent employment gap (site + PDF).**
  RESOLVED via `specs/linkerdin.md` sync: Bexprt AI Delivery Engineer (Apr 2026 – Present) added, FORTE CLOUD corrected to Jul 2023 – Apr 2026, Microsoft ML Researcher internship (Sep 2022 – Feb 2023) restored. Timeline is gap-free on the site. Resume PDF (`Mohamed-Bekheet_page-0001.jpg`) still shows old dates — regenerate from updated resume (static asset, owner action).

## High

- [x] **P2. Navbar scroll-listener leak.** `window.addEventListener("scroll", scrollHandler)` runs on every render with no cleanup (`Navbar.jsx:32`) — listener accumulates across renders; also runs during SSR-less mount cycles. Fix with `useEffect` + cleanup.
- [x] **P3. Two conflicting "About Me" bios.** Homepage bio says "I'm Mohamed Bekheet…" (ML engineer, production systems). About page says "I'm Mohamed Bekheet Abdelall…" with filler bullets ("Revolutionizing Life with AI", "Innovative Exploration") and a self-authored quote. Unify into one canonical bio, consistent name, cut filler.
- [x] **P4. Udacity-coursework projects read as original work.** EMR / Redshift / Postgres / Cassandra cards reuse the Sparkify scenario boilerplate nearly verbatim; data-savvy recruiters recognize the Nanodegree exercises instantly, discounting the section. Fix: label as coursework, rewrite each description around what *he* built, keep CopticTrans/CardioAI leading.

## Medium

- [x] **P5. Icon-only controls lack accessible names.** Nav fork button (fork+star icons — renders as ambiguous glyphs per external review), 5 hero social links (tooltip-only), chatbot toggle button, 9 project-card "GitHub" buttons (indistinguishable from each other). Add `aria-label`s; prefix GitHub buttons with project titles.
- [x] **P6. Contact form has placeholder-only fields.** No `<label>`s for Name / Email / Message — fails WCAG 1.3.1/4.1.2 and Lighthouse a11y. Add visually-hidden labels.
- [x] **P7. Heading hierarchy broken.** Home uses four `h1`s ("Hi There!", name, "ABOUT ME", "Testimonial"), then `h3` "Contact."; About repeats the pattern. One `h1` per page, demote rest to `h2`.
- [x] **P8. Fork button URL relies on redirect.** Points to `github.com/mohamedbakhet/Bekheet.github.io` (301 → `mo-bekheet/Bekheet-portfolio`). Point directly at the canonical repo.
- [x] **P9. SEO sharing/social meta missing** (carried over, still open): no OG/Twitter tags, canonical URL, JSON-LD Person schema, robots.txt, sitemap.xml.

## Low

- [x] **P10. Date typo:** `"Jul 2023 - july 2025"` (lowercase july) in `experiecesContent.js`.
- [x] **P11. Skills marquee clipped edges** have no fade/scroll affordance — rows appear cut off. Add gradient masks.
- [x] **P12. Dead `'&:hover'` inline style** in Testimonials `imgStyle2` — FIXED this round (moved to `App.css`).
- [x] **P13. Production sourcemaps ship ~18 MB** alongside a 2.9 MB main bundle — disable or use `hidden`.

## Investigated — not reproducible / verified OK

| Claim | Result |
|---|---|
| Stray white input box floating over nav (Resume/Education/Skills) | **Not reproduced** — zero positioned `input`/`textarea` elements found locally or on deployed bekheet.com; likely a screenshot artifact |
| Subdomain redirects (github/linkedin/kaggle/medium/credly.bekheet.com) | **All valid** — resolve to correct profiles (LinkedIn/Medium 403 = bot-blocking only) |
| Resume download | Real PDF asset served from `/assets/*.pdf` (not just an embed); PDF itself is image-based — make it text-selectable/ATS-friendly |
| Duplicate React keys in Testimonials | **Fixed earlier today** (unique ids); wrong Elesawy link fixed |
| Mobile zoom-out / unclickable nav | **Fixed earlier today** (`overflow-x: hidden`) |
| Unused 60 MB `public/earth/` GLTF textures | **Removed** — only `public/planet/` is referenced; dist shrank 78 MB → 38 MB |

## Round 3 enhancement plan (Aug 22, 2026) — all shipped

- Content sync from `linkerdin.md`: Bexprt role, corrected dates, Microsoft internship, Claude Certified Architect cert, new typewriter roles, chatbot persona updated.
- Blog route wired (`/blog` + navbar link), `react-markdown` installed.
- Perf: bootstrap CSS bundled locally (no CDN render-blocking JS/CSS), fonts async with `media=print` swap trick, `React.lazy` route splitting + lazy EarthCanvas/tsparticles, WebP hero/avatar/top project images (~95% smaller), hidden sourcemaps, reduced-motion fallbacks. Prerendered static HTML per route in postbuild for crawlers/agentic browsing.
- Security: CSP + hardening headers shipped for both Vercel (`vercel.json`) and Netlify (`public/_headers`); wildcard CORS removed.

*Remaining owner actions:* regenerate resume PDF with current dates; replace Claude cert placeholder image; supply real Elesawy LinkedIn URL; compress remaining SVG assets if desired.

*Note: CopticTrans and CardioAI already lead `projectsData.js`; the perceived ordering issue comes from card layout scanning — coursework labeling (P4) addresses it.*
