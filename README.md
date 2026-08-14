# EELA by Empowr

Empowr CIC's session discovery and membership platform — home, kids, and adults roller skating programmes, with members and booking features planned for later phases.

Built with Next.js 15, React 19, Tailwind CSS v4 (`@theme` brand tokens), shadcn/ui. Deployed on Netlify.

---

## Local Development

The Next.js app root is `src/`.

```bash
cd src
npm install
npm run dev
```

Runs on `--hostname 0.0.0.0` so the dev server is reachable from other devices on the LAN.

Build for production:

```bash
npm run build
npm start
```

---

## Environment Variables

None required for the current phase (Phase 1). `src/.env.example` is present but empty of real variables — add entries there as auth, booking, or other integrations are built (Supabase is anticipated for Phase 2; see `/netlify-supabase-check`).

---

## Deployment

| Field | Value |
|---|---|
| Platform | Netlify |
| Netlify site name | `empowr-eela` |
| Custom domain | `eela.empowrcic.org` |
| Branch | `main` |
| Base directory | `src/` |
| Publish directory | `.next` (SSR — `@netlify/plugin-nextjs`) |

Push to `main` — Netlify builds and deploys automatically. Use `/netlify-deploy` for domain/DNS changes.

---

## Related Projects

| Project | Location | Relation |
|---|---|---|
| Empowr Main Site | `../Empowr Main Site/` | Main CIC website — links to EELA sessions |
| Empowr Dashboard | `../Empowr Dashboard/` | Internal staff dashboard |
| Empowr Heroes | `../empowr-heroes-nextjs/` | Donation platform |
| Empowr-Waivers | `../Empowr-Waivers/` | Waiver form used for EELA sessions |
