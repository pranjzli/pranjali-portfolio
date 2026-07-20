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
  avatar: "/avatar.jpg",
  // Words wrapped in *asterisks* render as serif-italic accents.
  headline: "I make complex tools feel *effortless*",
  intro:
    "Currently building creator tools at Turnip, previously at Whatfix. I think in motion, design inside real engineering constraints, and own features end to end.",
};

export const about = {
  label: "About",
  tabs: ["Story", "TL;DR"] as const,
  story: [
    "It all started during the lockdown when I grew a meme page on Instagram to a reach of 250K+. I kept asking myself one question — what made people stop, tap, and engage? Chasing it led to a social-media internship in my final year of college, where managing content turned into creating it, and I picked up my first design tools.",
    "Then I made a deliberate trade: a full-time offer for an internship at [[Whatfix]] core brand team, just to learn from senior designers. I absorbed everything about motion, interaction, and brand — how things move, respond, and feel.",
    "At [[Turnip]] I'm building [[Zaps]] — an all-in-one creator suite. I've worn every hat: crafting visuals, scaling a 5000+ template library, and shipping features end to end. In no time, I've committed to product design — and now I solve real user problems every day.",
  ],
  tldr: [
    "Product designer, 3+ years. Motion-first, systems-minded, engineering-fluent.",
    "Turnip (Zaps) → Whatfix. I ship features end to end.",
  ],
};

export const polaroids = [
  { src: "/polaroids/workspace.jpg", caption: "workspace" },
  { src: "/polaroids/music.jpg", caption: "Music" },
  { src: "/polaroids/kiki.jpg", caption: "kiki" },
  { src: "/polaroids/art.jpg", caption: "Art" },
  { src: "/polaroids/amsterdam.jpg", caption: "studies in Amsterdam?" },
];

export type Project = {
  title: string; // *asterisks* -> serif accent
  meta: string;
  span: "wide" | "tall" | "half";
};

export const projects: Project[] = [
  {
    title: "I designed the *editor* at Zaps that helps *creators* make and edit content quickly",
    meta: "2025–2026 · Product design, Project management, User research",
    span: "wide",
  },
  {
    title: "I built the *design system* and token pipeline at Zaps for designers + developers",
    meta: "2026 · Design Systems, Design Tokens, iOS Handoff",
    span: "half",
  },
  {
    title: "I designed the *coaches tab* at FitAstra that helps users find a suitable trainer",
    meta: "2024 · Product design, UX, User research",
    span: "half",
  },
];

export const testimonial = {
  label: "Testimonial",
  heading: "Straight from the *people* I worked with..",
  quote:
    "Pranjali brought great energy, curiosity, and fresh perspectives that helped us think differently about the user experience. Her ideas sparked valuable conversations, and I'd be thrilled to work with her again.",
  author: { name: "iOS Developer, Turnip", avatar: "/avatar.jpg" },
  people: [
    { name: "Vishal", avatar: "/polaroids/workspace.jpg" },
    { name: "Kush", avatar: "/polaroids/music.jpg" },
    { name: "Beth", avatar: "/polaroids/kiki.jpg" },
    { name: "Vivek", avatar: "/polaroids/art.jpg" },
    { name: "Gaurav", avatar: "/polaroids/amsterdam.jpg" },
  ],
};

export const motionBrand = {
  label: "Motion & Brand",
  heading: "Explore my *work* as a motion, brand & visual designer",
  apps: ["Whatfix", "Turnip", "Pini", "27M"],
};

export const designThinking = {
  label: "Design Thinking",
  heading: "I think in *systems*, not just a one time solution",
  body: "I focus on understanding — who I'm helping, what they're struggling with, and why their problems matter.",
};

export const footer = {
  cta: "If this made sense, lets chat!",
  name: "Pranjali, Product Designer",
  avatar: "/avatar.jpg",
  links: [
    { label: "Mail", href: "mailto:sainipranjali.2205@gmail.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Resume", href: "/resume.pdf" },
  ],
};
