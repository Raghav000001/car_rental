import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <PhilosophySection />
      <FeaturedProductsSection />
      <CtaSection />
      <TestimonialsSection />
    </main>
  );
}
