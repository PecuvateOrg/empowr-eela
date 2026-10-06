// Decision logic for the hourly EELA watch (netlify/functions/eela-watch.mts).
// Pure, so every transition can be tested without a network or a phone.
//
// Alert only on CHANGE: a new or different set of problems sends one alert,
// an empty set after problems sends one "recovered", an unchanged set sends
// nothing. Transient problems (a feed down, a page served stale) must be seen
// on two runs in a row first, so one 503 doesn't page anyone twice.

export interface WatchState {
  seen: string[]; // every problem found on the last run
  alerted: string[]; // the set the owner was last told about
}

export const EMPTY_STATE: WatchState = { seen: [], alerted: [] };

// Problems that can clear on their own within the hour.
export const TRANSIENT = /^(feed|stale):/;

export type Notice = { kind: 'problem' | 'recovered'; problems: string[] } | null;

export function decide(prev: WatchState, found: string[]): { notice: Notice; confirmed: string[] } {
  const current = [...new Set(found)].sort();
  const confirmed = current.filter((p) => !TRANSIENT.test(p) || prev.seen.includes(p));
  const same = confirmed.length === prev.alerted.length && confirmed.every((p, i) => p === prev.alerted[i]);
  if (same) return { notice: null, confirmed };
  if (confirmed.length === 0) return { notice: { kind: 'recovered', problems: prev.alerted }, confirmed };
  return { notice: { kind: 'problem', problems: confirmed }, confirmed };
}

// The state to store after a run. `alerted` only moves when the alert was
// actually delivered, so a failed send is retried on the next run.
export function nextState(found: string[], confirmed: string[], prev: WatchState, delivered: boolean): WatchState {
  return { seen: [...new Set(found)].sort(), alerted: delivered ? confirmed : prev.alerted };
}
