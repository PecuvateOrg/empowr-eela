# EELA — DEVLOG

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

## 2026-08-12 — Chat widget bubble merged to main, live on eela.empowrcic.org

- Cherry-picked `bbab61a` (`feat: embed live chat widget bubble`) from the long-parked `feat/chat-widget-embed` branch onto `main` — the bubble was staged 2026-07-28 specifically to let the team try it before it went live; owner confirmed that testing is done, go ahead and merge.
- **Cherry-picked, not merged whole-branch, on purpose.** The branch's other two commits were dead weight by now: `0180cd4` (cookie banner redesign) is superseded — the same redesign already landed on `main` separately as `bf098ec` (see the 2026-08-05 entry below); `4b20ff3` was a DEVLOG/memory docs commit that would only conflict against five months of since-written entries. `bbab61a` itself only touches `layout.tsx` (2 lines, wiring) and adds `ChatBubble.tsx` — fully disjoint from the banner file, so the cherry-pick applied clean, no conflicts.
- `ChatBubble.tsx` points at `https://crm.pecuvate.com/widget?org=empowr-cic` — confirmed correct, no stale/dev URL. Verified `tsc --noEmit` clean after a stale `.next` cache (left over from a different local branch checkout) was cleared.
- **Known cosmetic inconsistency, not fixed here:** the floating launcher button is still `#1a1a2e` (dark navy) — the CRM widget it opens now renders in Empowr's brand blue (`#4A70C2`, done the same day on the CRM side). Flagged to the owner, not changed without a decision since it's a site-level style choice, not a CRM widget config value.
- **Later same session: the bubble now opens itself.** Owner's call, since this is a new feature going live — it should greet visitors proactively rather than sit there waiting to be noticed. Added a 1.5s `setTimeout` in `ChatBubble.tsx` before flipping `open` to `true`, giving the page a moment to render first. Paired with a rewritten, less reactive-sounding greeting (set in PecuvateCRM's `org_ai_config`, not code here — see that project's DEVLOG) since the old copy assumed the visitor had already asked something. Live-verified with a screenshot: bubble open, correct new greeting text (em dash intact), brand-blue header, logo legible.
- The `#1a1a2e` launcher-button inconsistency noted above is now more visible, since the panel it opens is on-screen by default rather than only after a click — still not fixed, still the owner's call to make.

## 2026-08-05 — CookieConsentBanner note corrected: deliberate hold, not stale work

- `memory.md` had framed the long-uncommitted `CookieConsentBanner.tsx` as parked work of unknown status, on the grounds that the "concurrent session in progress" note was six days old. **The user corrected this:** the banner redesign is tied to the `feat/chat-widget-embed` work and stays uncommitted until that widget is finalised. The dependency is the reason for the delay, not neglect.
- Note rewritten to say so explicitly, with instructions for a fresh session: expected, do not discard, **do not commit** — it goes in as part of finalising the chat widget.
- Worth keeping in mind generally: a stale-looking timestamp is not evidence of abandonment. Ask before recategorising someone else's in-flight work.

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
