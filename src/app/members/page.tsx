'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';

const perks = [
  {
    icon: 'mdi:ticket-confirmation-outline',
    title: 'Free session access',
    body: 'Members get early access to book free community sessions before they open to the public.',
  },
  {
    icon: 'mdi:account-group-outline',
    title: 'Workshops & events',
    body: 'Priority invites to workshops, themed events, and special programmes throughout the year.',
  },
  {
    icon: 'mdi:calendar-check-outline',
    title: 'Easy booking',
    body: 'One account to browse, book, and manage all your Empowr sessions in one place.',
  },
  {
    icon: 'mdi:heart-outline',
    title: 'Community membership',
    body: 'Be part of a growing community of skaters, learners, and wellbeing enthusiasts in Lewisham.',
  },
];

export default function MembersPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="max-w-[720px] mx-auto px-5 pt-14 pb-10 sm:pt-20 sm:pb-14 text-center">
          <span className="inline-flex items-center gap-1.5 bg-blue-pale text-blue text-[11px] font-[800] uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-6">
            <Icon icon="mdi:clock-outline" className="text-[14px]" />
            Coming Soon
          </span>
          <h1
            className="font-[900] text-black leading-[1.08] mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Your EELA<br />
            <span className="text-blue">membership.</span>
          </h1>
          <p
            className="text-mid leading-[1.8] mb-10 max-w-[500px] mx-auto"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            We&apos;re building a free members area where you can book sessions, join workshops, and
            stay connected with the Empowr community. Sign up below to be first in the door.
          </p>

          {/* SIGN-UP FORM */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-[480px] mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-white border border-border rounded-full px-5 py-3.5 text-sm text-black placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue/30"
              />
              <button
                type="submit"
                className="bg-blue text-warm-white text-sm font-[800] px-8 py-3.5 rounded-full transition-opacity hover:opacity-90 whitespace-nowrap"
                style={{ boxShadow: 'var(--shadow-blue)' }}
              >
                Join the waitlist
              </button>
            </form>
          ) : (
            <div className="inline-flex items-center gap-2 bg-blue-pale text-blue font-[700] text-sm px-6 py-3.5 rounded-full">
              <Icon icon="mdi:check-circle-outline" className="text-[20px]" />
              You&apos;re on the list — we&apos;ll be in touch soon!
            </div>
          )}

          <p className="text-muted text-[12px] mt-4">Free forever. No payment details needed.</p>
        </section>

        {/* PERKS */}
        <section className="max-w-[900px] mx-auto px-5 pb-16 sm:pb-20">
          <p className="text-center text-[11px] font-[800] uppercase tracking-[0.18em] text-muted mb-8">
            What members will get
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="bg-white rounded-2xl p-6 flex gap-4 items-start"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-pale flex items-center justify-center">
                  <Icon icon={perk.icon} className="text-blue text-[22px]" />
                </div>
                <div>
                  <p className="font-[800] text-black text-[15px] mb-1">{perk.title}</p>
                  <p className="text-mid text-[13px] leading-[1.7]">{perk.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
