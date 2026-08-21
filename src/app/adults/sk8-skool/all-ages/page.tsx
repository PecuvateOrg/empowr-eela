import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KidsReviewsCarousel from '@/components/KidsReviewsCarousel';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import RouteInfo from '@/components/RouteInfo';
import { LINKS } from '@/lib/links';
import { LADYWELL_ROUTE } from '@/lib/route-data';

export const metadata: Metadata = {
  title: 'Sk8 Skool for All Ages — Sk8 Skool',
  description:
    'Our progressive skating programme open to all ages with Empowr CIC — the same coached structure as Sk8 Skool for Kidz, for children and adults together, every Saturday.',
};

const chips = [
  { icon: 'mdi:clock-outline', label: '2:00–3:00 PM' },
  { icon: 'mdi:map-marker', label: 'The Ladywell Centre (indoors)' },
  { icon: 'mdi:account-group', label: 'All ages, 5+' },
];

const faqs: FaqItem[] = [
  {
    question: 'Who is Sk8 Skool for All Ages for?',
    answer:
      'This session is open to all ages from 5+ — children and adults can attend and skate together. It runs the same coached, progressive structure as Sk8 Skool for Kidz, just with a broader age range.',
  },
  {
    question: 'Is coaching included?',
    answer:
      'Yes. Sessions are coach-led, with skills demonstrated and broken down for participants of all ages and abilities.',
  },
  {
    question: 'Do I need to bring my own skates and protective equipment?',
    answer:
      'Yes, please bring your own roller skates. Protective equipment (helmet, wrist guards, elbow and knee pads) is strongly recommended, particularly for beginners.',
  },
  {
    question: 'Is there an age requirement or supervision policy?',
    answer:
      'Open to all ages from 5+. Under-18s attending must have parent or guardian consent, and younger children should be accompanied by a parent or guardian.',
  },
  {
    question: 'Do I need to book in advance?',
    answer:
      'We recommend booking in advance, as spaces are limited.',
  },
];

export default function Sk8SkoolAllAgesPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="max-w-[880px] mx-auto px-5 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Link
            href="/adults/sk8-skool"
            className="inline-flex items-center gap-1.5 text-sm font-[700] text-blue no-underline mb-6 hover:opacity-80 transition-opacity"
          >
            ← Sk8 Skool
          </Link>

          <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-3">
            Weekly Session · All Ages 5+
          </p>
          <h1
            className="font-[900] text-black leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Sk8 Skool<br />
            <span className="text-blue">for All Ages.</span>
          </h1>
          <p
            className="text-mid leading-[1.8] max-w-[560px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            A progressive skating programme open to all ages — the same coached structure
            as Sk8 Skool for Kidz, but with a broader age range so children and adults can
            learn and skate together, every Saturday.
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
              Every Saturday
            </p>
            <p className="relative text-white/90 font-[800] text-lg sm:text-xl mt-1">
              2:00 – 3:00 PM
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
          </div>
        </section>

        {/* BOOKING */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              🎟 Book your place
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div
            className="max-w-[420px] mx-auto rounded-[20px] bg-blue p-6 sm:p-8 flex flex-col items-center text-center"
            style={{ boxShadow: 'var(--shadow-blue)' }}
          >
            <Icon icon="mdi:roller-skate" width={36} className="text-white/80 mb-4" />
            <h2 className="text-[1.25rem] font-[900] text-white leading-[1.15] mb-1">
              Sk8 Skool for All Ages
            </h2>
            <p className="text-2xl font-[900] text-white mb-3">£12.50 / hour</p>
            <p className="text-sm text-white/80 leading-[1.7] mb-6">
              Every Saturday at The Ladywell Centre.
            </p>
            <a
              href={LINKS.kidzSaturdaySkate}
              target="_blank"
              rel="noopener"
              className="inline-block bg-white text-blue text-sm font-[800] px-8 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90"
            >
              Book now &rsaquo;
            </a>
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
          <KidsReviewsCarousel />
        </section>

        {/* FAQ */}
        <section className="max-w-[880px] mx-auto px-5 pb-8">
          <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-4">
            FAQ
          </p>
          <FaqAccordion items={faqs} />
        </section>

        {/* PLAN YOUR ROUTE */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-4">
            Plan Your Route
          </p>
          <RouteInfo {...LADYWELL_ROUTE} />
        </section>

      </main>

      <Footer />
    </>
  );
}
