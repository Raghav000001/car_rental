import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Car from "@/models/Car";

export async function GET() {
  try {
    await connectToDatabase();

    const carCount = await Car.countDocuments();
    if (carCount > 0) {
      return NextResponse.json({ message: "Database already seeded", count: carCount });
    }

    const mockCars = [
      {
        make: "Porsche",
        model: "911 Carrera",
        year: 2024,
        type: "Sports",
        pricePerDay: 450,
        images: ["https://images.unsplash.com/photo-1503371060967-ba4faab7cea5?q=80&w=1000", "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000"],
        features: ["Leather Seats", "Bluetooth", "Navigation", "Heated Seats"],
        description: "Experience the thrill of a classic sports car with the Porsche 911 Carrera.",
        transmission: "Automatic",
        seats: 2,
        fuelType: "Petrol",
        available: true,
      },
      {
        make: "BMW",
        model: "M4 Competition",
        year: 2025,
        type: "Sports",
        pricePerDay: 380,
        images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000"],
        features: ["Premium Audio", "Sport Exhaust", "Sunroof"],
        description: "A perfect blend of luxury and track-ready performance.",
        transmission: "Automatic",
        seats: 4,
        fuelType: "Petrol",
        available: true,
      },
      {
        make: "Audi",
        model: "R8 V10 Performance",
        year: 2023,
        type: "Sports",
        pricePerDay: 600,
        images: ["https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1000"],
        features: ["Carbon Fiber Trim", "AWD", "Laser Lights"],
        description: "The ultimate supercar experience, powered by a roaring V10 engine.",
        transmission: "Automatic",
        seats: 2,
        fuelType: "Petrol",
        available: true,
      },
      {
        make: "Mercedes-Benz",
        model: "G-Class G63 AMG",
        year: 2024,
        type: "SUV",
        pricePerDay: 500,
        images: ["https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1000"],
        features: ["Massage Seats", "Off-Road Package", "360 Camera"],
        description: "Iconic luxury SUV that commands attention on any road.",
        transmission: "Automatic",
        seats: 5,
        fuelType: "Petrol",
        available: true,
      }
    ];

    await Car.insertMany(mockCars);

    return NextResponse.json({ message: "Seed successful", count: mockCars.length });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed data" }, { status: 500 });
  }
}
