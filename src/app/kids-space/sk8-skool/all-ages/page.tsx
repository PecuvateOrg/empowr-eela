import type { Metadata } from 'next';
import SessionJsonLd from '@/components/SessionJsonLd';
import Sk8SkoolAllAgesContent from '@/components/Sk8SkoolAllAgesContent';

// Hourly, for the live dates in SessionJsonLd (LIVE_REVALIDATE).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Sk8 Skool for All Ages — Sk8 Skool',
  description:
    'Our progressive skating programme open to all ages with Empowr CIC — the same coached structure as Sk8 Skool for Kidz, for children and adults together, every Saturday.',
  // Same session as /adults/sk8-skool/all-ages -- this route exists only so the
  // Kids Space hub keeps a back link into its own space. Point search at one URL.
  alternates: { canonical: '/adults/sk8-skool/all-ages' },
};

export default function KidsSk8SkoolAllAgesPage() {
  return (
    <>
      <SessionJsonLd offering="sk8-skool-all-ages" path="/kids-space/sk8-skool/all-ages" />
      <Sk8SkoolAllAgesContent backHref="/kids-space/sk8-skool" />
    </>
  );
}
