'use client';

// Next open Saturdays for one private-booking type, read live from Members
// (the booking system is the source of truth). Replaced the Google Calendar
// embed on the bookable pages, owner decision 2026-09-29: the calendar was
// kept by hand and could disagree with what the booking form offers. The
// custom-event page still uses AvailabilityCalendar (enquiry, not booked here).
//
// Picking a date (and, for coaching, a time) is carried to the booking form:
// the choice is announced to PrivateBookNow, whose link gains ?at=&h= and
// Members opens with that date already selected. Members re-checks it; a date
// taken in the meantime simply arrives unselected.
import { useEffect, useState } from 'react';
import { LINKS } from '@/lib/links';
import { announceDate, bookUrlFor, type PrivateType } from '@/lib/private-booking-choice';

type Time = { label: string; starts_at: string; hours: number };
type DateRow = { date: string; label: string; times: Time[] };
type State =
  | { status: 'loading' }
  | { status: 'ready'; open: boolean; dates: DateRow[] }
  | { status: 'failed' };

export default function NextAvailableDates({ type }: { type: PrivateType }) {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [chosen, setChosen] = useState<Time | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${LINKS.privateAvailability}?type=${type}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((body: { open: boolean; dates: DateRow[] }) =>
        setState({ status: 'ready', open: body.open, dates: body.dates ?? [] })
      )
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'failed' });
      });
    return () => controller.abort();
  }, [type]);

  function choose(time: Time | null) {
    setChosen(time);
    announceDate(type, time);
  }

  const isChosen = (t: Time) => chosen?.starts_at === t.starts_at && chosen.hours === t.hours;

  return (
    <section className="max-w-[880px] mx-auto px-5 pb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-border" />
        <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
          🗓 Next available dates
        </p>
        <div className="flex-1 h-px bg-border" />
      </div>

      {state.status === 'loading' && (
        <p className="text-sm text-mid text-center">Checking availability…</p>
      )}

      {state.status === 'failed' && (
        <p className="text-sm text-mid text-center">
          We couldn&apos;t load dates just now. Press Book now below to see every open date.
        </p>
      )}

      {state.status === 'ready' && !state.open && (
        <p className="text-sm text-mid text-center">
          Online booking is opening soon. Get in touch and we&apos;ll arrange it with you.
        </p>
      )}

      {state.status === 'ready' && state.open && state.dates.length === 0 && (
        <p className="text-sm text-mid text-center">
          No dates are open in the next few months. Get in touch and we&apos;ll see what we can do.
        </p>
      )}

      {state.status === 'ready' && state.open && state.dates.length > 0 && (
        <>
          <p className="text-sm text-mid text-center mb-4">
            {type === 'party' ? 'Tap a date' : 'Tap a date and time'}, then press Book now.
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-[640px] mx-auto">
            {state.dates.map((d) => {
              const dayChosen = d.times.some(isChosen);
              return (
                <li
                  key={d.date}
                  // The whole card is the target, not just the time pills: a
                  // tap anywhere picks the day's first time (a party's only
                  // one); tapping a chosen card again clears it. The pills
                  // below stay the keyboard-accessible controls and stop the
                  // click reaching the card, so they can switch times.
                  onClick={() => choose(dayChosen ? null : d.times[0])}
                  className={`cursor-pointer select-none rounded-[16px] border px-3 py-3 text-center transition-colors ${
                    dayChosen ? 'bg-blue border-blue' : 'bg-card border-border hover:border-blue'
                  }`}
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                >
                  <p className={`font-[900] text-sm ${dayChosen ? 'text-white' : 'text-black'}`}>{d.label}</p>
                  <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                    {d.times.map((t) => {
                      const on = isChosen(t);
                      return (
                        <button
                          key={t.label}
                          type="button"
                          aria-pressed={on}
                          onClick={(e) => {
                            e.stopPropagation();
                            choose(on ? null : t);
                          }}
                          className={`rounded-full px-3 py-1 text-xs font-[800] transition-colors ${
                            on
                              ? 'bg-white text-blue'
                              : dayChosen
                                ? 'bg-white/20 text-white hover:bg-white/30'
                                : 'bg-blue-pale/40 text-blue hover:bg-blue-pale/70'
                          }`}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-mid text-center mt-4">
            {chosen ? (
              <>
                Selected: <strong className="text-black">{
                  state.dates.find((d) => d.times.some(isChosen))?.label
                }, {chosen.label}</strong>.{' '}
                <button type="button" onClick={() => choose(null)} className="font-[800] text-blue hover:opacity-80">
                  Clear
                </button>
              </>
            ) : (
              <>
                Bookings open at least two weeks ahead.{' '}
                <a href={bookUrlFor(type, null)} className="font-[800] text-blue no-underline hover:opacity-80">
                  See every date &rsaquo;
                </a>
              </>
            )}
          </p>
        </>
      )}
    </section>
  );
}
