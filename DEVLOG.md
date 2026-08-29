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

## 2026-08-29 — Sk8 Skool hub work merged to `main` (local only, not pushed); Members-link cutover deliberately kept separate

- **Merged `feat/sk8-skool-merge`'s hub work into `main`** — the Kids Space Sk8 Skool hub, the KB pricing/copy audit fixes, and the Synkron8/Beginners Foundation/Skate Jam detail pages. Also cherry-picked the "Beginners Foundation" singular-copy commit from `feat/eela-booking-cutover` (display strings only, no link changes, so it doesn't depend on the rest of that branch). **Deliberately excluded** the two commits that repoint `lib/links.ts` at Members (`5f2e064`, `0cb9387`) — the Members side of that cutover is still being worked out, so those two commits stay on their own branch (`feat/eela-booking-cutover`, rebuilt to contain just those two, ready to merge whenever Members is ready) rather than landing on `main` and needing to be reverted.
- Real conflicts (main had independently gained Turnstile, Private Bookings, and chat-widget work while this branch was in flight) resolved file-by-file: `EnquiryModal.tsx` kept `main`'s Turnstile-enabled superset, `kids-programmes.tsx` kept the incoming branch's Roller Skate Events card, `DEVLOG.md`/`memory.md` reconciled chronologically rather than picking one side.
- `tsc --noEmit` clean. Session days/times on every newly-merged page verified against `vaults/EMPOWR CIC/entities/sessions.md` (as_of 2026-08-28) — all match, no discrepancies.
- **Not pushed.** `main` is local-only, ahead of `origin/main`. Production (`eela.empowrcic.org`) still runs the pre-merge code and is unaffected either way.
- **First attempt at this merge (superseded, do not repeat)**: initially merged the *whole* `feat/eela-booking-cutover` branch (hub work + both Members-repoint commits) into `main`, then added a follow-up commit reverting `lib/links.ts` back to Wix. Functionally equivalent end state, but left a repoint-then-revert pair permanently in `main`'s history and consumed the cutover branch instead of keeping it separately mergeable. Redone as described above instead — cleaner history, same result.
- Found during review, not yet fixed: `kids-space/sk8-skool/kidz/page.tsx`'s £30/mo "Sk8 Skool Membership" CTA uses `LINKS.kidzSpace` (the generic Wix kidzspace page) instead of a day-specific classes link — every other detail page's Pay-As-You-Go and Membership CTAs share the same link; this one doesn't. Pre-existing on `feat/sk8-skool-merge`, not introduced by this merge. Flagged, not fixed.

## 2026-08-25 — Kids Space Sk8 Skool merged into a hub; site-wide KB audit found and fixed 6 pricing/copy gaps across 5 pages

- Merged Kids Space's 3 flat Sk8 Skool cards (Monday, Wednesday, All Ages) into one hub (`/kids-space/sk8-skool` + `/kids-space/sk8-skool/kidz`), mirroring the Adults Sk8 Skool pattern; added a Roller Skate Events card to `/kids-space`. Kidz + All Ages both gained real Subscription pricing (£30/mo, £40/mo) via a Pay As You Go/Membership two-card layout matching Skate Jam's existing pattern; the earlier "Wednesday is outdoor-only, April-August" claim was corrected — it runs year-round, moving indoors to Honor Oak CC the rest of the year.
- **Ran a full site-vs-KB audit** (every session page against `vaults/EMPOWR CIC/entities/sessions.md`) after the user asked whether the site now matched the KB — it didn't, on 6 counts. Fixed: Synkron8 missing its Membership card (£45/mo, despite its own FAQ mentioning one), Skate Jam's flat £10 price split into the real £7-online/£10-door tiers, Roller Quad Camps showing no price at all (added "From £45"), Skate Jam's hero tag corrected from the wrong "Ages 8+" to "Ages 15+" (contradicted both the KB and the page's own FAQ), and its FAQ's beginner-readiness answer corrected to recommend only Beginners Foundations, not Synkron8 (never part of the Indoor Pathway). Beginners Foundations itself was restructured from one undifferentiated £55/course card into a Level 1 (Tue)/Level 2 (Wed) two-card grid, with Empowr-supplied descriptions for each level.
- **Still open, deliberately not fixed**: the Kids Space Roller Skate Events card links to `LINKS.rollerSkateEvents` (the KB-confirmed adult-only 15+ Wix page) despite family-oriented bullet copy — flagged to the user, awaiting a decision on whether it should point at `LINKS.kidzRollerDisco` instead.
- **Mid-session branch collision, resolved non-destructively**: a concurrent session had switched this shared working directory to a new branch (`feat/eela-booking-cutover`) and committed its own Members-links work right as this session went to commit. Used a temporary `git worktree` to cherry-pick this session's commits onto the correct branch (`feat/sk8-skool-merge`) and push cleanly, rather than touch their branch.
- Everything this session pushed sits on `feat/sk8-skool-merge` (off `feature/skate-jam-page`, not `main`) — preview at `feat-sk8-skool-merge--empowr-eela.netlify.app`, not yet merged. `tsc --noEmit` clean, full `next build` (22 routes), Playwright against production `next start` builds — zero console errors across every page touched.

## 2026-08-25 — Private Bookings enquiries had been silently lost since ~08-17; Turnstile added to the modal

The reported problem — "birthday party enquiries aren't alerting us" — was real but not caused by anything in this repo. The shared backend on Main Site had been failing to deliver the team's notification for every form using it; full root cause in `Empowr Main Site/DEVLOG.md` and the workspace `DEVLOG.md`.

- **Nobody had ever successfully used this form.** Searched the whole `enquiries@empowrcic.org` mailbox for the modal's subject pattern and its `eela-*` source tags: zero matches, ever. The birthday-party interest that *did* arrive (the Helen Birtwistle thread) came through Main Site's general contact form, not this modal. So the fix below closes a path that was broken before it ever carried a real enquiry.
- **Turnstile added to `EnquiryModal.tsx`**, passing its token to Main Site's contact function. No secret in this repo — verification happens in that function, so EELA only carries the public sitekey, and it must be the *same* sitekey since one widget covers both origins.
- 🔴 **The modal is exactly the case Turnstile's default rendering breaks.** The implicit `cf-turnstile` script scans the DOM once when it loads and never watches for later changes, so the widget rendered on first open and silently not on any reopen — leaving no token for a backend that had just started rejecting tokenless submissions. Proven in a real browser before fixing: the `cf-turnstile-response` input Turnstile creates was present on open #1 and absent on open #2. Fixed with `@marsidev/react-turnstile` (explicit rendering, already used in EFN Dashboard) and re-verified passing on both opens. Submit is disabled until a token exists.
- Commits `16bf755` and `cdb1838`, both on `main` and deployed. **Deliberately put on `main`, not on `feat/eela-booking-cutover`** — that branch carries ~20 commits of unrelated in-flight booking-cutover work that isn't ready to ship, and `EnquiryModal.tsx` is identical on both branches, so the change applied cleanly without dragging any of it along. The feature branch was left exactly as found and will pick this up on its next merge from `main`.

## 2026-08-18 — Private Bookings card moved to the end of the Adults list; local preview run

- `adults/page.tsx`: moved the Private Bookings entry from position 5 (right after Beginners Foundations) to the last slot in `programmes`, after Roller Skate Events — user-requested reorder, no content or link changes. Kids Space's copy of the card was already last there, so no change needed on that page. `tsc --noEmit` clean, rebuilt and reflected on a local preview.
- Ran the app locally on `localhost:3000` twice this session for the user to review the 2026-08-17 build in a browser (`next build` + `next start`, per the standing rule that plain `next dev` is flaky on this machine). First start attempt hit `EADDRINUSE` — a `next start` process from the prior session's Playwright test run was still holding port 3000 (its `with_server.py` teardown hadn't killed it). Identified the exact PID via `Get-CimInstance Win32_Process` (confirmed its command line before touching it, not a broad `taskkill`), stopped it, rebuilt, and restarted cleanly.
- Server stopped at session close, port 3000 confirmed free.
- Still sits on `feature/skate-jam-page`, not pushed — this entry's reorder is uncommitted as of close-out; see Pre-Close Checklist / git status.

## 2026-08-17 — Synkron8, Beginners Foundations, and Private Bookings (hub + 4 sub-pages) built

- New session detail pages on the Skate Jam template: `/adults/synkron8` and `/adults/beginners-foundations`. Both use real KB copy (`vaults/EMPOWR CIC/entities/session-faqs.md`), not placeholder text — Beginners Foundations' "what will I learn" answer is the specific skill list (Bubbles, Crossovers, Transitions, Balance and control, Manuals, Pivots), confirmed by Empowr the same day after the KB carried two conflicting drafts.
- Extracted `FaqAccordion.tsx` and `RouteInfo.tsx` from the old `SkateJamFaq.tsx` scaffold (deleted) per the template doc's standing instruction to do this on the second FAQ instance. Skate Jam's page now also carries its real FAQ + travel directions instead of "draft answer, to be confirmed" placeholders — that scaffold note was stale; the KB has carried real copy since this same day. All three Honor Oak sessions share one `HONOR_OAK_ROUTE` data object (`lib/route-data.tsx`) rather than repeating identical travel directions three times.
- New **Private Bookings** hub: `/private-bookings` landing page (pillars + 4 offering cards, reusing `ProgrammeCard`) plus one detail page per offering (`one-to-one-coaching`, `group-coaching`, `birthday-party`, `custom-event`), all sourced from `entities/private-bookings.md`. Established as the pattern for any future multi-offering hub — see `docs/session-detail-page-template.md` § Multi-offering hubs. Booking CTA on all four is "Enquire to book" → `LINKS.enquiries`, not a self-serve checkout — Empowr's process is manual quote/payment-link, not Wix instant booking.
- `adults/page.tsx` and `kids-programmes.tsx` updated: Synkron8's card now links internally (`/adults/synkron8`) instead of out to the shared Wix Sk8 Skool page; added cards for Beginners Foundations and the Private Bookings entry point (appears on both `/adults` and `/kids-space`, same target route, per the KB's stated entry-card copy).
- `LINKS.beginnersFoundations` added, reusing the same Wix Sk8 Skool URL as `sk8Skool`/`synkron8` — no dedicated service-page slug is confirmed for this course. Flagged in a code comment; worth checking with Empowr whether a more specific booking link exists.
- Verified: `tsc --noEmit` clean, full `next build` succeeds (18 routes, all new pages present), and a full Playwright pass on a production (`next start`) build — every new page loads without a 404 or console error, both FAQ accordions open and show the real KB content, and the Private Bookings hub cards navigate to their correct detail routes. Not yet pushed — sits on `feature/skate-jam-page` alongside the earlier Skate Jam and template-doc work.

## 2026-08-20 — Private Bookings availability calendar + enquiry system built, then isolated and merged to `main` — live in production

- **Roller Disco false start, corrected within the session.** Restored a standalone public "Roller Disco" card to `main` (kids-space, adults, homepage), reworded off the KB's seasonal framing — then reverted it (`c9e7334`) once it emerged that Roller Disco is already covered as the "Roller Disco Birthday Party" offering under Private Bookings, being actively built on `feature/skate-jam-page`. No lasting effect on `main`; see `memory.md` for the full two-offering breakdown (public seasonal Roller Disco vs. the private birthday-party booking) — they're genuinely different things, not a KB contradiction.
- **Availability calendar + enquiry modal built, starting on the Birthday Party page then rolled out to all four Private Bookings offerings** (1:1 coaching, group coaching, birthday party, custom event): a live Google Calendar embed (`AvailabilityCalendar.tsx`, one shared calendar — all four compete for the same Saturday 3-5PM Ladywell Centre slot) plus an in-page enquiry modal (`EnquiryModal.tsx`) with structured date/party-size fields (iterated twice on layout at the user's request: two-column → stacked → content-width). Custom Event got its own richer `CustomEventEnquiryModal.tsx` (Location, Budget, a 7-item Desired Inclusions checklist) instead of overloading the shared component.
- **The enquiry modal submits into Main Site's real contact-form backend, cross-origin, rather than duplicating it** — required a companion CORS change on `Empowr Main Site` (`src/netlify/functions/contact.ts`, commit `5fe0c69`, live). Two real bugs caught and fixed along the way, both worth remembering for any future cross-origin work on this stack: (1) the endpoint needs to hit `www.empowrcic.org` directly, not the apex — a CORS preflight that gets redirected is a hard browser failure even when the final destination has correct headers, and curl won't show it since curl follows redirects transparently; (2) confirmed via the user that CRM routing is currently paused (env vars deliberately unset on Main Site), so submissions fall to the existing Resend-to-`enquiries@empowrcic.org` path — automatic, no code change, and it'll start flowing through the CRM again the moment those vars are restored.
- **Deliberately reconstructed onto a fresh branch (`feat/private-bookings`) off `main`, rather than merging `feature/skate-jam-page` as-is** — that branch bundles this work together with unrelated, not-yet-ready Skate Jam/Synkron8/Beginners Foundations pages in the same commits (most notably `186fe43`). Every file except `adults/page.tsx` was fully self-contained (confirmed by grep, not assumed); `adults/page.tsx` was hand-edited to carry only the Private Bookings card. Re-verified identically to the original build: `tsc --noEmit` clean, full `next build` (13 routes, no Skate-Jam-family routes present), real end-to-end submission through production.
- **Merged and live**: user reviewed the isolated branch-deploy preview, then gave the explicit go-ahead. Fast-forward merge (`c9e7334..8f9bd28`), pushed, auto-deployed. Confirmed live: `eela.empowrcic.org/private-bookings/birthday-party` serves the calendar and enquiry modal in production.
- `feature/skate-jam-page` itself is untouched, still holds the full combined original work, and got a fresh branch-deploy preview rebuilt for review. **User's call: Skate Jam/Synkron8/Beginners Foundations stay bundled together for now** — not being split the way Private Bookings was.

## 2026-08-14

- Created `README.md` at the project root, closing an M10 gap flagged by the scheduled mwp-health compliance audit.
- Converted a near-miss "Skills and Tools Available" heading in `CLAUDE.md` to the compliant M8 table format.

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
