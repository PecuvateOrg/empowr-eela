'use client';

// A session page's Book now, driven by Members' live dates (read on the
// server, hourly — see liveDates in lib/live-sessions). With dates: one button
// per upcoming date straight into that date's booking, plus Book now to the
// full list. With none: no Book now — it would lead to a Members page with
// nothing to book — and `empty` says what happens instead.
import posthog from 'posthog-js';
import type { BookableDate } from '@/lib/live-sessions';

const day = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Europe/London',
  }).format(new Date(iso));

export default function LiveBooking({
  programme, source, dates, sessionUrl, empty, onDark = false,
}: {
  programme: string;
  source: string;
  dates: BookableDate[];
  sessionUrl: string;
  empty: React.ReactNode;
  onDark?: boolean;
}) {
  const track = (url: string, date?: string) =>
    posthog.capture('booking_click', { programme, destination: url, source, date });

  if (dates.length === 0) {
    return <p className={`text-sm leading-[1.7] ${onDark ? 'text-white/80' : 'text-mid'}`}>{empty}</p>;
  }

  return (
    <>
      <ul className="flex flex-wrap gap-2 mb-4" aria-label={`Next ${programme} dates`}>
        {dates.map((d) => (
          <li key={d.startsAt}>
            <a
              href={d.bookUrl}
              target="_blank"
              rel="noopener"
              onClick={() => track(d.bookUrl, d.startsAt)}
              className={`inline-block rounded-full border px-3 py-1.5 text-xs font-[800] no-underline ${
                onDark ? 'border-white text-white hover:bg-white/15' : 'border-blue text-blue hover:bg-blue-pale/40'
              }`}
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
        className={`inline-block text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start ${
          onDark ? 'bg-white text-blue' : 'bg-blue text-warm-white'
        }`}
        style={onDark ? undefined : { boxShadow: 'var(--shadow-blue)' }}
      >
        Book now &rsaquo;
      </a>
    </>
  );
}
