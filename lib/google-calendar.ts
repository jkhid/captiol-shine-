import { google, calendar_v3 } from "googleapis";
import { createAdminClient } from "@/lib/supabase";
import type { Job } from "@/lib/jobs";

const BUSINESS_TZ = "America/New_York";
const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

export function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Google OAuth env vars missing.");
  }
  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

export function getAuthUrl(state?: string) {
  const oauth = getOAuthClient();
  return oauth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
    state,
  });
}

async function getAuthorizedCalendar(): Promise<calendar_v3.Calendar | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("calendar_tokens")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!data) return null;

  const oauth = getOAuthClient();
  oauth.setCredentials({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expiry_date: new Date(data.expires_at).getTime(),
  });

  oauth.on("tokens", async (tokens) => {
    const patch: Record<string, unknown> = {};
    if (tokens.access_token) patch.access_token = tokens.access_token;
    if (tokens.refresh_token) patch.refresh_token = tokens.refresh_token;
    if (tokens.expiry_date) patch.expires_at = new Date(tokens.expiry_date).toISOString();
    if (Object.keys(patch).length > 0) {
      await createAdminClient().from("calendar_tokens").update(patch).eq("id", data.id);
    }
  });

  return google.calendar({ version: "v3", auth: oauth });
}

interface JobWithClient extends Job {
  _client?: { name: string; phone: string | null; serviceAddress: string | null };
}

function buildEvent(job: JobWithClient): calendar_v3.Schema$Event {
  const startDateTime = `${job.scheduledDate}T${job.scheduledTimeStart}`;
  const endDateTime = `${job.scheduledDate}T${job.scheduledTimeEnd}`;
  const c = job._client;

  const summary = `${c?.name ?? "Job"} · ${job.serviceType.replace(/_/g, " ")}`;
  const description = [
    c?.name ? `Client: ${c.name}` : null,
    c?.phone ? `Phone: ${c.phone}` : null,
    c?.serviceAddress ? `Address: ${c.serviceAddress}` : null,
    `Service: ${job.serviceType}`,
    job.price != null ? `Price: $${job.price}` : null,
    job.notes ? `\nNotes:\n${job.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const event: calendar_v3.Schema$Event = {
    summary,
    description,
    location: c?.serviceAddress ?? undefined,
    start: { dateTime: startDateTime, timeZone: BUSINESS_TZ },
    end: { dateTime: endDateTime, timeZone: BUSINESS_TZ },
  };

  if (job.recurring && job.recurrenceRule) {
    event.recurrence = [`RRULE:${job.recurrenceRule}`];
  }

  return event;
}

async function fetchJobWithClient(jobId: string): Promise<JobWithClient | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("jobs")
    .select("*, clients(name, phone, service_address, address)")
    .eq("id", jobId)
    .single();
  if (!data) return null;
  const client = data.clients as
    | { name?: string; phone?: string; service_address?: string; address?: string }
    | null;
  return {
    id: data.id,
    clientId: data.client_id,
    assignedCleanerId: data.assigned_cleaner_id ?? null,
    parentJobId: data.parent_job_id ?? null,
    serviceType: data.service_type,
    status: data.status,
    scheduledDate: data.scheduled_date,
    scheduledTimeStart: data.scheduled_time_start,
    scheduledTimeEnd: data.scheduled_time_end,
    actualStartTime: data.actual_start_time,
    actualEndTime: data.actual_end_time,
    actualDurationMinutes: data.actual_duration_minutes,
    price: data.price,
    notes: data.notes,
    recurring: data.recurring,
    recurrenceRule: data.recurrence_rule,
    googleEventId: data.google_event_id,
    reminderSentAt: data.reminder_sent_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    _client: client
      ? {
          name: client.name ?? "",
          phone: client.phone ?? null,
          serviceAddress: client.service_address ?? client.address ?? null,
        }
      : undefined,
  };
}

export async function syncJobToCalendar(jobId: string): Promise<void> {
  try {
    const calendar = await getAuthorizedCalendar();
    if (!calendar) return;
    const job = await fetchJobWithClient(jobId);
    if (!job) return;

    const event = buildEvent(job);
    const supabase = createAdminClient();

    if (job.googleEventId) {
      await calendar.events.update({
        calendarId: "primary",
        eventId: job.googleEventId,
        requestBody: event,
      });
    } else {
      const res = await calendar.events.insert({
        calendarId: "primary",
        requestBody: event,
      });
      const eventId = res.data.id;
      if (eventId) {
        await supabase.from("jobs").update({ google_event_id: eventId }).eq("id", jobId);
      }
    }
  } catch (err) {
    console.error("[google-calendar] sync failed:", err);
  }
}

export async function deleteJobFromCalendar(googleEventId: string | null): Promise<void> {
  if (!googleEventId) return;
  try {
    const calendar = await getAuthorizedCalendar();
    if (!calendar) return;
    await calendar.events.delete({ calendarId: "primary", eventId: googleEventId });
  } catch (err) {
    console.error("[google-calendar] delete failed:", err);
  }
}

export async function isGoogleConnected(): Promise<boolean> {
  const supabase = createAdminClient();
  const { count } = await supabase
    .from("calendar_tokens")
    .select("*", { count: "exact", head: true });
  return (count ?? 0) > 0;
}
