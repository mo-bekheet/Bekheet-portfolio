# Security Headers — Snyk Grade: D

Site: https://bekheet.com/ · IP: 216.198.79.1 · Hosted on Vercel

## Missing headers

- [ ] **`Content-Security-Policy`** — whitelist approved content sources to guard against XSS.
- [ ] **`X-Frame-Options`** — set to `SAMEORIGIN` to prevent clickjacking.
- [ ] **`X-Content-Type-Options`** — set to `nosniff` to stop MIME-sniffing.
- [ ] **`Referrer-Policy`** — set an explicit policy (e.g. `strict-origin-when-cross-origin`).
- [ ] **`Permissions-Policy`** — explicitly restrict browser features/APIs the site doesn't use.

## Present, worth reviewing

- [ ] `Strict-Transport-Security` is set (`max-age=63072000`) — good. Consider adding `includeSubDomains; preload` for a stronger policy.

## Emerging headers to consider

- [ ] `Cross-Origin-Embedder-Policy`
- [ ] `Cross-Origin-Opener-Policy`
- [ ] `Cross-Origin-Resource-Policy`

## Other flags

- [ ] `Server: Vercel` is exposed — consider obscuring this to reduce fingerprinting (may be limited by what Vercel allows you to control).
- [ ] `Access-Control-Allow-Origin: *` is a very permissive CORS policy — only appropriate if this is genuinely meant to be a public, cross-origin-readable resource (e.g. a CDN asset). Scope it down otherwise.
