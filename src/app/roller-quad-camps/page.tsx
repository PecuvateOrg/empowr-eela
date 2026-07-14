import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LINKS } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Roller Quad Camps — Kids Space',
  description:
    'Multi-day roller skating camps for children aged 8+ with Empowr CIC. Book directly or apply for a free place through the HAF Programme.',
};

const pillars = [
  { icon: 'mdi:shield-check',   label: 'Safe environment' },
  { icon: 'mdi:account-group',  label: 'Expert coaches' },
  { icon: 'mdi:gift',           label: 'HAF eligible' },
];

export default function RollerQuadCampsPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="max-w-[880px] mx-auto px-5 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Link
            href="/kids-space"
            className="inline-flex items-center gap-1.5 text-sm font-[700] text-blue no-underline mb-6 hover:opacity-80 transition-opacity"
          >
            ← Kids Space
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-3">
                Camp · 8+ yrs
              </p>
              <h1
                className="font-[900] text-black leading-[1.08] mb-4"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
              >
                Roller Quad<br />
                <span className="text-blue">Camps.</span>
              </h1>
              <p
                className="text-mid leading-[1.8]"
                style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
              >
                Multi-day skating adventures for children aged 8+. Games, activities, new friends
                and memories — all on wheels. Choose the booking option that works for your family.
              </p>
            </div>

            <div className="relative rounded-[20px] overflow-hidden h-[240px] sm:h-[300px]">
              <Image
                src="https://empowr-cic.s3.us-east-1.amazonaws.com/eela/roller-quad-camps/roller-quad-camp-img-01.jpeg"
                alt="Children at Empowr Camps roller skating session"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 440px"
                priority
              />
              <div
                className="absolute top-3 right-3 bg-blue text-warm-white font-[900] text-center px-3 py-2.5 rounded-xl leading-[1.3]"
                style={{ fontSize: '10px' }}
              >
                Kidz Space<br />
                <span className="text-xl leading-[1.1] block">8+</span>
              </div>
            </div>
          </div>
        </section>

        {/* PILLARS STRIP */}
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
              🎟 Choose your booking
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Standard booking card — first */}
            <div
              className="rounded-[20px] bg-card border border-border p-6 sm:p-8 flex flex-col"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <Icon icon="mdi:tent" width={36} className="text-blue mb-4" />
              <span className="text-[10px] font-[800] uppercase tracking-[0.18em] text-muted mb-2">
                Standard Booking
              </span>
              <h2 className="text-[1.25rem] font-[900] text-black leading-[1.15] mb-3">
                Empowr Camps
              </h2>
              <p className="text-sm text-mid leading-[1.7] mb-6 flex-1">
                Book your child&apos;s place directly. Multi-day skating adventure with expert
                coaching, games, and activities.
              </p>
              <a
                href={LINKS.kidzSummerCamps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue text-warm-white text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start"
                style={{ boxShadow: 'var(--shadow-blue)' }}
              >
                Book now &rsaquo;
              </a>
            </div>

            {/* HAF Spaces card — second */}
            <div
              className="rounded-[20px] bg-blue p-6 sm:p-8 flex flex-col"
              style={{ boxShadow: 'var(--shadow-blue)' }}
            >
              <Icon icon="mdi:hand-heart" width={36} className="text-white/80 mb-4" />
              <span className="text-[10px] font-[800] uppercase tracking-[0.18em] text-white/60 mb-2">
                HAF Programme
              </span>
              <h2 className="text-[1.25rem] font-[900] text-white leading-[1.15] mb-3">
                HAF Spaces
              </h2>
              <p className="text-sm text-white/80 leading-[1.7] mb-6 flex-1">
                Free or subsidised places for children eligible for benefit-related free school
                meals. Funded by the Department for Education.
              </p>
              <a
                href={LINKS.rollerQuadCampsHAF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start"
              >
                Apply via HAF &rsaquo;
              </a>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
