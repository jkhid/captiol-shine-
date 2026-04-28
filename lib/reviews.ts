export type CustomerReview = {
  name: string;
  rating: number;
  source: string;
  serviceLabel: string;
  text: string;
};

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    name: "Joshua Kwok",
    rating: 5,
    source: "Google review",
    serviceLabel: "Whole-home clean",
    text:
      "Great service, super satisfied with the cleaning service! They arrived right on time, were super professional and friendly, and left my house sparkling clean from top to bottom. Every surface, floor, and even the hard to reach spots were spotless. I've tried a few services before, but this one is by far the best. Highly recommend, will definitely be booking them again!",
  },
  {
    name: "Eren Yeager",
    rating: 5,
    source: "Google review",
    serviceLabel: "Move-out deep clean",
    text:
      "Hired Jay and Capitol Shine for a deep clean before we moved out. The kitchen and bathrooms looked brand new. Amazing communication, easy to book, and fair pricing. Really recommend their services!",
  },
  {
    name: "Josephine Kim",
    rating: 5,
    source: "Google review",
    serviceLabel: "Biweekly cleaning",
    text:
      "Capitol Shine does my biweekly cleaning in Arlington - consistently great service and reliable. Jay communicates well and always makes scheduling easy. Highly recommended.",
  },
  {
    name: "Cole Phillips",
    rating: 5,
    source: "Google review",
    serviceLabel: "First clean",
    text:
      "I don't know what kind of sorcery they're using, but my place went from 'lived-in chaos' to 'did I accidentally move into a model unit?' in a few hours. I'm talking floors so clean I considered eating off them (didn't... but thought about it), counters sparkling like they've got a skincare routine, and a bathroom that no longer judges me.",
  },
  {
    name: "Youssuf Abouissa",
    rating: 5,
    source: "Google review",
    serviceLabel: "General cleaning",
    text: "Great experience. Best cleaning service in the DMV",
  },
];

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join(".")
    .concat(".");
}
