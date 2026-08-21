import ReviewsCarousel, { type Review } from './ReviewsCarousel';

const REVIEWS: Review[] = [
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
    title: "My daughter loves coming to the sessions",
    body: "My daughter loves coming to the sessions. The teacher is lovely and welcoming, and the children are friendly too!",
    date: "November 2022",
    verified: false,
  },
];

export default function AllAgesReviewsCarousel() {
  return <ReviewsCarousel reviews={REVIEWS} />;
}
