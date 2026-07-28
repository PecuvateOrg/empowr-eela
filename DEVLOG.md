# EELA — DEVLOG

## 2026-07-28 — Session 15: First live embed of the CRM chat widget (staged on this branch, not yet merged)

### Done

- Embedded the CRM's live chat widget on EELA for the first time — `src/components/ChatBubble.tsx` (ported from the proven, previously-unmerged `feat/chat-bubble-v2` prototype on Empowr Main Site, which already fixed a localStorage-in-iframe crash) wired into `src/app/layout.tsx` alongside `CookieConsentBanner`, pointing at `crm.pecuvate.com/widget?org=empowr-cic`
- Verified live via Playwright against the real production CRM widget (not a local mock) — bubble opens, iframe loads the widget correctly, and confirmed the CRM's new satisfaction-gated escalation UX (see PecuvateCRM DEVLOG, session 3) is already live in production
- Found EELA's Netlify site is configured with `build_settings.allowed_branches: ["main"]` — no branch deploys or PR deploy previews are possible until that's widened; this blocked getting a shareable preview URL tonight
- Committed here on `feat/chat-widget-embed` (`bbab61a`), not `main` — deliberately held back per owner's decision to have the team test first and push tomorrow

### Decisions

- Bubble's close/toggle button sits in the same bottom-right corner as the cookie-consent banner when both are visible on first load — cosmetic overlap, not fixed yet. Note: a separate concurrent session logged a request to shrink `CookieConsentBanner.tsx` to a compact square (see Session 14's "Next" below) — worth revisiting this overlap once that redesign lands, since a smaller banner may resolve it on its own
- Owner chose not to widen Netlify's `allowed_branches` for a preview link tonight — testing the standalone CRM `/widget` page directly was judged sufficient for now

### Next

- Get the team to review `feat/chat-widget-embed`, then merge to `main` and push — tomorrow
- Decide whether to fix the cookie-banner/bubble overlap before or after that push (may resolve itself once the banner redesign above ships)
- Still open from prior sessions: homepage restructure, Phase 2 backend wiring, bookings domain cutover, Kids Space umbrella age label decision

---

## 2026-07-28 — Session 14: Cookieless analytics (on_reject), fixes decliner blind spot

### Done

- `src/components/PostHogProvider.tsx`: replaced `persistence: 'localStorage+cookie'` + `opt_out_capturing_by_default: true` with `cookieless_mode: 'on_reject'` (`3620f25`) — decliners are now counted cookielessly instead of producing zero events (previously `opt_out_capturing_by_default` suppressed all capture until Accept, silently undercounting real traffic and making the org dashboard sum incompatible counting methods across sites)
- `src/components/CookieConsentBanner.tsx`: removed the manual `posthog.capture('$pageview')` replay in `handleAccept` — redundant now that default capture works, and would otherwise double-count the landing pageview; PostHog's `opt_in_capturing()`/`opt_out_capturing()` drive the cookieless-mode switch automatically per their docs, so no other banner logic changed
- Banner itself (UI, Accept/Decline copy) unchanged — this session was a legal-basis and consent-mode fix, not a redesign

### Decisions

- User's call: keep the consent banner (`on_reject` mode) rather than dropping it (`always`, matching the other 3 Empowr sites) — cross-day identity is genuinely useful once EELA has real member accounts, which `on_reject` preserves for consenters while still fixing the decliner blind spot

### Next

- Still open from prior sessions: homepage restructure, Phase 2 backend wiring, bookings domain cutover
- New from this session: T4 (booking-click capture on `ProgrammeCard.tsx`) not yet started — see AnalyticsHub DEVLOG for the full T3–T7 programme this was part of

---

## 2026-07-20 — Session 13: Roller Quad Camps minimum age corrected to 5+

### Done

- `src/app/roller-quad-camps/page.tsx` and `src/lib/kids-programmes.tsx` — minimum age changed from "8+" to "5+" across all four instances (SEO description, hero eyebrow tag, hero body copy, hero image badge, programme card tag)
- Empowr CIC KB vault (`entities/movewell.md`, `entities/sessions.md`) updated to match, committed together with other pending vault edits (cancellation policy v1.1 rewrite, contact routing to empowrcic.org/contact, Beginners Street Skate course date confirmed) — pushed to `kb-empowr-cic`
- Committed `b4c3875`, pushed to `main` — Netlify auto-deployed
- Documented in `_config/registry/github.md` that every KB vault (including this one) is its own separate git repo, not part of `knowledge-based-system` — previously undocumented gap

### Decisions

- This reverses Session 12's standardisation on "8+" — direct user instruction this session to use "5+" instead. Session 12's move was to fix an *internal inconsistency* (some copy said 5+, some said 8+); this session is a substantive correction of the actual minimum age, not a re-litigation of that inconsistency fix

### Next

- Open question from Session 12 still unresolved: whether the Kids Space umbrella age label should also move, or stay as-is since it covers more than just Quad Camps
- EELA homepage restructure: new `/` presenting EELA as a platform (5 programme pillars); current skating home moves to `/move-well`
- Phase 2: wire members form to backend (Supabase/Resend), booking integration
- Complete bookings domain cutover (feature branch)

---

## 2026-07-14 — Session 12: Roller Quad Camps age standardisation

### Done

- `src/app/roller-quad-camps/page.tsx` — standardised age range to "8+" across the page (SEO description, hero eyebrow tag, hero body copy); hero image badge already said 8+, page was inconsistent
- Committed and pushed to `main` — Netlify auto-deployed

### Decisions

- Scope limited strictly to the Quad Camps page — left the general Kids Space umbrella age ("5+", covers Sk8 Skool classes for 5-12yr olds too) and the unrelated Adults/Roller Disco "5+" label untouched, since neither is Quad-Camps-specific
- Confirmed no live Quad Camps row exists in Empowr Members' Supabase `mem_offerings` table — ages are hardcoded in EELA page copy only, nothing to sync there

### Next

- Open question for the user: whether the Kids Space umbrella age label should also move, or stay 5+ since it covers more than just Quad Camps
- EELA homepage restructure: new `/` presenting EELA as a platform (5 programme pillars); current skating home moves to `/move-well`
- Phase 2: wire members form to backend (Supabase/Resend), booking integration
- Complete bookings domain cutover (feature branch)

---

## 2026-06-29 — Session 11: Removed broken Wix account notice from Members page (URLs all broken), restored clean coming-soon waitlist; team decided a standalone members platform will be built separately rather than routing to Wix

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
