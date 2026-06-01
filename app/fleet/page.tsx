import connectToDatabase from "@/lib/mongodb";
import Car from "@/models/Car";
import Image from "next/image";
import Link from "next/link";
import { FleetSidebar } from "@/components/fleet-sidebar";
import { Suspense } from "react";
import { ShoppingCart } from "lucide-react";

export default async function FleetPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { make, type, transmission } = await searchParams;
  await connectToDatabase();
  
  // Build dynamic complex query based on faceted URL filters
  const query: any = {};
  if (make) {
    query.make = { $in: make.split(",") };
  }
  if (type) {
    query.type = { $in: type.split(",") };
  }
  if (transmission) {
    query.transmission = transmission;
  }
  
  const cars = await Car.find(query).lean();

  return (
    <main className="min-h-screen bg-background pt-24 px-6 md:px-12 lg:px-20 pb-32">
      <div className="mb-8 border-b border-border pb-6">
        <h1 className="text-3xl font-medium tracking-tight text-foreground">Our Fleet ({cars.length})</h1>
        <p className="mt-2 text-muted-foreground text-sm">
          Browse luxury and performance vehicles
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Amazon-style Facet Sidebar wrapped in Suspense for useSearchParams */}
        <Suspense fallback={<div className="w-64 h-96 bg-muted/20 animate-pulse rounded-[1.25rem]"></div>}>
          <FleetSidebar />
        </Suspense>

        {/* Right Content */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-end mb-6 text-sm">
            <span className="text-muted-foreground">Sort By: <select className="bg-transparent border border-border rounded px-2 py-1 ml-2"><option>Recommended</option><option>Price: Low to High</option><option>Price: High to Low</option></select></span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            {cars.map((car: any) => (
              <div key={car._id.toString()} className="group flex flex-col border border-border/60 bg-card rounded-[1.25rem] overflow-hidden hover:border-foreground/20 hover:shadow-xl transition-all duration-300">
                <Link href={`/cars/${car._id}`} className="block relative aspect-[4/3] w-full overflow-hidden bg-muted/40 cursor-pointer">
                  <Image
                    src={car.images[0] || "/placeholder.svg"}
                    alt={`${car.make} ${car.model}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/cars/${car._id}`}>
                      <h3 className="text-xl font-medium tracking-tight text-foreground hover:underline">{car.make} {car.model}</h3>
                    </Link>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4 font-medium">{car.year} <span className="mx-1.5">•</span> {car.transmission} <span className="mx-1.5">•</span> {car.seats} Seats</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {car.features.slice(0, 3).map((feature: string, idx: number) => (
                      <span key={idx} className="bg-secondary/70 border border-border/50 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-semibold text-secondary-foreground">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                    <span className="text-xl font-bold text-foreground">${car.pricePerDay}<span className="text-xs font-normal text-muted-foreground">/day</span></span>
                    <button className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors">
                      <ShoppingCart size={16} /> Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {cars.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-[1.25rem]">
                <h4 className="text-xl font-medium text-foreground mb-2">No vehicles found</h4>
                <p className="text-muted-foreground text-sm max-w-md">Try adjusting your filters on the left to see more options.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
