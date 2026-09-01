// Members platform base. Bookable sessions route here instead of Wix — the
// 2026-09-01 cutover. Every URL below was verified live (HTTP 200) against
// members.empowrcic.org before merge; a Members slug that 404s silently
// sends a parent to a dead page, so re-verify if you add one.
//
// THE CUTOVER IS DELIBERATELY PARTIAL. Camps and Roller Disco stay on Wix
// because their Members offerings are inactive with no scheduled dates
// (roller-quad-camp 404s today) — a working Wix booking page beats a 404.
// Move them when the dates exist in Members, not before.
const MEMBERS_BASE_URL = 'https://members.empowrcic.org';

export const LINKS = {
  // Adults programmes
  synkron8:          `${MEMBERS_BASE_URL}/sessions/synkron8`,
  // ⚠️ Key is PLURAL, slug is SINGULAR, and that mismatch is correct — not a
  // typo to tidy. The key matches EELA's own /adults/sk8-skool/beginners-
  // foundations route; Members renamed its offering to the singular on
  // 2026-08-31. The old plural Members URL still 308s, but link to the
  // canonical one rather than leaning on a redirect.
  beginnersFoundations: `${MEMBERS_BASE_URL}/sessions/beginners-foundation`,
  skateJam:          `${MEMBERS_BASE_URL}/sessions/skate-jam`,
  rollerSkateEvents: `${MEMBERS_BASE_URL}/sessions/roller-skate-events`,

  // Members platform — account entry points. The booking flow also funnels
  // here on its own: a signed-out /book/<id> 307s to /login?next=..., and
  // that page carries a "Create an account" link. These keys are the second
  // front door (the /members page), not the only one.
  membersSignup:     `${MEMBERS_BASE_URL}/signup`,
  membersLogin:      `${MEMBERS_BASE_URL}/login`,

  // Children / family
  rollerQuadCampsHAF:     'https://app.holidayactivities.com/parent/providers/empowr-cic',
  kidzSpace:              'https://empowrcic.wixsite.com/empowrcic/kidzspace',
  // Monday and Wednesday share one Members page — the offering is one
  // offering with two weekly slots, and the page lists every date. The
  // separate Wix service-pages they replace no longer have an equivalent.
  kidzMondayClasses:      `${MEMBERS_BASE_URL}/sessions/sk8-skool-kidz`,
  kidzWednesdayClasses:   `${MEMBERS_BASE_URL}/sessions/sk8-skool-kidz`,
  kidzSaturdaySkate:      `${MEMBERS_BASE_URL}/sessions/sk8-skool-all-ages`,
  // STAYS ON WIX — see the partial-cutover note above. The Wix page is live
  // and sells camps; Members' roller-quad-camp offering is inactive with no
  // occurrences. This is the paid route; rollerQuadCampsHAF above is the
  // separate benefit-eligible DfE-funded route and is NOT a substitute.
  kidzSummerCamps:        'https://empowrcic.wixsite.com/empowrcic/service-page/summer-roller-camp-coming-soon?referral=service_list_widget',
  // STAYS ON WIX — Roller Disco is retired as a weekly session and its
  // Members offering (all-ages-roller-disco) is inactive.
  kidzRollerDisco:        'https://empowrcic.wixsite.com/empowrcic/service-page/all-ages-roller-disco-5yrs-1?referral=service_list_widget',

  // Quiz — links to landing page quiz until a native quiz is built on this platform
  quiz:              'https://start.empowrcic.org/quiz?utm_source=empowr-eela&utm_medium=internal',

  // Community
  whatsapp:          'https://chat.whatsapp.com/BuKlBkfDxHs2jdPyRzXwza',
  shop:              'https://empowrcic.wixsite.com/empowrcic/shop',
  donatingSkates:    'https://empowrcic.wixsite.com/empowrcic/b4e',
  heroes:            'https://hero.empowrcic.org/?utm_source=empowr-eela&utm_medium=internal',
  trustpilot:        'https://www.trustpilot.com/review/empowrcic.org',

  // Contact
  enquiries:         'https://empowrcic.org/contact?utm_source=empowr-eela&utm_medium=internal',
  volunteering:      'https://empowrcic.org/contact?utm_source=empowr-eela&utm_medium=internal',

  // Private Bookings — availability. One shared calendar: all four offerings
  // (1:1 coaching, group coaching, birthday party, custom event) compete for
  // the same Saturday 3-5PM Ladywell Centre slot, so one calendar covers all.
  privateBookingsCalendar: 'https://calendar.google.com/calendar/embed?src=c_747e5c60d5a0020143141ecc4f4d2c66710dc78f56211cd44016ae219293042b%40group.calendar.google.com&ctz=Europe%2FLondon',
} as const;
