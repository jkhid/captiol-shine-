import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { STORAGE_BUCKET, computeStatus, type PhotoSession, type SessionPhoto } from "@/lib/job-photos";

export const dynamic = "force-dynamic";

export async function DELETE(_req: NextRequest, { params }: { params: { token: string; photoId: string } }) {
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

  const { data: photo } = await admin
    .from("photo_session_photos")
    .select("*")
    .eq("id", params.photoId)
    .eq("session_id", s.id)
    .maybeSingle();
  if (!photo) return NextResponse.json({ error: "Photo not found" }, { status: 404 });
  const p = photo as SessionPhoto;

  await admin.storage.from(STORAGE_BUCKET).remove([p.storage_path]);
  await admin.from("photo_session_photos").delete().eq("id", p.id);

  // Recompute status
  const [{ count: beforeCount }, { count: afterCount }] = await Promise.all([
    admin.from("photo_session_photos").select("id", { count: "exact", head: true }).eq("session_id", s.id).eq("category", "before"),
    admin.from("photo_session_photos").select("id", { count: "exact", head: true }).eq("session_id", s.id).eq("category", "after"),
  ]);
  const newStatus = computeStatus(beforeCount ?? 0, afterCount ?? 0, s.status);
  await admin.from("photo_sessions").update({ status: newStatus }).eq("id", s.id);

  return NextResponse.json({
    ok: true,
    counts: { before: beforeCount ?? 0, after: afterCount ?? 0 },
    status: newStatus,
  });
}
