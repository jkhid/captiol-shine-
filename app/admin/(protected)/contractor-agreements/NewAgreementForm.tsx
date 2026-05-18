"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAgreementForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().slice(0, 10));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCreatedUrl(null);
    if (!name.trim()) {
      setError("Contractor name is required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/contractor-agreements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractor_name: name.trim(),
          contractor_email: email.trim() || null,
          effective_date: effectiveDate,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create agreement");

      const url = `${window.location.origin}/sign/${data.agreement.token}`;
      setCreatedUrl(url);
      setName("");
      setEmail("");
      setEffectiveDate(new Date().toISOString().slice(0, 10));
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/55 mb-1.5">
            Contractor name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Cleaner"
            className="w-full px-3 py-2 rounded-lg border border-navy/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/55 mb-1.5">
            Email <span className="text-charcoal/40 font-normal normal-case">(optional)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            className="w-full px-3 py-2 rounded-lg border border-navy/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/55 mb-1.5">
            Effective date
          </label>
          <input
            type="date"
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-navy/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40 transition-colors"
          />
        </div>

        <div className="md:col-span-3 flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 bg-navy text-white rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-ink transition-colors"
          >
            {submitting ? "Creating…" : "Generate link"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </form>

      {createdUrl && (
        <div className="mt-5 bg-green/8 border border-green/30 rounded-xl p-4">
          <p className="text-xs font-semibold text-green uppercase tracking-wider mb-2">Link generated</p>
          <p className="text-sm text-charcoal/75 mb-3">
            Paste this URL into your post-interview email. The contractor opens it, signs, and you&apos;ll see the status flip to <strong>Signed</strong> here.
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
