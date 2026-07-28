"use client";

import { motion } from "motion/react";
import { viewportOnce, ease } from "@/lib/motion";

/**
 * Live Figma embed. Used where the source is a whole canvas rather than a
 * single frame — flattening one to an image gives tiny screens in a lot of
 * empty space, whereas the embed lets the reader pan and zoom through it.
 *
 * The file's link sharing has to be set to "Anyone with the link can view",
 * or visitors get Figma's permission screen instead of the canvas.
 */
export function FigmaEmbed({
  url,
  title,
  caption,
  className = "",
}: {
  url: string;
  title: string;
  caption?: string;
  className?: string;
}) {
  const src = `https://embed.figma.com/design/${url}&embed-host=portfolio`;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease }}
      className={className}
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allowFullScreen
          className="block h-[clamp(480px,78vh,860px)] w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-sm leading-relaxed text-muted">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
