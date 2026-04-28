"use client";

import { useState } from "react";
import { Copy, Mail, MessageSquare, Share2 } from "lucide-react";

export default function ReferralForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const referralLink = code ? `https://capitolshinecleaners.com/book?ref=${code}` : "";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }
      setCode(data.code);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    if (!referralLink) {
      return;
    }
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          id="share"
          className="grid gap-8 rounded-[28px] bg-cream p-6 shadow-[0_30px_90px_-50px_rgba(23,36,63,0.55)] md:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center"
        >
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Your Link</p>
            <h3 className="font-display text-4xl font-light leading-none tracking-tight text-ink md:text-5xl">
              Already a client?
              <br />
              <em className="italic">Start sharing.</em>
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
              Existing clients can generate a personal referral link here. Once your friend completes
              their first cleaning, the $30 credit applies automatically to your next visit.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-xs font-medium text-muted">
              <Share2 size={14} className="text-navy/60" />
              No cap on referrals. Credits stack.
            </div>
          </div>

          <div className="rounded-[22px] bg-white p-5 shadow-[0_24px_60px_-40px_rgba(23,36,63,0.4)] md:p-6">
            {code ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green">Link Ready</p>
                <h4 className="mt-3 font-display text-3xl font-light tracking-tight text-ink">
                  Share this with your people.
                </h4>
                <div className="mt-6 flex items-center gap-2 rounded-xl border border-navy/10 bg-paper p-2">
                  <code className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-3 py-2 font-mono text-xs text-ink sm:text-sm">
                    {referralLink}
                  </code>
                  <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex items-center gap-2 rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white transition hover:bg-navy/92"
                  >
                    <Copy size={14} />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  <a
                    href={`sms:?body=${encodeURIComponent(`Use my Capitol Shine referral link for $30 off your first clean: ${referralLink}`)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm font-medium text-ink transition hover:border-navy/25 hover:bg-paper"
                  >
                    <MessageSquare size={16} />
                    Text
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent("Try Capitol Shine")}&body=${encodeURIComponent(`Use my Capitol Shine referral link for $30 off your first clean: ${referralLink}`)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm font-medium text-ink transition hover:border-navy/25 hover:bg-paper"
                  >
                    <Mail size={16} />
                    Email
                  </a>
                  <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm font-medium text-ink transition hover:border-navy/25 hover:bg-paper"
                  >
                    <Share2 size={16} />
                    Copy Again
                  </button>
                </div>
                <p className="mt-4 text-center text-xs leading-relaxed text-muted">
                  Your link stays active for future referrals too.
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Generate Link</p>
                <h4 className="mt-3 font-display text-3xl font-light tracking-tight text-ink">
                  Get your personal referral link.
                </h4>
                <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                  <label className="block">
                    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Name
                    </span>
                    <input
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-navy/30 focus:ring-4 focus:ring-navy/8"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-navy/30 focus:ring-4 focus:ring-navy/8"
                    />
                  </label>
                  {error ? <p className="text-sm text-red-600">{error}</p> : null}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy/92 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Generating..." : "Get My Referral Link"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
