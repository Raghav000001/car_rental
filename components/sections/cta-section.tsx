"use client";

import Link from "next/link";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/car-video.mp4"
        />

        <div className="absolute inset-0 bg-foreground/60" />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
          <h2 className="max-w-3xl text-4xl font-medium leading-tight tracking-tight text-white md:text-5xl lg:text-7xl">
            Ready to Hit the Road?
          </h2>
          <p className="mt-4 max-w-xl text-base text-white/70 md:text-lg">
            Book your perfect vehicle today and experience the freedom of the open road.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/fleet"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-foreground transition-all hover:bg-white/90"
            >
              Book Now
            </Link>
            <Link
              href="/fleet"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
