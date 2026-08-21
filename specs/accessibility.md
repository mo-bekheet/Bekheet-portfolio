# Accessibility — 85/100 (mobile & desktop)

## Automated failures

- [ ] **Buttons do not have an accessible name** — add visible text or `aria-label`.
- [ ] **Links do not have a discernible name** — same fix; avoid icon-only or empty links with no label.
- [ ] **`[aria-hidden="true"]` elements contain focusable descendants** — either remove `aria-hidden`, or make the descendants non-focusable (`tabindex="-1"`, `inert`, etc.).
- [ ] **Heading elements are not in a sequentially-descending order** — fix the hierarchy (h1 → h2 → h3, no skipped levels).
- [ ] **Document does not have a `main` landmark** — wrap primary content in `<main>`.
- [ ] **SVG elements with an `img` role do not have an accessible text alternative** — add `<title>` or `aria-label` to those SVGs.

## Manual review needed

- [ ] Work through the 10 "additional items to manually check" that Lighthouse flags — these can't be verified automatically and are worth a manual pass, ideally with a screen reader (VoiceOver/NVDA).

*22 audits already pass; 35 are not applicable to this page.*
