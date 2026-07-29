/**
 * Zaps · Turnip — the creation experience. Copy is lifted verbatim from the
 * Figma frame "Zaps — Case Study v5 (FRESH)"; `*asterisks*` render as
 * serif-italic accents.
 *
 * v5 is built for scanning: every section leads with a short intro and then
 * breaks into cards, so the reader can take it in without reading prose. The
 * component mirrors that — card grids, stat chips, one pull-quote.
 */

export const meta = {
  eyebrow: "Zaps · Turnip · 2024–2026",
  title: "I designed the Zaps *creation experience* that grew revenue 7.5x",
  intro:
    "Zaps helps everyday creators make posts, stories, reels and carousels that look professionally designed. The app changed direction three times while I was there, and I designed how it is used through all of it.",
  nav: { backLabel: "Back to work", backHref: "/#work" },
  heroCaption: "Hero visual, the app in use",
};

export const tldr = {
  label: "TL;DR",
  // `key` runs stay full-strength; the connective copy dims back.
  segments: [
    { t: "Users come to Zaps to " },
    { t: "make stunning content, fast", key: true },
    { t: ". " },
    { t: "I designed the experience for it end-to-end", key: true },
    { t: "; the tools to make and edit content, the " },
    { t: "5,000+ ready-made templates", key: true },
    { t: " they start from, and how they share it with the world. In the six months after the new experience launched, " },
    { t: "revenue grew 7.5x", key: true },
    { t: "." },
  ],
  stats: [
    { value: "7.5x", label: "more revenue" },
    { value: "12x", label: "more paying users" },
    { value: "6x", label: "more users overall" },
  ],
  note: "Measured from our own paywall data, in the six months after launch and before we spent heavily on marketing.",
};

export const research = {
  label: "Research",
  heading: "I designed around real users",
  body: "Our users post every day, but they are not designers. So before designing anything, I did my research:",
  cards: [
    {
      no: "01",
      title: "I studied 20+ apps to build on habits users already had",
      body: "I looked at how more than 20 popular editing apps work. Building on things users already knew from other apps meant they could pick up Zaps right away, instead of learning it from scratch.",
    },
    {
      no: "02",
      title: "I listened to the creators who use Zaps every day",
      body: "I talked to creators, watched how they made their posts, and asked what got in their way. When they told us something was hard, we fixed it and shipped the change.",
    },
    {
      no: "03",
      title: "Some users browse, some search, so I designed for both",
      body: "Some users open the app just to look around for ideas. Others come in knowing exactly what they want. I also studied what makes a user pick one template over another, so both kinds could find something fast.",
    },
    {
      no: "04",
      title: "A tool should only be as deep as it needs to be",
      body: "A simple thing like adding a filter should stay one tap away, not buried under menus. A tool that does a lot, like adjusting light and color, can open up more. When how deep a tool goes matches how much it does, users never get lost.",
    },
  ],
  caption: "Research board, the users we designed for and how they create",
};

export const problem = {
  label: "The problem",
  heading: "Zaps had changed so much, it no longer felt like one app",
  body: "Zaps did not start as a creator tool. It began as a social app for a young, Gen Z crowd, then kept changing as we tried new ideas, until it became a creation app for a more grown-up group of creators. Every change added features fast, but no one stepped back to make them fit together. The app worked, but it felt like a few different apps stuck under one icon.",
  cards: [
    {
      no: "01",
      title: "Every format worked differently",
      body: "Making a post, a story, a reel, or a carousel each worked its own way. A user who figured out one still had to learn the next from scratch.",
    },
    {
      no: "02",
      title: "No two tools behaved the same",
      body: "Each tool opened, confirmed, and closed differently. Nothing was predictable, so a user could never settle into a habit and just create.",
    },
    {
      no: "03",
      title: "Too many options at once",
      body: "Tapping a tool put every setting on screen at the same time. It was a lot to take in, and it made simply getting started feel harder than it should.",
    },
  ],
  caption: "The old app, four formats that each looked and worked differently",
  quote:
    "As Zaps grew from a social app into a creator tool, its editing experience became fragmented. The challenge was to bring every format and every tool into one experience that feels like a single app. The goal was to make creating content fast and familiar, so more users finish what they start and keep coming back.",
};

export const designed = {
  label: "What I designed",
  heading: "One smooth path from idea to posted",
  body: "I brought the whole thing together, so making anything on Zaps works the same way and feels like one app.",
  cards: [
    {
      no: "01",
      title: "Find",
      body: "Browse or search 5,000+ ready-made templates, or start from your own photo. Built to work whether you're exploring for ideas or you already know what you want.",
    },
    {
      no: "02",
      title: "Make",
      body: "The same tools, text, stickers, filters, frames, work the same way for posts, stories, reels and carousels. Complex tools opened with progressive disclosure.",
    },
    {
      no: "03",
      title: "Share",
      body: "Post straight to Instagram or TikTok. For reels, I designed how licensed music gets added the right way, so posts don't end up muted.",
    },
  ],
  caption: "The unified experience, the same tools across every format",
};

export const testing = {
  label: "Testing & feedback",
  heading: "We listened, watched, and fixed",
  body: "Feedback from creators and how users actually used the app decided what we changed. Two examples:",
  cards: [
    {
      tag: "Stickers",
      title: "Users couldn't find the right sticker",
      body: "As we added hundreds of stickers, creators told us they couldn't find the one they wanted. So I rebuilt how stickers and frames work.",
    },
    {
      tag: "Templates",
      title: "Users wanted to try another template",
      body: "Once they had started, users told us that switching to a different template meant going all the way back to the gallery and starting over.",
    },
  ],
  caption: "The template-switch feature, and the rebuilt sticker library",
};

export const built = {
  label: "What we built from that",
  heading: "Two fixes, both built to scale",
  cards: [
    {
      tag: "Stickers & Frames",
      title: "Stickers that stay easy to find",
      body: "Grouped into packs, with recently used and search up front, so the library stays quick to use even with thousands of stickers.",
    },
    {
      tag: "Templates",
      title: "Switch templates without starting over",
      body: "A user can swap to a new template from inside the editor, keeping the photos and text they already added.",
    },
  ],
  caption: "The rebuilt sticker library and the in-editor template switch",
};

export const templates = {
  label: "The templates",
  heading: "The ready to use templates users start from",
  body: "Most users don't start from a blank screen, they pick a template and make it their own. I built the library of these, and led the team behind it.",
  cards: [
    {
      no: "01",
      title: "I set up how templates are made",
      body: "Wrote the rules for building them so the engineering team could turn a designer file into something users can actually edit in the app.",
    },
    {
      no: "02",
      title: "I hired and led the team",
      body: "Ran a team of 8-10 freelance designers and mentored a junior designer directly. Together we made 5,000+ templates, the ones the app earns from.",
    },
    {
      no: "03",
      title: "I made them 6x faster to build",
      body: "I proposed to put together a shared kit of frames, stickers and fonts, cutting the time to make one template from 30 minutes to 5.",
    },
  ],
  chips: ["Led a team of 10", "5,000+ templates", "6x faster to make"],
  caption: "The template library and the shared kit behind it",
};

/**
 * The working canvas — a whole Figma page of screens. Embedded rather than
 * exported so the reader can pan and zoom through the real file.
 */
export const canvas = {
  url: "gnweT8KWtnkVgOPAm1SBqC/Untitled?node-id=2001-144",
  title: "Zaps — the full design canvas",
};

export const role = {
  label: "My role",
  heading: "What I did",
  body: "Across every version of the app, I designed how it is used, from talking to creators and researching, to designing the screens, testing them, and handing them to engineers to build. The direction and business calls sat with our design lead and the product and growth teams.",
  chips: [
    "Research",
    "Designed the experience",
    "Led the template team",
    "Testing",
    "Engineering handoff",
  ],
};

export const learned = {
  label: "What I learned",
  heading: "Build it to *evolve*, because it will",
  body: "Zaps changed direction three times. What made the difference was not moving fast; it was designing the app so each new change could build on the last one, instead of starting over every time.",
};

export const outro = {
  cta: "Next project →",
  credit: "Zaps · Turnip, Product design by Pranjali · 2024–2026",
};
