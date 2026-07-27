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

export type Media = { ratio: string; src?: string; alt?: string };

/**
 * An image slot. With `src` it renders the artwork on the same green card,
 * so filled and empty slots read as one family; without, it stays a bare
 * green placeholder — no caption or helper text either way.
 */
export function Placeholder({ ratio = "16/9", src, alt = "" }: Media) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease }}
      style={src ? undefined : { aspectRatio: ratio }}
      className="w-full overflow-hidden rounded-2xl bg-card"
    >
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ aspectRatio: ratio }}
          className="w-full object-contain p-3 sm:p-4"
        />
      )}
    </motion.div>
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
        <Placeholder key={i} ratio={m.ratio} src={m.src} alt={m.alt} />
      ))}
    </div>
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
