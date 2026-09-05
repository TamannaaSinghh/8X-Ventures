/**
 * The per-company detail page, traced from the Figma prototype's
 * `Portfolio / Company` frame (node 302-213, drawn for Neuralzome).
 *
 * The frame is one template applied to all twelve companies, so everything it
 * sets per company lives here and everything it sets once — the 8X View band
 * and the closing panel — lives at the bottom of the file.
 *
 * The prose is the client's own, from the twelve briefs in the Drive folder
 * "Portfolio companies' details": `descriptor` is each brief's "Website
 * descriptor" line, `intro` condenses its opening paragraphs, `environments`
 * and `snapshot` are drawn from its "Technology highlights", and `why`
 * restates the brief's market paragraph in the frame's voice. Nothing here is
 * invented about a company; where the frame asks for a line the brief does not
 * carry — the two-line statement, say — it is written from that brief's own
 * sentences rather than from outside knowledge.
 */

export type CompanyDetail = {
  /**
   * The hero's standfirst. `highlight` is the run the frame sets in brand
   * blue inside it ("off-road robotics" in the prototype); it must appear in
   * `text` verbatim or it is simply not highlighted.
   */
  descriptor: { text: string; highlight: string };

  /** The info strip's third and fourth columns. Sector and fund are read from
   *  the company record so the strip and the card cannot disagree. */
  investedAt: string;
  status: string;

  /** The centred statement: line one in ink, line two in brand blue. */
  statement: { line1: string; line2: string };

  /** The two centred paragraphs below the statement. */
  intro: readonly [string, string];

  /** The dark "Why we invested" band. */
  why: {
    line1: string;
    line2: string;
    body: string;
    /** The listed environments/applications, in the frame's order. */
    environments: readonly string[];
    /** The bold line that closes the band. */
    close: string;
  };

  /** The "Company snapshot" panel's four rows. Sector is read from the record. */
  snapshot: {
    technologyArea: string;
    useCase: string;
    marketRelevance: string;
  };

  /**
   * The frame's own artwork for this company, lifted from the Figma file's
   * image fills.
   *
   * Only Neuralzome's exists: the frame was drawn for Neuralzome and the
   * other eleven have never been art-directed. Anything missing falls back to
   * the company's mark on the designed bloom, and to the navy field the
   * environment photograph is graded to — so a page without artwork is still
   * the design, just without its photography. Filling these in later is a
   * four-line edit per company.
   */
  art?: {
    /** The product shot beside the name. */
    hero?: string;
    /** The company's logo lockup, set over that shot. */
    lockup?: string;
    /** The environment photograph behind "Why we invested". */
    why?: string;
    /** The product shot beside the snapshot rows. */
    snapshot?: string;
  };
};

/**
 * The two plates the frame repeats on every company page rather than varying:
 * the photograph under the statement, and the circuit field behind 8X's own
 * thesis. Both are the Figma file's own fills.
 */
export const detailArt = {
  team: "/images/portfolio-detail/team.jpg",
  circuit: "/images/portfolio-detail/circuit.jpg",
} as const;

export const portfolioDetails: Record<string, CompanyDetail> = {
  pantherun: {
    descriptor: {
      text: "High-speed data protection and encryption for systems that cannot trade security for throughput.",
      highlight: "encryption",
    },
    investedAt: "Seed Stage",
    status: "Scaling from product validation to commercial deployment.",
    statement: {
      line1: "Encryption that keeps pace with",
      line2: "the data it protects.",
    },
    intro: [
      "Pantherun builds high-performance encryption and data-protection systems for data-intensive, security-critical environments, combining hardware and software to secure data in real time.",
      "The company sits at the intersection of cryptography, chip design and networked infrastructure.",
    ],
    why: {
      line1: "Security will stop being",
      line2: "a performance tax.",
      body: "Encryption is still treated as something you pay for in latency and throughput. As connected systems carry more sensitive data, protection has to run at line rate, in place, without rewriting the formats and workflows around it.",
      environments: ["DEFENCE", "AEROSPACE", "TELECOMMUNICATIONS", "INDUSTRIAL SYSTEMS", "SMART-CITY INFRASTRUCTURE"],
      close: "Pantherun is building for that world.",
    },
    snapshot: {
      technologyArea: "Real-Time Encryption And Hardware-Assisted Security",
      useCase: "AES-Based Data Protection For Embedded And Networked Systems",
      marketRelevance: "Defence, Aerospace, Telecom, Industrial Automation, IoT",
    },
  },

  "tiea-connectors": {
    descriptor: {
      text: "Indigenous electrical and electronic connectors for demanding applications.",
      highlight: "connectors",
    },
    investedAt: "Seed Stage",
    status: "Scaling from product validation to commercial deployment.",
    statement: {
      line1: "The components everything else",
      line2: "is assumed to plug into.",
    },
    intro: [
      "TIEA Connectors designs and manufactures electrical and electronic connectors, cable assemblies and interconnect solutions for applications that demand signal integrity and mechanical reliability under load.",
      "The company sits at the intersection of precision manufacturing, electrification and domestic component capability.",
    ],
    why: {
      line1: "Electrification runs on parts",
      line2: "nobody sees.",
      body: "Connectors and harnesses are foundational to India's manufacturing and electrification ambitions, and they are still largely imported. Building them locally, to ISO 9001 and IATF 16949 quality, is infrastructure work.",
      environments: ["AUTOMOTIVE", "ELECTRIC MOBILITY", "AEROSPACE", "DEFENCE PROGRAMMES", "INDUSTRIAL ELECTRONICS"],
      close: "TIEA is building for that world.",
    },
    snapshot: {
      technologyArea: "Interconnect Engineering And Precision Manufacturing",
      useCase: "Connectors, Cable Harnesses And Custom Interconnect Assemblies",
      marketRelevance: "Automotive, EV, Aerospace, Defence, Industrial Equipment",
    },
  },

  "solinas-integrity": {
    descriptor: {
      text: "Robotics and intelligence for water and sanitation infrastructure.",
      highlight: "Robotics",
    },
    investedAt: "Seed Stage",
    status: "Scaling from product validation to commercial deployment.",
    statement: {
      line1: "Seeing inside the infrastructure",
      line2: "nobody can reach.",
    },
    intro: [
      "Solinas Integrity is an IIT Madras-incubated deep-tech company transforming water, sewer and underground infrastructure through robotics, AI and digital intelligence.",
      "The company sits at the intersection of robotics, data-led diagnostics and public infrastructure.",
    ],
    why: {
      line1: "Maintenance will move from",
      line2: "reactive to predictive.",
      body: "Water, sewer and underground assets fail out of sight, and the work of inspecting them is still hazardous and manual. Robotics and diagnostics turn invisible infrastructure into something operators can actually see and plan around.",
      environments: ["WATER PIPELINES", "SEWER NETWORKS", "SEPTIC SYSTEMS", "MUNICIPAL UTILITIES", "INDUSTRIAL PLANTS"],
      close: "Solinas is building for that world.",
    },
    snapshot: {
      technologyArea: "Robotics And AI-Enabled Diagnostics",
      useCase: "Inspection, Cleaning And Monitoring Of Underground Assets",
      marketRelevance: "Municipal Utilities, Industrial Operators, Urban Sanitation",
    },
  },

  "xyma-analytics": {
    descriptor: {
      text: "Ultrasonic sensing and Industrial IoT for extreme industrial environments.",
      highlight: "Ultrasonic sensing",
    },
    investedAt: "Seed Stage",
    status: "Scaling from product validation to commercial deployment.",
    statement: {
      line1: "Measuring what conventional",
      line2: "sensors cannot survive.",
    },
    intro: [
      "XYMA Analytics combines waveguide ultrasonic sensors, process models and analytics on a secure Industrial IoT platform, delivering continuous high-precision monitoring of critical assets.",
      "The company sits at the intersection of sensor physics, process engineering and industrial software.",
    ],
    why: {
      line1: "Plants will be run on",
      line2: "continuous measurement.",
      body: "Conventional sensing struggles where it matters most — extreme heat, hazardous access, complex processes. Continuous, multi-parameter measurement is what turns predictive maintenance and process optimisation from a slide into an operation.",
      environments: ["HIGH-TEMPERATURE PROCESSES", "REFINERIES", "POWER GENERATION", "METALS AND MATERIALS", "HARSH-ACCESS ASSETS"],
      close: "XYMA is building for that world.",
    },
    snapshot: {
      technologyArea: "Waveguide Ultrasonic Sensing And Analytics",
      useCase: "Multi-Parameter Process And Condition Monitoring",
      marketRelevance: "Process Industries, Energy, Metals, Industrial IoT",
    },
  },

  "lightspeed-photonics": {
    descriptor: {
      text: "Optical interconnects for high-performance and AI computing.",
      highlight: "Optical interconnects",
    },
    investedAt: "Seed Stage",
    status: "Scaling from product validation to commercial deployment.",
    statement: {
      line1: "Moving data faster than",
      line2: "copper ever will.",
    },
    intro: [
      "LightSpeed Photonics builds next-generation optical interconnect technology that moves data into and around computing chips at very high bandwidth, with far less power than electrical links.",
      "The company sits at the intersection of photonics, chip packaging and AI infrastructure.",
    ],
    why: {
      line1: "Compute is no longer",
      line2: "the bottleneck.",
      body: "As AI workloads scale, the limit is data movement between processors, memory and systems. Near-chip photonics attacks that bottleneck at the point where throughput, latency, energy and density all collide.",
      environments: ["AI CLUSTERS", "DATA CENTRES", "HIGH-PERFORMANCE COMPUTING", "CLOUD INFRASTRUCTURE", "MODULAR COMPUTE SYSTEMS"],
      close: "LightSpeed is building for that world.",
    },
    snapshot: {
      technologyArea: "Silicon Photonics And Optical Interconnects",
      useCase: "Near-Chip, High-Bandwidth Data Movement",
      marketRelevance: "AI Compute, HPC, Data Centres, Cloud Infrastructure",
    },
  },

  sanchiconnect: {
    descriptor: {
      text: "A deep-tech enablement network connecting startups, capital and innovation ecosystems.",
      highlight: "deep-tech enablement network",
    },
    investedAt: "Seed Stage",
    status: "Scaling from product validation to commercial deployment.",
    statement: {
      line1: "Deep tech needs more",
      line2: "than capital.",
    },
    intro: [
      "SanchiConnect is a deep-tech enablement network that connects emerging technology companies with investors, mentors, corporates, government bodies, labs and universities.",
      "The company sits at the intersection of ecosystem building, capital access and technical infrastructure.",
    ],
    why: {
      line1: "Ecosystems are built,",
      line2: "not waited for.",
      body: "Deep-tech companies need specialised talent, testbeds, early customers and technical institutions long before they need a term sheet. Making those connections structured and repeatable is what lets hard companies get started at all.",
      environments: ["ACCELERATOR PROGRAMMES", "INVESTOR NETWORKS", "CORPORATE INNOVATION", "RESEARCH LABS AND UNIVERSITIES", "GOVERNMENT PROGRAMMES"],
      close: "SanchiConnect is building for that world.",
    },
    snapshot: {
      technologyArea: "Deep-Tech Enablement Platform",
      useCase: "Accelerator Programmes, Fundraising And Ecosystem Access",
      marketRelevance: "Startups, Investors, Corporates, Institutions, Government",
    },
  },

  neuralzome: {
    descriptor: {
      text: "Autonomous AI for off-road robotics in complex real-world environments.",
      highlight: "off-road robotics",
    },
    investedAt: "Seed Stage",
    status: "Scaling from product validation to commercial deployment.",
    statement: {
      line1: "Engineering intelligence for machines",
      line2: "that move through the real world.",
    },
    intro: [
      "Neuralzome is building autonomous AI systems for off-road robotics, designed for environments where conventional automation is not enough.",
      "The company sits at the intersection of robotics, perception, autonomy and industrial application.",
    ],
    why: {
      line1: "Autonomy will move beyond",
      line2: "controlled environments.",
      body: "The next generation of robotics will not operate only in warehouses, labs, or predictable factory floors. It will need to work where.",
      environments: ["FIELDS", "MINES", "INFRASTRUCTURE SITES", "INDUSTRIAL FACILITIES", "UNSTRUCTURED TERRAIN"],
      close: "Neuralzome is building for that world.",
    },
    snapshot: {
      technologyArea: "Autonomous AI",
      useCase: "Off-Road And Unstructured Environment Robotics",
      marketRelevance: "Industrial Automation, Infrastructure, Agriculture, Mobility, Defense-Adjacent Systems",
    },
    art: {
      hero: "/images/portfolio-detail/neuralzome/vehicle.png",
      lockup: "/images/portfolio-detail/neuralzome/lockup.jpg",
      why: "/images/portfolio-detail/neuralzome/why.jpg",
      snapshot: "/images/portfolio-detail/neuralzome/snapshot.jpg",
    },
  },

  "trishul-space": {
    descriptor: {
      text: "Advanced liquid propulsion for next-generation launch vehicles.",
      highlight: "liquid propulsion",
    },
    investedAt: "Seed Stage",
    status: "Scaling from product validation to commercial deployment.",
    statement: {
      line1: "The hardest layer of",
      line2: "the space stack.",
    },
    intro: [
      "Trishul Space develops liquid rocket propulsion systems for next-generation launch vehicles — lightweight, ready-to-integrate engines that simplify launch-vehicle development.",
      "The company sits at the intersection of propulsion engineering, materials and commercial space.",
    ],
    why: {
      line1: "Access to space depends",
      line2: "on indigenous propulsion.",
      body: "Propulsion is the most technically demanding layer of the space ecosystem, and the one that decides cost, cadence and sovereignty. High-performance engine design built at home changes what a launch programme can attempt.",
      environments: ["LAUNCH VEHICLES", "SATELLITE DEPLOYMENT", "COMMERCIAL SPACE", "DEFENCE PROGRAMMES", "PROPULSION TEST INFRASTRUCTURE"],
      close: "Trishul Space is building for that world.",
    },
    snapshot: {
      technologyArea: "Liquid Rocket Propulsion",
      useCase: "Integration-Ready Engines For Launch Vehicles",
      marketRelevance: "Commercial Space, Satellite Launch, Defence, Aerospace",
    },
  },

  enerzi: {
    descriptor: {
      text: "Microwave and plasma systems for cleaner industrial processes.",
      highlight: "Microwave and plasma systems",
    },
    investedAt: "Seed Stage",
    status: "Scaling from product validation to commercial deployment.",
    statement: {
      line1: "Industrial heat is where",
      line2: "decarbonisation gets hard.",
    },
    intro: [
      "Enerzi Microwave Systems develops industrial microwave-heating and microwave-plasma technologies for cleaner, more efficient manufacturing — high-temperature processing, drying and material transformation.",
      "The company sits at the intersection of electromagnetic engineering, process heat and clean manufacturing.",
    ],
    why: {
      line1: "Heavy industry will have",
      line2: "to be electrified.",
      body: "Industrial heat and chemical processes are energy-intensive and stubbornly difficult to electrify. Microwave and plasma techniques open a path that works for today's process lines and for clean hydrogen and advanced materials next.",
      environments: ["CLEAN HYDROGEN", "ADVANCED CARBON MATERIALS", "PROCESS HEATING", "INDUSTRIAL DRYING", "MATERIAL TRANSFORMATION"],
      close: "Enerzi is building for that world.",
    },
    snapshot: {
      technologyArea: "Microwave Heating And Microwave-Plasma Systems",
      useCase: "High-Temperature Processing, Drying And Clean-Hydrogen Production",
      marketRelevance: "Industrial Manufacturing, ClimateTech, Advanced Materials, Energy",
    },
  },

  "kcat-enzymatic": {
    descriptor: {
      text: "AI-enabled enzyme engineering for sustainable chemical manufacturing.",
      highlight: "enzyme engineering",
    },
    investedAt: "Seed Stage",
    status: "Scaling from product validation to commercial deployment.",
    statement: {
      line1: "Chemistry run at lower",
      line2: "temperature and pressure.",
    },
    intro: [
      "Kcat Enzymatic is a protein and enzyme engineering company developing optimised biocatalysts, applying scientific and computational methods to discover, design and improve enzymes for industry.",
      "The company sits at the intersection of biology, computation and chemical manufacturing.",
    ],
    why: {
      line1: "Biocatalysis will reshape",
      line2: "how molecules are made.",
      body: "Enzymes let manufacturing run at lower temperatures and pressures, with less waste and more precision. Designing them to a customer's specific substrate and process condition is what makes that shift practical at industrial scale.",
      environments: ["SPECIALITY CHEMICALS", "PHARMACEUTICALS", "FOOD AND NUTRITION", "MATERIALS", "SUSTAINABLE MANUFACTURING"],
      close: "Kcat is building for that world.",
    },
    snapshot: {
      technologyArea: "Protein And Enzyme Engineering",
      useCase: "Customised Biocatalysts For Industrial Processes",
      marketRelevance: "Chemicals, Pharmaceuticals, Food, Materials, Sustainability",
    },
  },

  armory: {
    descriptor: {
      text: "Counter-drone systems designed to defend Bharat.",
      highlight: "Counter-drone systems",
    },
    investedAt: "Seed Stage",
    status: "Scaling from product validation to commercial deployment.",
    statement: {
      line1: "The threat got cheap.",
      line2: "The defence has to keep up.",
    },
    intro: [
      "Armory builds counter-unmanned aircraft systems that detect, identify, track and neutralise unauthorised drones across military and civilian environments.",
      "The company sits at the intersection of radar, electronic warfare and layered air defence.",
    ],
    why: {
      line1: "Drones changed what",
      line2: "has to be defended.",
      body: "As drones become cheaper, more autonomous and more widely available, they threaten borders, critical infrastructure, public events and sensitive installations. A layered answer — detection, electronic countermeasures and hard kill — is the only one that holds.",
      environments: ["BORDERS", "CRITICAL INFRASTRUCTURE", "MILITARY INSTALLATIONS", "PUBLIC EVENTS", "SENSITIVE SITES"],
      close: "Armory is building for that world.",
    },
    snapshot: {
      technologyArea: "Counter-UAS Detection And Response",
      useCase: "Detection, Jamming And Interception Of Rogue Drones",
      marketRelevance: "Defence, Homeland Security, Critical Infrastructure, Public Safety",
    },
  },

  thermistance: {
    descriptor: {
      text: "Passive cooling systems for high-performance electronics and industrial equipment.",
      highlight: "Passive cooling systems",
    },
    investedAt: "Seed Stage",
    status: "Scaling from product validation to commercial deployment.",
    statement: {
      line1: "Every watt of compute",
      line2: "becomes a watt of heat.",
    },
    intro: [
      "Thermistance Technologies designs, develops and manufactures advanced passive thermal-management solutions, moving heat away from critical components without the energy, noise or maintenance of active cooling.",
      "The company sits at the intersection of thermal physics, precision manufacturing and product integration.",
    ],
    why: {
      line1: "Power density is rising",
      line2: "faster than cooling.",
      body: "As electronics, EV systems, satellites and computing hardware pack more power into less space, active cooling runs out of room. Passive thermal IP — heat pipes, thermosyphons, vapour chambers — is what lets those products keep shrinking.",
      environments: ["ELECTRIC VEHICLES", "SATELLITES", "DATA CENTRES", "CONSUMER ELECTRONICS", "INDUSTRIAL EQUIPMENT"],
      close: "Thermistance is building for that world.",
    },
    snapshot: {
      technologyArea: "Passive Thermal Management",
      useCase: "Heat Pipes, Thermosyphons, Vapour Chambers And Loop Heat Pipes",
      marketRelevance: "EVs, Space, Electronics, High-Performance Computing, Industrial OEMs",
    },
  },
};

/**
 * The "8X View" band. The frame sets this identically on every company page —
 * it is 8X's thesis, not the company's — and changes only the closing line,
 * which names the company. That line is composed from `close`.
 */
export const eightXView = {
  eyebrow: "8X View",
  line1: "Hard environments",
  line2: "create hard companies.",
  body: "We back founders building technology where the barrier is not just software speed, but engineering depth, technical resilience and real-world deployment.",
  /** `%s` is replaced with the company's name. */
  close: "%s reflects that thesis.",
} as const;

/** The closing panel, shared by every company page. */
export const detailCta = {
  lead: "Building deep technology for real markets?",
  line1: "We would like to understand",
  line2: "what you see before others do.",
  link: { label: "Share Your Vision", href: "/contact" },
} as const;

/** The two labels the frame sets above the band content. */
export const detailLabels = {
  heroEyebrow: "Portfolio",
  whyEyebrow: "Why we invested",
  snapshot: { lead: "Company", accent: "snapshot" },
} as const;
