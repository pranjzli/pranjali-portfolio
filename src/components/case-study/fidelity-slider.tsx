"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { viewportOnce, ease } from "@/lib/motion";

type Side = { src: string; alt: string; label: string; ratio: number };

/**
 * Two states of the same flow, stacked and revealed by a draggable divider.
 * The lo-fi is drawn on paper, so it is pushed to pure white and multiplied
 * onto the page — the pencil reads as if it were drawn on the site itself.
 *
 * Both images share a width; the box takes the taller one's ratio and the
 * shorter sits top-aligned inside it.
 */
export function FidelitySlider({
  before,
  after,
  className = "",
}: {
  before: Side; // shown on the left of the divider
  after: Side; // revealed on the right
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frame = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setFromClientX(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging, setFromClientX]);

  function onKeyDown(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  }

  // Taller of the two drives the box; the other top-aligns inside it.
  const boxRatio = Math.min(before.ratio, after.ratio);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease }}
      className={className}
    >
      <div
        ref={frame}
        onPointerDown={(e) => {
          setDragging(true);
          setFromClientX(e.clientX);
        }}
        style={{ aspectRatio: String(boxRatio) }}
        className="relative w-full touch-none select-none overflow-hidden rounded-2xl"
      >
        {/* After — the full-fidelity state, sitting underneath */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={after.src}
          alt={after.alt}
          draggable={false}
          className="absolute inset-x-0 top-0 w-full"
        />

        {/* Before — clipped to the divider. Paper blown out to white, then
            multiplied so only the pencil survives onto the page ground. */}
        <div
          className="absolute inset-0 bg-background"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={before.src}
            alt={before.alt}
            draggable={false}
            // Paper sits at ~60% luminance and pencil at ~35%, so it takes a
            // hard brightness+contrast push to clip the paper to pure white
            // while the strokes survive. Measured, not guessed.
            className="absolute inset-x-0 top-0 w-full mix-blend-multiply [filter:grayscale(1)_brightness(1.32)_contrast(4.6)]"
          />
        </div>

        {/* Divider */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-foreground/20"
          style={{ left: `${pos}%` }}
        />

        {/* Handle */}
        <button
          type="button"
          role="slider"
          aria-label="Reveal the lo-fi or the final screens"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% ${before.label}`}
          onKeyDown={onKeyDown}
          onPointerDown={(e) => {
            e.stopPropagation();
            setDragging(true);
          }}
          style={{ left: `${pos}%` }}
          className="absolute top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-line bg-background text-muted shadow-[0_4px_14px_rgba(25,25,23,0.12)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cs-accent)] active:scale-95"
        >
          <span aria-hidden className="text-sm tracking-[-0.1em]">
            ←→
          </span>
        </button>

        {/* Side labels */}
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted backdrop-blur-sm">
          {before.label}
        </span>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted backdrop-blur-sm">
          {after.label}
        </span>
      </div>
    </motion.div>
  );
}
