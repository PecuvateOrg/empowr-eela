# Session Detail Page — Template

Canonical layout for an individual session/offering page (Skate Jam, and every future page built the same way: remaining Adults sessions, and each Private/Seasonal Bookings offering). Read this before building a new one instead of re-deriving the pattern from scratch.

**Reference implementation (canonical, fullest instance):** [`src/app/adults/skate-jam/page.tsx`](../src/app/adults/skate-jam/page.tsx)
**Earlier, simpler ancestor** (hero + pillars + booking cards only, no chips/schedule-banner/reviews/FAQ): [`src/app/roller-quad-camps/page.tsx`](../src/app/roller-quad-camps/page.tsx)

Skate Jam is the one to copy from going forward — it's the superset. Roller Quad Camps predates the reviews/FAQ additions and is kept as-is, not retrofitted.

---

## Multi-offering hubs (e.g. Private Bookings)

Some entry points aren't a single session — they're a small family of distinct offerings (Private Bookings: 1:1 coaching, group coaching, birthday parties, custom events). Established pattern for these, decided 2026-08-17:

- **One landing page** (Roller Quad Camps-style: hero + description + a "choose your booking" row of bubble/chip cards, one per offering) at the hub's own route, e.g. `src/app/private-bookings/page.tsx`.
- **Each offering gets its own detail page**, one folder level down (e.g. `src/app/private-bookings/birthday-party/page.tsx`), built on this same session-detail-page template — not stacked as sections on the landing page. Offerings like the birthday party have too much unique content (safety info, what-to-bring, step-by-step booking) to share a page cleanly.
- The landing page's bubble/chip cards link out to each detail page rather than scrolling to an in-page anchor.
- An entry **card** pointing at the hub (e.g. `ProgrammeCard` with the "Tailored to you (5+/15+)" copy) can appear on more than one parent listing page (Private Bookings appears on both `/adults` and `/kids-space`) — same target route both times.

---

## Section order

1. **Breadcrumb** — `← <Parent section>` (e.g. `← Adults`), links to the parent listing page.
   ```tsx
   <Link href="/adults" className="inline-flex items-center gap-1.5 text-sm font-[700] text-blue no-underline mb-6 hover:opacity-80 transition-opacity">
     ← Adults
   </Link>
   ```

2. **Hero** — eyebrow (red, uppercase, tracked) + H1 (`font-[900]`, `clamp(2rem, 5vw, 3rem)`) + description paragraph (`text-mid`).
   - Roller Quad Camps additionally splits this into a 2-col grid with a hero image + age-badge overlay (`sm:grid-cols-2`). Skate Jam runs full-width with no image — use an image only if one exists for the offering; don't block on sourcing one.

3. **Schedule banner OR pillars strip** — pick one based on what the offering needs:
   - **Schedule banner** (Skate Jam) — for a session with one fixed recurring day/time. Rounded `bg-blue-dark` panel, subtle diagonal-stripe texture (`repeating-linear-gradient`), clock icon, day + time in white.
   - **Pillars strip** (Roller Quad Camps, Adults listing) — for a trust-signal row instead of a fixed schedule (camps, listings with varying dates). Three-icon row on `bg-blue-pale/60` band.

4. **Info chips row** (optional — Skate Jam only so far) — pill badges for quick facts (date range, time, level), plus one highlighted `bg-red` pill for the standout fact (e.g. "Every Thursday").

5. **Booking options** — 2-card grid, always this shape regardless of what the two options are (Pay As You Go vs Membership, Standard vs HAF-funded, etc.):
   - Card A: neutral (`bg-card border border-border`, `--shadow-sm`)
   - Card B: highlighted (`bg-blue`, `--shadow-blue`), white CTA button
   - Both: icon, title, price/value line, one-sentence description, pill CTA button

6. **Reviews carousel** — reuse [`ReviewsCarousel.tsx`](../src/components/ReviewsCarousel.tsx) (shared UI) with a thin per-page wrapper supplying its own `Review[]` data (see `SkateJamReviewsCarousel.tsx`). **Reviews must be genuine, verbatim, attributed Trustpilot quotes relevant to that specific offering — never fabricated or paraphrased.** If no offering-specific reviews exist yet, either omit this section or reuse the general `AdultsReviewsCarousel` — don't invent quotes to fill the slot.

7. **FAQ accordion** — same two-part shape as the content Empowr supplies: `### Frequently Asked Questions` then `### Plan Your Route` (or equivalent practical info). Content source of truth is the KB — see below.

   Shared components (extracted 2026-08-17, Synkron8 was the second instance): [`FaqAccordion.tsx`](../src/components/FaqAccordion.tsx) (props: `items: {question, answer}[]`, defined per-page as a local `const faqs` array) and [`RouteInfo.tsx`](../src/components/RouteInfo.tsx) (props: `venueName, address, ways, note`). All three Honor Oak sessions (Skate Jam, Synkron8, Beginners Foundations) share one `HONOR_OAK_ROUTE` data object in [`lib/route-data.tsx`](../src/lib/route-data.tsx) — spread it in rather than retyping the venue/travel text per page.

---

## Content checklist before building a new instance

- Session/offering name, age range, one-line description
- Day/time (if fixed) or "varies" framing
- Price(s) for each booking option
- Venue + FAQ + travel directions — **pull from the KB**, don't re-key it: `F:\Projects\vaults\EMPOWR CIC\entities\session-faqs.md` (per-session) or `entities/private-bookings.md` (Private/Seasonal Bookings offerings) is the source of truth once populated. `entities/sessions.md` is authoritative for price/day/venue — check it before hardcoding a figure.
- Genuine Trustpilot reviews mentioning that offering by name, if any exist (see rule in step 6 above)

## Conventions

- Route: kebab-case nested folder under the parent section, e.g. `src/app/adults/<slug>/page.tsx`
- Components: PascalCase, `src/components/`
- External URLs: always via `@/lib/links` (`LINKS.x`), never hardcoded inline
- Brand tokens (colour/shadow/font): see [tech-stack.md](./tech-stack.md) — don't introduce new colours or shadow values
