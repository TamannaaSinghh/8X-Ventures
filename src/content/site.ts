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
  /** Where 8X asks founders to send a deck. */
  pitchEmail: "pitch@8xventures.co",
  /** The official lock-up, from the client's Drive, used as the social card. */
  ogImage: "/images/og-8x-ventures.png",
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

/**
 * 8X's three offices, as their own website copy deck and their live contact
 * page state them. The footer links point at these anchors.
 */
export const offices = [
  {
    id: "chennai",
    city: "Chennai",
    country: "India",
    label: "IIT Madras Research Park",
    address: "D403, IIT Madras Research Park, Taramani, Chennai",
  },
  {
    id: "noida",
    city: "Noida",
    country: "India",
    label: "India’s First Private DeepTech Hub",
    address: "C 44, 2nd Floor, C Block, Sector 2, Noida, Uttar Pradesh 201301",
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    label: "Business Bay",
    address: "Vision Tower, Al Khaleej Al Tejari 1st, Business Bay, Dubai",
  },
] as const;

/**
 * 8X's actual accounts, taken from the footer of 8xventures.co: X (still
 * posting as @8xVentures), LinkedIn and YouTube. The build previously linked
 * Facebook and Instagram profiles that 8X does not run.
 */
export const socialLinks = [
  {
    label: "8X Ventures on X",
    short: "X",
    href: "https://twitter.com/8xVentures",
  },
  {
    label: "8X Ventures on LinkedIn",
    short: "LinkedIn",
    href: "https://www.linkedin.com/company/80893520/",
  },
  {
    label: "8X Ventures on YouTube",
    short: "YouTube",
    href: "https://www.youtube.com/channel/UCrbRcoW-B5RqbCORkCqIQ4w",
  },
] as const;

export const footerBlurb =
  "8X Ventures backs deep-tech founders building the technological foundations of the next economy.";

export const copyrightYear = 2026;
