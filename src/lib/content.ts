/**
 * Single source of truth for portfolio copy. Swap these for real content —
 * the section components render straight from here.
 */

export const nav = {
  logo: "P",
  // Root-relative hashes, so these work from a case-study page too: off the
  // home page they navigate home first, then land on the section.
  links: [
    { label: "About", href: "/#about" },
    { label: "Work", href: "/#work" },
    { label: "Resume", href: "/resume" },
  ],
  cta: { label: "Get in touch", href: "/#contact" },
};

export const hero = {
  badge: "Available for product design roles",
  avatar: "/images/pranjali.png",
  // Words wrapped in *asterisks* render as serif-italic accents.
  headline: "Hey, I'm *Pranjali*",
  // Typewriter roles that loop under the headline.
  roles: ["Product designer", "Problem Solver", "Coffee Addict"],
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
      { t: "It all started during the lockdown 🦠 when I grew a meme page on Instagram to a " },
      { t: "reach of 250K+ 📈", key: true },
      { t: ". I kept asking myself one question: what made people stop, tap, and engage? Chasing it led to a social-media " },
      { t: "internship in my final year of college", key: true },
      { t: ", where managing content turned into creating it, and I picked up " },
      { t: "my first design tools", key: true },
      { t: "." },
    ],
    [
      { t: "Then I made a deliberate trade: a full-time offer for an internship at " },
      { t: "{{whatfix}} [[Whatfix's]] core brand team", key: true },
      { t: ", just to learn from senior designers. I absorbed everything about " },
      { t: "motion, interaction, and brand", key: true },
      { t: ", how things move, respond, and feel." },
    ],
    [
      { t: "At {{turnip}} Turnip, I'm building " },
      { t: "{{zaps}} [[Zaps]], an all-in-one creator suite", key: true },
      { t: ". I've worn every hat: crafting visuals, scaling a " },
      { t: "5000+ template library with a team I led", key: true },
      { t: ", then designing the features that put those templates in users' hands. I collaborated with tech, learned to vibecode 👩‍💻, and " },
      { t: "shipped features end to end", key: true },
      { t: ". In no time, I've committed to product design, and now " },
      { t: "I solve real user problems every day", key: true },
      { t: "." },
    ],
  ] as StorySegment[][],
};

// Polaroid frames + handwritten captions are baked into the images.
// A `video` entry makes the polaroid open a pop-up player on click.
export type Polaroid = { src: string; alt: string; video?: string; poster?: string };

export const polaroids: Polaroid[] = [
  { src: "/images/polaroids/books.png", alt: "Reading Hooked at my desk" },
  { src: "/images/polaroids/workspace.png", alt: "My workspace at night" },
  {
    src: "/images/polaroids/music.png",
    alt: "Playing guitar",
    video: "/videos/pranjali-guitar.mp4",
    poster: "/videos/pranjali-guitar-poster.jpg",
  },
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
  /** Case study route, once one exists. */
  href?: string;
};

export const projects: Project[] = [
  {
    title: "I designed the *editor* at {{zaps}} Zaps that helps *creators* make and edit content quickly",
    meta: "2025–2026 · Product design, Project management, User research",
    span: "wide",
    href: "/work/zaps-editor",
  },
  {
    title: "I built the *design system* and token pipeline at {{zaps}} Zaps for designers + developers",
    meta: "2026 · Design Systems, Design Tokens, iOS Handoff",
    span: "half",
    href: "/work/zaps-design-system",
  },
  {
    title: "I designed the *coaches tab* at {{fitastra}} FitAstra that helps users find a suitable trainer",
    meta: "2024 · Product design, UX, User research",
    span: "half",
    href: "/work/fitastra",
  },
];

export const testimonial = {
  label: "Testimonial",
  heading: "Straight from the *people* I worked with..",
  people: [
    {
      name: "Vishal",
      role: "iOS Developer",
      logo: "/images/logos/turnip.png",
      photo: "/images/testimonials/vishal.jpeg",
      quote:
        "Pranjali has a sharp sense for clean, intuitive UX, and her handoffs made my job easy. Everything was clearly spec'd and thought through, so I rarely had a question left unanswered. Detail-oriented, collaborative, and a designer I'd happily work with again.",
    },
    {
      name: "Kush",
      role: "Android Developer",
      logo: "/images/logos/turnip.png",
      photo: "/images/testimonials/kush.png",
      quote:
        "Pranjali is approachable, dependable, and genuinely easy to build with. Her fresh design perspective lifted every project and gave the final product a distinctive energy.",
    },
    {
      name: "Beth",
      role: "Creative Director",
      logo: "/images/logos/whatfix.png",
      photo: "/images/testimonials/beth.png",
      quote:
        "The ownership she brought was rare for someone that early in their career. She picked things up incredibly fast, delivered motion work that genuinely impressed, and collaborated smoothly with every stakeholder.",
    },
    {
      name: "Vivek",
      role: "Design Team Lead",
      logo: "/images/logos/whatfix.png",
      photo: "/images/testimonials/vivek.jpeg",
      quote:
        "Pranjali stood out for her ownership and hunger to learn. She picked up an entirely new tool with no prior experience and was using it confidently within a couple of months. Proactive, dependable, and always improving, any team would be lucky to have her.",
    },
    {
      name: "Gourav",
      role: "Founder",
      logo: "/images/logos/fitastra.png",
      photo: "/images/testimonials/gourav.png",
      quote:
        "She has real instinct for product decisions, listens closely to user feedback, and turns it into better design quickly. Fully invested, easy to work with, and someone who genuinely cares about getting it right.",
    },
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
    { label: "LinkedIn", href: "https://www.linkedin.com/in/pranjali-saini-614a22230/" },
    { label: "Resume", href: "/resume" },
  ],
};
