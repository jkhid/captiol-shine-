"use client";

import { useRef, useState } from "react";
import type { PhotoCategory, PhotoSessionStatus } from "@/lib/job-photos";

interface PhotoView {
  id: string;
  category: PhotoCategory;
  url: string | null;
  sort_order: number;
  uploaded_at: string;
}

interface Props {
  token: string;
  propertyAddress: string;
  serviceDate: string;
  initialCleanerName: string | null;
  initialStatus: PhotoSessionStatus;
  initialPhotos: PhotoView[];
}

const MAX_DIMENSION = 2000;
const JPEG_QUALITY = 0.85;

// Resize an image client-side. iPhones often produce 12MP+ photos; we don't
// want to push 5MB JPEGs across the wire from a cleaner's data plan. The
// result is a JPEG blob ~500KB to ~1MB, plenty for PDF embedding.
async function resizeImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(MAX_DIMENSION / bitmap.width, MAX_DIMENSION / bitmap.height, 1);
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  // Use a regular canvas so this works in browsers without OffscreenCanvas.
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");
  ctx.drawImage(bitmap, 0, 0, w, h);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Failed to encode image"))),
      "image/jpeg",
      JPEG_QUALITY,
    );
  });
}

export default function UploadClient({
  token,
  propertyAddress,
  serviceDate,
  initialCleanerName,
  initialStatus,
  initialPhotos,
}: Props) {
  const [name, setName] = useState(initialCleanerName ?? "");
  const [nameSaved, setNameSaved] = useState(!!initialCleanerName);
  const [photos, setPhotos] = useState<PhotoView[]>(initialPhotos);
  const [status, setStatus] = useState<PhotoSessionStatus>(initialStatus);
  const [busyCategory, setBusyCategory] = useState<PhotoCategory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const beforePhotos = photos.filter((p) => p.category === "before");
  const afterPhotos  = photos.filter((p) => p.category === "after");

  const isLocked = status === "submitted" || status === "archived";

  async function saveName() {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name first.");
      return;
    }
    setError(null);
    const res = await fetch(`/api/job/${token}/name`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cleaner_name: trimmed }),
    });
    if (res.ok) {
      setNameSaved(true);
    } else {
      setError("Could not save name. Try again.");
    }
  }

  async function handleFiles(category: PhotoCategory, files: FileList | null) {
    if (!files || files.length === 0) return;
    if (!nameSaved) {
      setError("Type your name and tap Save first, then upload.");
      return;
    }
    setError(null);
    setBusyCategory(category);

    for (const file of Array.from(files)) {
      try {
        const blob = await resizeImage(file);
        const fd = new FormData();
        fd.append("file", new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" }));
        fd.append("category", category);

        const res = await fetch(`/api/job/${token}/photos`, { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Upload failed");
          continue;
        }
        setPhotos((prev) => [...prev, data.photo]);
        setStatus(data.status);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      }
    }

    setBusyCategory(null);
    if (category === "before" && beforeInputRef.current) beforeInputRef.current.value = "";
    if (category === "after" && afterInputRef.current) afterInputRef.current.value = "";
  }

  async function deletePhoto(photoId: string) {
    if (!confirm("Delete this photo?")) return;
    const res = await fetch(`/api/job/${token}/photos/${photoId}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Could not delete");
      return;
    }
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    setStatus(data.status);
  }

  return (
    <section className="bg-paper py-8 px-4 min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white border border-navy/10 rounded-2xl p-5 mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">
            Capitol Shine · Cleaning Photos
          </p>
          <h1 className="font-display text-xl text-ink leading-tight">{propertyAddress}</h1>
          <p className="text-muted text-sm mt-1">Service date: {serviceDate}</p>

          {isLocked ? (
            <div className="mt-4 bg-navy/5 border border-navy/15 rounded-lg px-3 py-2 text-sm text-charcoal/80">
              This session is complete and the report has been submitted. Thanks!
            </div>
          ) : (
            <p className="text-charcoal/65 text-sm mt-3 leading-relaxed">
              Upload at least one <strong>before</strong> photo and one <strong>after</strong> photo of each room.
              The property manager will receive a PDF report once Capitol Shine reviews them.
            </p>
          )}
        </div>

        {/* Cleaner name */}
        {!isLocked && (
          <div className="bg-white border border-navy/10 rounded-2xl p-5 mb-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/55 mb-2">
              Your name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setNameSaved(false); }}
                placeholder="First Last"
                className="flex-1 px-3 py-2.5 rounded-lg border border-navy/15 bg-paper text-base focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40"
              />
              <button
                type="button"
                onClick={saveName}
                disabled={!name.trim() || nameSaved}
                className="px-4 py-2.5 bg-navy text-white rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-ink transition-colors"
              >
                {nameSaved ? "Saved ✓" : "Save"}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Before */}
        <PhotoSection
          title="Before"
          subtitle="Photos of the property before cleaning starts"
          photos={beforePhotos}
          locked={isLocked}
          busy={busyCategory === "before"}
          onAdd={(files) => handleFiles("before", files)}
          onDelete={deletePhoto}
          inputRef={beforeInputRef}
        />

        {/* After */}
        <PhotoSection
          title="After"
          subtitle="Photos once the clean is complete"
          photos={afterPhotos}
          locked={isLocked}
          busy={busyCategory === "after"}
          onAdd={(files) => handleFiles("after", files)}
          onDelete={deletePhoto}
          inputRef={afterInputRef}
        />

        {/* Status summary */}
        {!isLocked && (
          <div className="bg-cream border border-navy/8 rounded-2xl p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">Status</p>
            {status === "ready" ? (
              <>
                <p className="text-base font-semibold text-green">All set, thank you</p>
                <p className="text-sm text-charcoal/65 mt-1">
                  Capitol Shine will generate the report and submit it to property management. You can close this page.
                </p>
              </>
            ) : (
              <p className="text-sm text-charcoal/75">
                {beforePhotos.length} before · {afterPhotos.length} after
                {beforePhotos.length === 0 || afterPhotos.length === 0
                  ? " — keep going, both sections need at least one photo."
                  : ""}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

interface SectionProps {
  title: string;
  subtitle: string;
  photos: PhotoView[];
  locked: boolean;
  busy: boolean;
  onAdd: (files: FileList | null) => void;
  onDelete: (photoId: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

function PhotoSection({ title, subtitle, photos, locked, busy, onAdd, onDelete, inputRef }: SectionProps) {
  return (
    <div className="bg-white border border-navy/10 rounded-2xl p-5 mb-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-display text-lg text-ink">{title}</h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/55">
          {photos.length} {photos.length === 1 ? "photo" : "photos"}
        </span>
      </div>
      <p className="text-xs text-muted mb-4">{subtitle}</p>

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {photos.map((p) => (
            <div key={p.id} className="relative aspect-square rounded-lg overflow-hidden bg-cream">
              {p.url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={p.url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-navy/10" />
              )}
              {!locked && (
                <button
                  onClick={() => onDelete(p.id)}
                  className="absolute top-1 right-1 bg-black/60 text-white w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center hover:bg-black/80"
                  aria-label="Remove photo"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {!locked && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(e) => onAdd(e.target.files)}
            className="hidden"
            id={`input-${title.toLowerCase()}`}
          />
          <label
            htmlFor={`input-${title.toLowerCase()}`}
            className={`block w-full py-3.5 rounded-xl text-center text-sm font-semibold transition-colors cursor-pointer ${
              busy
                ? "bg-navy/20 text-navy/60 cursor-wait"
                : "bg-navy text-white hover:bg-ink"
            }`}
          >
            {busy ? "Uploading…" : `Add ${title.toLowerCase()} photos`}
          </label>
        </>
      )}
    </div>
  );
}
