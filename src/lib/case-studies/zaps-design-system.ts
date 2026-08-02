/**
 * Zaps @ Turnip — the design system & token pipeline.
 * Copy lifted from the Figma frame "Zaps — Design System · Portfolio Visual
 * Language" and condensed into cards to stay scannable. `*asterisks*` render
 * as serif-italic accents (see AccentText).
 */

export const meta = {
  eyebrow: "Zaps @ Turnip · 2026",
  title: "I built the *design system* and token pipeline at Zaps",
  intro:
    "A token-first design system in Figma, turned into a machine-readable contract — and validated by building the app's UI in SwiftUI myself, with AI, before a developer ever touched it.",
  nav: { backLabel: "Back to work", backHref: "/#work" },
};

export const tldr = {
  label: "TL;DR",
  segments: [
    { t: "I designed Zaps' " },
    { t: "multilayered token-first design system", key: true },
    { t: " in Figma, turned it into a " },
    { t: "compiled run-time artefact", key: true },
    { t: ", and validated the whole pipeline by " },
    { t: "building the app's UI in SwiftUI myself", key: true },
    { t: " — with AI — " },
    { t: "before a developer ever touched it.", key: true },
  ],
  stats: [
    { value: "48", label: "semantic tokens, each mapped to a primitive" },
    { value: "152", label: "components across 29 variant sets" },
    { value: "24", label: "SwiftUI components built from the tokens" },
  ],
  note: "My first design system — built for production, learned by shipping it.",
};

export const problem = {
  label: "The problem",
  heading: "Every screen was styled from scratch, and handoff was a screenshot",
  body: [
    "After the pivots, Zaps had a clear visual language — dark canvas, glass surfaces, one orange accent — but no system behind it. Values lived in individual files, drifted between screens, and drifted further between Figma and code.",
    "Design and engineering were shipping the same app from two different sources of truth.",
  ],
  cards: [
    {
      tag: "Style drift",
      title: "Same button, three styles",
      body: "Values were copied by hand between files, so the same element rendered slightly differently across screens.",
    },
    {
      tag: "No shared language",
      title: "Nothing to point at",
      body: "There was no agreed name for a colour or a space — so every conversation started from scratch.",
    },
    {
      tag: "Handoff by guesswork",
      title: "Rebuilt by eye",
      body: "Developers matched styles from screenshots, every time, with no source of truth to check against.",
    },
  ],
  caption: "The drift — same button, three slightly different styles from the old files.",
};

export const system = {
  label: "The system",
  heading: "Tokens that carry *intent*, not just values",
  body: "Two tiers. Primitives hold the raw values — 14 colours, a 13-step scale, Inter at two weights. Semantic tokens name the intent, and they're the only layer designers and components ever touch.",
  cards: [
    {
      tag: "Intent over values",
      title: "Reach for the meaning",
      body: "You reach for Text/Muted, never “white at 50%”. Every token documents what it maps to and where it's used.",
    },
    {
      tag: "One accent, everywhere",
      title: "#FF922E and nothing else",
      body: "The only chroma in the app — active states, primary CTA, Pro badge. Depth comes from stacked white opacities, not shadows.",
    },
    {
      tag: "Platform-aware",
      title: "Pick a material, don't eyeball it",
      body: "iOS Liquid Glass and Android blur/solid forked as named effect styles, so a designer selects the correct material.",
    },
  ],
  caption: "Primitive → semantic mapping, straight from the Figma docs pages.",
};

export const pipeline = {
  label: "The pipeline",
  heading: "From Figma to code without a single *eyeballed* value",
  body: "The system exports as a token file where every entry carries its Figma name and its Swift expression. Not a description of the design — a contract between design and code.",
  cards: [
    {
      tag: "Figma",
      title: "The design source",
      body: "Variables, styles and docs — where every value and the intent behind it lives.",
    },
    {
      tag: "design-tokens.json",
      title: "The contract",
      body: "A DTCG-style file, one entry per token, each carrying its Figma name and Swift expression.",
    },
    {
      tag: "DesignTokens.swift",
      title: "What devs import",
      body: "A namespaced enum — no raw hex, pt values or magic numbers left in app code.",
    },
  ],
  governance:
    "Tokens are the single source of truth. Never raw hex, pt values, or magic numbers. If Figma and tokens disagree — the tokens win.",
  caption: "The contract — design-tokens.json and DesignTokens.swift, the same token side by side.",
};

export const validation = {
  label: "Validation",
  heading: "I didn't wait for a developer to find out if it worked. I built it myself.",
  body: "Using Claude Code as the executor, I built the app's UI in SwiftUI from my own tokens — a token-validated reference prototype in Xcode. Not to ship it, but to catch every design-to-code translation issue before it reached engineering.",
  cards: [
    {
      tag: "AI-directed build",
      title: "I wrote the AI's operating manual",
      body: "A CLAUDE.md encoding the token law, glass rules and layout rules — so every AI session produces on-system code without re-explaining.",
    },
    {
      tag: "Verify, don't assume",
      title: "Checked in the simulator, not in theory",
      body: "Build, screenshot, zoom into the exact edge, correct at unit precision — “drop blur 0.5 → 0.22” — and iterate.",
    },
    {
      tag: "It caught real issues",
      title: "Grey glass on a near-black canvas",
      body: "System materials read grey on our dark ground, so the system now ships its own dark-blur primitives, documented with the why.",
    },
  ],
  quote:
    "The tokens weren't done when they looked right in Figma. They were done when they compiled.",
  caption: "The prototype running in the iOS simulator, beside a page of the CLAUDE.md.",
};

export const honest = {
  label: "Keeping it honest",
  heading: "The system audits itself — starting with me",
  cards: [
    {
      no: "01",
      title: "Docs in the file",
      body: "Every token page carries Maps-To and Usage columns; components have their own docs pages. The system explains itself.",
    },
    {
      no: "02",
      title: "A live audit page",
      body: "I run an audit on my own system — and it catches real bugs, like a “White-50” primitive whose actual alpha was 5%.",
    },
    {
      no: "03",
      title: "Handoff docs as output",
      body: "Engineering handoffs and interaction specs for the hardest features — including a “do not clean these up” workarounds table.",
    },
  ],
  caption: "The audit page, beside a handoff-doc excerpt.",
};

export const impact = {
  label: "Impact",
  heading: "One contract. Both sides read it.",
  stats: [
    { value: "48", label: "semantic tokens" },
    { value: "152", label: "components, 29 sets" },
    { value: "24", label: "SwiftUI components validated" },
    { value: "0", label: "hard-coded values in the build" },
  ],
  cards: [
    {
      tag: "Before",
      title: "Handoff by screenshot and guesswork",
      body: "“Get it close.”",
    },
    {
      tag: "After",
      title: "The same token, Figma → JSON → Swift",
      body: "“It's already exact.”",
    },
  ],
};

export const website = {
  label: "Same method, new surface",
  heading: "Then I used the same loop to build Zaps' *website*",
  body: "Figma v0 first, then AI as the build partner — section by section, screenshot-reviewed, motion matched to reference recordings. A live, animated Next.js site, with me as the art director and taste layer throughout.",
  chips: ["Figma-to-code", "Motion design", "AI as execution partner"],
  caption: "The landing-page hero from the animated Next.js build.",
};

export const role = {
  label: "My role",
  heading: "Product designer — the system, the pipeline, and the proof, end to end",
  chips: ["Systems design", "End-to-end ownership", "iOS handoff", "AI-directed build"],
  body: "Token architecture, the Figma library and its docs, the JSON contract, the SwiftUI validation build, and the handoff specs engineering builds from — owned end to end.",
};

export const learned = {
  label: "What I learned",
  heading: "A design system isn't a Figma file. It's an *agreement* — and I made it executable.",
  body: "Designers reach for intent. Developers import an enum. Nobody eyeballs anything. That's the whole point.",
};

export const outro = {
  cta: "Next project →",
  href: "/work/zaps-editor",
  credit: "Zaps @ Turnip · Design system & token pipeline — Pranjali · 2026",
};
