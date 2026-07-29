"use client";

import { motion } from "motion/react";
import { ease } from "@/lib/motion";

/**
 * Editor-case-study hero. A hand holding the app sits still in front, while the
 * screens it produces drift past behind it as a seamless marquee — the same
 * ticker idea as the landing-page polaroids. Left/right gradients fade the strip
 * into the page, and the hand casts a soft shadow so it reads as foreground.
 *
 * The screens carry their own rounded corners (transparent PNGs); the marquee
 * pauses under prefers-reduced-motion via the shared `.marquee-track` rule.
 */

const SCREENS = Array.from({ length: 15 }, (_, i) => `/images/case-studies/zaps/hero/screens/${i + 1}.png`);

function Strip({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    // All screens share one horizontal centre line — no stagger.
    <div className="flex h-full shrink-0 items-center gap-8 px-4" aria-hidden={ariaHidden || undefined}>
      {SCREENS.map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={ariaHidden ? "" : "A screen from the Zaps editor"}
          loading="lazy"
          decoding="async"
          className="h-[80%] w-auto shrink-0 rounded-[26px] drop-shadow-[0_18px_40px_rgba(25,25,23,0.12)]"
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
      className="relative left-1/2 mt-8 w-[min(1320px,98vw)] -translate-x-1/2"
    >
      <div className="relative h-[clamp(460px,66vh,640px)] overflow-hidden">
        {/* Behind: the editor screens drifting past */}
        <div className="absolute inset-0 flex items-center">
          <div className="marquee-track flex h-full w-max items-center">
            <Strip />
            <Strip ariaHidden />
          </div>
        </div>

        {/* 10% white veil pushes the background screens back so the phone leads */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] bg-white/10" />

        {/* Edge gradients fade the strip into the page ground */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[22%] bg-[linear-gradient(to_right,var(--background),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[22%] bg-[linear-gradient(to_left,var(--background),transparent)]"
        />

        {/* Front: the hand, still, with a soft shadow so it lifts off the strip */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/zaps/hero/hand.png"
            alt="A hand holding a phone running the Zaps app"
            className="h-[88%] w-auto max-w-none translate-y-[1%] drop-shadow-[0_28px_50px_rgba(25,25,23,0.20)]"
          />
        </div>
      </div>
    </motion.div>
  );
}
