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
