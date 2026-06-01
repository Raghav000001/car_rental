"use client";

import Link from "next/link";
import { WavyBackground } from "@/components/ui/wavy-background";

export function TestimonialsSection() {
  return (
    <section id="about" className="relative overflow-hidden">
      <WavyBackground
        backgroundFill="#0A0A0A"
        colors={["#262626", "#525252", "#737373", "#A3A3A3", "#FAFAFA"]}
        waveOpacity={0.3}
        blur={8}
        speed="slow"
        containerClassName="h-auto"
      >
        <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
          <p className="mx-auto max-w-5xl text-center text-2xl leading-relaxed text-white md:text-3xl lg:text-[2.5rem] lg:leading-snug">
            Velocity vehicles combine premium engineering with unbeatable rates — 
            designed for travelers who refuse to compromise on comfort or value on any journey.
          </p>
          <div className="mt-12 text-center">
            <Link
              href="/fleet"
              className="inline-flex items-center justify-center rounded-lg bg-white px-12 py-4 text-lg font-semibold text-foreground transition-all hover:bg-white/90"
            >
              Book Now
            </Link>
          </div>
        </div>
      </WavyBackground>
    </section>
  );
}
