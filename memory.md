# Memory — Empowr EELA (formerly "Empowr Sessions")

## Current Phase

Live in production at eela.empowrcic.org. Chat widget bubble merged and live as of 2026-08-12 — see `DEVLOG.md` for full running history. This file stopped being actively maintained after Phase 1 (May 2026); `DEVLOG.md` is the authoritative source of running state for this project, not this file.

**RESOLVED 2026-08-12 — the `CookieConsentBanner.tsx` uncommitted-file situation described below is over.** The banner redesign landed on `main` as `bf098ec`, separately from the chat-widget work it was waiting on (confirmed via `git log` — it was not carried over as part of the widget merge, which cherry-picked only the unrelated `bbab61a`). If a fresh session sees `CookieConsentBanner.tsx` as clean in `git status`, that's correct, not a regression.

~~**Uncommitted `CookieConsentBanner.tsx` — deliberately held, not stale (confirmed by the user 2026-08-04).**~~ Historical context only, no longer current: the banner redesign was tied to the `feat/chat-widget-embed` work and stayed uncommitted pending that widget being finalised — that dependency was the reason for the delay, not neglect. See `[[feedback_concurrent_sessions_same_repo]]` for the general hazard this illustrated.

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

~~Push `feat/chat-widget-embed` to `main` once the team approves~~ — **DONE 2026-08-12**, cherry-picked the real commit (`bbab61a`) rather than the whole stale branch; see `DEVLOG.md`. Remaining from `DEVLOG.md`'s "Next session" section: Kids Space umbrella age label decision, EELA homepage restructure (5 programme pillars), Members backend wiring (Phase 2), bookings domain cutover, restore Roller Disco content (reinstated 2026-08-06, this site's copy still reflects the old removal). New from 2026-08-12: the floating launcher button (`ChatBubble.tsx`) is still hardcoded dark navy while the panel it opens is now Empowr brand blue — flagged twice, not fixed, owner's call.

**2026-08-12:** Chat bubble merged (see resolution note above) and upgraded same session from click-to-open to auto-opening ~1.5s after page load, paired with a rewritten proactive greeting (set in PecuvateCRM's `org_ai_config`, not this repo). Live-verified via screenshot.

**2026-07-30:** `capture_pageview` fixed from `true` to `'history_change'` in `PostHogProvider.tsx` (commit `8171337`). `true` disables posthog-js client-side route-change capture entirely, so **no internal navigation on this site was ever recorded** — bounce rate and pages/session before this date are artefacts, not behaviour. Found on Empowr Heroes and fixed fleet-wide, plus the canonical template. `cookieless_mode: 'on_reject'` untouched — orthogonal to consent. The uncommitted `CookieConsentBanner.tsx` redesign belonging to the other session was deliberately left alone; only `PostHogProvider.tsx` + `DEVLOG.md` were staged.

**2026-07-30 (separate session, full-site link audit):** `llms.txt` pointed at `/kids`, a route that doesn't exist (real route is `/kids-space`); `robots.txt` advertised a `sitemap.xml` that's never been generated — removed the dead line. Commit `c15c663`. The uncommitted `CookieConsentBanner.tsx` change (see concurrent-session note above) was checked again and left untouched, as intended. Full audit detail: [[project_empowr_link_audit_2026_07_30]] in Claude memory — flags EELA's schema.org YouTube handle `@empowr.cic` as inconclusive-404 (needs manual browser check), not yet resolved.

**2026-07-28 (Session 14):** PostHog switched from Variant B (full persistence, opt-out-by-default) to `cookieless_mode: 'on_reject'` — decliners are now counted cookielessly instead of producing zero events. Consent banner UI unchanged.

**2026-07-29 (Session 15):** T4 done — `ProgrammeCard.tsx` now fires `posthog.capture('booking_click', ...)` on every Book click. T5 (cross-domain linking) ruled out as incompatible with cookieless mode; shipped UTM source tagging on outbound links instead (`links.ts`, `Footer.tsx`, `about/page.tsx`, `CookieConsentBanner.tsx`). Full reasoning in AnalyticsHub DEVLOG. T4/T5 both closed — nothing further expected from that track.

**2026-07-29 (Session 16):** The 2026-07-28 cookie-banner UI redesign request is **done** — `CookieConsentBanner.tsx` is now a floating rounded card (was a full-width bottom bar), icon badge, pill buttons; `on_reject` consent logic untouched. Verified on a real Netlify branch-deploy preview by applying the change on top of `feat/chat-widget-embed` and pushing (`0180cd4`) rather than standing up a new preview — live at `https://feat-chat-widget-embed--empowr-eela.netlify.app`, banner and chat bubble render together with no overlap. **Deliberately left uncommitted on `main`** — see the concurrent-session note at the top of this file.

## Pre-Close Checklist

- Commit and push changes before closing
- Log the session in `DEVLOG.md` — that log, not this file, is what future sessions should read first for running state
