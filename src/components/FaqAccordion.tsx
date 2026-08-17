'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div
            key={item.question}
            className="rounded-[20px] bg-card border border-border overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-[900] text-black text-base sm:text-lg">
                {item.question}
              </span>
              <Icon
                icon="mdi:chevron-down"
                width={22}
                className={`text-black shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
              />
            </button>
            {open && (
              <p className="px-6 pb-5 text-sm text-mid leading-[1.7] whitespace-pre-line">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
