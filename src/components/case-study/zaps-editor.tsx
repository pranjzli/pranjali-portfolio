"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  meta,
  tldr,
  research,
  problem,
  designed,
  testing,
  built,
  templates,
  canvas,
  role,
  learned,
  outro,
} from "@/lib/case-studies/zaps-editor";
import { ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { Reveal } from "@/components/ui/reveal";
import {
  Measure,
  Section,
  CardGrid,
  Chips,
  PullQuote,
  SectionVisual,
  Stat,
  Body,
} from "@/components/case-study/primitives";
import { FigmaEmbed } from "@/components/case-study/figma-embed";
import { ZapsHero } from "@/components/case-study/zaps-hero";

const item = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function ZapsEditorCaseStudy() {
  return (
    // Same scoped accent as the FitAstra study, so the case studies read as
    // one system rather than two separately-branded pages.
    <main style={{ "--cs-accent": "#60A167" } as React.CSSProperties}>
      {/* ---------------------------------------------------------- Hero */}
      {/* pb-[140px]: pb-16 (64px) + the 76px the scaled hand overflows the
          section by, so the section ends exactly where the hand does. */}
      <section className="relative overflow-hidden pt-36 pb-[140px]">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 mix-blend-multiply">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-bg.png"
            alt=""
            className="h-full w-full -translate-y-[40%] object-cover object-top"
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

        <ZapsHero />
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

      {/* ------------------------------------------------------- Research */}
      <Section label={research.label} heading={research.heading} body={research.body}>
        <CardGrid cards={research.cards} columns={4} />
        <SectionVisual caption={research.caption} />
      </Section>

      {/* -------------------------------------------------------- Problem */}
      <Section label={problem.label} heading={problem.heading} body={problem.body}>
        <CardGrid cards={problem.cards} columns={3} />
        <SectionVisual caption={problem.caption} />
        <PullQuote>{problem.quote}</PullQuote>
      </Section>

      {/* -------------------------------------------------- What I designed */}
      <Section label={designed.label} heading={designed.heading} body={designed.body}>
        <CardGrid cards={designed.cards} columns={3} />
        {/* Real asset: the working canvas, every screen in one place */}
        <FigmaEmbed
          url={canvas.url}
          title={canvas.title}
          caption={designed.caption}
          className="relative left-1/2 mt-10 w-[min(1180px,92vw)] -translate-x-1/2"
        />
      </Section>

      {/* -------------------------------------------------------- Testing */}
      <Section label={testing.label} heading={testing.heading} body={testing.body}>
        <CardGrid cards={testing.cards} columns={2} />
        <SectionVisual caption={testing.caption} />
      </Section>

      {/* ---------------------------------------------------------- Built */}
      <Section label={built.label} heading={built.heading}>
        <CardGrid cards={built.cards} columns={2} />
        <SectionVisual caption={built.caption} />
      </Section>

      {/* ------------------------------------------------------ Templates */}
      <Section label={templates.label} heading={templates.heading} body={templates.body}>
        {/* Quick facts sit above the how-it-was-done cards */}
        <Chips items={templates.chips} className="mt-8" />
        <CardGrid cards={templates.cards} columns={3} />
        <SectionVisual caption={templates.caption} />
      </Section>

      {/* ----------------------------------------------------------- Role */}
      <Section id="role" label={role.label} heading={role.heading}>
        {/* Chips first, then the framing line beneath them */}
        <Chips items={role.chips} className="mt-6" />
        <Reveal className="mt-6 max-w-[840px]">
          <Body>{role.body}</Body>
        </Reveal>
      </Section>

      {/* -------------------------------------------------------- Learned */}
      <Section label={learned.label} heading={learned.heading} body={learned.body} />

      {/* ---------------------------------------------------------- Outro */}
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
              href="/work/fitastra"
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
