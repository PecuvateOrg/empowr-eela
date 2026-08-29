import ReviewsCarousel, { type Review } from "@/components/ReviewsCarousel";

const REVIEWS: Review[] = [
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

export default function AdultsReviewsCarousel() {
  return <ReviewsCarousel reviews={REVIEWS} />;
}
