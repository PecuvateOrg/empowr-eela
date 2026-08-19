import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';

export const metadata: Metadata = {
  title: 'Private Group Skate Coaching — Private Bookings',
  description:
    'Dedicated group skate coaching with Empowr CIC at The Ladywell Centre — for friends, families or small groups, tailored to your level and goals.',
};

const chips = [
  { icon: 'mdi:map-marker', label: 'The Ladywell Centre (indoors)' },
  { icon: 'mdi:tshirt-crew', label: 'Skate hire add-on: £5/person' },
];

const goodToKnow = [
  'Minimum group size: 3 skaters.',
  'Book at least 2 weeks in advance — your session is only reserved once paid in full.',
  'Non-refundable and non-transferable once booked.',
  'Under-18s must wear full protective gear (helmet, knee/elbow pads, wrist guards) — this is required, not optional.',
];

export default function GroupCoachingPage() {
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
            Private Coaching (Sk8 Skool) · All ages
          </p>
          <h1
            className="font-[900] text-black leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Private Group<br />
            <span className="text-blue">Skate Coaching.</span>
          </h1>
          <p
            className="text-mid leading-[1.8] max-w-[560px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            Dedicated coaching for friends, families or small groups, tailored to your
            group&apos;s level and goals.
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
              Saturdays only
            </p>
            <p className="relative text-white/90 font-[800] text-lg sm:text-xl mt-1">
              3 – 5 PM
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
              <Icon icon="mdi:account-multiple" width={16} className="shrink-0" />
              Minimum 3 skaters
            </span>
          </div>
        </section>

        <AvailabilityCalendar />

        {/* BOOKING */}
        <section className="max-w-[880px] mx-auto px-5 pb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              🎟 Book your session
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div
            className="max-w-[420px] mx-auto rounded-[20px] bg-blue p-6 sm:p-8 flex flex-col items-center text-center"
            style={{ boxShadow: 'var(--shadow-blue)' }}
          >
            <Icon icon="mdi:account-group" width={36} className="text-white/80 mb-4" />
            <h2 className="text-[1.25rem] font-[900] text-white leading-[1.15] mb-1">
              Group Coaching
            </h2>
            <p className="text-2xl font-[900] text-white mb-3">£20 / person / hr</p>
            <p className="text-sm text-white/80 leading-[1.7] mb-6">
              Get in touch with your group size and preferred date to book.
            </p>
            <EnquiryModal
              subject="Private Booking Enquiry — Group Coaching"
              source="eela-group-coaching"
              triggerLabel="Enquire to book"
              partySizeLabel="Number of skaters"
              partySizeMin={3}
            />
          </div>
        </section>

        {/* GOOD TO KNOW */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-4">
            Good to Know
          </p>
          <div
            className="rounded-[20px] bg-card border border-border p-6 sm:p-8"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <ul className="space-y-3">
              {goodToKnow.map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-mid leading-[1.7]">
                  <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-red text-warm-white text-[9px] font-[900] shrink-0 mt-0.5">
                    ✓
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
