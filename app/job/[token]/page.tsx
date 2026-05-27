import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase";
import {
  STORAGE_BUCKET,
  formatPropertyDate,
  type PhotoSession,
  type SessionPhoto,
} from "@/lib/job-photos";
import UploadClient from "./UploadClient";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Upload Cleaning Photos — Capitol Shine",
  robots: { index: false, follow: false },
};

export default async function JobPhotoPage({ params }: { params: { token: string } }) {
  const admin = createAdminClient();
  const { data } = await admin
    .from("photo_sessions")
    .select("*")
    .eq("token", params.token)
    .maybeSingle();
  if (!data) notFound();
  const session = data as PhotoSession;

  if (session.status === "archived") {
    return (
      <section className="bg-paper py-16 px-4 min-h-screen">
        <div className="max-w-md mx-auto bg-white border border-navy/10 rounded-2xl p-8 text-center">
          <h1 className="font-display text-2xl text-ink mb-2">Link expired</h1>
          <p className="text-muted text-sm">
            This upload link has been archived. Contact Capitol Shine if you still need to submit photos.
          </p>
        </div>
      </section>
    );
  }

  const { data: photoRows } = await admin
    .from("photo_session_photos")
    .select("*")
    .eq("session_id", session.id);
  const photos = ((photoRows ?? []) as SessionPhoto[])
    .slice()
    .sort((a, b) =>
      a.category === b.category
        ? a.sort_order - b.sort_order
        : a.category.localeCompare(b.category),
    );

  const paths = photos.map((p) => p.storage_path);
  const signed = paths.length
    ? await admin.storage.from(STORAGE_BUCKET).createSignedUrls(paths, 60 * 60)
    : { data: [] as Array<{ signedUrl: string }>, error: null };
  const urlByPath = new Map<string, string>();
  (signed.data ?? []).forEach((entry, i) => {
    if (entry?.signedUrl) urlByPath.set(paths[i], entry.signedUrl);
  });

  const initialPhotos = photos.map((p) => ({
    id: p.id,
    category: p.category,
    url: urlByPath.get(p.storage_path) ?? null,
    sort_order: p.sort_order,
    uploaded_at: p.uploaded_at,
  }));

  return (
    <UploadClient
      token={session.token}
      propertyAddress={session.property_address}
      serviceDate={formatPropertyDate(session.service_date)}
      initialCleanerName={session.cleaner_name}
      initialStatus={session.status}
      initialPhotos={initialPhotos}
    />
  );
}
