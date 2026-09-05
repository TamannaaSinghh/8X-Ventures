/**
 * Reach Out — traced from the Figma prototype's frame (node 312-636).
 *
 * Four bands: the hero and its pitch address, the ribbon, the enquiry form on
 * its pale field, the three offices, and the compliance note that closes the
 * page. The office addresses are the ones already in `content/site.ts`, which
 * the frame states identically; they are read from there rather than repeated
 * so the footer and this page cannot disagree.
 */

export const contactHero = {
  eyebrow: "Reach Out",
  line1: "Start the",
  line2: "right conversation",
  body: "For founders, capital partners, media and ecosystem collaborators working around Indian deep-tech.",
} as const;

export const contactEnquiry = {
  eyebrow: "Enquiry",
  line1: "Share your",
  line2: "details.",
  body: "Tell us what you are building. We get back within 24 to 48 hours.",
  submit: "Submit",
  fields: {
    name: { label: "Name", placeholder: "Your full name" },
    email: { label: "Email", placeholder: "you@company.com" },
    company: { label: "Company", placeholder: "Company name" },
    message: {
      label: "Leave us a message",
      placeholder: "What are you building and what makes it defensible?",
    },
    deck: {
      label: "Deck upload, if relevant",
      placeholder: "Attach a PDF or deck",
      browse: "Browse",
    },
  },
} as const;

export const contactOffices = {
  eyebrow: "Offices",
  /** The frame sets the three cities as one line, the last in brand blue. */
  lead: "Chennai. Noida.",
  accent: "Dubai.",
} as const;

/** The frame's closing note, verbatim. */
export const contactCompliance =
  "Information submitted through this website does not create any obligation for 8X Ventures to invest, respond, or enter into discussions. Any investment-related communication, if applicable, will be made only in accordance with applicable laws, regulations, eligibility requirements and fund documentation.";

/**
 * The photograph on each office card. The addresses themselves come from
 * `offices` in `content/site.ts`; these are only the plates, keyed by the
 * same ids.
 */
export const officeImages: Record<string, { src: string; alt: string }> = {
  chennai: {
    src: "/images/contact/office-chennai.jpg",
    alt: "A low-rise research park building framed by tall palms under a clear sky.",
  },
  noida: {
    src: "/images/contact/office-noida.jpg",
    alt: "An angular dark-glass building at dusk, mirrored in a reflecting pool.",
  },
  dubai: {
    src: "/images/contact/office-dubai.jpg",
    alt: "Business Bay towers at dusk, reflected in the water below.",
  },
};
