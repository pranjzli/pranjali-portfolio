"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  meta,
  tldr,
  problem,
  system,
  pipeline,
  validation,
  honest,
  impact,
  website,
  role,
  learned,
  outro,
} from "@/lib/case-studies/zaps-design-system";
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
  CaseStudyOutro,
} from "@/components/case-study/primitives";

const item = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function ZapsDesignSystemCaseStudy() {
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

        <SectionVisual ratio="16/9" />
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

      {/* -------------------------------------------------------- Problem */}
      <Section label={problem.label} heading={problem.heading} body={problem.body}>
        <CardGrid cards={problem.cards} columns={3} />
        <SectionVisual caption={problem.caption} />
      </Section>

      {/* --------------------------------------------------------- System */}
      <Section label={system.label} heading={system.heading} body={system.body}>
        <CardGrid cards={system.cards} columns={3} />
        <SectionVisual caption={system.caption} />
      </Section>

      {/* ------------------------------------------------------- Pipeline */}
      <Section label={pipeline.label} heading={pipeline.heading} body={pipeline.body}>
        <CardGrid cards={pipeline.cards} columns={3} />
        <PullQuote label="Governance">{pipeline.governance}</PullQuote>
        <SectionVisual caption={pipeline.caption} />
      </Section>

      {/* ----------------------------------------------------- Validation */}
      <Section label={validation.label} heading={validation.heading} body={validation.body}>
        <CardGrid cards={validation.cards} columns={3} />
        <PullQuote label="The bar">{validation.quote}</PullQuote>
        <SectionVisual caption={validation.caption} />
      </Section>

      {/* ------------------------------------------------- Keeping it honest */}
      <Section label={honest.label} heading={honest.heading}>
        <CardGrid cards={honest.cards} columns={3} />
        <SectionVisual caption={honest.caption} />
      </Section>

      {/* --------------------------------------------------------- Impact */}
      <Section id="impact" label={impact.label} heading={impact.heading}>
        <Reveal group className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8">
          {impact.stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} size="sm" />
          ))}
        </Reveal>
        <CardGrid cards={impact.cards} columns={2} />
      </Section>

      {/* -------------------------------------------------------- Website */}
      <Section label={website.label} heading={website.heading} body={website.body}>
        <Chips items={website.chips} className="mt-8" />
        <SectionVisual caption={website.caption} />
      </Section>

      {/* ----------------------------------------------------------- Role */}
      <Section id="role" label={role.label} heading={role.heading}>
        <Chips items={role.chips} className="mt-6" />
        <Reveal className="mt-6 max-w-[840px]">
          <Body>{role.body}</Body>
        </Reveal>
      </Section>

      {/* -------------------------------------------------------- Learned */}
      <Section label={learned.label} heading={learned.heading} body={learned.body} />

      {/* -------------------------------------------------- Next project */}
      <CaseStudyOutro currentHref="/work/zaps-design-system" credit={outro.credit} />
    </main>
  );
}
