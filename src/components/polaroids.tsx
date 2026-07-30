"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { polaroids, type Polaroid } from "@/lib/content";
import { viewportOnce, ease } from "@/lib/motion";
import { VideoModal } from "@/components/ui/video-modal";

/** Hand-stacked feel: alternating tilt, overlap and depth per position. */
const tilt = [-9, 7.5, -6, 8.5, -7.5, 6.5, -14, 7];
const nudge = [0, 10, -6, 8, -4, 12, -8, 6];

function Strip({
  ariaHidden = false,
  onOpen,
}: {
  ariaHidden?: boolean;
  onOpen: (p: Polaroid) => void;
}) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {polaroids.map((p, i) => {
        const clickable = !!p.video;
        return (
          <figure
            key={p.src}
            style={{
              rotate: `${tilt[i % tilt.length]}deg`,
              marginTop: nudge[i % nudge.length],
              zIndex: i % 2 === 0 ? 2 : 1,
            }}
            onClick={clickable ? () => onOpen(p) : undefined}
            onKeyDown={
              clickable
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onOpen(p);
                    }
                  }
                : undefined
            }
            role={clickable ? "button" : undefined}
            tabIndex={clickable && !ariaHidden ? 0 : undefined}
            aria-label={clickable ? `Play video: ${p.alt}` : undefined}
            className={`group relative -mx-[30px] shrink-0 transition-transform duration-300 hover:z-10 hover:!rotate-0 ${
              clickable ? "cursor-pointer" : ""
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={ariaHidden ? "" : p.alt}
              className="h-[400px] w-auto max-w-none drop-shadow-[0_14px_28px_rgba(0,0,0,0.18)]"
            />
            {clickable && (
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[42%] grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/55 pl-1 text-xl text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
              >
                ▶
              </span>
            )}
          </figure>
        );
      })}
    </div>
  );
}

export function Polaroids() {
  const [active, setActive] = useState<Polaroid | null>(null);

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
          <Strip onOpen={setActive} />
          <Strip ariaHidden onOpen={setActive} />
        </div>
      </div>

      <VideoModal
        open={!!active?.video}
        src={active?.video ?? ""}
        poster={active?.poster}
        onClose={() => setActive(null)}
      />
    </motion.section>
  );
}
