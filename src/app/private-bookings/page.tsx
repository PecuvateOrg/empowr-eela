import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProgrammeCard from '@/components/ProgrammeCard';
import type { Programme } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Private Bookings',
  description:
    'Tailored, private roller-skating experiences with Empowr CIC — 1:1 coaching, group coaching, birthday parties and custom events at The Ladywell Centre.',
};

const pillars = [
  { icon: 'mdi:account-heart',  label: 'Tailored to you' },
  { icon: 'mdi:human-male-female-child', label: 'All ages, 5+/15+' },
  { icon: 'mdi:map-marker',     label: 'The Ladywell Centre' },
];

const offerings: Programme[] = [
  {
    id: 'one-to-one-coaching',
    tag: 'From £40/hr',
    tagColor: 'text-blue',
    title: '1:1 Private Skate Coaching',
    icon: <Icon icon="mdi:account-tie" width={36} height={36} className="text-blue" />,
    bullets: ['Personalised, at your own pace', 'Saturdays 3–5 PM', 'Skate hire add-on available'],
    bookingUrl: '/private-bookings/one-to-one-coaching',
    buttonLabel: 'View details',
  },
  {
    id: 'group-coaching',
    tag: 'From £20/person/hr',
    tagColor: 'text-blue-dark',
    title: 'Private Group Coaching',
    icon: <Icon icon="mdi:account-group" width={36} height={36} className="text-blue-dark" />,
    bullets: ['Minimum 3 skaters', 'Saturdays 3–5 PM', 'For friends, families & small groups'],
    bookingUrl: '/private-bookings/group-coaching',
    buttonLabel: 'View details',
  },
  {
    id: 'birthday-party',
    tag: '£20/person',
    tagColor: 'text-blue-light',
    title: 'Roller Disco Birthday Party',
    icon: <Icon icon="mdi:cake-variant" width={36} height={36} className="text-blue-light" />,
    bullets: ['2-hour private session', 'Minimum 10 skaters', 'Birthday person goes free'],
    bookingUrl: '/private-bookings/birthday-party',
    buttonLabel: 'View details',
  },
  {
    id: 'custom-event',
    tag: 'Bespoke quote',
    tagColor: 'text-blue',
    title: 'Custom Roller Skating Event',
    icon: <Icon icon="mdi:calendar-star" width={36} height={36} className="text-blue" />,
    bullets: ['DJ, marshals, coaches & more', 'At Ladywell or off-site', 'Community rates available'],
    bookingUrl: '/private-bookings/custom-event',
    buttonLabel: 'View details',
  },
];

export default function PrivateBookingsPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="max-w-[880px] mx-auto px-5 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-[700] text-blue no-underline mb-6 hover:opacity-80 transition-opacity"
          >
            ← All sessions
          </Link>

          <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-3">
            Private · Ages 5+/15+
          </p>
          <h1
            className="font-[900] text-black leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Private<br />
            <span className="text-blue">bookings.</span>
          </h1>
          <p
            className="text-mid leading-[1.8] max-w-[600px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            Looking for something a little more personal? From 1:1 skate sessions and private
            group bookings to birthday parties and fully customised private events, we&apos;ve
            got you covered. Whether you&apos;re celebrating, learning with friends, planning
            something for your organisation, or simply want the space to yourselves, we can
            create a private skating experience tailored to you.
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

        {/* OFFERINGS */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              🛼 Choose your booking
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex flex-col gap-4 max-w-[660px] mx-auto">
            {offerings.map((offering) => (
              <ProgrammeCard key={offering.id} {...offering} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
