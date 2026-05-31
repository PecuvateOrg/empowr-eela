# Memory — Empowr Sessions

## Current Phase

Phase 1 build in progress. MWP scaffold and core pages built 2026-05-31.

## Status

- [x] Project scaffold created (MWP structure, planning/, ops/, src/)
- [x] Next.js app installed and running
- [x] Brand tokens correct (from brand-identity.md, not landing page colours)
- [x] Nunito font wired via next/font/google
- [x] All assets copied (logo, favicons, adults-learning, kidz, trust logos)
- [x] lib/links.ts centralised (all booking URLs + quiz URL)
- [x] Navbar component (sticky, cream bg, Kids Space + Adults links)
- [x] ProgrammeCard component (icon: ReactNode — library-agnostic)
- [x] FindSessionBanner component (reusable quiz CTA, links to start.empowrcic.org/quiz)
- [x] Home page built (hero, pathway cards, stats, trusted by, CTA band)
- [x] Adults page built (hero, pillars, 5 programme cards, stats, quiz banner)
- [x] All icons standardised to @iconify/react + MDI throughout
- [x] Programme cards capped at max-w-[660px] on wide screens
- [x] Local git repo initialised on branch main — 4 commits
- [ ] Visual review in browser (npm run dev from src/)
- [ ] Kids Space page built
- [ ] Remote repo created on GitHub and pushed
- [ ] Domain confirmed and wired
- [ ] Deployed to Netlify

## Key Decisions

- Stack: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- Icons: @iconify/react + MDI throughout (consistent with Empowr Landing Page)
- No CMS for Phase 1 — content hardcoded in pages
- ProgrammeCard accepts icon as ReactNode — not tied to any icon library
- FindSessionBanner links to start.empowrcic.org/quiz until native quiz is built
- Programme cards capped at max-w-[660px] for readability on wide screens
- Domain: TBD — placeholder in CLAUDE.md Deployment section
- Project name "Empowr Sessions" is provisional — rename before deploy

## Empowr Landing Page — Branch Status

- Branch feat/adults-page remains open for reference (adults page content source)
- Landing page stays as single-page link-in-bio hub — no internal pages
- The "FIND YOUR SESSION" button on index.astro links externally; update URL once Empowr Sessions is live

## Source Material

- Adults page content: Empowr Landing Page / feat/adults-page
  - src/pages/adults.astro — 5 programme cards, icons, copy
  - src/data/links.ts — booking URLs
- Kids page content: port from Empowr Landing Page / src/pages/index.astro (Kidz Space section)

## Next Session

1. Run npm run dev from src/ and do visual review of Home + Adults pages
2. Build Kids Space page (content from landing page Kidz Space section)
3. Create GitHub remote repo and push
4. Confirm domain

## Pre-Close Checklist

- Update this file before ending any session
- Log any new decisions in planning/decisions/
- Commit all changes before closing
