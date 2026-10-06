'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { DAYS, TYPES, matches, readFilters, type Filters, type FinderRow } from '@/lib/finder';

const TYPE_LABEL: Record<string, string> = { lesson: 'Lessons', session: 'Sessions', camp: 'Camps', event: 'Events' };
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const when = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London',
  }).format(new Date(iso));

// "Wednesday (indoor)" on a Wednesday slot reads "Wednesdays 17:00–18:00 (indoor)";
// other slot names ("Level 1") lead.
function slotText(s: FinderRow['slots'][number]) {
  const when = s.day === 'Varies' ? 'Dates vary' : `${s.day}s ${s.time}`;
  if (!s.label) return when;
  if (s.label.startsWith(s.day)) return `${when} ${s.label.slice(s.day.length).trim()}`.trim();
  return `${s.label}: ${when}`;
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`min-h-[40px] px-4 rounded-full text-sm font-[700] border transition-colors ${
        on ? 'bg-blue text-white border-blue' : 'bg-white text-black border-border hover:border-blue'
      }`}
    >
      {children}
    </button>
  );
}

type Set = (next: Partial<Record<keyof Filters, string | undefined>>) => void;

// Reads and writes the filters in the URL. Needs a Suspense boundary; its
// fallback is FinderView with no filters, so the full list is in the HTML
// for crawlers and AI tools that don't run JavaScript.
export default function SessionFinder({ rows }: { rows: FinderRow[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const set: Set = (next) => {
    const q = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) (v ? q.set(k, v) : q.delete(k));
    router.replace(q.size ? `${pathname}?${q}` : pathname, { scroll: false });
    posthog.capture('finder_filter', Object.fromEntries(q));
  };
  const clear = () => router.replace(pathname, { scroll: false });
  return <FinderView rows={rows} f={readFilters(params)} set={set} clear={params.size > 0 ? clear : undefined} />;
}

// `set` is absent in the server-rendered fallback: chips render but act only
// once the page has loaded.
export function FinderView({ rows, f, set = () => {}, clear }: { rows: FinderRow[]; f: Filters; set?: Set; clear?: () => void }) {
  const shown = rows.filter((r) => matches(r, f));
  const toggle = (k: keyof Filters, v: string) => set({ [k]: f[k] === v || String(f[k]) === v ? undefined : v });

  const book = (r: FinderRow, url: string, date?: string) =>
    posthog.capture('booking_click', { programme: r.title, destination: url, source: 'finder', date });

  return (
    <section className="max-w-[880px] mx-auto px-5 pb-14">
      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Who is skating">
          <Chip on={f.who === 'kids'} onClick={() => toggle('who', 'kids')}>Kids (5–14)</Chip>
          <Chip on={f.who === 'adults'} onClick={() => toggle('who', 'adults')}>Adults &amp; teens (15+)</Chip>
          <label className="inline-flex items-center gap-2 text-sm font-[700] text-black">
            Age
            <select
              value={f.age ?? ''}
              onChange={(e) => set({ age: e.target.value || undefined })}
              className="min-h-[40px] rounded-full border border-border px-3 bg-white"
            >
              <option value="">Any</option>
              {Array.from({ length: 76 }, (_, i) => i + 5).map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Day">
          {DAYS.map((d) => (
            <Chip key={d} on={f.day === d} onClick={() => toggle('day', d)}>{cap(d).slice(0, 3)}</Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Type">
          {TYPES.map((t) => (
            <Chip key={t} on={f.type === t} onClick={() => toggle('type', t)}>{TYPE_LABEL[t]}</Chip>
          ))}
          {clear && (
            <button type="button" onClick={clear} className="min-h-[40px] px-3 text-sm font-[700] text-blue underline">
              Clear
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-mid mb-4" aria-live="polite">
        {shown.length === 0 ? 'Nothing matches — try fewer filters.' : `${shown.length} ${shown.length === 1 ? 'match' : 'matches'}`}
      </p>

      <ul className="space-y-4">
        {shown.map((r) => (
          <li key={r.offering} className="rounded-[20px] border border-border bg-white p-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <h2 className="font-[900] text-black text-lg">{r.title}</h2>
              <span className="text-[11px] font-[800] uppercase tracking-[0.12em] text-red">{r.type}</span>
              <span className="text-sm text-mid">Ages {r.ages}{r.price ? ` · ${r.price}` : ''}</span>
            </div>
            <ul className="text-sm text-mid mb-3">
              {r.slots.map((s, i) => (
                <li key={i}>{slotText(s)} · {s.venue.split(',')[0]}</li>
              ))}
            </ul>

            {r.dates.length > 0 ? (
              <ul className="flex flex-wrap gap-2 mb-3">
                {r.dates.map((d) => (
                  <li key={d.startsAt}>
                    <a href={d.bookUrl} onClick={() => book(r, d.bookUrl, d.startsAt)} className="inline-flex min-h-[40px] items-center rounded-full bg-blue text-white text-sm font-[800] px-4 no-underline hover:opacity-90">
                      Book {when(d.startsAt)}{d.label ? ` · ${d.label}` : ''}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-mid mb-3">
                {r.status === 'Off-platform' ? 'Not booked online.' : r.status === 'Dates TBA' ? 'Dates coming soon.' : 'No dates open right now.'}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-sm font-[700]">
              {r.see && <Link href={r.see} className="text-blue no-underline hover:opacity-80">See {r.title} →</Link>}
              {r.moreDates && (
                <a href={r.moreDates} onClick={() => book(r, r.moreDates!)} className="text-blue no-underline hover:opacity-80">
                  {r.dates.length > 0 ? 'All dates →' : 'Book →'}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
