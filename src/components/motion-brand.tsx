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

            <div className="mt-6 flex items-center gap-4">
              {motionBrand.featured.map((app, i) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  title={app.name}
                  className="size-[104px] overflow-hidden rounded-[24px] shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={app.src} alt={app.name} className="size-full object-cover" />
                </motion.div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                {motionBrand.small.map((app, i) => (
                  <motion.div
                    key={app.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.4, ease, delay: 0.12 + i * 0.06 }}
                    whileHover={{ y: -4 }}
                    title={app.name}
                    className="size-[46px] overflow-hidden rounded-[12px] bg-white shadow-sm"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={app.src} alt={app.name} className="size-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Folder — opens on hover, links to Behance */}
          <motion.a
            href="https://www.behance.net/pranjalisaini"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See my work on Behance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease }}
            whileHover="open"
            variants={{ open: { y: -8 } }}
            className="relative h-32 w-44 shrink-0 [perspective:700px]"
          >
            {/* Back panel + tab */}
            <div className="absolute bottom-0 h-28 w-full rounded-xl bg-[linear-gradient(160deg,#a9dc8f,#8cc76d)]" />
            <div className="absolute left-0 top-0 h-7 w-24 rounded-t-lg bg-[linear-gradient(160deg,#a9dc8f,#8cc76d)]" />

            {/* The filed paper — a peek of the Behance profile. On hover it grows
                taller from its bottom edge (more of it shows) and lifts a touch. */}
            <motion.img
              src="/images/behance-folder.png"
              alt=""
              variants={{ open: { y: -6, scaleY: 1.14, scaleX: 1.03 } }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{ transformOrigin: "bottom center" }}
              className="absolute left-4 top-5 h-16 w-36 rounded-md object-cover object-top shadow-[0_4px_10px_-4px_rgba(0,0,0,0.3)]"
            />

            {/* Front panel — scales down and tilts forward from its bottom edge so
                the top widens (open-flap feel); bottom stays put, never dropping
                below its resting position. */}
            <motion.div
              aria-hidden
              variants={{ open: { rotateX: -34, scaleX: 1.06, scaleY: 0.92 } }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{ transformOrigin: "bottom center" }}
              className="absolute bottom-0 h-20 w-full rounded-xl bg-[linear-gradient(160deg,#c6ecab,#9ed17f)] shadow-[0_-2px_8px_-4px_rgba(0,0,0,0.15)]"
            />
          </motion.a>
        </div>
      </Container>
    </section>
  );
}
