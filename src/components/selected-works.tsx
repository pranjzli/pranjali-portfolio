"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { projects } from "@/lib/content";
import { viewportOnce, ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { SectionLabel, Container } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { ZapsHeroStage } from "@/components/case-study/zaps-hero";

// Final tuned transforms — baked in from the (now-removed) temp sliders.
const DS_TRANSFORM = "translate(0px, 0px) scale(0.73)";
const HERO1_TRANSFORM = "translate(9px, 107px) scale(1.08)";
const HERO2_TRANSFORM = "translate(-7px, -114px) scale(1.08)";

// Two DIFFERENT ratios on purpose — they must NOT be synced.
//   FRAME  = the visible card (<a>). Taller, so the hand — which the stage
//            intentionally overflows downward — is shown in full instead of
//            being cropped top/bottom.
//   STAGE  = the ZapsHeroStage's own box, which sizes the hand + screens.
//            Kept short so the composition renders at the tuned size; making
//            it as tall as the frame blows the hand up far too big.
// The stage sits inside the taller frame and its content overflows down to
// fill it — see the reference framing.
const FEATURED_FRAME_RATIO = "7378 / 3278";
const FEATURED_STAGE_RATIO = "7378 / 1656.0648";

/**
 * The visual surface only — NOT a link. It sits inside a surrounding <Link>
 * (`group`), so its sheen + arrow react to hovering anywhere in that link,
 * letting the whole project block be one clickable area.
 */
function CardSurface({
  className = "",
  style,
  arrow = true,
  clean = false,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  arrow?: boolean;
  /** Drops the green placeholder background — for a card with real content
   * (the arrow's border colour switches from card-foreground to foreground
   * to match, since there's no green surface behind it to sit on). */
  clean?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={style}
      className={`relative block overflow-hidden rounded-2xl ${clean ? "border border-line bg-background" : "bg-card"} ${className}`}
    >
      {children}
      {/* subtle sheen when the surrounding link is hovered */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(255,255,255,0.35),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {arrow && (
        <span
          className={`absolute bottom-4 right-4 grid size-9 place-items-center rounded-full border transition-transform duration-300 group-hover:scale-90 ${clean ? "border-foreground/25 text-foreground" : "border-card-foreground/25 text-card-foreground"}`}
        >
          ↗
        </span>
      )}
    </div>
  );
}

export function SelectedWorks() {
  // Fixed order (see lib/content.ts): zaps-editor (featured), zaps-design-system,
  // fitastra — each now has bespoke visual content, not a generic placeholder.
  const [featured, designSystem, fitastra] = projects;

  return (
    <section id="work" className="py-20">
      <Container className="max-w-[920px]">
        <Reveal>
          <SectionLabel>Selected Works</SectionLabel>
        </Reveal>

        {/* Featured: heading first, then the hero visual underneath — the whole
            block is one link to the case study. */}
        <Reveal className="mt-6">
          <Link href={featured.href ?? "#"} className="group block">
            <h3 className="text-2xl leading-snug tracking-tight sm:text-[26px]">
              <AccentText>{featured.title}</AccentText>
            </h3>
            <p className="mt-3 text-sm text-muted">{featured.meta}</p>
            <div className="mt-6">
              <CardSurface clean className="w-full" style={{ aspectRatio: FEATURED_FRAME_RATIO }}>
                <ZapsHeroStage
                  contained
                  ratio={FEATURED_STAGE_RATIO}
                  screenTopGapPct={30}
                  handTune={{ scale: 0.95, x: -17, y: 94 }}
                />
              </CardSurface>
            </div>
          </Link>
        </Reveal>

        {/* Half cards — each whole block links to its case study */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease }}
          >
            <Link href={designSystem.href ?? "#"} className="group block">
              <CardSurface clean arrow className="aspect-[5/4] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/case-studies/zaps-design-system/designsystem.png"
                  alt=""
                  className="size-full object-contain"
                  style={{ transform: DS_TRANSFORM }}
                />
              </CardSurface>
              <h3 className="mt-4 text-xl leading-snug tracking-tight">
                <AccentText>{designSystem.title}</AccentText>
              </h3>
              <p className="mt-2 text-sm text-muted">{designSystem.meta}</p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease, delay: 0.08 }}
          >
            <Link href={fitastra.href ?? "#"} className="group block">
              <CardSurface clean arrow className="aspect-[5/4] w-full">
                {/* Two screens side by side, sharing the one card slot — clipped
                    to stay fully inside the box (no overflow past the frame). */}
                <div className="flex size-full">
                  <div className="w-1/2 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/case-studies/fitastra/hero1.png"
                      alt=""
                      className="size-full object-contain"
                      style={{ transform: HERO1_TRANSFORM }}
                    />
                  </div>
                  <div className="w-1/2 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/case-studies/fitastra/hero2.png"
                      alt=""
                      className="size-full object-contain"
                      style={{ transform: HERO2_TRANSFORM }}
                    />
                  </div>
                </div>
              </CardSurface>
              <h3 className="mt-4 text-xl leading-snug tracking-tight">
                <AccentText>{fitastra.title}</AccentText>
              </h3>
              <p className="mt-2 text-sm text-muted">{fitastra.meta}</p>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
