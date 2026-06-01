import connectToDatabase from "@/lib/mongodb";
import Car from "@/models/Car";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  await connectToDatabase();
  
  if (!id || id.length !== 24) {
    notFound();
  }
  
  const car = await Car.findById(id).lean();
  
  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pt-24 px-6 md:px-12 lg:px-20 pb-32">
      <div className="mb-8 flex items-center text-sm text-muted-foreground">
        <Link href="/fleet" className="hover:text-foreground transition-colors">Our Fleet</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{car.make} {car.model}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-secondary/20">
            <Image
              src={car.images[0] || "/placeholder.svg"}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover"
              priority
            />
          </div>
          {car.images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {car.images.slice(1).map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-video w-full overflow-hidden rounded-lg bg-secondary/20">
                  <Image src={img} alt={`Additional view ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-2">{car.make} {car.model}</h1>
          <p className="text-xl text-muted-foreground mb-6">{car.year} • {car.type}</p>
          
          <div className="text-3xl font-bold mb-8">
            ${car.pricePerDay}<span className="text-lg text-muted-foreground font-normal">/day</span>
          </div>

          <p className="text-base text-foreground leading-relaxed mb-8">
            {car.description}
          </p>

          <div className="grid grid-cols-2 gap-y-4 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Transmission:</span>
              <span className="font-medium">{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Fuel Type:</span>
              <span className="font-medium">{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Seats:</span>
              <span className="font-medium">{car.seats}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Availability:</span>
              <span className="font-medium text-emerald-500">{car.available ? "Available" : "Booked"}</span>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-medium mb-4">Features</h3>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {car.features.map((f: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/fleet?carId=${car._id}`}
            className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-foreground text-background py-4 px-8 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Browse All Cars
          </Link>
        </div>
      </div>
    </main>
  );
}
