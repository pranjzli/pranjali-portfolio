import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Resume } from "@/components/resume";
import { FooterCta } from "@/components/footer-cta";

export const metadata: Metadata = {
  title: "Resume · Pranjali",
  description: "Pranjali's work experience and freelance projects.",
};

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <Resume />
      <FooterCta />
    </>
  );
}
