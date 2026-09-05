# EELA by Empowr — Context

Read this after `CLAUDE.md` to orient within the project.

---

## What This Is

EELA by Empowr is Empowr CIC's session discovery and membership platform — the central hub for home education programmes across kids, adults, and family audiences.

**Status:** Live on Netlify
**Domain:** `eela.empowrcic.org`

---

## Architecture

```
src/                            Next.js app root (package.json, tsconfig.json here)
  app/
    layout.tsx                  Root layout — font, metadata, nav
    globals.css                 Tailwind entry point + @theme brand tokens
    page.tsx                    Home page (/)
    kids-space/page.tsx         Kids Space page (/kids-space)
    adults/page.tsx             Adults page (/adults)
  components/                   Reusable UI (PascalCase filenames)
  lib/
    links.ts                    All external URLs — import LINKS, never hardcode
    types.ts                    Shared TypeScript interfaces
  public/                       Static assets

planning/
  spec/                         Feature specs and MVP scope
  architecture/                 System design and tech decisions
  decisions/                    ADRs (YYYY-MM-DD-decision-title.md)

ops/                            Deployment config and scripts

CLAUDE.md                       Project rules
CONTEXT.md                      This file
agents.md                       Agent roles and boundaries
skills.md                       Available skills and slash commands
```

---

## Key Files

| File | Purpose |
|---|---|
| `src/lib/links.ts` | ALL external URLs — never hardcode in components |
| `src/app/globals.css` | Brand tokens (`@theme`) and base styles |
| `src/app/layout.tsx` | Root layout — nav and footer |
| `../workspace-docs/empowr-eela/DEVLOG.md` | Session decisions and in-progress state — in the private hub, not this repo |

---

## Related Projects

| Project | Location | Relation |
|---|---|---|
| Empowr Main Site | `../Empowr Main Site/` | Main CIC website — links to EELA sessions |
| Empowr Dashboard | `../Empowr Dashboard/` | Internal staff dashboard |
| Empowr Heroes | `../empowr-heroes-nextjs/` | Donation platform |
