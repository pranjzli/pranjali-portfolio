"use client";

import { motion } from "motion/react";
import { ease } from "@/lib/motion";

/**
 * Editor-case-study hero. A hand holding the app sits still in front, while the
 * screens it produces drift past behind it as a seamless marquee — the same
 * ticker idea as the landing-page polaroids.
 *
 * Sized to the reference frame's own proportions (~5.4:1) rather than a fixed
 * viewport height, and left unclipped — nothing here should ever get cut off
 * by the container.
 *
 * The screens carry their own rounded corners (transparent PNGs); the marquee
 * pauses under prefers-reduced-motion via the shared `.marquee-track` rule.
 */

const SCREENS = Array.from({ length: 15 }, (_, i) => `/images/case-studies/zaps/hero/screens/${i + 1}.png`);

// Dialed in against the reference frame with a temporary on-page tuner.
const HAND_TRANSFORM = { scale: 2.17, x: 0, y: -17 };

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
          className="h-[138%] w-auto shrink-0 opacity-50 drop-shadow-[0_18px_40px_rgba(25,25,23,0.12)]"
        />
      ))}
    </div>
  );
}

export function ZapsHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.25 }}
      // mt-36: clearance so the enlarged screens (they overflow the stage's
      // top edge) don't run into the intro paragraph above.
      className="relative left-1/2 mt-36 w-[min(1320px,98vw)] -translate-x-1/2"
    >
      {/* Reference frame is ~7378x1361 — same ratio here, so the row is never clipped */}
      <div className="relative w-full" style={{ aspectRatio: "7378 / 1361" }}>
        {/* Behind: the editor screens drifting past */}
        <div className="absolute inset-0 flex items-end overflow-visible">
          <div className="marquee-track flex h-full w-max items-end">
            <Strip />
            <Strip ariaHidden />
          </div>
        </div>

        {/* Edge fades — anchored to the true viewport edges (not the capped-
            width stage) via the standard 100vw-breakout trick: `left-1/2` +
            `-ml-[50vw]` puts the left edge at x=0 regardless of how narrow
            the stage itself is, as long as the stage is viewport-centered
            (it is). Height matches the screens' own h-[138%] and bottom
            anchor exactly, so the fade covers their full overflowed height. */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 z-[6] -ml-[50vw] h-[138%] w-[30vw] bg-[linear-gradient(to_right,var(--background),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-1/2 z-[6] -mr-[50vw] h-[138%] w-[30vw] bg-[linear-gradient(to_left,var(--background),transparent)]"
        />

        {/* Front: the hand, still, sharing the same baseline as the screens */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/zaps/hero/hand.png"
            alt="A hand holding a phone running the Zaps app"
            style={{
              transform: `translate(${HAND_TRANSFORM.x}px, ${HAND_TRANSFORM.y}px) scale(${HAND_TRANSFORM.scale})`,
            }}
            className="h-[96%] w-auto max-w-none drop-shadow-[0_28px_50px_rgba(25,25,23,0.20)]"
          />
        </div>
      </div>
    </motion.div>
  );
}
