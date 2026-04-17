import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { Resend } from "resend";
import twilio from "twilio";
import { smsBody, emailSubject, emailHtml } from "@/lib/reminder-templates";

export const dynamic = "force-dynamic";

// Runs every 15 min (see vercel.json). Sends reminders 18–26h before job start.
// Idempotent via reminder_log — a job won't get the same channel twice within 48h.

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const provided =
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    req.nextUrl.searchParams.get("secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const now = new Date();
  const windowStart = new Date(now.getTime() + 18 * 60 * 60 * 1000);
  const windowEnd = new Date(now.getTime() + 26 * 60 * 60 * 1000);

  const fromDate = windowStart.toISOString().slice(0, 10);
  const toDate = windowEnd.toISOString().slice(0, 10);

  const { data: candidates, error } = await supabase
    .from("jobs")
    .select("id, scheduled_date, scheduled_time_start, service_type, status, clients(name, email, phone, service_address, address)")
    .eq("status", "scheduled")
    .gte("scheduled_date", fromDate)
    .lte("scheduled_date", toDate);

  if (error) {
    console.error("[cron/reminders] query error:", error);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }

  const due = (candidates ?? []).filter((j) => {
    const start = new Date(`${j.scheduled_date}T${j.scheduled_time_start}`);
    return start >= windowStart && start <= windowEnd;
  });

  if (due.length === 0) {
    return NextResponse.json({ checked: candidates?.length ?? 0, sent: 0 });
  }

  const jobIds = due.map((j) => j.id);
  const since = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString();
  const { data: alreadySent } = await supabase
    .from("reminder_log")
    .select("job_id, channel")
    .in("job_id", jobIds)
    .gte("sent_at", since);

  const sentSet = new Set((alreadySent ?? []).map((r) => `${r.job_id}:${r.channel}`));

  const resend = new Resend(process.env.RESEND_API_KEY);
  const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const fromEmail = process.env.REMINDER_FROM_EMAIL ?? "Capitol Shine <bookings@capitolshinecleaners.com>";
  const replyTo = process.env.OWNER_EMAIL ?? "hello@capitolshinecleaners.com";

  let smsSent = 0;
  let emailSent = 0;
  const errors: string[] = [];

  for (const job of due) {
    const client = job.clients as
      | { name?: string; email?: string; phone?: string; service_address?: string; address?: string }
      | null;
    if (!client) continue;

    const ctx = {
      clientName: client.name ?? "there",
      serviceType: job.service_type,
      scheduledDate: job.scheduled_date,
      scheduledTimeStart: job.scheduled_time_start,
      serviceAddress: client.service_address ?? client.address ?? null,
    };

    // SMS
    if (client.phone && !sentSet.has(`${job.id}:sms`)) {
      try {
        const msg = await twilioClient.messages.create({
          body: smsBody(ctx),
          from: process.env.TWILIO_FROM_NUMBER,
          to: client.phone,
        });
        await supabase.from("reminder_log").insert({
          job_id: job.id,
          channel: "sms",
          provider_id: msg.sid,
        });
        smsSent++;
      } catch (e) {
        console.error("[cron/reminders] SMS failed:", e);
        errors.push(`sms:${job.id}`);
      }
    }

    // Email
    if (client.email && !sentSet.has(`${job.id}:email`)) {
      try {
        const res = await resend.emails.send({
          from: fromEmail,
          replyTo,
          to: client.email,
          subject: emailSubject(ctx),
          html: emailHtml(ctx),
        });
        await supabase.from("reminder_log").insert({
          job_id: job.id,
          channel: "email",
          provider_id: res.data?.id ?? null,
        });
        emailSent++;
      } catch (e) {
        console.error("[cron/reminders] Email failed:", e);
        errors.push(`email:${job.id}`);
      }
    }
  }

  return NextResponse.json({
    checked: candidates?.length ?? 0,
    due: due.length,
    smsSent,
    emailSent,
    errors,
  });
}
