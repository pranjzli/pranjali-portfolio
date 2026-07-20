import type { Variants, Transition } from "motion/react";

/** Shared easing — soft, natural deceleration. */
export const ease: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Fade + rise + de-blur. The default reveal for section content. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

/** Parent that staggers its children's reveal. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Viewport config for `whileInView` — fire once, a little before fully visible. */
export const viewportOnce = { once: true, amount: 0.3, margin: "0px 0px -10% 0px" };
