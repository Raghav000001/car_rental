"use client";

import { FadeImage } from "@/components/fade-image";

const accessories = [
  {
    id: 1,
    name: "GPS Navigation System",
    description: "Premium navigation with real-time traffic updates",
    price: "$15/day",
    image: "/images/luxury-sedan.png",
  },
  {
    id: 2,
    name: "Child Safety Seat",
    description: "Premium safety certified car seat for infants",
    price: "$20/day",
    image: "/images/suv-adventure.png",
  },
  {
    id: 3,
    name: "Roof Rack System",
    description: "Perfect for luggage and sports equipment",
    price: "$25/day",
    image: "/images/electric-car.png",
  },
  {
    id: 4,
    name: "Ski Rack Mount",
    description: "Secure attachment for winter sports gear",
    price: "$18/day",
    image: "/images/sports-car.png",
  },
  {
    id: 5,
    name: "Premium WiFi Hotspot",
    description: "Stay connected with unlimited mobile data",
    price: "$10/day",
    image: "/images/compact-car.png",
  },
  {
    id: 6,
    name: "Premium Roadside Assistance",
    description: "24/7 emergency support and vehicle recovery",
    price: "$12/day",
    image: "/images/luxury-minivan.png",
  },
];

export function CollectionSection() {
  return (
    <section id="pricing" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Optional Add-ons
        </h2>
      </div>

      {/* Accessories Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="group flex-shrink-0 w-[75vw] snap-center">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                  <span className="text-lg font-medium text-foreground">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="group">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                  <span className="font-medium text-foreground text-2xl">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
