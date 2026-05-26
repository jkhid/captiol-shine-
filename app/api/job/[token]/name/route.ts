import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase";
import type { PhotoSession } from "@/lib/job-photos";

export const dynamic = "force-dynamic";

const NameSchema = z.object({
  cleaner_name: z.string().trim().min(1).max(80),
});

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  let body: z.infer<typeof NameSchema>;
  try {
    body = NameSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: session } = await admin
    .from("photo_sessions")
    .select("*")
    .eq("token", params.token)
    .maybeSingle();
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const s = session as PhotoSession;
  if (s.status === "archived" || s.status === "submitted") {
    return NextResponse.json({ error: "Session is locked" }, { status: 410 });
  }

  await admin.from("photo_sessions").update({ cleaner_name: body.cleaner_name }).eq("id", s.id);
  return NextResponse.json({ ok: true });
}
