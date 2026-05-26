"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewSessionForm() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCreatedUrl(null);
    if (!address.trim()) {
      setError("Property address is required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/photo-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_address: address.trim(),
          service_date:     date,
          notes:            notes.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create");

      const url = `${window.location.origin}/job/${data.session.token}`;
      setCreatedUrl(url);
      setAddress("");
      setNotes("");
      setDate(new Date().toISOString().slice(0, 10));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopy() {
    if (!createdUrl) return;
    await navigator.clipboard.writeText(createdUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/55 mb-1.5">
            Property address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="1234 N Main St, Arlington, VA 22201"
            className="w-full px-3 py-2 rounded-lg border border-navy/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/55 mb-1.5">
            Service date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-navy/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/55 mb-1.5">
            Notes <span className="text-charcoal/40 font-normal normal-case">(internal)</span>
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything to remember"
            className="w-full px-3 py-2 rounded-lg border border-navy/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40"
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 bg-navy text-white rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-ink transition-colors"
          >
            {submitting ? "Creating…" : "Generate upload link"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </form>

      {createdUrl && (
        <div className="mt-5 bg-green/8 border border-green/30 rounded-xl p-4">
          <p className="text-xs font-semibold text-green uppercase tracking-wider mb-2">Link generated</p>
          <p className="text-sm text-charcoal/75 mb-3">
            Text this URL to the assigned cleaner. They open it on their phone and upload before/after photos. You&apos;ll get a notification once both sections have photos.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={createdUrl}
              readOnly
              onFocus={(e) => e.currentTarget.select()}
              className="flex-1 px-3 py-2 rounded-lg border border-navy/15 bg-white text-sm font-mono"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-navy text-white rounded-lg text-sm font-semibold hover:bg-ink transition-colors"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
