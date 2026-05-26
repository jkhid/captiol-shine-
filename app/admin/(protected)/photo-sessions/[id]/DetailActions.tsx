"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PhotoSession } from "@/lib/job-photos";

export default function DetailActions({ session, hasPhotos }: { session: PhotoSession; hasPhotos: boolean }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadUrl = typeof window !== "undefined"
    ? `${window.location.origin}/job/${session.token}`
    : `/job/${session.token}`;
  const pdfUrl = `/api/admin/photo-sessions/${session.id}/pdf`;

  const canGeneratePdf = hasPhotos && session.status !== "archived";
  const canSubmit      = session.status === "ready";
  const canReopen      = session.status === "submitted";

  async function handleCopy() {
    await navigator.clipboard.writeText(uploadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function patch(action: "submit" | "reopen" | "archive", confirmText?: string) {
    if (confirmText && !confirm(confirmText)) return;
    setBusy(action);
    setError(null);
    try {
      const res = await fetch(`/api/admin/photo-sessions/${session.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 space-y-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-charcoal/55 mb-2">
          Cleaner upload link
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={uploadUrl}
            readOnly
            onFocus={(e) => e.currentTarget.select()}
            className="flex-1 px-3 py-2 rounded-lg border border-navy/15 bg-paper text-sm font-mono"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-navy text-white rounded-lg text-sm font-semibold hover:bg-ink transition-colors"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
          <a
            href={uploadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-navy/15 text-navy rounded-lg text-sm font-semibold hover:border-navy/30 transition-colors"
          >
            Preview
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
        <a
          href={pdfUrl}
          download
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            canGeneratePdf
              ? "bg-navy text-white hover:bg-ink"
              : "bg-navy/20 text-navy/50 cursor-not-allowed pointer-events-none"
          }`}
          aria-disabled={!canGeneratePdf}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Generate PDF
        </a>

        {canSubmit && (
          <button
            onClick={() => patch("submit")}
            disabled={busy === "submit"}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green text-white rounded-lg text-sm font-semibold disabled:opacity-50 hover:bg-green/90 transition-colors"
          >
            {busy === "submit" ? "Marking…" : "Mark submitted"}
          </button>
        )}
        {canReopen && (
          <button
            onClick={() => patch("reopen")}
            disabled={busy === "reopen"}
            className="text-xs text-charcoal/70 font-medium hover:underline disabled:opacity-50"
          >
            Reopen
          </button>
        )}
        <button
          onClick={() => patch("archive", "Archive this session? Photos will be deleted. This cannot be undone.")}
          disabled={busy === "archive"}
          className="text-xs text-red-600 font-medium hover:underline disabled:opacity-50 ml-auto"
        >
          {busy === "archive" ? "Archiving…" : "Archive"}
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
