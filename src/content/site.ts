/**
 * Global site content: navigation, footer, identity.
 * Everything a copywriter might change lives in `src/content` — no strings
 * are hard-coded inside components.
 */

export type NavItem = {
  label: string;
  href: string;
  /** Rendered as the accented call-to-action at the end of the nav. */
  emphasis?: boolean;
};

export const siteConfig = {
  name: "8X Ventures",
  /** Used for <title> templates and structured data. */
  tagline: "Backing DeepTech founders before the world catches up.",
  description:
    "8X Ventures backs deep-tech founders building the technological foundations of the next economy — semiconductors, robotics, powertrains, manufacturing, sensors and industrial systems.",
  url: "https://www.8xventures.co",
  locale: "en-IN",
} as const;

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Media", href: "/media" },
  { label: "Reach Out", href: "/contact", emphasis: true },
];

export const footerColumns: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Team", href: "/team" },
      { label: "Perspectives", href: "/media" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Share Your Vision", href: "/contact" },
      { label: "Contact", href: "/contact" },
      { label: "Disclosures", href: "/disclosures" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
  {
    heading: "Offices",
    links: [
      { label: "Chennai Office", href: "/contact#chennai" },
      { label: "Noida Office", href: "/contact#noida" },
      { label: "Dubai Office", href: "/contact#dubai" },
    ],
  },
];

export const socialLinks = [
  {
    label: "8X Ventures on Facebook",
    short: "Facebook",
    href: "https://www.facebook.com/8xventures",
  },
  {
    label: "8X Ventures on Instagram",
    short: "Instagram",
    href: "https://www.instagram.com/8xventures",
  },
  {
    label: "8X Ventures on LinkedIn",
    short: "LinkedIn",
    href: "https://www.linkedin.com/company/80893520",
  },
] as const;

export const footerBlurb =
  "8X Ventures backs deep-tech founders building the technological foundations of the next economy.";

export const copyrightYear = 2026;
