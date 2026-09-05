/**
 * LP Day — traced from the Figma prototype's frame (node 320-55).
 *
 * Eight bands: the auditorium hero, the intro, the dark "why it exists" field
 * with its scrolling list, the programme grid, the gallery with a carousel per
 * edition, the quotes field, and the closing panel.
 *
 * Every line here is the frame's own copy. The gallery photographs are the
 * client's, from the Drive folder "LP Day highlights"; the band backgrounds
 * are the frame's image fills.
 */

export const lpDayHero = {
  eyebrow: "LP Day · An annual gathering for India's deep-tech builders",
  line1: "Where capital",
  line2: "meets conviction",
  body: "LP Day is 8X Ventures' annual gathering for India's deep-tech builders, investors, founders, mentors and ecosystem leaders",
  image: "/images/lpday/hero.jpg",
  imageAlt:
    "A full auditorium seen from behind the audience, a lone speaker on stage against a large blue screen.",
} as const;

export const lpDayIntro = {
  line1: "Operators. Investors.",
  line2: "Technologists.",
  sub1: "One room. One ecosystem.",
  sub2: "One conversation around India's deep-tech future.",
  body: "LP Day brings together the people backing, building and enabling the next generation of frontier companies from India.",
} as const;

export const lpDayWhy = {
  eyebrow: "Why LP Day exists",
  line1: "Deep-tech needs",
  line2: "more than capital",
  /** The frame lights the third and dims the rest — the same device as
   *  `/about`'s philosophy list, so it is built the same way. */
  items: [
    "Patient investors",
    "Technical mentors",
    "Industry access",
    "Policy awareness",
    "Commercial pathways",
    "Long-term conviction",
  ],
  activeIndex: 2,
  close: "LP Day is designed to bring these forces closer together.",
  image: "/images/lpday/why.jpg",
} as const;

export const lpDayProgramme = {
  eyebrow: "The Programme",
  line1: "What happens",
  line2: "at LP Day",
  items: [
    {
      title: "Founder showcases",
      body: "Portfolio companies and deep-tech founders present the technologies they are building.",
    },
    {
      title: "Investor conversations",
      body: "Capital partners discuss India's deep-tech opportunity and the role of patient capital.",
    },
    {
      title: "Sector insights",
      body: "Experts share perspectives across computing, climate, biotech, robotics, cybersecurity, space and industrial systems",
    },
    {
      title: "Ecosystem exchange",
      body: "Mentors, operators, institutions and founders connect around real company-building needs",
    },
  ],
} as const;

export type GalleryImage = { src: string; alt: string };

export type LpDayEdition = {
  year: string;
  body: string;
  images: readonly GalleryImage[];
};

export const lpDayGallery = {
  eyebrow: "Gallery & Highlights",
  line1: "Moments from",
  line2: "the 8X ecosystem",
  body: "Founders, investors, mentors and partners in conversation around India's frontier technology opportunity.",
  /* The frame's own photographs, in its own order — 2026 first, then 2025.
     The client's Drive folder "LP Day highlights" holds the real event
     photography (92 frames from 2025, 50 from 2026); swapping these for those
     is a change to this array and nothing else. */
  editions: [
    {
      year: "2026",
      body: "India's deep-tech ecosystem is entering a more serious phase. The conversation is moving from possibility to proof, from early signals to commercial scale, from isolated founders to a connected capital platform.",
      images: [
        { src: "/images/lpday/2026-1.jpg", alt: "A panel on stage in front of a large blue screen." },
        { src: "/images/lpday/2026-2.jpg", alt: "Guests talking beside a window overlooking the city." },
        { src: "/images/lpday/2026-3.jpg", alt: "A panel seated on a darkened stage under a blue screen." },
        { src: "/images/lpday/2026-4.jpg", alt: "Guests networking in a bright glass atrium." },
      ],
    },
    {
      year: "2025",
      body: "A gathering of founders, investors and ecosystem partners around the companies building India's technological depth.",
      images: [
        { src: "/images/lpday/2025-1.jpg", alt: "Guests in conversation beside a tall window with a city view." },
        { src: "/images/lpday/2025-2.jpg", alt: "An audience facing a stage lit by spotlights." },
        { src: "/images/lpday/2025-3.jpg", alt: "Guests networking, a domed building visible through the glass." },
        { src: "/images/lpday/2025-4.jpg", alt: "A wide auditorium with a panel beneath a large blue screen." },
      ],
    },
  ] as readonly LpDayEdition[],
} as const;

export const lpDayQuotes = {
  heading: "What the ecosystem says.",
  items: [
    "Deep-tech requires patient capital and serious networks.",
    "India has the talent. The next step is building the capital architecture around it.",
    "LP Day brings the right people into the room.",
  ],
  image: "/images/lpday/quotes.jpg",
} as const;

export const lpDayCta = {
  line1: "India's deep-tech story",
  line2: "is being built now.",
  line3: "Be part of the room.",
  link: { label: "Connect With Us", href: "/contact" },
  /* The frame's own plate (node fill, 4096x2458): a dark crescent sweeping in
     from the left with the indigo opening out to the right. */
  image: "/images/lpday/cta-panel.jpg",
} as const;
