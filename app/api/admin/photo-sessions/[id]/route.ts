import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase";
import { STORAGE_BUCKET, type PhotoSession, type SessionPhoto } from "@/lib/job-photos";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("photo_sessions")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ session: data as PhotoSession });
}

const PatchSchema = z.object({
  action: z.enum(["submit", "reopen", "archive"]),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  let body: z.infer<typeof PatchSchema>;
  try {
    body = PatchSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const admin = createAdminClient();
  const now = new Date().toISOString();
  const updates: Record<string, unknown> = {};

  if (body.action === "submit") {
    updates.status = "submitted";
    updates.submitted_at = now;
  } else if (body.action === "reopen") {
    updates.status = "ready";
    updates.submitted_at = null;
  } else if (body.action === "archive") {
    updates.status = "archived";
    updates.archived_at = now;
  }

  const { data, error } = await admin
    .from("photo_sessions")
    .update(updates)
    .eq("id", params.id)
    .select("*")
    .single();
  if (error || !data) return NextResponse.json({ error: error?.message ?? "Failed" }, { status: 500 });
  return NextResponse.json({ session: data as PhotoSession });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const admin = createAdminClient();
  const { data: photoRows } = await admin
    .from("photo_session_photos")
    .select("storage_path")
    .eq("session_id", params.id);
  const paths = ((photoRows ?? []) as Array<Pick<SessionPhoto, "storage_path">>).map((r) => r.storage_path);
  if (paths.length > 0) {
    await admin.storage.from(STORAGE_BUCKET).remove(paths);
  }
  await admin.from("photo_sessions").delete().eq("id", params.id);
  return NextResponse.json({ ok: true });
}
