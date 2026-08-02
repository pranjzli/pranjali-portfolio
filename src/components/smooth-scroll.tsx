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
    if (!lenis) return;

    const hash = window.location.hash;
    if (!hash) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }

    // The URL targets an anchor (the "/#work" back link, or a nav item clicked
    // from a case study). Lenis owns the scroll position, so nothing takes us
    // there unless we do it — one frame later, once the new page has painted
    // and the section actually exists.
    const raf = requestAnimationFrame(() => {
      const target = document.querySelector(hash);
      if (target) lenis.scrollTo(target as HTMLElement, { offset: -90, immediate: true });
    });
    return () => cancelAnimationFrame(raf);
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
