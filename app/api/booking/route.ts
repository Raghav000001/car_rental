import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { sendBookingEmails, type BookingEmailPayload } from "@/lib/mail";
import Booking from "@/models/Booking";

function timeout(ms: number) {
  return new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("operation timed out")), ms)
  );
}

function saveBooking(data: BookingEmailPayload) {
  setImmediate(async () => {
    try {
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.MONGODB_URI!, {
          serverSelectionTimeoutMS: 5000,
          connectTimeoutMS: 5000,
        });
      }
      await Booking.create({
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        carName: data.carName,
        pickupDate: data.pickupDate,
        returnDate: data.returnDate,
        days: data.days,
        pricePerDay: data.pricePerDay,
        totalPrice: data.totalPrice,
        notes: data.notes,
      });
    } catch (e) {
      console.error("DB save failed:", e);
    }
  });
}

export async function POST(request: Request) {
  try {
    const body: BookingEmailPayload & { _action?: string } =
      await request.json();

    const required = [
      "customerName",
      "customerEmail",
      "customerPhone",
      "carName",
      "pickupDate",
      "returnDate",
    ] as const;

    for (const field of required) {
      if (!body[field as keyof BookingEmailPayload]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.customerEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!body.customerPhone || body.customerPhone.length < 6) {
      return NextResponse.json(
        { error: "Valid phone number is required" },
        { status: 400 }
      );
    }

    saveBooking(body);

    let emailSent = false;
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      !process.env.SMTP_USER.includes("YOUR_EMAIL")
    ) {
      try {
        await Promise.race([sendBookingEmails(body), timeout(5000)]);
        emailSent = true;
      } catch (emailError) {
        console.error("Email sending failed (non-fatal):", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: emailSent
        ? "Booking request submitted! Check your email for confirmation."
        : "Booking request submitted! We will contact you shortly.",
    });
  } catch (error) {
    console.error("Booking API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to process booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
