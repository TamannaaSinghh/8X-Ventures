/**
 * Perspectives — the article pages behind `/media/[slug]`.
 *
 * Traced from the Figma prototype's perspective frame (node 317-759), which is
 * drawn for "Deep-Tech Commercialisation Is Not a Straight Line". That piece's
 * body is the frame's own copy, verbatim; its hero and the three related
 * cards' artwork are the frame's own image fills.
 *
 * `/media/[slug]` was a "this gallery is being prepared" placeholder before
 * this, so every article link on the site was a dead end.
 */

export type ArticleBlock =
  | { kind: "p"; text: string }
  /** The frame's bold run-in headings inside the body. */
  | { kind: "h"; text: string };

export type Article = {
  slug: string;
  /** The frame's meta line: kicker, date, reading time. */
  kicker: string;
  date: string;
  readingTime: string;
  /** The title breaks across two lines, the second in brand blue. */
  title: { line1: string; line2: string };
  /** Flattened for `<title>`, metadata and the related cards. */
  titlePlain: string;
  image: string;
  imageAlt: string;
  body: readonly ArticleBlock[];
};

export const perspectiveLabels = {
  related: { lead: "Related", accent: "articles" },
  /** The kicker the frame prints on each related card. */
  cardKicker: "Articles",
} as const;

export const articles: readonly Article[] = [
  {
    slug: "deep-tech-commercialisation",
    kicker: "Perspective",
    date: "Aug 12, 2026",
    readingTime: "5 min read",
    title: {
      line1: "Deep-Tech Commercialisation",
      line2: "Is Not a Straight Line",
    },
    titlePlain: "Deep-Tech Commercialisation Is Not a Straight Line",
    image: "/images/perspectives/deep-tech-commercialisation.jpg",
    imageAlt:
      "Two engineers in cleanroom suits inspecting a semiconductor wafer on a fabrication line.",
    body: [
      {
        kind: "p",
        text: "Deep-tech companies are not built like conventional startups. The technology cycle is longer, the diligence is deeper, the customer is harder to win and the market may not yet have language for the product. That is what makes the opportunity meaningful.",
      },
      { kind: "h", text: "The first risk is technical. The second is commercial." },
      {
        kind: "p",
        text: "Most deep-tech founders begin with a breakthrough. A sensor that can operate in extreme conditions. A diagnostic platform that changes testing economics. A robotics system that works outside controlled environments. A compute architecture that improves performance at the infrastructure layer.",
      },
      {
        kind: "p",
        text: "But a breakthrough is not yet a company. The work begins when the technology meets the market.",
      },
      { kind: "h", text: "Customers do not buy science. They buy outcomes." },
      {
        kind: "p",
        text: "Deep-tech founders must translate complexity into value: lower downtime, higher accuracy, better yield, lower cost, faster deployment, higher resilience, stronger compliance.",
      },
      {
        kind: "p",
        text: "The more complex the technology, the clearer the commercial case must be.",
      },
      { kind: "h", text: "Capital must understand time." },
      {
        kind: "p",
        text: "Deep-tech companies often need longer timelines than software-first companies. There may be pilots, certifications, hardware cycles, manufacturing constraints, enterprise procurement and regulatory pathways to work through.",
      },
      {
        kind: "p",
        text: "This does not make the company weaker. It makes the investor's role more important.",
      },
      { kind: "h", text: "India has the ingredients." },
      {
        kind: "p",
        text: "India has engineering talent, research depth, cost advantage, industrial demand and large domestic markets. What the ecosystem needs is focused capital, patient conviction and stronger bridges between research, industry and venture.",
      },
      { kind: "p", text: "That is the work ahead." },
      { kind: "h", text: "Deep-tech is not a category. It is a foundation." },
      {
        kind: "p",
        text: "The next generation of Indian companies will not only serve digital markets. They will build the physical layer underneath them.",
      },
    ],
  },
];

/**
 * The three the frame lists under "Related articles". These are 8X's own
 * published posts — the titles and dates are the frame's, and the artwork is
 * its image fills. They have no body here: the frame only ever shows them as
 * cards, and inventing article text for them is not something to do. Until
 * each is written they point at 8X's own blog rather than a stub.
 */
export type RelatedArticle = {
  title: string;
  date: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const relatedArticles: readonly RelatedArticle[] = [
  {
    title: "Why Startups Must Invest In A Strong Patent Strategy",
    date: "Jun 13, 2023",
    image: "/images/perspectives/patent-strategy.jpg",
    imageAlt: "Layered technical blueprints of mechanical assemblies, lit in blue.",
    href: "https://www.8xventures.co/blog",
  },
  {
    title: "Transforming India's Water, Sanitation, And Hygiene Landscape",
    date: "Jun 13, 2023",
    image: "/images/perspectives/wash-landscape.jpg",
    imageAlt: "A skid-mounted water treatment unit installed outside village housing.",
    href: "https://www.8xventures.co/blog",
  },
  {
    title: "Me Too Drone Startups: A Boon Or Bane For The Industry?",
    date: "Apr 11, 2023",
    image: "/images/perspectives/drone-startups.jpg",
    imageAlt: "A camera drone in flight against a dusk sky.",
    href: "https://www.8xventures.co/blog",
  },
];

export function findArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

/** What an article card needs, wherever it is shown. */
export type ArticleCardData = {
  title: string;
  date: string;
  image: string;
  imageAlt: string;
  href: string;
  /** The card's kicker. The client's doc files all three blog items under
   *  "Articles"; the piece written for the frame is a "Perspective". */
  kicker: string;
  /** Off-site, so the card says so and opens in a new tab. */
  external?: boolean;
};

/**
 * Every article the site knows about, newest first — the ones with a page of
 * their own and the ones that are still only a title, a date and a plate.
 *
 * This is what the `/media` listing reads. The three without bodies point at
 * 8X's own blog until their copy exists; when it does, each becomes an entry
 * in `articles` above and its card turns into an internal link on its own.
 */
export const articleIndex: readonly ArticleCardData[] = [
  ...articles.map((a) => ({
    title: a.titlePlain,
    date: a.date,
    image: a.image,
    imageAlt: a.imageAlt,
    href: `/media/${a.slug}`,
    kicker: a.kicker,
  })),
  ...relatedArticles.map((a) => ({
    title: a.title,
    date: a.date,
    image: a.image,
    imageAlt: a.imageAlt,
    href: a.href,
    kicker: perspectiveLabels.cardKicker,
    external: true,
  })),
];
