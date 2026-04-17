import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase";
import { rowToJob } from "@/lib/jobs";
import { syncJobToCalendar, deleteJobFromCalendar } from "@/lib/google-calendar";

const EDITABLE = [
  "client_id",
  "assigned_cleaner_id",
  "service_type",
  "status",
  "scheduled_date",
  "scheduled_time_start",
  "scheduled_time_end",
  "actual_start_time",
  "actual_end_time",
  "price",
  "notes",
  "recurring",
  "recurrence_rule",
] as const;

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("*, clients(name), cleaners(name)")
    .eq("id", params.id)
    .single();

  if (error || !data) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(rowToJob(data));
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  for (const k of EDITABLE) {
    if (k in body) patch[k] = body[k] ?? null;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "No fields." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("jobs")
    .update(patch)
    .eq("id", params.id)
    .select("*, clients(name), cleaners(name)")
    .single();

  if (error) {
    console.error("Job update error:", error);
    return NextResponse.json({ error: "Failed to update job." }, { status: 500 });
  }

  syncJobToCalendar(data.id).catch(() => {});
  return NextResponse.json(rowToJob(data));
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  const { data: existing } = await supabase
    .from("jobs")
    .select("google_event_id")
    .eq("id", params.id)
    .maybeSingle();
  const { error } = await supabase.from("jobs").delete().eq("id", params.id);
  if (error) {
    console.error("Job delete error:", error);
    return NextResponse.json({ error: "Failed to delete job." }, { status: 500 });
  }
  deleteJobFromCalendar(existing?.google_event_id ?? null).catch(() => {});
  return NextResponse.json({ success: true });
}
