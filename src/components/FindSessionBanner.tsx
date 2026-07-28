import { LINKS } from '@/lib/links';

export default function FindSessionBanner() {
  return (
    <section className="max-w-[880px] mx-auto px-5 pb-14">
      <div className="bg-blue rounded-[20px] px-6 py-10 text-center"
           style={{ boxShadow: 'var(--shadow-blue)' }}>
        <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-white/70 mb-3">
          Not sure which session is right?
        </p>
        <h2 className="font-[900] text-white leading-[1.15] mb-3"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)' }}>
          Take our 2-minute quiz.
        </h2>
        <p className="text-sm text-white/80 leading-[1.7] mb-6 max-w-[380px] mx-auto">
          Answer a few quick questions and we&apos;ll point you to your best starting point.
        </p>
        <a
          href={LINKS.quiz}
          target="_blank"
          rel="noopener"
          className="inline-block bg-warm-white text-blue text-sm font-[800] px-8 py-3.5 rounded-full no-underline transition-opacity hover:opacity-90"
        >
          Find my session &rsaquo;
        </a>
      </div>
    </section>
  );
}
