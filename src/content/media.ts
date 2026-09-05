/**
 * Every string on `/media`, transcribed from the Figma prototype frame
 * `media` (1920 x 5037).
 *
 * The LP Day band is the homepage's band verbatim — same eyebrow, same
 * headline, same two editions — so it is read from `content/home.ts` rather
 * than copied here; only the promo strip below it is absent from this frame.
 */

export const mediaHero = {
  line1: "Signals From The",
  line2: "Deep-Tech Frontier",
  body: "Our perspective on the technologies, markets, and policies shaping the next generation of companies.",
  art: {
    src: "/images/media-hero-infinity.png",
    width: 970,
    height: 532,
  },
} as const;

export const mediaBook = {
  cover: {
    src: "/images/media-book.png",
    width: 495,
    height: 780,
    alt: "Moonshots and Marathons — a practical guidebook to building and scaling deep-tech startups in India, by Chirag Gupta, Govind Kedia and Dr Sunil Shekhawat.",
  },
  line1: "Moonshots",
  line2: "and Marathons",
  paragraphs: [
    "Deep-tech companies are both moonshots and marathons, audacious in ambition, patient in execution. This book captures what it takes to build them in India.",
    "A perspective shaped by the founders, mentors, and investors of the 8X ecosystem.",
  ],
  cta: { label: "Get the Book", href: "/media/moonshots-and-marathons" },
} as const;

export const mediaInsights = {
  eyebrow: "Insights",
  line1: "Coverage, Commentary,",
  line2: "Conversations.",
  body: "8X in the media and the gatherings shaping India’s deep-tech ecosystem.",
  /* The frame sets these three as flat plates with a play button rather than
     stills, so no artwork is named. Add `image` to a row when a real still
     exists and the plate steps aside for it. */
  items: [
    {
      title: "8X Ventures - Taking a Giant Leap",
      kicker: "Media Feature",
      href: "/media/8x-ventures-taking-a-giant-leap",
    },
    {
      title: "What does deep-tech investing look like in India?",
      kicker: "Interview",
      href: "/media/deep-tech-investing-in-india",
    },
    {
      title: "Funding Deeptech in India",
      kicker: "Panel Discussion",
      href: "/media/funding-deeptech-in-india",
    },
  ],
} as const;

/**
 * The written pieces, listed below the video insights.
 *
 * The client's content doc splits its Blog page into two: "Videos", which is
 * what `mediaInsights` above already carries, and "Blogs", whose items are
 * kicked "Articles". Only the videos were ever built, so this is the missing
 * half — and the shelf a perspective can be reached from.
 *
 * The heading is the one line here not taken from the doc or the prototype:
 * neither writes a title for this section, and the frame only ever draws the
 * shelf as "Related articles" inside an article.
 */
export const mediaArticles = {
  eyebrow: "Articles",
  lead: "Writing from",
  accent: "the frontier.",
} as const;

/**
 * The frame's closing band is not the homepage's: it is 1920 x 488 rather
 * than 1920 x 1062, it carries no robot arm, and "Good." is live bold text
 * on the second line instead of art baked into the plate. The gradient is
 * `media-cta-bg.jpg`, rebuilt from the frame's own field.
 */
export const mediaCta = {
  line1: "Building something the world",
  line2: "is not ready for yet?",
  emphasis: "Good.",
  link: { label: "Share Your Vision", href: "/contact" },
} as const;
