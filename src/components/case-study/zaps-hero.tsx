"use client";

import { motion } from "motion/react";
import { ease } from "@/lib/motion";

/**
 * Editor-case-study hero. A hand holding the app sits still in front, while the
 * screens it produces drift past behind it as a seamless marquee — the same
 * ticker idea as the landing-page polaroids.
 *
 * Every measurement is a percentage of the stage's own height, and every
 * piece (marquee, both edge fades, hand) is positioned through an identical
 * `<Piece>` wrapper — an `absolute inset-0` box whose own height is therefore
 * always exactly the stage height, so a `translateY(x%)` on it always means
 * "x% of the stage", never "x% of whatever this piece's own content happens
 * to be tall". Mixing those two up is what caused the gradient to drift out
 * of registration with the screens behind it: the gradient's own box was
 * SCREENS_HEIGHT_PCT tall, so a translateY on it directly was being resolved
 * against *that*, not the stage. Piece sidesteps the whole class of bug, and
 * is also why the same numbers reproduce identically at any container size —
 * card-sized or full hero.
 */

const SCREENS = Array.from({ length: 15 }, (_, i) => `/images/case-studies/zaps/hero/screens/${i + 1}.png`);
const STAGE_RATIO = "7378 / 1361";
// The landing-page card's own stage: 1.3x taller than the hero's, so the
// composition renders 1.3x larger throughout (everything here scales off
// stage height) with more headroom before the card's frame crops it.
const CARD_STAGE_RATIO = "7378 / 1769.3";

const HAND_SCALE = 2.17;
const HAND_UNSCALED_HEIGHT_PCT = 96; // of stage height, before the scale transform
const SCREENS_HEIGHT_PCT = 146;

// `scale()` grows the hand symmetrically from its own centre, so its painted
// bottom lands this far below the stage's un-scaled bottom (as a % of stage
// height) — and, symmetrically, its painted top lands the same distance
// above the stage's un-scaled top. The marquee band is shifted down by this
// amount so it still sits behind the hand instead of stopping short and
// exposing bare background under the wrist — the hand itself is left fully
// unclipped inside the stage box.
const HAND_OVERFLOW_PCT = (HAND_UNSCALED_HEIGHT_PCT * (HAND_SCALE - 1)) / 2;

/**
 * Positions `children` at `shiftPct`% of the stage's own height, measured
 * from the shared bottom baseline. `inset-0` is what makes the percentage
 * reliable — see the file header.
 */
function Piece({
  shiftPct,
  className = "",
  style,
  children,
}: {
  shiftPct: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ transform: `translateY(${shiftPct}%)`, ...style }}
      className={`absolute inset-0 flex items-end ${className}`}
    >
      {children}
    </div>
  );
}

function Strip({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    // All screens share one horizontal baseline — no stagger. Eager-loaded:
    // this is always-visible looping content, not real below-the-fold
    // content, and the CSS loop only stays seamless once both copies of the
    // strip have their real width — a lazy-loaded image is 0px wide until it
    // decodes, which was throwing the loop out of alignment.
    <div className="flex h-full shrink-0 items-end gap-[19px] px-4" aria-hidden={ariaHidden || undefined}>
      {SCREENS.map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={ariaHidden ? "" : "A screen from the Zaps editor"}
          decoding="async"
          style={{ height: `${SCREENS_HEIGHT_PCT}%` }}
          className="w-auto shrink-0 opacity-50 drop-shadow-[0_18px_40px_rgba(25,25,23,0.12)]"
        />
      ))}
    </div>
  );
}

/**
 * The composition itself: marquee + edge fades + hand. No outer sizing, no
 * entrance animation — the caller decides how big the stage is and how it's
 * framed.
 *
 * `contained` switches the edge fades from the hero's viewport-edge breakout
 * (they reach past this component's own bounds to the true screen edge) to
 * fades that stay flush with this component's own left/right edge instead —
 * what you want once the visual sits inside a bounded card rather than
 * spanning the page. `ratio` lets a bounded card ask for a taller stage than
 * the hero's own (see CARD_STAGE_RATIO) — every measurement here is relative,
 * so the whole composition just scales up with it.
 */
export function ZapsHeroStage({
  contained = false,
  ratio = STAGE_RATIO,
}: {
  contained?: boolean;
  ratio?: string;
}) {
  const edgeWidth = contained ? "w-[30%]" : "w-[30vw]";
  const leftPos = contained
    ? "left-0"
    : // 100vw-breakout trick: reaches the true viewport edge regardless of
      // how narrow this stage itself is, as long as the stage is
      // viewport-centered (it is, on the hero section).
      "left-1/2 -ml-[50vw]";
  const rightPos = contained ? "right-0" : "right-1/2 -mr-[50vw]";

  return (
    <div className="relative w-full" style={{ aspectRatio: ratio }}>
      {/* Behind: the editor screens drifting past — shifted down to meet the
          hand's actual (scaled) bottom. */}
      <Piece shiftPct={HAND_OVERFLOW_PCT} className="overflow-visible">
        <div className="marquee-track flex h-full w-max items-end">
          <Strip />
          <Strip ariaHidden />
        </div>
      </Piece>

      {/* Edge fades — identical shift to the marquee above, so they land in
          exactly the same place the screens do; only their own height and
          horizontal anchor differ. (The children are absolutely positioned,
          so Piece's own flex alignment doesn't affect them — only its
          translateY matters here.) */}
      <Piece shiftPct={HAND_OVERFLOW_PCT} className="z-[6]">
        <div
          aria-hidden
          style={{ height: `${SCREENS_HEIGHT_PCT}%` }}
          className={`pointer-events-none absolute bottom-0 ${leftPos} ${edgeWidth} bg-[linear-gradient(to_right,var(--background),transparent)]`}
        />
      </Piece>
      <Piece shiftPct={HAND_OVERFLOW_PCT}>
        <div
          aria-hidden
          style={{ height: `${SCREENS_HEIGHT_PCT}%` }}
          className={`pointer-events-none absolute bottom-0 ${rightPos} ${edgeWidth} bg-[linear-gradient(to_left,var(--background),transparent)]`}
        />
      </Piece>

      {/* Front: the hand, still, bottom-anchored to the same baseline —
          left fully unclipped, nothing should ever cut off the wrist. */}
      <Piece shiftPct={0} className="z-10 justify-center pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/case-studies/zaps/hero/hand.png"
          alt="A hand holding a phone running the Zaps app"
          style={{ height: `${HAND_UNSCALED_HEIGHT_PCT}%`, transform: `scale(${HAND_SCALE})` }}
          className="w-auto max-w-none drop-shadow-[0_28px_50px_rgba(25,25,23,0.20)]"
        />
      </Piece>
    </div>
  );
}

export { CARD_STAGE_RATIO };

export function ZapsHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.25 }}
      // Vertical margin-% resolves against the *parent's* width (the
      // full-bleed section), not this element's own — so a plain % here
      // would track the wrong box. calc() against the same min(1320px,98vw)
      // expression the stage itself uses keeps this exactly proportional to
      // the stage at every breakpoint. 0.13106 = 173px at the reference
      // 1320px-wide stage (144px mt-36 + 20% for clearance above the hand's
      // scaled-up top, which overflows the stage by HAND_OVERFLOW_PCT).
      className="relative left-1/2 w-[min(1320px,98vw)] -translate-x-1/2"
      style={{ marginTop: "calc(min(1320px, 98vw) * 0.13106)" }}
    >
      <ZapsHeroStage />
    </motion.div>
  );
}
