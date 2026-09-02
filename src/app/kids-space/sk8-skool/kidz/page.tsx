import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sk8SkoolClassReviewsCarousel from '@/components/Sk8SkoolClassReviewsCarousel';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import { LINKS } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Sk8 Skool for Kidz — Sk8 Skool',
  description:
    'Weekly roller skating classes for children aged 5-12 with Empowr CIC, taught by ECCP Certified coaches — Monday and Wednesday sessions.',
};

const pillars = [
  { icon: 'mdi:school',        label: 'Ages 5–12' },
  { icon: 'mdi:account-group', label: 'ECCP Certified coaches' },
  { icon: 'mdi:shield-check',  label: 'Quad skates only' },
];

const faqs: FaqItem[] = [
  {
    question: 'What age is Sk8 Skool for Kidz suitable for?',
    answer:
      'Sk8 Skool for Kidz is designed for children aged 5 to 12, and welcomes complete beginners.',
  },
  {
    question: 'Is coaching included?',
    answer:
      'Yes. Classes are led by ECCP Certified coaches, with skills demonstrated and broken down step by step for beginners.',
  },
  {
    question: "What's the difference between the Monday and Wednesday sessions?",
    answer:
      'Both cover the same Sk8 Skool for Kidz programme. Monday runs indoors at Goldsmiths Community Centre year-round. Wednesday runs outdoors at the Sports Field from April to August, then moves indoors to Honor Oak Community Centre for the rest of the year.',
  },
  {
    question: 'Is there a membership option?',
    answer:
      'Yes. Alongside paying £10 per session, you can subscribe for £30/month for ongoing access to Sk8 Skool for Kidz without booking each date individually.',
  },
  {
    question: 'Do I need to bring my own skates and protective equipment?',
    answer:
      'Yes, please bring your own quad roller skates — inline skates are not permitted. Full protective equipment (helmet, wrist guards, elbow and knee pads) is required.',
  },
  {
    question: 'Do I need to book in advance?',
    answer:
      'We recommend booking in advance, as spaces are limited.',
  },
];

export default function Sk8SkoolKidzPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="max-w-[880px] mx-auto px-5 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Link
            href="/kids-space/sk8-skool"
            className="inline-flex items-center gap-1.5 text-sm font-[700] text-blue no-underline mb-6 hover:opacity-80 transition-opacity"
          >
            ← Sk8 Skool
          </Link>

          <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-3">
            Weekly Classes · Ages 5–12
          </p>
          <h1
            className="font-[900] text-black leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Sk8 Skool<br />
            <span className="text-blue">for Kidz.</span>
          </h1>
          <p
            className="text-mid leading-[1.8] max-w-[600px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            A progressive skating programme delivered by ECCP Certified coaches — building
            balance, coordination, confidence and a love of movement. Choose the day that
            works best for your family.
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

        {/* BOOKING OPTIONS */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              🎟 Choose your day
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Monday — indoors */}
            <div
              className="rounded-[20px] bg-card border border-border p-6 sm:p-8 flex flex-col"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <Icon icon="mdi:calendar-week" width={36} className="text-blue mb-4" />
              <span className="text-[10px] font-[800] uppercase tracking-[0.18em] text-muted mb-2">
                Every Monday · 4–5 PM
              </span>
              <h2 className="text-[1.25rem] font-[900] text-black leading-[1.15] mb-1">
                Monday Class
              </h2>
              <p className="text-2xl font-[900] text-red mb-1">£10 / session</p>
              <p className="text-xs font-[700] text-mid mb-3">or{' '}
                <a href={`${LINKS.kidzMondayClasses}#subscribe`} target="_blank" rel="noopener" className="text-blue underline">£30/mo unlimited Mondays</a>{' '}
                — cancel anytime</p>
              <p className="text-sm text-mid leading-[1.7] mb-2 flex-1">
                Indoors, all weather. Goldsmiths Community Centre, Castillon Road.
              </p>
              <a
                href={LINKS.kidzMondayClasses}
                target="_blank"
                rel="noopener"
                className="inline-block bg-blue text-warm-white text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start"
                style={{ boxShadow: 'var(--shadow-blue)' }}
              >
                Book now &rsaquo;
              </a>
            </div>

            {/* Wednesday — outdoors */}
            <div
              className="rounded-[20px] bg-blue p-6 sm:p-8 flex flex-col"
              style={{ boxShadow: 'var(--shadow-blue)' }}
            >
              <Icon icon="mdi:calendar-week" width={36} className="text-white/80 mb-4" />
              <span className="text-[10px] font-[800] uppercase tracking-[0.18em] text-white/60 mb-2">
                Every Wednesday · 5–6 PM
              </span>
              <h2 className="text-[1.25rem] font-[900] text-white leading-[1.15] mb-1">
                Wednesday Class
              </h2>
              <p className="text-2xl font-[900] text-white mb-1">£10 / session</p>
              <p className="text-xs font-[700] text-white/70 mb-3">or{' '}
                <a href={`${LINKS.kidzWednesdayClasses}#subscribe`} target="_blank" rel="noopener" className="text-white underline">£30/mo unlimited Wednesdays</a>{' '}
                — cancel anytime</p>
              <p className="text-sm text-white/80 leading-[1.7] mb-2 flex-1">
                Outdoors, Sports Field SE4 2HU, April–August. Moves indoors to Honor Oak
                Community Centre for the rest of the year.
              </p>
              <a
                href={LINKS.kidzWednesdayClasses}
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
              What parents are saying
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>
          <Sk8SkoolClassReviewsCarousel />
        </section>

        {/* FAQ */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-4">
            FAQ
          </p>
          <FaqAccordion items={faqs} />
        </section>

      </main>

      <Footer />
    </>
  );
}
