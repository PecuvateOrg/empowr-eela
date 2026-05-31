# src — Next.js App

This is the Next.js project root. All npm commands (`install`, `dev`, `build`, `lint`) run from here.

## Stack

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui (components installed on demand via `npx shadcn@latest add <component>`)

## App Structure

```
app/
├── layout.tsx          Root layout — font, metadata, shared nav
├── globals.css         Tailwind entry point + @theme brand tokens
├── page.tsx            Home page (/)
├── kids-space/
│   └── page.tsx        Kids Space page (/kids-space)
└── adults/
    └── page.tsx        Adults page (/adults)

components/             Reusable UI components (PascalCase filenames)
lib/
├── links.ts            All external URLs — import LINKS, never hardcode
└── types.ts            Shared TypeScript interfaces
public/                 Static assets (images, icons)
```

## Component Rules

- Server Components by default — add `"use client"` only where interactivity is required
- One component per file
- Do not create a shared component for something used only once
- Programme cards on the adults page: two-column flex layout (icon left, content right)

## Brand Tokens

Register in `app/globals.css` using `@theme`. Source of truth: `F:\Projects\Empowr CIC\brand-identity.md`.

```css
@import "tailwindcss";

@theme {
  /* Primary */
  --color-blue:       #4A70C2;
  --color-blue-dark:  #3558a8;
  --color-blue-light: #7093d4;
  --color-blue-pale:  #eef3fc;
  --color-blue-soft:  rgba(74, 112, 194, 0.10);

  /* Accent */
  --color-red:        #FF6161;
  --color-red-dark:   #e04444;
  --color-red-soft:   rgba(255, 97, 97, 0.09);

  /* Neutrals */
  --color-black:      #1B1B1B;
  --color-mid:        #4a4a4a;
  --color-muted:      #7a7a8a;
  --color-cream:      #f8f7f4;
  --color-warm-white: #fdfcfa;
  --color-card:       #ffffff;
  --color-border:     #e5e1db;

  /* Shadows (as CSS vars, not utilities) */
  --shadow-blue: 0 4px 16px rgba(74, 112, 194, 0.26);
  --shadow-sm:   0 8px 24px rgba(27, 27, 27, 0.07);
  --shadow-md:   0 12px 32px rgba(27, 27, 27, 0.08);
}
```

## Links

All booking URLs and external links live in `lib/links.ts` and are imported as `LINKS`. Never hardcode URLs in components or pages.

## Path Aliases

`@/` maps to `src/` — use for all internal imports (e.g. `import { LINKS } from '@/lib/links'`).
