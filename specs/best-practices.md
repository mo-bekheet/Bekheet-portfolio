# Best Practices — 92/100 (mobile & desktop)

## User experience

- [ ] Fix images displayed with an incorrect aspect ratio (distorted images).

## General / console

- [ ] Resolve browser errors being logged to the console.
- [ ] Add source maps for large first-party JavaScript (desktop-only finding) — helps debugging in production without shipping unminified code.

## Trust & safety (overlaps with `security-headers.md`)

- [ ] Ensure CSP is effective against XSS attacks.
- [ ] Use a strong HSTS policy.
- [ ] Ensure proper origin isolation with COOP.
- [ ] Mitigate clickjacking with X-Frame-Options or CSP `frame-ancestors`.
- [ ] Mitigate DOM-based XSS with Trusted Types.

## Browser compatibility

- [ ] Review the "Baseline Features" audit for any CSS/JS features in use that aren't broadly supported yet.

*11 audits pass on mobile (10 on desktop); 2 are not applicable.*
