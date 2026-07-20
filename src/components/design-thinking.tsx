"use client";

import { designThinking } from "@/lib/content";
import { AccentText } from "@/components/ui/accent-text";
import { SectionLabel, Container } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function DesignThinking() {
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionLabel>{designThinking.label}</SectionLabel>
        </Reveal>

        <Reveal group className="mt-6 grid gap-6 md:grid-cols-2 md:items-center">
          {/* Annotation-style placeholder cards */}
          <Reveal.Item className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-xl border border-line bg-background shadow-sm" />
            <div className="aspect-square rounded-xl border border-line bg-background shadow-sm" />
            <div className="col-span-2 aspect-[2/1] rounded-xl border border-line bg-background shadow-sm" />
          </Reveal.Item>

          <Reveal.Item>
            <h2 className="text-2xl leading-snug tracking-tight sm:text-3xl">
              <AccentText>{designThinking.heading}</AccentText>
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
              {designThinking.body}
            </p>
          </Reveal.Item>
        </Reveal>
      </Container>
    </section>
  );
}
