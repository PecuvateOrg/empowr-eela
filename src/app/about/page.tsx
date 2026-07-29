import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FindSessionBanner from '@/components/FindSessionBanner';

export const metadata: Metadata = {
  title: 'About EELA',
  description:
    'EELA — Empowr Experiential Learning Activities. The framework behind all Empowr CIC programmes, and the mission driving everything we do.',
};

const values = [
  {
    icon: 'mdi:lightning-bolt',
    title: 'Growth Through Action',
    body: 'Transformation happens when people engage and experience. We help them grow through doing.',
  },
  {
    icon: 'mdi:account-group',
    title: 'Community and Belonging',
    body: 'We create spaces where everyone feels valued and connected, united by authentic relationships and shared purpose.',
  },
  {
    icon: 'mdi:heart-pulse',
    title: 'Wellbeing as a Way of Life',
    body: 'We support everyday habits and mindsets that build lasting health and joy.',
  },
];

const programmes = [
  {
    icon: 'mdi:roller-skate',
    name: 'MoveWell',
    tagline: 'Movement & Wellness',
    description: 'Dynamic ways to improve physical and mental health through movement.',
    active: true,
  },
  {
    icon: 'mdi:brain',
    name: 'MindWell',
    tagline: 'Mindfulness & Recovery',
    description: 'A space for relaxation and rejuvenation, nurturing inner peace, mental clarity, and physical flexibility.',
    active: false,
  },
  {
    icon: 'mdi:palette',
    name: 'CreateWell',
    tagline: 'Creativity & Self-Expression',
    description: 'Exploring personal expression as a meaningful pathway to wellbeing.',
    active: false,
  },
  {
    icon: 'mdi:tree',
    name: 'ExploreWell',
    tagline: 'Nature & Exploration',
    description: 'Building fitness, teamwork, and a genuine connection with the natural world.',
    active: false,
  },
  {
    icon: 'mdi:flag-checkered',
    name: 'ConnectWell',
    tagline: 'Collaboration & Growth',
    description: 'Group challenges and interactive workshops that develop leadership, problem-solving, and strategic thinking through hands-on experience.',
    active: false,
  },
];

export default function AboutPage() {
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
            About EELA
          </p>
          <h1
            className="font-[900] text-black leading-[1.08] mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Empowr Experiential<br />
            <span className="text-blue">Learning Activities.</span>
          </h1>
          <p
            className="text-mid leading-[1.8] mb-4 max-w-[560px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            EELA is the overarching framework for everything Empowr delivers. Every programme,
            session, and activity sits within EELA — each one aligned to the core principle of
            promoting lifelong wellbeing through experiential learning.
          </p>
          <p className="text-[13px] font-[800] uppercase tracking-[0.1em] text-mid italic">
            Live by growing. Grow by learning. Learn by doing.
          </p>
        </section>

        {/* VALUES STRIP */}
        <div className="border-y border-border bg-blue-pale/60 py-5 px-5 mb-12">
          <div className="max-w-[880px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {values.map(({ icon, title, body }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 bg-blue/10 rounded-lg p-1.5">
                  <Icon icon={icon} width={18} className="text-blue" />
                </div>
                <div>
                  <p className="text-[12px] font-[800] text-black mb-0.5">{title}</p>
                  <p className="text-[12px] text-muted leading-[1.6]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* THE 5 PROGRAMMES */}
        <section className="max-w-[880px] mx-auto px-5 mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
              The EELA Framework
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-mid leading-[1.8] text-[0.95rem] mb-8 max-w-[560px]">
            EELA is not a single programme — it is the architecture that all programmes live within.
            Five sub-programmes, each with its own team and focus, all aligned to the same mission.
          </p>

          <div className="flex flex-col gap-3">
            {programmes.map(({ icon, name, tagline, description, active }) => (
              <div
                key={name}
                className={`flex items-start gap-4 rounded-2xl border p-4 sm:p-5 ${
                  active ? 'border-blue/30 bg-blue-pale/60' : 'border-border bg-card'
                }`}
              >
                <div className={`shrink-0 rounded-xl p-2 mt-0.5 ${active ? 'bg-blue/15' : 'bg-border/60'}`}>
                  <Icon
                    icon={icon}
                    width={22}
                    className={active ? 'text-blue' : 'text-muted'}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-[14px] font-[900] text-black">{name}</p>
                    <span className="text-[10px] font-[800] uppercase tracking-[0.12em] text-muted">
                      {tagline}
                    </span>
                    {active ? (
                      <span className="text-[10px] font-[800] uppercase tracking-[0.1em] text-blue bg-blue/10 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-[800] uppercase tracking-[0.1em] text-muted bg-border/80 px-2 py-0.5 rounded-full">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-mid leading-[1.6]">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EMPOWR LINK */}
        <section className="max-w-[880px] mx-auto px-5 mb-10 text-center">
          <p className="text-[13px] text-muted leading-[1.7]">
            EELA is a programme of{' '}
            <a
              href="https://empowrcic.org/?utm_source=empowr-eela&utm_medium=internal"
              target="_blank"
              rel="noopener"
              className="text-blue font-[700] hover:opacity-80 transition-opacity"
            >
              Empowr CIC
            </a>
            {' '}— a Community Interest Company promoting lifelong well-being through the
            transformative power of experiential learning.
          </p>
        </section>

        <FindSessionBanner />
      </main>

      <Footer />
    </>
  );
}
