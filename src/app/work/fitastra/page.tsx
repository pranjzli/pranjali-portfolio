import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { FitAstraCaseStudy } from "@/components/case-study/fitastra";
import { FooterCta } from "@/components/footer-cta";

export const metadata: Metadata = {
  title: "FitAstra — Coaches Tab · Pranjali",
  description:
    "Designing FitAstra's first revenue stream — session-based coach booking across a user app and a coach app.",
};

export default function FitAstraPage() {
  return (
    <>
      <Navbar />
      <FitAstraCaseStudy />
      <FooterCta />
    </>
  );
}
