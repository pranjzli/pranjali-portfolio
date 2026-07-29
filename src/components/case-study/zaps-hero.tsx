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

function Strip({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    // All screens share one horizontal baseline — no stagger.
    <div className="flex h-full shrink-0 items-end gap-8 px-4" aria-hidden={ariaHidden || undefined}>
      {SCREENS.map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={ariaHidden ? "" : "A screen from the Zaps editor"}
          loading="lazy"
          decoding="async"
          className="h-[92%] w-auto shrink-0 rounded-[26px] opacity-50 drop-shadow-[0_18px_40px_rgba(25,25,23,0.12)]"
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
      {/* Reference frame is ~7378x1361 — same ratio here, so the row is never clipped */}
      <div className="relative w-full" style={{ aspectRatio: "7378 / 1361" }}>
        {/* Behind: the editor screens drifting past */}
        <div className="absolute inset-0 flex items-end">
          <div className="marquee-track flex h-full w-max items-end">
            <Strip />
            <Strip ariaHidden />
          </div>
        </div>

        {/* Front: the hand, still, sharing the same baseline as the screens.
            `inset-0` (not just inset-x + bottom) so the img's h-[96%] has a
            real height to resolve against — without it the percentage falls
            back to the image's intrinsic size and overflows everything. */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/zaps/hero/hand.png"
            alt="A hand holding a phone running the Zaps app"
            className="h-[96%] w-auto max-w-none drop-shadow-[0_28px_50px_rgba(25,25,23,0.20)]"
          />
        </div>
      </div>
    </motion.div>
  );
}
