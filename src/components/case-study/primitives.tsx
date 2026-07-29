"use client";

import { motion } from "motion/react";
import { viewportOnce, ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { Reveal } from "@/components/ui/reveal";

/** Case-study measure — slightly wider than the home page's 720px. */
export function Measure({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[840px] px-6 ${className}`}>{children}</div>
  );
}

/** Section eyebrow. Uses the case-study accent rather than muted grey. */
export function Eyebrow({ children }: { children: string }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--cs-accent)]">
      {children}
    </span>
  );
}

export function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="mt-4 text-balance text-3xl leading-[1.15] tracking-tight sm:text-[38px]">
      <AccentText>{children}</AccentText>
    </h2>
  );
}

export function Body({ children }: { children: string }) {
  return (
    <p className="text-[17px] leading-[1.65] text-foreground/75">{children}</p>
  );
}

export type Media = { ratio: string; src?: string; alt?: string; caption?: string };

/**
 * An image slot. Artwork sits on the page itself — no card behind it, just a
 * faint shadow to lift it off the ground — with a caption underneath. Empty
 * slots stay bare green placeholders.
 *
 * The padding is kept on the wrapper even without the card so the artwork
 * renders at exactly the width it did on the card; the screens inside these
 * flow diagrams must not change size.
 */
export function Placeholder({ ratio = "16/9", src, alt = "", caption }: Media) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease }}
      style={src ? undefined : { aspectRatio: ratio }}
      className={
        src
          ? "w-full p-3 sm:p-4"
          : "w-full overflow-hidden rounded-2xl bg-card"
      }
    >
      {src && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{ aspectRatio: ratio }}
            className="w-full rounded-lg object-contain drop-shadow-[0_10px_24px_rgba(25,25,23,0.07)]"
          />
          {caption && (
            <figcaption className="mt-4 text-sm leading-relaxed text-muted">
              {caption}
            </figcaption>
          )}
        </>
      )}
    </motion.figure>
  );
}

/**
 * A row of slots. Two-up only when nothing in the row carries artwork.
 * `breakout` widens past the text measure — wide flow diagrams go unreadable
 * at reading width.
 */
export function PlaceholderRow({
  media,
  breakout = false,
}: {
  media: Media[];
  breakout?: boolean;
}) {
  const hasArt = media.some((m) => m.src);

  return (
    <div
      className={
        breakout
          ? "relative left-1/2 mt-10 w-[min(1180px,92vw)] -translate-x-1/2 space-y-6"
          : `mt-10 grid gap-6 ${media.length > 1 && !hasArt ? "md:grid-cols-2" : ""}`
      }
    >
      {media.map((m, i) => (
        <Placeholder key={i} ratio={m.ratio} src={m.src} alt={m.alt} caption={m.caption} />
      ))}
    </div>
  );
}

/**
 * A row of photos at one shared height. Each item flexes in proportion to its
 * own aspect ratio, so the heights match exactly and the widths differ — the
 * way a contact sheet reads.
 */
export function PhotoRow({
  photos,
  breakout = false,
}: {
  photos: { src: string; ratio: number; alt: string }[];
  breakout?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      className={`mt-10 flex flex-wrap gap-3 sm:flex-nowrap ${
        breakout ? "relative left-1/2 w-[min(1180px,92vw)] -translate-x-1/2" : ""
      }`}
    >
      {photos.map((p) => (
        <motion.div
          key={p.src}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
          }}
          style={{ flexGrow: p.ratio, flexBasis: 0 }}
          className="min-w-[45%] sm:min-w-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src}
            alt={p.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-2xl object-cover drop-shadow-[0_10px_24px_rgba(25,25,23,0.07)]"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

/** Big number + label, used by the hero stat row and the impact row. */
export function Stat({
  value,
  label,
  size = "lg",
}: {
  value: string;
  label: string;
  size?: "lg" | "sm";
}) {
  return (
    <Reveal.Item>
      <div
        className={
          size === "lg"
            ? "text-6xl font-extrabold tracking-tight sm:text-7xl"
            : "text-4xl font-extrabold tracking-tight"
        }
      >
        {value}
      </div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </Reveal.Item>
  );
}

/** Accent-dot bullet list, matching the Figma frame's dot bullets. */
export function Bullets({ items }: { items: string[] }) {
  return (
    <Reveal group className="mt-6 space-y-4">
      {items.map((b) => (
        <Reveal.Item key={b} className="flex gap-4">
          <span className="mt-[0.55em] size-2 shrink-0 rounded-full bg-[var(--cs-accent)]" />
          <span className="text-[17px] leading-[1.65] text-foreground/75">{b}</span>
        </Reveal.Item>
      ))}
    </Reveal>
  );
}

export type Card = { no?: string; tag?: string; title: string; body: string };

/**
 * Scannable card grid. Breaks out past the text measure — at reading width
 * four cards leave the copy setting two or three words to a line.
 */
export function CardGrid({
  cards,
  columns = 4,
}: {
  cards: Card[];
  columns?: 2 | 3 | 4;
}) {
  const cols =
    columns === 4 ? "lg:grid-cols-4" : columns === 3 ? "lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <Reveal
      group
      className={`relative left-1/2 mt-10 grid w-[min(1180px,92vw)] -translate-x-1/2 gap-5 sm:grid-cols-2 ${cols}`}
    >
      {cards.map((c) => (
        <Reveal.Item
          key={c.title}
          className="flex flex-col rounded-2xl border border-line bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
        >
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--cs-accent)]">
            {c.no ?? c.tag}
          </span>
          <h3 className="mt-3 text-[17px] font-semibold leading-snug">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
        </Reveal.Item>
      ))}
    </Reveal>
  );
}

/** Pill row — quick facts or the role breakdown. */
export function Chips({ items, className = "mt-8" }: { items: string[]; className?: string }) {
  return (
    <Reveal group className={`flex flex-wrap gap-2.5 ${className}`}>
      {items.map((c) => (
        <Reveal.Item
          key={c}
          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-foreground/80"
        >
          {c}
        </Reveal.Item>
      ))}
    </Reveal>
  );
}

/**
 * The problem statement, framed like a selected object on the Figma canvas:
 * a blue bounding box with corner handles and a small label tab, matching the
 * treatment in the source frame. Optional centered eyebrow above.
 */
export function PullQuote({
  children,
  eyebrow,
}: {
  children: string;
  eyebrow?: string;
}) {
  const handle =
    "absolute size-2.5 rounded-[2px] border border-[#0d99ff] bg-white";
  return (
    <Reveal className="relative left-1/2 mt-14 w-[min(920px,92vw)] -translate-x-1/2 text-center">
      {eyebrow && (
        <div className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--cs-accent)]">
          {eyebrow}
        </div>
      )}
      <div className="relative rounded-[3px] outline outline-[1.5px] outline-[#0d99ff]">
        {/* Figma-style label tab */}
        <span className="absolute -top-6 left-0 rounded-[3px] bg-[#0d99ff] px-2 py-0.5 text-[11px] font-medium text-white">
          Problem
        </span>
        {/* Corner handles */}
        <span className={`${handle} -left-[5px] -top-[5px]`} />
        <span className={`${handle} -right-[5px] -top-[5px]`} />
        <span className={`${handle} -bottom-[5px] -left-[5px]`} />
        <span className={`${handle} -bottom-[5px] -right-[5px]`} />

        <p className="serif px-6 py-10 text-2xl leading-[1.4] text-foreground/85 sm:px-12 sm:text-[30px]">
          “{children}”
        </p>
      </div>
    </Reveal>
  );
}

/**
 * A captioned section visual that breaks out past the text measure. Renders the
 * artwork when `src` is set, a green placeholder otherwise.
 */
export function SectionVisual({
  caption,
  src,
  alt = "",
  ratio = "16/9",
}: {
  caption?: string;
  src?: string;
  alt?: string;
  ratio?: string;
}) {
  return (
    <div className="relative left-1/2 mt-10 w-[min(1180px,92vw)] -translate-x-1/2">
      <Placeholder ratio={ratio} src={src} alt={alt} />
      {caption && (
        <p className="mt-4 text-sm leading-relaxed text-muted">{caption}</p>
      )}
    </div>
  );
}

/** Standard section wrapper: eyebrow + heading + body paragraphs. */
export function Section({
  label,
  heading,
  body,
  children,
  id,
}: {
  label: string;
  heading: string;
  body?: string | string[];
  children?: React.ReactNode;
  id?: string;
}) {
  const paras = typeof body === "string" ? [body] : body ?? [];

  return (
    <section id={id} className="py-16 sm:py-20">
      <Measure>
        <Reveal>
          <Eyebrow>{label}</Eyebrow>
          <SectionHeading>{heading}</SectionHeading>
          {paras.length > 0 && (
            <div className="mt-5 space-y-4">
              {paras.map((p, i) => (
                <Body key={i}>{p}</Body>
              ))}
            </div>
          )}
        </Reveal>
        {children}
      </Measure>
    </section>
  );
}
