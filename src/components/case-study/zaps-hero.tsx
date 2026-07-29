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

type Transform = { scale: number; x: number; y: number };

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
  onChange: (next: Transform) => void;
}) {
  const [copied, setCopied] = useState(false);
  const row = "flex items-center gap-2 text-xs";
  const label = "w-11 shrink-0 text-white/70";
  const numberInput =
    "w-16 shrink-0 rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-right text-white outline-none focus:border-amber-400";

  function copyValues() {
    const payload = `{ scale: ${scale.toFixed(2)}, x: ${x}, y: ${y} }`;
    navigator.clipboard.writeText(payload).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 rounded-xl border border-white/15 bg-black/80 p-4 font-mono text-white shadow-2xl backdrop-blur">
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
          min={0.1}
          max={5}
          step={0.01}
          value={scale}
          onChange={(e) => onChange({ scale: Number(e.target.value), x, y })}
          className="flex-1"
        />
        <input
          type="number"
          step={0.01}
          value={Number(scale.toFixed(2))}
          onChange={(e) => onChange({ scale: Number(e.target.value) || 0, x, y })}
          className={numberInput}
        />
      </div>
      <div className={`${row} mt-2`}>
        <span className={label}>X</span>
        <input
          type="range"
          min={-600}
          max={600}
          step={1}
          value={x}
          onChange={(e) => onChange({ scale, x: Number(e.target.value), y })}
          className="flex-1"
        />
        <input
          type="number"
          value={x}
          onChange={(e) => onChange({ scale, x: Number(e.target.value) || 0, y })}
          className={numberInput}
        />
      </div>
      <div className={`${row} mt-2`}>
        <span className={label}>Y</span>
        <input
          type="range"
          min={-600}
          max={600}
          step={1}
          value={y}
          onChange={(e) => onChange({ scale, x, y: Number(e.target.value) })}
          className="flex-1"
        />
        <input
          type="number"
          value={y}
          onChange={(e) => onChange({ scale, x, y: Number(e.target.value) || 0 })}
          className={numberInput}
        />
      </div>

      <button
        type="button"
        onClick={copyValues}
        className="mt-3 w-full rounded-lg bg-amber-400 py-1.5 text-[11px] font-bold text-black transition-colors hover:bg-amber-300"
      >
        {copied ? "Copied ✓" : "Copy values"}
      </button>

      <p className="mt-2 border-t border-white/10 pt-2 text-[10px] leading-snug text-white/50">
        Copy, then tell Claude the values — this panel doesn&apos;t ship to prod.
      </p>
    </div>
  );
}

// Baked-in defaults once tuning is done — replace with the values read off
// the panel above, then delete HeroTuner and this state entirely.
const HAND_TRANSFORM: Transform = { scale: 1, x: 0, y: 0 };

export function ZapsHero() {
  const [transform, setTransform] = useState<Transform>(HAND_TRANSFORM);
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.25 }}
      // mt-28: clearance so the enlarged screens (they overflow the stage's
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

        {/* Edge fades — 30% of the viewport each side, over the screens only */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[6] w-[30vw] bg-[linear-gradient(to_right,var(--background),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-[6] w-[30vw] bg-[linear-gradient(to_left,var(--background),transparent)]"
        />

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
