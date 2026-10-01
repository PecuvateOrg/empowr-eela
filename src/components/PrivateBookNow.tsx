'use client';

// "Book now" on the private-booking pages. Links to the Members booking form
// for this type, and picks up a date chosen in NextAvailableDates so the form
// opens with it selected. While Members reports the type closed (Empowr has
// not switched it on), it shows `whenClosed` — the enquiry button — instead.
// If availability cannot be read it stays on Book now: Members shows its own
// "opening soon" card, so that failure is never a dead end.
import { useEffect, useState, type ReactNode } from 'react';
import {
  bookUrlFor,
  onDateChosen,
  onOpenKnown,
  type ChosenTime,
  type PrivateType,
} from '@/lib/private-booking-choice';

export default function PrivateBookNow({ type, whenClosed }: { type: PrivateType; whenClosed: ReactNode }) {
  const [time, setTime] = useState<ChosenTime>(null);
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => onDateChosen(type, setTime), [type]);
  useEffect(() => onOpenKnown(type, setOpen), [type]);

  if (open === false) return <>{whenClosed}</>;

  return (
    <a
      href={bookUrlFor(type, time)}
      className="inline-block bg-warm-white text-blue text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90"
    >
      {time ? 'Book this date' : 'Book now'} &rsaquo;
    </a>
  );
}
