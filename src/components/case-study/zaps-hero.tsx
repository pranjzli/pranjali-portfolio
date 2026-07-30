"use client";

import { useState } from "react";
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
// The landing-page card's own stage: 2.34x taller than the hero's (1.3x,
// then another 1.8x on top), so the composition renders that much larger
// throughout (everything here scales off stage height) with more headroom
// before the card's frame crops it.
const CARD_STAGE_RATIO = "7378 / 3184.74";

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

function Strip({
  ariaHidden = false,
  extra,
}: {
  ariaHidden?: boolean;
  /** TEMP debug nudge, composed on top of the strip's own layout. */
  extra?: string;
}) {
  return (
    // All screens share one horizontal baseline — no stagger. Eager-loaded:
    // this is always-visible looping content, not real below-the-fold
    // content, and the CSS loop only stays seamless once both copies of the
    // strip have their real width — a lazy-loaded image is 0px wide until it
    // decodes, which was throwing the loop out of alignment.
    <div
      style={extra ? { transform: extra } : undefined}
      className="flex h-full shrink-0 items-end gap-[19px] px-4"
      aria-hidden={ariaHidden || undefined}
    >
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

type Tune = { scale: number; x: number; y: number };
const TUNE_DEFAULT: Tune = { scale: 1, x: 0, y: 0 };
const tuneTransform = (t: Tune) => `translate(${t.x}px, ${t.y}px) scale(${t.scale})`;

/**
 * TEMP — full tuning panel: scale/X/Y for each of the four pieces (screens,
 * hand, gradient, container). Dev-only: Next.js dead-code eliminates this
 * whole branch from the production bundle. Read values off, tell Claude,
 * then delete this component and the tune state in ZapsHeroStage.
 */
function VisualTuner({
  label,
  groups,
}: {
  label: string;
  groups: { key: string; title: string; value: Tune; onChange: (v: Tune) => void }[];
}) {
  const [copied, setCopied] = useState(false);

  function copyAll() {
    const obj: Record<string, Tune> = {};
    groups.forEach((g) => (obj[g.key] = g.value));
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-h-[92vh] w-80 overflow-y-auto rounded-xl border border-white/15 bg-black/85 p-4 font-mono text-white shadow-2xl backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
          Temp · {label}
        </span>
        <button
          type="button"
          onClick={() => groups.forEach((g) => g.onChange(TUNE_DEFAULT))}
          className="text-[11px] text-white/60 underline hover:text-white"
        >
          Reset all
        </button>
      </div>

      {groups.map((g) => (
        <div key={g.key} className="mt-3 border-t border-white/10 pt-3 first:mt-0 first:border-0 first:pt-0">
          <div className="mb-1.5 text-[11px] font-semibold text-white/80">{g.title}</div>
          {(["scale", "x", "y"] as const).map((axis) => {
            const range = axis === "scale" ? { min: 0.2, max: 3, step: 0.01 } : { min: -300, max: 300, step: 1 };
            return (
              <div key={axis} className="mt-1.5 flex items-center gap-2 text-xs">
                <span className="w-9 shrink-0 uppercase text-white/60">{axis}</span>
                <input
                  type="range"
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={g.value[axis]}
                  onChange={(e) => g.onChange({ ...g.value, [axis]: Number(e.target.value) })}
                  className="flex-1"
                />
                <span className="w-12 shrink-0 text-right tabular-nums">
                  {axis === "scale" ? g.value[axis].toFixed(2) : `${g.value[axis]}px`}
                </span>
              </div>
            );
          })}
        </div>
      ))}

      <button
        type="button"
        onClick={copyAll}
        className="mt-4 w-full rounded-lg border border-white/15 bg-white/10 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-white/20"
      >
        {copied ? "Copied!" : "Copy all values"}
      </button>
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
 *
 * `screenTopGapPct`, when set, pins the screens' top edge to that many % of
 * stage height below the stage's own top — i.e. "leave this much clear space
 * above the marquee" — instead of the default (whatever HAND_OVERFLOW_PCT
 * happens to produce, ~10% at the standard SCREENS_HEIGHT_PCT). Solved
 * directly for the target gap rather than as a delta from the default, so
 * there's no sign to get backwards: screenTopGapPct=30 always means "30%
 * gap", never "shift by 30% in whichever direction it turns out to be".
 *
 * `debug` mounts a TEMP on-page tuner (scale/X/Y for screens, hand, gradient,
 * container) — dev-only, dead-code eliminated from production.
 */
export function ZapsHeroStage({
  contained = false,
  ratio = STAGE_RATIO,
  screenTopGapPct,
  debug = false,
  debugLabel = "Visual tuner",
}: {
  contained?: boolean;
  ratio?: string;
  screenTopGapPct?: number;
  debug?: boolean;
  debugLabel?: string;
}) {
  const [screensT, setScreensT] = useState<Tune>(TUNE_DEFAULT);
  const [handT, setHandT] = useState<Tune>(TUNE_DEFAULT);
  const [gradientT, setGradientT] = useState<Tune>(TUNE_DEFAULT);
  const [containerT, setContainerT] = useState<Tune>(TUNE_DEFAULT);
  const isDev = process.env.NODE_ENV !== "production";

  const edgeWidth = contained ? "w-[30%]" : "w-[30vw]";
  const leftPos = contained
    ? "left-0"
    : // 100vw-breakout trick: reaches the true viewport edge regardless of
      // how narrow this stage itself is, as long as the stage is
      // viewport-centered (it is, on the hero section).
      "left-1/2 -ml-[50vw]";
  const rightPos = contained ? "right-0" : "right-1/2 -mr-[50vw]";
  // Screens are SCREENS_HEIGHT_PCT tall, bottom-anchored inside a Piece whose
  // own un-shifted box is the stage — so before any shift, their top sits at
  // (100 - SCREENS_HEIGHT_PCT)% above the stage top. Solving
  // shiftPct + (100 - SCREENS_HEIGHT_PCT) = screenTopGapPct for shiftPct
  // gives the exact translate needed to land the top exactly there.
  const marqueeShiftPct =
    screenTopGapPct === undefined
      ? HAND_OVERFLOW_PCT
      : screenTopGapPct - (100 - SCREENS_HEIGHT_PCT);

  return (
    <>
      <div
        className="relative w-full"
        style={{
          aspectRatio: ratio,
          transform: debug ? tuneTransform(containerT) : undefined,
          transformOrigin: "center",
        }}
      >
        {/* Behind: the editor screens drifting past — shifted down to meet the
            hand's actual (scaled) bottom. */}
        <Piece shiftPct={marqueeShiftPct} className="overflow-visible">
          <div className="marquee-track flex h-full w-max items-end">
            <Strip extra={debug ? tuneTransform(screensT) : undefined} />
            <Strip ariaHidden extra={debug ? tuneTransform(screensT) : undefined} />
          </div>
        </Piece>

        {/* Edge fades — identical shift to the marquee above, so they land in
            exactly the same place the screens do; only their own height and
            horizontal anchor differ. (The children are absolutely positioned,
            so Piece's own flex alignment doesn't affect them — only its
            translateY matters here.) */}
        <Piece shiftPct={marqueeShiftPct} className="z-[6]">
          <div
            aria-hidden
            style={{
              height: `${SCREENS_HEIGHT_PCT}%`,
              transform: debug ? tuneTransform(gradientT) : undefined,
              transformOrigin: "bottom left",
            }}
            className={`pointer-events-none absolute bottom-0 ${leftPos} ${edgeWidth} bg-[linear-gradient(to_right,var(--background),transparent)]`}
          />
        </Piece>
        <Piece shiftPct={marqueeShiftPct}>
          <div
            aria-hidden
            style={{
              height: `${SCREENS_HEIGHT_PCT}%`,
              transform: debug ? tuneTransform(gradientT) : undefined,
              transformOrigin: "bottom right",
            }}
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
            style={{
              height: `${HAND_UNSCALED_HEIGHT_PCT}%`,
              transform: debug
                ? `translate(${handT.x}px, ${handT.y}px) scale(${HAND_SCALE * handT.scale})`
                : `scale(${HAND_SCALE})`,
            }}
            className="w-auto max-w-none drop-shadow-[0_28px_50px_rgba(25,25,23,0.20)]"
          />
        </Piece>
      </div>

      {isDev && debug && (
        <VisualTuner
          label={debugLabel}
          groups={[
            { key: "screens", title: "Screens", value: screensT, onChange: setScreensT },
            { key: "hand", title: "Hand", value: handT, onChange: setHandT },
            { key: "gradient", title: "Gradient", value: gradientT, onChange: setGradientT },
            { key: "container", title: "Container", value: containerT, onChange: setContainerT },
          ]}
        />
      )}
    </>
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
      <ZapsHeroStage debug debugLabel="Hero page" />
    </motion.div>
  );
}
