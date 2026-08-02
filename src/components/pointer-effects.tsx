"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import MouseEffects, { type InteractionMode } from "@/components/originkit/ui/clickeffects";

/** Every effect the component ships, in the order clicks step through them. */
const MODES: InteractionMode[] = [
  "rings",
  "burst",
  "particles",
  "crosshair",
  "wavy",
  "sniper",
];

function subscribe(query: string) {
  return (onChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  };
}

/** Matches `query`, and reports false on the server so hydration stays clean. */
function useMedia(query: string) {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Advances one step per click, so no two consecutive clicks draw the same
 * effect. This listener and the one inside MouseEffects both fire on the same
 * event, and the component's handler closes over the mode it was mounted with
 * — so the click that bumps the index still draws the current effect, and the
 * next one draws the next. That's the cycle.
 */
function useCyclingMode(enabled: boolean) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const next = () => setI((n) => (n + 1) % MODES.length);
    // Capture on window, matching where MouseEffects listens — see the note
    // there. A bubble-phase listener never fires if the click is stopped.
    window.addEventListener("click", next, true);
    return () => window.removeEventListener("click", next, true);
  }, [enabled]);

  return MODES[i];
}

/**
 * Site-wide click decoration — a burst wherever you click, cycling through the
 * six effect styles. Purely ornamental, so the overlay is `aria-hidden` and
 * never takes pointer events.
 */
export function PointerEffects() {
  const fine = useMedia("(pointer: fine)");
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduce;
  const mode = useCyclingMode(enabled);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <MouseEffects color="#63C96D" interactionMode={mode} showLabel={false} />
    </div>
  );
}
