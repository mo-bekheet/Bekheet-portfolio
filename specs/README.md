# bekheet.com — Site Audit Issue Register

Turned the PageSpeed Insights (mobile + desktop) and Snyk header-scan reports into a trackable checklist. Each file below covers one category; check items off as you fix them.

**Site:** https://bekheet.com/
**Audit date:** Aug 21, 2026

## Scores at a glance

| Category | Mobile | Desktop |
|---|---|---|
| Performance | 25 | 76 |
| Accessibility | 85 | 85 |
| Best Practices | 92 | 92 |
| SEO | 100 | 100 |
| Agentic Browsing | 1/2 | 1/2 |
| Security Headers (Snyk) | Grade D | Grade D |

## Files in this register

- [`performance.md`](./performance.md) — Core Web Vitals + load-speed issues
- [`accessibility.md`](./accessibility.md) — a11y issues
- [`best-practices.md`](./best-practices.md) — browser/runtime best-practice issues
- [`seo.md`](./seo.md) — SEO checks
- [`agentic-browsing.md`](./agentic-browsing.md) — AI-agent browsability checks
- [`security-headers.md`](./security-headers.md) — missing/misconfigured HTTP security headers
- [`portfolio-evaluation.md`](./portfolio-evaluation.md) — full evaluation (UI/UX, content, branding, recruiter view) + test suite docs (Aug 22, 2026)
- [`problems.md`](./problems.md) — round-2 issue register from external screenshot review; P2–P11, P13 fixed same day (Aug 22, 2026); P1 awaiting owner input on post-2025 role

## Suggested priority order

1. **Performance (mobile)** — 14.3s of blocking time and a 24.3s LCP is the most severe issue here by far.
2. **Security headers** — Grade D with 5 missing headers is a quick, high-value fix.
3. **Accessibility** — several automated failures, easy wins (accessible names, landmarks, heading order).
4. **Best practices / Agentic browsing** — smaller, often overlap with the fixes above.
5. **SEO** — already 100; just a manual verification left.
