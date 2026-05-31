# Ops — Deployment & Infrastructure

## Netlify Configuration

- **Platform:** Netlify
- **Branch:** main
- **Base directory:** `src/` — all build commands and publish paths are relative to this
- **Build command:** `npm run build`
- **Publish directory:** `.next` (SSR) — update to `out` if switching to static export
- **Node version:** 20

`netlify.toml` lives at the project root (`Empowr Sessions/netlify.toml`) — not inside `src/`.

## Environment Variables

Manage in Netlify UI under Site → Environment variables. Mirror all keys in `src/.env.example`.

| Variable | Used for | Required |
|---|---|---|
| _(none for Phase 1)_ | — | — |

Add variables here as integrations are added (auth, booking system, etc.).

## Build Notes

- Run all npm commands from `src/` — not the project root
- `npm run dev` → local dev at `localhost:3000`
- `npm run build` → production build
- `npm run lint` → TypeScript + ESLint check

## Deploy Process

1. Confirm all env vars in Netlify UI match `src/.env.example`
2. Push to `main` → Netlify auto-deploys
3. Check deploy log in Netlify dashboard for build errors
4. Run `/netlify-deploy` skill only if wiring a custom domain for the first time

## Security Headers

Add to `netlify.toml` before going live:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```
