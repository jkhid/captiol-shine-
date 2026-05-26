import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { createAdminClient } from "@/lib/supabase";
import {
  STORAGE_BUCKET,
  computeStatus,
  storagePath,
  type PhotoCategory,
  type PhotoSession,
} from "@/lib/job-photos";
import crypto from "crypto";

// Fire-and-forget SMS notification to the owner when a session first hits
// "ready" status (both before AND after sections have at least one photo).
async function notifyOwnerSessionReady(session: PhotoSession): Promise<void> {
  const sid   = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from  = process.env.TWILIO_FROM_NUMBER;
  const to    = process.env.OWNER_PHONE;
  if (!sid || !token || !from || !to) {
    console.warn("Twilio env missing; skipping ready-notification SMS");
    return;
  }
  try {
    const adminUrl = `https://capitolshinecleaners.com/admin/photo-sessions/${session.id}`;
    const body = [
      `Photo report ready: ${session.property_address}`,
      session.cleaner_name ? `Cleaned by ${session.cleaner_name}` : "",
      `Review and generate PDF: ${adminUrl}`,
    ].filter(Boolean).join("\n");
    await twilio(sid, token).messages.create({ body, from, to });
  } catch (err) {
    console.error("Photo-ready SMS error:", err);
  }
}

export const dynamic = "force-dynamic";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_PER_CATEGORY = 25;
const ALLOWED_MIMES = new Set(["image/jpeg", "image/png", "image/webp"]);

function extForMime(mime: string): string {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png")  return "png";
  if (mime === "image/webp") return "webp";
  return "bin";
}

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  const admin = createAdminClient();
  const { data: session } = await admin
    .from("photo_sessions")
    .select("*")
    .eq("token", params.token)
    .maybeSingle();
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const s = session as PhotoSession;
  if (s.status === "archived" || s.status === "submitted") {
    return NextResponse.json({ error: "This session no longer accepts uploads" }, { status: 410 });
  }

  let body: FormData;
  try {
    body = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = body.get("file");
  const category = body.get("category");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (category !== "before" && category !== "after") {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is too large (max 10MB after resize)" }, { status: 413 });
  }
  if (!ALLOWED_MIMES.has(file.type)) {
    return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 415 });
  }

  // Enforce per-category cap
  const { count } = await admin
    .from("photo_session_photos")
    .select("id", { count: "exact", head: true })
    .eq("session_id", s.id)
    .eq("category", category);
  if ((count ?? 0) >= MAX_PER_CATEGORY) {
    return NextResponse.json({ error: `Maximum ${MAX_PER_CATEGORY} photos per section` }, { status: 409 });
  }

  // Generate a deterministic photo ID + storage path
  const photoId = crypto.randomUUID();
  const ext = extForMime(file.type);
  const path = storagePath(s.id, category as PhotoCategory, photoId, ext);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const upload = await admin.storage.from(STORAGE_BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });
  if (upload.error) {
    console.error("Storage upload error:", upload.error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  // Sort order = current max + 1
  const { data: maxRow } = await admin
    .from("photo_session_photos")
    .select("sort_order")
    .eq("session_id", s.id)
    .eq("category", category)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextOrder = ((maxRow?.sort_order as number | undefined) ?? -1) + 1;

  const { data: inserted, error: insErr } = await admin
    .from("photo_session_photos")
    .insert({
      id:           photoId,
      session_id:   s.id,
      category,
      storage_path: path,
      size_bytes:   file.size,
      sort_order:   nextOrder,
    })
    .select("*")
    .single();
  if (insErr || !inserted) {
    // Roll back storage upload
    await admin.storage.from(STORAGE_BUCKET).remove([path]);
    console.error("DB insert error:", insErr);
    return NextResponse.json({ error: "Could not record photo" }, { status: 500 });
  }

  // Recompute counts + update session status / lifecycle timestamps
  const [{ count: beforeCount }, { count: afterCount }] = await Promise.all([
    admin.from("photo_session_photos").select("id", { count: "exact", head: true }).eq("session_id", s.id).eq("category", "before"),
    admin.from("photo_session_photos").select("id", { count: "exact", head: true }).eq("session_id", s.id).eq("category", "after"),
  ]);
  const newStatus = computeStatus(beforeCount ?? 0, afterCount ?? 0, s.status);
  const updates: Record<string, unknown> = { status: newStatus };
  if (!s.first_uploaded_at) updates.first_uploaded_at = new Date().toISOString();
  const firstTimeReady = newStatus === "ready" && !s.ready_at;
  if (firstTimeReady) updates.ready_at = new Date().toISOString();
  await admin.from("photo_sessions").update(updates).eq("id", s.id);

  // First time this session has both before + after photos — let the owner
  // know via SMS so they can review and generate the PDF.
  if (firstTimeReady) {
    notifyOwnerSessionReady(s).catch((e) => console.error("notify error:", e));
  }

  // Issue a signed URL so the client can render the just-uploaded thumbnail
  const signed = await admin.storage.from(STORAGE_BUCKET).createSignedUrl(path, 60 * 60);

  return NextResponse.json({
    photo: {
      id: photoId,
      category,
      url: signed.data?.signedUrl ?? null,
      sort_order: nextOrder,
      uploaded_at: inserted.uploaded_at,
    },
    counts: { before: beforeCount ?? 0, after: afterCount ?? 0 },
    status: newStatus,
  });
}
