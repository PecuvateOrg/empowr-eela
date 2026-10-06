import { LINKS } from './links';

// Live state for every active Members offering (GET /api/public/live-sessions).
//
// Like lib/offerings.ts, every failure THROWS: at build the build fails, at
// revalidation Next keeps the last good page. Members returns 503 rather than
// a partial list, so a 200 here is the whole active catalogue.

// Dates change as Members schedules them; refresh hourly. Pages that render
// this must export the same literal (`export const revalidate = 3600`).
export const LIVE_REVALIDATE = 3600;

export interface LiveDate {
  starts_at: string;
  ends_at: string | null;
  label: string | null;
  venue: string | null;
  places_left: number | null;
  bookable: boolean;
  book_url: string;
}

export interface LiveSession {
  slug: string;
  title: string;
  bookable: boolean;
  session_url: string;
  price_pence: number | null;
  walk_in_price_pence: number | null;
  early_bird_price_pence: number | null;
  dates: LiveDate[];
}

function check(row: unknown, i: number): LiveSession {
  const o = row as Record<string, unknown>;
  const fail = (why: string) => {
    throw new Error(`live-sessions row ${i} (${String(o?.slug)}): ${why}`);
  };
  if (typeof o.slug !== 'string' || !o.slug) fail('missing slug');
  if (typeof o.bookable !== 'boolean') fail('bad bookable');
  if (!Array.isArray(o.dates)) fail('bad dates');
  for (const d of o.dates as Record<string, unknown>[]) {
    if (typeof d.starts_at !== 'string' || Number.isNaN(Date.parse(d.starts_at))) fail('bad starts_at');
    if (typeof d.book_url !== 'string' || !d.book_url.startsWith('https://')) fail('bad book_url');
  }
  return o as unknown as LiveSession;
}

export async function getLiveSessions(): Promise<LiveSession[]> {
  const res = await fetch(LINKS.liveSessions, { next: { revalidate: LIVE_REVALIDATE } });
  if (!res.ok) throw new Error(`live-sessions: HTTP ${res.status}`);
  const body = await res.json();
  if (!Array.isArray(body?.offerings) || body.offerings.length === 0) {
    throw new Error('live-sessions: no offerings');
  }
  return body.offerings.map(check);
}
