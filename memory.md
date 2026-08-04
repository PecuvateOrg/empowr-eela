# Memory — Empowr EELA (formerly "Empowr Sessions")

## Current Phase

Live in production at eela.empowrcic.org. On Session 16 (2026-07-29) — see `DEVLOG.md` for full running history. This file stopped being actively maintained after Phase 1 (May 2026); `DEVLOG.md` is the authoritative source of running state for this project, not this file.

**Uncommitted `CookieConsentBanner.tsx` — still open as of 2026-08-04.** Originally noted at the 2026-07-29 close-out, when a *separate* concurrent Claude Code session was handling the `feat/chat-widget-embed` team-approval/merge and deliberately left this redesign uncommitted on `main` for that session to pick up. **That was six days ago and the file is still modified and uncommitted** — the "concurrent session in progress" framing no longer holds; treat it as parked work of unknown status rather than something actively in flight. It has now been observed and left untouched at three separate close-outs (07-29, 07-30, 08-04). If you're a fresh session and `git status` shows it modified, it's not stray work — don't discard it, but it may be worth asking whether it's still wanted. See `[[feedback_concurrent_sessions_same_repo]]`.

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

See `DEVLOG.md` Session 16 "Next" section for current open items — push `feat/chat-widget-embed` to `main` once the team approves (needs a rebase first, it's 2 commits behind `main`), Kids Space umbrella age label decision, EELA homepage restructure (5 programme pillars), Members backend wiring (Phase 2), bookings domain cutover.

**2026-07-30:** `capture_pageview` fixed from `true` to `'history_change'` in `PostHogProvider.tsx` (commit `8171337`). `true` disables posthog-js client-side route-change capture entirely, so **no internal navigation on this site was ever recorded** — bounce rate and pages/session before this date are artefacts, not behaviour. Found on Empowr Heroes and fixed fleet-wide, plus the canonical template. `cookieless_mode: 'on_reject'` untouched — orthogonal to consent. The uncommitted `CookieConsentBanner.tsx` redesign belonging to the other session was deliberately left alone; only `PostHogProvider.tsx` + `DEVLOG.md` were staged.

**2026-07-30 (separate session, full-site link audit):** `llms.txt` pointed at `/kids`, a route that doesn't exist (real route is `/kids-space`); `robots.txt` advertised a `sitemap.xml` that's never been generated — removed the dead line. Commit `c15c663`. The uncommitted `CookieConsentBanner.tsx` change (see concurrent-session note above) was checked again and left untouched, as intended. Full audit detail: [[project_empowr_link_audit_2026_07_30]] in Claude memory — flags EELA's schema.org YouTube handle `@empowr.cic` as inconclusive-404 (needs manual browser check), not yet resolved.

**2026-07-28 (Session 14):** PostHog switched from Variant B (full persistence, opt-out-by-default) to `cookieless_mode: 'on_reject'` — decliners are now counted cookielessly instead of producing zero events. Consent banner UI unchanged.

**2026-07-29 (Session 15):** T4 done — `ProgrammeCard.tsx` now fires `posthog.capture('booking_click', ...)` on every Book click. T5 (cross-domain linking) ruled out as incompatible with cookieless mode; shipped UTM source tagging on outbound links instead (`links.ts`, `Footer.tsx`, `about/page.tsx`, `CookieConsentBanner.tsx`). Full reasoning in AnalyticsHub DEVLOG. T4/T5 both closed — nothing further expected from that track.

**2026-07-29 (Session 16):** The 2026-07-28 cookie-banner UI redesign request is **done** — `CookieConsentBanner.tsx` is now a floating rounded card (was a full-width bottom bar), icon badge, pill buttons; `on_reject` consent logic untouched. Verified on a real Netlify branch-deploy preview by applying the change on top of `feat/chat-widget-embed` and pushing (`0180cd4`) rather than standing up a new preview — live at `https://feat-chat-widget-embed--empowr-eela.netlify.app`, banner and chat bubble render together with no overlap. **Deliberately left uncommitted on `main`** — see the concurrent-session note at the top of this file.

## Pre-Close Checklist

- Commit and push changes before closing
- Log the session in `DEVLOG.md` — that log, not this file, is what future sessions should read first for running state
