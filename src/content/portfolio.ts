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
 * The card's lower half. The summary is each company's own description; the
 * stage lines are the artboard's, which sets the same two on every card, so
 * those are PLACEHOLDER copy awaiting 8X's own — see the README.
 */
export type PortfolioCard = PortfolioCompany & {
  /** The card's summary line, above the stage. */
  summary: string;
  stageLabel: string;
  stageNote: string;
};

const PLACEHOLDER_STAGE_LABEL = "Invested at: Seed Stage";
const PLACEHOLDER_STAGE_NOTE = "Scaled from product validation to commercial deployment.";

export const portfolioCards: readonly PortfolioCard[] = portfolio.map((company) => ({
  ...company,
  summary: company.description,
  stageLabel: PLACEHOLDER_STAGE_LABEL,
  stageNote: PLACEHOLDER_STAGE_NOTE,
}));

export const portfolioCta = {
  lead: "Building in deep-tech?",
  line1: "We would like to understand what",
  line2: "you see before others do.",
  link: { label: "Share Your Vision", href: "/contact" },
} as const;
