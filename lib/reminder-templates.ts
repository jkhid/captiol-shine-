import { formatTime, serviceTypeLabel, type JobServiceType } from "@/lib/jobs";

interface ReminderContext {
  clientName: string;
  serviceType: JobServiceType;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTimeStart: string; // HH:MM:SS
  serviceAddress: string | null;
}

function friendlyDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
}

export function smsBody(ctx: ReminderContext): string {
  const time = formatTime(ctx.scheduledTimeStart);
  return `Hi ${ctx.clientName.split(" ")[0]}, this is a friendly reminder from Capitol Shine — your ${serviceTypeLabel(ctx.serviceType).toLowerCase()} is scheduled for ${friendlyDate(ctx.scheduledDate)} at ${time}. Reply STOP to opt out.`;
}

export function emailSubject(ctx: ReminderContext): string {
  return `Reminder: Your Capitol Shine cleaning is ${friendlyDate(ctx.scheduledDate)}`;
}

export function emailHtml(ctx: ReminderContext): string {
  const time = formatTime(ctx.scheduledTimeStart);
  const address = ctx.serviceAddress ? `<tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px">Address</td><td style="font-size:14px;font-weight:600">${ctx.serviceAddress}</td></tr>` : "";
  return `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#333">
  <h2 style="color:#1B2A4A;margin-bottom:8px">See you tomorrow!</h2>
  <p style="color:#666;margin-bottom:24px">Hi ${ctx.clientName.split(" ")[0]}, this is a reminder that your Capitol Shine cleaning is coming up.</p>
  <div style="background:#f9f9f9;border-radius:12px;padding:20px;margin-bottom:24px">
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px">Service</td><td style="font-size:14px;font-weight:600">${serviceTypeLabel(ctx.serviceType)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px">Date</td><td style="font-size:14px;font-weight:600">${friendlyDate(ctx.scheduledDate)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px">Time</td><td style="font-size:14px;font-weight:600">${time}</td></tr>
      ${address}
    </table>
  </div>
  <p style="color:#666;font-size:14px">Questions or need to reschedule? Reply to this email or call us anytime.</p>
  <p style="margin-top:32px;font-size:12px;color:#aaa">Capitol Shine — Arlington, VA</p>
</div>`;
}
