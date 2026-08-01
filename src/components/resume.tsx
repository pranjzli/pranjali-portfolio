"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { resumeHeader, experience, freelance, type ResumeRow } from "@/lib/resume";
import { ease } from "@/lib/motion";
import { Reveal } from "@/components/ui/reveal";
import { Placeholder } from "@/components/case-study/primitives";

/** One experience/freelance row. Click anywhere to expand it in place into a
 * blue-bordered detail card with the short description + a photo slot;
 * click again (or the × ) to collapse. Only one row is open at a time. */
function Row({ row, open, onToggle }: { row: ResumeRow; open: boolean; onToggle: () => void }) {
  return (
    <motion.div layout="size" transition={{ duration: 0.35, ease }} className="overflow-hidden">
      {!open ? (
        <button
          type="button"
          onClick={onToggle}
          className="group flex w-full items-start gap-4 text-left"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={row.logo}
            alt=""
            aria-hidden
            className="size-14 shrink-0 rounded-2xl border border-line bg-white object-contain p-2"
          />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="text-[17px] font-semibold leading-snug">{row.title}</span>
              <span className="text-[17px] text-muted">@</span>
              <span className="text-[17px] font-semibold leading-snug">{row.company}</span>
            </div>
            {(row.dates || row.location) && (
              <div className="mt-1 text-sm text-muted">
                {row.dates}
                {row.dates && row.location ? "  |  " : ""}
                {row.location}
              </div>
            )}
          </div>
          <span className="mt-1 shrink-0 text-xl leading-none text-muted/60 transition-colors group-hover:text-foreground">
            +
          </span>
        </button>
      ) : (
        <div className="relative rounded-2xl border-[1.5px] border-[#0d99ff] p-5">
          <button
            type="button"
            onClick={onToggle}
            aria-label="Collapse"
            className="absolute right-4 top-4 text-lg leading-none text-muted transition-colors hover:text-foreground"
          >
            ×
          </button>
          <div className="flex items-start gap-4 pr-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={row.logo}
              alt=""
              aria-hidden
              className="size-14 shrink-0 rounded-2xl border border-line bg-white object-contain p-2"
            />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-baseline gap-x-1.5">
                <span className="text-[17px] font-semibold leading-snug">{row.title}</span>
                <span className="text-[17px] text-muted">@</span>
                <span className="text-[17px] font-semibold leading-snug">{row.company}</span>
              </div>
              {(row.dates || row.location) && (
                <div className="mt-1 text-sm text-muted">
                  {row.dates}
                  {row.dates && row.location ? "  |  " : ""}
                  {row.location}
                </div>
              )}
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80">{row.description}</p>
          <div className="mt-4 w-40">
            <Placeholder ratio="4/3" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function RowGroup({ label, rows }: { label: string; rows: ResumeRow[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-[100px_1fr] gap-x-8 sm:grid-cols-[130px_1fr] sm:gap-x-12">
      <div className="pt-1 text-sm text-muted">{label}</div>
      <Reveal group className="space-y-8">
        {rows.map((row) => (
          <Reveal.Item key={row.id}>
            <Row row={row} open={openId === row.id} onToggle={() => setOpenId((id) => (id === row.id ? null : row.id))} />
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
          <RowGroup label="Experience" rows={experience} />
          <RowGroup label="Freelance" rows={freelance} />
        </div>
      </div>
    </main>
  );
}
