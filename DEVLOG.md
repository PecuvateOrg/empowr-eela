# EELA — DEVLOG

## 2026-08-26 — Booking links repointed from Wix to the Members platform; "Beginners Foundation" corrected to the singular

Code for this sits on `feat/eela-booking-cutover` (off `feat/sk8-skool-merge`, **unpushed**); only this log entry and `memory.md` are on `main`.

- **`lib/links.ts` now sends every confirmed bookable session to `members.empowrcic.org/sessions/[slug]`** instead of Wix: Skate Jam, Synkron8, Sk8 Skool All Ages, Sk8 Skool Kidz (both days), Beginners Foundation, Roller Skate Events, and the **Empowr-owned** Roller Quad Camp. `rollerQuadCampsHAF` stays on `app.holidayactivities.com` (a funder's system) and Private Bookings is untouched — neither ever went through Wix.
- **The governing rule set this session**: `vaults/EMPOWR CIC/entities/sessions.md` is the single source of truth for what sessions exist; this site displays it and Members' catalogue must correlate with it. **Wix is explicitly out of scope** as a reconciliation target.
- **No new auth work was needed.** Members' `middleware.ts` already guards `/book/*` and bounces anonymous visitors to `/login?next=…`, returning them to the exact booking after sign-in — precisely the "reads whether they're a member, then drops them into booking" flow that was asked for. The gap was only ever EELA's outbound links.
- **Renamed "Beginners Foundations" → "Beginners Foundation"** across 12 display-copy usages in 4 files, confirmed by Empowr: it is the foundation of a skater's skills. Route path `/adults/sk8-skool/beginners-foundations` and the Members slug both still read plural — a deliberate, separate decision, since changing a URL is not the same as changing copy.
- **Deleted the stale local branch `feat/bookings-domain-cutover`** (was `ba019b6`, recoverable via reflog). A superseded Wix-era plan pointing everything at `bookings.empowrcic.org`; merging it would have deleted Private Bookings, the enquiry modal, PostHog, `robots.txt`, the README and `docs/`.
- ⚠️ **These links 404 until Members goes live** — its catalogue entries exist but are all `active=false` by design. The branch is not independently deployable.
- **Members offerings now exist for Prep to Street Skate L1/L2 and All Ages Roller Disco, but EELA has no pages for them** — new outstanding work. The All Ages Roller Disco offering (5+, £15) is also the natural answer to the open Kids Space "Roller Skate Events" family-copy question.

## 2026-08-25 — Private Bookings enquiries had been silently lost since ~08-17; Turnstile added to the modal

The reported problem — "birthday party enquiries aren't alerting us" — was real but not caused by anything in this repo. The shared backend on Main Site had been failing to deliver the team's notification for every form using it; full root cause in `Empowr Main Site/DEVLOG.md` and the workspace `DEVLOG.md`.

- **Nobody had ever successfully used this form.** Searched the whole `enquiries@empowrcic.org` mailbox for the modal's subject pattern and its `eela-*` source tags: zero matches, ever. The birthday-party interest that *did* arrive (the Helen Birtwistle thread) came through Main Site's general contact form, not this modal. So the fix below closes a path that was broken before it ever carried a real enquiry.
- **Turnstile added to `EnquiryModal.tsx`**, passing its token to Main Site's contact function. No secret in this repo — verification happens in that function, so EELA only carries the public sitekey, and it must be the *same* sitekey since one widget covers both origins.
- 🔴 **The modal is exactly the case Turnstile's default rendering breaks.** The implicit `cf-turnstile` script scans the DOM once when it loads and never watches for later changes, so the widget rendered on first open and silently not on any reopen — leaving no token for a backend that had just started rejecting tokenless submissions. Proven in a real browser before fixing: the `cf-turnstile-response` input Turnstile creates was present on open #1 and absent on open #2. Fixed with `@marsidev/react-turnstile` (explicit rendering, already used in EFN Dashboard) and re-verified passing on both opens. Submit is disabled until a token exists.
- Commits `16bf755` and `cdb1838`, both on `main` and deployed. **Deliberately put on `main`, not on `feat/eela-booking-cutover`** — that branch carries ~20 commits of unrelated in-flight booking-cutover work that isn't ready to ship, and `EnquiryModal.tsx` is identical on both branches, so the change applied cleanly without dragging any of it along. The feature branch was left exactly as found and will pick this up on its next merge from `main`.

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

## 2026-07-30 — PostHog route-change tracking fix (fleet-wide)

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
