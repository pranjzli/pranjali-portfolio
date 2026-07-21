"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { about } from "@/lib/content";
import { ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { SectionLabel, Container } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  const [tab, setTab] = useState<(typeof about.tabs)[number]>("Story");
  const condensed = tab === "TL;DR";

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

        {/* Same copy either way — TL;DR just dims what it leaves out */}
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/80">
          {about.story.map((para, i) => (
            <p key={i}>
              {para.map((seg, j) => (
                <motion.span
                  key={j}
                  animate={{ opacity: condensed && !seg.key ? 0.22 : 1 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <AccentText>{seg.t}</AccentText>
                </motion.span>
              ))}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
