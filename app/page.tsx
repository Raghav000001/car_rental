import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <PhilosophySection />
      <TestimonialsSection />
    </main>
  );
}
