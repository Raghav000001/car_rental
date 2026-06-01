import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICar extends Document {
  make: string;
  model: string;
  year: number;
  type: string;        // e.g. "SUV", "Sedan", "Sports", "Luxury"
  pricePerDay: number;
  images: string[];    // URLs to Cloudinary images
  features: string[];  // e.g. ["Bluetooth", "Leather Seats", "Sunroof"]
  description: string;
  transmission: string;// "Automatic" | "Manual"
  seats: number;
  fuelType: string;    // "Petrol", "Electric", "Hybrid"
  available: boolean;
}

const CarSchema = new Schema<ICar>(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    type: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    images: { type: [String], required: true },
    features: { type: [String], default: [] },
    description: { type: String, required: true },
    transmission: { type: String, required: true },
    seats: { type: Number, required: true },
    fuelType: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Car: Model<ICar> = mongoose.models.Car || mongoose.model<ICar>("Car", CarSchema);

export default Car;
