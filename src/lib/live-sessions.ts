import { LINKS } from './links';
import { formatPence } from './offerings';

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
  monthly_price_pence: number | null;
  age_min: number | null;
  age_max: number | null;
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
  if (!Number.isInteger(o.price_pence)) fail('bad price_pence');
  for (const f of ['walk_in_price_pence', 'early_bird_price_pence', 'monthly_price_pence', 'age_min', 'age_max']) {
    if (o[f] !== null && !Number.isInteger(o[f])) fail(`bad ${f}`);
  }
  for (const d of o.dates as Record<string, unknown>[]) {
    if (typeof d.starts_at !== 'string' || Number.isNaN(Date.parse(d.starts_at))) fail('bad starts_at');
    if (typeof d.book_url !== 'string' || !d.book_url.startsWith('https://')) fail('bad book_url');
  }
  return o as unknown as LiveSession;
}

// One fetch per revalidate window, shared by every reader (Next dedupes it).
async function getLiveFeed(): Promise<Record<string, unknown>> {
  const res = await fetch(LINKS.liveSessions, { next: { revalidate: LIVE_REVALIDATE } });
  if (!res.ok) throw new Error(`live-sessions: HTTP ${res.status}`);
  return res.json();
}

export async function getLiveSessions(): Promise<LiveSession[]> {
  const body = await getLiveFeed();
  if (!Array.isArray(body?.offerings) || body.offerings.length === 0) {
    throw new Error('live-sessions: no offerings');
  }
  return body.offerings.map(check);
}

export type PrivateKind = 'birthday' | 'coaching_one' | 'coaching_group';

export interface PrivatePrices {
  price: string; // "£40"
  hire: string | null; // equipment hire add-on, "£5"
  min: number; // minimum skaters
}

// Private booking prices and minimums, from Members (owner 2026-10-29:
// Members owns these too; edited on its Private bookings admin page).
export async function privatePrices(kind: PrivateKind): Promise<PrivatePrices> {
  const body = await getLiveFeed();
  const rows = body?.private_bookings;
  if (!Array.isArray(rows)) throw new Error('live-sessions: no private_bookings');
  const t = rows.find((r) => r?.kind === kind) as Record<string, unknown> | undefined;
  if (!t || !Number.isInteger(t.price_pence) || !Number.isInteger(t.min_places)) {
    throw new Error(`live-sessions: bad private booking ${kind}`);
  }
  if (t.hire_price_pence !== null && !Number.isInteger(t.hire_price_pence)) {
    throw new Error(`live-sessions: bad hire_price_pence on ${kind}`);
  }
  return {
    price: formatPence(t.price_pence as number),
    hire: t.hire_price_pence === null ? null : formatPence(t.hire_price_pence as number),
    min: t.min_places as number,
  };
}

export type BookableDate = { startsAt: string; bookUrl: string; placesLeft: number | null };

// Upcoming, bookable dates of one offering (same filter as SessionJsonLd),
// optionally only one slot's (label prefix, e.g. "Level 1"). Throws if the
// offering is missing, like every other live-sessions failure.
export async function liveDates(slug: string, max: number, labelPrefix?: string): Promise<BookableDate[]> {
  const session = (await getLiveSessions()).find((l) => l.slug === slug);
  if (!session) throw new Error(`liveDates: "${slug}" missing from Members`);
  const now = Date.now();
  return session.dates
    .filter((d) => d.bookable && Date.parse(d.starts_at) > now)
    .filter((d) => !labelPrefix || (d.label ?? '').startsWith(labelPrefix))
    .slice(0, max)
    .map((d) => ({ startsAt: d.starts_at, bookUrl: d.book_url, placesLeft: d.places_left }));
}

export interface SessionPrices {
  online: string;
  earlyBird: string | null;
  door: string | null;
  monthly: string | null;
}

// One offering's prices, formatted for page copy. Members owns price (owner
// 2026-10-29 — reverses 2026-10-06), so session pages render what the admin
// last saved, within LIVE_REVALIDATE. Hard-coded prices drifted before
// (Beginners Foundation). Throws if the slug is missing, like liveDates().
export async function sessionPrices(slug: string): Promise<SessionPrices> {
  const s = await session(slug);
  const fmt = (p: number | null) => (p === null ? null : formatPence(p));
  return {
    online: formatPence(s.price_pence as number),
    earlyBird: fmt(s.early_bird_price_pence),
    door: fmt(s.walk_in_price_pence),
    monthly: fmt(s.monthly_price_pence),
  };
}

async function session(slug: string): Promise<LiveSession> {
  const s = (await getLiveSessions()).find((l) => l.slug === slug);
  if (!s) throw new Error(`"${slug}" missing from Members`);
  return s;
}

// "15+" or "5–12", from the Members offering's age limits.
export async function sessionAges(slug: string): Promise<string> {
  const { age_min: min, age_max: max } = await session(slug);
  if (min === null) throw new Error(`sessionAges: "${slug}" has no minimum age`);
  return max === null ? `${min}+` : `${min}–${max}`;
}

const londonDate = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-GB', { ...opts, timeZone: 'Europe/London' }).format(new Date(iso));

export interface CourseBlock {
  level: number | null; // from the run label, "Level 2 - Tuesdays"
  dates: string; // "20 Oct – 10 Nov 2026"
  startsAt: string;
}

// Every course block Members still sells (Members drops a run once its last
// day has passed; late joining is allowed until then). Replaces block lists
// that were typed into the pages and drifted — Beginners Foundation's
// December block moved on 2026-10-28 and the page kept the old dates.
export async function courseBlocks(slug: string): Promise<CourseBlock[]> {
  return (await session(slug)).dates
    .map((d) => {
      const end = d.ends_at ?? d.starts_at;
      const sameYear = londonDate(d.starts_at, { year: 'numeric' }) === londonDate(end, { year: 'numeric' });
      const from = londonDate(d.starts_at, sameYear ? { day: 'numeric', month: 'short' } : { day: 'numeric', month: 'short', year: 'numeric' });
      const level = /Level (\d+)/.exec(d.label ?? '')?.[1];
      return {
        level: level ? Number(level) : null,
        dates: `${from} – ${londonDate(end, { day: 'numeric', month: 'short', year: 'numeric' })}`,
        startsAt: d.starts_at,
      };
    })
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
}

// Labels for summary cards: "Oct 2026", "5 May", "2027".
export const monthYear = (iso: string) => londonDate(iso, { month: 'short', year: 'numeric' });
export const yearOf = (iso: string) => londonDate(iso, { year: 'numeric' });
export const dayMonth = (iso: string) => londonDate(iso, { day: 'numeric', month: 'long' });

export interface SessionSlot {
  day: string; // "Thursday"
  time: string; // "8:45–10:45 PM"
  venue: string; // "Honor Oak Community Centre, 50 Turnham Road, London, SE4 2JD"
}

// Venue address pieces in the pages' existing style.
const venueParts = (venue: string) => venue.split(',').map((p) => p.trim()).filter(Boolean);
// "Honor Oak Community Centre"; with n, the first n parts: "Goldsmiths Community Centre, Castillon Road"
export const venueName = (venue: string, n = 1) => venueParts(venue).slice(0, n).join(', ');
// "Dulwich Park, College Road, London SE21 7EB" (no comma before the postcode)
export const venueAddress = (venue: string) => venueParts(venue).join(', ').replace(/, ([A-Z]{1,2}\d[\dA-Z]?(?: \d[A-Z]{2})?)$/, ' $1');

// Weekday and class time of an offering's next upcoming date, from Members
// (owner 2026-10-29: page times must follow the admin; wording stays).
// `weekday` or `label` picks one of several weekly slots (Kidz Mon/Wed,
// Prep Level 1/2).
// No upcoming date → the page's own wording, so a page never goes blank.
// `spaced` and `zeros` copy each page's existing style ("8:45 – 10:45 PM",
// "2:00–3:00 PM") so nothing on the page looks different.
export async function sessionSlot(
  slug: string,
  fallback: SessionSlot,
  opts: { weekday?: string; label?: string; spaced?: boolean; zeros?: boolean } = {},
): Promise<SessionSlot> {
  const now = Date.now();
  const next = (await session(slug)).dates
    .filter((d) => Date.parse(d.ends_at ?? d.starts_at) > now)
    .filter((d) => !opts.label || (d.label ?? '').startsWith(opts.label))
    .filter((d) => !opts.weekday || londonDate(d.starts_at, { weekday: 'long' }) === opts.weekday)
    .sort((a, b) => a.starts_at.localeCompare(b.starts_at))[0];
  if (!next) return fallback;
  const clock = (iso: string) => {
    const [hm, ampm] = londonDate(iso, { hour: 'numeric', minute: '2-digit', hour12: true }).split(' ');
    return { hm: opts.zeros ? hm : hm.replace(':00', ''), ampm: ampm.toUpperCase() };
  };
  const start = clock(next.starts_at);
  const day = londonDate(next.starts_at, { weekday: 'long' });
  const venue = next.venue ?? fallback.venue;
  if (!next.ends_at) return { day, venue, time: `${start.hm} ${start.ampm}` };
  const end = clock(next.ends_at);
  const dash = opts.spaced ? ' – ' : '–';
  const from = start.ampm === end.ampm ? start.hm : `${start.hm} ${start.ampm}`;
  return { day, venue, time: `${from}${dash}${end.hm} ${end.ampm}` };
}
