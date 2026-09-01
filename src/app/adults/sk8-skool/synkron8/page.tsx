import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdultsReviewsCarousel from '@/components/AdultsReviewsCarousel';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import RouteInfo from '@/components/RouteInfo';
import { LINKS } from '@/lib/links';
import { HONOR_OAK_ROUTE } from '@/lib/route-data';

export const metadata: Metadata = {
  title: 'Synkron8 — Sk8 Skool',
  description:
    'Our weekly roller-dance class with Empowr CIC — routines, flow, and line-dance-style skating for all levels, every Monday evening.',
};

const chips = [
  { icon: 'mdi:clock-outline', label: '8:30–10:30 PM' },
  { icon: 'mdi:account-group', label: 'All levels' },
];

const faqs: FaqItem[] = [
  {
    question: 'Is Synkron8 suitable for complete beginners?',
    answer:
      'Yes! Synkron8 welcomes complete beginners and skaters of all abilities. The class helps you develop your balance, coordination and confidence through simple roller-dance movements and routines.',
  },
  {
    question: 'What happens during a Synkron8 class?',
    answer:
      "During each class, you'll learn roller-dance steps and practise them as part of a group routine. We work on one main routine each month, alongside a shorter four-move challenge.",
  },
  {
    question: 'Is coaching included?',
    answer:
      'Yes. Synkron8 is a guided roller-dance class. Our team will demonstrate each movement, break down the routine and support you as you practise.',
  },
  {
    question: 'Do I need to bring my own skates and protective equipment?',
    answer:
      'Yes, please bring your own roller skates. Protective equipment is strongly recommended, particularly for beginners. Skate hire is not currently available unless otherwise stated on the booking page.',
  },
  {
    question: 'What is the age requirement?',
    answer:
      'Synkron8 is open to skaters aged 15 and over. Anyone under 18 must provide consent from a parent or guardian.',
  },
  {
    question: 'Do I need to book in advance?',
    answer:
      'Yes, we recommend booking in advance because spaces are limited. You can attend using a Synkron8 membership or purchase a pay-as-you-go session, subject to availability.',
  },
  {
    question: 'Can friends or family come to watch?',
    answer:
      'Unfortunately, non-skating spectators are not permitted on-site because the venue does not have adequate space to safely accommodate spectators during the class.',
  },
];

export default function Synkron8Page() {
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
            Weekly Session · Ages 15+
          </p>
          <h1
            className="font-[900] text-black leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Synkron8.
          </h1>
          <p
            className="text-mid leading-[1.8] max-w-[560px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            Our weekly roller-dance class — routines, flow, and line-dance-style skating.
            Learn individual moves, then link them into sequences with the group, every
            Monday evening. Session recordings provided to help you track your progress.
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
              Every Monday
            </p>
            <p className="relative text-white/90 font-[800] text-lg sm:text-xl mt-1">
              8:30 – 10:30 PM
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
              Every Monday
            </span>
          </div>
        </section>

        {/* BOOKING */}
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
              <p className="text-2xl font-[900] text-red mb-3">£15 / session</p>
              <p className="text-sm text-mid leading-[1.7] mb-6 flex-1">
                2 hours, book week to week. Non-refundable and non-transferable.
              </p>
              <a
                href={LINKS.synkron8}
                target="_blank"
                rel="noopener"
                className="inline-block bg-blue text-warm-white text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start"
                style={{ boxShadow: 'var(--shadow-blue)' }}
              >
                Book now &rsaquo;
              </a>
            </div>

            {/* Synkron8 Membership */}
            <div
              className="rounded-[20px] bg-blue p-6 sm:p-8 flex flex-col"
              style={{ boxShadow: 'var(--shadow-blue)' }}
            >
              <Icon icon="mdi:star-circle" width={36} className="text-white/80 mb-4" />
              <h2 className="text-[1.25rem] font-[900] text-white leading-[1.15] mb-1">
                Synkron8 Membership
              </h2>
              <p className="text-2xl font-[900] text-white mb-3">£45/mo</p>
              <p className="text-sm text-white/80 leading-[1.7] mb-6 flex-1">
                Unlimited Mondays for the month. Cancel anytime.
              </p>
              <a
                href={LINKS.membersSubscribe}
                target="_blank"
                rel="noopener"
                className="inline-block bg-white text-blue text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start"
              >
                Subscribe &rsaquo;
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
          <AdultsReviewsCarousel />
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
          <RouteInfo {...HONOR_OAK_ROUTE} />
        </section>

      </main>

      <Footer />
    </>
  );
}
