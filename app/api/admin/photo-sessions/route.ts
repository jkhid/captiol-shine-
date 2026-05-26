import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase";
import { generateSessionToken, type PhotoSession } from "@/lib/job-photos";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("photo_sessions")
    .select("*")
    .neq("status", "archived")
    .order("created_at", { ascending: false });
  return NextResponse.json({ sessions: (data ?? []) as PhotoSession[] });
}

const CreateSchema = z.object({
  property_address: z.string().trim().min(3).max(200),
  service_date:     z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
  notes:            z.string().trim().max(500).optional().nullable(),
  created_by:       z.string().trim().max(120).optional().nullable(),
});

export async function POST(req: NextRequest) {
  let body: z.infer<typeof CreateSchema>;
  try {
    body = CreateSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const admin = createAdminClient();
  let token = generateSessionToken();
  for (let i = 0; i < 3; i++) {
    const { data: existing } = await admin
      .from("photo_sessions")
      .select("id")
      .eq("token", token)
      .maybeSingle();
    if (!existing) break;
    token = generateSessionToken();
  }

  const { data, error } = await admin
    .from("photo_sessions")
    .insert({
      token,
      property_address: body.property_address,
      service_date:     body.service_date ?? null,
      notes:            body.notes ?? null,
      created_by:       body.created_by ?? null,
    })
    .select("*")
    .single();
  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Failed to create" }, { status: 500 });
  }
  return NextResponse.json({ session: data as PhotoSession });
}
