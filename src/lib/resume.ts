/**
 * Resume page content. Experience is flattened to one row per role/title —
 * Turnip shows as two separate rows (Visual Designer, then Product Designer)
 * rather than one nested entry, matching how every other row on this page
 * reads. Freelance rows carry no dates, per instruction.
 */

export const resumeHeader = {
  avatar: "/images/pranjali.png",
  name: "Pranjali",
  role: "Product Designer",
  linkedin: "https://linkedin.com",
};

export type ResumeRow = {
  id: string;
  logo: string;
  title: string;
  company: string;
  /** Omitted for freelance rows. */
  dates?: string;
  location?: string;
  description: string;
};

export const experience: ResumeRow[] = [
  {
    id: "turnip-pd",
    logo: "/images/logos/turnip.png",
    title: "Product Designer",
    company: "Turnip",
    dates: "Jan 2026 – Present",
    location: "Remote",
    description:
      "Own product design for Zaps end to end, from the editor to the template library. Partner directly with engineering to ship fast without losing craft.",
  },
  {
    id: "turnip-vd",
    logo: "/images/logos/turnip.png",
    title: "Visual Designer",
    company: "Turnip",
    dates: "Jul 2024 – Feb 2026",
    location: "Bengaluru, Karnataka, India",
    description:
      "Started on visual and motion work across the app, then grew into owning full product flows. Built the foundation for how Zaps looks, moves, and feels.",
  },
  {
    id: "whatfix",
    logo: "/images/logos/whatfix.png",
    title: "Visual Design Intern",
    company: "Whatfix",
    dates: "Nov 2023 – Jul 2024",
    location: "Bengaluru, Karnataka, India",
    description:
      "Designed motion graphics, event booth visuals, and slide decks for Whatfix's core brand team. Built out social and brandbook assets, working closely with senior designers.",
  },
  {
    id: "rbp-finivis",
    logo: "/images/logos/rbp-finivis.png",
    title: "Graphic Designer",
    company: "RBP Finivis",
    dates: "Apr 2023 – Nov 2023",
    location: "Panchkula, Haryana, India",
    description:
      "Designed booth graphics, slide decks, social creatives, and print collateral for RBP Finivis. Handled logo and brand design work on-site, start to finish.",
  },
  {
    id: "pini",
    logo: "/images/logos/pini.png",
    title: "Graphic and UI/UX Design Intern",
    company: "Pini Solutions",
    dates: "Oct 2022 – Mar 2023",
    location: "Remote",
    description:
      "Designed social creatives and dashboard UI for Pini Solutions, my first hands-on UI/UX work, alongside day-to-day social media management.",
  },
];

export const freelance: ResumeRow[] = [
  {
    id: "fitastra",
    logo: "/images/logos/fitastra.png",
    title: "Product Design",
    company: "FitAstra",
    description:
      "Designed FitAstra's first revenue stream, session-based coach booking, across both the user and coach apps. Owned the experience end to end, from flows to final UI.",
  },
  {
    id: "quraxia",
    logo: "/images/logos/quraxia.png",
    title: "Brand Identity",
    company: "Quraxia Pharmaceuticals",
    description:
      "Designed a foundational brand identity for Quraxia Pharmaceuticals, a new player entering the industry. Built the visual system from the ground up to establish credibility and market presence.",
  },
  {
    id: "street27",
    logo: "/images/logos/street27.png",
    title: "Product Photography",
    company: "Street 27",
    description:
      "Shot product photography for Street 27, an Amazon top-ranked e-seller, for their bestselling pieces.",
  },
];
