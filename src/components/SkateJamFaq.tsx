'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

interface FaqItem {
  question: string;
  answer: string;
}

// SCAFFOLD — placeholder copy only. Confirm real answers with Empowr before this section ships.
const FAQS: FaqItem[] = [
  {
    question: "Do I need my own skates?",
    answer: 'Draft answer — to be confirmed before this section goes live.',
  },
  {
    question: "What if I can't make a week I've paid for?",
    answer: 'Draft answer — to be confirmed before this section goes live.',
  },
  {
    question: 'Can I cancel my membership anytime?',
    answer: 'Draft answer — to be confirmed before this section goes live.',
  },
  {
    question: 'What should I wear?',
    answer: 'Draft answer — to be confirmed before this section goes live.',
  },
  {
    question: 'Is it suitable for complete beginners?',
    answer: 'Draft answer — to be confirmed before this section goes live.',
  },
];

export default function SkateJamFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-[880px] mx-auto px-5 pb-14">
      <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-red mb-4">
        FAQ
      </p>
      <div className="flex flex-col gap-4">
        {FAQS.map((item, i) => {
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
                <p className="px-6 pb-5 text-sm text-mid leading-[1.7]">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
