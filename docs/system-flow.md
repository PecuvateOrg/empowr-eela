# EELA — System Flow

## Request Lifecycle (Phase 1)

```
Browser request
    │
    ▼
Netlify CDN
    │  (CNAME: eela.empowrcic.org → empowr-eela.netlify.app)
    ▼
@netlify/plugin-nextjs
    │  (Next.js SSR adapter — handles App Router routing)
    ▼
Next.js App Router
    │  matches route → renders page component
    ▼
Page component (server component by default)
    │  reads from: lib/links.ts, lib/types.ts, lib/kids-programmes.tsx
    │  renders: Navbar + page sections + Footer
    ▼
HTML response to browser
    │
    ▼
Tailwind CSS styles applied client-side
    │
    ▼
Client interactivity (minimal):
    ├── Carousel scroll (useRef + scrollBy)
    └── Waitlist form (useState — no backend call yet)
```

No database, no API calls, no authentication in Phase 1.

---

## Data Flow

### Programme Content
```
lib/kids-programmes.tsx    →    kids-space/page.tsx
lib/links.ts               →    ProgrammeCard.tsx (CTA button hrefs)
                           →    adults/page.tsx
                           →    Navbar.tsx
                           →    Footer.tsx
```
All programme data is hardcoded. A content change requires a code edit + redeploy.

### External Booking Flow
```
User clicks "Book" on a ProgrammeCard
    │
    ▼
Opens new tab → Wix booking page (empowrcic.wixsite.com/empowrcic/...)
    │
    ▼
User completes booking on Wix
```
EELA has no visibility into booking completions. No webhook, no callback.

### Session Finder Flow
```
User clicks "Find my session" / quiz CTA
    │
    ▼
Redirects to start.empowrcic.org/quiz (external — Empowr Landing Page project)
```

### Members Waitlist Flow (Phase 1 — no backend)
```
User enters email → clicks "Join the waitlist"
    │
    ▼
useState updates → success message shown inline
    │
    ▼
Email is NOT stored anywhere (Phase 1 stub)
```

---

## External Services

| Service | How EELA connects | Direction |
|---|---|---|
| **Wix Booking** | Static links in `lib/links.ts` — user navigates away | Outbound |
| **Trustpilot** | Hardcoded review text in carousel components + outbound link | Outbound |
| **start.empowrcic.org** | Static link to `/quiz` (Empowr Landing Page project) | Outbound |
| **WhatsApp Community** | Static link in Footer / lib/links.ts | Outbound |
| **waiver.empowrcic.org** | Static link in Footer | Outbound |
| **empowrcic.org** | Static link in Footer | Outbound |
| **hero.empowrcic.org** | Static link in Footer | Outbound |
| **Netlify** | Hosting — receives git push, runs build, serves site | Infrastructure |
| **GitHub (Pecuvate/empowr-eela)** | Source of truth — Netlify pulls on push to main | Infrastructure |

No inbound webhooks, no API keys, no third-party SDK calls in Phase 1.

---

## Deployment Pipeline

```
Local change
    │
    git push origin main
    │
    ▼
GitHub (Pecuvate/empowr-eela)
    │  triggers Netlify deploy hook
    ▼
Netlify build runner
    │  cd src/ && npm run build
    │  (@netlify/plugin-nextjs wraps .next output)
    ▼
Deploy to Netlify CDN
    │
    ▼
Live at eela.empowrcic.org
    (Route53 CNAME → empowr-eela.netlify.app)
```

Build time: ~60–90 seconds (no external data fetching at build time).

### Branch Strategy
- `main` — production, auto-deploy enabled
- Feature branches (e.g. `feat/bookings-domain-cutover`) — no auto-deploy; merge to main to go live

---

## Asset Pipeline

```
src/public/assets/          Static images served directly by Netlify CDN
    │
    ▼
next/image component        Optimizes + resizes at request time
    │  priority flag on hero images (preloaded)
    │  sizes hints for responsive loading
    ▼
Browser
```

Fonts loaded via `next/font/google` — subset, preloaded, swap display.

---

## Phase 2 System Flow (Planned)

When Phase 2 ships, the flow will expand:

```
/members route
    │
    ▼
Auth provider (TBD)         ← User login / registration
    │
    ▼
Session booking system (TBD) ← In-app availability + booking
    │
    ▼
CMS (TBD)                   ← Programme content managed without redeploys
    │
    ▼
Native quiz (/quiz route)   ← Replace external start.empowrcic.org/quiz link
```

Phase 2 will require environment variables for all three integrations above.
