import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { ZapsDesignSystemCaseStudy } from "@/components/case-study/zaps-design-system";

export const metadata: Metadata = {
  title: "Zaps — Design System & Token Pipeline · Pranjali",
  description:
    "A token-first design system for Zaps, exported as a Figma-to-Swift contract and validated by building the app's UI in SwiftUI.",
};

export default function ZapsDesignSystemPage() {
  return (
    <>
      <Navbar />
      <ZapsDesignSystemCaseStudy />
    </>
  );
}
