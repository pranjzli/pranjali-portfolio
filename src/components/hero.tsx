"use client";

import { motion } from "motion/react";
import { hero } from "@/lib/content";
import { ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { Avatar } from "@/components/ui/avatar";
import { WaterLayer } from "@/components/ui/water-layer";

const item = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24">
      {/* Soft foliage wash — image fades to white at its bottom edge */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 mix-blend-multiply">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-bg.png"
          alt=""
          className="h-full w-full object-cover object-top"
        />
        {/* Water surface drawn over the same image; falls back to the <img> */}
        <WaterLayer src="/images/hero-bg.png" className="absolute inset-0 h-full w-full" />
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
          {/* The photo carries its own rounded frame — don't add a border or radius */}
          <Avatar
            src={hero.avatar}
            alt="Pranjali"
            className="size-[92px] drop-shadow-[0_6px_18px_rgba(0,0,0,0.22)]"
          />
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
          <AccentText>{hero.intro}</AccentText>
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
