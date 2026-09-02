# Memory — Empowr EELA (formerly "Empowr Sessions")

## Current Phase

**✅ 2026-09-02 — THE WIX→MEMBERS CUTOVER IS MERGED AND LIVE. EELA is fully off Wix.** `feat/members-links-cutover` merged to `main` (`a707007`). Verified on production: 14 pages 200, **zero Wix links anywhere**, all 10 Members destinations 200, all four `#subscribe` anchors present. **This resolves every "cutover" item below — `feat/eela-booking-cutover` is DELETED (superseded; recoverable at `5e00806`), do not look for it.** Camps and Roller Disco now go to Members too, landing on its "Dates coming soon" state — possible because `roller-quad-camp` and `all-ages-roller-disco` were flipped `active = true` (admin UI) on 2026-09-02. That data flag, not code, was always the gate: `dynamicParams = false` makes an inactive slug a hard 404.

**All Ages now has a route per space.** It was ONE page listed on BOTH Sk8 Skool hubs with one hardcoded back link, so it was wrong from one hub whichever value it held — the 08-29 "fix" below flipped the string and merely moved the bug. `Sk8SkoolAllAgesContent` takes a `backHref`; `/kids-space/sk8-skool/all-ages` mirrors `/adults/...` and carries `alternates.canonical` to it. See [[feedback_shared_destination_hardcoded_parent]].

**Kids Space "Roller Skate Events" → `all-ages-roller-disco`** (was the 15+ adult offering — a 5+ page selling 15+ tickets). ⚠️ **Its title and bullets are CORRECT**: Empowr confirmed "Roller Skate Events" is a CATEGORY (disco / challenges / games). Do not "fix" that copy — only the destination was ever wrong. The commented-out standalone disco card was removed.

Live in production at eela.empowrcic.org. As of 2026-08-20, Private Bookings (1:1 coaching, group coaching, birthday party, custom event) is live at `/private-bookings/*` with a Google Calendar availability view and an in-page enquiry form on every offering — see `DEVLOG.md` for full running history. This file stopped being actively maintained after Phase 1 (May 2026); `DEVLOG.md` is the authoritative source of running state for this project, not this file.

**🔑 2026-08-26 — the KB is now the declared single source of truth for sessions.** `vaults/EMPOWR CIC/entities/sessions.md` defines what sessions exist; this site displays it and Empowr Members' bookable catalogue must correlate with it. **Wix is explicitly OUT OF SCOPE** as a reconciliation target — don't audit against it or re-raise it. `feat/eela-booking-cutover` repoints `lib/links.ts` at `members.empowrcic.org/sessions/[slug]` for all 7 confirmed bookable sessions. ⚠️ Those links **404 until Members goes live** — its offerings are all `active=false` by design. "Beginners Foundations" is now the **singular "Beginners Foundation"** (Empowr: it's the foundation of a skater's skills), though both the route path and the Members slug still read plural — an open decision. `feat/bookings-domain-cutover` was deleted (was `ba019b6`). **Outstanding: EELA has no pages for Prep to Street Skate L1/L2 or All Ages Roller Disco**, though Members offerings now exist for all three. See `[[project_empowr_members_platform]]`.

**✅ 2026-08-29 — the Sk8 Skool hub work merged to `main` and PUSHED LIVE; the Members-link cutover deliberately kept separate and parked.** `feat/sk8-skool-merge`'s hub build (Kids Space Sk8 Skool hub, 6-gap KB audit, Synkron8/Beginners Foundation/Skate Jam detail pages) is on `main`, plus the "Beginners Foundation" singular-copy commit cherry-picked in on its own (display strings only, no link dependency). Also fixed the same session and included in the push: the Kidz page's £30/mo Membership CTA (was pointing at `LINKS.kidzSpace`, a generic Wix page — fixed by folding the price into each day card and removing the duplicated section that held the bad link) and the All Ages page's back arrow (was `/adults/sk8-skool`, now correctly `/kids-space/sk8-skool`, since that's the hub it's actually reached from). **Pushed to `origin/main` (`7d92c5a`)** — Netlify auto-deployed, live at `eela.empowrcic.org`. Verified before push: session days/times checked against `entities/sessions.md` (all matched), full `next build` clean, and the user reviewed a local `next dev` server directly.
**The two Members-repoint commits (`5f2e064`, `0cb9387`) were deliberately NOT merged** — the user's call, since the Members side of the cutover is still being worked out. `feat/eela-booking-cutover` was rebuilt to contain just those two commits, rebased on `main`, and **pushed to origin as a backup** (`origin/feat/eela-booking-cutover`) — tracked on GitHub but not merged. Merge it whenever Members is ready — **don't re-derive the Members URLs from scratch, just merge that branch**. `feature/skate-jam-page` and the old `feat/sk8-skool-merge` are superseded by the hub merge; don't merge them again. Conflicts (main had independently gained Turnstile, Private Bookings, chat-widget work) resolved file-by-file: `EnquiryModal.tsx` kept `main`'s Turnstile-enabled superset, `kids-programmes.tsx` kept the incoming branch's Roller Skate Events card, `DEVLOG.md`/this file reconciled chronologically. A first attempt merged everything (hub + cutover) then reverted `links.ts` back to Wix in a follow-up commit — superseded by this cleaner split, don't repeat that approach; see `[[feedback_split_unready_work_into_own_branch]]`.

**Private Bookings shipped on its own branch, deliberately split from `feature/skate-jam-page`.** That branch also holds Skate Jam, Synkron8, and Beginners Foundations pages, bundled together in the same commits — the user's explicit call (2026-08-20) was to keep those three bundled for now rather than split them too.

**The Private Bookings enquiry form shares Main Site's contact-form backend, cross-origin — not a duplicate.** Requires a CORS allow-list on Main Site's `contact.ts` (already in place, live). CRM routing on that shared backend is currently paused (env vars deliberately unset on Main Site) — submissions go straight to `enquiries@empowrcic.org` until that's re-enabled, at which point both sites' forms pick it up automatically.

**🔴 2026-08-25: that shared backend had been silently losing every enquiry since ~08-17, and this form had never once delivered one.** Root cause was on Main Site (bot volume degraded `empowrcic.org`'s sending reputation; unchecked Resend errors hid it) — see that repo's `memory.md`/`DEVLOG.md`. What changed *here*: `EnquiryModal.tsx` now sends a **Cloudflare Turnstile token**, which the shared backend requires in production — a submission without one gets a 400. Two things to preserve: (1) the widget **must** stay explicitly rendered via `@marsidev/react-turnstile` — the implicit `cf-turnstile` class scans the DOM once when its script loads, so a modal that opens a *second* time gets no widget and no token (proven in a real browser: the response input was present on open #1, absent on open #2); (2) the sitekey here must stay **identical** to Main Site's, since one Turnstile widget covers both origins — a separate widget would fail hostname validation. Shipped on `main` (`16bf755`, `cdb1838`), then folded into the hub merge above.

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

~~Push `feat/chat-widget-embed` to `main` once the team approves~~ — **DONE 2026-08-12**, cherry-picked the real commit (`bbab61a`) rather than the whole stale branch; see `DEVLOG.md`. ~~Restore Roller Disco Birthday Party content~~ — **superseded 2026-08-20**: that offering lives under `/private-bookings/birthday-party`, which is now live — nothing further needed there. ~~`feature/skate-jam-page` / `feat/sk8-skool-merge` merge decision~~ — **DONE 2026-08-29**: the hub work is merged into `main` (see Current Phase above); those two branches are superseded, do not merge them again.

Still genuinely open:
- ~~Members-side booking cutover~~ — **DONE 2026-09-02**: merged and live via `feat/members-links-cutover`; `feat/eela-booking-cutover` was rejected and DELETED. See Current Phase above.
- ~~`kids-space/sk8-skool/kidz/page.tsx`'s £30/mo Membership CTA points at `LINKS.kidzSpace`~~ — **fixed 2026-08-29**, folded the price into each day card instead; see Current Phase above.
- ~~Resolve the Kids Space Roller Skate Events link target~~ — **DONE 2026-09-02**: repointed to `LINKS.kidzRollerDisco` (the all-ages Roller Disco). The card copy was NOT the problem — see Current Phase above.
- **Restore public "All Ages Roller Disco" content** — **partly resolved 2026-09-02**: the offering is now ACTIVE and EELA's Kids Space events card links to it, so it is no longer unreachable. Still open: EELA has no dedicated page of its own for it (nor for Prep to Street Skate L1/L2).
- `/roller-quad-camps` says "Book now" over a page that reads "Dates coming soon" until occurrences are seeded — **left deliberately, the user's call 2026-09-02**. Self-resolves when dates are added.
- `feat/chat-bubble` has **2 local commits never pushed** (noted 2026-09-02).
- Kids Space umbrella age label decision (still open, unresolved since it was first raised).
- EELA homepage restructure — new `/` presenting EELA as a platform with 5 programme pillars.
- ~~Members backend wiring (Phase 2)~~ — not an EELA deliverable; owned by the separate Empowr Members project since 2026-07-06 (members.empowrcic.org). EELA stays discovery/content-only.
- ~~Bookings domain cutover~~ — premise gone since 2026-07-07 (`bookings.empowrcic.org` deleted from Route53); `feat/bookings-domain-cutover` branch is parked, do not merge.
- The floating chat-launcher button is still hardcoded dark navy against a now-brand-blue panel (flagged repeatedly, owner's call).

**2026-08-20:** Private Bookings (calendar + enquiry form, all 4 offerings) shipped on its own branch and merged live — see Current Phase above and `DEVLOG.md` for full detail.

**2026-08-12:** Chat bubble merged (see resolution note above) and upgraded same session from click-to-open to auto-opening ~1.5s after page load, paired with a rewritten proactive greeting (set in PecuvateCRM's `org_ai_config`, not this repo). Live-verified via screenshot.

**2026-07-30:** `capture_pageview` fixed from `true` to `'history_change'` in `PostHogProvider.tsx` (commit `8171337`). `true` disables posthog-js client-side route-change capture entirely, so **no internal navigation on this site was ever recorded** — bounce rate and pages/session before this date are artefacts, not behaviour. Found on Empowr Heroes and fixed fleet-wide, plus the canonical template. `cookieless_mode: 'on_reject'` untouched — orthogonal to consent. The uncommitted `CookieConsentBanner.tsx` redesign belonging to the other session was deliberately left alone; only `PostHogProvider.tsx` + `DEVLOG.md` were staged.

**2026-07-30 (separate session, full-site link audit):** `llms.txt` pointed at `/kids`, a route that doesn't exist (real route is `/kids-space`); `robots.txt` advertised a `sitemap.xml` that's never been generated — removed the dead line. Commit `c15c663`. The uncommitted `CookieConsentBanner.tsx` change (see concurrent-session note above) was checked again and left untouched, as intended. Full audit detail: [[project_empowr_link_audit_2026_07_30]] in Claude memory — flags EELA's schema.org YouTube handle `@empowr.cic` as inconclusive-404 (needs manual browser check), not yet resolved.

**2026-07-28 (Session 14):** PostHog switched from Variant B (full persistence, opt-out-by-default) to `cookieless_mode: 'on_reject'` — decliners are now counted cookielessly instead of producing zero events. Consent banner UI unchanged.

**2026-07-29 (Session 15):** T4 done — `ProgrammeCard.tsx` now fires `posthog.capture('booking_click', ...)` on every Book click. T5 (cross-domain linking) ruled out as incompatible with cookieless mode; shipped UTM source tagging on outbound links instead (`links.ts`, `Footer.tsx`, `about/page.tsx`, `CookieConsentBanner.tsx`). Full reasoning in AnalyticsHub DEVLOG. T4/T5 both closed — nothing further expected from that track.

**2026-07-29 (Session 16):** The 2026-07-28 cookie-banner UI redesign request is **done** — `CookieConsentBanner.tsx` is now a floating rounded card (was a full-width bottom bar), icon badge, pill buttons; `on_reject` consent logic untouched. Verified on a real Netlify branch-deploy preview by applying the change on top of `feat/chat-widget-embed` and pushing (`0180cd4`) rather than standing up a new preview — live at `https://feat-chat-widget-embed--empowr-eela.netlify.app`, banner and chat bubble render together with no overlap. **Deliberately left uncommitted on `main`** — see the concurrent-session note at the top of this file.

## Pre-Close Checklist

- Commit and push changes before closing
- Log the session in `DEVLOG.md` — that log, not this file, is what future sessions should read first for running state
