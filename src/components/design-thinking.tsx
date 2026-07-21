"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { designThinking } from "@/lib/content";
import { viewportOnce, ease } from "@/lib/motion";
import { AccentText } from "@/components/ui/accent-text";
import { SectionLabel, Container } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

/** Positions lifted from the Figma frame (1440w reference). `depth` drives parallax. */
const collage = [
  { src: "/images/design-thinking/dt-05.png", alt: "Components annotation", left: "5.1%", top: "0%", width: "25.2%", depth: 26, float: 5.5 },
  { src: "/images/design-thinking/dt-04.png", alt: "Vectors sketch", left: "54.7%", top: "2.8%", width: "20.5%", depth: 16, float: 6.5 },
  { src: "/images/design-thinking/dt-01.png", alt: "Typography annotation", left: "78.7%", top: "35.4%", width: "14.8%", depth: 34, float: 5 },
  { src: "/images/design-thinking/dt-03.png", alt: "Chat bubble component inputs", left: "8.1%", top: "51.1%", width: "22.6%", depth: 20, float: 7 },
  { src: "/images/design-thinking/dt-02.png", alt: "Spacing annotation", left: "60.6%", top: "79%", width: "24.9%", depth: 30, float: 6 },
];

/** One collage card: follows the pointer softly and drifts on its own. */
function FloatingCard({
  item,
  index,
  pointer,
}: {
  item: (typeof collage)[number];
  index: number;
  pointer: { x: ReturnType<typeof useSpring>; y: ReturnType<typeof useSpring> };
}) {
  const reduce = useReducedMotion();
  const x = useTransform(pointer.x, (v) => v * item.depth);
  const y = useTransform(pointer.y, (v) => v * item.depth);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      style={{ left: item.left, top: item.top, width: item.width, x: reduce ? 0 : x, y: reduce ? 0 : y }}
      className="absolute"
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -item.float, 0] }}
        transition={{ duration: 5 + index * 0.7, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.04 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.src} alt={item.alt} className="w-full drop-shadow-[0_12px_32px_rgba(0,0,0,0.12)]" />
      </motion.div>
    </motion.div>
  );
}

function Copy() {
  return (
    <>
      <h2 className="text-2xl leading-snug tracking-tight sm:text-3xl">
        <AccentText>{designThinking.heading}</AccentText>
      </h2>
      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
        {designThinking.body}
      </p>
    </>
  );
}

export function DesignThinking() {
  const stage = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 90, damping: 20, mass: 0.6 };
  const pointer = { x: useSpring(px, spring), y: useSpring(py, spring) };

  function onMove(e: React.MouseEvent) {
    const r = stage.current?.getBoundingClientRect();
    if (!r) return;
    // -0.5..0.5 from the centre of the stage
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionLabel>{designThinking.label}</SectionLabel>
        </Reveal>
      </Container>

      {/* Desktop: scattered annotation collage around the copy */}
      <div
        ref={stage}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative mx-auto mt-6 hidden aspect-[1440/714] w-full max-w-[1200px] md:block"
      >
        {collage.map((c, i) => (
          <FloatingCard key={c.src} item={c} index={i} pointer={pointer} />
        ))}

        <Reveal className="absolute left-[34.7%] top-[44.5%] w-[32%]">
          <Copy />
        </Reveal>
      </div>

      {/* Mobile: stacked copy + image grid */}
      <Container className="mt-6 md:hidden">
        <Reveal>
          <Copy />
        </Reveal>
        <Reveal group className="mt-8 grid grid-cols-2 gap-4">
          {collage.map((c) => (
            <Reveal.Item key={c.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.src} alt={c.alt} className="w-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.1)]" />
            </Reveal.Item>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
