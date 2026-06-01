"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const titleLine1 = "ROHIT";
const titleLine2 = "TOURS & TRAVELS";

const sideImages = [
  {
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000",
    alt: "Luxury sports car",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000",
    alt: "Modern premium car",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1503371060967-ba4faab7cea5?q=80&w=1000",
    alt: "Performance vehicle",
    position: "right",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000",
    alt: "Luxurious ride",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      
      setScrollProgress(progress);
    };

    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  
  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  
  // Smooth interpolations
  const centerWidth = 100 - (imageProgress * 58); // 100% to 42%
  const centerHeight = 100 - (imageProgress * 30); // 100% to 70%
  const sideWidth = imageProgress * 22; // 0% to 22%
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const borderRadius = imageProgress * 24; // 0px to 24px
  const gap = imageProgress * 16; // 0px to 16px
  
  // Vertical offset for side columns to move them up on mobile
  const sideTranslateY = -(imageProgress * 15); // Move up by 15% when fully expanded

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px`, paddingBottom: `${60 + (imageProgress * 40)}px` }}
          >
            
            {/* Left Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image - Center */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2000"
                alt="High-performance Audi luxury car"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay Text - Fades out first */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-end pb-6 sm:pb-8 overflow-hidden z-10"
                style={{ opacity: textOpacity }}
              >
                <div className="w-full flex flex-col items-center justify-center text-center font-medium leading-[0.8] tracking-tighter text-white px-4">
                  <h1 className="flex text-[18vw] sm:text-[22vw]">
                    {titleLine1.split("").map((letter, index) => (
                      <span
                        key={`l1-${index}`}
                        className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                        style={{
                          animationDelay: `${index * 0.08}s`,
                          transition: 'all 1.5s',
                          transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
                        }}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </span>
                    ))}
                  </h1>
                  <h2 className="flex flex-wrap justify-center text-[7vw] sm:text-[10vw] md:text-[8vw] mt-2 mb-4">
                    {titleLine2.split("").map((letter, index) => (
                      <span
                        key={`l2-${index}`}
                        className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                        style={{
                          animationDelay: `${(index + 5) * 0.05}s`,
                          transition: 'all 1.5s',
                          transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
                        }}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </span>
                    ))}
                  </h2>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />

      {/* Tagline Section */}
      <div className="px-6 pt-32 pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Premium cars, unbeatable rates
          <br />
          and ultimate freedom.
        </p>
        <div className="mt-8 flex justify-center md:hidden">
          <a
            href="/fleet"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background transition-all hover:opacity-90"
          >
            Browse Our Fleet
          </a>
        </div>
      </div>
    </section>
  );
}
