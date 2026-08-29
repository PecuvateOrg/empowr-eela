import { Icon } from '@iconify/react';

interface RouteWay {
  icon: string;
  label: string;
  lines: string[];
}

export interface RouteInfoProps {
  venueName: string;
  address: string;
  ways: RouteWay[];
  note?: string;
}

export default function RouteInfo({ venueName, address, ways, note }: RouteInfoProps) {
  return (
    <div
      className="rounded-[20px] bg-card border border-border p-6 sm:p-8"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-start gap-3 mb-5">
        <Icon icon="mdi:map-marker" width={28} className="text-blue shrink-0 mt-0.5" />
        <div>
          <h3 className="font-[900] text-black text-base sm:text-lg leading-tight mb-1">
            {venueName}
          </h3>
          <p className="text-sm text-mid">{address}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {ways.map((way) => (
          <div key={way.label}>
            <div className="flex items-center gap-2 mb-2">
              <Icon icon={way.icon} width={18} className="text-blue shrink-0" />
              <span className="text-[11px] font-[800] uppercase tracking-[0.1em] text-mid">
                {way.label}
              </span>
            </div>
            <ul className="space-y-1">
              {way.lines.map((line) => (
                <li key={line} className="text-sm text-mid leading-[1.6]">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {note && (
        <p className="text-xs text-muted leading-[1.7] mt-6 pt-5 border-t border-border">
          {note}
        </p>
      )}
    </div>
  );
}
