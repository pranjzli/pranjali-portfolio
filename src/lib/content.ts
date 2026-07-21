/**
 * Single source of truth for portfolio copy. Swap these for real content —
 * the section components render straight from here.
 */

export const nav = {
  logo: "P",
  links: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Resume", href: "#resume" },
  ],
  cta: { label: "Get in touch", href: "#contact" },
};

export const hero = {
  badge: "Available for product design roles",
  avatar: "/images/pranjali.png",
  // Words wrapped in *asterisks* render as serif-italic accents.
  headline: "I make complex tools feel *effortless*",
  intro:
    "Currently building creator tools at {{turnip}} Turnip, previously at {{whatfix}} Whatfix. I think in motion, design inside real engineering constraints, and own features end to end.",
};

/** A run of story copy. `key` segments stay lit when the TL;DR tab is on. */
export type StorySegment = { t: string; key?: boolean };

export const about = {
  label: "About",
  tabs: ["Story", "TL;DR"] as const,
  // Split into segments rather than two bodies of copy, so switching tabs dims
  // the non-essential runs in place instead of swapping text (no layout shift).
  story: [
    [
      { t: "It all started during the lockdown when I grew a meme page on Instagram to a reach of " },
      { t: "250K+", key: true },
      { t: ". I kept asking myself one question — what made people stop, tap, and engage? Chasing it led to a social-media internship in my final year of college, where managing content turned into creating it, and I picked up my " },
      { t: "first design tools", key: true },
      { t: "." },
    ],
    [
      { t: "Then I made a deliberate trade: a full-time offer for an internship at " },
      { t: "{{whatfix}} [[Whatfix's]] core brand team", key: true },
      { t: ", just to learn from senior designers. I absorbed everything about " },
      { t: "motion, interaction, and brand", key: true },
      { t: " — how things move, respond, and feel." },
    ],
    [
      { t: "At " },
      { t: "{{turnip}} Turnip, I'm building {{zaps}} [[Zaps]] — an all-in-one creator suite", key: true },
      { t: ". I've worn every hat: crafting visuals, scaling a " },
      { t: "5000+ template library", key: true },
      { t: ", and " },
      { t: "shipping features end to end", key: true },
      { t: ". In no time, I've " },
      { t: "committed to product design", key: true },
      { t: " — and now I solve real user problems every day." },
    ],
  ] as StorySegment[][],
};

// Polaroid frames + handwritten captions are baked into the images.
export const polaroids = [
  { src: "/images/polaroids/books.png", alt: "Reading Hooked at my desk" },
  { src: "/images/polaroids/workspace.png", alt: "My workspace at night" },
  { src: "/images/polaroids/music.png", alt: "Playing guitar" },
  { src: "/images/polaroids/kiki.png", alt: "Mirror selfie with my cat Kiki" },
  { src: "/images/polaroids/art.png", alt: "Face illustrations on iPad" },
  { src: "/images/polaroids/beach.png", alt: "At the beach" },
  { src: "/images/polaroids/coffee.png", alt: "A latte" },
  { src: "/images/polaroids/photography.png", alt: "Out shooting with my camera" },
];

export type Project = {
  title: string; // *asterisks* -> serif accent
  meta: string;
  span: "wide" | "tall" | "half";
};

export const projects: Project[] = [
  {
    title: "I designed the *editor* at {{zaps}} Zaps that helps *creators* make and edit content quickly",
    meta: "2025–2026 · Product design, Project management, User research",
    span: "wide",
  },
  {
    title: "I built the *design system* and token pipeline at {{zaps}} Zaps for designers + developers",
    meta: "2026 · Design Systems, Design Tokens, iOS Handoff",
    span: "half",
  },
  {
    title: "I designed the *coaches tab* at {{fitastra}} FitAstra that helps users find a suitable trainer",
    meta: "2024 · Product design, UX, User research",
    span: "half",
  },
];

export const testimonial = {
  label: "Testimonial",
  heading: "Straight from the *people* I worked with..",
  quote:
    "Pranjali brought great energy, curiosity, and fresh perspectives that helped us think differently about the user experience. Her ideas sparked valuable conversations, and I'd be thrilled to work with her again.",
  author: { name: "iOS Developer, Turnip", logo: "/images/logos/turnip.png" },
  people: [
    { name: "Vishal" },
    { name: "Kush" },
    { name: "Beth" },
    { name: "Vivek" },
    { name: "Gaurav" },
  ],
};

export const motionBrand = {
  label: "Motion & Brand",
  heading: "Explore my *work* as a motion, brand & visual designer",
  // Two featured tiles + a 2x2 grid of smaller ones, matching the Figma layout.
  featured: [
    { name: "Whatfix", src: "/images/logos/whatfix.png" },
    { name: "Quraxia", src: "/images/logos/quraxia.png" },
  ],
  small: [
    { name: "Turnip", src: "/images/logos/turnip.png" },
    { name: "FitAstra", src: "/images/logos/fitastra-icon.png" },
    { name: "Pini", src: "/images/logos/pini.png" },
    { name: "Street27", src: "/images/logos/street27.png" },
  ],
};

export const designThinking = {
  label: "Design Thinking",
  heading: "I think in *systems*, not just a one time solution",
  body: "I focus on understanding — who I'm helping, what they're struggling with, and why their problems matter.",
};

export const footer = {
  cta: "If this made sense, lets chat!",
  name: "Pranjali, Product Designer",
  avatar: "/images/pranjali.png",
  links: [
    { label: "Mail", href: "mailto:sainipranjali.2205@gmail.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Resume", href: "/resume.pdf" },
  ],
};
