"use client";

import { motion } from "motion/react";
import { viewportOnce, ease } from "@/lib/motion";

/**
 * Folder visual: a smaller back panel peeking top-left, a paper sandwiched
 * in the middle (visible only above the front panel's top edge), and a
 * wide front panel/flap covering the bottom. Opens on hover: the paper
 * grows taller and lifts, the front panel tilts forward like a flap, and a
 * tooltip fades in below.
 *
 * `peekSrc` omitted renders a blank white page instead of a photo — for a
 * folder whose file isn't ready yet.
 */
export function Folder({
  href,
  ariaLabel,
  tooltip,
  peekSrc,
}: {
  href: string;
  ariaLabel: string;
  tooltip: string;
  peekSrc?: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease }}
      whileHover="open"
      variants={{ open: { y: -8 } }}
      className="relative block h-[154px] w-44 shrink-0 [perspective:700px]"
    >
      {/* Back panel — a smaller square peeking from the top-left, behind everything */}
      <div className="absolute left-3 top-2 h-[110px] w-[118px] rounded-2xl bg-[linear-gradient(160deg,#bfe2ae,#a4d18c)]" />

      {/* The filed paper — a peek of the file, wider than the back panel, tucked
          under the front panel so only its top half shows. On hover it grows
          taller from its bottom edge (more of it shows) and lifts a touch. */}
      {peekSrc ? (
        <motion.img
          src={peekSrc}
          alt=""
          variants={{ open: { y: -6, scaleY: 1.14, scaleX: 1.03 } }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          style={{ transformOrigin: "bottom center" }}
          className="absolute left-7 top-9 h-[50px] w-36 rounded-md object-cover object-top shadow-[0_4px_10px_-4px_rgba(0,0,0,0.3)]"
        />
      ) : (
        <motion.div
          aria-hidden
          variants={{ open: { y: -6, scaleY: 1.14, scaleX: 1.03 } }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          style={{ transformOrigin: "bottom center" }}
          className="absolute left-7 top-9 h-[50px] w-36 rounded-md bg-white shadow-[0_4px_10px_-4px_rgba(0,0,0,0.3)]"
        />
      )}

      {/* Front panel — the widest, tallest element, anchored to the bottom.
          Scales down and tilts forward from its bottom edge so the top
          widens (open-flap feel); bottom stays put, never dropping below
          its resting position. */}
      <motion.div
        aria-hidden
        variants={{ open: { rotateX: -34, scaleX: 1.05, scaleY: 0.94 } }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        style={{ transformOrigin: "bottom center" }}
        className="absolute inset-x-0 bottom-0 h-[98px] rounded-2xl bg-[linear-gradient(160deg,#c6ecab,#8fc26b)] shadow-[0_-2px_8px_-4px_rgba(0,0,0,0.15)]"
      />

      {/* Hover tooltip — fades in below the folder. Outer div holds the
          static centering so Motion's transform (opacity/y) doesn't clobber
          the -translate-x-1/2. */}
      <div className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2">
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          variants={{ open: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.2, ease }}
          className="block whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-sm"
        >
          {tooltip}
        </motion.span>
      </div>
    </motion.a>
  );
}
