"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";

/**
 * Lightbox video player. Opens over a dimmed backdrop; closes on backdrop
 * click, the close button, or Escape. Pauses Lenis so the page can't scroll
 * underneath while it's open.
 */
export function VideoModal({
  open,
  src,
  poster,
  onClose,
}: {
  open: boolean;
  src: string;
  poster?: string;
  onClose: () => void;
}) {
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, lenis, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[560px]"
          >
            <video
              src={src}
              poster={poster}
              autoPlay
              controls
              playsInline
              className="w-full rounded-2xl bg-black shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)]"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute -right-3 -top-3 grid size-9 place-items-center rounded-full bg-white text-lg text-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
