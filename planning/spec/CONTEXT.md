# Spec — Product Scope & Acceptance Criteria

## What This Is

Empowr Sessions is Empowr CIC's central platform for all roller skating programmes. It replaces scattered programme pages across external sites with a single, owned destination.

## MVP Scope (Phase 1)

Three pages. No authentication, no booking system, no CMS.

| Page | Route | Description |
|---|---|---|
| Home | `/` | Overview of Empowr Sessions — what it is, who it's for, links to programme pages |
| Kids Space | `/kids-space` | Roller skating for children (5–14). Programmes, session info, booking links |
| Adults | `/adults` | Roller skating for teens and adults (15+). 5 programme cards with booking links |

### Adults Page — Programme Cards

Port directly from `Empowr Landing Page/feat/adults-page` branch (`src/pages/adults.astro`).

| Programme | Tag | Icon | Booking URL |
|---|---|---|---|
| SK8 SKOOL | LEARN (15+) | school | `https://www.empowrcic.org/sk8-skool` |
| SYNKRON8 | DANCE (15+) | music-note | `https://www.empowrcic.org/sk8-skool` |
| SKATE JAM | PRACTISE (15+) | roller-skate | `https://www.empowrcic.org/skate-jam` |
| SK8 SKOOL & ROLLER DISCO | ALL AGES | human-male-female-child | `https://www.empowrcic.org/kidzspace` |
| ROLLER SKATE EVENTS | CONNECT (15+) | calendar-star | `https://www.empowrcic.org/roller-skate-events` |

### Kids Space Page — Source Material

Port the Kidz Space section from `Empowr Landing Page/src/pages/index.astro` (Section 2 children block).

## Future Scope (Phase 2+)

- Members section (registration, login, profile)
- Booking system integration (provider TBD)
- Session schedules and availability
- Admin dashboard for session management

## Acceptance Criteria — Phase 1

- [ ] All 3 pages render correctly at 375px (mobile) and 1280px (desktop)
- [ ] All booking links are external, open in new tab, and point to the correct URLs
- [ ] No broken images or missing assets
- [ ] Passes Netlify build without errors
- [ ] Lighthouse performance score ≥ 90 on mobile
