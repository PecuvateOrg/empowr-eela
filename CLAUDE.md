<!-- Generated from AGENTS.md by _config/scripts/sync-claude-md.py. Edit AGENTS.md, not this file. -->
# EELA by Empowr

> **This repository is PUBLIC** (`PecuvateOrg/empowr-eela`).
>
> **Devlog and memory location:** `../workspace-docs/empowr-eela/`
>
> `DEVLOG.md` and `memory.md` are not kept in this repo — write session entries to the path
> above instead. See `NON-NEGOTIABLES.md` for what must never be committed here.

<!-- NON-NEGOTIABLES.md, inlined -->
# EELA by Empowr — Non-Negotiables

Forced open by `CLAUDE.md`'s Self-Reference line — read before doing anything else in this
project.

## Rules

- **This repository is PUBLIC** (`PecuvateOrg/empowr-eela`). Never create `DEVLOG.md` or
  `memory.md` in this repo — both filenames are gitignored here, so a copy created in this
  directory is silently never committed. Write session entries to `../workspace-docs/empowr-eela/`
  in the private Empowr CIC hub instead.
- Never put live identifiers, unremediated security findings, or commercial state in any file
  tracked here. See `../CONTEXT.md` and `_config/guides/public-repo-collaboration.md`.

## Naming Conventions

- Components: PascalCase (`HeroSection.tsx`)
- Pages: kebab-case route folders (`app/kids-space/page.tsx`)
- Lib files: kebab-case (`links.ts`, `types.ts`)
- Decision records: `YYYY-MM-DD-decision-title.md`
- CSS classes / brand tokens: kebab-case in `globals.css`
<!-- end NON-NEGOTIABLES.md -->

Other tools: read `NON-NEGOTIABLES.md` first, then `~/projects/NON-NEGOTIABLES.md`.

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
