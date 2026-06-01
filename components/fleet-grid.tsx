"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { BookingModal } from "@/components/booking-modal";

type CarData = {
  _id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  pricePerDay: number;
  images: string[];
  features: string[];
  transmission: string;
  seats: number;
  fuelType: string;
};

export function FleetGrid({ cars }: { cars: CarData[] }) {
  const [bookingCar, setBookingCar] = useState<CarData | null>(null);

  return (
    <>
      <div className="flex items-center justify-end mb-6 text-sm">
        <span className="text-muted-foreground">
          Sort By:{" "}
          <select className="bg-transparent border border-border rounded px-2 py-1 ml-2">
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="group flex flex-col border border-border/60 bg-card rounded-[1.25rem] overflow-hidden hover:border-foreground/20 hover:shadow-xl transition-all duration-300"
          >
            <Link
              href={`/cars/${car._id}`}
              className="block relative aspect-[4/3] w-full overflow-hidden bg-muted/40 cursor-pointer"
            >
              <Image
                src={car.images[0] || "/placeholder.svg"}
                alt={`${car.make} ${car.model}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <div className="p-4 sm:p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <Link href={`/cars/${car._id}`}>
                  <h3 className="text-xl font-medium tracking-tight text-foreground hover:underline">
                    {car.make} {car.model}
                  </h3>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mb-4 font-medium">
                {car.year} <span className="mx-1.5">&bull;</span> {car.transmission}{" "}
                <span className="mx-1.5">&bull;</span> {car.seats} Seats
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {car.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="bg-secondary/70 border border-border/50 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-semibold text-secondary-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                <span className="text-xl font-bold text-foreground">
                  ${car.pricePerDay}
                  <span className="text-xs font-normal text-muted-foreground">
                    /day
                  </span>
                </span>
                <button
                  onClick={() => setBookingCar(car)}
                  className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  <ShoppingCart size={16} /> Book
                </button>
              </div>
            </div>
          </div>
        ))}

        {cars.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-[1.25rem]">
            <h4 className="text-xl font-medium text-foreground mb-2">
              No vehicles found
            </h4>
            <p className="text-muted-foreground text-sm max-w-md">
              Try adjusting your filters on the left to see more options.
            </p>
          </div>
        )}
      </div>

      <BookingModal
        car={bookingCar}
        open={bookingCar !== null}
        onOpenChange={(open) => {
          if (!open) setBookingCar(null);
        }}
      />
    </>
  );
}
