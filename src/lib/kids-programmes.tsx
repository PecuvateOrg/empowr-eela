import { Icon } from '@iconify/react';
import { LINKS } from '@/lib/links';
import type { Programme } from '@/lib/types';

/**
 * Kids Space programme cards — ready to wire in once individual booking URLs exist.
 *
 * To activate: import this into app/kids-space/page.tsx and render the programme
 * cards section (see adults/page.tsx for the pattern).
 */
export const kidsProgrammes: Programme[] = [
  {
    id: 'kidz-classes',
    tag: 'Learn (5–14)',
    tagColor: 'text-blue',
    title: 'Roller Skating Classes',
    icon: <Icon icon="mdi:school" width={36} height={36} className="text-blue" />,
    bullets: ['Learn to skate safely', 'Build balance & confidence', 'Beginner to advanced'],
    bookingUrl: LINKS.kidzSpace,
  },
  {
    id: 'roller-disco',
    tag: 'Fun (5–14)',
    tagColor: 'text-blue-dark',
    title: 'Roller Disco',
    icon: <Icon icon="mdi:music-note" width={36} height={36} className="text-blue-dark" />,
    bullets: ['Music & lights', 'Dance on wheels', 'Party atmosphere'],
    bookingUrl: LINKS.kidzSpace,
  },
  {
    id: 'roller-camps',
    tag: 'Camp (5–14)',
    tagColor: 'text-blue-light',
    title: 'Roller Camps',
    icon: <Icon icon="mdi:tent" width={36} height={36} className="text-blue-light" />,
    bullets: ['Multi-day skating fun', 'Games & activities', 'New friends & memories'],
    bookingUrl: LINKS.kidzSpace,
  },
  {
    id: 'family-skate',
    tag: 'All ages',
    tagColor: 'text-blue',
    title: 'Family Skate',
    icon: <Icon icon="mdi:human-male-female-child" width={36} height={36} className="text-blue" />,
    bullets: ['Skate together as a family', 'Fun for all ages', 'Safe & welcoming space'],
    bookingUrl: LINKS.kidzSpace,
  },
];
