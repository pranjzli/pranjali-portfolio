/**
 * FitAstra — Coaches Tab case study.
 * Copy is lifted verbatim from the Figma frame; only the visual language differs.
 * `*asterisks*` render as serif-italic accents (see AccentText).
 */

export const meta = {
  eyebrow: "FitAstra · 2025",
  title: "Designing FitAstra's first *revenue stream*",
  intro:
    "A fitness app for finding workout partners near you — and, with this project, for finding a coach you can actually try before committing to.",
  nav: { backLabel: "Back to work", backHref: "/#work" },
};

/** The lead statement. `key` runs carry the emphasis the Figma frame gives them. */
export const tldr = {
  label: "TL;DR",
  segments: [
    { t: "FitAstra connects you with " },
    { t: "people who work out near you", key: true },
    { t: ". Users had partners, but " },
    { t: "no professional guidance", key: true },
    { t: " and coaching elsewhere meant " },
    { t: "paying for months upfront", key: true },
    { t: ". I designed the " },
    { t: "Coach booking experience", key: true },
    { t: ", where users book verified coaches for a single session or a package, and the first version of the coach app. " },
    { t: "It opened the first revenue stream for FitAstra.", key: true },
  ],
};

export const topStats = [
  { value: "X", label: "sessions booked" },
  { value: "X", label: "coaches onboarded" },
  { value: "2", label: "apps designed — user side and coach side" },
];

export const context = {
  label: "Context",
  heading: "FitAstra helps you find people to work out with",
  body: [
    "It matches you with people working out near you — at your gym, a nearby park, or on a running route. The founder built it for working professionals in Bangalore who move cities for a job and end up training alone, which is where motivation usually breaks down.",
    "I joined as a freelance product designer when the partner-matching version was live and the founder wanted to add coaching.",
  ],
};

export const problem = {
  label: "The problem",
  heading: "Users had workout partners, but nobody to guide them",
  body: [
    "A partner keeps you accountable, but they can't give you a plan, fix your form, or tell you what to do next. That's a coach's job — and getting one usually means committing to a one, three, or ten-month package before you've met the person even once. Too expensive and too risky if the coach turns out to be the wrong fit. And what if you only want advice on one specific problem?",
    "There was a business side to this too: partner matching didn't earn anything. The Coaches tab had to work for users and become the way FitAstra makes money.",
  ],
  // Shot at their own heights, so `ratio` (w/h) is all the row needs to size them.
  photos: [
    {
      src: "/images/case-studies/fitastra/process-1.jpg",
      ratio: 1333 / 1000,
      alt: "Working on the connection flow and handoff table in Figma, with a notebook of flow diagrams open on the desk",
    },
    {
      src: "/images/case-studies/fitastra/process-2.jpg",
      ratio: 750 / 1000,
      alt: "Whiteboard sketches of the app's screens — discover, chat, and the sent, received and accepted request states",
    },
    {
      src: "/images/case-studies/fitastra/process-3.jpg",
      ratio: 1312 / 1000,
      alt: "Reviewing the app over a call with the FitAstra team",
    },
    {
      src: "/images/case-studies/fitastra/process-4.jpg",
      ratio: 1031 / 1000,
      alt: "Sticky notes mapping the information architecture — home screen, discover, chat, profile and notifications",
    },
  ],
};

export const exploration = {
  label: "Exploration",
  heading: "We first explored a pay-per-minute chat model",
  body: [
    "The founder's reference was Astrotalk, an astrology app where you add money to a wallet and pay per minute to chat with astrologers who are online. He wanted the same model for coaches.",
    "Instead of debating it in the abstract, I designed the complete flow in lo-fi — wallet and recharge, browsing coaches who are online, the chat session with its timer, ratings, and the coach's side of the same model. A very early version was also discussed with our initial users. That's where the problems became concrete:",
  ],
  bullets: [
    "Coaching is an ongoing relationship. A per-minute timer discourages exactly the kind of longer conversation a fitness plan needs.",
    "The model only works when plenty of coaches are online at any hour. A new platform doesn't have that supply.",
    "In interviews, users wanted to see who a coach is — experience, reviews, certifications — before paying, not chat with whoever happened to be available.",
  ],
  outro:
    "We dropped the direction. Designing it fully made that an easy conversation — the founder and I were looking at the same flows and the same user feedback, not arguing opinions.",
  // The user-side flow, then the coach's side of the same model.
  // Captions are the frame's own; wide diagrams go unreadable at reading width.
  media: [
    {
      src: "/images/case-studies/fitastra/lofi-user-flow.png",
      ratio: "2800/1059",
      alt: "User-side lo-fi flow — browsing coaches, wallet recharge, payment, prefilled fitness form, and the chat session",
      caption: "The chat model, designed in full — wallet, recharge, timer, ratings",
    },
    {
      src: "/images/case-studies/fitastra/lofi-coach-flow.png",
      ratio: "2800/1826",
      alt: "Coach-side lo-fi flow — going online, chat requests and queue, the session timer, and earnings",
      caption: "The coach side of the same model — availability, requests, earnings",
    },
  ],
};

export const solution = {
  label: "The solution",
  heading: "Book a coach by the session, not by the month",
  body: "We moved to session-based booking. Users browse coaches, see who they are, and book a single session or a package. The decisions that shaped it:",
  decisions: [
    {
      no: "01",
      title: "Single sessions",
      body: "Competitors only sold monthly packages. Here you can book one session — for a specific problem, or to try a coach before buying a package. The first session is free, which also helps new coaches build ratings early.",
    },
    {
      no: "02",
      title: "Named “Coaches”, not “Trainers”",
      body: "The platform onboarded nutrition coaches too, not just gym trainers. The tab name had to cover both.",
    },
    {
      no: "03",
      title: "Pricing based on experience",
      body: "Each coach's session and package prices follow their experience level, and the price is visible on the card before you open a profile.",
    },
    {
      no: "04",
      title: "Verification and refunds, stated upfront",
      body: "Users hesitate to pay on a new platform. So every coach is personally verified with valid certifications, and if a session doesn't go as expected, the user gets a full refund. Both are shown before payment.",
    },
  ],
  // Sketch and product, stacked behind a draggable divider. The two run the
  // same six frames in the same order, so the reveal swaps fidelity in place.
  fidelity: {
    before: {
      src: "/images/case-studies/fitastra/coach-lofi.png",
      alt: "Sketches of the booking flow — coach tab, coach profile, date and time, session info, payment, and the booked state",
      label: "Lo-fi",
      ratio: 2800 / 802,
    },
    after: {
      src: "/images/case-studies/fitastra/coach-hifi.png",
      alt: "The shipped booking screens — find a trainer, coach profile, date and time, session details, payment, and my trainer",
      label: "Shipped",
      ratio: 2800 / 855,
    },
  },
};

export const coachApp = {
  label: "The coach app",
  heading: "Designing the new coach app experience",
  body: "For the marketplace to function, coaches needed their own tools. Their app covers the sessions booked with them, their active clients and each client's package progress, earnings and payouts, and their availability. Cancelling a session shows the penalty before the coach confirms it.",
  media: [{ ratio: "4/3" as const }, { ratio: "4/3" as const }],
};

export const role = {
  label: "My role",
  heading: "Freelance product designer, working with the founder who was also the developer",
  body: "I owned the experience end to end: user interviews, the chat-model exploration, information architecture, flows, UX for both apps, and the documentation the developer built from.",
};

export const impact = {
  label: "Impact",
  heading: "Shipped on iOS and Android, and opened a new revenue stream",
  body: "Coach booking went live as one of FitAstra's core features and gave the app its first paid product.",
  stats: [
    { value: "X", label: "sessions booked" },
    { value: "X", label: "coaches onboarded" },
    { value: "4.8/5", label: "avg. session rating" },
  ],
  note: "I worked on FitAstra in 2025 and handed the project off after launch. The app has evolved since — this case study covers the version I designed and shipped.",
};

/** Both apps are live, so the reader can go use the thing they just read about. */
export const tryIt = {
  line: "The app is live — try it yourself",
  links: [
    {
      label: "App Store",
      href: "https://apps.apple.com/in/app/fitastra/id6746420777",
      icon: "apple" as const,
    },
    {
      label: "Google Play",
      href: "https://play.google.com/store/apps/details?id=com.fitastra.fitastra",
      icon: "play" as const,
    },
  ],
};

export const learned = {
  label: "What I learned",
  heading: "People pay when they value what they're paying for",
  body: "The things that made users comfortable booking — the coach's experience, the price, the refund policy — all had to be visible before the payment screen, not discovered after it. The goal of this project was to make the users see the value of what they were paying for.",
};

export const outro = {
  cta: "Next project →",
  credit: "FitAstra · Coaches Tab — Product design by Pranjali · 2025",
};
