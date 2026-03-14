"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Copy, Mail, MessageSquare } from "lucide-react";

export default function ReferralForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const referralLink = code ? `capitolshine.co/book?ref=${code}` : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setCode(data.code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${referralLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (code) {
    return (
      <SectionWrapper className="py-16 bg-off-white">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <h3 className="text-xl font-bold text-navy mb-4">Your referral link is ready!</h3>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-3 mb-6">
              <span className="flex-1 text-sm font-mono text-charcoal truncate">
                {referralLink}
              </span>
              <button
                onClick={copyLink}
                className="flex-shrink-0 p-2 rounded-md bg-navy text-white hover:bg-navy/90 transition-colors"
                aria-label="Copy referral link"
              >
                <Copy size={16} />
              </button>
            </div>
            {copied && (
              <p className="text-sm text-cta-green mb-4">Copied to clipboard!</p>
            )}
            <p className="text-sm text-charcoal/60 mb-4">Share via:</p>
            <div className="flex justify-center gap-3">
              <a
                href={`mailto:?subject=Try Capitol Shine!&body=Use my referral link for $30 off your first cleaning: https://${referralLink}`}
                className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Share via email"
              >
                <Mail size={20} className="text-navy" />
              </a>
              <a
                href={`sms:?body=Try Capitol Shine for home cleaning! Get $30 off with my link: https://${referralLink}`}
                className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Share via text"
              >
                <MessageSquare size={20} className="text-navy" />
              </a>
            </div>
          </Card>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper className="py-16 bg-off-white">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <h3 className="text-xl font-bold text-navy mb-2 text-center">
            Get Your Referral Link
          </h3>
          <p className="text-sm text-charcoal/60 text-center mb-6">
            Enter your name and email to get your personal referral link.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="ref-name" className="block text-sm font-medium text-charcoal mb-1">
                Name
              </label>
              <input
                id="ref-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="ref-email" className="block text-sm font-medium text-charcoal mb-1">
                Email
              </label>
              <input
                id="ref-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gold text-navy font-semibold text-sm hover:bg-gold/90 transition-colors disabled:opacity-60"
            >
              {loading ? "Generating..." : "Get My Referral Link"}
            </button>
          </form>
        </Card>
      </div>
    </SectionWrapper>
  );
}
