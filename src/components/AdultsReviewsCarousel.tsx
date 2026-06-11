"use client";

import { useRef } from "react";
import { LINKS } from "@/lib/links";

const REVIEWS = [
  {
    title: "Happy 🛼😊👍🏾",
    body: "I had been lurking in the Empowr CIC WhatsApp group for a while. I'd recommend the reasonably priced, well-structured courses. The staff are very helpful and knowledgeable; the attendees are friendly too. There are plenty of events and meet ups. The Empowr social media and marketing champions diversity which is important as I'm a mature rollerskater at Beginner Foundation level. The booking system is straightforward so I booked a 4 week course in April and May 2026. I'm pleased with the progress I'm making. It's worth the journey from NW10.",
    date: "April 2026",
    verified: true,
  },
  {
    title: "Great community of skaters",
    body: "Great community of skaters. I'm a complete beginner and this is perfect for me. There are also more advanced skaters but class is split to accommodate all levels. Great sessions and throughly enjoyable. Highly recommended!!",
    date: "October 2024",
    verified: true,
  },
  {
    title: "Fabulous community spirit and you learn so much at your own pace",
    body: "Fabulous community spirit and you learn so much at your own pace. I love going to the courses!",
    date: "May 2026",
    verified: true,
  },
  {
    title: "Lovely all around",
    body: "Lovely staff, lovely environment! Had a great time.",
    date: "May 2026",
    verified: true,
  },
  {
    title: "Great courses!",
    body: "",
    date: "June 2026",
    verified: true,
  },
  {
    title: "For a first session — Hands On, you can do it",
    body: "For a first session the Hands On, you can do it approach is FIRST CLASS. Location is accessible to all and user friendly. 🙌🙌🙌",
    date: "July 2023",
    verified: false,
  },
  {
    title: "Excellent class and it always has a great crowd",
    body: "Excellent class and it always has a great crowd of learners and intermediate skaters. Great teachers who are really patient and everyone encourages each other — all are welcome.",
    date: "March 2023",
    verified: false,
  },
  {
    title: "Great local class, with great tutors",
    body: "This is a really great, local class where your skills are assessed and really good support provided in each lesson. This is really a beginner's/improvers class, so that you can take your time to learn new moves or improve at your own pace. Recommended.",
    date: "December 2022",
    verified: false,
  },
];

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

export default function AdultsReviewsCarousel() {
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
          {REVIEWS.map((review) => (
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
