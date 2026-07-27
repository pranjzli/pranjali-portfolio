"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import { viewportOnce, ease } from "@/lib/motion";

type Side = { src: string; alt: string; label: string; ratio: number };

/**
 * Two states of the same flow, stacked and revealed by a divider.
 *
 * The divider is a motion value rather than React state, so scrubbing it
 * doesn't re-render the images every frame. On first scroll into view it
 * sweeps left → right → centre once, to show that it can be moved; any
 * interaction cancels that and hands control over.
 *
 * Both images share a width; the box takes the taller one's ratio and the
 * shorter sits top-aligned inside it.
 */
export function FidelitySlider({
  before,
  after,
  className = "",
}: {
  before: Side; // revealed to the left of the divider
  after: Side; // sits underneath
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(frame, { once: true, amount: 0.45 });

  // Starts closed so the intro sweep has somewhere to travel from.
  const pos = useMotionValue(0);
  const remainder = useTransform(pos, (v) => 100 - v);
  const clipPath = useMotionTemplate`inset(0 ${remainder}% 0 0)`;
  const left = useMotionTemplate`${pos}%`;

  const intro = useRef<AnimationPlaybackControls | null>(null);
  const introDone = useRef(false);
  const [dragging, setDragging] = useState(false);
  // Mirrored only for assistive tech, at a coarse step so it stays cheap.
  const [ariaPos, setAriaPos] = useState(0);

  useEffect(() => {
    const stop = pos.on("change", (v) =>
      setAriaPos((prev) => (Math.abs(v - prev) >= 2 ? Math.round(v) : prev)),
    );
    return stop;
  }, [pos]);

  /** Hand control to the reader; the demo sweep gets out of the way. */
  const takeOver = useCallback(() => {
    intro.current?.stop();
    intro.current = null;
    introDone.current = true;
  }, []);

  useEffect(() => {
    if (!inView || introDone.current) return;
    introDone.current = true;

    if (reduce) {
      pos.set(50);
      return;
    }

    intro.current = animate(pos, [0, 100, 50], {
      duration: 2.6,
      times: [0, 0.55, 1],
      ease: "easeInOut",
      delay: 0.3,
    });
  }, [inView, reduce, pos]);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const rect = frame.current?.getBoundingClientRect();
      if (!rect) return;
      pos.set(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
    },
    [pos],
  );

  // Drag continues outside the frame, so these live on the window.
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

  /** A mouse over the frame scrubs directly — no need to grab the handle. */
  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || dragging) return;
    takeOver();
    setFromClientX(e.clientX);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 10 : 4;
    const current = pos.get();
    if (e.key === "ArrowLeft") pos.set(Math.max(0, current - step));
    else if (e.key === "ArrowRight") pos.set(Math.min(100, current + step));
    else if (e.key === "Home") pos.set(0);
    else if (e.key === "End") pos.set(100);
    else return;
    takeOver();
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
        onPointerMove={onPointerMove}
        onPointerDown={(e) => {
          takeOver();
          setDragging(true);
          setFromClientX(e.clientX);
        }}
        style={{ aspectRatio: String(boxRatio) }}
        className="relative w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl"
      >
        {/* After — the shipped screens, sitting underneath */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={after.src}
          alt={after.alt}
          draggable={false}
          className="absolute inset-x-0 top-0 w-full"
        />

        {/* Before — clipped to the divider. The sketch is already ink on white,
            so it only needs multiplying to sit on the page ground. */}
        <motion.div className="absolute inset-0 bg-background" style={{ clipPath }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={before.src}
            alt={before.alt}
            draggable={false}
            className="absolute inset-x-0 top-0 w-full mix-blend-multiply"
          />
        </motion.div>

        {/* Divider */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 w-px bg-foreground/20"
          style={{ left }}
        />

        {/* Handle */}
        <motion.button
          type="button"
          role="slider"
          aria-label="Reveal the lo-fi or the shipped screens"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={ariaPos}
          aria-valuetext={`${ariaPos}% ${before.label}`}
          onKeyDown={onKeyDown}
          onPointerDown={(e) => {
            e.stopPropagation();
            takeOver();
            setDragging(true);
          }}
          style={{ left }}
          className="absolute top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-line bg-background text-muted shadow-[0_4px_14px_rgba(25,25,23,0.12)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cs-accent)] active:scale-95"
        >
          <span aria-hidden className="text-sm tracking-[-0.1em]">
            ←→
          </span>
        </motion.button>

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
