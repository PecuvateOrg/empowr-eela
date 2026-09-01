import type { Metadata } from 'next';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LINKS } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Membership — EELA by Empowr',
  description:
    'Create a free Empowr membership to book skating sessions, manage your household, and check in with a digital ticket. Membership is always free.',
};

// Every claim below is something the Members platform actually does today.
// The previous version promised "early access to book before sessions open
// to the public" and "priority invites" — neither mechanism exists, and a
// perk list is a promise. Do not add one back without the feature.
const perks = [
  {
    icon: 'mdi:ticket-confirmation-outline',
    title: 'Book online in seconds',
    body: 'Browse every upcoming session, pick your date, and pay securely by card — no phone calls, no waiting.',
  },
  {
    icon: 'mdi:account-group-outline',
    title: 'Your whole household',
    body: 'Add each skater once, then book for any of them. Waivers stay linked to the right child.',
  },
  {
    icon: 'mdi:qrcode-scan',
    title: 'Digital tickets',
    body: 'Every booking comes with a ticket you can show at the door for a quick check-in.',
  },
  {
    icon: 'mdi:calendar-check-outline',
    title: 'Everything in one place',
    body: 'See upcoming and past bookings, update your details, and complete waivers from your account.',
  },
];

export default function MembersPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="max-w-[720px] mx-auto px-5 pt-14 pb-10 sm:pt-20 sm:pb-14 text-center">
          <span className="inline-flex items-center gap-1.5 bg-blue-pale text-blue text-[11px] font-[800] uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-6">
            <Icon icon="mdi:check-circle-outline" className="text-[14px]" />
            Now open
          </span>
          <h1
            className="font-[900] text-black leading-[1.08] mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Your Empowr<br />
            <span className="text-blue">membership.</span>
          </h1>
          <p
            className="text-mid leading-[1.8] mb-10 max-w-[500px] mx-auto"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}
          >
            Your free Empowr account is how you book sessions, add the skaters in your
            household, and keep every booking in one place. It takes a minute to set up.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={LINKS.membersSignup}
              className="inline-block bg-blue text-warm-white text-sm font-[800] px-8 py-3.5 rounded-full no-underline text-center transition-opacity hover:opacity-90 w-full sm:w-auto"
              style={{ boxShadow: 'var(--shadow-blue)' }}
            >
              Create your free account &rsaquo;
            </a>
            <a
              href={LINKS.membersLogin}
              className="inline-block bg-card border border-border text-black text-sm font-[800] px-8 py-3.5 rounded-full no-underline text-center transition-opacity hover:opacity-90 w-full sm:w-auto"
            >
              Already a member? Sign in
            </a>
          </div>

          <p className="text-muted text-[12px] mt-4">
            Membership is always free. Card details are only needed when you book a session.
          </p>
        </section>

        {/* PERKS */}
        <section className="max-w-[900px] mx-auto px-5 pb-16 sm:pb-20">
          <p className="text-center text-[11px] font-[800] uppercase tracking-[0.18em] text-muted mb-8">
            What you get
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

      <Footer />
    </>
  );
}
