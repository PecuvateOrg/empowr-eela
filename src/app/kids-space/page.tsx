import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProgrammeCard from '@/components/ProgrammeCard';
import FindSessionBanner from '@/components/FindSessionBanner';
import KidsReviewsCarousel from '@/components/KidsReviewsCarousel';
import { kidsProgrammes } from '@/lib/kids-programmes';

export const metadata: Metadata = {
  title: 'Kids Space — Roller Skating for Children',
  description:
    'Roller skating classes, camps, discos and more for children aged 5+ with Empowr CIC. Safe, fun, expert-coached sessions.',
};

const pillars = [
  { icon: <Icon icon="mdi:shield-check" width={16} className="text-blue shrink-0" />,  label: 'Safe environment' },
  { icon: <Icon icon="mdi:account-group" width={16} className="text-blue shrink-0" />, label: 'ECCP Certified coaches' },
  { icon: <Icon icon="mdi:star-circle" width={16} className="text-blue shrink-0" />,   label: 'Fun guaranteed' },
];

export default function KidsSpacePage() {
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
                Children · Ages 5+
              </p>
              <h1 className="font-[900] text-black leading-[1.08] mb-4"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                Roller skating<br />
                <span className="text-blue">for kids & family.</span>
              </h1>
              <p className="text-mid leading-[1.8] mb-6"
                 style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}>
                Kidz Space is where children discover the joy of roller skating — through classes,
                camps, discos and more, in a safe, fun and welcoming environment.
              </p>
              <p className="text-[13px] font-[800] uppercase tracking-[0.1em] text-mid italic">
                Live by growing. Grow by learning. Learn by doing.
              </p>
            </div>

            <div className="relative rounded-[20px] overflow-hidden h-[240px] sm:h-[300px]">
              <Image
                src="/assets/kidz.jpeg"
                alt="Children roller skating at Empowr CIC Kidz Space"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 440px"
                priority
              />
              <div className="absolute top-3 right-3 bg-red text-warm-white font-[900] text-center px-3 py-2.5 rounded-xl leading-[1.3]"
                   style={{ fontSize: '10px' }}>
                Kidz Space<br />
                <span className="text-xl leading-[1.1] block">5+</span>
              </div>
            </div>
          </div>
        </section>

        {/* PILLARS */}
        <div className="border-y border-border bg-blue-pale/60 py-4 px-5 mb-10">
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
              🛼 Choose your session
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex flex-col gap-4 max-w-[660px] mx-auto">
            {kidsProgrammes.map((programme) => (
              <ProgrammeCard key={programme.id} {...programme} />
            ))}
          </div>
        </section>

        {/* REVIEWS */}
        <section className="max-w-6xl mx-auto px-6 pb-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              What parents are saying
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>
          <KidsReviewsCarousel />
        </section>

        <FindSessionBanner />
      </main>

      <Footer />
    </>
  );
}
