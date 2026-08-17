/**
 * About page content, section by section, in the order of the
 * "8x Website v5.0" artboard (page 2).
 */

export const aboutHero = {
  eyebrow: "About 8X Ventures",
  line1: "A Venture Firm Built",
  line2: "for Deep-Tech",
  body: "8X Ventures backs founders building technologies with the power to transform industries, economies, and national capability.",
  links: [
    { label: "Explore Portfolio", href: "/portfolio", accent: false },
    { label: "Share Your Vision", href: "/contact", accent: true },
  ],
} as const;

export const aboutWho = {
  eyebrow: "Who We Are",
  line1: "We invest where engineering",
  line2: "becomes enterprise.",
} as const;

export const aboutPhilosophy = {
  eyebrow: "Philosophy",
  line1: "How We",
  line2: "Work",
  /** The artboard highlights the middle step and fades the two either side. */
  items: ["Find Early", "Understand Deeply", "Build Patiently"],
  activeIndex: 1,
} as const;

export type JourneyEntry = {
  year: string;
  kicker: string;
  title: string;
  body: string;
};

/**
 * Timeline entries from the profile copy on 8xventures.co/about. The artboard
 * shows 2022, so the rail opens there; the arrows step through all four.
 */
export const aboutJourney = {
  eyebrow: "Our Journey",
  line1: "From Conviction",
  line2: "To Institution",
  initialIndex: 1,
  entries: [
    {
      year: "2021",
      kicker: "Founded - The Vision",
      title: "Bridging breakthrough technology and capital",
      body: "8X Ventures is founded to close the gap between breakthrough technologies and the capital that can scale them, beginning with SPV-based investments.",
    },
    {
      year: "2022",
      kicker: "SPVs - The Thesis",
      title: "Dedicated capital for deep-tech",
      body: "India's deep-tech founders need dedicated capital. Early investments begin through SPVs across WASH, computing, biotech, and Industry 4.0.",
    },
    {
      year: "2023",
      kicker: "India - The Footprint",
      title: "Delhi and IIT Research Park, Chennai",
      body: "The firm expands into India with offices in Delhi and at IIT Research Park, Chennai, deepening its ecosystem work and thought leadership.",
    },
    {
      year: "2024",
      kicker: "Fund II - The Scale",
      title: "A SEBI-registered CAT II fund",
      body: "A second fund launches with a ₹200 crore corpus plus ₹100 crore green shoe, targeting 18–20 startup investments including follow-ons.",
    },
  ] as JourneyEntry[],
} as const;

export const aboutCta = {
  lead: "The next industrial companies may begin as deep-tech startups. ",
  emphasis: "We are here for that journey.",
  links: [
    { label: "Explore Portfolio", href: "/portfolio" },
    { label: "Share Your Vision", href: "/contact" },
  ],
} as const;
