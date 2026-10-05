import { getOfferings } from '@/lib/offerings';
import { getLiveSessions } from '@/lib/live-sessions';
import { SITE_URL } from '@/lib/site-index';

// schema.org Event markup for one session's upcoming bookable dates, for
// search engines and AI answers. Facts (price) come from the KB feed; dates,
// venue per date and the booking link from Members. Places left are left out
// on purpose: an hour-old count would be a false claim in a search result.
//
// A page using this must `export const revalidate = 3600` (LIVE_REVALIDATE).
// Any failure throws, so revalidation keeps the last good page.

const MAX_EVENTS = 6;

export default async function SessionJsonLd({ offering, path }: { offering: string; path: string }) {
  const [kb, live] = await Promise.all([getOfferings(), getLiveSessions()]);
  const facts = kb.find((o) => o.offering === offering);
  const session = live.find((l) => l.slug === offering);
  if (!facts || !session) throw new Error(`SessionJsonLd: "${offering}" missing from ${facts ? 'Members' : 'the KB'}`);

  // A course already under way still sells (Members allows it), but an Event
  // that started weeks ago misleads in a search result — upcoming only.
  const now = Date.now();
  const events = session.dates
    .filter((d) => d.bookable && Date.parse(d.starts_at) > now)
    .slice(0, MAX_EVENTS)
    .map((d) => {
      const [venueName, ...rest] = (d.venue ?? facts.venue).split(', ');
      return {
        '@type': 'Event',
        name: d.label ? `${session.title} — ${d.label}` : session.title,
        url: SITE_URL + path,
        startDate: d.starts_at,
        ...(d.ends_at ? { endDate: d.ends_at } : {}),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: { '@type': 'Place', name: venueName, address: rest.join(', ') || venueName },
        organizer: { '@type': 'Organization', name: 'Empowr CIC', url: 'https://empowrcic.org' },
        ...(facts.onlinePence !== null
          ? {
              offers: {
                '@type': 'Offer',
                price: (facts.onlinePence / 100).toFixed(2),
                priceCurrency: 'GBP',
                url: d.book_url,
              },
            }
          : {}),
      };
    });

  if (events.length === 0) return null;
  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapes quotes; "<" is escaped so no value can close the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': events }).replace(/</g, '\\u003c'),
      }}
    />
  );
}
