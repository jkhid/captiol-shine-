import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase";
import {
  STORAGE_BUCKET,
  formatPropertyDate,
  statusBadgeClass,
  statusLabel,
  type PhotoSession,
  type SessionPhoto,
} from "@/lib/job-photos";
import DetailActions from "./DetailActions";

export const dynamic = "force-dynamic";

export default async function PhotoSessionDetailPage({ params }: { params: { id: string } }) {
  const admin = createAdminClient();
  const { data } = await admin
    .from("photo_sessions")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();
  if (!data) notFound();
  const session = data as PhotoSession;

  const { data: photoRows } = await admin
    .from("photo_session_photos")
    .select("*")
    .eq("session_id", session.id)
    .order("category")
    .order("sort_order");
  const photos = (photoRows ?? []) as SessionPhoto[];

  const paths = photos.map((p) => p.storage_path);
  const signed = paths.length
    ? await admin.storage.from(STORAGE_BUCKET).createSignedUrls(paths, 60 * 60)
    : { data: [] as Array<{ signedUrl: string }>, error: null };
  const urlByPath = new Map<string, string>();
  (signed.data ?? []).forEach((entry, i) => {
    if (entry?.signedUrl) urlByPath.set(paths[i], entry.signedUrl);
  });

  const before = photos.filter((p) => p.category === "before");
  const after  = photos.filter((p) => p.category === "after");

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/photo-sessions"
          className="inline-flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-navy transition-colors"
        >
          <ArrowLeft size={14} /> All sessions
        </Link>
        <div className="flex items-end justify-between gap-4 mt-3">
          <div>
            <h1 className="text-2xl font-bold text-navy">{session.property_address}</h1>
            <p className="text-sm text-charcoal/60 mt-1">
              Service date: {formatPropertyDate(session.service_date)}
              {session.cleaner_name && <> · Cleaned by {session.cleaner_name}</>}
            </p>
          </div>
          <span className={`inline-flex items-center text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border ${statusBadgeClass(session.status)}`}>
            {statusLabel(session.status)}
          </span>
        </div>
      </div>

      <DetailActions session={session} hasPhotos={photos.length > 0} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PhotoGrid title="Before" photos={before} urlByPath={urlByPath} />
        <PhotoGrid title="After"  photos={after}  urlByPath={urlByPath} />
      </div>

      {session.notes && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-charcoal/55 mb-2">Internal notes</p>
          <p className="text-sm text-charcoal/80 whitespace-pre-line">{session.notes}</p>
        </div>
      )}
    </div>
  );
}

function PhotoGrid({
  title, photos, urlByPath,
}: {
  title: string;
  photos: SessionPhoto[];
  urlByPath: Map<string, string>;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-lg text-ink">{title}</h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/55">
          {photos.length} {photos.length === 1 ? "photo" : "photos"}
        </span>
      </div>
      {photos.length === 0 ? (
        <p className="text-sm text-charcoal/50 py-8 text-center">No photos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((p) => {
            const url = urlByPath.get(p.storage_path) ?? null;
            return (
              <a
                key={p.id}
                href={url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-square rounded-lg overflow-hidden bg-cream relative group"
              >
                {url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-navy/10" />
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
