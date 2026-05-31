# Memory — Empowr Sessions

## Current Phase

Initial setup complete. MWP scaffold generated 2026-05-31.

## Status

- [x] Project scaffold created
- [x] CLAUDE.md, planning/, ops/, src/ structure in place
- [ ] Next.js app installed (`cd src && npm install`)
- [ ] Pages built: Home, Kids Space, Adults
- [ ] Adults page content ported from `Empowr Landing Page/feat/adults-page` branch
- [ ] Domain confirmed and wired
- [ ] Deployed to Netlify

## Key Decisions

- Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4
- No CMS for initial build — content hardcoded in pages
- Domain: TBD — placeholder in CLAUDE.md Deployment section
- Project name "Empowr Sessions" is provisional — can be renamed before deploy

## Source Material

- Adults page content: `F:\Projects\Empowr CIC\Empowr Landing Page\` on branch `feat/adults-page`
  - `src/pages/adults.astro` — all 5 programme cards, icons, copy
  - `src/data/links.ts` — booking URLs (sk8Skool, synkron8, skateJam, allAges, rollerSkateEvents)
- Kids page content: port from `Empowr Landing Page/src/pages/index.astro` (Kidz Space section)

## Pre-Close Checklist

- Update this file before ending any session
- Log any new decisions in `planning/decisions/`
- Commit all changes before closing
