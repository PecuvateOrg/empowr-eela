import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkateJamReviewsCarousel from '@/components/SkateJamReviewsCarousel';
import SkateJamFaq from '@/components/SkateJamFaq';
import { LINKS } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Skate Jam — Adults',
  description:
    'Our weekly open skate session with Empowr CIC — music, games, and floor time for all levels, every Thursday evening.',
};

const chips = [
  { icon: 'mdi:calendar-range', label: 'Sept 3 – Mar 25' },
  { icon: 'mdi:clock-outline', label: '8:45–10:45 PM' },
  { icon: 'mdi:account-group', label: 'All levels' },
];

export default function SkateJamPage() {
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
            Weekly Session · Ages 8+
          </p>
          <h1
            className="font-[900] text-black leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Skate Jam.
          </h1>
          <p
            className="text-mid leading-[1.8] max-w-[560px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            Our weekly open skate session — music, games, and floor time for all levels.
            Turn up every Thursday evening from September through to March, whether you&apos;re
            dropping in once or skating all season.
          </p>
        </section>

        {/* SCHEDULE BANNER */}
        <section className="max-w-[880px] mx-auto px-5 mb-6">
          <div
            className="relative overflow-hidden rounded-[20px] bg-blue-dark py-10 px-6 flex flex-col items-center justify-center text-center"
            style={{ boxShadow: 'var(--shadow-blue)' }}
          >
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(-45deg, #fff 0, #fff 2px, transparent 2px, transparent 18px)',
              }}
            />
            <Icon icon="mdi:clock-outline" width={40} className="text-white/85 mb-3 relative" />
            <p className="relative text-white font-[900] text-xl sm:text-2xl tracking-[0.02em] leading-tight">
              Every Thursday
            </p>
            <p className="relative text-white/90 font-[800] text-lg sm:text-xl mt-1">
              8:45 – 10:45 PM
            </p>
          </div>
        </section>

        {/* INFO CHIPS */}
        <section className="max-w-[880px] mx-auto px-5 pb-10">
          <div className="flex flex-wrap gap-3">
            {chips.map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-[700] text-mid"
              >
                <Icon icon={icon} width={16} className="text-blue shrink-0" />
                {label}
              </span>
            ))}
            <span className="inline-flex items-center gap-2 rounded-full bg-red text-warm-white px-4 py-2 text-sm font-[800]">
              <Icon icon="mdi:calendar-week" width={16} className="shrink-0" />
              Every Thursday
            </span>
          </div>
        </section>

        {/* BOOKING OPTIONS */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              🎟 Choose your booking
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Pay As You Go */}
            <div
              className="rounded-[20px] bg-card border border-border p-6 sm:p-8 flex flex-col"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <Icon icon="mdi:ticket-outline" width={36} className="text-blue mb-4" />
              <h2 className="text-[1.25rem] font-[900] text-black leading-[1.15] mb-1">
                Pay As You Go
              </h2>
              <p className="text-2xl font-[900] text-red mb-3">£10</p>
              <p className="text-sm text-mid leading-[1.7] mb-6 flex-1">
                Single session, book week to week. No commitment.
              </p>
              <a
                href={LINKS.skateJam}
                target="_blank"
                rel="noopener"
                className="inline-block bg-blue text-warm-white text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start"
                style={{ boxShadow: 'var(--shadow-blue)' }}
              >
                Book now &rsaquo;
              </a>
            </div>

            {/* Skate Jam Membership */}
            <div
              className="rounded-[20px] bg-blue p-6 sm:p-8 flex flex-col"
              style={{ boxShadow: 'var(--shadow-blue)' }}
            >
              <Icon icon="mdi:star-circle" width={36} className="text-white/80 mb-4" />
              <h2 className="text-[1.25rem] font-[900] text-white leading-[1.15] mb-1">
                Skate Jam Membership
              </h2>
              <p className="text-2xl font-[900] text-white mb-3">£25/mo</p>
              <p className="text-sm text-white/80 leading-[1.7] mb-6 flex-1">
                Unlimited Thursdays for the month. Cancel anytime.
              </p>
              <a
                href={LINKS.skateJam}
                target="_blank"
                rel="noopener"
                className="inline-block bg-white text-blue text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start"
              >
                Book now &rsaquo;
              </a>
            </div>

          </div>
        </section>

        {/* REVIEWS */}
        <section className="max-w-6xl mx-auto px-6 pb-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              What our community says
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>
          <SkateJamReviewsCarousel />
        </section>

        {/* FAQ — scaffold only, placeholder copy pending real answers */}
        <SkateJamFaq />

      </main>

      <Footer />
    </>
  );
}
