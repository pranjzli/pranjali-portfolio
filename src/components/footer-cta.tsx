"use client";

import { motion } from "motion/react";
import { footer } from "@/lib/content";
import { viewportOnce, ease } from "@/lib/motion";
import { Avatar } from "@/components/ui/avatar";
import { BubbleTail } from "@/components/ui/bubble-tail";
import { Reveal } from "@/components/ui/reveal";

export function FooterCta() {
  return (
    <footer id="contact" className="relative overflow-hidden py-28">
      {/* Same foliage wash as the hero, flipped so it fades in from the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[420px] mix-blend-multiply"
      >
        {/* Flipped vertically and cropped to the image's pale bottom edge, so the
            wash reads white at the top and greens up toward the page bottom */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-bg.png"
          alt=""
          className="h-full w-full -scale-y-100 object-cover object-bottom"
        />
      </div>

      <Reveal className="mx-auto flex w-full max-w-[860px] flex-col gap-12 px-6 md:flex-row md:items-start md:justify-between">
        <div className="w-full max-w-[430px]">
          {/* Chat bubble — its tail hooks down toward the photo */}
          <motion.a
            href={footer.links[0].href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-block rounded-[36px] bg-accent px-6 py-4 text-xl font-medium text-accent-foreground shadow-[0_10px_30px_-12px_rgba(0,161,255,0.6)] sm:text-2xl"
          >
            {footer.cta}
            <BubbleTail className="absolute right-[38px] top-full -mt-px text-accent" />
          </motion.a>

          <div className="mt-3 flex items-start justify-between gap-6">
            <span className="text-[15px] text-foreground/80">{footer.name}</span>
            <Avatar
              src={footer.avatar}
              alt="Pranjali"
              className="size-[72px] shrink-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-4">
          {footer.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group inline-flex items-center gap-4 rounded-full border border-foreground/80 px-6 py-3 text-lg text-foreground transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                {l.label}
              </span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </footer>
  );
}
