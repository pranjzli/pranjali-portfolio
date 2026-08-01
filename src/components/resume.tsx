"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { resumeHeader, experience, freelance, type ResumeEntry } from "@/lib/resume";
import { ease } from "@/lib/motion";
import { Reveal } from "@/components/ui/reveal";
import { Placeholder } from "@/components/case-study/primitives";

/** Company logo tile — fills its rounded square edge to edge, no padding. */
function Logo({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      className="size-14 shrink-0 rounded-2xl border border-line bg-white object-cover"
    />
  );
}

/** Grouped roles under one company, connected by a vertical timeline line. */
function RoleTimeline({ roles }: { roles: NonNullable<ResumeEntry["roles"]> }) {
  return (
    <div className="mt-4">
      {roles.map((r, i) => (
        <div key={r.title} className="flex gap-3">
          {/* dot + connector */}
          <div className="flex flex-col items-center">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-foreground/35" />
            {i < roles.length - 1 && <span className="w-px flex-1 bg-line" />}
          </div>
          <div className={i < roles.length - 1 ? "pb-4" : ""}>
            <div className="text-[15px] font-semibold leading-snug">{r.title}</div>
            <div className="mt-0.5 text-sm text-muted">
              {r.dates}
              {r.location ? ` · ${r.location}` : ""}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Entry({ entry }: { entry: ResumeEntry }) {
  const [open, setOpen] = useState(false);
  const grouped = !!entry.roles;

  return (
    <div className="flex items-start gap-4">
      <Logo src={entry.logo} />

      <div className="min-w-0 flex-1">
        {/* Header — the click target that toggles the description */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full items-start justify-between gap-4 text-left"
        >
          <div className="min-w-0">
            {grouped ? (
              <>
                <div className="text-[17px] font-semibold leading-snug">{entry.company}</div>
                {entry.companyMeta && (
                  <div className="mt-1 text-sm text-muted">{entry.companyMeta}</div>
                )}
                {entry.companyLocation && (
                  <div className="text-sm text-muted">{entry.companyLocation}</div>
                )}
              </>
            ) : (
              <>
                <div className="flex flex-wrap items-baseline gap-x-1.5">
                  <span className="text-[17px] font-semibold leading-snug">{entry.title}</span>
                  <span className="text-[17px] text-muted">@</span>
                  <span className="text-[17px] font-semibold leading-snug">{entry.company}</span>
                </div>
                {(entry.dates || entry.location) && (
                  <div className="mt-1 text-sm text-muted">
                    {entry.dates}
                    {entry.dates && entry.location ? "  |  " : ""}
                    {entry.location}
                  </div>
                )}
              </>
            )}
          </div>

          <span className="mt-1 shrink-0 text-xl leading-none text-muted/60 transition-colors group-hover:text-foreground">
            {open ? "×" : "+"}
          </span>
        </button>

        {grouped && <RoleTimeline roles={entry.roles!} />}

        {/* Description slides in between the header/timeline and the
            always-visible placeholder; the placeholder reflows down as it
            grows (normal flow, so the shift is smooth). */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="desc"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease }}
              className="overflow-hidden"
            >
              <p className="pt-4 text-sm leading-relaxed text-foreground/80">
                {entry.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Placeholder — always visible in the default view */}
        <div className="mt-4 w-44">
          <Placeholder ratio="4/3" />
        </div>
      </div>
    </div>
  );
}

function EntryGroup({ label, entries }: { label: string; entries: ResumeEntry[] }) {
  return (
    <div className="grid grid-cols-[92px_1fr] gap-x-8 sm:grid-cols-[130px_1fr] sm:gap-x-12">
      <div className="pt-1 text-sm text-muted">{label}</div>
      <Reveal group className="space-y-10">
        {entries.map((entry) => (
          <Reveal.Item key={entry.id}>
            <Entry entry={entry} />
          </Reveal.Item>
        ))}
      </Reveal>
    </div>
  );
}

export function Resume() {
  return (
    <main className="py-32">
      <div className="mx-auto w-full max-w-[720px] px-6">
        <Reveal className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resumeHeader.avatar}
            alt={resumeHeader.name}
            className="size-16 rounded-full border border-line object-cover"
          />
          <div>
            <div className="text-lg font-semibold leading-snug">{resumeHeader.name}</div>
            <div className="text-sm text-muted">{resumeHeader.role}</div>
            <a
              href={resumeHeader.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted underline decoration-line underline-offset-2 transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>

        <div className="mt-20 space-y-16">
          <EntryGroup label="Experience" entries={experience} />
          <EntryGroup label="Freelance" entries={freelance} />
        </div>
      </div>
    </main>
  );
}
