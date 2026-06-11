"use client";

import { useRef } from "react";
import { LINKS } from "@/lib/links";

const REVIEWS = [
  {
    title: "We had such a lovely time at the family rollerskating disco",
    body: "It was really well organised, and even the first-timers had plenty of space to find their feet around the sports hall. The speedy skaters got their own time too, which kept things fun for everyone. The stewards were brilliant — always skating around, keeping an eye on things, and straight over to help if anyone took a tumble. It felt really safe and relaxed. There were snacks and drinks to buy, the music was great, and the whole afternoon just had a really fun, friendly vibe. We'll definitely be back.",
    date: "May 2026",
    verified: true,
  },
  {
    title: "Wonderful community driven org.",
    body: "Wonderful community driven organisation! We were recommended to give the kids skate session a go through another skating community, I am very happy I gave Empowr a chance. My child loves the sessions, has improved confidence week on week and feels like part of the community. I especially like the safety measures in place — ensuring the kids understand the need for safety is so important in London for those who desire to skate outdoors.",
    date: "October 2025",
    verified: true,
  },
  {
    title: "AMAZING!!!",
    body: "From start to finish this was amazing, all staff kind and friendly going above and beyond to ensure children had a great time!! Level of care and effort is outstanding!! Highly recommend to all!! Children can't wait to get on their skates now.",
    date: "November 2024",
    verified: true,
  },
  {
    title: "My grandchildren were really happy and enjoyed the classes",
    body: "My grandchildren were really happy and enjoyed attending the roller skating classes, where they gained confidence as well as learnt skills and new techniques. The holiday camp sessions were fantastic — the children were very disappointed when I was unable to take them to all the sessions, and ecstatic for the ones they attended! Well done Jaz 🙂",
    date: "November 2024",
    verified: true,
  },
  {
    title: "Very positive",
    body: "My daughter's skating has improved significantly. Now she is trying skating at the park, where she didn't have the confidence to do this before.",
    date: "February 2026",
    verified: true,
  },
  {
    title: "Roller skating birthday party",
    body: "Empowr CIC hosted my son's roller skating birthday party. He had an amazing time and so did all of his friends. The Empowr CIC team were kind, helpful and super patient with all the children. I've had so many messages saying what a great party it was and this is all down to your team — so once again, thank you.",
    date: "November 2023",
    verified: false,
  },
  {
    title: "My daughter loves coming to the sessions",
    body: "My daughter loves coming to the sessions. The teacher is lovely and welcoming, and the children are friendly too!",
    date: "November 2022",
    verified: false,
  },
  {
    title: "A great organisation",
    body: "A great organisation — we have used it for lessons for our daughter and booked a party with them.",
    date: "July 2025",
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

export default function KidsReviewsCarousel() {
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
