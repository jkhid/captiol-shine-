"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ContractorAgreement } from "@/lib/contractor-agreements";

export default function AdminDetailActions({ agreement }: { agreement: ContractorAgreement }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [voiding, setVoiding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/sign/${agreement.token}`
      : `/sign/${agreement.token}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(signUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function handleVoid() {
    if (!confirm("Void this agreement? The link will stop accepting signatures. The audit record stays.")) return;
    setVoiding(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/contractor-agreements/${agreement.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to void");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to void");
    } finally {
      setVoiding(false);
    }
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 space-y-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-charcoal/55 mb-2">
          Share link
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={signUrl}
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
            href={signUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-navy/15 text-navy rounded-lg text-sm font-semibold hover:border-navy/30 transition-colors"
          >
            Preview
          </a>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
        <p className="text-sm text-charcoal/65">
          {agreement.status === "signed"
            ? "Download a signed PDF for your records or Google Drive."
            : "Download a preview PDF (signature block will be blank until signed)."}
        </p>
        <button
          onClick={() => window.print()}
          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg text-sm font-semibold hover:bg-ink transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF
        </button>
      </div>

      {agreement.status !== "voided" && agreement.status !== "signed" && (
        <div className="pt-2">
          <button
            onClick={handleVoid}
            disabled={voiding}
            className="text-xs text-red-600 font-medium hover:underline disabled:opacity-50"
          >
            {voiding ? "Voiding…" : "Void this link"}
          </button>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
}
