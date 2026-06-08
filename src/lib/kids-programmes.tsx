import { Icon } from '@iconify/react';
import { LINKS } from '@/lib/links';
import type { Programme } from '@/lib/types';

export const kidsProgrammes: Programme[] = [
  {
    id: 'kidz-monday',
    tag: 'Mon · 5–15 yrs',
    tagColor: 'text-blue',
    title: 'Monday Skating Classes',
    icon: <Icon icon="mdi:school" width={36} height={36} className="text-blue" />,
    bullets: ['Learn to skate safely', 'Build balance & confidence', 'Beginner to advanced'],
    bookingUrl: LINKS.kidzMondayClasses,
  },
  {
    id: 'kidz-wednesday',
    tag: 'Wed · 5–15 yrs',
    tagColor: 'text-blue-dark',
    title: 'Wednesday Skating Classes',
    icon: <Icon icon="mdi:school" width={36} height={36} className="text-blue-dark" />,
    bullets: ['Expert-coached sessions', 'Ages 5 to 15', 'Progress at your pace'],
    bookingUrl: LINKS.kidzWednesdayClasses,
  },
  {
    id: 'kidz-saturday',
    tag: 'Sat · 5+ yrs',
    tagColor: 'text-blue-light',
    title: 'Saturday Skate (All Ages)',
    icon: <Icon icon="mdi:roller-skate" width={36} height={36} className="text-blue-light" />,
    bullets: ['Open to all ages from 5+', 'Family-friendly atmosphere', 'Skills & fun combined'],
    bookingUrl: LINKS.kidzSaturdaySkate,
  },
  {
    id: 'kidz-summer-camps',
    tag: 'Camp · 5+ yrs',
    tagColor: 'text-blue',
    title: 'Summer Roller Camps',
    icon: <Icon icon="mdi:tent" width={36} height={36} className="text-blue" />,
    bullets: ['Multi-day skating adventure', 'Games & activities', 'New friends & memories'],
    bookingUrl: LINKS.kidzSummerCamps,
  },
  {
    id: 'kidz-roller-disco',
    tag: 'All ages · 5+ yrs',
    tagColor: 'text-blue-dark',
    title: 'All Ages Roller Disco',
    icon: <Icon icon="mdi:music-note" width={36} height={36} className="text-blue-dark" />,
    bullets: ['Music & lights on wheels', 'Dance & skate together', 'Party atmosphere for all'],
    bookingUrl: LINKS.kidzRollerDisco,
  },
];
