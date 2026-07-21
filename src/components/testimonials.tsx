"use client";

import { motion } from "motion/react";
import { testimonial } from "@/lib/content";
import { viewportOnce, ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { SectionLabel, Container } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { BubbleTail } from "@/components/ui/bubble-tail";

const peopleOffsets = [0, 12, 14, 6, 14];

/* Shared geometry so the bubble's notch always lands on the selected tile. */
const TILE = 64; // size-16
const GAP = 20; // gap-5
const ROW_INDENT = 96; // row's left offset inside the container
const SELECTED = 0; // the raised tile the quote belongs to
const TAIL_LEFT = ROW_INDENT + SELECTED * (TILE + GAP) + TILE / 2 - 5;

export function Testimonials() {
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionLabel>{testimonial.label}</SectionLabel>
          <h2 className="mt-4 text-3xl tracking-tight sm:text-4xl">
            <AccentText>{testimonial.heading}</AccentText>
          </h2>
        </Reveal>

        <Reveal className="mt-8">
          <figure className="relative max-w-lg rounded-[28px] bg-[#ececec] p-6 text-[#ececec]">
            {/* Notch hooks down onto the selected person's tile */}
            <span
              style={{ left: TAIL_LEFT }}
              className="absolute top-full -mt-px hidden md:block"
            >
              <BubbleTail side="left" />
            </span>
            <blockquote className="text-[15px] leading-relaxed text-foreground/80">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2 text-sm text-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={testimonial.author.logo}
                alt="Turnip logo"
                className="size-6 rounded-md"
              />
              {testimonial.author.name}
            </figcaption>
          </figure>
        </Reveal>

        {/* Tiles sit at slightly different heights, like scattered photos */}
        <div
          style={{ gap: GAP }}
          className="mt-6 flex flex-wrap items-start justify-center md:ml-24 md:flex-nowrap md:justify-start"
        >
          {testimonial.people.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              style={{ marginTop: peopleOffsets[i % peopleOffsets.length] }}
              className="flex flex-col items-center gap-2"
            >
              <div className="size-16 rounded-2xl bg-card" />
              <span className="serif text-sm text-foreground/70">{person.name}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
