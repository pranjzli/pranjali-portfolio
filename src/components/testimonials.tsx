"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { testimonial } from "@/lib/content";
import { viewportOnce, ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { SectionLabel, Container } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { BubbleTail } from "@/components/ui/bubble-tail";

/* Shared geometry so the bubble's notch always lands on the selected tile. */
const TILE = 64; // size-16
const GAP = 20; // gap-5
const ROW_INDENT = 96; // row's left offset inside the container
const AUTO_ROTATE_MS = 5000;

export function Testimonials() {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSelected((i) => (i + 1) % testimonial.people.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const active = testimonial.people[selected];
  const tailLeft = ROW_INDENT + selected * (TILE + GAP) + TILE / 2 - 5;

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
            <motion.span
              animate={{ left: tailLeft }}
              transition={{ duration: 0.4, ease }}
              className="absolute top-full -mt-px hidden md:block"
            >
              <BubbleTail side="left" />
            </motion.span>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease }}
              >
                <blockquote className="text-[15px] leading-relaxed text-foreground/80">
                  {active.quote}
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-2 text-sm text-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={active.logo}
                    alt={active.name}
                    className="size-6 rounded-md object-contain"
                  />
                  {active.role}
                </figcaption>
              </motion.div>
            </AnimatePresence>
          </figure>
        </Reveal>

        {/* Tiles sit on one shared baseline, in a horizontal row */}
        <div
          style={{ gap: GAP }}
          className="mt-6 flex flex-wrap items-start justify-center md:ml-24 md:flex-nowrap md:justify-start"
        >
          {testimonial.people.map((person, i) => (
            <motion.button
              key={person.name}
              type="button"
              onClick={() => setSelected(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center gap-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={person.photo}
                alt={person.name}
                className={`size-16 rounded-2xl object-cover transition-opacity ${
                  i === selected
                    ? "opacity-100 ring-2 ring-foreground/50 ring-offset-2 ring-offset-background"
                    : "opacity-80 hover:opacity-100"
                }`}
              />
              <span className="serif text-sm text-foreground/70">{person.name}</span>
            </motion.button>
          ))}
        </div>
      </Container>
    </section>
  );
}
