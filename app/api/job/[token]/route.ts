import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import type { PhotoSession, SessionPhoto } from "@/lib/job-photos";
import { STORAGE_BUCKET } from "@/lib/job-photos";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const admin = createAdminClient();
  const { data: session } = await admin
    .from("photo_sessions")
    .select("*")
    .eq("token", params.token)
    .maybeSingle();
  if (!session) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const s = session as PhotoSession;

  if (s.status === "archived") {
    return NextResponse.json({ error: "This upload link has expired" }, { status: 410 });
  }

  const { data: photoRows } = await admin
    .from("photo_session_photos")
    .select("*")
    .eq("session_id", s.id);
  const photos = ((photoRows ?? []) as SessionPhoto[])
    .slice()
    .sort((a, b) =>
      a.category === b.category
        ? a.sort_order - b.sort_order
        : a.category.localeCompare(b.category),
    );

  // Generate signed URLs (60-minute expiry) so the cleaner can see thumbnails
  // without making the bucket public.
  const paths = photos.map((p) => p.storage_path);
  const signed = paths.length
    ? await admin.storage.from(STORAGE_BUCKET).createSignedUrls(paths, 60 * 60)
    : { data: [] as Array<{ signedUrl: string }>, error: null };
  const urlByPath = new Map<string, string>();
  (signed.data ?? []).forEach((entry, i) => {
    if (entry?.signedUrl) urlByPath.set(paths[i], entry.signedUrl);
  });

  return NextResponse.json({
    session: {
      id: s.id,
      token: s.token,
      status: s.status,
      property_address: s.property_address,
      service_date: s.service_date,
      cleaner_name: s.cleaner_name,
      submitted_at: s.submitted_at,
    },
    photos: photos.map((p) => ({
      id: p.id,
      category: p.category,
      url: urlByPath.get(p.storage_path) ?? null,
      sort_order: p.sort_order,
      uploaded_at: p.uploaded_at,
    })),
  });
}
