import { NextResponse } from "next/server";
import { sendBookingEmails, type BookingEmailPayload } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body: BookingEmailPayload & { _action?: string } = await request.json();

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

    if (!process.env.SMTP_HOST) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS in your .env file.",
        },
        { status: 500 }
      );
    }

    await sendBookingEmails(body);

    return NextResponse.json({
      success: true,
      message: "Booking request submitted! Check your email for confirmation.",
    });
  } catch (error) {
    console.error("Booking API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to process booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
