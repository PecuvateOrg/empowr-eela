import type { Metadata } from 'next';
import Sk8SkoolAllAgesContent from '@/components/Sk8SkoolAllAgesContent';

export const metadata: Metadata = {
  title: 'Sk8 Skool for All Ages — Sk8 Skool',
  description:
    'Our progressive skating programme open to all ages with Empowr CIC — the same coached structure as Sk8 Skool for Kidz, for children and adults together, every Saturday.',
  // Same session as /adults/sk8-skool/all-ages -- this route exists only so the
  // Kids Space hub keeps a back link into its own space. Point search at one URL.
  alternates: { canonical: '/adults/sk8-skool/all-ages' },
};

export default function KidsSk8SkoolAllAgesPage() {
  return <Sk8SkoolAllAgesContent backHref="/kids-space/sk8-skool" />;
}
