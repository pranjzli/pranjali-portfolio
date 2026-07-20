"use client";

import { motion } from "motion/react";
import { motionBrand } from "@/lib/content";
import { viewportOnce, ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { SectionLabel, Container } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function MotionBrand() {
  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <Reveal className="max-w-md">
            <SectionLabel>{motionBrand.label}</SectionLabel>
            <h2 className="mt-4 text-2xl leading-snug tracking-tight sm:text-3xl">
              <AccentText>{motionBrand.heading}</AccentText>
            </h2>

            <div className="mt-6 flex items-center gap-3">
              {motionBrand.apps.map((app, i) => (
                <motion.div
                  key={app}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="grid size-12 place-items-center rounded-xl bg-card text-xs font-medium text-card-foreground shadow-sm"
                  title={app}
                >
                  {app.slice(0, 2)}
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Folder graphic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease }}
            whileHover="open"
            className="relative h-32 w-44 shrink-0"
          >
            <div className="absolute bottom-0 h-24 w-full rounded-xl rounded-tl-none bg-[linear-gradient(160deg,#bfe3a8,#9ed17f)]" />
            <div className="absolute top-2 left-0 h-6 w-20 rounded-t-lg bg-[linear-gradient(160deg,#bfe3a8,#9ed17f)]" />
            <motion.div
              variants={{ open: { y: -8, rotate: -3 } }}
              className="absolute -top-1 left-3 h-16 w-36 rounded-lg bg-white/90 shadow-sm"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
