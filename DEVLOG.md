# EELA — DEVLOG

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

## 2026-06-29 — Session 11: Members page cleanup

### Done

- `src/app/members/page.tsx` — removed Wix account notice (Wix account URLs are all broken); page restored to clean coming-soon waitlist
- `src/lib/links.ts` — removed `wixAccount` entry
- Changes on `feat/members-account-notice` branch — parked, not merged

### Decisions

- Team decided against routing to Wix for account management; new standalone members platform will be built as a separate project
- Members page stays as coming-soon waitlist until new platform is live; when ready, wire `handleSubmit` to Supabase/Resend and add nav link back in `Navbar.tsx`

### Next

- EELA homepage restructure: new `/` presenting EELA as a platform (5 programme pillars); current skating home moves to `/move-well`
- Phase 2: wire members form to backend (Supabase/Resend), booking integration
- Complete bookings domain cutover (feature branch)
- New members platform (separate project) — once live, merge `feat/members-account-notice` and activate members nav link

---

## 2026-06-28 — Session 10: PostHog consent banner + Navbar active state

### Done

- **`src/components/PostHogProvider.tsx`** — switched to `persistence: 'localStorage+cookie'` + `opt_out_capturing_by_default: true` (Variant B consent pattern — full persistence but opted out until user accepts)
- **`src/components/CookieConsentBanner.tsx`** — new component: sticky bottom banner with Accept/Decline; uses `eela_analytics_consent` localStorage key; on accept calls `posthog.opt_in_capturing()` + fires `$pageview`; links to `https://empowrcic.org/legal/cookie-policy`
- **`src/app/layout.tsx`** — `CookieConsentBanner` added after `{children}` inside `PostHogProvider`
- **`src/components/Navbar.tsx`** — converted to client component; `usePathname()` used to apply active style (`text-blue bg-blue-pale`) to current page link; `aria-current="page"` added; fixes rage click on `/adults` nav link (user was already on page, no visual feedback)
- All pushed to `main` — Netlify auto-deployed

### Decisions

- EELA uses Variant B (consent banner + full persistence) because a members section with cross-session tracking is planned; all other Empowr sites use Variant A (memory mode, no banner)
- Consent state tracked via custom `eela_analytics_consent` localStorage key rather than `posthog.has_opted_in_capturing()` to avoid timing issues with PostHog init
- Old `CookieBanner` component (Heroes-style, cosmetic only) was not present in EELA — banner is new

### Next

- EELA homepage restructure: new `/` presenting EELA as a platform (5 programme pillars); current skating home moves to `/move-well`
- Team to review `/about` and `/members` nav links
- Phase 2: wire members form to backend (Supabase/Resend), booking integration
- Complete bookings domain cutover (feature branch)

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
