import { SITE_PAGES } from './site-index';
import type { Offering } from './offerings';
import type { LiveSession } from './live-sessions';

// Which EELA page describes each KB offering. Slugs and routes differ on
// purpose (beginners-foundation → /beginners-foundations, roller-quad-camp →
// /roller-quad-camps), so this is an explicit map, never derived from names.
export const OFFERING_PAGES: Record<string, string[]> = {
  'skate-jam': ['/adults/skate-jam'],
  'sk8-skool-kidz': ['/kids-space/sk8-skool/kidz'],
  'sk8-skool-all-ages': ['/kids-space/sk8-skool/all-ages', '/adults/sk8-skool/all-ages'],
  synkron8: ['/adults/sk8-skool/synkron8'],
  'beginners-foundation': ['/adults/sk8-skool/beginners-foundations'],
  'roller-quad-camp': ['/roller-quad-camps'],
};

// KB offerings with no EELA page yet (open since 2026-09-02). Listing one here
// is a deliberate choice; an offering in neither list fails the build.
export const OFFERINGS_WITHOUT_PAGE = [
  'prep-to-street-skate',
  'beginner-street-skate',
  'all-ages-roller-disco',
  'roller-skate-events',
];

// Throws on drift in either direction: a feed offering nobody placed, a
// mapped page that doesn't exist, or a mapped offering missing from the feed
// (a 200 with rows dropped would otherwise blank a page's facts silently).
export function checkOfferingPages(offerings: Offering[]): void {
  const pages = new Set(SITE_PAGES.map((p) => p.path));
  const inFeed = new Set(offerings.map((o) => o.offering));
  const problems: string[] = [];
  for (const slug of inFeed) {
    if (!OFFERING_PAGES[slug] && !OFFERINGS_WITHOUT_PAGE.includes(slug)) {
      problems.push(`offering "${slug}" has no EELA page and is not in OFFERINGS_WITHOUT_PAGE`);
    }
  }
  for (const [slug, paths] of Object.entries(OFFERING_PAGES)) {
    if (!inFeed.has(slug)) problems.push(`offering "${slug}" is mapped but missing from the feed`);
    for (const p of paths) if (!pages.has(p)) problems.push(`"${slug}" maps to ${p}, which is not a page`);
  }
  if (problems.length) throw new Error(`offering → page map:\n- ${problems.join('\n- ')}`);
}

// KB facts and Members live state join by slug and should agree on price.
// Drift WARNS, never fails (owner 2026-10-06): activating a Members offering
// before its KB row exists must not block an EELA deploy. The KB owns price
// and is updated first, so a price mismatch means Members is out of date.
// "Live with no upcoming dates" is NOT drift (Skate Jam off-season, camps
// between holidays). Returns the warnings so callers and tests can see them.
export function checkLiveJoin(kb: Offering[], live: LiveSession[]): string[] {
  const inMembers = new Set(live.map((l) => l.slug));
  const problems: string[] = [];
  for (const slug of inMembers) {
    if (!kb.some((o) => o.offering === slug)) problems.push(`Members offering "${slug}" is not in the KB`);
  }
  for (const o of kb) {
    const offPlatform = o.status === 'Off-platform';
    if (!offPlatform && !inMembers.has(o.offering)) problems.push(`KB offering "${o.offering}" is not active in Members`);
    if (offPlatform && inMembers.has(o.offering)) problems.push(`KB says "${o.offering}" is off-platform but Members sells it`);
  }
  const prices: [string, keyof Offering, keyof LiveSession][] = [
    ['online', 'onlinePence', 'price_pence'],
    ['door', 'doorPence', 'walk_in_price_pence'],
    ['early bird', 'earlyBirdPence', 'early_bird_price_pence'],
  ];
  for (const l of live) {
    for (const [label, kbKey, liveKey] of prices) {
      const kbValues = new Set(kb.filter((o) => o.offering === l.slug).map((o) => o[kbKey]));
      if (kbValues.size && !kbValues.has(l[liveKey] as never)) {
        problems.push(`"${l.slug}" ${label} price: KB ${[...kbValues].join('/')} vs Members ${l[liveKey]} (pence) — update Members`);
      }
    }
  }
  if (problems.length) console.warn(`KB ↔ Members drift (warning only):\n- ${problems.join('\n- ')}`);
  return problems;
}
