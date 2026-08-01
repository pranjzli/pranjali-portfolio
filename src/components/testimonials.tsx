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
const TILE = 96; // size-24
const GAP = 20; // gap-5
const ROW_INDENT = 96; // row's left offset inside the container (md:ml-24)
const AUTO_ROTATE_MS = 5000;
// Fixed footprint reserved for the bubble = the tallest bubble (longest quote
// at the card's own max-w-lg width). The bubble itself sizes to its content
// and is anchored to the BOTTOM of this reserve, so its height/top-edge change
// per person while everything below it (the tiles) never shifts.
const BUBBLE_RESERVE = 220;
const BUBBLE_WIDTH = 512; // max-w-lg

const tileCenter = (i: number) => ROW_INDENT + i * (TILE + GAP) + TILE / 2;

export function Testimonials() {
  const [selected, setSelected] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    const id = setInterval(() => {
      setSelected((i) => (i + 1) % testimonial.people.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [hasInteracted]);

  const active = testimonial.people[selected];

  // The bubble glides horizontally to sit over the active tile, keeping its
  // tail attached instead of letting the tail slide off the (fixed-width)
  // bubble toward the far-right people. Ideal shift centres the tail on the
  // bubble; clamped so the bubble's right edge never passes the tile row's
  // right end (no clipping) and it never slides left of the row's start.
  const n = testimonial.people.length;
  const rowRight = tileCenter(n - 1) + TILE / 2;
  const maxShift = Math.max(0, rowRight - BUBBLE_WIDTH);
  const bubbleShift = Math.min(Math.max(tileCenter(selected) - BUBBLE_WIDTH / 2, 0), maxShift);
  // Tail position *within* the bubble = where it must sit so that, after the
  // bubble is shifted, it lands dead-centre on the selected tile.
  const tailLeft = tileCenter(selected) - bubbleShift - 5;

  function select(i: number) {
    setSelected(i);
    setHasInteracted(true);
  }

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
          {/* Fixed-height reserve, bubble pinned to its bottom. The bubble's
              own height tracks its content, so its top edge rises/falls per
              person while this reserve keeps the tiles below from ever moving. */}
          <div className="flex w-full items-end" style={{ minHeight: BUBBLE_RESERVE }}>
            {/* Shifter carries the horizontal glide; the figure inside only
                animates its own height. Keeping the two on separate elements
                stops the layout (height) animation and the x-glide from both
                fighting over the same transform. */}
            <motion.div
              animate={{ x: bubbleShift }}
              transition={{ duration: 0.4, ease }}
              className="w-full max-w-lg"
            >
              <motion.figure
                layout="size"
                transition={{ duration: 0.4, ease }}
                className="relative w-full rounded-[28px] bg-[#ececec] p-6 text-[#ececec]"
              >
                {/* Notch hooks down onto the selected person's tile. Anchored to
                    the bubble's bottom edge (which never moves), so it only moves
                    within the bubble; the bubble's own glide does the rest. */}
                <motion.span
                  animate={{ left: tailLeft }}
                  transition={{ duration: 0.4, ease }}
                  className="absolute top-full -mt-px hidden md:block"
                >
                  <BubbleTail side="left" />
                </motion.span>

              <AnimatePresence mode="popLayout" initial={false}>
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
              </motion.figure>
            </motion.div>
          </div>
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
              onClick={() => select(i)}
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
                className={`size-24 rounded-2xl object-cover transition-opacity ${
                  i === selected
                    ? "opacity-100 ring-2 ring-foreground/50 ring-offset-2 ring-offset-background"
                    : "opacity-80 hover:opacity-100"
                }`}
              />
              <span
                className={`font-inter text-sm italic transition-opacity ${
                  i === selected ? "text-foreground opacity-100" : "text-foreground/70 opacity-60"
                }`}
              >
                {person.name}
              </span>
            </motion.button>
          ))}
        </div>
      </Container>
    </section>
  );
}
