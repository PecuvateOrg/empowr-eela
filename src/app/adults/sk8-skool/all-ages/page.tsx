import type { Metadata } from 'next';
import SessionJsonLd from '@/components/SessionJsonLd';
import Sk8SkoolAllAgesContent from '@/components/Sk8SkoolAllAgesContent';

// Hourly, for the live dates in SessionJsonLd (LIVE_REVALIDATE).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Sk8 Skool for All Ages — Sk8 Skool',
  description:
    'Our progressive skating programme open to all ages with Empowr CIC — the same coached structure as Sk8 Skool for Kidz, for children and adults together, every Saturday.',
};

export default function Sk8SkoolAllAgesPage() {
  return (
    <>
      <SessionJsonLd offering="sk8-skool-all-ages" path="/adults/sk8-skool/all-ages" />
      <Sk8SkoolAllAgesContent backHref="/adults/sk8-skool" />
    </>
  );
}
