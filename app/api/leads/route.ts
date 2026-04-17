import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase";
import { Resend } from "resend";
import twilio from "twilio";

const LeadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  phone: z.string().min(7).max(20).optional().or(z.literal("")),
  source: z.string().max(40).optional(),
  consent: z.boolean().refine((v) => v === true, "Consent is required."),
});

const PROMO_CODE = "FIRST30";

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: NextRequest) {
  let body: z.infer<typeof LeadSchema>;
  try {
    body = LeadSchema.parse(await req.json());
  } catch (err) {
    const message = err instanceof z.ZodError ? err.issues[0]?.message : "Invalid input.";
    return NextResponse.json({ error: message ?? "Invalid input." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const phone = body.phone?.trim() || null;

  // Dedupe by email — return same code rather than creating dupes
  const { data: existing } = await supabase
    .from("leads")
    .select("id, promo_code")
    .ilike("email", body.email)
    .limit(1)
    .maybeSingle();

  let code = existing?.promo_code ?? PROMO_CODE;
  if (!existing) {
    const { error } = await supabase.from("leads").insert({
      name: body.name,
      email: body.email.toLowerCase(),
      phone,
      source: body.source ?? "lp",
      consent_marketing: body.consent,
      promo_code: PROMO_CODE,
    });
    if (error) {
      console.error("Lead insert error:", error);
      return NextResponse.json({ error: "Failed to save." }, { status: 500 });
    }
    code = PROMO_CODE;
  }

  const ownerEmail = process.env.OWNER_EMAIL ?? "hello@capitolshinecleaners.com";
  const fromAddress = "Capitol Shine <bookings@capitolshinecleaners.com>";
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Customer email with code
  try {
    await resend.emails.send({
      from: fromAddress,
      replyTo: ownerEmail,
      to: body.email,
      subject: "Your $30 Capitol Shine offer — saved for later",
      html: customerEmailHtml({ name: body.name, code }),
    });
  } catch (e) {
    console.error("Lead customer email error:", e);
  }

  // Owner notification (only for new leads, not duplicates)
  if (!existing) {
    try {
      await resend.emails.send({
        from: fromAddress,
        to: ownerEmail,
        subject: `New lead — ${body.name} (claimed $30 offer)`,
        html: ownerEmailHtml({ name: body.name, email: body.email, phone, source: body.source ?? "lp" }),
      });
    } catch (e) {
      console.error("Lead owner email error:", e);
    }

    if (process.env.OWNER_PHONE && process.env.TWILIO_ACCOUNT_SID) {
      try {
        const t = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        await t.messages.create({
          body: `New Capitol Shine lead: ${body.name}${phone ? ` · ${phone}` : ""} · ${body.email}`,
          from: process.env.TWILIO_FROM_NUMBER,
          to: process.env.OWNER_PHONE,
        });
      } catch (e) {
        console.error("Lead owner SMS error:", e);
      }
    }
  }

  return NextResponse.json({ success: true, code });
}

function customerEmailHtml({ name, code }: { name: string; code: string }) {
  return `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#333">
  <h2 style="color:#1B2A4A;margin-bottom:8px">Your $30 offer is locked in, ${esc(name.split(" ")[0])}!</h2>
  <p style="color:#666;margin-bottom:20px">Whenever you're ready for your Capitol Shine cleaning, use this code at checkout (or just mention it when you call):</p>
  <div style="background:#FEF4DB;border:2px dashed #D4A94B;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px">
    <p style="font-size:12px;color:#7a5d1f;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 6px">Your code</p>
    <p style="font-size:32px;font-weight:bold;color:#1B2A4A;letter-spacing:0.08em;margin:0">${esc(code)}</p>
    <p style="font-size:13px;color:#7a5d1f;margin:8px 0 0">$30 off your first cleaning</p>
  </div>
  <p style="color:#666;font-size:14px;line-height:1.55">When you're ready, book online at <a href="https://capitolshinecleaners.com/lp" style="color:#1B2A4A">capitolshinecleaners.com</a> or call us at <a href="tel:+17033759132" style="color:#1B2A4A">(703) 375-9132</a>.</p>
  <p style="color:#666;font-size:14px">No pressure, no spam. We'll send a friendly reminder once in a while.</p>
  <p style="margin-top:32px;font-size:12px;color:#aaa">Capitol Shine — Arlington, VA</p>
</div>`;
}

function ownerEmailHtml({ name, email, phone, source }: { name: string; email: string; phone: string | null; source: string }) {
  return `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#333">
  <h2 style="color:#1B2A4A;margin-bottom:16px">New Lead</h2>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px">Name</td><td style="font-size:14px;font-weight:600">${esc(name)}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px">Email</td><td style="font-size:14px;font-weight:600"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
    ${phone ? `<tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px">Phone</td><td style="font-size:14px;font-weight:600"><a href="tel:${esc(phone)}">${esc(phone)}</a></td></tr>` : ""}
    <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px">Source</td><td style="font-size:14px;font-weight:600">${esc(source)}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px">Consent</td><td style="font-size:14px;font-weight:600;color:#3A7D5C">Yes</td></tr>
  </table>
  <p style="margin-top:24px;font-size:12px;color:#aaa">Capitol Shine — Lead Capture</p>
</div>`;
}
