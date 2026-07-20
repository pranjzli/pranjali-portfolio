"use client";

import { motion } from "motion/react";
import { hero } from "@/lib/content";
import { ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { Avatar } from "@/components/ui/avatar";

const item = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24">
      {/* Soft sage gradient wash */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#cfe8c2,transparent)] opacity-70 blur-2xl" />
        <div className="absolute left-[15%] top-[10%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(closest-side,#bfe3d0,transparent)] opacity-60 blur-2xl" />
        <div className="absolute right-[12%] top-[6%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,#d9e9b8,transparent)] opacity-60 blur-2xl" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.09, delayChildren: 0.15 }}
        className="mx-auto flex max-w-[640px] flex-col items-center px-6 text-center"
      >
        <motion.span
          variants={item}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 rounded-full bg-badge px-3 py-1 text-xs font-medium uppercase tracking-wide text-badge-foreground"
        >
          <span className="size-1.5 rounded-full bg-badge-foreground" />
          {hero.badge}
        </motion.span>

        <motion.div variants={item} transition={{ duration: 0.6, ease }} className="mt-7">
          <Avatar className="size-14 ring-4 ring-background" />
        </motion.div>

        <motion.h1
          variants={item}
          transition={{ duration: 0.7, ease }}
          className="mt-6 text-balance text-5xl leading-[1.05] tracking-tight sm:text-6xl"
        >
          <AccentText>{hero.headline}</AccentText>
        </motion.h1>

        <motion.p
          variants={item}
          transition={{ duration: 0.7, ease }}
          className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted"
        >
          {hero.intro}
        </motion.p>

        <motion.a
          variants={item}
          transition={{ duration: 0.7, ease }}
          href="#about"
          aria-label="Scroll to about"
          className="mt-10 grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-foreground"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
