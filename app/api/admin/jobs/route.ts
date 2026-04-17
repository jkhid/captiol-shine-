import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase";
import { rowToJob, type JobInput } from "@/lib/jobs";
import { syncJobToCalendar } from "@/lib/google-calendar";

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sp = req.nextUrl.searchParams;
  const from = sp.get("from");
  const to = sp.get("to");
  const status = sp.get("status");
  const clientId = sp.get("client_id");
  const cleanerId = sp.get("cleaner_id");

  const supabase = createAdminClient();
  let query = supabase
    .from("jobs")
    .select("*, clients(name), cleaners(name)")
    .order("scheduled_date", { ascending: false })
    .order("scheduled_time_start", { ascending: false });

  if (from) query = query.gte("scheduled_date", from);
  if (to) query = query.lte("scheduled_date", to);
  if (status) query = query.eq("status", status);
  if (clientId) query = query.eq("client_id", clientId);
  if (cleanerId) query = query.eq("assigned_cleaner_id", cleanerId);

  const { data, error } = await query;
  if (error) {
    console.error("Jobs fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch jobs." }, { status: 500 });
  }

  return NextResponse.json((data ?? []).map(rowToJob));
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: JobInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body.client_id || !body.service_type || !body.scheduled_date || !body.scheduled_time_start || !body.scheduled_time_end) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("jobs")
    .insert({
      client_id: body.client_id,
      assigned_cleaner_id: body.assigned_cleaner_id ?? null,
      service_type: body.service_type,
      status: body.status ?? "scheduled",
      scheduled_date: body.scheduled_date,
      scheduled_time_start: body.scheduled_time_start,
      scheduled_time_end: body.scheduled_time_end,
      price: body.price ?? null,
      notes: body.notes ?? null,
      recurring: body.recurring ?? false,
      recurrence_rule: body.recurrence_rule ?? null,
    })
    .select("*, clients(name), cleaners(name)")
    .single();

  if (error) {
    console.error("Job create error:", error);
    return NextResponse.json({ error: "Failed to create job." }, { status: 500 });
  }

  syncJobToCalendar(data.id).catch(() => {});
  return NextResponse.json(rowToJob(data), { status: 201 });
}
