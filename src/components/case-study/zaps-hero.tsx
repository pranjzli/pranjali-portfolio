"use client";

import { useState } from "react";
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

/**
 * TEMP — hero tuning panel. Lets the hand image's scale/position be dialed in
 * live instead of guessing pixel values blind. Dev-only: Next.js dead-code
 * eliminates this branch from the production bundle, so it never ships.
 * Remove once the final numbers are picked and baked into HAND_TRANSFORM below.
 */
function HeroTuner({
  scale,
  x,
  y,
  onChange,
}: {
  scale: number;
  x: number;
  y: number;
  onChange: (next: { scale: number; x: number; y: number }) => void;
}) {
  const row = "flex items-center gap-3 text-xs";
  const label = "w-14 shrink-0 text-white/70";
  const value = "w-14 shrink-0 text-right tabular-nums text-white";

  return (
    <div className="fixed bottom-4 right-4 z-50 w-64 rounded-xl border border-white/15 bg-black/80 p-4 font-mono text-white shadow-2xl backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
          Temp · Hero Tuner
        </span>
        <button
          type="button"
          onClick={() => onChange({ scale: 1, x: 0, y: 0 })}
          className="text-[11px] text-white/60 underline hover:text-white"
        >
          Reset
        </button>
      </div>

      <div className={row}>
        <span className={label}>Scale</span>
        <input
          type="range"
          min={0.4}
          max={2}
          step={0.01}
          value={scale}
          onChange={(e) => onChange({ scale: Number(e.target.value), x, y })}
          className="flex-1"
        />
        <span className={value}>{scale.toFixed(2)}</span>
      </div>
      <div className={`${row} mt-2`}>
        <span className={label}>X</span>
        <input
          type="range"
          min={-300}
          max={300}
          step={1}
          value={x}
          onChange={(e) => onChange({ scale, x: Number(e.target.value), y })}
          className="flex-1"
        />
        <span className={value}>{x}px</span>
      </div>
      <div className={`${row} mt-2`}>
        <span className={label}>Y</span>
        <input
          type="range"
          min={-300}
          max={300}
          step={1}
          value={y}
          onChange={(e) => onChange({ scale, x, y: Number(e.target.value) })}
          className="flex-1"
        />
        <span className={value}>{y}px</span>
      </div>

      <p className="mt-3 border-t border-white/10 pt-2 text-[10px] leading-snug text-white/50">
        Read these off and tell Claude the final values — this panel doesn&apos;t
        ship to prod.
      </p>
    </div>
  );
}

// Baked-in defaults once tuning is done — replace with the values read off
// the panel above, then delete HeroTuner and this state entirely.
const HAND_TRANSFORM = { scale: 1, x: 0, y: 0 };

export function ZapsHero() {
  const [transform, setTransform] = useState(HAND_TRANSFORM);
  const isDev = process.env.NODE_ENV !== "production";

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
        <div className="absolute inset-0 flex items-end overflow-visible">
          <div className="marquee-track flex h-full w-max items-end">
            <Strip />
            <Strip ariaHidden />
          </div>
        </div>

        {/* Front: the hand, still, sharing the same baseline as the screens */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/zaps/hero/hand.png"
            alt="A hand holding a phone running the Zaps app"
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            }}
            className="h-[96%] w-auto max-w-none drop-shadow-[0_28px_50px_rgba(25,25,23,0.20)]"
          />
        </div>
      </div>

      {isDev && (
        <HeroTuner
          scale={transform.scale}
          x={transform.x}
          y={transform.y}
          onChange={setTransform}
        />
      )}
    </motion.div>
  );
}
