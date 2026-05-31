# Architecture — System Design & Tech Decisions

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | Dynamic features (members, booking) planned for Phase 2 |
| Language | TypeScript (strict) | Workspace standard |
| Styling | Tailwind CSS v4 + shadcn/ui | Workspace standard for new Empowr CIC projects |
| Deployment | Netlify | Workspace standard |
| CMS | None (Phase 1) | Content is hardcoded; CMS to be decided when Phase 2 is scoped |
| Auth | None (Phase 1) | Members section is Phase 2 |
| Booking | None (Phase 1) | Booking system provider TBD |

## Folder Layout (src/)

```
src/
├── app/
│   ├── layout.tsx          Root layout — shared nav, font, metadata
│   ├── page.tsx            Home page
│   ├── kids-space/
│   │   └── page.tsx        Kids Space page
│   └── adults/
│       └── page.tsx        Adults page
├── components/             Reusable UI — ProgrammeCard, NavBar, etc.
├── lib/
│   ├── links.ts            All external booking URLs — never hardcoded in components
│   └── types.ts            Shared TypeScript interfaces
└── public/                 Static images and assets
```

## Request Lifecycle (Phase 1)

All pages are Server Components — no client-side data fetching for Phase 1.

```
Request → Next.js server → renders page as HTML → Netlify CDN → browser
```

No API routes needed for Phase 1.

## Key Constraints

- All booking URLs must live in `lib/links.ts` — never hardcoded in components
- Server Components by default — add `"use client"` only where interactivity is needed
- Brand tokens registered via `@theme` in `globals.css` — no arbitrary Tailwind values for design system colours
