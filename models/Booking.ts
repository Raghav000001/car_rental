import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  carName: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  pricePerDay: number;
  totalPrice: number;
  notes?: string;
  emailSent: boolean;
}

const BookingSchema = new Schema<IBooking>(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    carName: { type: String, required: true },
    pickupDate: { type: String, required: true },
    returnDate: { type: String, required: true },
    days: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    notes: { type: String },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
