"use client";

import { motion } from "motion/react";
import { footer } from "@/lib/content";
import { viewportOnce, ease } from "@/lib/motion";
import { Avatar } from "@/components/ui/avatar";
import { Reveal } from "@/components/ui/reveal";

export function FooterCta() {
  return (
    <footer id="contact" className="relative overflow-hidden py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64">
        <div className="absolute bottom-[-40%] left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#cfe8c2,transparent)] opacity-70 blur-2xl" />
      </div>

      <Reveal className="flex flex-col items-center px-6 text-center">
        <motion.a
          href={footer.links[0].href}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-[0_8px_24px_-8px_rgba(47,107,255,0.5)]"
        >
          {footer.cta}
        </motion.a>

        <div className="mt-8 flex items-center gap-3">
          <Avatar className="size-9" />
          <span className="text-sm text-muted">{footer.name}</span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {footer.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {l.label}
              <span aria-hidden className="text-muted">↗</span>
            </a>
          ))}
        </div>
      </Reveal>
    </footer>
  );
}
