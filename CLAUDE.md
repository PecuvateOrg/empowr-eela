# EELA by Empowr

> **This repository is PUBLIC** (`PecuvateOrg/empowr-eela`).
>
> **Devlog and memory location:** `../workspace-docs/empowr-eela/`
>
> `DEVLOG.md` and `memory.md` are not kept in this repo — write session entries to the path
> above instead. See `NON-NEGOTIABLES.md` for what must never be committed here.

## Identity
Empowr CIC's central session discovery and membership platform — home, kids, and adults programmes, with members and booking features planned.

## Self-Reference
This file is Layer 0 — routing only. Read `NON-NEGOTIABLES.md` before doing anything; project
detail lives in workspace CONTEXT.md files.

---

## Routing

| Task | Go to | Read first | Skills |
|---|---|---|---|
| Feature spec, MVP scope, acceptance criteria | `planning/spec/` | `planning/CONTEXT.md` → `planning/spec/CONTEXT.md` | — |
| Architecture, system design, tech decisions | `planning/architecture/` | `planning/CONTEXT.md` → `planning/architecture/CONTEXT.md` | — |
| Decision records | `planning/decisions/` | `planning/decisions/CONTEXT.md` | — |
| Pages, components, app code | `src/` | `src/CONTEXT.md` | webapp-testing |
| Deployment, env vars, build config | `ops/` | `ops/CONTEXT.md` | netlify-deploy |

---

## Cross-Workspace Flows

- **New page:** spec in `planning/spec/` → build in `src/` → verify in `ops/`
- **New feature with tech decision:** log ADR in `planning/decisions/` → architecture note in `planning/architecture/` → build in `src/`
- **Deploy:** confirm env vars in `ops/` → run build from `src/` → push to trigger Netlify

---

## File Placement

- New pages → `src/app/<route>/page.tsx`
- Reusable UI → `src/components/`
- Utilities, constants, shared types → `src/lib/`
- Static assets → `src/public/`
- Netlify functions → `src/netlify/functions/`

---

## Token Management

- Do not load `planning/architecture/CONTEXT.md` unless the task involves a system design decision
- Do not load `planning/decisions/CONTEXT.md` unless logging or reviewing an ADR
- Do not load `ops/CONTEXT.md` unless the task involves deployment or environment variables
- Do not read `src/` files in bulk — read only the file relevant to the current task

---

## Deployment

- Platform: Netlify
- Domain: eela.empowrcic.org
- Branch: main
- Base directory: src/

---

## Skills and Tools Available

| Tool / Skill | Trigger | Purpose |
|---|---|---|
| `/netlify-deploy` | deploying to Netlify | Deploy to Netlify and configure `eela.empowrcic.org` |
| `/netlify-supabase-check` | before go-live, once Supabase is added (Phase 2) | Audit Netlify + Supabase integration failure points |
| `/pre-build-check` | before any deploy | Validate build structure and frontend quality |
| `/pre-deploy-security` | before any deploy | Security hygiene scan — FAILs block the deploy |
| `/webapp-testing` | after frontend changes | Playwright browser preview and screenshot capture |
| `/simplify` | after a feature is built | Review changed code for reuse, quality, and efficiency |
