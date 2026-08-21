# Performance

Mobile: **25/100** · Desktop: **76/100**
(Mobile is emulated Moto G Power on Slow 4G; desktop uses lighter custom throttling — the score gap is partly the emulation profile, but 14.3s of blocking time on mobile is a real, fixable problem.)

## Core Web Vitals

| Metric | Mobile | Desktop |
|---|---|---|
| First Contentful Paint | 7.3 s | 1.2 s |
| Largest Contentful Paint | 24.3 s | 1.6 s |
| Total Blocking Time | 14,360 ms | 250 ms |
| Cumulative Layout Shift | 0.004 | 0.01 |
| Speed Index | 13.2 s | 2.4 s |

## High-impact fixes (estimated savings)

- [ ] **Improve image delivery** — ~1,352 KiB (mobile) / ~1,435 KiB (desktop). Serve responsive/next-gen formats (WebP/AVIF), compress, and size images to their actual display dimensions.
- [ ] **Reduce unused JavaScript** — ~229 KiB (mobile) / ~228 KiB (desktop). Code-split and lazy-load anything not needed for first paint.
- [ ] **Reduce unused CSS** — ~60 KiB (mobile) / ~65 KiB (desktop). Purge unused styles; split critical vs. non-critical CSS.
- [ ] **Eliminate render-blocking requests** — ~2,000 ms (mobile) / ~250 ms (desktop). Defer/async non-critical CSS & JS; inline critical CSS.
- [ ] **Fix font display** — ~280 ms (mobile) / ~210 ms (desktop). Add `font-display: swap` (or `optional`) to `@font-face` rules.
- [ ] **Reduce duplicated JavaScript** — ~2 KiB. Dedupe shared dependencies across bundles.
- [ ] **Use efficient cache lifetimes** — ~2–3 KiB. Set far-future `Cache-Control` headers on static assets.

## Main-thread / JS execution

- [ ] **Minimize main-thread work** — 40.0 s (mobile) / 2.2 s (desktop). Biggest driver of the mobile TBT.
- [ ] **Reduce JavaScript execution time** — 1.7 s (mobile).
- [ ] **Break up long tasks** — 20 long tasks found (mobile) / 5 (desktop). Chunk large scripts and yield to the main thread.
- [ ] **Investigate forced reflow** — flagged on both mobile and desktop.
- [ ] **Avoid non-composited animations** — 16 animated elements found on both. Animate `transform`/`opacity` instead of properties that trigger layout.

## Layout & network

- [ ] Add explicit `width`/`height` (or `aspect-ratio`) to `<img>` elements to prevent layout shift.
- [ ] Review flagged layout shift culprits.
- [ ] Optimize DOM size.
- [ ] Review the network dependency tree / LCP request discovery — a 24.3 s mobile LCP means whatever the LCP element depends on is being discovered/loaded very late in the request chain.
- [ ] Avoid enormous network payloads — total transfer ~4.88 MB.
- [ ] Audit third-party scripts for weight and main-thread blocking impact.
