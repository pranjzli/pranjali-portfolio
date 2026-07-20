# Portfolio

Single-page portfolio boilerplate built to the Figma design.
**Next.js 16 (App Router) · Motion (Framer Motion v12) · Lenis smooth scroll · Tailwind v4.**

## Run

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Structure

```
src/
  app/
    layout.tsx        # fonts (Geist + Instrument Serif) + <SmoothScroll> root
    page.tsx          # composes the sections
    globals.css       # design tokens + Lenis base styles
  components/
    smooth-scroll.tsx # Lenis wrapper (disabled under reduced-motion)
    navbar.tsx  hero.tsx  about.tsx  polaroids.tsx
    selected-works.tsx  testimonials.tsx  motion-brand.tsx
    design-thinking.tsx  footer-cta.tsx
    ui/
      reveal.tsx        # <Reveal> / <Reveal.Item> scroll-in wrapper
      accent-text.tsx   # *serif* and [[highlight]] inline markers
      avatar.tsx  section-label.tsx
  lib/
    content.ts        # ALL copy/data — edit here
    motion.ts         # shared variants + easing
```

## Swapping in real content

- **Copy & data** → `src/lib/content.ts`. Wrap words in `*asterisks*` for the
  serif-italic accent, `[[double brackets]]` for the yellow/green highlighter.
- **Images** → drop files in `public/` and point `content.ts` at them
  (avatar, polaroids, project thumbnails). Placeholders render until then:
  green blocks for project/photo cards, a gradient circle for the avatar.
- **Colors / fonts** → design tokens live at the top of `src/app/globals.css`.

## Motion notes

- Section reveals: `<Reveal>` (fade + rise + de-blur, fires once in view).
- All motion respects `prefers-reduced-motion` — reveals render instantly and
  Lenis falls back to native scroll.
