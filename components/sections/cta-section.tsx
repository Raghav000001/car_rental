"use client";

import Link from "next/link";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative flex w-full flex-col items-center justify-center md:aspect-[21/9] min-h-[400px] md:min-h-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/car-video.mp4"
        />

        <div className="absolute inset-0 bg-foreground/60" />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 py-12 text-center">
          <h2 className="max-w-3xl text-3xl font-medium leading-tight tracking-tight text-white md:text-5xl lg:text-7xl">
            Ready to Hit the Road?
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/70 md:mt-4 md:text-lg">
            Book your perfect vehicle today and experience the freedom of the open road.
          </p>

          <div className="mt-6 flex  w-full max-w-xs flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:gap-4">
            <Link
              href="/fleet"
              className="inline-flex w-full items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-foreground transition-all hover:bg-white/90 sm:w-auto"
            >
              Book Now
            </Link>
            <Link
              href="/fleet"
              className="inline-flex w-full items-center justify-center rounded-lg border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
