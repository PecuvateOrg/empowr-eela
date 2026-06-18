import type { ReactNode } from 'react';

export interface Programme {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  icon: ReactNode;
  bullets: string[];
  bookingUrl: string;
  buttonLabel?: string;
}

export interface Stat {
  value: string;
  label: string;
}
