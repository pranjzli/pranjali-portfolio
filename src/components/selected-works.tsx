"use client";

import { motion } from "motion/react";
import { projects } from "@/lib/content";
import { viewportOnce, ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { SectionLabel, Container } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { ZapsHeroStage } from "@/components/case-study/zaps-hero";

// The hero visual's own aspect ratio, tuned to 0.52x its previous height via
// the (now-removed) temp tuner — applied to both the frame (CardSurface) and
// the stage inside it, so the two stay in sync rather than the stage
// rendering shorter than the frame it's supposed to fill exactly.
const FEATURED_CARD_RATIO = "7378 / 1656.0648";

function CardSurface({
  className = "",
  style,
  arrow = true,
  href = "#",
  clean = false,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  arrow?: boolean;
  href?: string;
  /** Drops the green placeholder background — for a card with real content
   * (the arrow's border colour switches from card-foreground to foreground
   * to match, since there's no green surface behind it to sit on). */
  clean?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      style={style}
      whileHover="hover"
      className={`group relative block overflow-hidden rounded-2xl ${clean ? "border border-line bg-background" : "bg-card"} ${className}`}
    >
      {children}
      {/* subtle sheen on hover */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(255,255,255,0.35),transparent)]"
      />
      {arrow && (
        <motion.span
          variants={{ hover: { scale: [1, 0.82, 1] } }}
          transition={{ duration: 0.4, ease, times: [0, 0.4, 1] }}
          className={`absolute bottom-4 right-4 grid size-9 place-items-center rounded-full border ${clean ? "border-foreground/25 text-foreground" : "border-card-foreground/25 text-card-foreground"}`}
        >
          ↗
        </motion.span>
      )}
    </motion.a>
  );
}

export function SelectedWorks() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="py-20">
      <Container className="max-w-[920px]">
        <Reveal>
          <SectionLabel>Selected Works</SectionLabel>
        </Reveal>

        {/* Featured: heading first, then the hero visual underneath in its
            own frame. Just copy + visual for this one — no small placeholder
            cards. */}
        <Reveal group className="mt-6">
          <Reveal.Item>
            <h3 className="text-2xl leading-snug tracking-tight sm:text-[26px]">
              <AccentText>{featured.title}</AccentText>
            </h3>
            <p className="mt-3 text-sm text-muted">{featured.meta}</p>
          </Reveal.Item>
          <Reveal.Item className="mt-6">
            <CardSurface
              href={featured.href ?? "#"}
              clean
              className="w-full"
              style={{ aspectRatio: FEATURED_CARD_RATIO }}
            >
              <ZapsHeroStage
                contained
                ratio={FEATURED_CARD_RATIO}
                screenTopGapPct={30}
                handTune={{ scale: 0.95, x: -17, y: 94 }}
              />
            </CardSurface>
          </Reveal.Item>
        </Reveal>

        {/* Half cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            >
              <CardSurface href={p.href ?? "#"} className="aspect-[5/4] w-full" />
              <h3 className="mt-4 text-xl leading-snug tracking-tight">
                <AccentText>{p.title}</AccentText>
              </h3>
              <p className="mt-2 text-sm text-muted">{p.meta}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
