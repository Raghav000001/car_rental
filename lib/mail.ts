import nodemailer from "nodemailer";

export interface BookingEmailPayload {
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
}

function generateBookingHtml(data: BookingEmailPayload): string {
  const rows = [
    ["Vehicle", data.carName],
    ["Pickup Date", data.pickupDate],
    ["Return Date", data.returnDate],
    ["Duration", `${data.days} day(s)`],
    ["Price per Day", `$${data.pricePerDay.toFixed(2)}`],
    ["Total Estimated Price", `$${data.totalPrice.toFixed(2)}`],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 0;font-size:14px;color:#737373;width:40%;">${label}</td><td style="padding:6px 0;font-size:14px;color:#0a0a0a;font-weight:500;">${value}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
<tr><td align="center">
<table role="presentation" width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
<tr><td style="padding:40px 40px 0 40px;">
<h1 style="margin:0 0 8px 0;font-size:24px;font-weight:600;color:#0a0a0a;letter-spacing:-0.03em;">Booking Request Received</h1>
<p style="margin:0 0 4px 0;font-size:15px;color:#737373;line-height:1.5;">Hi <strong style="color:#0a0a0a;">${data.customerName}</strong>,</p>
<p style="margin:0 0 24px 0;font-size:15px;color:#737373;line-height:1.5;">Thank you for your booking request with <strong style="color:#0a0a0a;">Rohit Tours &amp; Travels</strong>! We've received your details and will get back to you shortly.</p>
</td></tr>
<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e5e5;margin:0;" /></td></tr>
<tr><td style="padding:24px 40px;">
<h2 style="margin:0 0 16px 0;font-size:13px;font-weight:600;color:#737373;text-transform:uppercase;letter-spacing:0.05em;">Booking Details</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
</td></tr>
<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e5e5;margin:0;" /></td></tr>
${data.notes ? `<tr><td style="padding:24px 40px 0 40px;"><p style="margin:0;font-size:14px;color:#737373;"><strong style="color:#0a0a0a;">Your notes:</strong> "${data.notes}"</p></td></tr>` : ""}
<tr><td style="padding:24px 40px 40px 40px;">
<p style="margin:0 0 20px 0;font-size:14px;color:#737373;line-height:1.5;">If you have any questions or need to modify your booking, please contact us.</p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#0a0a0a;border-radius:8px;padding:12px 28px;text-align:center;"><a href="mailto:${process.env.CONTACT_EMAIL || "info@rohittours.com"}" style="color:#ffffff;font-size:14px;font-weight:500;text-decoration:none;display:inline-block;">Contact Us</a></td></tr></table>
</td></tr>
<tr><td style="background:#fafafa;padding:24px 40px;"><p style="margin:0;font-size:12px;color:#a3a3a3;text-align:center;">Rohit Tours &amp; Travels &mdash; We look forward to serving you!</p></td></tr>
</table></td></tr></table></body></html>`;
}

function generateAdminHtml(data: BookingEmailPayload): string {
  const rows = [
    ["Customer", data.customerName],
    ["Email", data.customerEmail],
    ["Phone", data.customerPhone],
    ["Vehicle", data.carName],
    ["Pickup", data.pickupDate],
    ["Return", data.returnDate],
    ["Duration", `${data.days} day(s)`],
    ["Total", `$${data.totalPrice.toFixed(2)}`],
  ];
  if (data.notes) rows.push(["Notes", data.notes]);

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
<tr><td align="center">
<table role="presentation" width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
<tr><td style="padding:40px 40px 24px 40px;">
<h1 style="margin:0 0 4px 0;font-size:22px;font-weight:600;color:#0a0a0a;">New Booking Request</h1>
<p style="margin:0;font-size:14px;color:#737373;">A new booking has been submitted.</p>
</td></tr>
<tr><td style="padding:0 40px 24px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:8px;">
${rows.map(([l, v]) => `<tr><td style="padding:10px 16px;font-size:13px;color:#737373;border-bottom:1px solid #f5f5f5;width:35%;">${l}</td><td style="padding:10px 16px;font-size:13px;color:#0a0a0a;font-weight:500;border-bottom:1px solid #f5f5f5;">${v}</td></tr>`).join("")}
</table></td></tr></table></td></tr></table></body></html>`;
}

export function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Email service not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env"
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function sendBookingEmails(data: BookingEmailPayload) {
  const transporter = createTransporter();
  const from = `"Rohit Tours & Travels" <${process.env.SMTP_USER}>`;
  const adminEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

  await transporter.sendMail({
    from,
    to: data.customerEmail,
    subject: `Booking Request - ${data.carName} | Rohit Tours & Travels`,
    html: generateBookingHtml(data),
  });

  await transporter.sendMail({
    from,
    to: adminEmail!,
    subject: `New Booking: ${data.customerName} - ${data.carName}`,
    html: generateAdminHtml(data),
  });
}
