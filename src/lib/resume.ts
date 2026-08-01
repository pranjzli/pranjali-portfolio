/**
 * Resume page content. Most entries are a single role ("Title @ Company").
 * Turnip is a grouped entry: a company header plus a connected timeline of
 * two roles (LinkedIn-style), sharing one description. Freelance rows carry
 * no dates, per instruction.
 */

export const resumeHeader = {
  avatar: "/images/pranjali.png",
  name: "Pranjali",
  role: "Product Designer",
  linkedin: "https://linkedin.com",
};

export type Role = { title: string; dates: string; location?: string };

export type ResumeImage = { src: string; /** object-position Y, 0–100. Defaults to 50 (center). */ y?: number };

export type ResumeEntry = {
  id: string;
  logo: string;
  company: string;
  description: string;
  /** Photos shown by default under the entry; omit for no image. */
  images?: ResumeImage[];
  /** Single-role entry. */
  title?: string;
  dates?: string;
  location?: string;
  /** Grouped entry (company header + role timeline) — used for Turnip. */
  companyLocation?: string;
  roles?: Role[];
};

export const experience: ResumeEntry[] = [
  {
    id: "turnip",
    logo: "/images/logos/turnip.png",
    company: "Turnip",
    companyLocation: "Bengaluru, Karnataka, India",
    roles: [
      { title: "Product Designer", dates: "Jan 2026 – Present", location: "Remote" },
      { title: "Visual Designer", dates: "Jul 2024 – Dec 2025", location: "Bengaluru, Karnataka, India" },
    ],
    images: [
      { src: "/images/resume/turnip-1.jpeg", y: 59 },
      { src: "/images/resume/turnip-2.jpg", y: 81 },
    ],
    description:
      "Grew from visual and motion work into owning Zaps' product design end to end, from the editor to the 5,000+ template library. I partner closely with engineering to ship fast without losing craft.",
  },
  {
    id: "whatfix",
    logo: "/images/logos/whatfix.png",
    title: "Visual Design Intern",
    company: "Whatfix",
    dates: "Nov 2023 – Jul 2024",
    location: "Bengaluru, Karnataka, India",
    images: [
      { src: "/images/resume/whatfix-1.jpeg", y: 84 },
      { src: "/images/resume/whatfix-2.jpg" },
    ],
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

export const freelance: ResumeEntry[] = [
  {
    id: "fitastra",
    logo: "/images/logos/fitastra.png",
    title: "UX Designer",
    company: "FitAstra",
    images: [{ src: "/images/resume/fitastra.jpeg" }],
    description:
      "Designed FitAstra's first revenue stream, session-based coach booking, across both the user and coach apps. Owned the experience end to end, from flows to final UI.",
  },
  {
    id: "quraxia",
    logo: "/images/logos/quraxia.png",
    title: "Brand Designer",
    company: "Quraxia Pharmaceuticals",
    images: [{ src: "/images/resume/quraxia.jpeg", y: 17 }],
    description:
      "Designed a foundational brand identity for Quraxia Pharmaceuticals, a new player entering the industry. Built the visual system from the ground up to establish credibility and market presence.",
  },
  {
    id: "street27",
    logo: "/images/logos/street27.png",
    title: "Product Photographer",
    company: "Street 27",
    description:
      "Shot product photography for Street 27, an Amazon top-ranked e-seller, for their bestselling pieces.",
  },
];
