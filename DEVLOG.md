# EELA — DEVLOG

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

## 2026-06-26 — Session 9: EELA sub-programme naming update

### Done

- **`src/app/about/page.tsx`** — `programmes` array updated: Mind Body & Wellness → MindWell, Creative Expression & Arts → CreateWell, Outdoor & Adventure → ExploreWell, Team-Building & Leadership → ConnectWell
- Taglines (Mindfulness & Recovery, Creativity & Self-Expression, Nature & Exploration, Collaboration & Growth) were already correct — only the primary `name` field changed
- Pushed to `main` — Netlify auto-deployed

### Decisions

- Naming now consistent across: EELA about page, Empowr Main Site our-work page, and the supporter prospectus
- MoveWell was already using the correct name in all three places

---

## 2026-06-18 — Session 8: Built /roller-quad-camps page with S3 hero image, two booking cards (Empowr Camps direct + HAF Spaces), added rollerQuadCampsHAF link

## 2026-06-13 — Session 7: Built Kids/Adults Trustpilot review carousels, renamed Roller Quad Camps (was Summer Roller Camps), removed inaccurate stats bar

## 2026-06-04 — Session 6: Removed inaccurate stats bar from Home and Adults pages

## 2026-06-01 — Session 2: Built Kids Space page, rebranded platform to EELA, launched to eela.empowrcic.org via Netlify

## 2026-06-01 — Session 3: Built Members Coming Soon page with waitlist form (no backend yet)

## 2026-06-03 — Session 5: Built About page from EELA KB with 5 sub-programme cards, updated footer description

## 2026-06-02 — Session 4: Removed Lewisham-only references sitewide, held back Members nav link pending team review
