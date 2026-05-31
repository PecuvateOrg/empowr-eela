import type { ReactNode } from 'react';

interface ProgrammeCardProps {
  tag: string;
  tagColor: string;
  title: string;
  icon: ReactNode;
  bullets: string[];
  bookingUrl: string;
}

export default function ProgrammeCard({
  tag,
  tagColor,
  title,
  icon,
  bullets,
  bookingUrl,
}: ProgrammeCardProps) {
  return (
    <div className="bg-card rounded-[18px] border border-border p-5 sm:p-6 flex gap-4 sm:gap-5"
         style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className={`text-[10px] font-[800] uppercase tracking-[0.18em] leading-none mb-1 ${tagColor}`}>
              {tag}
            </p>
            <h3 className="text-[15px] sm:text-base font-[900] text-black leading-snug">
              {title}
            </h3>
          </div>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-blue text-warm-white text-[11px] font-[800] px-4 py-2 rounded-full no-underline transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{ boxShadow: 'var(--shadow-blue)' }}
          >
            Book &rsaquo;
          </a>
        </div>
        <ul className="space-y-1.5">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-2 text-[13px] text-mid leading-snug">
              <span className="inline-flex items-center justify-center w-[15px] h-[15px] rounded-full bg-red text-warm-white text-[8px] font-[900] shrink-0">
                ✓
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
