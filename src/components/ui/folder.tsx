"use client";

import { motion } from "motion/react";
import { viewportOnce, ease } from "@/lib/motion";

/**
 * The Behance "folder" visual (motion-brand.tsx), generalized for reuse.
 * Opens on hover: the paper peek grows taller and lifts, the front panel
 * tilts forward like a flap, and a tooltip fades in below.
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
      className="relative h-[154px] w-44 shrink-0 [perspective:700px]"
    >
      {/* Back panel + tab */}
      <div className="absolute bottom-0 h-[134px] w-full rounded-xl bg-[linear-gradient(160deg,#a9dc8f,#8cc76d)]" />
      <div className="absolute left-0 top-0 h-[34px] w-24 rounded-t-lg bg-[linear-gradient(160deg,#a9dc8f,#8cc76d)]" />

      {/* The filed paper — a peek of the file. On hover it grows taller from
          its bottom edge (more of it shows) and lifts a touch. */}
      {peekSrc ? (
        <motion.img
          src={peekSrc}
          alt=""
          variants={{ open: { y: -6, scaleY: 1.14, scaleX: 1.03 } }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          style={{ transformOrigin: "bottom center" }}
          className="absolute left-4 top-6 h-[77px] w-36 rounded-md object-cover object-top shadow-[0_4px_10px_-4px_rgba(0,0,0,0.3)]"
        />
      ) : (
        <motion.div
          aria-hidden
          variants={{ open: { y: -6, scaleY: 1.14, scaleX: 1.03 } }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          style={{ transformOrigin: "bottom center" }}
          className="absolute left-4 top-6 h-[77px] w-36 rounded-md bg-white shadow-[0_4px_10px_-4px_rgba(0,0,0,0.3)]"
        />
      )}

      {/* Front panel — scales down and tilts forward from its bottom edge so
          the top widens (open-flap feel); bottom stays put, never dropping
          below its resting position. */}
      <motion.div
        aria-hidden
        variants={{ open: { rotateX: -34, scaleX: 1.06, scaleY: 0.92 } }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        style={{ transformOrigin: "bottom center" }}
        className="absolute bottom-0 h-24 w-full rounded-xl bg-[linear-gradient(160deg,#c6ecab,#9ed17f)] shadow-[0_-2px_8px_-4px_rgba(0,0,0,0.15)]"
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
