/**
 * Team page content, traced from artboard page 4 (1920 × 5947) and the Figma
 * prototype of the same frame.
 *
 * The people are 8X's own, from 8xventures.co/team — four partners and board
 * advisors, then five in the team — with their portraits from the same source.
 * The artboard fills its team grid with eight cards by repeating four
 * placeholder names ("Akash Patel", "Karan Wadhwani"); these are the real ones.
 */

export type Person = {
  id: string;
  name: string;
  role: string;
  image: string;
  /** Shown on hover and on keyboard focus. 8X's own words, from their site. */
  bio: string;
  linkedin: string;
  /**
   * The long-form biography, one string per paragraph, for the member's own
   * page. The frame sets three paragraphs; only Chirag's is written that way
   * so far — it is the one the prototype fills in, verbatim. Everyone else
   * falls back to the single paragraph in `bio`, which is 8X's own copy from
   * their site. Nothing here is written about a person from outside those two
   * sources.
   */
  profile?: readonly string[];
  /**
   * The address behind the frame's mail button.
   *
   * Only `shreya.kothari@8xventures.co` is attested — it appears once in the
   * client's "8x Existing Content" doc. The rest are that sample's pattern,
   * `firstname.lastname@8xventures.co`, applied to the roster at the client's
   * instruction; 8X publish no per-person address on their own site, where the
   * only one is the shared `pitch@8xventures.co`. Treat the eight derived
   * entries as needing confirmation before this goes public — a wrong address
   * bounces, or reaches the wrong person.
   */
  email?: string;
};

export const teamHero = {
  line1: "A Team Built",
  line2: "for Complexity",
  body: "Deep-tech needs investors who understand technology, markets, capital, and time.",
} as const;

export const teamPartners = {
  eyebrow: "Partners & Board",
  line1: "Partners With",
  line2: "Operating Depth",
  body: "Our partners and board advisors bring experience across venture capital, industry, technology, global markets, and governance.",
  people: [
    {
      id: "vinod-agarwal",
      email: "vinod.agarwal@8xventures.co",
      name: "Vinod Agarwal",
      role: "Partner & Board Advisor",
      image: "/images/team/vinod-agarwal.png",
      bio: "20+ years across multiple entrepreneurial ventures, with success in the polymer and steel industries, and an active investor worldwide in public and private markets.",
      linkedin: "https://www.linkedin.com/in/vinod-agarwal-aba3231b3/",
    },
    {
      id: "ajay-singh-rajput",
      email: "ajay.rajput@8xventures.co",
      name: "Ajay Singh Rajput",
      role: "Partner & Board Advisor",
      image: "/images/team/ajay-singh-rajput.png",
      bio: "25+ years across white goods, plastic processing and petrochemicals. He spearheads several polymers and petrochemicals businesses and has invested in startups across the Middle East, Asia and Europe.",
      linkedin: "https://www.linkedin.com/in/ajaysingh-rajput-6406146/",
      /* From the team detail pages in the client's "8x Existing Content" doc. */
      profile: [
        "Ajay has 25+ years of experience across white goods, plastic processing and petrochemicals. He spearheads several polymers and petrochemicals businesses and has invested in startups across the Middle East, Asia and Europe.",
        "He studied engineering at Jawaharlal Nehru Engineering College and holds an MBA from Dr Babasaheb Ambedkar University.",
      ],
    },
    {
      id: "esha-arya",
      email: "esha.arya@8xventures.co",
      name: "Esha Arya",
      role: "Partner & Board Advisor",
      image: "/images/team/esha-arya.png",
      bio: "Vice-Chairman of JBM Group, a $2.7bn conglomerate operating in 10 countries, where she is involved in executive decisions across automotive, sustainable technologies, AgriTech and deep-tech.",
      linkedin: "https://www.linkedin.com/in/eshaarya/",
      /* From the team detail pages in the client's "8x Existing Content" doc. */
      profile: [
        "Esha is the Vice-Chairman of JBM Group, a $2.7bn global conglomerate with operations across 10 countries. At JBM Group she is involved in executive decision-making for the manufacturing and deployment of automotive, sustainable technologies, AgriTech and DeepTech solutions. She led the development and deployment of manufacturing facilities for steel, automotive, textiles and many more industries, and has been a keynote speaker for NASSCOM and led multiple CII Tech discussions.",
        "She is actively mentoring early-stage DeepTech startups and is part of advisory boards across the USA, India, the UK and Singapore. She holds an MBA from INSEAD and a BBA from Boston University.",
      ],
    },
    {
      id: "chirag-gupta",
      email: "chirag.gupta@8xventures.co",
      name: "Chirag Gupta",
      role: "Managing Partner",
      image: "/images/team/chirag-gupta.png",
      bio: "Leadership positions at 500 Global, Careem (acquired by Uber at $3.1bn), McKinsey, PwC and Korn Ferry, across 11 countries.",
      linkedin: "https://www.linkedin.com/in/chirag-gupta/",
      /* Verbatim from the prototype's member frame (node 311-514). */
      profile: [
        "Chirag has held leadership positions at 500 Global, a venture capital firm with over $2bn in assets under management, Careem, acquired by Uber at $3.1bn, McKinsey, PwC and Korn Ferry. Across those roles he has worked in eleven countries.",
        "He began his journey as the “youngest coder in India” and has represented India in global DeepTech forums. He built proprietary simulation AI models to address Saudi Arabia's civil defence challenges and is now part of the advisory board of the innovation committee at IIT Chennai.",
        "He holds an MBA from Chicago Booth and NTU Singapore and a BBS from Delhi University. He also received a scholarship to attend the Harvard Business Analytics Program.",
      ],
    },
  ] as Person[],
} as const;

export const teamGroup = {
  eyebrow: "The Team",
  line1: "Operators. Investors.",
  line2: "Technologists.",
  body: "The people who work with founders every day.",
  people: [
    {
      id: "saurabh-gunwant",
      email: "saurabh.gunwant@8xventures.co",
      name: "Saurabh Gunwant",
      role: "Associate Principal",
      image: "/images/team/saurabh-gunwant.png",
      bio: "A Computer Application graduate and an MBA (Finance) from IMT Ghaziabad, interested in what emerging technologies do to the future of computing.",
      linkedin: "https://www.linkedin.com/in/saurabhgunwant/",
    },
    {
      id: "shreya-kothari",
  /* Attested in the client's content doc. */
      email: "shreya.kothari@8xventures.co",
      name: "Shreya Kothari",
      role: "Associate Principal",
      image: "/images/team/shreya-kothari.png",
      bio: "Previously an Associate at eClerx Services and at Nimai Management Consultants.",
      linkedin: "https://www.linkedin.com/in/shreyabagri/",
    },
    {
      id: "vikeesh-kesavan",
      email: "vikeesh.kesavan@8xventures.co",
      name: "Vikeesh Kesavan",
      role: "Associate",
      image: "/images/team/vikeesh-kesavan.png",
      bio: "An engineer evaluating frontier technology, a graduate of Anna University (CEG) who led its Entrepreneurship Club, with experience at Larsen & Toubro.",
      linkedin: "https://www.linkedin.com/in/vikeesh-kesavan-5257ab19b/",
    },
    {
      id: "kirthivasan-suresh",
      email: "kirthivasan.suresh@8xventures.co",
      name: "Kirthivasan Suresh",
      role: "Analyst",
      image: "/images/team/kirthivasan-suresh.png",
      bio: "A Mechanical Engineering graduate from the College of Engineering Guindy, with research internships at CSIR-NAL and Karpagam Engineers.",
      linkedin: "https://www.linkedin.com/in/kirthivasan-suresh-747aa0202/",
    },
    {
      id: "rashi-jain",
      email: "rashi.jain@8xventures.co",
      name: "Rashi Jain",
      role: "Compliance Associate",
      image: "/images/team/rashi-jain.png",
      bio: "A qualified Chartered Accountant working across taxation, regulatory compliance and statutory reporting.",
      linkedin: "https://www.linkedin.com/in/ca-rashi-jain13/",
    },
  ] as Person[],
} as const;

/**
 * The mentor bands. The artboard lights one of the five and dims the rest,
 * with a rule beside it — the same device as `/about`'s philosophy list, so it
 * is built the same way: the highlight steps as the section crosses the
 * viewport, and nothing is hidden while it does.
 *
 * The eyebrow is the prototype's — the PDF export says "MENTORS" there, and
 * the prototype "OUR JOURNEY". 8X asked for the prototype's wording.
 */
export const teamMentors = {
  eyebrow: "Our Journey",
  line1: "Beyond Capital.",
  line2: "Built for DeepTech Growth.",
  items: [
    "Technology Experts",
    "Commercial Strategy",
    "Growth & Sales",
    "Industry Connections",
    "Strategic Advisors",
  ],
  /** Where the artboard's still frame sits. */
  activeIndex: 2,
  closing1: "The right expertise helps great technology",
  closing2: "become great businesses.",
} as const;

export const teamCta = {
  line1: "Founders do not need noise.",
  line2: "They need useful partners.",
  link: { label: "Pitch to Us", href: "/contact" },
} as const;
