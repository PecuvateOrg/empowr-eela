# EELA — DEVLOG

## 2026-06-18 — Session 8: Roller Quad Camps page

### Done

- **`/roller-quad-camps` page** — new page with 2-column hero (text + S3 image), pillars strip, two booking option cards, back-link to Kids Space
- **Two booking cards**: Empowr Camps (standard booking, card/white style, first) and HAF Spaces (HAF programme, blue style, second)
- **Hero image** — loaded from S3 (`empowr-cic.s3.us-east-1.amazonaws.com`); `empowr-cic.s3.us-east-1.amazonaws.com` added to `next.config.ts` remotePatterns; bucket confirmed public
- **Photo badge** — "Kidz Space / 8+" — Kidz Space is the naming convention for all photo tags on Kids Space sub-pages
- **HAF link** added to `links.ts` as `rollerQuadCampsHAF` pointing to `app.holidayactivities.com/parent/providers/empowr-cic`
- **Kids Space card** — Roller Quad Camps card now routes internally to `/roller-quad-camps` with "View options" button label (not direct external booking)
- **ProgrammeCard** — updated to auto-detect internal vs external links (`/` prefix → Next.js `<Link>`); optional `buttonLabel` prop added (defaults to "Book")
- **Quiz banner removed** from Roller Quad Camps page — not appropriate for a page presenting specific booking options
- Pushed to `main` — Netlify auto-deployed

### Decisions

- "Empowr Camps" used only as the card heading inside `/roller-quad-camps`; the Kids Space card and page h1 retain "Roller Quad Camps"
- Kidz Space photo tag convention: all sub-pages under Kids Space use "Kidz Space" in the image badge, with the relevant age on the second line
- Standard booking card placed first (programme-first UX); HAF Spaces second

### Next

- EELA homepage restructure: new `/` presenting EELA as a platform (5 programme pillars); current skating home moves to `/move-well`
- Team to review `/about` and `/members` nav links
- Phase 2: wire members form to backend (Supabase/Resend), booking integration
- Complete bookings domain cutover (feature branch)

---

## 2026-06-13 — Session 7: Reviews carousels + programme card updates

### Done

- **KidsReviewsCarousel** — new component built, added to Kids Space page with 8 Trustpilot reviews (kids/family focused); section uses `max-w-6xl px-6` to match main site peek behaviour
- **AdultsReviewsCarousel** — new component built, added to Adults page with 8 Trustpilot reviews (adults focused); same layout and section width
- **Kids programme cards** — Mon + Wed Sk8 Skool bullets aligned to "Learn to skate safely / Build balance & confidence / For beginners"; Saturday Sk8 Skool third bullet → "For beginners"; Roller Quad Camps renamed (was Summer Roller Camps)
- **Adults programme cards** — Sk8 Skool, Synkron8, Skate Jam, Roller Skate Events bullets updated; Sk8 Skool & Roller Disco tag → "All ages (5+)", bullets refreshed
- **Stats bar removed** from Home and Adults pages (inaccurate data)
- All pushed to `main` — Netlify auto-deployed

### Decisions

- Reviews hardcoded in components (not CMS) — Trustpilot blocks scraping; manual copy is cleaner and avoids external scripts
- Worked on `feat/bookings-domain-cutover` branch but committed to `main` — session changes are independent of the bookings cutover work; feature branch left intact

### Next

- EELA homepage restructure: new `/` presenting EELA as a platform (5 programme pillars); current skating home page moves to `/move-well`
- Decide fate of `/about` page once homepage restructure is done
- Team to review `/about` and `/members` nav links
- Activate Kids Space programme cards when individual booking URLs are confirmed
- Phase 2: wire members form to backend, booking integration
- Complete bookings domain cutover (feature branch)

---

## 2026-06-04 — Session 6: Remove stats bar

### Done

- **Stats bar removed** from Home page and Adults page — data was inaccurate; removed cleanly (array + section deleted, not commented out)

### Next

- Team to review `/about` and confirm when to add nav link
- Review `/members` nav link — still held back pending team decision
- Phase 2: wire members form to backend, booking integration
- Activate Kids Space programme cards when individual booking URLs are confirmed

---

## 2026-06-01 — Session 2: Kids Space, EELA rebrand, launch

### Done

- **Visual review** — dev server + Playwright screenshots confirmed Home and Adults pages rendering correctly at 1280px and 375px
- **Kids Space page** (`/kids-space`) — built with hero, pillars strip, single "Explore Kidz Space →" CTA (all booking URLs currently point to same destination so individual programme cards deferred)
- **Kids programme cards preserved** — full 4-card layout (Classes, Roller Disco, Roller Camps, Family Skate) saved in `src/lib/kids-programmes.tsx`; swap in when individual URLs exist
- **ProgrammeCard mobile improvements** — icon moves to top on mobile (flex-col), all content centred, Book CTA moves below bullets (centred, wider); desktop layout unchanged; bullet list uses `w-fit mx-auto` so tick marks align consistently
- **Platform renamed to EELA** — site title, template, and description updated; project folder renamed `Empowr EELA`; domain confirmed as `eela.empowrcic.org`
- **GitHub** — private repo created at `Pecuvate/empowr-eela`, all commits pushed
- **Netlify deploy** — live at `empowr-eela.netlify.app`; custom domain `eela.empowrcic.org` attached; Route53 CNAME created; auto-deploy on push to `main`

### Decisions

- Kids Space uses single CTA now, not programme cards — avoids showing 4 buttons that all go to the same URL
- Programme card data kept in `src/lib/kids-programmes.tsx` so the full layout requires zero reconstruction when URLs are ready
- EELA chosen as platform name — the parent programme that encompasses all Empowr sessions; broad enough to hold future membership and non-skating programmes

### Next

- Phase 2 scoping: free membership sign-up flow, session browsing with availability, booking integration
- Activate Kids Space programme cards when individual booking URLs are confirmed

---

## 2026-06-01 — Session 3: Members Coming Soon page

### Done

- **Members page** (`/members`) — Coming Soon page with hero, "Join the waitlist" email form (client component, fake success state — no backend), and 4 perk cards (Free session access, Workshops & events, Easy booking, Community membership)
- **Navbar** — Members added as a filled blue pill button (stands out as CTA; Kids Space and Adults remain plain text links)
- **Verified** — desktop (1280px) and mobile (375px) screenshots confirm clean layout on both breakpoints

### Decisions

- Form shows in-page success state on submit (`You're on the list!`) with no network call — ready to wire up when membership backend is built
- Members link styled as a filled pill to act as a conversion point in the nav across all pages

### Next

- Phase 2: wire form to a real backend (Supabase or Resend) when membership is ready to launch
- Activate Kids Space programme cards when individual booking URLs are confirmed

---

## 2026-06-03 — Session 5: About page + footer description

### Done

- **Footer description** updated to approved copy: "Promoting lifelong well-being through the transformative power of experiential learning."
- **About page** (`/about`) — built using Empowr CIC Obsidian KB (EELA entity + programmes source); contains hero, core values strip, EELA framework intro, 5 sub-programme cards (MoveWell active, 4 coming soon), and Empowr CIC link at the bottom
- **About nav link** held back — page accessible by URL only (`/about`) for team review; same pattern as `/members`
- **Pushed to main** — Netlify auto-deployed

### Decisions

- About page scoped to EELA only — not a full Empowr CIC brand page; Empowr referenced only as a one-line footer link
- Programme card descriptions outcome-focused only — activity examples (e.g. "skating, dance, yoga") removed; descriptions kept
- Science/neuroplasticity section removed — too heavy for this page; values strip covers the principles lightly
- Nav link withheld until team reviews the page at `/about`

### Next

- Team to review `/about` and confirm when to add nav link
- Review `/members` nav link — still held back pending team decision
- Phase 2 planning: wire members form to backend (Supabase or Resend), booking integration
- Activate Kids Space programme cards when individual booking URLs are confirmed

---

## 2026-06-02 — Session 4: Lewisham copy audit

### Done

- **Removed Lewisham-only references** across all pages — hero badge (`Empowr CIC — Lewisham` → `Empowr CIC`), metadata descriptions on Home, Adults, Kids Space pages, and community perk on Members page
- **Members page** — community perk now reads "across the UK" rather than "in Lewisham"; reassurance line updated to "Membership is always free"
- **Members nav link** removed — page accessible by URL only (`/members`) while team reviews internally; nav link to be reinstated when ready to launch

### Decisions

- Lewisham logos (council, Young Mayor) retained in Trusted By strip — alt text is factually accurate and they remain genuine trust marks; they don't imply Lewisham exclusivity in context
- Members nav link held back intentionally — not a bug, revisit when copy and launch plan are confirmed
