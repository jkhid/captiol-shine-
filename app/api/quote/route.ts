import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import twilio from "twilio";

const resend = new Resend(process.env.RESEND_API_KEY);

const QuoteSchema = z.object({
  name:        z.string().min(1).max(120),
  email:       z.string().email().max(254),
  phone:       z.string().min(7).max(20),
  serviceType: z.enum(["commercial", "construction"]),
  spaceType:   z.string().max(60).optional(),
  sqft:        z.string().max(20).optional(),
  frequency:   z.string().max(60).optional(),
  timeline:    z.string().max(100).optional(),
  notes:       z.string().max(1000).optional(),
});

function esc(val: unknown): string {
  return String(val ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: NextRequest) {
  let body: z.infer<typeof QuoteSchema>;
  try {
    const raw = await req.json();
    body = QuoteSchema.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request data." }, { status: 400 });
  }

  const serviceLabel = body.serviceType === "commercial" ? "Commercial Cleaning" : "Post-Construction Cleanup";

  // 1. Save to Supabase
  const { error } = await supabase.from("quotes").insert({
    name:         body.name,
    email:        body.email,
    phone:        body.phone,
    service_type: body.serviceType,
    space_type:   body.spaceType || null,
    sqft:         body.sqft || null,
    frequency:    body.frequency || null,
    timeline:     body.timeline || null,
    notes:        body.notes || null,
    status:       "new",
  });

  if (error) {
    console.error("Supabase quote insert error:", error);
    return NextResponse.json({ error: "Failed to save quote request." }, { status: 500 });
  }

  const ownerEmail  = process.env.OWNER_EMAIL ?? "hello@capitolshinecleaners.com";
  const fromAddress = "Capitol Shine <onboarding@resend.dev>";

  // 2. Notify owner via email
  try {
    await resend.emails.send({
      from:    fromAddress,
      to:      ownerEmail,
      subject: `New Quote Request — ${body.name} (${serviceLabel})`,
      html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#333">
  <h2 style="color:#1B2A4A;margin-bottom:20px">New Quote Request — ${esc(serviceLabel)}</h2>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:8px 12px 8px 0;color:#888;font-size:13px;white-space:nowrap">Name</td><td style="padding:8px 0;font-size:14px;font-weight:600">${esc(body.name)}</td></tr>
    <tr><td style="padding:8px 12px 8px 0;color:#888;font-size:13px;white-space:nowrap">Phone</td><td style="padding:8px 0;font-size:14px;font-weight:600"><a href="tel:${esc(body.phone)}">${esc(body.phone)}</a></td></tr>
    <tr><td style="padding:8px 12px 8px 0;color:#888;font-size:13px;white-space:nowrap">Email</td><td style="padding:8px 0;font-size:14px;font-weight:600"><a href="mailto:${esc(body.email)}">${esc(body.email)}</a></td></tr>
    <tr><td style="padding:8px 12px 8px 0;color:#888;font-size:13px;white-space:nowrap">Service</td><td style="padding:8px 0;font-size:14px;font-weight:600">${esc(serviceLabel)}</td></tr>
    ${body.spaceType ? `<tr><td style="padding:8px 12px 8px 0;color:#888;font-size:13px;white-space:nowrap">Space / Project Type</td><td style="padding:8px 0;font-size:14px;font-weight:600">${esc(body.spaceType)}</td></tr>` : ""}
    ${body.sqft ? `<tr><td style="padding:8px 12px 8px 0;color:#888;font-size:13px;white-space:nowrap">Sq Footage</td><td style="padding:8px 0;font-size:14px;font-weight:600">${esc(body.sqft)}</td></tr>` : ""}
    ${body.frequency ? `<tr><td style="padding:8px 12px 8px 0;color:#888;font-size:13px;white-space:nowrap">Frequency</td><td style="padding:8px 0;font-size:14px;font-weight:600">${esc(body.frequency)}</td></tr>` : ""}
    ${body.timeline ? `<tr><td style="padding:8px 12px 8px 0;color:#888;font-size:13px;white-space:nowrap">Timeline</td><td style="padding:8px 0;font-size:14px;font-weight:600">${esc(body.timeline)}</td></tr>` : ""}
  </table>
  ${body.notes ? `<div style="margin-top:16px;padding:12px;background:#f5f5f5;border-radius:8px;font-size:13px;color:#555"><strong>Notes:</strong> ${esc(body.notes)}</div>` : ""}
  <p style="margin-top:24px;font-size:12px;color:#aaa">Capitol Shine — Quote Request Notification</p>
</div>`,
    });
  } catch (e) {
    console.error("Resend quote email error:", e);
  }

  // 3. Notify owner via SMS
  try {
    const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await twilioClient.messages.create({
      body: `New Capitol Shine quote request!\n${body.name} — ${serviceLabel}\n${body.spaceType ?? ""}${body.sqft ? `, ${body.sqft} sq ft` : ""}\nPhone: ${body.phone}`,
      from: process.env.TWILIO_FROM_NUMBER,
      to:   process.env.OWNER_PHONE!,
    });
  } catch (e) {
    console.error("Twilio quote SMS error:", e);
  }

  return NextResponse.json({ success: true });
}
