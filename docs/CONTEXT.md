# EELA — Docs Index

This directory contains technical documentation for the Empowr EELA platform. Read these files when picking up this project cold — they give a full picture without having to read all source files.

---

## Files

| File | What it covers |
|---|---|
| [tech-stack.md](./tech-stack.md) | Dependencies, framework, design system, folder structure, naming conventions |
| [system-flow.md](./system-flow.md) | End-to-end request lifecycle, data flow, external integrations, deployment pipeline |
| [session-detail-page-template.md](./session-detail-page-template.md) | Canonical layout for a session/offering detail page (Skate Jam is the reference implementation) — read before building the next one |

---

## What Is EELA?

**EELA** is Empowr CIC's unified session discovery and membership platform for roller skating programmes. It serves as the primary public-facing destination for all Empowr age groups, replacing scattered programme pages with a single branded hub.

- **Live URL:** [eela.empowrcic.org](https://eela.empowrcic.org)
- **Stack:** Next.js 15 + TypeScript + Tailwind CSS 4
- **Hosting:** Netlify (auto-deploy on push to `main`)
- **Repo:** `PecuvateOrg/empowr-eela` (GitHub, public)

---

## Pages

| Route | Purpose | Nav visibility |
|---|---|---|
| `/` | Platform overview — programme pathways, trusted-by strip, quiz CTA | Public |
| `/adults` | Adults hub — 5 programme cards, Trustpilot reviews | Public |
| `/kids-space` | Kids & family hub — 5 session cards, Trustpilot reviews | Public |
| `/members` | Coming Soon — email waitlist, membership perks preview | Hidden (internal review) |
| `/about` | About EELA framework — core values, sub-programmes | Hidden (internal review) |

---

## Phases

| Phase | Status | Scope |
|---|---|---|
| Phase 1 | Complete (deployed June 2026) | Static pages, navigation, booking links to Wix |
| Phase 2 | Not started | Members auth, session booking system, CMS integration, native quiz |

---

## Key Relationships

- All session **booking** links out to Empowr's Wix site (`empowrcic.wixsite.com`)
- **Session finder quiz** links to `start.empowrcic.org/quiz` (external)
- **Waivers** link to `waiver.empowrcic.org`
- **Main Empowr site** at `empowrcic.org`

---

## Planning & Ops

| Location | Contains |
|---|---|
| `planning/spec/CONTEXT.md` | MVP scope, acceptance criteria per page |
| `planning/architecture/CONTEXT.md` | Architecture decisions, folder layout, request lifecycle |
| `planning/decisions/CONTEXT.md` | ADR log (Next.js over Astro — 2026-05-31) |
| `ops/CONTEXT.md` | Netlify config, build notes, env vars, security headers |
