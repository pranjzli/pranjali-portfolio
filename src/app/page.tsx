import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Polaroids } from "@/components/polaroids";
import { SelectedWorks } from "@/components/selected-works";
import { Testimonials } from "@/components/testimonials";
import { MotionBrand } from "@/components/motion-brand";
import { DesignThinking } from "@/components/design-thinking";
import { FooterCta } from "@/components/footer-cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Polaroids />
        <SelectedWorks />
        <Testimonials />
        <MotionBrand />
        <DesignThinking />
        <FooterCta />
      </main>
    </>
  );
}
