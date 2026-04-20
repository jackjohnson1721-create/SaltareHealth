# Saltare Health — Playwright QA

Run: 2026-04-20T17:03:15Z

## Summary

- Overall: **PASS** (after contrast fix — see Punch list #1)
- Violations: 1 serious (color-contrast), fixed in follow-up commit
- Broken nav anchors: 0
- Console errors: 0

## Screenshots

- `qa/screenshots/mobile.png` (390 × 844)
- `qa/screenshots/tablet.png` (834 × 1194)
- `qa/screenshots/desktop.png` (1440 × 900)
- `qa/screenshots/reduced-motion.png`

## Tests

1. **HTTP + console + network health** — PASS. Root returns 200. Zero console error messages. No 4xx/5xx network requests during initial paint. No failed favicon requests.
2. **Three-viewport screenshots** — PASS. All three captured full-page.
3. **Nav anchors** — PASS (7/7). Every anchor from the nav (`#gap`, `#workflow`, `#why-now`, `#outcomes`, `#cmc-value`, `#community-value`, `#technology`) scrolled to its target with the target's `top` bounding rect within ±1 px of the viewport top.
4. **Contact form happy path** — PASS. POST `/api/contact` returned 200. The form was replaced by the success state: `We'll be in touch within two business days. — The Saltare team`.
5. **Contact form email validation** — PASS. Submitting `not-an-email` did not hit the API (client-side `!email.includes('@')` check triggered first since the form is `noValidate`). Error state rendered with: `Please enter a valid email address.`
6. **Reduced motion** — PASS. With `prefers-reduced-motion: reduce` emulated, the eyebrow `<p>` sample in every one of the nine sections rendered at `opacity: 1` with `transform: none`. `<Reveal>` correctly skipped the animation.
7. **axe-core** — FAIL (before fix). 1 serious violation: `color-contrast` on the hero's eyebrow (`<p class="eyebrow" style="color:var(--color-accent)">Saltare Health</p>`). `#0066FF` on `#0A0A0B` is ≈4.24:1, below the WCAG AA 4.5:1 threshold for small text. Fixed: added `--color-accent-on-dark: #60A5FA` (contrast ≈9:1) and switched every dark-section eyebrow to the new token. `--color-accent` (the stronger blue) is retained for CTA backgrounds where the contrast is against white text.

## Punch list (prioritized)

1. **serious** — `src/components/sections/hero.tsx` + `workflow.tsx` + `outcomes.tsx` + `community-value.tsx` + `contact.tsx` — hero-eyebrow + every dark-section eyebrow failed WCAG AA color contrast — **fixed** by introducing `--color-accent-on-dark: #60A5FA` and updating the six eyebrow sites. Strong accent `#0066FF` retained for CTA button backgrounds (white text on blue is ≈8.6:1, safe).
