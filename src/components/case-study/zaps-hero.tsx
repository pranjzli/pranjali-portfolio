"use client";

import { motion } from "motion/react";
import { ease } from "@/lib/motion";

/**
 * Editor-case-study hero. A hand holding the app sits still in front, while the
 * screens it produces drift past behind it as a seamless marquee — the same
 * ticker idea as the landing-page polaroids.
 *
 * Every measurement here is a percentage of the stage's own height (or width),
 * never an absolute pixel — that's what lets <ZapsHeroStage> render at full
 * hero size on the case-study page and again, tiny, inside the landing-page
 * project card, with the exact same relative composition both times.
 */

const SCREENS = Array.from({ length: 15 }, (_, i) => `/images/case-studies/zaps/hero/screens/${i + 1}.png`);
const STAGE_RATIO = "7378 / 1361";

const HAND_SCALE = 2.17;
const HAND_UNSCALED_HEIGHT_PCT = 96; // of stage height, before the scale transform
const SCREENS_HEIGHT_PCT = 146;

// Per-piece vertical nudges, as % of stage height (dialed in as px against the
// 1320px-wide hero, then converted: px / (1320 * 1361/7378) * 100).
const Y_PCT = { hand: 1.643, screens: -45.586, leftEdge: -25.873, rightEdge: -25.873 };

// `scale()` grows the hand symmetrically from its own centre, so its painted
// bottom lands this far below the stage's un-scaled bottom (as a % of stage
// height). The marquee band is shifted down by the same amount so it still
// sits behind the hand instead of stopping short and exposing bare background
// under the wrist — the hand itself is left fully unclipped.
const MARQUEE_SHIFT_PCT = (HAND_UNSCALED_HEIGHT_PCT * (HAND_SCALE - 1)) / 2;

function Strip({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    // All screens share one horizontal baseline — no stagger.
    <div className="flex h-full shrink-0 items-end gap-[19px] px-4" aria-hidden={ariaHidden || undefined}>
      {SCREENS.map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={ariaHidden ? "" : "A screen from the Zaps editor"}
          loading="lazy"
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
 * spanning the page.
 */
export function ZapsHeroStage({ contained = false }: { contained?: boolean }) {
  const edgeSide = contained
    ? "w-[30%]"
    : // 100vw-breakout trick: `left-1/2` + `-ml-[50vw]` reaches the true
      // viewport edge regardless of how narrow this stage itself is, as long
      // as the stage is viewport-centered (it is, on the hero section).
      "w-[30vw]";
  const leftPos = contained ? "left-0" : "left-1/2 -ml-[50vw]";
  const rightPos = contained ? "right-0" : "right-1/2 -mr-[50vw]";

  return (
    <div className="relative w-full" style={{ aspectRatio: STAGE_RATIO }}>
      {/* Behind: the editor screens drifting past — shifted down to meet
          the hand's actual (scaled) bottom, see MARQUEE_SHIFT_PCT above */}
      <div
        style={{ transform: `translateY(calc(${MARQUEE_SHIFT_PCT}% + ${Y_PCT.screens}%))` }}
        className="absolute inset-0 flex items-end overflow-visible"
      >
        <div className="marquee-track flex h-full w-max items-end">
          <Strip />
          <Strip ariaHidden />
        </div>
      </div>

      {/* Edge fades — height + vertical position match the screens exactly,
          so the fade covers their full height at their current position. */}
      <div
        aria-hidden
        style={{
          height: `${SCREENS_HEIGHT_PCT}%`,
          transform: `translateY(calc(${MARQUEE_SHIFT_PCT}% + ${Y_PCT.screens + Y_PCT.leftEdge}%))`,
        }}
        className={`pointer-events-none absolute bottom-0 z-[6] ${leftPos} ${edgeSide} bg-[linear-gradient(to_right,var(--background),transparent)]`}
      />
      <div
        aria-hidden
        style={{
          height: `${SCREENS_HEIGHT_PCT}%`,
          transform: `translateY(calc(${MARQUEE_SHIFT_PCT}% + ${Y_PCT.screens + Y_PCT.rightEdge}%))`,
        }}
        className={`pointer-events-none absolute bottom-0 z-[6] ${rightPos} ${edgeSide} bg-[linear-gradient(to_left,var(--background),transparent)]`}
      />

      {/* Front: the hand, still. Left fully unclipped — nothing should ever
          cut off the wrist. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/case-studies/zaps/hero/hand.png"
          alt="A hand holding a phone running the Zaps app"
          style={{
            height: `${HAND_UNSCALED_HEIGHT_PCT}%`,
            transform: `translateY(${Y_PCT.hand}%) scale(${HAND_SCALE})`,
          }}
          className="w-auto max-w-none drop-shadow-[0_28px_50px_rgba(25,25,23,0.20)]"
        />
      </div>
    </div>
  );
}

export function ZapsHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.25 }}
      // mt-[173px]: clearance so the hand's scaled-up top (it overflows the
      // stage's top edge — scale() grows both ways from centre) doesn't run
      // into the intro paragraph above — 144px (mt-36) + 20%.
      className="relative left-1/2 mt-[173px] w-[min(1320px,98vw)] -translate-x-1/2"
    >
      <ZapsHeroStage />
    </motion.div>
  );
}
