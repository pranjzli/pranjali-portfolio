"use client";

import { motion } from "motion/react";
import { polaroids } from "@/lib/content";
import { viewportOnce, ease } from "@/lib/motion";

/** Hand-stacked feel: alternating tilt, overlap and depth per position. */
const tilt = [-9, 7.5, -6, 8.5, -7.5, 6.5, -14, 7];
const nudge = [0, 10, -6, 8, -4, 12, -8, 6];

function Strip({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {polaroids.map((p, i) => (
        <figure
          key={p.src}
          style={{
            rotate: `${tilt[i % tilt.length]}deg`,
            marginTop: nudge[i % nudge.length],
            zIndex: i % 2 === 0 ? 2 : 1,
          }}
          className="relative -mx-5 shrink-0 transition-transform duration-300 hover:z-10 hover:!rotate-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src}
            alt={ariaHidden ? "" : p.alt}
            className="h-[267px] w-auto max-w-none drop-shadow-[0_14px_28px_rgba(0,0,0,0.18)]"
          />
        </figure>
      ))}
    </div>
  );
}

export function Polaroids() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease }}
      className="overflow-x-clip py-6"
    >
      {/* A mask clips to the border box, so pad it out past the drop shadows */}
      <div className="py-14 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex w-max items-center">
          <Strip />
          <Strip ariaHidden />
        </div>
      </div>
    </motion.section>
  );
}
