import type { Offering, OfferingType } from './offerings';
import type { LiveSession } from './live-sessions';
import { formatPence } from './offerings';
import { OFFERING_PAGES } from './offering-pages';
import { SITE_PAGES } from './site-index';

// Data and filtering for /find-a-session. Pure, so the filters can be tested
// without a browser. Facts (day, time, venue, ages, price, type) come from the
// KB feed; dates and booking links from Members. Filters live in the URL
// (?who=&age=&day=&type=) so the chat widget can link to a filtered view.

export const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
export type Day = (typeof DAYS)[number];
export const TYPES = ['lesson', 'session', 'camp', 'event'] as const;
export const WHO = ['kids', 'adults'] as const;
// Kids Space is 5–14; Adults & Teens is 15+ (site streams).
const ADULT_FROM = 15;
// Dates shown per session; the rest are one click away on Members.
const DATES_SHOWN = 4;

export interface FinderDate {
  startsAt: string;
  label: string | null;
  venue: string | null;
  bookUrl: string;
}

export interface FinderRow {
  offering: string;
  title: string;
  type: OfferingType;
  ages: string;
  minAge: number;
  maxAge: number | null;
  status: Offering['status'];
  slots: { label: string | null; day: string; time: string; venue: string }[];
  price: string | null;
  see: string | null;
  moreDates: string | null;
  dates: FinderDate[];
  days: Day[]; // weekdays it runs on, from the KB plus upcoming dates
}

export interface Filters {
  who?: (typeof WHO)[number];
  age?: number;
  day?: Day;
  type?: (typeof TYPES)[number];
}

export function parseAges(ages: string): { min: number; max: number | null } {
  const m = ages.match(/^(\d+)(?:\+|–(\d+))$/);
  if (!m) throw new Error(`finder: unreadable ages "${ages}"`);
  return { min: Number(m[1]), max: m[2] ? Number(m[2]) : null };
}

const londonDay = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', { weekday: 'long', timeZone: 'Europe/London' }).format(new Date(iso)).toLowerCase() as Day;

function price(o: Offering): string | null {
  if (o.onlinePence === null) return null;
  if (o.onlinePence === 0) return 'Free';
  return `${formatPence(o.onlinePence)}${o.subscriptionMonthlyPence !== null ? ` or ${formatPence(o.subscriptionMonthlyPence)}/month` : ''}`;
}

export function buildRows(kb: Offering[], live: LiveSession[], now = Date.now()): FinderRow[] {
  const rows = new Map<string, FinderRow>();
  for (const o of kb) {
    let row = rows.get(o.offering);
    if (!row) {
      const members = live.find((l) => l.slug === o.offering);
      const page = OFFERING_PAGES[o.offering]?.[0] ?? null;
      const { min, max } = parseAges(o.ages);
      const dates = (members?.dates ?? [])
        .filter((d) => d.bookable && Date.parse(d.starts_at) > now)
        .map((d) => ({ startsAt: d.starts_at, label: d.label, venue: d.venue, bookUrl: d.book_url }));
      row = {
        offering: o.offering,
        // No Members row or page (off-platform): readable slug, as /llms.txt does.
        title:
          members?.title ??
          SITE_PAGES.find((p) => p.path === page)?.title ??
          o.offering.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase()),
        type: o.type,
        ages: o.ages,
        minAge: min,
        maxAge: max,
        status: o.status,
        slots: [],
        price: price(o),
        see: page,
        moreDates: o.status === 'Off-platform' ? null : (members?.session_url ?? null),
        dates: dates.slice(0, DATES_SHOWN),
        days: [...new Set(dates.map((d) => londonDay(d.startsAt)))],
      };
      rows.set(o.offering, row);
    }
    row.slots.push({ label: o.slot, day: o.day, time: o.time, venue: o.venue });
    const day = o.day.toLowerCase() as Day;
    if (DAYS.includes(day) && !row.days.includes(day)) row.days.push(day);
  }
  // Bookable soonest first; sessions without dates after them.
  return [...rows.values()].sort((a, b) => {
    const ad = a.dates[0]?.startsAt ?? '9999', bd = b.dates[0]?.startsAt ?? '9999';
    return ad.localeCompare(bd) || a.title.localeCompare(b.title);
  });
}

export function matches(row: FinderRow, f: Filters): boolean {
  const upTo = row.maxAge ?? Infinity;
  if (f.who === 'kids' && row.minAge >= ADULT_FROM) return false;
  // Adults & Teens = sessions with no upper age limit (the camp, 5–15, sits in Kids Space).
  if (f.who === 'adults' && row.maxAge !== null) return false;
  if (f.age !== undefined && (f.age < row.minAge || f.age > upTo)) return false;
  if (f.day && !row.days.includes(f.day)) return false;
  if (f.type && row.type.toLowerCase() !== f.type) return false;
  return true;
}

// Unknown or malformed values are ignored rather than emptying the page.
export function readFilters(params: { get(name: string): string | null }): Filters {
  const f: Filters = {};
  const who = params.get('who'), day = params.get('day'), type = params.get('type'), age = params.get('age');
  if (who && (WHO as readonly string[]).includes(who)) f.who = who as Filters['who'];
  if (day && (DAYS as readonly string[]).includes(day)) f.day = day as Day;
  if (type && (TYPES as readonly string[]).includes(type)) f.type = type as Filters['type'];
  if (age && /^\d{1,2}$/.test(age)) f.age = Number(age);
  return f;
}
