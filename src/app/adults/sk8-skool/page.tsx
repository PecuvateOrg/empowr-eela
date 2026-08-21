import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProgrammeCard from '@/components/ProgrammeCard';
import type { Programme } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Sk8 Skool — Adults',
  description:
    'Sk8 Skool with Empowr CIC — Beginners Foundations, Synkron8, and Sk8 Skool for All Ages. Learn at your pace and build confidence, all in one place.',
};

const pillars = [
  { icon: 'mdi:school',        label: 'Beginners to advanced' },
  { icon: 'mdi:account-group', label: 'Community led' },
  { icon: 'mdi:shield-check',  label: 'Trusted by thousands' },
];

const offerings: Programme[] = [
  {
    id: 'beginners-foundations',
    tag: 'Course',
    tagColor: 'text-blue',
    title: 'Beginners Foundations',
    icon: <Icon icon="mdi:seed-outline" width={36} height={36} className="text-blue" />,
    bullets: ['From first steps on skates', 'Progressive, coach-led course', 'Indoors, next intake Sept 2026'],
    bookingUrl: '/adults/sk8-skool/beginners-foundations',
    buttonLabel: 'View details',
  },
  {
    id: 'synkron8',
    tag: 'Every Monday',
    tagColor: 'text-blue-dark',
    title: 'Synkron8',
    icon: <Icon icon="mdi:music-note" width={36} height={36} className="text-blue-dark" />,
    bullets: ['Build balance & confidence', 'Learn routines and line dances', 'For beginners and improvers'],
    bookingUrl: '/adults/sk8-skool/synkron8',
    buttonLabel: 'View details',
  },
  {
    id: 'all-ages',
    tag: 'Every Saturday',
    tagColor: 'text-blue-light',
    title: 'Sk8 Skool for All Ages',
    icon: <Icon icon="mdi:human-male-female-child" width={36} height={36} className="text-blue-light" />,
    bullets: ['Open to all ages from 5+', 'Same coached structure as Sk8 Skool for Kidz', 'For beginners'],
    bookingUrl: '/adults/sk8-skool/all-ages',
    buttonLabel: 'View details',
  },
];

export default function Sk8SkoolPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="max-w-[880px] mx-auto px-5 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Link
            href="/adults"
            className="inline-flex items-center gap-1.5 text-sm font-[700] text-blue no-underline mb-6 hover:opacity-80 transition-opacity"
          >
            ← Adults
          </Link>

          <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-3">
            Learn · Ages 5+/15+
          </p>
          <h1
            className="font-[900] text-black leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Sk8 Skool.
          </h1>
          <p
            className="text-mid leading-[1.8] max-w-[600px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            Learn at your pace and build skills and confidence, whatever stage you&apos;re at.
            Choose a coach-led course from your first steps, a weekly roller-dance class, or
            an all-ages session you can attend together as a family.
          </p>
        </section>

        {/* PILLARS */}
        <div className="border-y border-border bg-blue-pale/60 py-4 px-5 mb-10">
          <div className="max-w-[880px] mx-auto grid grid-cols-3 gap-2 sm:gap-6 text-center">
            {pillars.map(({ icon, label }) => (
              <div key={label} className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2">
                <Icon icon={icon} width={16} className="text-blue shrink-0" />
                <span className="text-[10px] sm:text-xs font-[800] uppercase tracking-[0.1em] text-mid leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* OFFERINGS */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              🛼 Choose your session
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex flex-col gap-4 max-w-[660px] mx-auto">
            {offerings.map((offering) => (
              <ProgrammeCard key={offering.id} {...offering} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
