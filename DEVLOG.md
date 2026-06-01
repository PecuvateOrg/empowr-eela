# EELA — DEVLOG

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
