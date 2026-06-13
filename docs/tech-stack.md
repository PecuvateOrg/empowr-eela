# EELA — Tech Stack

## Framework & Language

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | ^15.0.0 |
| Language | TypeScript (strict) | ^5 |
| UI Library | React | ^19.0.0 |
| Node | Node.js | 20 |

Next.js App Router with all pages server-rendered by default. The only client component is `/members/page.tsx` (email waitlist form with `useState`).

---

## Dependencies

### Runtime
| Package | Version | Purpose |
|---|---|---|
| `next` | ^15.0.0 | Framework |
| `react` | ^19.0.0 | UI library |
| `react-dom` | ^19.0.0 | DOM rendering |
| `@iconify/react` | ^6.0.2 | Icon component wrapper |
| `@iconify-json/mdi` | ^1.2.3 | Material Design Icons dataset |

### Dev
| Package | Version | Purpose |
|---|---|---|
| `tailwindcss` | ^4 | Utility CSS framework |
| `@tailwindcss/postcss` | ^4 | Tailwind PostCSS processor |
| `typescript` | ^5 | Type checking |
| `@types/node` | ^20 | Node types |
| `@types/react` | ^19 | React types |
| `@types/react-dom` | ^19 | React DOM types |
| `eslint` | ^9 | Linting |
| `eslint-config-next` | ^15.0.0 | Next.js ESLint rules |

No state management library, no authentication library, no CMS SDK, no database client — Phase 1 is fully static.

---

## Design System

### Fonts
- **Nunito** via `next/font/google` — weights 400, 500, 600, 700, 800, 900 (normal + italic)
- Applied via CSS variable `--font-nunito` on `<body>`

### Colour Palette (`globals.css` @theme)
| Token | Hex | Use |
|---|---|---|
| `--color-blue` | `#4A70C2` | Primary brand blue |
| `--color-blue-dark` | `#3558a8` | Hover states, headings |
| `--color-blue-light` | `#7093d4` | Accents |
| `--color-blue-pale` | `#eef3fc` | Section backgrounds |
| `--color-red` | `#FF6161` | Accent / highlight |
| `--color-red-dark` | `#e04444` | Hover on red |
| `--color-black` | `#1B1B1B` | Body text, footer |
| `--color-mid` | `#4a4a4a` | Secondary text |
| `--color-muted` | `#7a7a8a` | Tertiary / captions |
| `--color-cream` | `#f8f7f4` | Page backgrounds |
| `--color-warm-white` | `#fdfcfa` | Card backgrounds |
| `--color-card` | `#ffffff` | Pure white cards |
| `--color-border` | `#e5e1db` | Dividers, borders |

### Shadow Tokens
| Token | Value |
|---|---|
| `--shadow-blue` | `0 4px 16px rgba(74, 112, 194, 0.26)` |
| `--shadow-sm` | `0 8px 24px rgba(27, 27, 27, 0.07)` |
| `--shadow-md` | `0 12px 32px rgba(27, 27, 27, 0.08)` |

### Component Patterns
- **Buttons:** `rounded-full` pill, shadow on focus/hover
- **Cards:** `rounded-[18px]` to `rounded-[20px]`, `--shadow-sm`
- **Responsive typography:** `clamp()` for hero font sizes (fluid, no breakpoint jumps)
- **Hover states:** `hover:opacity-90`, `transition-opacity`

---

## Folder Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout — font, metadata, favicons
│   ├── globals.css             # @theme brand tokens + Tailwind import
│   ├── page.tsx                # / — Home
│   ├── adults/page.tsx         # /adults
│   ├── kids-space/page.tsx     # /kids-space
│   ├── members/page.tsx        # /members (client component)
│   └── about/page.tsx          # /about
├── components/
│   ├── Navbar.tsx              # Sticky nav — logo + Kids/Adults links
│   ├── Footer.tsx              # Black footer — company info, links
│   ├── ProgrammeCard.tsx       # Reusable: tag, title, icon, 3 bullets, CTA button
│   ├── FindSessionBanner.tsx   # Quiz CTA band (reused across pages)
│   ├── AdultsReviewsCarousel.tsx  # Horizontal scroll, 8 hardcoded reviews
│   └── KidsReviewsCarousel.tsx    # Same pattern, kids-focused reviews
├── lib/
│   ├── links.ts                # All external URLs (booking, quiz, community)
│   ├── types.ts                # Shared TypeScript interfaces (Programme)
│   └── kids-programmes.tsx     # Kids programme data array
└── public/
    ├── logo.png
    ├── assets/                 # Page hero images + trust logos (JPEG)
    └── [favicons + site.webmanifest]
```

---

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Components | PascalCase | `ProgrammeCard.tsx` |
| Page routes | kebab-case folder | `kids-space/page.tsx` |
| Lib files | kebab-case | `links.ts`, `types.ts` |
| CSS tokens | kebab-case | `--color-blue-pale` |
| ADRs | `YYYY-MM-DD-title.md` | `2026-05-31-nextjs-over-astro.md` |
| Path alias | `@/*` → `src/` root | `@/components/Navbar` |

---

## Build & Scripts

```bash
npm run dev      # Dev server — localhost:3000 (run from src/)
npm run build    # Production build
npm run lint     # ESLint + TypeScript checks
```

**Important:** All npm commands run from `src/` (Netlify `base = "src"`).

---

## Deployment

| Setting | Value |
|---|---|
| Platform | Netlify |
| Base dir | `src/` |
| Build command | `npm run build` |
| Publish dir | `.next` |
| Plugin | `@netlify/plugin-nextjs` |
| Branch | `main` (auto-deploy) |
| Live domain | `eela.empowrcic.org` |
| Netlify URL | `empowr-eela.netlify.app` |
| Env vars | None required (Phase 1) |

---

## Phase 2 Stack Additions (Planned)

The following will be added when Phase 2 begins — no implementation yet:

- **Auth provider** (TBD) — members login
- **Booking system** (TBD) — in-app session reservation
- **CMS** (TBD) — manage programme content without redeploys
- **Environment variables** — will be added for all integrations above
