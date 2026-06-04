import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProgrammeCard from '@/components/ProgrammeCard';
import FindSessionBanner from '@/components/FindSessionBanner';
import { LINKS } from '@/lib/links';
import type { Programme } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Roller Skating for Adults',
  description:
    'Adult and teen roller skating sessions with Empowr CIC. Sk8 Skool, Synkron8, Skate Jam, Roller Disco, and community events — all 15+.',
};

const programmes: Programme[] = [
  {
    id: 'sk8-skool',
    tag: 'Learn (15+)',
    tagColor: 'text-blue',
    title: 'Sk8 Skool',
    icon: <Icon icon="mdi:school" width={36} height={36} className="text-blue" />,
    bullets: ['Learn at your pace', 'Build skills & confidence', 'Fun, supportive coaching'],
    bookingUrl: LINKS.sk8Skool,
  },
  {
    id: 'synkron8',
    tag: 'Dance (15+)',
    tagColor: 'text-blue-dark',
    title: 'Synkron8',
    icon: <Icon icon="mdi:music-note" width={36} height={36} className="text-blue-dark" />,
    bullets: ['Music & movement', 'Learn routines', 'Get fit & have fun'],
    bookingUrl: LINKS.synkron8,
  },
  {
    id: 'skate-jam',
    tag: 'Practise (15+)',
    tagColor: 'text-blue-light',
    title: 'Skate Jam',
    icon: <Icon icon="mdi:roller-skate" width={36} height={36} className="text-blue-light" />,
    bullets: ['Open skate time', 'Improve your skills', 'Skate & connect'],
    bookingUrl: LINKS.skateJam,
  },
  {
    id: 'all-ages',
    tag: 'All ages',
    tagColor: 'text-blue',
    title: 'Sk8 Skool & Roller Disco',
    icon: <Icon icon="mdi:human-male-female-child" width={36} height={36} className="text-blue" />,
    bullets: ['Family friendly', 'Fun for all ages', 'Roller Disco nights!'],
    bookingUrl: LINKS.allAges,
  },
  {
    id: 'roller-skate-events',
    tag: 'Connect (15+)',
    tagColor: 'text-blue-dark',
    title: 'Roller Skate Events',
    icon: <Icon icon="mdi:calendar-star" width={36} height={36} className="text-blue-dark" />,
    bullets: ["SK8 DJ's", 'Hot food & refreshments', 'Meet skaters'],
    bookingUrl: LINKS.rollerSkateEvents,
  },
];

const pillars = [
  { icon: <Icon icon="mdi:school" width={16} className="text-blue shrink-0" />,         label: 'Beginners to advanced' },
  { icon: <Icon icon="mdi:account-group" width={16} className="text-blue shrink-0" />,  label: 'Community led' },
  { icon: <Icon icon="mdi:shield-check" width={16} className="text-blue shrink-0" />,   label: 'Trusted by thousands' },
];

export default function AdultsPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="max-w-[880px] mx-auto px-5 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-[700] text-blue no-underline mb-6 hover:opacity-80 transition-opacity"
          >
            ← All sessions
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-3">
                Adults · 15+
              </p>
              <h1 className="font-[900] text-black leading-[1.08] mb-4"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                Roller skating<br />
                <span className="text-blue">for adults.</span>
              </h1>
              <p className="text-mid leading-[1.8] mb-6"
                 style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}>
                Whether you&apos;re new to skating, returning after years away, or want a
                safe and fun space to learn and connect — there&apos;s a session for you.
              </p>
              <p className="text-[13px] font-[800] uppercase tracking-[0.1em] text-mid italic">
                Live by growing. Grow by learning. Learn by doing.
              </p>
            </div>

            <div className="relative rounded-[20px] overflow-hidden h-[240px] sm:h-[300px]">
              <Image
                src="/assets/adults-learning.jpeg"
                alt="Adults roller skating at Empowr CIC"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 440px"
                priority
              />
              <div className="absolute top-3 right-3 bg-red text-warm-white font-[900] text-center px-3 py-2.5 rounded-xl leading-[1.3]"
                   style={{ fontSize: '10px' }}>
                Adults<br />
                <span className="text-xl leading-[1.1] block">15+</span>
              </div>
            </div>
          </div>
        </section>

        {/* PILLARS */}
        <div className="border-y border-border bg-blue-pale/60 py-4 px-5 mb-8">
          <div className="max-w-[880px] mx-auto grid grid-cols-3 gap-2 sm:gap-6 text-center">
            {pillars.map(({ icon, label }) => (
              <div key={label} className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2">
                {icon}
                <span className="text-[10px] sm:text-xs font-[800] uppercase tracking-[0.1em] text-mid leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PROGRAMME CARDS */}
        <section className="max-w-[880px] mx-auto px-5 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              🛼 Choose your path
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex flex-col gap-4 max-w-[660px] mx-auto">
            {programmes.map((programme) => (
              <ProgrammeCard key={programme.id} {...programme} />
            ))}
          </div>
        </section>

        <FindSessionBanner />
      </main>

      <Footer />
    </>
  );
}
