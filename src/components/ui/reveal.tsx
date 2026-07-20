"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** When true, children using <Reveal.Item> stagger in. */
  group?: boolean;
};

/**
 * Scroll-triggered reveal wrapper. Fades + rises content into view once.
 * Honors prefers-reduced-motion (renders instantly, no transform).
 */
function RevealBase({ group, children, ...props }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <div {...(props as any)}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={group ? stagger : fadeUp}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child. Use inside <Reveal group>. */
function RevealItem({ children, ...props }: HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  if (reduce) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <div {...(props as any)}>{children}</div>;
  }
  return (
    <motion.div variants={fadeUp} {...props}>
      {children}
    </motion.div>
  );
}

export const Reveal = Object.assign(RevealBase, { Item: RevealItem });
