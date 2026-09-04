# bekheet.com: consolidated problem list and fix checklist

**Date:** 4 September 2026
**Scope:** Two audits of https://bekheet.com, combined into one prioritised worklist.
**Stack observed:** Vite + React SPA, React Router, Bootstrap 5.3.2, Three.js, react-slick, tsParticles, hosted on Vercel.

Full detail lives in:

- [`01-seo-audit.md`](./01-seo-audit.md) - 13 findings, indexability through performance signals
- [`02-uiux-audit.md`](./02-uiux-audit.md) - 20 findings, layout, hover states, overlap, accessibility

Labels used below:

- **MECHANICAL** - safe to apply as written
- **DECISION** - needs a human call, and the call is stated

---

## Blockers, fix these first

These four break the site rather than degrade it. Everything else on this page can wait behind them.

- [ ] **B1. All four inner routes return HTTP 404 on direct load.** `/about`, `/project`, `/certificate`, `/resume` all return Vercel's 404 page. Only `/` returns 200. Add a `vercel.json` SPA rewrite and redeploy. *MECHANICAL. SEO #1.*
- [ ] **B2. Mobile page is 86px wider than the viewport, hamburger menu is off-screen.** Caused by `.form-container` sitting at `translateX(100px)` in its pre-animation state with no clipping ancestor. Add `body { overflow-x: clip; }` and fix the reveal animation. Nobody on a phone can open the menu. *MECHANICAL. UI/UX #1.*
- [ ] **B3. Floating chat button covers the email input and message textarea.** Fixed at 1293-1383 x 760-850, `z-index: 1000`, overlapping both fields at 1440px wide. Add right padding to the contact card and tuck the launcher while the contact section is on screen. *MECHANICAL. UI/UX #2.*
- [ ] **B4. Server sends an empty 1,329-byte shell, all content is JavaScript-rendered.** No crawler that skips JS sees anything, including link previews. Add prerendering to the Vite build, or move to a server-rendering framework. Do this after B1. *DECISION: prerender vs framework migration. SEO #2.*

---

## High priority

### Discoverability

- [ ] **H1. No structured data.** Add the `Person` JSON-LD block from SEO #3 to `index.html`. *MECHANICAL.*
- [ ] **H2. All routes share one title and one meta description.** Add per-route head tags via `react-helmet-async` or in the prerender step. Suggested titles are in SEO #4. *DECISION: final wording per page.*
- [ ] **H3. No canonical tag.** Add `<link rel="canonical" href="https://bekheet.com/" />`, per-route once H2 lands. *MECHANICAL.*
- [ ] **H4. Four H1s on the homepage, seven on About, none carrying a query.** One H1 per page, demote the rest to H2/H3, fill or remove empty H3s. *MECHANICAL.*

### Interaction and accessibility

- [ ] **H5. Nav links have zero hover feedback.** `display: none !important` kills the underline `::after`; `color: #fff !important` blocks any hover colour. Remove both overrides, add a purple hover and an active state, and fix the two conflicting blue `a:hover` colours. *MECHANICAL. UI/UX #3.*
- [ ] **H6. Focus rings deleted.** Remove the four `outline: none` rules, add a global `:focus-visible` ring, add `aria-expanded` to the hamburger, add a skip link. *MECHANICAL. UI/UX #4.*
- [ ] **H7. 32 of 47 focusable elements have no accessible name.** Add `aria-label` to every icon-only link: 10 social links, 7 testimonial avatars, the unlabeled nav fork/star pill. *MECHANICAL. UI/UX #5, SEO #10.*
- [ ] **H8. Contact form has three empty `<label>` elements, no `required`, no `autocomplete`, no success or error feedback.** Add visible labels, validation, and a polite live region confirming send. *MECHANICAL. UI/UX #6.*
- [ ] **H9. Ten `<b class="purple">` phrases look identical to links but are not clickable.** Either make them real internal links to the matching project or certification, or restyle them so they read as emphasis. *DECISION: links vs restyle. UI/UX #7.*

### Content

- [ ] **H10. The Resume page is one flat image.** The whole page holds 130 characters of text. No selectable email or phone, no search, unreadable at phone width, invisible to screen readers. Rebuild as HTML. *DECISION: full HTML rebuild vs text-layer PDF viewer as an interim. UI/UX #8.*

---

## Medium priority

- [ ] **M1. Testimonials are rendered three times in the DOM** (carousel clones). About 11,000 of the homepage's 13,200 characters are testimonial text, two thirds of it duplicate. Mark clones `aria-hidden="true"`, or render only the visible slide plus neighbours. *MECHANICAL. SEO #7, UI/UX #11.*
- [ ] **M2. No `og:` or `twitter:` tags.** Shared links render with no card. Add the block from SEO #8 plus a 1200x630 image. *MECHANICAL.*
- [ ] **M3. Project card CTAs sit at different heights in the same row** (123 / 106 / 17px from the card bottom; 131 / 47 / 17px in row two), and card copy is `text-align: justify`. Make cards flex columns with `margin-top: auto` on the button, switch copy to left-aligned, raise buttons to 44px minimum. *MECHANICAL. UI/UX #9.*
- [ ] **M4. Certification badges range from 200x191 to 1090x600 natural size**, one is upscaled and soft, one is a landscape certificate crushed into a portrait box, titles wrap to different line counts misaligning badges by 12px, and no card is a link. Standardise to 600x600 squares, reserve a two-line title height, link each card to its Credly or issuer verification page. *MECHANICAL, plus a DECISION on the Huawei certificate scan. UI/UX #10.*
- [ ] **M5. Carousel arrows are 20x20 with no accessible name.** Below the 24x24 WCAG minimum and a quarter of the 44px recommendation. Restyle to 44x44, add `aria-label`. *MECHANICAL. UI/UX #11.*
- [ ] **M6. Mohamed Elesawy's testimonial avatar links to Eslam Elassal's LinkedIn profile.** Duplicated URL. Correct it and add a uniqueness guard on the testimonial array. *MECHANICAL. UI/UX #12.*
- [ ] **M7. Kaggle and DEV icons are wordmarks at 24px and render as illegible light rectangles** next to three clean glyphs. Swap to `SiKaggle` and `SiDevdotto` glyphs. *MECHANICAL. UI/UX #13.*
- [ ] **M8. Five mobile social tiles wrap four plus one, orphaning the last.** Shrink to 48x48 with a 12px gap, or use a 5-column grid. *MECHANICAL. UI/UX #14.*
- [ ] **M9. All 26 homepage images lack `width`/`height` and none is lazy-loaded.** Causes layout shift and loads roughly 14 off-screen clone images upfront. Add dimensions, `loading="lazy"` below the fold, `fetchpriority="high"` on the hero. *MECHANICAL. UI/UX #15, SEO-adjacent.*
- [ ] **M10. 14 of 26 images have empty alt text**, others read `alt="brand"` and `alt="home pic"`. Describe what each image shows. *MECHANICAL. SEO #9.*
- [ ] **M11. No robots.txt and no sitemap.xml** (both 404). Add both, submit the sitemap in Search Console after B1 ships. *MECHANICAL. SEO #11.*
- [ ] **M12. No internal links between pages beyond the nav bar.** Add contextual links with descriptive anchors, for example from the About copy to `/project`. *MECHANICAL. SEO #10.*

---

## Low priority

- [ ] **L1. "andoptimize systems"** - missing space in the last About paragraph, from a `<b>` tag opening immediately after "and". *MECHANICAL. UI/UX #16.*
- [ ] **L2. Section gaps run 250px, 447px, then 126px.** The 447px starfield void before the contact form reads as the end of the page. Adopt a spacing scale and one standard section gap. *MECHANICAL. UI/UX #17.*
- [ ] **L3. Three unrelated dark tones declared:** `html` at `rgb(36,36,36)`, `body` white under a purple gradient, footer at `rgb(33,33,33)`. Tokenise the palette, set a real dark `background-color` on `html` and `body`, add a print stylesheet. *MECHANICAL. UI/UX #18.*
- [ ] **L4. Font stack is `Raleway, serif`.** Add a sans fallback chain and `font-display: swap`. *MECHANICAL. UI/UX #19.*
- [ ] **L5. hitwebcounter.com visitor counter in the footer.** Dated look, third-party request, and a low public count works against the site. Replace with Vercel Analytics or Plausible. *DECISION: keep a public count or not. UI/UX #20, SEO #12.*
- [ ] **L6. Favicon declared `type="image/svg+xml"` but the file is `favicon.png`.** *MECHANICAL. SEO #13.*

---

## Suggested sequencing

1. **Ship B1 alone.** One `vercel.json` file, one redeploy. Verify all five URLs return 200 in a private window before touching anything else.
2. **Ship B2 and B3 together** as a CSS-only change. Both are a handful of lines and both are user-facing blockers.
3. **Ship H1 through H4 together** as a head-tags pass, since they all touch the same place and H2 depends on B1 being live.
4. **Ship H5 through H9** as an interaction and accessibility pass. This is where the CSS overrides get cleaned up.
5. **Then B4**, since prerendering is the largest change and benefits from the head tags already being per-route.
6. **Work the medium list** in whatever order fits, starting with M1, since deduplicating the carousel clones also resolves parts of M9 and M10.
7. **Low priority items** are good filler work, and L1 takes thirty seconds.

---

## What was not verified, and what would unlock it

| Unchecked | What is needed |
|-----------|----------------|
| Whether any URL is indexed, and which queries already get impressions | Search Console export: Performance by page and by query, last 3 months, plus the Indexing > Pages report |
| Core Web Vitals and real performance | PageSpeed Insights report for the homepage, or Search Console's Core Web Vitals report. Note that `bootstrap.bundle.min.js` is a blocking head script on top of a Vite bundle containing Three.js |
| `www` and `http` duplication | Load `www.bekheet.com` and `http://bekheet.com` and check whether they redirect to the canonical host or serve a second copy |
| Backlinks and ranking for the owner's own name | Ahrefs, Semrush, or Search Console's Links report |
| Whether tsParticles and the Three.js globe respect `prefers-reduced-motion` | Two CSS blocks handle it, but the JS-driven animations are separate systems and need a code check |
| Placeholder text contrast in the contact form | Measure once real labels are in place, since the placeholder role changes |
| Inner-route pages as served HTML | Blocked on B1. They were audited through client-side navigation only |
