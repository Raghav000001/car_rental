"use client";

import Image from "next/image";
import { useState } from "react";

export function CarGallery({ images }: { images: string[] }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto scrollbar-none md:w-24 shrink-0">
        {images.map((img, idx) => (
          <button 
            key={idx} 
            onClick={() => setMainImage(img)}
            className={`relative aspect-square w-20 md:w-full overflow-hidden border-2 rounded-lg transition-all ${
              mainImage === img ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image 
              src={img} 
              alt={`Thumbnail ${idx + 1}`} 
              fill 
              className="object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Main Display */}
      <div className="relative aspect-[4/3] md:aspect-auto md:flex-1 w-full overflow-hidden rounded-[1.25rem] bg-muted/20 border border-border/50">
        <Image
          src={mainImage || "/placeholder.svg"}
          alt="Product Display"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
