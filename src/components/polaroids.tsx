"use client";

import { motion } from "motion/react";
import { polaroids } from "@/lib/content";
import { viewportOnce, ease } from "@/lib/motion";

const rotations = [-6, 4, -3, 5, -4];

export function Polaroids() {
  return (
    <section className="overflow-hidden py-10">
      <div className="mx-auto flex max-w-[860px] flex-wrap items-center justify-center gap-x-2 gap-y-6 px-6">
        {polaroids.map((p, i) => (
          <motion.figure
            key={p.caption}
            initial={{ opacity: 0, y: 24, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease, delay: i * 0.06 }}
            whileHover={{ rotate: 0, y: -6, scale: 1.03, zIndex: 10 }}
            className="w-[150px] shrink-0 rounded-[4px] bg-white p-2.5 pb-6 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]"
          >
            {/* Green placeholder — swap for <img src={p.src} /> */}
            <div className="aspect-[4/5] w-full rounded-[2px] bg-[linear-gradient(150deg,#cfe8c2,#bfe3d0)]" />
            <figcaption className="serif mt-2 text-center text-sm text-foreground/70">
              {p.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
