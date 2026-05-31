import type { LucideIcon } from 'lucide-react';

export interface Programme {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  icon: LucideIcon;
  bullets: string[];
  bookingUrl: string;
}

export interface Stat {
  value: string;
  label: string;
}
