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
      name: "Vinod Agarwal",
      role: "Partner & Board Advisor",
      image: "/images/team/vinod-agarwal.png",
      bio: "20+ years across multiple entrepreneurial ventures, with success in the polymer and steel industries, and an active investor worldwide in public and private markets.",
      linkedin: "https://www.linkedin.com/in/vinod-agarwal-aba3231b3/",
    },
    {
      id: "ajay-singh-rajput",
      name: "Ajay Singh Rajput",
      role: "Partner & Board Advisor",
      image: "/images/team/ajay-singh-rajput.png",
      bio: "25+ years across white goods, plastic processing and petrochemicals. He spearheads several polymers and petrochemicals businesses and has invested in startups across the Middle East, Asia and Europe.",
      linkedin: "https://www.linkedin.com/in/ajaysingh-rajput-6406146/",
    },
    {
      id: "esha-arya",
      name: "Esha Arya",
      role: "Partner & Board Advisor",
      image: "/images/team/esha-arya.png",
      bio: "Vice-Chairman of JBM Group, a $2.7bn conglomerate operating in 10 countries, where she is involved in executive decisions across automotive, sustainable technologies, AgriTech and deep-tech.",
      linkedin: "https://www.linkedin.com/in/eshaarya/",
    },
    {
      id: "chirag-gupta",
      name: "Chirag Gupta",
      role: "Managing Partner",
      image: "/images/team/chirag-gupta.png",
      bio: "Leadership positions at 500 Global, Careem (acquired by Uber at $3.1bn), McKinsey, PwC and Korn Ferry, across 11 countries.",
      linkedin: "https://www.linkedin.com/in/chirag-gupta/",
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
      name: "Saurabh Gunwant",
      role: "Associate Principal",
      image: "/images/team/saurabh-gunwant.png",
      bio: "A Computer Application graduate and an MBA (Finance) from IMT Ghaziabad, interested in what emerging technologies do to the future of computing.",
      linkedin: "https://www.linkedin.com/in/saurabhgunwant/",
    },
    {
      id: "shreya-kothari",
      name: "Shreya Kothari",
      role: "Associate Principal",
      image: "/images/team/shreya-kothari.png",
      bio: "Previously an Associate at eClerx Services and at Nimai Management Consultants.",
      linkedin: "https://www.linkedin.com/in/shreyabagri/",
    },
    {
      id: "vikeesh-kesavan",
      name: "Vikeesh Kesavan",
      role: "Associate",
      image: "/images/team/vikeesh-kesavan.png",
      bio: "An engineer evaluating frontier technology, a graduate of Anna University (CEG) who led its Entrepreneurship Club, with experience at Larsen & Toubro.",
      linkedin: "https://www.linkedin.com/in/vikeesh-kesavan-5257ab19b/",
    },
    {
      id: "kirthivasan-suresh",
      name: "Kirthivasan Suresh",
      role: "Analyst",
      image: "/images/team/kirthivasan-suresh.png",
      bio: "A Mechanical Engineering graduate from the College of Engineering Guindy, with research internships at CSIR-NAL and Karpagam Engineers.",
      linkedin: "https://www.linkedin.com/in/kirthivasan-suresh-747aa0202/",
    },
    {
      id: "rashi-jain",
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
