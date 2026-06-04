import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { LINKS } from '@/lib/links';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'EELA — Sessions for Everyone',
};

const trustedBy = [
  { src: '/assets/lewisham-logo.jpeg',  alt: 'London Borough of Lewisham' },
  { src: '/assets/dfe.jpeg',            alt: 'Department for Education' },
  { src: '/assets/young-mayor.jpeg',    alt: 'Young Mayor of Lewisham' },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="max-w-[880px] mx-auto px-5 pt-12 pb-10 sm:pt-16 sm:pb-14 text-center">
          <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-blue mb-4">
            Empowr CIC
          </p>
          <h1 className="font-[900] text-black leading-[1.08] mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>
            Roller skating sessions<br />
            <span className="text-blue">for everyone.</span>
          </h1>
          <p className="text-mid leading-[1.8] mb-8 max-w-[540px] mx-auto"
             style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}>
            At Empowr, we build wellbeing through hands-on experience. Whatever your age or
            ability, there&apos;s a session made for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/adults"
              className="w-full sm:w-auto bg-blue text-warm-white text-sm font-[800] px-8 py-4 rounded-full no-underline text-center transition-opacity hover:opacity-90"
              style={{ boxShadow: 'var(--shadow-blue)' }}
            >
              Adults sessions (15+)
            </Link>
            <Link
              href="/kids-space"
              className="w-full sm:w-auto bg-card text-blue text-sm font-[800] px-8 py-4 rounded-full no-underline text-center border border-border transition-colors hover:bg-blue-pale"
            >
              Kids Space (5+)
            </Link>
          </div>
        </section>

        {/* PROGRAMME PATHWAYS */}
        <section className="max-w-[880px] mx-auto px-5 pb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Adults card */}
            <div className="relative rounded-[20px] overflow-hidden bg-blue"
                 style={{ boxShadow: 'var(--shadow-blue)' }}>
              <Image
                src="/assets/adults-learning.jpeg"
                alt="Adults roller skating at Empowr CIC"
                fill
                className="object-cover object-center opacity-30"
                sizes="(max-width: 640px) 100vw, 440px"
              />
              <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full min-h-[280px]">
                <span className="inline-block text-[10px] font-[800] uppercase tracking-[0.18em] text-white/70 mb-2">
                  Ages 15+
                </span>
                <h2 className="text-[1.5rem] sm:text-[1.75rem] font-[900] text-white leading-[1.15] mb-3">
                  Adults
                </h2>
                <p className="text-sm text-white/80 leading-[1.7] mb-6 flex-1">
                  Sk8 Skool, Synkron8, Skate Jam, Roller Disco, and community events —
                  all built around your level and your pace.
                </p>
                <Link
                  href="/adults"
                  className="inline-block bg-white text-blue text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start"
                >
                  Find your session &rsaquo;
                </Link>
              </div>
            </div>

            {/* Kids card */}
            <div className="relative rounded-[20px] overflow-hidden bg-black"
                 style={{ boxShadow: 'var(--shadow-md)' }}>
              <Image
                src="/assets/kidz.jpeg"
                alt="Children roller skating at Empowr CIC"
                fill
                className="object-cover object-top opacity-40"
                sizes="(max-width: 640px) 100vw, 440px"
              />
              <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full min-h-[280px]">
                <span className="inline-block text-[10px] font-[800] uppercase tracking-[0.18em] text-white/70 mb-2">
                  Ages 5+
                </span>
                <h2 className="text-[1.5rem] sm:text-[1.75rem] font-[900] text-white leading-[1.15] mb-3">
                  Kidz Space
                </h2>
                <p className="text-sm text-white/80 leading-[1.7] mb-6 flex-1">
                  Roller skating classes, camps, discos, and so much more — all designed
                  for children and families in a safe, fun environment.
                </p>
                <Link
                  href="/kids-space"
                  className="inline-block bg-white text-black text-sm font-[800] px-6 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90 self-start"
                >
                  Explore Kidz Space &rsaquo;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED BY */}
        <section className="max-w-[880px] mx-auto px-5 py-12 text-center">
          <p className="text-[10px] font-[800] uppercase tracking-[0.2em] text-muted mb-7">
            Trusted by
          </p>
          <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
            {trustedBy.map(({ src, alt }) => (
              <Image
                key={alt}
                src={src}
                alt={alt}
                width={120}
                height={50}
                className="h-[44px] sm:h-[52px] w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
              />
            ))}
          </div>
        </section>

        {/* CTA BAND */}
        <section className="mx-5 mb-12 rounded-[20px] overflow-hidden"
                 style={{ background: 'linear-gradient(135deg, #4A70C2 0%, #3558a8 100%)', boxShadow: 'var(--shadow-blue)' }}>
          <div className="max-w-[880px] mx-auto px-6 py-10 sm:py-12 text-center">
            <h2 className="font-[900] text-white leading-[1.15] mb-3"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
              Not sure where to start?
            </h2>
            <p className="text-sm text-white/80 leading-[1.7] mb-6 max-w-[440px] mx-auto">
              Answer a few quick questions and we&apos;ll point you to the right session.
            </p>
            <a
              href={LINKS.quiz}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue text-sm font-[800] px-8 py-3.5 rounded-full no-underline text-center transition-opacity hover:opacity-90"
            >
              Find my session
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
