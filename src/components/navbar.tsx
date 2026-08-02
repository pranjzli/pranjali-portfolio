"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { nav } from "@/lib/content";
import { ease } from "@/lib/motion";

export function Navbar() {
  const lenis = useLenis();
  const pathname = usePathname();
  const onHome = pathname === "/";

  // Nav targets are root-relative ("/#work"). On the home page we intercept and
  // let Lenis scroll there; anywhere else the link is a real navigation home,
  // and SmoothScroll's ScrollToTop lands it on the section once it arrives.
  function scrollToHash(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!onHome || !href.startsWith("/#")) return;
    const target = document.querySelector(href.slice(1));
    if (!target || !lenis) return;
    e.preventDefault();
    lenis.scrollTo(target as HTMLElement, { offset: -90 });
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.1 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="flex items-center gap-1 rounded-full border border-line/80 bg-background/70 p-1.5 pl-2 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl">
        <Link
          href="/"
          aria-label="Home"
          className="grid size-8 place-items-center rounded-full bg-foreground text-sm font-semibold text-background"
        >
          {nav.logo}
        </Link>

        <ul className="flex items-center gap-0.5 px-1">
          {nav.links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={(e) => scrollToHash(e, l.href)}
                className="rounded-full px-3 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={nav.cta.href}
          onClick={(e) => scrollToHash(e, nav.cta.href)}
          className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          {nav.cta.label}
        </Link>
      </nav>
    </motion.header>
  );
}
