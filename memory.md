# Memory — Empowr EELA (formerly "Empowr Sessions")

## Current Phase

Live in production at eela.empowrcic.org. On Session 15 (2026-07-28, this branch) — see `DEVLOG.md` for full running history. This file stopped being actively maintained after Phase 1 (May 2026); `DEVLOG.md` is the authoritative source of running state for this project, not this file.

## Status (resolved as of 2026-07-20 — all Phase 1 items below are long since complete)

- [x] Project scaffold, Next.js app, brand tokens, Navbar/ProgrammeCard/FindSessionBanner components
- [x] Home + Adults pages built
- [x] Kids Space page built
- [x] Remote repo created on GitHub (`empowr-eela`) and pushed
- [x] Domain confirmed and wired — eela.empowrcic.org
- [x] Deployed to Netlify — auto-deploy on push to `main`
- [x] Project renamed from "Empowr Sessions" to EELA

## Key Decisions (historical, Phase 1 — still valid)

- Stack: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- Icons: @iconify/react + MDI throughout (consistent with Empowr Landing Page)
- No CMS — content hardcoded in pages
- `ProgrammeCard` accepts icon as `ReactNode` — not tied to any icon library
- `FindSessionBanner` links to start.empowrcic.org/quiz until a native quiz is built

## Next

See `DEVLOG.md` Session 15 "Next" section (this branch) for current open items — top priority is merging this branch to `main` once the team has tested it, then the older items: Kids Space umbrella age label decision, EELA homepage restructure (5 programme pillars), Members backend wiring (Phase 2), bookings domain cutover, and T4 booking-click analytics capture (`ProgrammeCard.tsx`, not started).

**2026-07-28 (Session 14):** PostHog switched from Variant B (full persistence, opt-out-by-default) to `cookieless_mode: 'on_reject'` — decliners are now counted cookielessly instead of producing zero events. Consent banner UI unchanged.

**2026-07-28 (Session 15, this branch):** EELA got its first-ever live embed of the CRM chat widget — `ChatBubble.tsx` (ported from Empowr Main Site's `feat/chat-bubble-v2`) wired into `layout.tsx`, pointing at `crm.pecuvate.com/widget?org=empowr-cic`. Verified live via Playwright against production. Committed here on `feat/chat-widget-embed` (`bbab61a`) — **held back from `main` deliberately**, owner wants the team to test first, merge/push planned for 2026-07-29. Two things to resolve around that push: the bubble's close button overlaps the cookie-consent banner on first load (cosmetic — may resolve itself once the separately-requested banner-shrink redesign ships, see `main`'s Session 14 "Next"), and this site's Netlify config (`allowed_branches: ["main"]`) blocks branch/PR deploy previews if one's wanted later.

## Pre-Close Checklist

- Commit and push changes before closing
- Log the session in `DEVLOG.md` — that log, not this file, is what future sessions should read first for running state
