# EELA — DEVLOG

## 2026-08-04 — sitemap.xml added; robots.txt now declares it

- Added `src/app/sitemap.ts` (6 routes) and restored the `Sitemap:` line in `robots.txt`. Verified live at `eela.empowrcic.org/sitemap.xml` after deploy (`b9b616e`).
- `kids-space` and `adults` are prioritised just below home — they're the two audience entry points and now also the destinations for Main Site's legacy Wix `/service-page/*` redirects, so they carry the inbound discovery traffic.
- **No `force-static` directive needed here.** EELA runs on the Netlify Next runtime, not `output: 'export'` — Main Site's build failed without it, EELA's didn't. Check `next.config` before assuming either way.
- This completes the other half of the 2026-07-30 link audit, which removed the dead `Sitemap:` line rather than build a generator. The line is back, with a real sitemap behind it.
- `CookieConsentBanner.tsx` is still modified and uncommitted in the working tree (in-progress work from another session, first noted 2026-07-30) — left untouched again.

## 2026-07-31 — Roller Disco removed from site copy; branch-deploy previews enabled for feat/chat-widget-embed

- `kids-programmes.tsx`: commented out the "Roller Disco for All Ages" card — session discontinued (team decision, confirmed via the CRM PecuvateCRM session same day). `adults/page.tsx`: renamed the bundled "Sk8 Skool & Roller Disco" card to "Sk8 Skool (All Ages)", dropped disco-flavoured copy; `page.tsx` homepage blurb also dropped the Roller Disco mention. `tsc --noEmit` clean. Committed `d42be5a` to `main`, not yet pushed.
- Netlify site `empowr-eela` had `build_settings.allowed_branches: ["main"]`, which was silently blocking any branch/PR preview (the gap flagged in Session 15). Widened to `["main", "feat/chat-widget-embed"]` via the Netlify API and triggered a real branch build so the team can actually review the still-unmerged chat widget — live at `https://feat-chat-widget-embed--empowr-eela.netlify.app`.
- `CookieConsentBanner.tsx`'s in-progress redesign (belongs to the concurrent chat-widget-embed session, see memory.md) confirmed still untouched — correctly left alone again.
- Next: push `d42be5a` and, once the team approves, `feat/chat-widget-embed` itself to `main`.

---

## 2026-07-30 — PostHog route-change tracking fix (fleet-wide)

- `capture_pageview: true` → `'history_change'` in `PostHogProvider.tsx`. posthog-js gates `HistoryAutocapture` on an exact string match (`isEnabled(){return"history_change"===...}`), so `true` means hard page loads only — client-side `<Link>` navigation produced **no pageview**. All internal navigation on this site has been invisible to analytics; bounce rate and pages/session were artefacts, not behaviour.
- Found during a full review of Empowr Heroes, where 11 autocaptured clicks on the primary CTA showed up against 4 pageviews for the destination page. Same config on every Next.js site here — fixed across Heroes, Main Site, EELA, Members, Landing Page, plus the canonical templates in `_config/guides/posthog-consent.md` (which is where they all inherited it).
- `cookieless_mode: 'on_reject'` unchanged — this is orthogonal to consent.
- Verified: `npx tsc --noEmit` clean.

*(Single-line change; the in-progress `CookieConsentBanner.tsx` edit in this working tree belongs to another session and was deliberately left uncommitted.)*

## 2026-07-29 — Session 16: Cookie banner redesign + live preview via chat-widget branch

### Done

- `CookieConsentBanner.tsx` redesigned from an edge-to-edge bottom bar to a floating rounded card (`rounded-[20px]`, `--shadow-md`, `mdi:cookie-outline` icon badge, pill Accept/Decline buttons) — matches the site's existing design language (`FindSessionBanner`/`ProgrammeCard` patterns). Same consent logic underneath (`localStorage` + `posthog.opt_in_capturing()`/`opt_out_capturing()`), no functional change — `on_reject` cookieless mode still governs whether Accept upgrades a visitor to persistent cross-day identity.
- Verified live in local dev: Accept/Decline correctly dismiss + persist, zero console errors, desktop + mobile checked.
- Also verified on a real Netlify branch-deploy preview, not just local dev: applied the same change on top of `feat/chat-widget-embed` (still unmerged, already allow-listed for branch deploys) rather than standing up a new preview mechanism, pushed (`0180cd4`). Live at `https://feat-chat-widget-embed--empowr-eela.netlify.app` — banner (bottom-left) and chat bubble (bottom-right) render together with no overlap, which incidentally resolves the previously-flagged cosmetic overlap as a side effect of the new layout.
- Compared against Main Site's separate cookie banner this session (see that repo's DEVLOG): Main Site's was dead code under its `cookieless_mode: 'always'` setup and got deleted; EELA's is genuinely functional under `on_reject` and was correctly left in place, just redesigned.

### Decisions

- Banner change intentionally left uncommitted on `main` at the user's request — they're working on EELA in a separate session and will push once the team approves the chat widget, since that session will already have this change once `feat/chat-widget-embed` merges.
- `feat/chat-widget-embed` is now 2 commits behind `main` (missing this session's T4/T5 work, landed after the branch was cut) — needs a rebase before merging, not a fast-forward.

### Next

- Push `feat/chat-widget-embed` to `main` once the team approves — now carries the banner redesign too, rebase first (see above)
- Everything else unchanged from Session 15: homepage restructure, Phase 2 backend wiring, bookings domain cutover

---

## 2026-07-29 - Session 15: Booking-click capture (T4) via posthog.capture on ProgrammeCard + cross-site UTM tagging (T5); PostHog bot detection blocks headless verification of capture() calls

---

## 2026-07-28 — Session 14: Switched PostHog to `cookieless_mode: 'on_reject'` so decliners are counted cookielessly instead of producing zero events; consent banner UI unchanged

---

## 2026-07-20 — Session 13: Roller Quad Camps minimum age corrected to 5+ (reversing Session 12's 8+), page-wide

## 2026-07-14 — Session 12: Roller Quad Camps age standardised to "8+" page-wide (later reversed to "5+" in Session 13); confirmed no live Supabase `mem_offerings` row to sync

---

## 2026-06-29 — Session 11: Members page cleanup — removed broken Wix account notice, restored coming-soon waitlist; team decided against Wix for account management, new platform to be built separately

---

## 2026-06-28 — Session 10: PostHog consent banner (Variant B, since superseded by cookieless `on_reject` mode 2026-07-28) + Navbar active-state fix via `usePathname()`

---

## 2026-06-26 — Session 9: Updated EELA about page sub-programme names to MindWell/CreateWell/ExploreWell/ConnectWell, consistent with Main Site and prospectus

---

## 2026-06-18 — Session 8: Built /roller-quad-camps page with S3 hero image, two booking cards (Empowr Camps direct + HAF Spaces), added rollerQuadCampsHAF link

## 2026-06-13 — Session 7: Built Kids/Adults Trustpilot review carousels, renamed Roller Quad Camps (was Summer Roller Camps), removed inaccurate stats bar

## 2026-06-04 — Session 6: Removed inaccurate stats bar from Home and Adults pages

## 2026-06-01 — Session 2: Built Kids Space page, rebranded platform to EELA, launched to eela.empowrcic.org via Netlify

## 2026-06-01 — Session 3: Built Members Coming Soon page with waitlist form (no backend yet)

## 2026-06-03 — Session 5: Built About page from EELA KB with 5 sub-programme cards, updated footer description

## 2026-06-02 — Session 4: Removed Lewisham-only references sitewide, held back Members nav link pending team review
