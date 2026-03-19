import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase";
import { SERVICE_LABELS } from "@/lib/bookings";
import { estimatePrice } from "@/lib/pricing-data";
import { Resend } from "resend";
import twilio from "twilio";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Input validation schema ───────────────────────────────────────────────────

const BookingSchema = z.object({
  name:         z.string().min(1).max(120),
  email:        z.string().email().max(254),
  phone:        z.string().min(7).max(20),
  address:      z.string().min(5).max(200),
  unit:         z.string().max(20).optional(),
  neighborhood: z.string().max(80).optional(),
  service:      z.enum(["standard", "deep", "moveinout", "airbnb"]),
  homeType:     z.string().max(40).optional(),
  bedrooms:     z.number().int().min(0).max(20),
  bathrooms:    z.string().max(10).optional(),
  sqft:         z.string().max(20).optional(),
  frequency:    z.string().max(20).optional(),
  date:         z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeWindow:   z.string().max(20).optional(),
  addOns:       z.array(z.string().max(80)).max(10).optional(),
  instructions: z.string().max(1000).optional(),
  hearAbout:    z.string().max(80).optional(),
  referralCode: z.string().max(40).optional(),
  promoCode:    z.string().max(40).optional(),
});

// ── HTML escaping ─────────────────────────────────────────────────────────────

function esc(val: unknown): string {
  return String(val ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: z.infer<typeof BookingSchema>;
  try {
    const raw = await req.json();
    body = BookingSchema.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid booking data." }, { status: 400 });
  }

  // Validate date is in the future and not a Sunday
  const bookingDate = new Date(body.date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (bookingDate < today) {
    return NextResponse.json({ error: "Booking date must be in the future." }, { status: 400 });
  }
  if (bookingDate.getDay() === 0) {
    return NextResponse.json({ error: "We don't operate on Sundays." }, { status: 400 });
  }

  const serviceLabel = SERVICE_LABELS[body.service] ?? body.service;
  const fullAddress = body.unit ? `${body.address}, ${body.unit}` : body.address;
  const addOns = body.addOns ?? [];

  // Validate promo code — FIRST30 is only valid for first-time customers
  const supabaseAdmin = createAdminClient();
  let promoDiscount = 0;
  if (body.promoCode?.toUpperCase() === "FIRST30") {
    const { data: prior } = await supabaseAdmin
      .from("bookings")
      .select("id")
      .eq("email", body.email.toLowerCase())
      .neq("status", "cancelled")
      .limit(1)
      .single();
    if (prior) {
      return NextResponse.json({ error: "Promo code FIRST30 is only valid for your first booking." }, { status: 400 });
    }
    promoDiscount = 30;
  }

  // Server-side price computation — never trust client-supplied price
  const price = Math.max(0, estimatePrice(body.service, body.bedrooms, body.frequency ?? "one-time", addOns) - promoDiscount);

  // 1. Save booking to Supabase
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .insert({
      customer_name: body.name,
      email:         body.email,
      phone:         body.phone,
      address:       fullAddress,
      neighborhood:  body.neighborhood,
      service:       body.service,
      service_label: serviceLabel,
      home_type:     body.homeType,
      bedrooms:      body.bedrooms,
      bathrooms:     body.bathrooms,
      sqft:          body.sqft,
      frequency:     body.frequency,
      date:          body.date,
      time_window:   body.timeWindow,
      add_ons:       addOns,
      price,
      status:        "pending",
      notes:         body.instructions || null,
      hear_about:    body.hearAbout || null,
      referral_code: body.referralCode || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Failed to save booking." }, { status: 500 });
  }

  const ownerEmail  = process.env.OWNER_EMAIL ?? "hello@capitolshinecleaning.co";
  const fromAddress = "Capitol Shine <bookings@capitolshinecleaning.co>";

  // 2. Send owner notification email
  try {
    await resend.emails.send({
      from:    fromAddress,
      to:      ownerEmail,
      subject: `New Booking — ${body.name} (${serviceLabel})`,
      html:    ownerEmailHtml({ ...body, serviceLabel, fullAddress, price, bookingId: data.id }),
    });
  } catch (e) {
    console.error("Resend owner email error:", e);
  }

  // 3. Send customer confirmation email
  try {
    await resend.emails.send({
      from:     fromAddress,
      replyTo:  ownerEmail,
      to:       body.email,
      subject:  "We received your booking — Capitol Shine",
      html:     customerEmailHtml({ ...body, serviceLabel, fullAddress, price }),
    });
  } catch (e) {
    console.error("Resend customer email error:", e);
  }

  // 4. Send owner SMS via Twilio
  try {
    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    await twilioClient.messages.create({
      body: `New Capitol Shine booking!\n${body.name} — ${serviceLabel}\n${body.date} (${String(body.timeWindow ?? "").replace("-", " ")})\n$${price}\nPhone: ${body.phone}`,
      from: process.env.TWILIO_FROM_NUMBER,
      to:   process.env.OWNER_PHONE!,
    });
  } catch (e) {
    console.error("Twilio SMS error:", e);
  }

  return NextResponse.json({ success: true, id: data.id });
}

// ── Email Templates ───────────────────────────────────────────────────────────

function ownerEmailHtml(b: z.infer<typeof BookingSchema> & {
  serviceLabel: string; fullAddress: string; price: number; bookingId: string;
}) {
  const rows: [string, string][] = [
    ["Customer",     esc(b.name)],
    ["Service",      esc(b.serviceLabel)],
    ["Date",         `${esc(b.date)} (${esc(String(b.timeWindow ?? "").replace("-", " "))})`],
    ["Address",      esc(b.fullAddress)],
    ["Neighborhood", esc(b.neighborhood)],
    ["Home",         `${esc(b.homeType)}, ${esc(b.bedrooms)} BR`],
    ["Frequency",    esc(String(b.frequency ?? "").replace("-", " "))],
    ["Price",        `$${esc(b.price)}`],
    ["Phone",        `<a href="tel:${esc(b.phone)}">${esc(b.phone)}</a>`],
    ["Email",        `<a href="mailto:${esc(b.email)}">${esc(b.email)}</a>`],
    ...(Array.isArray(b.addOns) && b.addOns.length > 0
      ? [["Add-Ons", esc(b.addOns.join(", "))] as [string, string]]
      : []),
  ];

  return `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#333">
  <h2 style="color:#1B2A4A;margin-bottom:20px">New Booking Received</h2>
  <table style="width:100%;border-collapse:collapse">
    ${rows.map(([label, value]) => `
    <tr>
      <td style="padding:8px 12px 8px 0;color:#888;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:8px 0;font-size:14px;font-weight:600">${value}</td>
    </tr>`).join("")}
  </table>
  ${b.instructions
    ? `<div style="margin-top:16px;padding:12px;background:#f5f5f5;border-radius:8px;font-size:13px;color:#555">
      <strong>Notes:</strong> ${esc(b.instructions)}
    </div>`
    : ""}
  <p style="margin-top:24px;font-size:12px;color:#aaa">Capitol Shine — Admin Notification</p>
</div>`;
}

function customerEmailHtml(b: z.infer<typeof BookingSchema> & {
  serviceLabel: string; fullAddress: string; price: number;
}) {
  return `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#333">
  <h2 style="color:#1B2A4A;margin-bottom:8px">We received your booking!</h2>
  <p style="color:#666;margin-bottom:24px">Hi ${esc(b.name)}, thank you for choosing Capitol Shine. We'll confirm your appointment within 30 minutes.</p>
  <div style="background:#f9f9f9;border-radius:12px;padding:20px;margin-bottom:24px">
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px">Service</td><td style="font-size:14px;font-weight:600">${esc(b.serviceLabel)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px">Date</td><td style="font-size:14px;font-weight:600">${esc(b.date)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px">Address</td><td style="font-size:14px;font-weight:600">${esc(b.fullAddress)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px">Estimated Price</td><td style="font-size:14px;font-weight:600;color:#3A7D5C">$${esc(b.price)}</td></tr>
    </table>
  </div>
  <p style="color:#666;font-size:14px">Questions? Reply to this email or call/text us anytime.</p>
  <p style="margin-top:32px;font-size:12px;color:#aaa">Capitol Shine — Arlington, VA</p>
</div>`;
}
