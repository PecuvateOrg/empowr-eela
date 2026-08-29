import ReviewsCarousel, { type Review } from "@/components/ReviewsCarousel";

const REVIEWS: Review[] = [
  {
    title: "Never fails to boost my week",
    body: "I love the space Empowr have created. I go to the Jam skate on a Thursday and it never fails to boost my week. You can do as much or as little as you like and is such a great way to keep active take your mind off the stresses of life. I'm always really annoyed if I ever have to miss it.",
    date: "September 2025",
    verified: true,
  },
  {
    title: "Honor Oak Community Centre skate jam",
    body: "Great intimate space for all abilities to skate, jam out, share skills and help each other to improve! Great vibes and the mentality of \"each one teach one\" - teaching not only helps others but improves your own skill by encouraging a mindful approach to your skating :)",
    date: "September 2024",
    verified: false,
  },
  {
    title: "Loving my Skate Jam Weekly Fix",
    body: "Loving my weekly Skate Jam fix. The Empowr Crew are so warm and welcoming, the music and vibe is great fun and everyone is on that level!",
    date: "March 2023",
    verified: false,
  },
  {
    title: "I used to go and now I take my 5 year old",
    body: "I used to go and now I take my 5 years old and she loves it. She loves Jasmine and her beautiful daughter who always help her. 100% recommend skate Jam for all ages.",
    date: "March 2023",
    verified: false,
  },
  {
    title: "Loved the Jam skate session on Thursday",
    body: "Loved the Jam skate session on Thursday - It was an inclusive space for beginners through to advanced, everyone was very welcoming and they played good music. I thought it was the perfect mix of having time to jam, do as you please in your own time but also parts that involved everyone together as Jasmine teaches everyone a routine and we did the train. Not only was it really fun I can imagine I'd improve quite quickly after attending regularly as it's the perfect environment to observe/chat to others/ practice and pick up new skills. Thanks Jasmine!",
    date: "September 2022",
    verified: false,
  },
  {
    title: "Had the best evening at the skate jam session",
    body: "Had the best evening at the skate jam session tonight!! Can't wait for this to be a regular fixture, Jasmine was amazing thanks for having us :) good vibes all round, highly recommended.",
    date: "September 2022",
    verified: false,
  },
];

export default function SkateJamReviewsCarousel() {
  return <ReviewsCarousel reviews={REVIEWS} />;
}
