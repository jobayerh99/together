/**
 * Content for the homepage hero banner carousel.
 *
 * Each slide is matched to one photograph in `public/images/banner-carousel/`.
 * Image files keep their original names (including spaces) — do not rename them.
 */

export type HeroSlide = {
  /** Stable key for React lists. */
  id: string;
  /** Local path of the banner photograph. */
  image: string;
  /** Meaningful alternative text describing the photograph. */
  alt: string;
  /** Short line shown above the heading. */
  motto: string;
  /** Main heading for the slide. */
  heading: string;
  /** Supporting paragraph. */
  description: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "education",
    image: "/images/banner-carousel/education for childrean.jpg",
    alt: "A group of children reaching their hands towards the camera during an outdoor learning activity",
    motto: "Learning today, leading tomorrow.",
    heading: "Every Child Deserves a Classroom",
    description:
      "Support tutoring, school supplies and mentors that help children in your community dream bigger.",
  },
  {
    id: "cleaning",
    image: "/images/banner-carousel/cleaning.jpg",
    alt: "Five volunteers wearing gloves and holding trash bags during a neighbourhood clean-up",
    motto: "One street at a time.",
    heading: "Cleaner Neighbourhoods, Happier Homes",
    description:
      "Lend a hand in local clean-up drives that restore parks, streets and shared spaces for everyone.",
  },
  {
    id: "food",
    image: "/images/banner-carousel/food for all.jpg",
    alt: "Children sitting together on steps holding bowls of food",
    motto: "A shared meal builds a stronger community.",
    heading: "No One Should Go to Bed Hungry",
    description:
      "Help serve warm meals and food parcels to families going through hard times.",
  },
  {
    id: "health",
    image: "/images/banner-carousel/health camp.jpg",
    alt: "Close-up of a health worker drawing blood from a donor's arm at a blood donation camp",
    motto: "Health is a right, not a privilege.",
    heading: "Care That Reaches Every Doorstep",
    description:
      "Join blood donation drives and free health camps that bring essential care to underserved areas.",
  },
  {
    id: "winter-support",
    image: "/images/banner-carousel/gift for neighbour.jpg",
    alt: "A volunteer carrying a tall stack of folded blankets to deliver to neighbours",
    motto: "One neighbour caring for another.",
    heading: "Warmth Shared Is Hope Multiplied",
    description:
      "Deliver hand-knitted blankets and warm clothing to families who need extra warmth this season.",
  },
  {
    id: "relief-parcels",
    image: "/images/banner-carousel/winter cloth.jpg",
    alt: "Red and green gift bags packed with relief supplies ready for distribution",
    motto: "Season of giving, spirit of together.",
    heading: "Packed with Care, Delivered with Love",
    description:
      "Volunteers fill relief parcels with food and winter essentials and carry them straight to families in need.",
  },
];
