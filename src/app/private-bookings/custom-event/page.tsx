import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomEventEnquiryModal from '@/components/CustomEventEnquiryModal';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';

export const metadata: Metadata = {
  title: 'Custom Roller Skating Event — Private Bookings',
  description:
    'A bespoke roller skating event with Empowr CIC, built around what you need — DJ, marshals, coaches, security and more, at The Ladywell Centre or off-site.',
};

const canInclude = [
  'Skate DJ',
  'Skate Marshals',
  'Skate Coaches',
  'Speaker & personalised playlist',
  'Event security',
  'Roller skate hire',
  'Protective gear hire',
];

const toQuote = ['Preferred date', 'Location', 'Attendee count', 'Budget (if applicable)', 'Desired inclusions'];

export default function CustomEventPage() {
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
            Custom Event · All ages
          </p>
          <h1
            className="font-[900] text-black leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Custom Roller<br />
            <span className="text-blue">Skating Event.</span>
          </h1>
          <p
            className="text-mid leading-[1.8] max-w-[560px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            A bespoke event package built around what you need. Tell us the event type,
            atmosphere, and support required, and we&apos;ll build a quote around it.
          </p>
        </section>

        {/* INFO CHIPS */}
        <section className="max-w-[880px] mx-auto px-5 pb-10">
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-[700] text-mid">
              <Icon icon="mdi:map-marker" width={16} className="text-blue shrink-0" />
              Ladywell Centre (Sat 3–5 PM) or off-site
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-[700] text-mid">
              <Icon icon="mdi:calendar-clock" width={16} className="text-blue shrink-0" />
              Any day/time off-site, subject to availability
            </span>
          </div>
        </section>

        {/* CAN INCLUDE */}
        <section className="max-w-[880px] mx-auto px-5 pb-6">
          <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-4">
            Can Include
          </p>
          <div className="rounded-[20px] bg-card border border-border p-6 sm:p-8" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {canInclude.map((line) => (
                <div key={line} className="flex items-start gap-2.5 text-sm text-mid leading-[1.6]">
                  <span className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-full bg-red text-warm-white text-[8px] font-[900] shrink-0 mt-0.5">✓</span>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING NOTE */}
        <section className="max-w-[880px] mx-auto px-5 pb-10">
          <div className="rounded-[20px] bg-blue-pale/60 border border-border p-6 sm:p-8">
            <p className="text-sm text-mid leading-[1.7]">
              <strong className="text-black">Pricing is bespoke</strong> — it depends on your
              requirements, location, attendee count, and services chosen. There&apos;s no
              fixed figure; we always quote based on what you need. Not-for-profits, schools,
              TRAs and other community-funded organisations can share their available budget
              and we&apos;ll try to build a package that fits, where possible.
            </p>
          </div>
        </section>

        <AvailabilityCalendar
          description="Ladywell Centre Saturdays 3-5PM are shown below. Off-site or another day? Just include your preferred date and location in the form."
        />

        {/* GET A QUOTE */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              🎟 Get a quote
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div
            className="max-w-[520px] mx-auto rounded-[20px] bg-blue p-6 sm:p-8 flex flex-col items-center text-center"
            style={{ boxShadow: 'var(--shadow-blue)' }}
          >
            <Icon icon="mdi:calendar-star" width={36} className="text-white/80 mb-4" />
            <h2 className="text-[1.25rem] font-[900] text-white leading-[1.15] mb-3">
              Tell us what you need
            </h2>
            <ul className="text-sm text-white/85 leading-[1.8] mb-6 text-left">
              {toQuote.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
            <CustomEventEnquiryModal />
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
