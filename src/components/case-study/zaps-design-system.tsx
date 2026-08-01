"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { meta, tldr } from "@/lib/case-studies/zaps-design-system";
import { ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { Reveal } from "@/components/ui/reveal";
import { Measure, Stat } from "@/components/case-study/primitives";
import { TempTuner, tuneTransform, type Tune } from "@/components/case-study/temp-tuner";

const isDev = process.env.NODE_ENV !== "production";

const item = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function ZapsDesignSystemCaseStudy() {
  const [dsTune, setDsTune] = useState<Tune>({ scale: 0.8, x: 0, y: 0 });

  return (
    // Same scoped green as the other case studies, so they read as one system.
    <main style={{ "--cs-accent": "#60A167" } as React.CSSProperties}>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden pt-36 pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 mix-blend-multiply">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-bg.png"
            alt=""
            className="h-full w-full object-cover object-top"
          />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.09, delayChildren: 0.12 }}
        >
          <Measure>
            <motion.div variants={item} transition={{ duration: 0.6, ease }}>
              <Link
                href={meta.nav.backHref}
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                <span aria-hidden>←</span>
                {meta.nav.backLabel}
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              transition={{ duration: 0.6, ease }}
              className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--cs-accent)]"
            >
              {meta.eyebrow}
            </motion.div>

            <motion.h1
              variants={item}
              transition={{ duration: 0.7, ease }}
              className="mt-4 text-balance text-5xl leading-[1.05] tracking-tight sm:text-6xl"
            >
              <AccentText>{meta.title}</AccentText>
            </motion.h1>

            <motion.p
              variants={item}
              transition={{ duration: 0.7, ease }}
              className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted"
            >
              {meta.intro}
            </motion.p>
          </Measure>
        </motion.div>

        <Measure className="mt-12">
          <div className="w-full overflow-hidden rounded-2xl border border-line bg-background">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/zaps-design-system/designsystem.png"
              alt="The Zaps design system — tokens, components, and the SwiftUI build validating them"
              className="w-full"
              style={{ transform: tuneTransform(dsTune) }}
            />
          </div>
        </Measure>
      </section>

      {/* ---------------------------------------------------------- TL;DR */}
      <section id="tldr" className="py-16 sm:py-20">
        <Measure>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--cs-accent)]">
              {tldr.label}
            </span>
            <p className="mt-5 text-2xl leading-[1.4] tracking-tight sm:text-[28px]">
              {tldr.segments.map((seg, i) => (
                <span
                  key={i}
                  className={seg.key ? "font-semibold text-foreground" : "text-foreground/45"}
                >
                  {seg.t}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal group className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {tldr.stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </Reveal>

          <Reveal className="mt-8">
            <p className="text-sm leading-relaxed text-muted">{tldr.note}</p>
          </Reveal>
        </Measure>
      </section>

      {/* Rest of the case study isn't written up yet — everything past TL;DR
          is hidden until it is. */}
      <section className="py-24 text-center">
        <p className="text-lg text-muted">Full case study coming soon.</p>
      </section>

      {isDev && (
        <TempTuner
          label="Design System hero"
          groups={[{ key: "designSystem", title: "Design System", value: dsTune, onChange: setDsTune }]}
        />
      )}
    </main>
  );
}
