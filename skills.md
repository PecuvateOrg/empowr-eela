# Skills

This file catalogs the reusable skills and slash commands available in this project. In context engineering, a skill is a repeatable, composable unit of agent behaviour — a named action Claude can be instructed to perform consistently.

## What belongs here

- **Slash commands** — any `/command` configured for this project, what it does, and when to use it
- **Reusable prompts** — named instruction patterns that get reused across sessions
- **Automation triggers** — any hooks or scheduled tasks wired to this project
- **Usage notes** — any gotchas, prerequisites, or ordering constraints

## Why this matters

Skills prevent re-explaining the same task every session. Documenting them here means the capability is discoverable, reusable, and improvable over time.

---

## Available Skills

| Skill | When to use |
|---|---|
| `/netlify-deploy` | Deploy to Netlify and configure `eela.empowrcic.org` |
| `/netlify-supabase-check` | Pre-deploy integration audit (when Supabase is added in Phase 2) |
| `/webapp-testing` | Test UI with Playwright — use after any frontend change |
| `/pre-deploy-security` | Run before any deploy — FAILs block the deploy |
