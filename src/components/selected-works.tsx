"use client";

import { motion } from "motion/react";
import { projects } from "@/lib/content";
import { viewportOnce, ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { SectionLabel, Container } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

function CardSurface({
  className = "",
  arrow = true,
}: {
  className?: string;
  arrow?: boolean;
}) {
  return (
    <motion.a
      href="#"
      whileHover="hover"
      className={`group relative block overflow-hidden rounded-2xl bg-card ${className}`}
    >
      {/* subtle sheen on hover */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(255,255,255,0.35),transparent)]"
      />
      {arrow && (
        <motion.span
          variants={{ hover: { scale: [1, 0.82, 1] } }}
          transition={{ duration: 0.4, ease, times: [0, 0.4, 1] }}
          className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full border border-card-foreground/25 text-card-foreground"
        >
          ↗
        </motion.span>
      )}
    </motion.a>
  );
}

export function SelectedWorks() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="py-20">
      <Container className="max-w-[920px]">
        <Reveal>
          <SectionLabel>Selected Works</SectionLabel>
        </Reveal>

        {/* Featured row: tall card on the left, heading + a row of three
            shorter cards on the right, all bottom-aligned (per Figma) */}
        <Reveal group className="mt-6 grid gap-8 md:grid-cols-[428fr_732fr] md:items-stretch">
          <Reveal.Item>
            <CardSurface className="aspect-[428/437] w-full" />
          </Reveal.Item>
          <Reveal.Item className="flex flex-col">
            <h3 className="text-2xl leading-snug tracking-tight sm:text-[26px]">
              <AccentText>{featured.title}</AccentText>
            </h3>
            <p className="mt-3 text-sm text-muted">{featured.meta}</p>
            <div className="mt-auto grid grid-cols-3 gap-4 pt-6">
              {[0, 1, 2].map((i) => (
                <CardSurface key={i} arrow={false} className="aspect-[236/273] w-full" />
              ))}
            </div>
          </Reveal.Item>
        </Reveal>

        {/* Half cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            >
              <CardSurface className="aspect-[5/4] w-full" />
              <h3 className="mt-4 text-xl leading-snug tracking-tight">
                <AccentText>{p.title}</AccentText>
              </h3>
              <p className="mt-2 text-sm text-muted">{p.meta}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
