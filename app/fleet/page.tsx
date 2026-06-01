import connectToDatabase from "@/lib/mongodb";
import Car from "@/models/Car";
import { FleetSidebar } from "@/components/fleet-sidebar";
import { Suspense } from "react";
import { FleetGrid } from "@/components/fleet-grid";

export default async function FleetPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { make, type, transmission } = await searchParams;
  await connectToDatabase();
  
  const query: Record<string, unknown> = {};
  if (make) query.make = { $in: make.split(",") };
  if (type) query.type = { $in: type.split(",") };
  if (transmission) query.transmission = transmission;
  
  const cars = await Car.find(query).lean();
  const serialized = JSON.parse(JSON.stringify(cars));

  return (
    <main className="min-h-screen bg-background pt-24 px-6 md:px-12 lg:px-20 pb-32">
      <div className="mb-8 border-b border-border pb-6">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">Our Fleet ({cars.length})</h1>
        <p className="mt-2 text-muted-foreground text-sm">
          Browse luxury and performance vehicles
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-10">
        <Suspense fallback={<div className="w-64 h-96 bg-muted/20 animate-pulse rounded-[1.25rem]" />}>
          <FleetSidebar />
        </Suspense>

        <div className="flex-1 w-full">
          <FleetGrid cars={serialized} />
        </div>
      </div>
    </main>
  );
}
