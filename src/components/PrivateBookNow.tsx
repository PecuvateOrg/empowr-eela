'use client';

// "Book now" on the private-booking pages. Links to the Members booking form
// for this type, and picks up a date chosen in NextAvailableDates so the form
// opens with it selected.
import { useEffect, useState } from 'react';
import { bookUrlFor, onDateChosen, type ChosenTime, type PrivateType } from '@/lib/private-booking-choice';

export default function PrivateBookNow({ type }: { type: PrivateType }) {
  const [time, setTime] = useState<ChosenTime>(null);
  useEffect(() => onDateChosen(type, setTime), [type]);

  return (
    <a
      href={bookUrlFor(type, time)}
      className="inline-block bg-warm-white text-blue text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90"
    >
      {time ? 'Book this date' : 'Book now'} &rsaquo;
    </a>
  );
}
