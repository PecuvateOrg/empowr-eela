import type { ReactNode } from 'react';
import Link from 'next/link';

interface ProgrammeCardProps {
  tag: string;
  tagColor: string;
  title: string;
  icon: ReactNode;
  bullets: string[];
  bookingUrl: string;
  buttonLabel?: string;
}

export default function ProgrammeCard({
  tag,
  tagColor,
  title,
  icon,
  bullets,
  bookingUrl,
  buttonLabel = 'Book',
}: ProgrammeCardProps) {
  const isInternal = bookingUrl.startsWith('/');
  const btnClass = 'shrink-0 bg-blue text-warm-white text-[13px] font-[800] px-5 py-2.5 rounded-full no-underline transition-opacity hover:opacity-90 whitespace-nowrap';
  const btnStyle = { boxShadow: 'var(--shadow-blue)' };

  const DesktopBtn = isInternal ? (
    <Link href={bookingUrl} className={`hidden sm:inline-block ${btnClass}`} style={btnStyle}>
      {buttonLabel} &rsaquo;
    </Link>
  ) : (
    <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
       className={`hidden sm:inline-block ${btnClass}`} style={btnStyle}>
      {buttonLabel} &rsaquo;
    </a>
  );

  const MobileBtn = isInternal ? (
    <Link href={bookingUrl}
          className="bg-blue text-warm-white text-[13px] font-[800] px-10 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90"
          style={btnStyle}>
      {buttonLabel} &rsaquo;
    </Link>
  ) : (
    <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
       className="bg-blue text-warm-white text-[13px] font-[800] px-10 py-3 rounded-full no-underline text-center transition-opacity hover:opacity-90"
       style={btnStyle}>
      {buttonLabel} &rsaquo;
    </a>
  );

  return (
    <div className="bg-card rounded-[18px] border border-border p-5 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-5"
         style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="shrink-0 flex justify-center sm:justify-start">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-full sm:w-auto text-center sm:text-left">
            <p className={`text-[10px] font-[800] uppercase tracking-[0.18em] leading-none mb-1 ${tagColor}`}>
              {tag}
            </p>
            <h3 className="text-[15px] sm:text-base font-[900] text-black leading-snug">
              {title}
            </h3>
          </div>
          {DesktopBtn}
        </div>
        <ul className="space-y-1.5 mb-4 sm:mb-0 w-fit mx-auto sm:mx-0 sm:w-auto">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-2 text-[13px] text-mid leading-snug">
              <span className="inline-flex items-center justify-center w-[15px] h-[15px] rounded-full bg-red text-warm-white text-[8px] font-[900] shrink-0">
                ✓
              </span>
              {bullet}
            </li>
          ))}
        </ul>
        <div className="sm:hidden flex justify-center">
          {MobileBtn}
        </div>
      </div>
    </div>
  );
}
