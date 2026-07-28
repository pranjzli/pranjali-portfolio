"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  meta,
  tldr,
  topStats,
  journey,
  problem,
  research,
  editor,
  canvas,
  testing,
  library,
  store,
  role,
  impact,
  learned,
  outro,
} from "@/lib/case-studies/zaps-editor";
import { ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { Reveal } from "@/components/ui/reveal";
import {
  Measure,
  Section,
  Placeholder,
  PlaceholderRow,
  CardGrid,
  Stat,
  Body,
} from "@/components/case-study/primitives";
import { FigmaEmbed } from "@/components/case-study/figma-embed";

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

          <Reveal group className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8">
            {topStats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} size="sm" />
            ))}
          </Reveal>
        </Measure>
      </section>

      {/* -------------------------------------------------------- Journey */}
      <Section label={journey.label} heading={journey.heading} body={journey.body}>
        {/* Three versions, each with the screen it shipped */}
        <Reveal
          group
          className="relative left-1/2 mt-10 grid w-[min(1180px,92vw)] -translate-x-1/2 gap-5 md:grid-cols-3"
        >
          {journey.versions.map((v) => (
            <Reveal.Item
              key={v.tag}
              className="flex flex-col rounded-2xl border border-line bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--cs-accent)]">
                {v.tag}
              </span>
              <h3 className="mt-3 text-[19px] font-semibold leading-snug">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
              {/* Pushed to the bottom so the three screens line up across cards
                  even though the copy above them runs to different lengths */}
              <div className="mt-auto pt-6">
                <Placeholder ratio="4/3" />
              </div>
            </Reveal.Item>
          ))}
        </Reveal>
      </Section>

      {/* -------------------------------------------------------- Problem */}
      <Section label={problem.label} heading={problem.heading} body={problem.body} />

      {/* ------------------------------------------------------- Research */}
      <Section label={research.label} heading={research.heading} body={research.body}>
        <CardGrid cards={research.findings} />
      </Section>

      {/* --------------------------------------------------------- Editor */}
      <Section label={editor.label} heading={editor.heading} body={editor.body}>
        {/* Lead phrase carries the scan line; the rest explains it */}
        <Reveal group className="mt-8 space-y-5">
          {editor.principles.map((p) => (
            <Reveal.Item
              key={p.lead}
              className="border-l-2 border-[var(--cs-accent)] pl-5"
            >
              <p className="text-[17px] leading-[1.6]">
                <span className="font-semibold">{p.lead}</span>{" "}
                <span className="text-foreground/70">{p.rest}</span>
              </p>
            </Reveal.Item>
          ))}
        </Reveal>

        <Reveal className="mt-8">
          <Body>{editor.constraint}</Body>
        </Reveal>

        <PlaceholderRow media={editor.wide} breakout />

        {/* One canvas per format, sharing the same toolkit */}
        <Reveal
          group
          className="relative left-1/2 mt-6 grid w-[min(1180px,92vw)] -translate-x-1/2 gap-6 sm:grid-cols-3"
        >
          {editor.formats.map((f) => (
            <Reveal.Item key={f.caption}>
              <Placeholder ratio={f.ratio} />
              <p className="mt-4 text-sm leading-relaxed text-muted">{f.caption}</p>
            </Reveal.Item>
          ))}
        </Reveal>

        <PlaceholderRow media={[editor.timeline]} breakout />
      </Section>

      {/* --------------------------------------------------------- Canvas */}
      <Section label={canvas.label} heading={canvas.heading} body={canvas.body}>
        <FigmaEmbed
          url={canvas.url}
          title={canvas.title}
          caption={canvas.caption}
          className="relative left-1/2 mt-10 w-[min(1180px,92vw)] -translate-x-1/2"
        />
      </Section>

      {/* -------------------------------------------------------- Testing */}
      <Section label={testing.label} heading={testing.heading} body={testing.body}>
        <CardGrid cards={testing.findings} />
      </Section>

      {/* -------------------------------------------------------- Library */}
      <Section label={library.label} heading={library.heading} body={library.body}>
        {/* Two portrait screens — side by side, not stacked full-bleed */}
        <Reveal group className="mt-10 grid gap-6 sm:grid-cols-2">
          {library.media.map((m) => (
            <Reveal.Item key={m.caption}>
              <Placeholder ratio={m.ratio} />
              <p className="mt-4 text-sm leading-relaxed text-muted">{m.caption}</p>
            </Reveal.Item>
          ))}
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------- Store */}
      <Section label={store.label} heading={store.heading} body={store.body}>
        <PlaceholderRow media={[store.media]} breakout />
      </Section>

      {/* ----------------------------------------------------------- Role */}
      <Section id="role" label={role.label} heading={role.heading} body={role.body}>
        <PlaceholderRow media={role.media} breakout />
      </Section>

      {/* --------------------------------------------------------- Impact */}
      <Section id="impact" label={impact.label} heading={impact.heading}>
        <Reveal group className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {impact.stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </Reveal>

        <Reveal className="mt-10">
          <p className="border-l-2 border-[var(--cs-accent)] pl-5 text-[15px] leading-relaxed text-muted">
            {impact.note}
          </p>
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
