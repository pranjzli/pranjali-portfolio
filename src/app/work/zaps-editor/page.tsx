import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { ZapsEditorCaseStudy } from "@/components/case-study/zaps-editor";

export const metadata: Metadata = {
  title: "Zaps — The Editor · Pranjali",
  description:
    "Designing the editor experience behind Zaps' 7.5x revenue growth — one module system across templates, photos, carousels and reels.",
};

export default function ZapsEditorPage() {
  return (
    <>
      <Navbar />
      <ZapsEditorCaseStudy />
    </>
  );
}
