# EELA by Empowr

> **This repository is PUBLIC** (`PecuvateOrg/empowr-eela`).
>
> **Devlog and memory location:** `../workspace-docs/empowr-eela/`
>
> `DEVLOG.md` and `memory.md` are not kept in this repo — write session entries to the path
> above instead. See `NON-NEGOTIABLES.md` for what must never be committed here.

Read `NON-NEGOTIABLES.md` before doing anything.

## Routing

| Task | Go to | Read first | Skills |
|---|---|---|---|
| **Design: look, colours, components** | `design-system/` | `design-system/MASTER.md` (then the Empowr brand kit it names) | — |
| Feature spec, MVP scope, acceptance criteria | `planning/spec/` | `planning/CONTEXT.md` → `planning/spec/CONTEXT.md` | — |
| Architecture, system design, tech decisions | `planning/architecture/` | `planning/CONTEXT.md` → `planning/architecture/CONTEXT.md` | — |
| Decision records | `planning/decisions/` | `planning/decisions/CONTEXT.md` | — |
| Pages, components, app code | `src/` | `src/CONTEXT.md` | webapp-testing |
| Deployment, env vars, build config | `ops/` | `ops/CONTEXT.md` | netlify-deploy |

## Cross-Workspace Flows

- **New page:** spec in `planning/spec/` → build in `src/` → verify in `ops/`
- **New feature with tech decision:** log ADR in `planning/decisions/` → architecture note in `planning/architecture/` → build in `src/`
- **Deploy:** confirm env vars in `ops/` → run build from `src/` → push to trigger Netlify

## File Placement

- New pages → `src/app/<route>/page.tsx`
- Reusable UI → `src/components/`
- Utilities, constants, shared types → `src/lib/`
- Static assets → `src/public/`
- Netlify functions → `src/netlify/functions/`

## Deployment

- Platform: Netlify
- Domain: eela.empowrcic.org
- Branch: main
- Base directory: src/
