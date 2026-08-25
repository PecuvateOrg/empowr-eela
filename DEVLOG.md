# EELA — DEVLOG

## 2026-08-25 — Kids Space Sk8 Skool merged into a hub; site-wide KB audit found and fixed 6 pricing/copy gaps across 5 pages

- Merged Kids Space's 3 flat Sk8 Skool cards (Monday, Wednesday, All Ages) into one hub (`/kids-space/sk8-skool` + `/kids-space/sk8-skool/kidz`), mirroring the Adults Sk8 Skool pattern; added a Roller Skate Events card to `/kids-space`. Kidz + All Ages both gained real Subscription pricing (£30/mo, £40/mo) via a Pay As You Go/Membership two-card layout matching Skate Jam's existing pattern; the earlier "Wednesday is outdoor-only, April-August" claim was corrected — it runs year-round, moving indoors to Honor Oak CC the rest of the year.
- **Ran a full site-vs-KB audit** (every session page against `vaults/EMPOWR CIC/entities/sessions.md`) after the user asked whether the site now matched the KB — it didn't, on 6 counts. Fixed: Synkron8 missing its Membership card (£45/mo, despite its own FAQ mentioning one), Skate Jam's flat £10 price split into the real £7-online/£10-door tiers, Roller Quad Camps showing no price at all (added "From £45"), Skate Jam's hero tag corrected from the wrong "Ages 8+" to "Ages 15+" (contradicted both the KB and the page's own FAQ), and its FAQ's beginner-readiness answer corrected to recommend only Beginners Foundations, not Synkron8 (never part of the Indoor Pathway). Beginners Foundations itself was restructured from one undifferentiated £55/course card into a Level 1 (Tue)/Level 2 (Wed) two-card grid, with Empowr-supplied descriptions for each level.
- **Still open, deliberately not fixed**: the Kids Space Roller Skate Events card links to `LINKS.rollerSkateEvents` (the KB-confirmed adult-only 15+ Wix page) despite family-oriented bullet copy — flagged to the user, awaiting a decision on whether it should point at `LINKS.kidzRollerDisco` instead.
- **Mid-session branch collision, resolved non-destructively**: a concurrent session had switched this shared working directory to a new branch (`feat/eela-booking-cutover`) and committed its own Members-links work right as this session went to commit. Used a temporary `git worktree` to cherry-pick this session's commits onto the correct branch (`feat/sk8-skool-merge`) and push cleanly, rather than touch their branch.
- Everything this session pushed sits on `feat/sk8-skool-merge` (off `feature/skate-jam-page`, not `main`) — preview at `feat-sk8-skool-merge--empowr-eela.netlify.app`, not yet merged. `tsc --noEmit` clean, full `next build` (22 routes), Playwright against production `next start` builds — zero console errors across every page touched.

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

## 2026-08-05 — CookieConsentBanner note corrected: deliberate hold, not stale work

- `memory.md` had framed the long-uncommitted `CookieConsentBanner.tsx` as parked work of unknown status, on the grounds that the "concurrent session in progress" note was six days old. **The user corrected this:** the banner redesign is tied to the `feat/chat-widget-embed` work and stays uncommitted until that widget is finalised. The dependency is the reason for the delay, not neglect.
- Note rewritten to say so explicitly, with instructions for a fresh session: expected, do not discard, **do not commit** — it goes in as part of finalising the chat widget.
- Worth keeping in mind generally: a stale-looking timestamp is not evidence of abandonment. Ask before recategorising someone else's in-flight work.

## 2026-08-04 — Added sitemap.xml (6 routes) and restored the Sitemap: line in robots.txt; kids-space and adults prioritised for legacy Wix redirect traffic

## 2026-07-31 — Roller Disco removed from site copy; branch-deploy previews enabled for feat/chat-widget-embed

---

## 2026-07-30 — PostHog route-change tracking fix (fleet-wide): `capture_pageview` corrected from `true` to `'history_change'`, restoring client-side navigation tracking across all internal `<Link>` clicks

## 2026-07-29 - Session 16: CookieConsentBanner redesigned to a floating rounded card (same consent logic, on_reject cookieless mode unchanged), verified on a real Netlify branch-deploy preview stacked on feat/chat-widget-embed (`0180cd4`); left uncommitted on main at the user request pending that branch merging

## 2026-07-29 - Session 15: Booking-click capture (T4) via posthog.capture on ProgrammeCard + cross-site UTM tagging (T5); PostHog bot detection blocks headless verification of capture() calls

---

## 2026-07-28 — Session 14: Switched PostHog to `cookieless_mode: 'on_reject'` so decliners are counted cookielessly instead of producing zero events; consent banner UI unchanged

---

## 2026-07-20 — Session 13: Roller Quad Camps minimum age corrected to 5+ (reversing Session 12's 8+), page-wide

## 2026-07-14 — Session 12: Roller Quad Camps age standardised to "8+" page-wide (later reversed to "5+" in Session 13); confirmed no live Supabase `mem_offerings` row to sync

---

## 2026-06-29 — Session 11: Members page cleanup — removed broken Wix account notice, restored coming-soon waitlist; team decided against Wix for account management, new platform to be built separately

---

## 2026-06-28 — Session 10: PostHog consent banner (Variant B, since superseded by cookieless `on_reject` mode 2026-07-28) + Navbar active-state fix via `usePathname()`

---

## 2026-06-26 — Session 9: Updated EELA about page sub-programme names to MindWell/CreateWell/ExploreWell/ConnectWell, consistent with Main Site and prospectus

---

## 2026-06-18 — Session 8: Built /roller-quad-camps page with S3 hero image, two booking cards (Empowr Camps direct + HAF Spaces), added rollerQuadCampsHAF link

## 2026-06-13 — Session 7: Built Kids/Adults Trustpilot review carousels, renamed Roller Quad Camps (was Summer Roller Camps), removed inaccurate stats bar

## 2026-06-04 — Session 6: Removed inaccurate stats bar from Home and Adults pages

## 2026-06-01 — Session 2: Built Kids Space page, rebranded platform to EELA, launched to eela.empowrcic.org via Netlify

## 2026-06-01 — Session 3: Built Members Coming Soon page with waitlist form (no backend yet)

## 2026-06-03 — Session 5: Built About page from EELA KB with 5 sub-programme cards, updated footer description

## 2026-06-02 — Session 4: Removed Lewisham-only references sitewide, held back Members nav link pending team review
