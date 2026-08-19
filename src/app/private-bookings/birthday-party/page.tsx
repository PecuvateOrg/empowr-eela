import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LINKS } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Roller Disco Birthday Party — Private Bookings',
  description:
    'A private 2-hour Roller Disco birthday party with Empowr CIC — skating, music, games and dancing, with a dedicated birthday space.',
};

const includes = [
  '2-hour private session',
  'Music, games and dancing',
  'Reserved birthday table',
  'Seating for guests and non-skaters',
  'Dedicated cake / refreshments space',
  'Optional group Happy Birthday, led by the Head Host',
  'Skate hire for skaters (sizes C10–UK7, subject to availability)',
];

const bring = [
  'Own cake',
  'Table decorations',
  'Plates, napkins & serving items',
  'Own snacks',
  'Drinks — sealed bottles only',
];

const notPermitted = ['Hot food', 'Alcohol', 'Confetti', 'Open cups or drink containers'];

const steps = [
  'Confirm your skater count (excluding the birthday person)',
  'Book at least 2 weeks ahead — minimum 10 skaters',
  'Pay via payment link to secure your date (not reserved until paid)',
  'Bring your cake, decorations and refreshments',
  'Celebrate!',
];

export default function BirthdayPartyPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="max-w-[880px] mx-auto px-5 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Link
            href="/private-bookings"
            className="inline-flex items-center gap-1.5 text-sm font-[700] text-blue no-underline mb-6 hover:opacity-80 transition-opacity"
          >
            ← Private Bookings
          </Link>

          <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-3">
            Private Party · All ages
          </p>
          <h1
            className="font-[900] text-black leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Roller Disco<br />
            <span className="text-blue">Birthday Party.</span>
          </h1>
          <p
            className="text-mid leading-[1.8] max-w-[560px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            A private 2-hour Roller Disco — skating, music, games and dancing, with a
            dedicated birthday space all to yourselves.
          </p>
        </section>

        {/* INFO CHIPS */}
        <section className="max-w-[880px] mx-auto px-5 pb-10">
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-[700] text-mid">
              <Icon icon="mdi:clock-outline" width={16} className="text-blue shrink-0" />
              2 hours, Saturdays 3–5 PM
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-[700] text-mid">
              <Icon icon="mdi:map-marker" width={16} className="text-blue shrink-0" />
              The Ladywell Centre
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-red text-warm-white px-4 py-2 text-sm font-[800]">
              <Icon icon="mdi:account-multiple" width={16} className="shrink-0" />
              Minimum 10 skaters
            </span>
          </div>
        </section>

        {/* AVAILABILITY */}
        <section className="max-w-[880px] mx-auto px-5 pb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              🗓 Check available dates
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-sm text-mid leading-[1.7] text-center max-w-[560px] mx-auto mb-6">
            See which Saturdays are already booked below, then enquire with your preferred date
            using the button underneath.
          </p>

          <div
            className="rounded-[20px] border border-border overflow-hidden"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <iframe
              src={LINKS.birthdayPartyCalendar}
              title="Birthday party availability calendar"
              className="w-full"
              height={500}
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </section>

        {/* BOOKING */}
        <section className="max-w-[880px] mx-auto px-5 pb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              🎟 Book your party
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div
            className="max-w-[420px] mx-auto rounded-[20px] bg-blue p-6 sm:p-8 flex flex-col items-center text-center"
            style={{ boxShadow: 'var(--shadow-blue)' }}
          >
            <Icon icon="mdi:cake-variant" width={36} className="text-white/80 mb-4" />
            <h2 className="text-[1.25rem] font-[900] text-white leading-[1.15] mb-1">
              Birthday Party
            </h2>
            <p className="text-2xl font-[900] text-white mb-3">£20 / person</p>
            <p className="text-sm text-white/80 leading-[1.7] mb-6">
              The birthday person&apos;s place is free. Non-skaters welcome in the seating area.
            </p>
            <a
              href={LINKS.enquiries}
              target="_blank"
              rel="noopener"
              className="inline-block bg-white text-blue text-sm font-[800] px-8 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90"
            >
              Enquire to book &rsaquo;
            </a>
          </div>
        </section>

        {/* WHAT'S INCLUDED / BRING / NOT PERMITTED */}
        <section className="max-w-[880px] mx-auto px-5 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="rounded-[20px] bg-card border border-border p-6 sm:p-8" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <h3 className="font-[900] text-black text-base mb-4">What&apos;s included</h3>
              <ul className="space-y-2.5">
                {includes.map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm text-mid leading-[1.6]">
                    <span className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-full bg-red text-warm-white text-[8px] font-[900] shrink-0 mt-0.5">✓</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-[20px] bg-card border border-border p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <h3 className="font-[900] text-black text-base mb-3">What to bring</h3>
                <ul className="space-y-2">
                  {bring.map((line) => (
                    <li key={line} className="text-sm text-mid leading-[1.6]">• {line}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[20px] bg-card border border-border p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <h3 className="font-[900] text-black text-base mb-3">Not permitted</h3>
                <ul className="space-y-2">
                  {notPermitted.map((line) => (
                    <li key={line} className="text-sm text-mid leading-[1.6]">• {line}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-4">
            How It Works
          </p>
          <div className="rounded-[20px] bg-card border border-border p-6 sm:p-8" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <ol className="space-y-3">
              {steps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-mid leading-[1.7]">
                  <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-blue text-warm-white text-[11px] font-[900] shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="text-xs text-muted leading-[1.7] mt-5 pt-5 border-t border-border">
              Non-refundable and non-transferable once paid. Additional skaters can be added at
              any time before the event.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
