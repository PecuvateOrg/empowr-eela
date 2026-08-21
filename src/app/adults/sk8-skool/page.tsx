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
  title: 'Sk8 Skool — Adults',
  description:
    'Sk8 Skool with Empowr CIC — Beginners Foundations, Synkron8, and Skate Jam. Three ways to learn, build confidence, and skate, all 15+.',
};

const pillars = [
  { icon: 'mdi:school',        label: 'Beginners to advanced' },
  { icon: 'mdi:account-group', label: 'Community led' },
  { icon: 'mdi:shield-check',  label: 'Trusted by thousands' },
];

interface SkoolOption {
  id: string;
  icon: string;
  badge: string;
  title: string;
  price: string;
  priceNote?: string;
  blurb: string;
  bookingUrl: string;
}

const options: SkoolOption[] = [
  {
    id: 'beginners-foundations',
    icon: 'mdi:seed-outline',
    badge: 'Course · Next intake Sept 2026',
    title: 'Beginners Foundations',
    price: '£55 / course',
    priceNote: 'Indoors. Missed classes cannot be transferred or refunded.',
    blurb:
      'Never skated before, or want to go back to basics? A progressive, coach-led course from your first steps through bubbles, crossovers, transitions, balance, manuals and pivots.',
    bookingUrl: LINKS.beginnersFoundations,
  },
  {
    id: 'synkron8',
    icon: 'mdi:music-note',
    badge: 'Every Monday · 8:30–10:30 PM',
    title: 'Synkron8',
    price: '£15 / session',
    priceNote: 'Non-refundable and non-transferable.',
    blurb:
      'Our weekly roller-dance class — routines, flow, and line-dance-style skating. Learn individual moves, then link them into sequences with the group.',
    bookingUrl: LINKS.synkron8,
  },
  {
    id: 'skate-jam',
    icon: 'mdi:roller-skate',
    badge: 'Every Thursday · 8:45–10:45 PM',
    title: 'Skate Jam',
    price: '£10 / session',
    priceNote: 'Or £25/mo unlimited membership — same booking link.',
    blurb:
      'Our weekly open skate session — music, games, and floor time for all levels. Turn up once, or skate all season from September through March.',
    bookingUrl: LINKS.skateJam,
  },
];

const faqs: FaqItem[] = [
  {
    question: 'Which session should I start with?',
    answer:
      "If you're a complete beginner, start with Beginners Foundations or a Synkron8 session to build the basics. Skate Jam is open to all levels, but complete beginners will get the most out of it after some foundational practice first.",
  },
  {
    question: 'What will I learn during Beginners Foundations?',
    answer:
      "Bubbles\nCrossovers\nTransitions\nBalance and control\nManuals\nPivots\n\nEach skill is demonstrated and broken down into manageable steps, with time to practise and receive guidance from your coach.",
  },
  {
    question: 'Is coaching included?',
    answer:
      'Beginners Foundations and Synkron8 are structured, coach-led sessions — each skill or routine is demonstrated and broken down for you. Skate Jam is an open practice session; volunteers are on hand to offer quick guidance and support rather than formal coaching.',
  },
  {
    question: 'Do I need to bring my own skates and protective equipment?',
    answer:
      'Yes, please bring your own roller skates to all three sessions. Protective equipment is strongly recommended, particularly for beginners. Skate hire is not currently available unless otherwise stated on the booking page.',
  },
  {
    question: 'What is the age requirement?',
    answer:
      'All three sessions are open to skaters aged 15 and over. Anyone under 18 must provide the required consent from a parent or guardian.',
  },
  {
    question: 'Do I need to book in advance?',
    answer:
      'We recommend booking in advance for all three sessions, as spaces are limited. For Skate Jam, if a session is not fully booked you may be able to pay at the door, though an additional fee will apply — Beginners Foundations and Synkron8 should be booked ahead via their booking page.',
  },
  {
    question: 'What if I miss a session?',
    answer:
      'Beginners Foundations is a progressive course — each class builds on the last, so we recommend attending every scheduled session; missed classes cannot be transferred, refunded or replaced. Synkron8 and Skate Jam are pay-as-you-go, so there is no ongoing commitment if you miss a week.',
  },
  {
    question: 'Can friends or family come to watch?',
    answer:
      'Unfortunately, non-skating spectators are not permitted on-site at any of the three sessions, as the venue does not have adequate space to safely accommodate spectators.',
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
            Learn · Ages 15+
          </p>
          <h1
            className="font-[900] text-black leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Sk8 Skool.
          </h1>
          <p
            className="text-mid leading-[1.8] max-w-[640px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            Three ways to learn, build confidence, and skate — from your first steps through
            to open practice. Choose a coach-led course, a weekly roller-dance class, or a
            community open-skate session, all at Honor Oak Community Centre.
          </p>
        </section>

        {/* PILLARS */}
        <div className="border-y border-border bg-blue-pale/60 py-4 px-5 mb-10">
          <div className="max-w-[880px] mx-auto grid grid-cols-3 gap-2 sm:gap-6 text-center">
            {pillars.map(({ icon, label }) => (
              <div
                key={label}
                className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2"
              >
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
              🛼 Choose your session
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {options.map((option) => (
              <div
                key={option.id}
                className="rounded-[20px] bg-card border border-border p-6 flex flex-col"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <Icon icon={option.icon} width={32} className="text-blue mb-4" />
                <span className="text-[10px] font-[800] uppercase tracking-[0.15em] text-muted mb-2">
                  {option.badge}
                </span>
                <h2 className="text-[1.1rem] font-[900] text-black leading-[1.15] mb-1">
                  {option.title}
                </h2>
                <p className="text-xl font-[900] text-red mb-3">{option.price}</p>
                <p className="text-sm text-mid leading-[1.7] mb-4 flex-1">{option.blurb}</p>
                {option.priceNote && (
                  <p className="text-xs text-muted leading-[1.6] mb-4">{option.priceNote}</p>
                )}
                <a
                  href={option.bookingUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-block bg-blue text-warm-white text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start"
                  style={{ boxShadow: 'var(--shadow-blue)' }}
                >
                  Book now &rsaquo;
                </a>
              </div>
            ))}
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
