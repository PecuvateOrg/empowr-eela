import { Icon } from '@iconify/react';
import { LINKS } from '@/lib/links';
import type { Programme } from '@/lib/types';

export const kidsProgrammes: Programme[] = [
  {
    id: 'sk8-skool',
    tag: 'Learn · 5+ yrs',
    tagColor: 'text-blue',
    title: 'Sk8 Skool',
    icon: <Icon icon="mdi:school" width={36} height={36} className="text-blue" />,
    bullets: ['Kidz classes, Mon & Wed', 'All Ages session, every Saturday', 'For beginners'],
    bookingUrl: '/kids-space/sk8-skool',
    buttonLabel: 'View options',
  },
  /* Roller Disco for All Ages discontinued 2026-07-31 — slot repurposed for private bookings,
     no public offering to advertise yet. Kept here in case the team reinstates it.
  {
    id: 'kidz-roller-disco',
    tag: 'Sat · 5+ yrs',
    tagColor: 'text-blue-dark',
    title: 'Roller Disco for All Ages',
    icon: <Icon icon="mdi:music-note" width={36} height={36} className="text-blue-dark" />,
    bullets: ['Music & lights on wheels', 'Dance & skate together', 'Party atmosphere for all'],
    bookingUrl: LINKS.kidzRollerDisco,
  },
  */
  {
    id: 'kidz-summer-camps',
    tag: 'Camp · 5+ yrs',
    tagColor: 'text-blue',
    title: 'Roller Quad Camps',
    icon: <Icon icon="mdi:tent" width={36} height={36} className="text-blue" />,
    bullets: ['Multi-day skating adventure', 'Games & activities', 'New friends & memories'],
    bookingUrl: '/roller-quad-camps',
    buttonLabel: 'View options',
  },
  {
    id: 'roller-events',
    tag: 'Connect · All ages',
    tagColor: 'text-blue-dark',
    title: 'Roller Skate Events',
    icon: <Icon icon="mdi:calendar-star" width={36} height={36} className="text-blue-dark" />,
    bullets: ['Roller Discos', 'Roller Skate Challenges', 'Roller Games & Tournaments'],
    bookingUrl: LINKS.rollerSkateEvents,
  },
  {
    id: 'private-bookings',
    tag: 'Private · 5+ yrs',
    tagColor: 'text-blue-dark',
    title: 'Private Bookings',
    icon: <Icon icon="mdi:calendar-heart" width={36} height={36} className="text-blue-dark" />,
    bullets: ['1:1 coaching', 'Group coaching (min 3)', 'Birthday party booking (min 10)'],
    bookingUrl: '/private-bookings',
    buttonLabel: 'View options',
  },
];
