"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { about } from "@/lib/content";
import { ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { SectionLabel, Container } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  const [tab, setTab] = useState<(typeof about.tabs)[number]>("Story");
  const paras = tab === "Story" ? about.story : about.tldr;

  return (
    <section id="about" className="py-20">
      <Container>
        <Reveal className="flex items-center justify-between">
          <SectionLabel>{about.label}</SectionLabel>

          <div className="flex items-center gap-1 rounded-full border border-line bg-background p-1 text-sm">
            {about.tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative rounded-full px-3 py-1 transition-colors"
              >
                {tab === t && (
                  <motion.span
                    layoutId="about-tab"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span
                  className={`relative z-10 ${tab === t ? "text-background" : "text-muted"}`}
                >
                  {t}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/80"
          >
            {paras.map((p, i) => (
              <p key={i}>
                <AccentText>{p}</AccentText>
              </p>
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
