"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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

// Case-study hero: fine px nudges dialed in against the reference frame with
// the (now-removed) temp tuner. Screens and gradient share a nudge so they
// stay registered with each other; hand and container are untouched (identity).
const CASE_STUDY_SCREENS_TUNE: Tune = { scale: 1, x: 0, y: -81 };
const CASE_STUDY_GRADIENT_TUNE: Tune = { scale: 1.03, x: 0, y: -79 };

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
  /** Nudge composed on top of the strip's own layout — see Tune. */
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

/** Pulls the numeric height out of a "W / H" aspect-ratio string. */
function ratioHeight(ratio: string): { width: number; height: number } {
  const [w, h] = ratio.split("/").map((n) => parseFloat(n.trim()));
  return { width: w, height: h };
}

/**
 * TEMP — full tuning panel: scale/X/Y for each of the four pieces (screens,
 * hand, gradient, container). Dev-only: Next.js dead-code eliminates this
 * whole branch from the production bundle. Read values off, tell Claude,
 * then delete this component and the tune state in ZapsHeroStage.
 *
 * Pinned top-left instead of a viewport corner near the visual — bottom-right
 * sat on top of the card it was tuning. Rendered through a portal straight
 * into <body>: `position: fixed` is only relative to the *viewport* when no
 * ancestor sets a `transform` — Framer Motion's wrappers (Reveal, the
 * card's motion.a) set one even at rest, which was silently turning "fixed"
 * into "absolute relative to that wrapper", landing the panel wherever the
 * card happened to be instead of pinned to the corner.
 */
function VisualTuner({
  label,
  groups,
}: {
  label: string;
  groups: { key: string; title: string; value: Tune; onChange: (v: Tune) => void; scaleLabel?: string }[];
}) {
  const [copied, setCopied] = useState(false);
  // Portals need a real DOM `document`, unavailable during SSR — render
  // nothing until after the client mounts, which also sidesteps any
  // server/client markup mismatch since a portal target doesn't exist on
  // the server at all.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  function copyAll() {
    const obj: Record<string, Tune> = {};
    groups.forEach((g) => (obj[g.key] = g.value));
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return createPortal(
    <div className="fixed left-4 top-4 z-50 max-h-[92vh] w-80 overflow-y-auto rounded-xl border border-white/15 bg-black/85 p-4 font-mono text-white shadow-2xl backdrop-blur">
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
                <span className="w-9 shrink-0 uppercase text-white/60">
                  {axis === "scale" && g.scaleLabel ? g.scaleLabel : axis}
                </span>
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
    </div>,
    document.body,
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
 * happens to produce, ~10% at the standard SCREENS_HEIGHT_PCT).
 *
 * `screensTune`/`handTune`/`gradientTune`/`containerTune` are fine nudges on
 * top of the base layout — always applied (not gated by `debug`), so a page
 * can bake in permanent values without showing the panel. `containerTune`'s
 * `scale` specifically resizes the *frame* — it adjusts the stage's own
 * aspect-ratio height, not a visual transform:scale() on its content, so
 * "bigger container" actually means more room inside the frame rather than
 * a zoomed (and still-clipped) view of the same-size frame.
 *
 * `debug` additionally mounts a TEMP on-page tuner that live-edits whichever
 * *Tune values aren't explicitly controlled — dev-only, dead-code eliminated
 * from production.
 */
export function ZapsHeroStage({
  contained = false,
  ratio = STAGE_RATIO,
  screenTopGapPct,
  screensTune = TUNE_DEFAULT,
  handTune = TUNE_DEFAULT,
  gradientTune = TUNE_DEFAULT,
  containerTune = TUNE_DEFAULT,
  debug = false,
  debugLabel = "Visual tuner",
}: {
  contained?: boolean;
  ratio?: string;
  screenTopGapPct?: number;
  screensTune?: Tune;
  handTune?: Tune;
  gradientTune?: Tune;
  containerTune?: Tune;
  debug?: boolean;
  debugLabel?: string;
}) {
  const [screensT, setScreensT] = useState<Tune>(screensTune);
  const [handT, setHandT] = useState<Tune>(handTune);
  const [gradientT, setGradientT] = useState<Tune>(gradientTune);
  const [containerT, setContainerT] = useState<Tune>(containerTune);
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

  // Container scale adjusts the frame's own height (via the aspect-ratio),
  // not a transform — see the doc comment above.
  const { width: ratioW, height: ratioH } = ratioHeight(ratio);
  const tunedRatio = `${ratioW} / ${ratioH * containerT.scale}`;
  const containerOffset =
    containerT.x !== 0 || containerT.y !== 0 ? `translate(${containerT.x}px, ${containerT.y}px)` : undefined;

  return (
    <>
      <div
        className="relative w-full"
        style={{ aspectRatio: tunedRatio, transform: containerOffset }}
      >
        {/* Behind: the editor screens drifting past — shifted down to meet the
            hand's actual (scaled) bottom. */}
        <Piece shiftPct={marqueeShiftPct} className="overflow-visible">
          <div className="marquee-track flex h-full w-max items-end">
            <Strip extra={tuneTransform(screensT)} />
            <Strip ariaHidden extra={tuneTransform(screensT)} />
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
              transform: tuneTransform(gradientT),
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
              transform: tuneTransform(gradientT),
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
              transform: `translate(${handT.x}px, ${handT.y}px) scale(${HAND_SCALE * handT.scale})`,
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
            {
              key: "container",
              title: "Container (scale = frame height)",
              value: containerT,
              onChange: setContainerT,
              scaleLabel: "hgt",
            },
          ]}
        />
      )}
    </>
  );
}

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
      <ZapsHeroStage screensTune={CASE_STUDY_SCREENS_TUNE} gradientTune={CASE_STUDY_GRADIENT_TUNE} />
    </motion.div>
  );
}
