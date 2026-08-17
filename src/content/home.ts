/**
 * Homepage content, section by section, in the order it appears in the
 * "8x Website v5.0" design.
 */

/* --- Hero ---------------------------------------------------------------- */

export const hero = {
  headline: {
    line1: "Backing DeepTech founders",
    line2: "before the world catches up.",
  },
  subhead:
    "8X Ventures invests in companies building the technological foundations of the next economy.",
  cta: { label: "Lets Explore", href: "#manifesto" },
} as const;

export type Sector = {
  name: string;
  /** Shown in the hero popup. PLACEHOLDER — awaiting 8X's own copy. */
  description: string;
  /**
   * Where the popup's hotspot sits on `/images/hero-infinity.png`, as a
   * percentage of the image's own box (not the viewport), so the map holds at
   * every width.
   *
   * The mark is a flat raster with no regions to hook into, so these were read
   * off the file: its ink runs x 122–1814 of 2000 and y 215–1051 of 1250, and
   * each point below sits on the ribbon rather than in one of the two holes.
   * To retune one, change x/y here — nothing else needs to move.
   *
   * Keep every pair at least ~17% of the width apart: at the narrowest layout
   * (a 294px mark at a 320px viewport) that is what keeps the 44px targets
   * from overlapping (WCAG 2.5.8).
   *
   * `place` puts the popup above or below its hotspot — outward, away from the
   * ribbon, so the popup never covers the point it belongs to.
   */
  x: number;
  y: number;
  place: "top" | "bottom";
};

export const sectors: readonly Sector[] = [
  {
    name: "Semiconductors",
    description:
      "Chips, packaging and design tools that decide what every other technology can do.",
    x: 17,
    y: 55,
    place: "top",
  },
  {
    name: "Robotics",
    description:
      "Machines that see, decide and act — on factory floors, in fields and in warehouses.",
    x: 27,
    y: 30,
    place: "top",
  },
  {
    name: "Powertrains",
    description:
      "Batteries, motors and drivetrains moving vehicles and heavy industry off fossil fuels.",
    x: 36,
    y: 72,
    place: "bottom",
  },
  {
    name: "Manufacturing",
    description:
      "New ways to make things: additive processes, novel materials and connected production.",
    x: 50,
    y: 48,
    place: "bottom",
  },
  {
    name: "Sensors",
    description:
      "The instruments that turn the physical world into data precise enough to act on.",
    x: 68,
    y: 31,
    place: "top",
  },
  {
    name: "Industrial Systems",
    description:
      "Software and hardware tying plants, grids and supply chains into one system.",
    x: 78,
    y: 72,
    place: "bottom",
  },
];

/* --- Manifesto banner ---------------------------------------------------- */

/**
 * The sectors as they read inside a sentence. Same list as `sectors` above,
 * lower-cased — the artboard sets the rotating word in running text.
 */
export const sectorsInline = [
  "semiconductors",
  "robotics",
  "powertrains",
  "manufacturing",
  "sensors",
  "industrial systems",
] as const;

/** Index the rotation starts on, so first paint matches the artboard. */
export const sectorsInlineStart = sectorsInline.indexOf("manufacturing");

export const manifesto = {
  line1: "The future will not be inherited.",
  line2: "It will be engineered.",
  supportPre: "We back founders turning ",
  supportPost: " into companies that matter.",
  /**
   * The whole sentence, with every sector spelled out. The rotating word is
   * hidden from assistive tech and this is exposed instead, so the full
   * meaning arrives in one reading rather than changing under the user.
   */
  supportScreenReader:
    "We back founders turning semiconductors, robotics, powertrains, manufacturing, sensors and industrial systems into companies that matter.",
} as const;

/* --- Vision / By the Year 2047 ------------------------------------------- */

export const vision = {
  eyebrow: "By the Year",
  year: "2047",
  body: "India will move from consuming innovation to creating it. From importing progress to inventing the future.",
  closingLine1: "8X Ventures exists",
  closingLine2: "to help build them.",
} as const;

/* --- Stats --------------------------------------------------------------- */

export type Stat = {
  /** Numeric portion used to drive the count-up animation. */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const statsHeadline = "Early signals. Serious scale.";

export const stats: Stat[] = [
  { value: 400, prefix: "₹", suffix: "+Cr", label: "Portfolio revenue generated" },
  { value: 70, suffix: "+", label: "Deep-tech companies evaluated" },
  { value: 18, suffix: "+", label: "Companies invested in" },
  { value: 80, suffix: "Y+", label: "Collective operating experience" },
];

/* --- Portfolio ----------------------------------------------------------- */

export type PortfolioCompany = {
  id: string;
  name: string;
  sector: string;
  /** The fund shown on the card. */
  vehicle: string;
  /** Every fund the company sits in — what the portfolio filters read. */
  vehicles?: string[];
  raised: string;
  description: string;
  quote?: { text: string; attribution: string };
  image: string;
  /** Empty string renders the tinted placeholder panel used in the design. */
  imageAlt: string;
};

export const portfolioHeadline = { lead: "Founders at", accent: "the Frontier" } as const;

/**
 * The six companies 8X lists on 8xventures.co/portfolio (behind its "Load
 * More"), with their own sector and fund labels and their own descriptions,
 * condensed to the two lines the card is drawn for. The artboard fills its
 * grid by repeating three placeholder cards ("Armory"); these are the real
 * ones.
 *
 * `vehicle` is the fund shown on the card; `vehicles` is everything the
 * company sits in, which is what the filters read — Solinas is in two.
 *
 * All of them carry **Fund I**, per 8X. The live site labels most of these
 * "Second Fund", but the design's Fund II pill reads "Coming Soon" and is
 * greyed out, so nothing is tagged to it.
 */
export const portfolio: PortfolioCompany[] = [
  {
    id: "neuralzome",
    name: "Neuralzome",
    sector: "Robotics",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    raised: "$4M",
    description:
      "Autonomous AI agents for off-road robotics, built to think, learn and adapt.",
    quote: {
      text: "They understood the technology before they understood the market.",
      attribution: "Founder, Neuralzome",
    },
    image: "/images/portfolio-team.jpg",
    imageAlt: "The Neuralzome team collaborating in their engineering studio.",
  },
  {
    id: "tiea-connectors",
    name: "TIEA Connectors",
    sector: "Electronics",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    raised: "$4M",
    description:
      "Design, development and manufacturing of connectors and contact solutions.",
    quote: {
      text: "8X backed the hard problem, not the easy pitch.",
      attribution: "Founder, TIEA Connectors",
    },
    image: "/images/portfolio-team.jpg",
    imageAlt: "The TIEA Connectors team in discussion at their facility.",
  },
  {
    id: "trishul-space",
    name: "Trishul Space",
    sector: "Spacetech",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    raised: "$4M",
    description:
      "An IIT Delhi-incubated startup pioneering the development of liquid rocket engines.",
    quote: {
      text: "Conviction capital, at the stage where it actually mattered.",
      attribution: "Founder, Trishul Space",
    },
    image: "/images/portfolio-team.jpg",
    imageAlt: "The Trishul Space team reviewing mission plans together.",
  },
  {
    id: "enerzi",
    name: "Enerzi",
    sector: "Clean Energy",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    raised: "$4M",
    description:
      "Green hydrogen from plasma technology, with advanced industrial microwave systems.",
    image: "/images/portfolio-team.jpg",
    imageAlt: "The Enerzi team at work in their production facility.",
  },
  {
    id: "sanchiconnect",
    name: "SanchiConnect",
    sector: "SaaS",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    raised: "$4M",
    description:
      "Software for startups, incubators and innovation teams scaling deep-tech.",
    image: "/images/portfolio-team.jpg",
    imageAlt: "The SanchiConnect team around a shared workspace.",
  },
  {
    id: "solinas-integrity",
    name: "Solinas Integrity",
    sector: "Cleantech",
    vehicle: "SPV Portfolio",
    vehicles: ["SPV Portfolio", "Fund I"],
    raised: "$4M",
    description:
      "Robotic solutions for water leakage and for ending manual scavenging in sanitation.",
    image: "/images/portfolio-team.jpg",
    imageAlt: "The Solinas Integrity team with one of their robots.",
  },
];

/* --- Founder journey ------------------------------------------------------
   The source design renders only the active node ("Technology Validation").
   The remaining six stage names are a working set — confirm with the
   8X team before launch.
   ------------------------------------------------------------------------ */

export type JourneyStage = {
  id: string;
  title: string;
  description: string;
  /** Key into the icon map in `FounderJourney.tsx`. */
  icon: "search" | "beaker" | "chip" | "brain" | "factory" | "chart" | "globe";
};

export const journeyIntro = {
  eyebrow: "Founder Journey",
  line1: "Capital is available.",
  line2: "Conviction is rare.",
} as const;

export const journey: JourneyStage[] = [
  {
    id: "discovery",
    title: "Discovery",
    description: "We partner with founders through all stages of their growth journey.",
    icon: "search",
  },
  {
    id: "deep-research",
    title: "Deep Research",
    description: "We partner with founders through all stages of their growth journey.",
    icon: "beaker",
  },
  {
    id: "prototype",
    title: "Prototype",
    description: "We partner with founders through all stages of their growth journey.",
    icon: "chip",
  },
  {
    id: "technology-validation",
    title: "Technology Validation",
    description: "We partner with founders through all stages of their growth journey.",
    icon: "brain",
  },
  {
    id: "pilot-deployment",
    title: "Pilot Deployment",
    description: "We partner with founders through all stages of their growth journey.",
    icon: "factory",
  },
  {
    id: "commercial-scale",
    title: "Commercial Scale",
    description: "We partner with founders through all stages of their growth journey.",
    icon: "chart",
  },
  {
    id: "institution",
    title: "Institution Building",
    description: "We partner with founders through all stages of their growth journey.",
    icon: "globe",
  },
];

/* --- Team ---------------------------------------------------------------- */

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  /** Shown on hover / focus. Condensed from the profile pages on 8xventures.co. */
  bio: string;
  linkedin: string;
};

export const teamIntro = {
  eyebrow: "Our Team",
  line1: "Operators. Investors.",
  line2: "Technologists. Institution builders.",
  body: "We partner with founders through all stages of their growth journey.",
  cta: { label: "Meet the Team", href: "/team" },
} as const;

export const team: TeamMember[] = [
  {
    id: "vinod-agarwal",
    name: "Vinod Agarwal",
    role: "Partner & Board Advisor",
    image: "/images/team-1.png",
    bio: "20+ years across multiple entrepreneurial ventures, with success in the polymer and steel industries, and an active investor worldwide in public and private markets.",
    linkedin: "https://www.linkedin.com/in/vinod-agarwal-aba3231b3/",
  },
  {
    id: "shreya-kothari",
    name: "Shreya Kothari",
    role: "Associate Principal",
    image: "/images/team-2.png",
    bio: "Previously an Associate at eClerx Services and Nimai Management Consultants. Holds an MBA from the Institute of Management Technology, Nagpur.",
    linkedin: "https://www.linkedin.com/in/shreyabagri",
  },
  {
    id: "ajay-singh-rajput",
    name: "Ajay Singh Rajput",
    role: "Partner & Board Advisor",
    image: "/images/team-3.png",
    bio: "25+ years across white goods, plastic processing and petrochemicals. Has invested in startups across the Middle East, Asia and Europe.",
    linkedin: "https://www.linkedin.com/in/ajaysingh-rajput-6406146/",
  },
  {
    id: "esha-arya",
    name: "Esha Arya",
    role: "Partner & Board Advisor",
    image: "/images/team-4.png",
    bio: "Vice-Chairman of JBM Group, a $2.7bn conglomerate operating across 10 countries. Mentors early-stage deep-tech startups and sits on advisory boards in the USA, India, UK and Singapore.",
    linkedin: "https://www.linkedin.com/in/eshaarya/",
  },
  {
    id: "rashi-jain",
    name: "Rashi Jain",
    role: "Compliance Associate",
    image: "/images/team-5.png",
    bio: "A qualified Chartered Accountant specialising in taxation, regulatory compliance and statutory reporting, with a focus on accuracy and transparency.",
    linkedin: "https://www.linkedin.com/in/ca-rashi-jain13/",
  },
];

/* --- LP Day -------------------------------------------------------------- */

export const lpDay = {
  eyebrow: "LP Day · An annual gathering for India's deep-tech builders",
  line1: "Operators. Investors.",
  line2: "Technologists.",
  body: "LP Day brings together investors, founders, mentors, and ecosystem leaders around India's deep-tech future.",
  editions: [
    {
      year: "2025",
      href: "/media/lp-day-2025",
      image: "/images/lpday-2025.jpg",
      imageAlt:
        "Two investors in conversation across a low table at LP Day 2025.",
    },
    {
      year: "2026",
      href: "/media/lp-day-2026",
      image: "/images/lpday-2026.jpg",
      imageAlt:
        "Founders and mentors mid-discussion around a table at LP Day 2026.",
    },
  ],
  promo: {
    eyebrow: "LP Day",
    title: "Where Capital Meets Conviction",
    body: "An annual gathering for India's deep-tech builders, investors, founders, and mentors in one room.",
    cta: { label: "LP Day Highlights", href: "/media/lp-day" },
  },
} as const;

/* --- Closing CTA --------------------------------------------------------- */

export const closingCta = {
  line1: "Building something the",
  line2: "world is not ready for yet?",
  ghost: "Good.",
  cta: { label: "Share Your Vision", href: "/contact" },
} as const;
