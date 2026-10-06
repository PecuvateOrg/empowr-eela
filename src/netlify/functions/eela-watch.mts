import type { Config } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { getOfferings } from '../../lib/offerings';
import { getLiveSessions } from '../../lib/live-sessions';
import { checkLiveJoin, checkOfferingPages, OFFERING_PAGES } from '../../lib/offering-pages';
import { SITE_URL } from '../../lib/site-index';
import { decide, nextState, EMPTY_STATE, type WatchState } from '../../lib/watch';

// Hourly watch over what keeps EELA's session pages true: the KB feed, the
// Members feed, the joins between them, and the live pages themselves. Pages
// revalidate quietly — a failure keeps serving the last good page — so without
// this nobody hears about it. Alerts go to ntfy on CHANGE only (lib/watch.ts).
//
// NTFY_TOPIC is an env var, never code: this repo is public and the topic is
// the only thing that guards the channel.

const TIMEOUT_MS = 20_000;
// A page whose first listed date is this far in the past has stopped refreshing.
const STALE_MS = 2 * 60 * 60 * 1000;

const withTimeout = <T,>(p: Promise<T>, what: string) =>
  Promise.race([
    p,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error(`${what}: no answer in 20s`)), TIMEOUT_MS)),
  ]);

const firstLine = (e: unknown) => String(e instanceof Error ? e.message : e).split('\n')[0];

async function findProblems(): Promise<string[]> {
  const problems: string[] = [];
  const [kb, live] = await Promise.allSettled([
    withTimeout(getOfferings(), 'KB feed'),
    withTimeout(getLiveSessions(), 'Members feed'),
  ]);
  if (kb.status === 'rejected') problems.push(`feed: KB session feed failing — ${firstLine(kb.reason)}`);
  if (live.status === 'rejected') problems.push(`feed: Members live-sessions failing — ${firstLine(live.reason)}`);

  if (kb.status === 'fulfilled') {
    try {
      checkOfferingPages(kb.value);
    } catch (e) {
      // This one still fails builds and freezes /llms.txt refreshes.
      problems.push(`pages: ${String(e instanceof Error ? e.message : e).replace(/\n- /g, '; ')} — fix lib/offering-pages.ts`);
    }
    if (live.status === 'fulfilled') {
      for (const p of checkLiveJoin(kb.value, live.value)) problems.push(`drift: ${p}`);
    }
  }

  const now = Date.now();
  for (const path of new Set(Object.values(OFFERING_PAGES).flat())) {
    try {
      const html = await withTimeout(fetch(SITE_URL + path).then((r) => r.text()), path);
      const starts = [...html.matchAll(/"startDate":"([^"]+)"/g)].map((m) => Date.parse(m[1]));
      if (starts.length && Math.min(...starts) < now - STALE_MS) {
        problems.push(`stale: ${path} still lists past dates — the page has stopped refreshing`);
      }
    } catch (e) {
      problems.push(`stale: ${path} could not be fetched — ${firstLine(e)}`);
    }
  }
  return problems;
}

export async function send(kind: 'problem' | 'recovered', problems: string[]): Promise<boolean> {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) {
    console.error('[eela-watch] NTFY_TOPIC unset — alert not sent');
    return false;
  }
  const title = kind === 'problem' ? `EELA: ${problems.length} problem(s)` : 'EELA: all clear again';
  const body =
    kind === 'problem'
      ? problems.map((p) => `• ${p}`).join('\n')
      : `Resolved:\n${problems.map((p) => `• ${p}`).join('\n')}`;
  try {
    const res = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
      method: 'POST',
      body,
      headers: {
        Title: title,
        Priority: kind === 'problem' ? 'default' : 'low',
        Tags: kind === 'problem' ? 'warning' : 'white_check_mark',
        Click: SITE_URL,
      },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error('[eela-watch] ntfy returned', res.status);
    return res.ok;
  } catch (e) {
    console.error('[eela-watch] ntfy request failed:', firstLine(e));
    return false;
  }
}

export default async function handler(): Promise<Response> {
  const store = getStore('eela-watch');
  const prev = ((await store.get('state', { type: 'json' })) as WatchState | null) ?? EMPTY_STATE;
  const found = await findProblems();
  const { notice, confirmed } = decide(prev, found);
  const delivered = notice ? await send(notice.kind, notice.problems) : true;
  await store.setJSON('state', { ...nextState(found, confirmed, prev, delivered), at: new Date().toISOString() });
  console.log(`[eela-watch] found ${found.length}, confirmed ${confirmed.length}, notice ${notice?.kind ?? 'none'}, delivered ${delivered}`);
  if (found.length) console.log(found.join('\n'));
  return new Response('ok');
}

export const config: Config = { schedule: '@hourly' };
