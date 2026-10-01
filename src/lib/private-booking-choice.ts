// A date picked in NextAvailableDates, handed to PrivateBookNow further down
// the page. They are separate islands in a server-rendered page, so the
// choice travels as a window event rather than shared React state.
import { LINKS } from '@/lib/links';

export type PrivateType = 'one' | 'group' | 'party';
export type ChosenTime = { starts_at: string; hours: number } | null;

const EVENT = 'eela:private-date';
const BASE: Record<PrivateType, string> = {
  one: LINKS.privateOneToOne,
  group: LINKS.privateGroup,
  party: LINKS.privateBirthday,
};

/** The Members booking link, with the chosen date when there is one.
 *  `at` + `h` are what Members' parsePrivateDraft reads. */
export function bookUrlFor(type: PrivateType, time: ChosenTime): string {
  if (!time) return BASE[type];
  const q = new URLSearchParams({ at: time.starts_at, h: String(time.hours) });
  return `${BASE[type]}&${q.toString()}`;
}

export function announceDate(type: PrivateType, time: ChosenTime) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { type, time } }));
}

export function onDateChosen(type: PrivateType, handler: (time: ChosenTime) => void): () => void {
  const listener = (e: Event) => {
    const detail = (e as CustomEvent<{ type: PrivateType; time: ChosenTime }>).detail;
    if (detail.type === type) handler(detail.time);
  };
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

// Whether online booking is open for a type, as NextAvailableDates learns it
// from Members. PrivateBookNow swaps to the enquiry button while it is not,
// so a type Empowr has not switched on never shows a dead "Book now".
const OPEN_EVENT = 'eela:private-open';

export function announceOpen(type: PrivateType, open: boolean) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { type, open } }));
}

export function onOpenKnown(type: PrivateType, handler: (open: boolean) => void): () => void {
  const listener = (e: Event) => {
    const detail = (e as CustomEvent<{ type: PrivateType; open: boolean }>).detail;
    if (detail.type === type) handler(detail.open);
  };
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}
