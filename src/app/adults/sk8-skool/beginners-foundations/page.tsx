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
  title: 'Beginners Foundation — Sk8 Skool',
  description:
    'Our indoor beginners course with Empowr CIC — build balance, control and confidence from your first steps on skates.',
};

const pillars = [
  { icon: 'mdi:seed-outline', label: 'Entry level' },
  { icon: 'mdi:home-outline', label: 'Indoors, all weather' },
  { icon: 'mdi:account-group', label: 'Small, progressive classes' },
];

const chips = [
  { icon: 'mdi:calendar-clock', label: 'Every Tuesday · 7:30–9:30 PM' },
  { icon: 'mdi:swap-horizontal', label: 'Levels alternate each intake' },
  { icon: 'mdi:account-group', label: 'Complete beginners' },
];

// Both levels share the one Tuesday slot and alternate across the intake
// blocks, so a level only runs every other block. This list IS the schedule
// members plan around — without it "Level 1" is unbookable information,
// because the next Level 1 is five weeks after the next Level 2.
//
// Mirrors mem_course_runs in the Members platform (offering
// `beginners-foundation`). If these drift, Members is authoritative for what
// is actually bookable and `vaults/EMPOWR CIC/entities/sessions.md` is
// authoritative for what was agreed.
const intakeBlocks: { dates: string; level: 1 | 2 }[] = [
  { dates: '15 Sep – 6 Oct 2026', level: 2 },
  { dates: '20 Oct – 10 Nov 2026', level: 1 },
  { dates: '24 Nov – 15 Dec 2026', level: 2 },
  { dates: '5 Jan – 26 Jan 2027', level: 1 },
  { dates: '9 Feb – 2 Mar 2027', level: 2 },
  { dates: '9 Mar – 30 Mar 2027', level: 1 },
  { dates: '6 Apr – 27 Apr 2027', level: 2 },
];

const faqs: FaqItem[] = [
  {
    question: 'Is Beginners Foundation suitable for complete beginners?',
    answer:
      'Yes! Beginners Foundation is specifically designed for complete beginners and anyone who wants to improve their basic skating skills, confidence and control.',
  },
  {
    question: 'What will I learn during the course?',
    answer:
      "During the Beginners Foundation course, you'll learn:\nBubbles\nCrossovers\nTransitions\nBalance and control\nManuals\nPivots\n\nEach skill will be demonstrated and broken down into manageable steps, with time to practise and receive guidance from your coach.",
  },
  {
    question: 'Is coaching included?',
    answer:
      'Yes. Beginners Foundation is a structured course led by an Empowr coach. Each skill will be demonstrated and broken down into manageable steps, with time to practise and receive guidance.',
  },
  {
    question: 'Do I need to bring my own skates and protective equipment?',
    answer:
      'Yes, please bring your own roller skates. We strongly recommend wearing a helmet, wrist guards, elbow pads and knee pads, particularly while learning. Skate hire is not currently available unless otherwise stated on the booking page.',
  },
  {
    question: 'What is the age requirement?',
    answer:
      'Beginners Foundation is open to participants aged 15 and over. Anyone under 18 must provide the required consent from a parent or guardian.',
  },
  {
    question: 'Do I need to attend every week?',
    answer:
      'Yes. Beginners Foundation is delivered as a progressive course, with each class building on the skills covered during the previous week. We therefore recommend attending every scheduled class. Individual classes are sold as part of the block, so a missed class cannot be transferred, refunded or replaced. The course itself can be cancelled from your account up to 48 hours before it begins, for a full refund.',
  },
  {
    question: 'Do I need to complete both levels?',
    answer:
      "We recommend completing both Level 1 and Level 2 before attending Skate Jam, our open skate session — Skate Jam is the equivalent next step, and its pace and environment may feel overwhelming without these foundation skills in place first.\n\nBoth levels run on Tuesdays and alternate between intakes, so you take them one after the other rather than at the same time. Level 1 runs in one block and Level 2 in the next — see the intake dates above.",
  },
  {
    question: 'Can friends or family come to watch?',
    answer:
      'Unfortunately, non-skating spectators are not permitted on-site because the venue does not have adequate space to safely accommodate spectators during the course.',
  },
];

export default function BeginnersFoundationsPage() {
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
            Indoor Course · Ages 15+
          </p>
          <h1
            className="font-[900] text-black leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Beginners<br />
            <span className="text-blue">Foundations.</span>
          </h1>
          <p
            className="text-mid leading-[1.8] max-w-[560px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            Never skated before, or want to go back to basics? Beginners Foundation takes
            you from your first steps on skates through bubbles, crossovers, transitions,
            balance, manuals and pivots — one skill at a time, with a coach alongside you.
          </p>
        </section>

        {/* PILLARS */}
        <div className="border-y border-border bg-blue-pale/60 py-4 px-5 mb-8">
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

        {/* BOOKING OPTIONS */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              🎟 The two levels
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Level 1 — Tuesdays, odd intake blocks */}
            <div
              className="rounded-[20px] bg-card border border-border p-6 sm:p-8 flex flex-col"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <Icon icon="mdi:numeric-1-circle" width={36} className="text-blue mb-4" />
              <span className="text-[10px] font-[800] uppercase tracking-[0.18em] text-muted mb-2">
                Next intake: Tue 20 Oct 2026
              </span>
              <h2 className="text-[1.25rem] font-[900] text-black leading-[1.15] mb-1">
                Level 1
              </h2>
              <p className="text-2xl font-[900] text-red mb-3">£55 / course</p>
              <p className="text-sm text-mid leading-[1.7] mb-2 flex-1">
                Suitable for complete beginners or improvers who are learning and developing
                the basic foundations of roller skating.
              </p>
              <a
                href={LINKS.beginnersFoundations}
                target="_blank"
                rel="noopener"
                className="inline-block bg-blue text-warm-white text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start"
                style={{ boxShadow: 'var(--shadow-blue)' }}
              >
                Book now &rsaquo;
              </a>
            </div>

            {/* Level 2 — Tuesdays, even intake blocks */}
            <div
              className="rounded-[20px] bg-blue p-6 sm:p-8 flex flex-col"
              style={{ boxShadow: 'var(--shadow-blue)' }}
            >
              <Icon icon="mdi:numeric-2-circle" width={36} className="text-white/80 mb-4" />
              <span className="text-[10px] font-[800] uppercase tracking-[0.18em] text-white/60 mb-2">
                Next intake: Tue 15 Sep 2026
              </span>
              <h2 className="text-[1.25rem] font-[900] text-white leading-[1.15] mb-1">
                Level 2
              </h2>
              <p className="text-2xl font-[900] text-white mb-3">£55 / course</p>
              <p className="text-sm text-white/80 leading-[1.7] mb-2 flex-1">
                Suitable for advanced beginners or those who have completed Level 1. This level
                focuses on combining your foundations and developing them into more controlled
                skills and movement.
              </p>
              <a
                href={LINKS.beginnersFoundations}
                target="_blank"
                rel="noopener"
                className="inline-block bg-white text-blue text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start"
              >
                Book now &rsaquo;
              </a>
            </div>

          </div>

          <p className="text-sm text-mid text-center mt-6">
            {/*
              The missed-class rule below was already accurate — a course is
              sold as a block (Programme Policies v1.2 §5). What was missing,
              until 2026-09-17, is that the COURSE can be cancelled: up to 48
              hours before it begins, not before a given class. The two read
              alike and mean different things. Source: vaults/EMPOWR CIC/
              entities/sessions.md, "Cancellation & Refund Policy".
            */}
            Both levels run on Tuesdays at Honor Oak Community Centre and alternate between
            intakes, so only one level runs at a time. Missed classes cannot be transferred
            or refunded, but you can cancel the whole course from your account up to 48
            hours before it begins.
          </p>
        </section>

        {/* INTAKE DATES */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              📅 2026/27 intake dates
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <ul className="rounded-[20px] bg-card border border-border overflow-hidden">
            {intakeBlocks.map(({ dates, level }, i) => (
              <li
                key={dates}
                className={`flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7 ${
                  i > 0 ? 'border-t border-border' : ''
                }`}
              >
                <span className="text-sm font-[700] text-mid">{dates}</span>
                <span
                  className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-[800] ${
                    level === 2 ? 'bg-blue text-warm-white' : 'bg-blue-pale text-blue'
                  }`}
                >
                  Level {level}
                </span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-mid text-center mt-6">
            Every block is four weeks, Tuesdays 7:30–9:30 PM. Taking both levels means
            two blocks — for example Level 1 from 20 October, then Level 2 from 24 November.
          </p>
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
