"use client";

import { useRef } from "react";
import { LINKS } from "@/lib/links";

export interface Review {
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 16l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 4l6 6-6 6" />
    </svg>
  );
}

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <div>
      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous review"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 bg-white border border-border rounded-full shadow-sm hover:bg-blue-pale text-blue transition-colors"
        >
          <ChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto sm:mx-14 pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review) => (
            <div
              key={review.title}
              className="w-80 flex-none snap-start bg-white rounded-2xl p-7 border border-border flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#00b67a] text-lg tracking-tight">★★★★★</span>
                {review.verified && (
                  <span className="text-xs text-muted font-medium">Verified</span>
                )}
              </div>
              <h3 className="font-bold text-black text-sm mb-3 leading-snug">
                {review.title}
              </h3>
              <p className="text-mid text-sm leading-relaxed flex-1 line-clamp-6">
                {review.body}
              </p>
              {review.date && (
                <p className="text-xs text-muted mt-4">{review.date}</p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          aria-label="Next review"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 bg-white border border-border rounded-full shadow-sm hover:bg-blue-pale text-blue transition-colors"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="mt-8 text-center">
        <a
          href={LINKS.trustpilot}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue text-sm font-semibold hover:text-blue-dark transition-colors"
        >
          See all reviews on Trustpilot →
        </a>
      </div>
    </div>
  );
}
