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
  cta: { label: "Let’s Explore", href: "#manifesto" },
} as const;

export type Sector = {
  name: string;
  /**
   * Shown in the hero popup. Written from 8X's own sector language in the
   * website copy deck and from what the portfolio actually does in each
   * sector — one sentence, 12–15 words, to fit the panel.
   */
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
      "Chip-level security, photonics and interconnects that decide what every other technology can do.",
    x: 17,
    y: 55,
    place: "top",
  },
  {
    name: "Robotics",
    description:
      "Machines that see, decide and act — in fields, in pipelines and on factory floors.",
    x: 27,
    y: 30,
    place: "top",
  },
  {
    name: "Powertrains",
    description:
      "Clean hydrogen, thermal systems and materials moving industry off fossil fuels.",
    x: 36,
    y: 72,
    place: "bottom",
  },
  {
    name: "Manufacturing",
    description:
      "Indigenous components, connectors and processes that India currently has to import.",
    x: 50,
    y: 48,
    place: "bottom",
  },
  {
    name: "Sensors",
    description:
      "Instruments that read heat, corrosion and flow where conventional sensing fails.",
    x: 68,
    y: 31,
    place: "top",
  },
  {
    name: "Industrial Systems",
    description:
      "Software and hardware tying plants, assets and supply chains into one system.",
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

/**
 * The three figures 8X publishes under "Proof" in its website copy deck.
 * The homepage section renders `stats[0]` as the live figure and `stats[1]`
 * ghosted behind it, exactly as the artboard composes them; `stats[2]` is
 * the third published figure, carried here so the set stays whole.
 */
export const stats: Stat[] = [
  { value: 400, prefix: "₹", suffix: "+Cr", label: "Portfolio revenue generated" },
  { value: 70, suffix: "+", label: "Patents across portfolio companies" },
  { value: 2000, prefix: "₹", suffix: "+Cr", label: "Portfolio order book" },
];

/* --- Portfolio ----------------------------------------------------------- */

export type PortfolioCompany = {
  id: string;
  name: string;
  /** The short sector label on the card's first pill. */
  sector: string;
  /** The fund shown on the card's second pill. */
  vehicle: string;
  /** Every fund the company sits in — what the portfolio filters read. */
  vehicles?: string[];
  /**
   * The card's figure line: a bold value with a lighter word beside it — the
   * slot the artboard fills with "$4M Raised". 8X does not publish a raise
   * amount per company, so this carries the company's current stage, which
   * their own portfolio brochure states.
   */
  metric: { value: string; label: string };
  /** 8X's own one-line website descriptor for the company. */
  description: string;
  /** Optional pull quote. None are set — see the note above `portfolio`. */
  quote?: { text: string; attribution: string };
  /** The company's own site. Not on the card in v5.0; kept for later use. */
  website: string;
  image: string;
  /** Empty string renders the tinted placeholder panel used in the design. */
  imageAlt: string;
};

export const portfolioHeadline = { lead: "Founders at", accent: "the Frontier" } as const;

/**
 * 8X's portfolio — all twelve companies, from the per-company briefs in the
 * client's Drive ("Portfolio companies' details") and their own portfolio
 * brochure. Each `description` is the brief's own "Website descriptor"; each
 * `metric`, and the founding line in `content/portfolio.ts`, is the
 * brochure's.
 *
 * `image` is the company's logo from the Drive's "Logos of Portfolio
 * Companies" folder. It is the only company-specific artwork the client has
 * supplied — the briefs send anyone wanting photography to each company's own
 * site — so the card's picture panel now holds the logo on a white plate
 * instead of the single stock photograph that stood in for every company.
 *
 * **No quotes.** The entries here used to carry invented founder quotes
 * attributed to real, named companies; those are gone. 8X's copy deck does
 * have three real founder quotes, but publishes them unattributed and in a
 * homepage section the v5.0 design does not contain, so there is nowhere
 * honest to put them yet.
 *
 * **Fund attribution needs 8X to confirm.** The artboard's pills are "Fund I"
 * and "Fund II - Coming Soon" (greyed out), so every card is tagged Fund I as
 * the build already did, with Solinas also in the SPV portfolio. 8X's own
 * material shows Fund II is in fact investing, so both the pill and the
 * per-company tags should be reviewed before launch.
 */
export const portfolio: PortfolioCompany[] = [
  {
    id: "pantherun",
    name: "Pantherun Technologies",
    sector: "Cybersecurity",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    metric: { value: "Series A", label: "stage" },
    description: "High-speed data protection and encryption technology.",
    website: "https://pantherun.com/",
    image: "/images/portfolio/pantherun.png",
    imageAlt: "Pantherun Technologies logo.",
  },
  {
    id: "tiea-connectors",
    name: "TIEA Connectors",
    sector: "Electronics",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    metric: { value: "Series A", label: "stage" },
    description: "Indigenous electrical and electronic connectors for demanding applications.",
    website: "https://www.tieaconnectors.com/",
    image: "/images/portfolio/tiea.png",
    imageAlt: "TIEA Connectors logo.",
  },
  {
    id: "solinas-integrity",
    name: "Solinas Integrity",
    sector: "WaterTech",
    vehicle: "SPV Portfolio",
    vehicles: ["SPV Portfolio", "Fund I"],
    metric: { value: "Series A+", label: "stage" },
    description: "Robotics and intelligence for water and sanitation infrastructure.",
    website: "https://solinas.in/",
    image: "/images/portfolio/solinas.png",
    imageAlt: "Solinas Integrity logo.",
  },
  {
    id: "xyma-analytics",
    name: "XYMA Analytics",
    sector: "Industrial IoT",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    metric: { value: "Series A", label: "stage" },
    description: "Ultrasonic sensing and Industrial IoT for extreme industrial environments.",
    website: "https://xyma.in/",
    image: "/images/portfolio/xyma.png",
    imageAlt: "XYMA Analytics logo.",
  },
  {
    id: "lightspeed-photonics",
    name: "LightSpeed Photonics",
    sector: "Photonics",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    metric: { value: "Series A", label: "stage" },
    description: "Optical interconnects for high-performance and AI computing.",
    website: "https://lightspeedphotonics.com/",
    image: "/images/portfolio/lightspeed.png",
    imageAlt: "LightSpeed Photonics logo.",
  },
  {
    id: "sanchiconnect",
    name: "SanchiConnect",
    sector: "Ecosystem",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    metric: { value: "Pre-Series A", label: "stage" },
    description:
      "A deep-tech enablement network connecting startups, capital and innovation ecosystems.",
    website: "https://sanchiconnect.com/",
    image: "/images/portfolio/sanchiconnect.png",
    imageAlt: "SanchiConnect logo.",
  },
  {
    id: "neuralzome",
    name: "Neuralzome Cybernetics",
    sector: "Robotics",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    metric: { value: "Pre-Seed", label: "stage" },
    description: "Teachable autonomy for agriculture and off-road operations.",
    website: "https://www.neuralzome.com/",
    image: "/images/portfolio/neuralzome.png",
    imageAlt: "Neuralzome Cybernetics logo.",
  },
  {
    id: "trishul-space",
    name: "Trishul Space",
    sector: "SpaceTech",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    metric: { value: "Pre-Seed", label: "stage" },
    description: "Advanced liquid propulsion for next-generation launch vehicles.",
    website: "https://trishulspace.com/",
    image: "/images/portfolio/trishul.png",
    imageAlt: "Trishul Space logo.",
  },
  {
    id: "enerzi",
    name: "Enerzi",
    sector: "ClimateTech",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    metric: { value: "Seed", label: "stage" },
    description: "Microwave and plasma systems for cleaner industrial processes.",
    website: "https://enerzi.co/",
    image: "/images/portfolio/enerzi.png",
    imageAlt: "Enerzi Microwave Systems logo.",
  },
  {
    id: "kcat-enzymatic",
    name: "Kcat Enzymatic",
    sector: "BioTech",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    metric: { value: "Pre-Series A", label: "stage" },
    description: "AI-enabled enzyme engineering for sustainable chemical manufacturing.",
    website: "https://kcat.co.in/",
    image: "/images/portfolio/kcat.png",
    imageAlt: "Kcat Enzymatic logo.",
  },
  {
    id: "armory",
    name: "Armory",
    sector: "DefenceTech",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    metric: { value: "Pre-Series A", label: "stage" },
    description: "Counter-drone systems designed to defend Bharat.",
    website: "https://www.armory.in/",
    image: "/images/portfolio/armory.png",
    imageAlt: "Armory logo.",
  },
  {
    id: "thermistance",
    name: "Thermistance Technologies",
    sector: "Thermal Tech",
    vehicle: "Fund I",
    vehicles: ["Fund I"],
    metric: { value: "Seed", label: "stage" },
    description:
      "Passive cooling systems for high-performance electronics and industrial equipment.",
    website: "https://thermistance.com/",
    image: "/images/portfolio/thermistance.png",
    imageAlt: "Thermistance Technologies logo.",
  },
];

/* --- Founder journey ------------------------------------------------------
   The artboard renders only the active node ("Technology Validation"). The
   arc has seven, and its geometry depends on that count, so seven is what
   this is: 8X's own five — "technology validation, customer access, capital
   strategy, governance, and long-term scale", from the Founder Proposition
   in their website copy deck — opened by the two steps their own approach
   copy names before an investment, Discovery and Research.
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
    description:
      "The founders we partner with are rare. We look for them before consensus forms.",
    icon: "search",
  },
  {
    id: "research",
    title: "Research",
    description:
      "We study the science, the market and the moat before we commit to anything.",
    icon: "beaker",
  },
  {
    id: "technology-validation",
    title: "Technology Validation",
    description:
      "We test what the technology really does, and what it will take to make it work at scale.",
    icon: "chip",
  },
  {
    id: "customer-access",
    title: "Customer Access",
    description:
      "We open doors — to customers, corporates, research institutions and the wider ecosystem.",
    icon: "factory",
  },
  {
    id: "capital-strategy",
    title: "Capital Strategy",
    description:
      "We help plan the rounds ahead, not only the one immediately in front of you.",
    icon: "chart",
  },
  {
    id: "governance",
    title: "Governance",
    description:
      "Board discipline, compliance and reporting built for institutional scale from the start.",
    icon: "brain",
  },
  {
    id: "long-term-scale",
    title: "Long-Term Scale",
    description:
      "We are not investors passing through. We partner for the long arc of the company.",
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
        "Members of the 8X Ventures team beside the Annual Investors Meet banner at LP Day 2025, IIT Madras Research Park.",
    },
    {
      year: "2026",
      href: "/media/lp-day-2026",
      image: "/images/lpday-2026.jpg",
      imageAlt:
        "The full LP Day 2026 gathering — investors, founders and mentors — photographed together on the lawn.",
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
