import { LINKS } from './links';

// Session facts from the Empowr KB, via the CRM offerings feed (LINKS.offeringsFeed).
//
// Every failure THROWS. During a build that fails the build; during a
// revalidation Next keeps serving the last good page. Never fall back to
// hard-coded facts — a silent fallback is how page copy drifted from the KB.

// Re-read about once a day; the KB changes by hand, not by the minute.
export const OFFERINGS_REVALIDATE = 86400;
const FEED_SHAPE = '2';

export const OFFERING_STATUSES = ['Live', 'Dates TBA', 'Off-platform'] as const;
export type OfferingStatus = (typeof OFFERING_STATUSES)[number];

// Owner labels 2026-10-06 (KB "Type" column). schema.org has no lesson, session
// or camp type, so each maps to the closest Event subtype — any Event subtype
// keeps the dates eligible for search results.
export const OFFERING_TYPES = ['Lesson', 'Session', 'Camp', 'Event'] as const;
export type OfferingType = (typeof OFFERING_TYPES)[number];
export const SCHEMA_TYPE: Record<OfferingType, string> = {
  Lesson: 'EducationEvent',
  Session: 'SportsEvent',
  Camp: 'Event',
  Event: 'Event',
};

export interface Offering {
  offering: string;
  slot: string | null;
  day: string;
  time: string;
  venue: string;
  ages: string;
  onlinePence: number | null;
  earlyBirdPence: number | null;
  doorPence: number | null;
  subscriptionMonthlyPence: number | null;
  dropIn: boolean;
  skates: string;
  cancellation: string;
  dates: string;
  status: OfferingStatus;
  type: OfferingType;
}

const STRING_FIELDS = ['offering', 'day', 'time', 'venue', 'ages', 'skates', 'cancellation', 'dates'] as const;
const PENCE_FIELDS = ['onlinePence', 'earlyBirdPence', 'doorPence', 'subscriptionMonthlyPence'] as const;

function check(row: unknown, i: number): Offering {
  const o = row as Record<string, unknown>;
  const fail = (why: string) => {
    throw new Error(`offerings feed row ${i} (${String(o?.offering)}): ${why}`);
  };
  for (const f of STRING_FIELDS) if (typeof o[f] !== 'string' || !o[f]) fail(`missing ${f}`);
  for (const f of PENCE_FIELDS) if (o[f] !== null && !Number.isInteger(o[f])) fail(`bad ${f}`);
  if (o.slot !== null && typeof o.slot !== 'string') fail('bad slot');
  if (typeof o.dropIn !== 'boolean') fail('bad dropIn');
  // An unknown status must never render as bookable — a new KB value needs a
  // decision here first.
  if (!OFFERING_STATUSES.includes(o.status as OfferingStatus)) fail(`unknown status "${String(o.status)}"`);
  // No default: a missing type would publish a guessed label to search engines.
  if (!OFFERING_TYPES.includes(o.type as OfferingType)) fail(`unknown type "${String(o.type)}"`);
  return o as unknown as Offering;
}

export async function getOfferings(): Promise<Offering[]> {
  // FEED_SHAPE is part of the request so Next's data cache (kept for up to a
  // day, and restored between Netlify builds) can't hand back a copy from
  // before a field this file requires. Bump it when check() starts requiring
  // a new field — 2: `type` (2026-10-06).
  const res = await fetch(LINKS.offeringsFeed, {
    headers: { 'X-Feed-Shape': FEED_SHAPE },
    next: { revalidate: OFFERINGS_REVALIDATE },
  });
  if (!res.ok) throw new Error(`offerings feed: HTTP ${res.status}`);
  const body = await res.json();
  if (!Array.isArray(body?.offerings) || body.offerings.length === 0) {
    throw new Error('offerings feed: no offerings');
  }
  return body.offerings.map(check);
}

export const formatPence = (p: number) =>
  `£${(p / 100).toFixed(p % 100 === 0 ? 0 : 2)}`;
