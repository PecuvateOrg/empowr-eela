# EELA — DEVLOG

## 2026-08-26 — Booking links repointed from Wix to the Members platform; "Beginners Foundation" corrected to the singular

Code for this sits on `feat/eela-booking-cutover` (off `feat/sk8-skool-merge`, **unpushed**); only this log entry and `memory.md` are on `main`.

- **`lib/links.ts` now sends every confirmed bookable session to `members.empowrcic.org/sessions/[slug]`** instead of Wix: Skate Jam, Synkron8, Sk8 Skool All Ages, Sk8 Skool Kidz (both days), Beginners Foundation, Roller Skate Events, and the **Empowr-owned** Roller Quad Camp. `rollerQuadCampsHAF` stays on `app.holidayactivities.com` (a funder's system) and Private Bookings is untouched — neither ever went through Wix.
- **The governing rule set this session**: `vaults/EMPOWR CIC/entities/sessions.md` is the single source of truth for what sessions exist; this site displays it and Members' catalogue must correlate with it. **Wix is explicitly out of scope** as a reconciliation target.
- **No new auth work was needed.** Members' `middleware.ts` already guards `/book/*` and bounces anonymous visitors to `/login?next=…`, returning them to the exact booking after sign-in — precisely the "reads whether they're a member, then drops them into booking" flow that was asked for. The gap was only ever EELA's outbound links.
- **Renamed "Beginners Foundations" → "Beginners Foundation"** across 12 display-copy usages in 4 files, confirmed by Empowr: it is the foundation of a skater's skills. Route path `/adults/sk8-skool/beginners-foundations` and the Members slug both still read plural — a deliberate, separate decision, since changing a URL is not the same as changing copy. **This copy fix (only) was cherry-picked onto `main` separately on 2026-08-29 — see that entry below** — the singular-vs-plural change touches display strings only, no links, so it shipped independently of the rest of this entry.
- **Deleted the stale local branch `feat/bookings-domain-cutover`** (was `ba019b6`, recoverable via reflog). A superseded Wix-era plan pointing everything at `bookings.empowrcic.org`; merging it would have deleted Private Bookings, the enquiry modal, PostHog, `robots.txt`, the README and `docs/`.
- ⚠️ **These links 404 until Members goes live** — its catalogue entries exist but are all `active=false` by design. The branch is not independently deployable. *(Members went public 2026-08-27 with 7 active offerings, but as of 2026-08-29 the Members side of this cutover is still being worked out — the rest of this branch was deliberately NOT merged; see the 2026-08-29 entry below.)*
- **Members offerings now exist for Prep to Street Skate L1/L2 and All Ages Roller Disco, but EELA has no pages for them** — new outstanding work. The All Ages Roller Disco offering (5+, £15) is also the natural answer to the open Kids Space "Roller Skate Events" family-copy question.

## 2026-08-29 (later) — Kidz Membership CTA fixed, All Ages back-link corrected; hub work pushed live

- **Fixed the £30/mo "Sk8 Skool Membership" CTA bug flagged in the merge entry below.** Removed the separate, duplicated "Payment Options" section on `kids-space/sk8-skool/kidz/page.tsx` (a Pay As You Go card + a Membership card that repeated the Monday/Wednesday cards above it) and folded the £30/mo price into each day card instead, using that day's own correct booking link. The broken `LINKS.kidzSpace` (Wix) reference is gone along with the card that held it.
- **Fixed `adults/sk8-skool/all-ages/page.tsx`'s back arrow** — was hardcoded to `/adults/sk8-skool` (its literal parent route) even though the page is also reached from the Kids Space hub; now points at `/kids-space/sk8-skool`.
- Verified visually on a local `next dev` server at the user's request before pushing. A leftover `next start` process from an earlier `with_server.py` preview was still holding port 3000 after the wrapper reported it stopped (confirmed by exact command line via `Get-CimInstance Win32_Process`, not a broad `taskkill`); killed directly, port confirmed free, server restarted cleanly. Same leftover-process pattern recurred once more when stopping the dev server itself at close-out — same fix.
- `tsc --noEmit` clean, full `next build` succeeds (22 routes, unchanged) both before and after these fixes.
- **Pushed `main` to `origin/main`** (`7d92c5a`) — Netlify auto-deploy triggered, live at `eela.empowrcic.org`. **This supersedes the "not pushed" note in the entry directly below** — that claim was accurate when written earlier this session, not any more.
- **Pushed `feat/eela-booking-cutover`** (the 2-commit Members-repoint branch, rebuilt earlier this session) to origin as a backup — tracked at `origin/feat/eela-booking-cutover`, but deliberately **not merged into `main`**; the Members side of the cutover is still being worked out.

## 2026-08-29 — Sk8 Skool hub work merged to `main` (local only, not pushed); Members-link cutover deliberately kept separate

- **Merged `feat/sk8-skool-merge`'s hub work into `main`** — the Kids Space Sk8 Skool hub, the KB pricing/copy audit fixes, and the Synkron8/Beginners Foundation/Skate Jam detail pages. Also cherry-picked the "Beginners Foundation" singular-copy commit from `feat/eela-booking-cutover` (display strings only, no link changes, so it doesn't depend on the rest of that branch). **Deliberately excluded** the two commits that repoint `lib/links.ts` at Members (`5f2e064`, `0cb9387`) — the Members side of that cutover is still being worked out, so those two commits stay on their own branch (`feat/eela-booking-cutover`, rebuilt to contain just those two, ready to merge whenever Members is ready) rather than landing on `main` and needing to be reverted.
- Real conflicts (main had independently gained Turnstile, Private Bookings, and chat-widget work while this branch was in flight) resolved file-by-file: `EnquiryModal.tsx` kept `main`'s Turnstile-enabled superset, `kids-programmes.tsx` kept the incoming branch's Roller Skate Events card, `DEVLOG.md`/`memory.md` reconciled chronologically rather than picking one side.
- `tsc --noEmit` clean. Session days/times on every newly-merged page verified against `vaults/EMPOWR CIC/entities/sessions.md` (as_of 2026-08-28) — all match, no discrepancies.
- ~~Not pushed. `main` is local-only, ahead of `origin/main`.~~ **Pushed later this same session** — see the entry above.
- **First attempt at this merge (superseded, do not repeat)**: initially merged the *whole* `feat/eela-booking-cutover` branch (hub work + both Members-repoint commits) into `main`, then added a follow-up commit reverting `lib/links.ts` back to Wix. Functionally equivalent end state, but left a repoint-then-revert pair permanently in `main`'s history and consumed the cutover branch instead of keeping it separately mergeable. Redone as described above instead — cleaner history, same result.
- ~~Found during review, not yet fixed: `kids-space/sk8-skool/kidz/page.tsx`'s £30/mo "Sk8 Skool Membership" CTA uses `LINKS.kidzSpace`...~~ **Fixed later this same session** — see the entry above.

## 2026-08-25 — Kids Space Sk8 Skool merged into a hub; site-wide KB audit found and fixed 6 pricing/copy gaps across 5 pages

- Merged Kids Space's 3 flat Sk8 Skool cards (Monday, Wednesday, All Ages) into one hub (`/kids-space/sk8-skool` + `/kids-space/sk8-skool/kidz`), mirroring the Adults Sk8 Skool pattern; added a Roller Skate Events card to `/kids-space`. Kidz + All Ages both gained real Subscription pricing (£30/mo, £40/mo) via a Pay As You Go/Membership two-card layout matching Skate Jam's existing pattern; the earlier "Wednesday is outdoor-only, April-August" claim was corrected — it runs year-round, moving indoors to Honor Oak CC the rest of the year.
- **Ran a full site-vs-KB audit** (every session page against `vaults/EMPOWR CIC/entities/sessions.md`) after the user asked whether the site now matched the KB — it didn't, on 6 counts. Fixed: Synkron8 missing its Membership card (£45/mo, despite its own FAQ mentioning one), Skate Jam's flat £10 price split into the real £7-online/£10-door tiers, Roller Quad Camps showing no price at all (added "From £45"), Skate Jam's hero tag corrected from the wrong "Ages 8+" to "Ages 15+" (contradicted both the KB and the page's own FAQ), and its FAQ's beginner-readiness answer corrected to recommend only Beginners Foundations, not Synkron8 (never part of the Indoor Pathway). Beginners Foundations itself was restructured from one undifferentiated £55/course card into a Level 1 (Tue)/Level 2 (Wed) two-card grid, with Empowr-supplied descriptions for each level.
- **Still open, deliberately not fixed**: the Kids Space Roller Skate Events card links to `LINKS.rollerSkateEvents` (the KB-confirmed adult-only 15+ Wix page) despite family-oriented bullet copy — flagged to the user, awaiting a decision on whether it should point at `LINKS.kidzRollerDisco` instead.
- **Mid-session branch collision, resolved non-destructively**: a concurrent session had switched this shared working directory to a new branch (`feat/eela-booking-cutover`) and committed its own Members-links work right as this session went to commit. Used a temporary `git worktree` to cherry-pick this session's commits onto the correct branch (`feat/sk8-skool-merge`) and push cleanly, rather than touch their branch.
- Everything this session pushed sits on `feat/sk8-skool-merge` (off `feature/skate-jam-page`, not `main`) — preview at `feat-sk8-skool-merge--empowr-eela.netlify.app`, not yet merged. `tsc --noEmit` clean, full `next build` (22 routes), Playwright against production `next start` builds — zero console errors across every page touched.

## 2026-08-25 — Private Bookings enquiries had been silently lost since ~08-17; Turnstile added to the modal

## 2026-08-18 — Private Bookings card moved to the end of the Adults list; local preview run

## 2026-08-17 — Synkron8, Beginners Foundations, and Private Bookings (hub + 4 sub-pages) built

## 2026-08-20 — Private Bookings availability calendar + enquiry system built, then isolated and merged to `main` — live in production

## 2026-08-14 — Added README.md and fixed the "Skills and Tools Available" heading format (M10/M8 compliance gaps)

## 2026-08-12 — Chat widget bubble cherry-picked to main (not whole-branch: its other 2 commits were superseded/conflicting) and live; upgraded same session to auto-open after 1.5s with a rewritten proactive greeting; launcher button still dark navy against a brand-blue panel, owner’s call

## 2026-08-05 — CookieConsentBanner's long-uncommitted state corrected in memory.md as a deliberate hold tied to `feat/chat-widget-embed`, not abandoned work; general lesson recorded that a stale timestamp is not evidence of neglect

## 2026-08-04 — sitemap.xml added (6 routes) and robots.txt now declares it, completing the other half of the 2026-07-30 link audit

## 2026-07-31 — Roller Disco removed from site copy across kids-programmes, adults page, and homepage (session discontinued per team decision); widened Netlify's `allowed_branches` to enable branch-deploy previews for `feat/chat-widget-embed`

## 2026-07-30 — PostHog route-change tracking fix (fleet-wide): `capture_pageview` corrected from `true` to `'history_change'`, restoring client-side navigation tracking across all internal `<Link>` clicks

## 2026-07-29 - Session 16: CookieConsentBanner redesigned to a floating rounded card (same consent logic, on_reject cookieless mode unchanged), verified on a real Netlify branch-deploy preview stacked on feat/chat-widget-embed (`0180cd4`); left uncommitted on main at the user request pending that branch merging

## 2026-07-29 - Session 15: Booking-click capture (T4) via posthog.capture on ProgrammeCard + cross-site UTM tagging (T5); PostHog bot detection blocks headless verification of capture() calls

## 2026-07-28 — Session 14: Switched PostHog to `cookieless_mode: 'on_reject'` so decliners are counted cookielessly instead of producing zero events; consent banner UI unchanged

## 2026-07-20 — Session 13: Roller Quad Camps minimum age corrected to 5+ (reversing Session 12's 8+), page-wide

## 2026-07-14 — Session 12: Roller Quad Camps age standardised to "8+" page-wide (later reversed to "5+" in Session 13); confirmed no live Supabase `mem_offerings` row to sync

## 2026-06-29 — Session 11: Members page cleanup — removed broken Wix account notice, restored coming-soon waitlist; team decided against Wix for account management, new platform to be built separately

## 2026-06-28 — Session 10: PostHog consent banner (Variant B, since superseded by cookieless `on_reject` mode 2026-07-28) + Navbar active-state fix via `usePathname()`

## 2026-06-26 — Session 9: Updated EELA about page sub-programme names to MindWell/CreateWell/ExploreWell/ConnectWell, consistent with Main Site and prospectus

## 2026-06-18 — Session 8: Built /roller-quad-camps page with S3 hero image, two booking cards (Empowr Camps direct + HAF Spaces), added rollerQuadCampsHAF link

## 2026-06-13 — Session 7: Built Kids/Adults Trustpilot review carousels, renamed Roller Quad Camps (was Summer Roller Camps), removed inaccurate stats bar

## 2026-06-04 — Session 6: Removed inaccurate stats bar from Home and Adults pages

## 2026-06-03 — Session 5: Built About page from EELA KB with 5 sub-programme cards, updated footer description

## 2026-06-02 — Session 4: Removed Lewisham-only references sitewide, held back Members nav link pending team review

## 2026-06-01 — Session 2: Built Kids Space page, rebranded platform to EELA, launched to eela.empowrcic.org via Netlify

## 2026-06-01 — Session 3: Built Members Coming Soon page with waitlist form (no backend yet)
