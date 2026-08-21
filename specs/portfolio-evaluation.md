# Portfolio Evaluation & Test Report — Aug 22, 2026

Full-stack audit of bekheet.com covering UI/UX, content, branding, technical health, and recruiter experience — plus a new automated test suite (Vitest + Playwright).

**Scope:** Local production build (`npm run build` + preview), desktop 1920×1080 and mobile 375×812 / Pixel-class emulation.
**Companion audits:** [`README.md`](./README.md) (PageSpeed register), [`performance.md`](./performance.md), [`accessibility.md`](./accessibility.md), [`seo.md`](./seo.md).

---

## Scores at a glance

| Area | Score | Verdict |
|---|---|---|
| UI/UX | 7.5/10 | Strong visuals, heavy animation load, a11y gaps |
| Content | 8/10 | Rich and credible; needs impact metrics and trimming |
| Personal Branding | 8/10 | Clear AI/ML identity; consistent handles; strong certs |
| Projects | 7/10 | Good breadth; weak outcomes/metrics; no live demos |
| Mobile UX | **5/10 → fixed to ~8** | Critical zoom-out bug found and fixed |
| SEO | 6/10 | Basics done; no OG/Twitter/canonical/sitemap/JSON-LD |
| Recruiter Perspective | 7.5/10 | Value clear in <10s; achievements need numbers |
| **Overall** | **7.4/10** | Solid portfolio; mobile + SEO are the biggest levers |

---

## What was tested

### Automated tests added (all passing)

- **19 unit/component tests** (`npx test`, Vitest + Testing Library):
  - Navbar: logo renders, all 5 nav links present with correct routes
  - ProjectCards: title/description render, GitHub/Blog/Demo button logic
  - Data integrity: 9 projects + 12 certifications complete and unique
  - AppContext: default theme, theme toggle, notification add/remove, provider guard
- **18 E2E tests** (`npx run test:e2e`, Playwright — chromium + mobile projects):
  - All routes navigate and render key content; unknown route redirects home
  - Contact form accepts input
  - Chatbot opens ("AI Assistant" header) and closes
  - Mobile: hamburger menu opens nav links; 9 project cards visible
  - Console-health check: zero React errors on home page

**Scripts added:** `test`, `test:watch`, `test:ui`, `test:e2e`, `test:all`.
**Configs added:** `vitest.config.js`, `playwright.config.js`, `src/test/setup.js`.

---

## Bugs found by testing — FIXED during this audit

1. **[CRITICAL] Mobile page rendered zoomed-out (layout expanded to ~461px on a 375px screen).**
   Horizontal overflow let mobile browsers shrink-to-fit the whole site, making text tiny and tap targets shift — this also made the hamburger/chatbot unreliable for real users.
   **Fix:** `html, body { overflow-x: hidden }` in `src/index.css`. Verified: hamburger + chatbot now pass on mobile emulation.

2. **[HIGH] React duplicate-key error in Testimonials** — two testimonials shared `id: 6` ("Mohamed Elesawy", "Mohamed Salah"), causing console errors every home-page visit.
   **Fix:** renumbered to unique ids.

3. **[HIGH] Wrong testimonial link** — "Mohamed Elesawy" (FORTE CLOUD colleague) linked to Eslam Elassal's LinkedIn profile (misattribution).
   **Fix:** pointed at LinkedIn keyword search; replace with his real profile URL when available.

4. **[MEDIUM] Notification IDs collided** — `Date.now()` used as ID meant two notifications created in the same millisecond removed together.
   **Fix:** id now `${Date.now()}-${random suffix}` in `AppContext.jsx`.

5. **[LOW] Dead inline hover style** — `'&:hover'` inside an inline `style` object does nothing (invalid CSS-in-JS).
   **Fix:** moved to `.testimonial-left/right a:hover img` rule in `App.css`.

---

## Prioritized fix list (remaining)

### Critical
- [ ] **Add missing Open Graph/Twitter meta + canonical URL** (`index.html`). Links shared on LinkedIn/X/WhatsApp render bare URLs today — high cost for a job-seeking site. Add JSON-LD `Person` schema too.
- [ ] **Disable sourcemaps in production builds** — `dist/assets/index-*.js.map` is 14 MB (main bundle itself is 2.9 MB). Set `build.sourcemap: false` or `'hidden'`; also consider splitting the main chunk further.

### Important
- [ ] **Fill `issueDate` for Deep Learning Nanodegree** in `certificationData.js` (tracked as a todo test so it can't be forgotten).
- [ ] **Replace placeholder `link: "#"`** on the two newest AWS certs (GenAI Developer–Professional, Data Engineer) with Credly badge URLs.
- [ ] **Trim testimonial #3 (Mahmoud Saeed)** — ~200 words; cut to 2–3 sentences like the others.
- [ ] **Route the Blog page** (`/blog`) or remove it from the build; currently unreachable dead weight.
- [ ] **Accessibility quick wins** (details in [`accessibility.md`](./accessibility.md)): add `<main>` landmark, skip-to-content link, aria-labels for icon-only buttons (GitHub buttons on project cards all read "GitHub" — prefix with project name), fix heading order (page uses multiple `h1`s: "Hi There!", "ABOUT ME", "Testimonial" should be one `h1` + `h2`s).
- [ ] **Contact form labels**: inputs rely on placeholders only; add visually-hidden `<label>`s.

### Nice to have
- [ ] Add 1–2 sentence **outcome metrics** to top 3 projects (e.g., "reduced inference latency X%", "processed N records/day").
- [ ] Lazy-load below-the-fold heavy assets (testimonial avatars, GitHub calendar) and respect `prefers-reduced-motion` for particles/3D/lottie.
- [ ] Add `robots.txt` + `sitemap.xml`.
- [ ] Consider a light/dark toggle wired to the existing AppContext theme state (state exists, UI doesn't expose it).
- [ ] Chatbot shows honest "System is offline" without an API key (good), but surface a contact fallback link inside the offline panel.

---

## Detailed notes per area

### UI/UX — 7.5
Cohesive dark glassmorphism theme, animated hero (typewriter + tilt photo), smooth page transitions. Deductions: animation stack (particles + R3F canvas + lottie + marquee) risks jank on low-end devices; heading hierarchy misused; icon-only buttons lack labels.

### Content — 8
About copy is specific (RAG, OCR, SageMaker/Bedrock named). Experience timeline covers FORTE CLOUD, TA role, Valeo, freelance. Education: MSc Ain Shams (ongoing), MEng uOttawa (A+), BSc. Weak spots: wall-of-text paragraphs (no line breaks render between sentences), testimonials uneven in length, no quantified achievements anywhere.

### Personal Branding — 8
Consistent subdomain handles (github.bekheet.com, kaggle.bekheet.com…), unified "ML Engineer / Generative AI" positioning, visitor counter and craft footer add personality. The AI chatbot persona ("Husam") is a memorable differentiator.

### Projects — 7
9 projects span CV, NLP, GenAI (CGAN), and serious data engineering (EMR, Redshift, Cassandra, Postgres) incl. a Microsoft-sponsored one (CopticTrans). All link to GitHub; none show live demos, metrics, or architecture write-ups. Cards lack tech-stack tags.

### Mobile UX — 5→~8 after fixes
The zoom-out bug was the single worst finding of this audit; post-fix, nav toggle works, cards reflow, chatbot opens. Remaining: carousel dots tiny on touch, long testimonial paragraphs dominate small screens.

### SEO — 6
Good title/description/keywords; `lang="en"` set. Missing: OG/Twitter cards, canonical, structured data, sitemap, robots.txt. (See [`seo.md`](./seo.md) which already scores crawl basics at 100.)

### Recruiter perspective — 7.5
Within one screen: name, typewriter roles, 5 social links, strong photo — value prop lands fast. Certifications page is exceptional proof (12 certs across AWS/Azure/GCP/IBM/Huawei). Friction: resume page is an image + download only (not text-searchable/ATS-parseable); no email visible without scrolling to footer form; "Blog" absent from nav while Resume/Certifications shine.

---

## How to run the tests

```bash
npm test            # unit/component (Vitest)
npm run test:e2e    # browser E2E against production preview (Playwright)
npm run test:all    # both
```

E2E auto-builds nothing: it serves `dist/` via `vite preview` on :4173 — run `npm run build` first if you changed code.
