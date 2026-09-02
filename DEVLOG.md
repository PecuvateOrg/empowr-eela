# EELA — DEVLOG

## 2026-09-02 — The Wix→Members cutover is MERGED AND LIVE; All Ages given a route per space

- **This supersedes yesterday's "NOT merged, by the user's call."** `feat/members-links-cutover` merged to `main` (`a707007`) and deployed. Verified on production, not just preview: all 14 EELA pages 200, **zero Wix links remain anywhere on the site**, all 10 Members destinations 200, and all four `#subscribe` anchors exist on their targets.
- **Camps and Roller Disco no longer "deliberately stay on Wix"** — yesterday's rule is reversed. Both route to Members and land on its "Dates coming soon" state. This was possible because `roller-quad-camp` and `all-ages-roller-disco` were flipped `active = true` mid-session (not by this session); both had 404'd for most of it. First time that empty state has ever rendered in production.
- **All Ages was ONE page listed on BOTH Sk8 Skool hubs with one hardcoded back link**, so it was always wrong for one entry point. `7d92c5a` "fixed" it by flipping the string, which moved the bug from Kids to Adults. Now `Sk8SkoolAllAgesContent` takes a `backHref` and each space renders it at its own route; the kids mirror carries `alternates.canonical` → the adults URL.
- **Kids Space "Roller Skate Events" pointed at the 15+ adult offering** — a 5+ page selling 15+ tickets, flagged 2026-08-25 and open since. Repointed to the all-ages Roller Disco; the redundant commented-out disco card removed. ⚠️ **The card's copy is CORRECT** — Empowr confirmed "Roller Skate Events" is a category (disco / challenges / games), so do not "fix" those bullets.
- **Branch cleanup:** deleted 3 merged (`feat/private-bookings`, `feat/sk8-skool-merge`, `feature/skate-jam-page`) and the superseded `feat/eela-booking-cutover` + its backup. Its only unique content was a redirect-reliant plural slug and a Wix disco link — both worse. Recoverable: `5e00806`, `a5fb796`.
- **Left open:** `/roller-quad-camps` says "Book now" over a "Dates coming soon" page — intentional, per the user. `feat/chat-bubble` still has 2 unpushed local commits.

## 2026-09-01 — Members cutover rebuilt on a clean branch and verified; NOT merged

- **`feat/eela-booking-cutover` was rejected and replaced**, not merged. It was rebased onto the new `main` so it applied cleanly, but its page files predated `main`'s 2026-08-29 fixes: merging would have re-added the Wix-linked "£30/mo Book now" card that fix removed, and reverted the All Ages back-arrow to the Adults hub. **A clean rebase does not mean current content** — git only knows the lines do not collide.
- **New branch `feat/members-links-cutover`** carries links only: six session links to `members.empowrcic.org`, `beginners-foundation` singular (was relying on a 308), and two dead keys removed. Camps and Roller Disco deliberately stay on Wix — their Members offerings are inactive and `/sessions/roller-quad-camp` 404s, so a working Wix page beats a dead link. ⚠️ `kidzSummerCamps` (paid) and `rollerQuadCampsHAF` (benefit-eligible, DfE-funded) are **different audiences** — HAF is not a fallback for the paid route.
- **`/members` was a waitlist whose form discarded every email** — `if (email.trim()) setSubmitted(true)`, no API call, no storage, while showing "You're on the list". Same shape as the Main Site contact form that lost every enquiry 08-17→25. Nothing links to it, but it sits in the sitemap at priority 0.7, so it is reachable from search. Rewritten as a real sign-up door to `members.empowrcic.org/signup`; dropping `'use client'` also gained a `Footer` and a `metadata` export it never had. Perk claims corrected — "early access to book before sessions open" and "priority invites" describe mechanisms that do not exist.
- **The £X/month cards deep-link to `/sessions/<slug>#subscribe`**, so the flow is one entry point per session: EELA → session page → choose → a page per choice.
- **⚠️ Netlify `allowed_branches` is an explicit allowlist** and blocked the branch build silently — appended `feat/members-links-cutover`. Any future EELA feature branch needs adding or it will look like Netlify is ignoring the push.
- **Not merged, by the user's call.** All 8 destinations verified live (Trustpilot's 403 is bot-blocking, not a broken link). Merging is next session's first action; EELA still sends people to Wix until then.

## 2026-08-26 — Booking links repointed from Wix to Members on `feat/eela-booking-cutover` (branch since superseded and deleted); "Beginners Foundation" corrected to the singular
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
