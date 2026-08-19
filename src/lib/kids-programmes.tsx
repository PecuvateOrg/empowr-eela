import { Icon } from '@iconify/react';
import { LINKS } from '@/lib/links';
import type { Programme } from '@/lib/types';

export const kidsProgrammes: Programme[] = [
  {
    id: 'kidz-monday',
    tag: 'Mon · 5–12 yrs',
    tagColor: 'text-blue',
    title: 'Sk8 Skool for Kidz',
    icon: <Icon icon="mdi:school" width={36} height={36} className="text-blue" />,
    bullets: ['Learn to skate safely', 'Build balance & confidence', 'For beginners'],
    bookingUrl: LINKS.kidzMondayClasses,
  },
  {
    id: 'kidz-wednesday',
    tag: 'Wed · 5–12 yrs',
    tagColor: 'text-blue-dark',
    title: 'Sk8 Skool for Kidz',
    icon: <Icon icon="mdi:school" width={36} height={36} className="text-blue-dark" />,
    bullets: ['Learn to skate safely', 'Build balance & confidence', 'For beginners'],
    bookingUrl: LINKS.kidzWednesdayClasses,
  },
  {
    id: 'kidz-saturday',
    tag: 'Sat · 5+ yrs',
    tagColor: 'text-blue-light',
    title: 'Sk8 Skool for All Ages',
    icon: <Icon icon="mdi:roller-skate" width={36} height={36} className="text-blue-light" />,
    bullets: ['Open to all ages from 5+', 'Family-friendly atmosphere', 'For beginners'],
    bookingUrl: LINKS.kidzSaturdaySkate,
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
