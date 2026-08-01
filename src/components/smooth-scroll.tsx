"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/**
 * Lenis owns its own scroll position on the root, so Next's default
 * scroll-to-top on navigation doesn't take effect — a new page would open
 * wherever the previous one was scrolled to. Jump Lenis to the top on every
 * pathname change (immediate, no smooth animation, so it lands there instantly).
 */
function ScrollToTop() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    // Skip when the URL targets an anchor (e.g. the "/#work" back link) — that
    // navigation should land on its section, not get yanked to the top.
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

/**
 * App-wide Lenis smooth scroll. Wraps the whole tree as the scroll root.
 * Disabled automatically when the user prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: !reduce,
        // Gentle easing curve (expo-out)
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      <ScrollToTop />
      {children}
    </ReactLenis>
  );
}
