import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase";
import { SERVICE_LABELS } from "@/lib/bookings";
import { quoteBreakdown, type Condition } from "@/lib/pricing-data";
import { Resend } from "resend";
import { isConnected as isJobberConnected } from "@/lib/jobber/tokens";
import { pushBookingToJobber } from "@/lib/jobber/sync";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Input validation schema ───────────────────────────────────────────────────

const BookingSchema = z.object({
  name:         z.string().min(1).max(120),
  email:        z.string().email().max(254),
  phone:        z.string().min(7).max(20),
  address:      z.string().min(5).max(200),
  unit:         z.string().max(20).optional(),
  neighborhood: z.string().max(80).optional(),
  service:      z.enum(["standard", "deep", "moveinout"]),
  homeType:     z.string().max(40).optional(),
  bedrooms:     z.number().int().min(0).max(20),
  bathrooms:    z.string().max(10).optional(),
  sqft:         z.string().max(20).optional(),
  heavyDuty:    z.boolean().optional(),
  condition:    z.enum(["light", "normal", "heavy"]).optional(),
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
  const condition: Condition =
    body.condition ?? (body.heavyDuty ? "heavy" : "normal");

  const price = Math.max(
    0,
    quoteBreakdown({
      service:   body.service,
      bedrooms:  body.bedrooms,
      bathrooms: body.bathrooms ?? "1",
      frequency: (body.frequency ?? "one-time") as any,
      sqft:      body.sqft ?? null,
      condition,
      addOns,
    }).total - promoDiscount,
  );

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

  const ownerEmail  = process.env.OWNER_EMAIL ?? "hello@capitolshinecleaners.com";
  const fromAddress = "Capitol Shine <bookings@capitolshinecleaners.com>";

  // 2. Send the customer confirmation email. Jobber doesn't auto-email on
  //    Request creation, so this is the customer's instant acknowledgment
  //    until the owner schedules the request in Jobber (Jobber sends the
  //    confirmed-appointment email at that point).
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

  // 3. Push to Jobber (Client + Request). Owner notifications happen via
  //    Jobber's own email + mobile push, so the prior Resend owner email
  //    and Twilio SMS have been removed. We await inline because Vercel's
  //    serverless runtime kills any background promise as soon as the
  //    response is returned. The booking is already saved above, so even
  //    if Jobber is slow or fails, the customer's confirmation is safe.
  if (await isJobberConnected()) {
    const outcome = await pushBookingToJobber({
      id:            data.id,
      customer_name: body.name,
      email:         body.email,
      phone:         body.phone,
      address:       fullAddress,
      service:       body.service,
      service_label: serviceLabel,
      bedrooms:      body.bedrooms,
      bathrooms:     body.bathrooms ?? null,
      sqft:          body.sqft ?? null,
      frequency:     body.frequency ?? null,
      date:          body.date,
      time_window:   body.timeWindow ?? null,
      instructions:  body.instructions ?? null,
      price,
    });
    if (!outcome.ok) {
      console.error("Jobber sync failed:", outcome.error);
    }
  } else {
    await supabaseAdmin
      .from("bookings")
      .update({ jobber_sync_status: "skipped" })
      .eq("id", data.id);
  }

  return NextResponse.json({ success: true, id: data.id });
}

// ── Email Templates ───────────────────────────────────────────────────────────
// Owner-side email removed: Jobber sends its own new-request notification.

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
