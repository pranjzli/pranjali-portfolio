"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

/**
 * TEMP — shared x/y/scale tuner, generalized from the one-off panel in
 * zaps-hero.tsx so it doesn't get re-invented per page. Dev-only: Next.js
 * dead-code eliminates the whole branch from the production bundle since
 * every call site gates it behind `process.env.NODE_ENV !== "production"`.
 *
 * Usage: keep a `useState<Tune>` per tunable image, apply
 * `style={{ transform: tuneTransform(value) }}` to it, then render one
 * `<TempTuner>` per page listing every image as a group. Read values off
 * the panel, tell Claude, then delete the tuner call site (and this file,
 * once nothing on the page uses it anymore).
 */

export type Tune = { x: number; y: number; scale: number };
export const TUNE_DEFAULT: Tune = { x: 0, y: 0, scale: 1 };
export const tuneTransform = (t: Tune) => `translate(${t.x}px, ${t.y}px) scale(${t.scale})`;

export function TempTuner({
  label,
  groups,
}: {
  label: string;
  groups: { key: string; title: string; value: Tune; onChange: (v: Tune) => void }[];
}) {
  const [copied, setCopied] = useState(false);
  // Portals need a real DOM `document`, unavailable during SSR — render
  // nothing until after the client mounts (isomorphic mounted flag, no
  // setState-in-effect needed).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
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
          onClick={copyAll}
          className="text-[11px] text-white/60 underline hover:text-white"
        >
          {copied ? "Copied!" : "Copy all"}
        </button>
      </div>

      {groups.map((g) => (
        <div key={g.key} className="mt-3 border-t border-white/10 pt-3 first:mt-0 first:border-0 first:pt-0">
          <div className="mb-1.5 text-[11px] font-semibold text-white/80">{g.title}</div>
          {(["scale", "x", "y"] as const).map((axis) => {
            const range = axis === "scale" ? { min: 0.2, max: 3, step: 0.01 } : { min: -300, max: 300, step: 1 };
            return (
              <div key={axis} className="mt-1.5 flex items-center gap-2 text-xs">
                <span className="w-8 shrink-0 text-white/50">{axis}</span>
                <input
                  type="range"
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={g.value[axis]}
                  onChange={(e) => g.onChange({ ...g.value, [axis]: Number(e.target.value) })}
                  className="w-full"
                />
                <span className="w-10 shrink-0 text-right text-white/70">{g.value[axis]}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>,
    document.body,
  );
}
