/**
 * Portfolio page content, traced from artboard page 3 (1920 × 5155) and the
 * Figma prototype of the same frame.
 *
 * The companies themselves live in `content/home.ts` — the homepage carousel
 * and this grid are the same list — and are extended here with the two lines
 * the card carries that the carousel does not.
 */

import { portfolio, type PortfolioCompany } from "@/content/home";

export const portfolioHero = {
  /** Three lines, broken as the artboard breaks them. */
  lines: ["A Portfolio", "of Frontier", "Builders"],
  body: "We back companies creating new capabilities across deep-tech sectors.",
} as const;

/**
 * No eyebrow above this heading: the PDF export sets a "PORTFOLIO" label there,
 * the prototype does not, and the prototype is the reference.
 */
export const portfolioIntro = {
  line1: "Companies Building What",
  line2: "Comes Next",
} as const;

/**
 * The artboard's four filters, in its order. `vehicle` matches the company
 * field of the same name; `null` is the "everything" case, and `comingSoon`
 * is the greyed-out fourth pill — a real button, but disabled, because there
 * is nothing behind it yet.
 */
export type PortfolioFilter = {
  id: string;
  label: string;
  vehicle: string | null;
  comingSoon?: boolean;
};

export const portfolioFilters: readonly PortfolioFilter[] = [
  { id: "all", label: "All", vehicle: null },
  { id: "spv", label: "SPV Portfolio", vehicle: "SPV Portfolio" },
  { id: "fund-i", label: "Fund I", vehicle: "Fund I" },
  { id: "fund-ii", label: "Fund II - Coming Soon", vehicle: "Fund II", comingSoon: true },
];

/**
 * The card's lower half.
 *
 * `summary` is the company's own website descriptor, carried over from
 * `content/home.ts`. `stageLabel` and `stageNote` are the two lines the
 * artboard sets identically on every card ("Invested at: Seed Stage" /
 * "Scaled from product validation to commercial deployment."); those
 * placeholders are gone. Each card now states where the company was founded
 * and what it builds, from its own brief in the client's Drive and from 8X's
 * portfolio brochure.
 */
export type PortfolioCard = PortfolioCompany & {
  /** The card's summary line, above the stage. */
  summary: string;
  stageLabel: string;
  stageNote: string;
};

/** Founding year, home city and the one-line "what they build", per company. */
const DETAILS: Record<string, { founded: string; note: string }> = {
  pantherun: {
    founded: "Founded 2019 · Bengaluru",
    note: "Real-time, hardware-assisted encryption for defence, telecom, industrial and IoT systems.",
  },
  "tiea-connectors": {
    founded: "Founded 2020 · Bengaluru",
    note: "Connectors, harnesses and interconnect assemblies for EV, aerospace and defence programmes.",
  },
  "solinas-integrity": {
    founded: "Founded 2018 · Chennai",
    note: "Robotic inspection and cleaning systems for pipelines, sewers and septic infrastructure.",
  },
  "xyma-analytics": {
    founded: "Founded 2019 · Chennai",
    note: "Waveguide ultrasonic sensors and analytics for monitoring high-temperature industrial assets.",
  },
  "lightspeed-photonics": {
    founded: "Founded 2021 · Hyderabad",
    note: "Near-chip optical interconnects that move data at high bandwidth and far lower power.",
  },
  sanchiconnect: {
    founded: "Founded 2022 · Noida",
    note: "Accelerator programmes and SaaS tools linking founders to investors, corporates and labs.",
  },
  neuralzome: {
    founded: "Founded 2023 · Bengaluru",
    note: "Autonomous mowing, weeding and soil-sensing robots, run from a single dashboard.",
  },
  "trishul-space": {
    founded: "Founded 2022 · New Delhi",
    note: "Indigenous liquid rocket engines, including the Harpy-1 staged-combustion programme.",
  },
  enerzi: {
    founded: "Founded 2007 · Belagavi",
    note: "Microwave-plasma reactors for clean hydrogen, alongside industrial microwave heating systems.",
  },
  "kcat-enzymatic": {
    founded: "Founded 2018 · Bengaluru",
    note: "Custom biocatalysts that let chemical and pharmaceutical makers run cleaner, higher-yield processes.",
  },
  armory: {
    founded: "Founded 2024 · Gurugram",
    note: "Counter-drone detection, jamming and interception systems, designed and built in India.",
  },
  thermistance: {
    founded: "Founded 2020 · Pune",
    note: "Heat pipes, vapour chambers and loop heat pipes for EVs, satellites, data centres and defence.",
  },
};

export const portfolioCards: readonly PortfolioCard[] = portfolio.map((company) => {
  const detail = DETAILS[company.id];
  if (!detail) throw new Error(`No portfolio card detail for "${company.id}"`);
  return {
    ...company,
    summary: company.description,
    stageLabel: detail.founded,
    stageNote: detail.note,
  };
});

export const portfolioCta = {
  lead: "Building in deep-tech?",
  line1: "We would like to understand what",
  line2: "you see before others do.",
  link: { label: "Share Your Vision", href: "/contact" },
} as const;
