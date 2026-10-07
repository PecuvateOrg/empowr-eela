'use client';

// The camps page's Book now, driven by Members' live dates (read on the
// server, hourly). With dates: one button per upcoming date straight into
// that date's booking, plus Book now to the full list. With none: no Book now
// — it used to lead to a Members page with nothing to book between holidays.
import Link from 'next/link';
import posthog from 'posthog-js';

export type CampDate = { startsAt: string; bookUrl: string; placesLeft: number | null };

const day = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Europe/London',
  }).format(new Date(iso));

export default function CampBooking({ dates, sessionUrl }: { dates: CampDate[]; sessionUrl: string }) {
  const track = (url: string, date?: string) =>
    posthog.capture('booking_click', { programme: 'Roller Quad Camp', destination: url, source: 'camps_page', date });

  if (dates.length === 0) {
    return (
      <p className="text-sm text-mid leading-[1.7]">
        New camp dates are coming soon — they&apos;re set for each school holiday.{' '}
        <Link href="/find-a-session?who=kids" className="font-[800] text-blue no-underline hover:opacity-80">
          See other kids&apos; sessions &rsaquo;
        </Link>
      </p>
    );
  }

  return (
    <>
      <ul className="flex flex-wrap gap-2 mb-4" aria-label="Next camp dates">
        {dates.map((d) => (
          <li key={d.startsAt}>
            <a
              href={d.bookUrl}
              target="_blank"
              rel="noopener"
              onClick={() => track(d.bookUrl, d.startsAt)}
              className="inline-block rounded-full border border-blue px-3 py-1.5 text-xs font-[800] text-blue no-underline hover:bg-blue-pale/40"
            >
              {day(d.startsAt)}
              {d.placesLeft !== null && d.placesLeft <= 5 ? ` · ${d.placesLeft} left` : ''}
            </a>
          </li>
        ))}
      </ul>
      <a
        href={sessionUrl}
        target="_blank"
        rel="noopener"
        onClick={() => track(sessionUrl)}
        className="inline-block bg-blue text-warm-white text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start"
        style={{ boxShadow: 'var(--shadow-blue)' }}
      >
        Book now &rsaquo;
      </a>
    </>
  );
}
