"use client";

import { useEffect, useRef, useState } from "react";
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

/** Uneven pacing + a faint tilt so the roam reads as a hand-moved cursor. */
const ROAM_TIMES = [0, 0.2, 0.42, 0.62, 0.83, 1];
const ROAM_ROT = [0, -2.2, 1.6, 2.4, -1.6, 0];

type Pointer = {
  src: string;
  /** Rendered width as a share of the frame width. */
  width: string;
  /**
   * Waypoints the pointer wanders through, as [x%, y%] of the frame for the
   * pointer's top-left (the arrow tip sits near it). Closed loop: first == last.
   */
  path: [number, number][];
  /** Seconds per lap + phase offset so the pointers desync. */
  dur: number;
  delay: number;
};

/**
 * Frames from the Figma "Design Thinking" board. Positions are lifted from the
 * reference layout; `depth` drives the pointer parallax. Each frame carries an
 * annotation pointer that roams inside the frame like a live cursor.
 */
type Frame = {
  src: string;
  alt: string;
  left: string;
  top: string;
  width: string;
  depth: number;
  float: number;
  pointer: Pointer;
};

const frames: Frame[] = [
  {
    src: "/images/design-thinking/dt-ai.png",
    alt: "Row of AI tool icons",
    left: "4%",
    top: "12%",
    width: "30%",
    depth: 22,
    float: 5.5,
    pointer: {
      src: "/images/design-thinking/pointers/ai.png",
      width: "24%",
      path: [[8, 4], [46, 0], [68, 12], [50, 26], [18, 22], [8, 4]],
      dur: 11,
      delay: 0,
    },
  },
  {
    src: "/images/design-thinking/dt-typography.png",
    alt: "Typography scale annotation",
    left: "67%",
    top: "10%",
    width: "21%",
    depth: 34,
    float: 5,
    pointer: {
      src: "/images/design-thinking/pointers/typography.png",
      width: "46%",
      path: [[6, 10], [40, 4], [48, 40], [20, 56], [4, 30], [6, 10]],
      dur: 13,
      delay: 1.2,
    },
  },
  {
    src: "/images/design-thinking/dt-components.png",
    alt: "Editor module component inspector",
    left: "4%",
    top: "48%",
    width: "19%",
    depth: 20,
    float: 7,
    pointer: {
      src: "/images/design-thinking/pointers/components.png",
      width: "62%",
      path: [[4, 8], [30, 22], [34, 52], [14, 66], [2, 38], [4, 8]],
      dur: 15,
      delay: 0.6,
    },
  },
  {
    src: "/images/design-thinking/dt-spacing.png",
    alt: "Spacing annotation",
    left: "35%",
    top: "78%",
    width: "27%",
    depth: 30,
    float: 6,
    pointer: {
      src: "/images/design-thinking/pointers/spacing.png",
      width: "28%",
      path: [[8, 6], [46, 2], [62, 20], [34, 40], [12, 24], [8, 6]],
      dur: 12,
      delay: 1.8,
    },
  },
  {
    src: "/images/design-thinking/dt-research.png",
    alt: "Sketch of a person researching at a laptop",
    left: "70%",
    top: "56%",
    width: "22%",
    depth: 26,
    float: 6.5,
    pointer: {
      src: "/images/design-thinking/pointers/research.png",
      width: "42%",
      path: [[6, 8], [40, 4], [48, 34], [22, 52], [4, 28], [6, 8]],
      dur: 14,
      delay: 0.9,
    },
  },
];

/** Frame image plus its annotation pointer, which roams inside the frame. */
function FrameImage({ frame }: { frame: Frame }) {
  const reduce = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  // Measure the frame so the roam path (in %) maps to GPU-friendly px transforms.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setBox({ w: entry.contentRect.width, h: entry.contentRect.height }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const p = frame.pointer;
  const roaming = !reduce && box.w > 0;
  const xs = p.path.map(([x]) => (x / 100) * box.w);
  const ys = p.path.map(([, y]) => (y / 100) * box.h);

  return (
    <div ref={boxRef} className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={frame.src} alt={frame.alt} className="w-full drop-shadow-[0_12px_32px_rgba(0,0,0,0.12)]" />

      <motion.img
        src={p.src}
        alt=""
        aria-hidden
        style={{ left: 0, top: 0, width: p.width, opacity: box.w ? 1 : 0 }}
        className="pointer-events-none absolute drop-shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
        animate={roaming ? { x: xs, y: ys, rotate: ROAM_ROT } : undefined}
        transition={{
          duration: p.dur,
          times: ROAM_TIMES,
          repeat: Infinity,
          ease: "easeInOut",
          delay: p.delay,
        }}
      />
    </div>
  );
}

/** One collage frame: follows the pointer softly and drifts on its own. */
function FloatingFrame({
  frame,
  index,
  pointer,
}: {
  frame: Frame;
  index: number;
  pointer: { x: ReturnType<typeof useSpring>; y: ReturnType<typeof useSpring> };
}) {
  const reduce = useReducedMotion();
  const x = useTransform(pointer.x, (v) => v * frame.depth);
  const y = useTransform(pointer.y, (v) => v * frame.depth);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      style={{ left: frame.left, top: frame.top, width: frame.width, x: reduce ? 0 : x, y: reduce ? 0 : y }}
      className="absolute"
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -frame.float, 0] }}
        transition={{ duration: 5 + index * 0.7, repeat: Infinity, ease: "easeInOut" }}
      >
        <FrameImage frame={frame} />
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
        className="relative mx-auto mt-6 hidden aspect-[3/2] w-full max-w-[1180px] md:block"
      >
        {frames.map((f, i) => (
          <FloatingFrame key={f.src} frame={f} index={i} pointer={pointer} />
        ))}

        <Reveal className="absolute left-[35%] top-[38%] w-[30%]">
          <Copy />
        </Reveal>
      </div>

      {/* Mobile: stacked copy + image grid */}
      <Container className="mt-6 md:hidden">
        <Reveal>
          <Copy />
        </Reveal>
        <Reveal group className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10">
          {frames.map((f) => (
            <Reveal.Item key={f.src}>
              <FrameImage frame={f} />
            </Reveal.Item>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
