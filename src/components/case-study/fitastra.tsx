"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  meta,
  tldr,
  topStats,
  context,
  problem,
  exploration,
  solution,
  coachApp,
  role,
  impact,
  learned,
  outro,
} from "@/lib/case-studies/fitastra";
import { ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { Reveal } from "@/components/ui/reveal";
import {
  Measure,
  Section,
  Placeholder,
  PlaceholderRow,
  PhotoRow,
  Stat,
  Bullets,
  Body,
} from "@/components/case-study/primitives";
import { FidelitySlider } from "@/components/case-study/fidelity-slider";

const item = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function FitAstraCaseStudy() {
  return (
    // `--cs-accent` scopes the case-study green to this page only —
    // the home page keeps its blue --accent.
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
          <Placeholder ratio="16/9" />
        </Measure>
      </section>

      {/* ---------------------------------------------------------- TL;DR */}
      <section id="tldr" className="py-16 sm:py-20">
        <Measure>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--cs-accent)]">
              {tldr.label}
            </span>
            {/* Emphasis runs stay full-strength; the connective copy sits back */}
            <p className="mt-5 text-2xl leading-[1.45] tracking-tight sm:text-[28px]">
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
            {topStats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </Reveal>
        </Measure>
      </section>

      {/* -------------------------------------------------------- Context */}
      <Section label={context.label} heading={context.heading} body={context.body} />

      {/* -------------------------------------------------------- Problem */}
      <Section label={problem.label} heading={problem.heading} body={problem.body}>
        <PhotoRow photos={problem.photos} breakout />
      </Section>

      {/* ---------------------------------------------------- Exploration */}
      <Section
        label={exploration.label}
        heading={exploration.heading}
        body={exploration.body}
      >
        <Bullets items={exploration.bullets} />
        <Reveal className="mt-6">
          <Body>{exploration.outro}</Body>
        </Reveal>
        <PlaceholderRow media={exploration.media} breakout />
      </Section>

      {/* ------------------------------------------------------- Solution */}
      <Section label={solution.label} heading={solution.heading} body={solution.body}>
        <Reveal group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solution.decisions.map((d) => (
            <Reveal.Item
              key={d.no}
              className="rounded-2xl border border-line bg-white p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="text-xs font-bold tracking-[0.12em] text-[var(--cs-accent)]">
                {d.no}
              </span>
              <h3 className="mt-3 text-[17px] font-semibold leading-snug">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
            </Reveal.Item>
          ))}
        </Reveal>

        <FidelitySlider
          before={solution.fidelity.before}
          after={solution.fidelity.after}
          className="relative left-1/2 mt-10 w-[min(1180px,92vw)] -translate-x-1/2"
        />
      </Section>

      {/* ------------------------------------------------------ Coach app */}
      <Section label={coachApp.label} heading={coachApp.heading} body={coachApp.body}>
        <PlaceholderRow media={coachApp.media} />
      </Section>

      {/* ---------------------------------------------------------- Role */}
      <Section id="role" label={role.label} heading={role.heading} body={role.body}>
        <PlaceholderRow media={role.media} />
      </Section>

      {/* -------------------------------------------------------- Impact */}
      <Section id="impact" label={impact.label} heading={impact.heading} body={impact.body}>
        <Reveal group className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {impact.stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} size="sm" />
          ))}
        </Reveal>

        <Reveal className="mt-10">
          <p className="border-l-2 border-[var(--cs-accent)] pl-5 text-[15px] leading-relaxed text-muted">
            {impact.note}
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------- Learned */}
      <Section label={learned.label} heading={learned.heading} body={learned.body} />

      {/* --------------------------------------------------------- Outro */}
      <footer className="relative overflow-hidden py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[320px] mix-blend-multiply [mask-image:linear-gradient(to_bottom,transparent,black_45%)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-bg.png"
            alt=""
            className="h-full w-full -scale-y-100 object-cover object-bottom"
          />
        </div>

        <Measure>
          <Reveal>
            <Link
              href={meta.nav.backHref}
              className="group inline-flex items-center gap-3 text-2xl font-semibold tracking-tight text-[var(--cs-accent)]"
            >
              {outro.cta}
            </Link>
            <p className="mt-6 text-sm text-muted">{outro.credit}</p>
          </Reveal>
        </Measure>
      </footer>
    </main>
  );
}
