import type { Metadata } from 'next';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SessionFinder, { FinderView } from '@/components/SessionFinder';
import { getOfferings } from '@/lib/offerings';
import { getLiveSessions } from '@/lib/live-sessions';
import { buildRows } from '@/lib/finder';

// Every session in one place, filterable by who, age, day and type, each with
// its next dates and a Book button (target: 1–2 clicks to a date). Built at
// render from the KB feed and Members; filtering happens in the browser and
// lives in the URL, so the chat widget can link to a filtered view.
//
// Hourly, for the live dates (LIVE_REVALIDATE). A feed failure throws, so the
// last good page keeps being served.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Find a session',
  description:
    'Every Empowr roller skating session in one place — filter by age, day and type, see the next dates and book in a click.',
};

export default async function FindASessionPage() {
  const [kb, live] = await Promise.all([getOfferings(), getLiveSessions()]);
  const rows = buildRows(kb, live);

  return (
    <>
      <Navbar />
      <main>
        <section className="max-w-[880px] mx-auto px-5 pt-10 pb-6 sm:pt-14">
          <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-3">Find a session</p>
          <h1 className="font-[900] text-black leading-[1.08] mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>
            What would you like to skate?
          </h1>
          <p className="text-mid leading-[1.8] max-w-[560px]">
            Pick who&apos;s skating, their age or a day, and book a date straight from here.
          </p>
        </section>
        {/* useSearchParams needs a boundary for the page to stay static; the
            fallback is the unfiltered list, so it is in the HTML. */}
        <Suspense fallback={<FinderView rows={rows} f={{}} />}>
          <SessionFinder rows={rows} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
