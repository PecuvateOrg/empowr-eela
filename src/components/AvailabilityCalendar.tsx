import { LINKS } from '@/lib/links';

type AvailabilityCalendarProps = {
  heading?: string;
  description?: string;
};

export default function AvailabilityCalendar({
  heading = '🗓 Check available dates',
  description = 'See which Saturdays are already booked below, then enquire with your preferred date using the button underneath.',
}: AvailabilityCalendarProps) {
  return (
    <section className="max-w-[880px] mx-auto px-5 pb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-border" />
        <p className="text-[11px] font-[800] uppercase tracking-[0.15em] text-muted whitespace-nowrap">
          {heading}
        </p>
        <div className="flex-1 h-px bg-border" />
      </div>

      <p className="text-sm text-mid leading-[1.7] text-center max-w-[560px] mx-auto mb-6">
        {description}
      </p>

      <div
        className="rounded-[20px] border border-border overflow-hidden"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <iframe
          src={LINKS.privateBookingsCalendar}
          title="Private bookings availability calendar"
          className="w-full"
          height={500}
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>
    </section>
  );
}
