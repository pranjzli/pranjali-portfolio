"use client";

import { motion } from "motion/react";
import { testimonial } from "@/lib/content";
import { viewportOnce, ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { SectionLabel, Container } from "@/components/ui/section-label";
import { Avatar } from "@/components/ui/avatar";
import { Reveal } from "@/components/ui/reveal";

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
          <figure className="max-w-lg rounded-3xl rounded-tl-md bg-foreground/[0.04] p-6">
            <blockquote className="text-[15px] leading-relaxed text-foreground/80">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2 text-sm text-muted">
              <Avatar className="size-6" initial="T" />
              {testimonial.author.name}
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-end justify-center gap-5">
          {testimonial.people.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
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
