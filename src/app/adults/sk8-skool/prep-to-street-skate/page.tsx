import type { Metadata } from 'next';
import SessionJsonLd from '@/components/SessionJsonLd';
import LiveBooking from '@/components/LiveBooking';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import { LINKS } from '@/lib/links';
import { liveDates } from '@/lib/live-sessions';

// Hourly, for the live dates in SessionJsonLd and LiveBooking (LIVE_REVALIDATE).
export const revalidate = 3600;

// Facts (days, parks, price, ages, cancellation, the pathway) from
// vaults/EMPOWR CIC/entities/sessions.md, "Outside Skating Pathway". Block
// dates are read live from Members (offering `prep-to-street-skate`, one
// course run per level per block; run labels start "Level 1" / "Level 2").

export const metadata: Metadata = {
  title: 'Prep to Street Skate — Sk8 Skool',
  description:
    'Outdoor skating course with Empowr CIC — two levels in Southwark Park and Dulwich Park that build the confidence and experience you need for street skating. Ages 15+.',
};

const pillars = [
  { icon: 'mdi:tree-outline', label: 'Outdoors, in the park' },
  { icon: 'mdi:stairs-up', label: 'Two progressive levels' },
  { icon: 'mdi:road-variant', label: 'Ready for street skating' },
];

const chips = [
  { icon: 'mdi:calendar-range', label: 'Summer 2027 · May to August' },
  { icon: 'mdi:clock-outline', label: 'Evenings · 7–9 PM' },
  { icon: 'mdi:account', label: 'Ages 15+' },
];

const levels = [
  {
    level: 1 as const,
    day: 'Thursdays',
    park: 'Southwark Park, Southwark Park Road, London SE16',
    blocks: ['6 – 27 May 2027', '10 Jun – 1 Jul 2027', '15 Jul – 5 Aug 2027'],
    text: 'Your first step outdoors: take the skills you built indoors onto park paths, with a coach alongside you.',
  },
  {
    level: 2 as const,
    day: 'Wednesdays',
    park: 'Dulwich Park, College Road, London SE21 7EB',
    blocks: ['5 – 26 May 2027', '9 – 30 Jun 2027', '14 Jul – 4 Aug 2027'],
    text: 'For skaters who have done Level 1 or are already comfortable outdoors — more distance, more confidence, closer to the street.',
  },
];

const faqs: FaqItem[] = [
  {
    question: 'What is Prep to Street Skate?',
    answer:
      "It's the outdoor part of Sk8 Skool: two coached levels, skated in the park, that build the preparation, confidence and experience you need before street skating. Level 1 was previously called Beginners Outside and Level 2 Prep to Street Skating.",
  },
  {
    question: 'When does it run?',
    answer:
      'It is a summer course. In 2027 each level runs three four-week blocks between May and August, 7–9 PM: Level 1 on Thursdays in Southwark Park and Level 2 on Wednesdays in Dulwich Park. You can book a block now.',
  },
  {
    question: 'Do I need to be able to skate already?',
    answer:
      "Yes. This course assumes the balance and control you get from our indoor pathway. If you're new to skating, start with Beginners Foundation first.",
  },
  {
    question: 'What comes after Level 2?',
    answer:
      'Beginner Street Skate (Level 3): a free 14-week street skate on Tuesday evenings over the summer, booked separately rather than on our booking site. We recommend completing Levels 1 and 2 first — skaters without the required ability may be turned away.',
  },
  {
    question: 'What do I need to bring?',
    answer:
      'Your own quad skates. Protective gear is mandatory for anyone under 16 — a skater under 16 who arrives without it cannot take part — and strongly recommended for everyone else.',
  },
  {
    question: 'Can I cancel or miss a week?',
    answer:
      'You can cancel the whole course from your account up to 48 hours before it begins, for a full refund. Classes are sold as a block, so a missed class cannot be moved, refunded or replaced.',
  },
];

export default async function PrepToStreetSkatePage() {
  const [l1, l2] = await Promise.all([
    liveDates('prep-to-street-skate', 3, 'Level 1'),
    liveDates('prep-to-street-skate', 3, 'Level 2'),
  ]);
  const dates = { 1: l1, 2: l2 };

  return (
    <>
      <Navbar />
      <SessionJsonLd offering="prep-to-street-skate" path="/adults/sk8-skool/prep-to-street-skate" />

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
            Outdoor Course · Ages 15+
          </p>
          <h1
            className="font-[900] text-black leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Prep to<br />
            <span className="text-blue">Street Skate.</span>
          </h1>
          <p
            className="text-mid leading-[1.8] max-w-[560px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            Ready to take your skating outside? Prep to Street Skate is our summer outdoor
            course: two coached levels in South London parks that build the preparation,
            confidence and experience you need for street skating. The 2027 blocks run from
            May to August — and you can book now.
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

        {/* THE TWO LEVELS */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              🎟 The two levels
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {levels.map(({ level, day, park, blocks, text }) => {
              const dark = level === 2;
              return (
                <div
                  key={level}
                  className={`rounded-[20px] p-6 sm:p-8 flex flex-col ${dark ? 'bg-blue' : 'bg-card border border-border'}`}
                  style={{ boxShadow: dark ? 'var(--shadow-blue)' : 'var(--shadow-sm)' }}
                >
                  <Icon
                    icon={`mdi:numeric-${level}-circle`}
                    width={36}
                    className={`mb-4 ${dark ? 'text-white/80' : 'text-blue'}`}
                  />
                  <span className={`text-[10px] font-[800] uppercase tracking-[0.18em] mb-2 ${dark ? 'text-white/60' : 'text-muted'}`}>
                    {day} · 7–9 PM
                  </span>
                  <h2 className={`text-[1.25rem] font-[900] leading-[1.15] mb-1 ${dark ? 'text-white' : 'text-black'}`}>
                    Level {level}
                  </h2>
                  <p className={`text-2xl font-[900] mb-3 ${dark ? 'text-white' : 'text-red'}`}>£55 / 4-week block</p>
                  <p className={`text-sm leading-[1.7] mb-3 ${dark ? 'text-white/80' : 'text-mid'}`}>{text}</p>
                  <p className={`text-xs font-[700] leading-[1.6] mb-2 ${dark ? 'text-white/80' : 'text-mid'}`}>
                    <Icon icon="mdi:map-marker" width={14} className="inline -mt-0.5 mr-1" />
                    {park}
                  </p>
                  <p className={`text-xs leading-[1.6] mb-5 flex-1 ${dark ? 'text-white/80' : 'text-mid'}`}>
                    2027 blocks: {blocks.join(' · ')}
                  </p>
                  <LiveBooking
                    programme={`Prep to Street Skate Level ${level}`}
                    source="prep_to_street_page"
                    dates={dates[level]}
                    sessionUrl={LINKS.prepToStreetSkate}
                    onDark={dark}
                    empty="Booking for these blocks isn't open yet — check back soon."
                  />
                </div>
              );
            })}
          </div>

          <p className="text-sm text-mid text-center mt-6">
            Each date above is the first evening of a four-week block. Classes are sold as a
            block, so a missed class can&apos;t be moved or refunded, but you can cancel the
            whole course from your account up to 48 hours before it begins.
          </p>
        </section>

        {/* PATHWAY */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              🛣 Where it fits
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>
          <ol className="rounded-[20px] bg-card border border-border overflow-hidden">
            {[
              ['Indoors first', 'Beginners Foundation builds the balance and control this course assumes.'],
              ['Levels 1 and 2', 'Prep to Street Skate, outdoors in the park — this page.'],
              ['Level 3', 'Beginner Street Skate: a free 14-week summer street skate, Tuesday evenings.'],
            ].map(([title, body], i) => (
              <li key={title} className={`px-5 py-4 sm:px-7 ${i > 0 ? 'border-t border-border' : ''}`}>
                <p className="text-sm font-[900] text-black">{title}</p>
                <p className="text-sm text-mid leading-[1.6]">{body}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-mid text-center mt-6">
            New to skating?{' '}
            <Link href="/adults/sk8-skool/beginners-foundations" className="font-[800] text-blue no-underline hover:opacity-80">
              Start with Beginners Foundation &rsaquo;
            </Link>
          </p>
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
