"use client";

import { useState } from "react";
import { X, Gift, Check } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  source?: string;
}

export default function SaveOfferModal({ open, onClose, source = "lp" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Please confirm you'd like to receive emails/texts.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, source, consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }
      setDone(true);
      setLoading(false);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setConsent(false);
    setError("");
    setDone(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal/70 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {!done ? (
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center">
                <Gift size={18} className="text-gold" />
              </span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">
                Save your offer
              </p>
            </div>
            <h3 className="font-display text-2xl font-bold text-navy mb-2">
              Lock in $30 off for later
            </h3>
            <p className="text-charcoal/60 text-sm mb-6">
              We&apos;ll text and email your code so you have it whenever you&apos;re ready to book. No pressure, no spam.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-navy text-sm"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-navy text-sm"
              />
              <input
                type="tel"
                placeholder="Phone (optional, for text)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-navy text-sm"
              />

              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-navy focus:ring-navy"
                />
                <span className="text-xs text-charcoal/70 leading-relaxed">
                  I agree to receive promotional emails and text messages from Capitol Shine. Message and data rates may apply. Reply STOP to opt out at any time.
                </span>
              </label>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold hover:bg-gold/90 text-navy font-bold text-base py-3 rounded-xl transition-colors disabled:opacity-60"
              >
                {loading ? "Saving..." : "Send me the code"}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-cta-green/15 flex items-center justify-center mx-auto mb-4">
              <Check size={26} className="text-cta-green" />
            </div>
            <h3 className="font-display text-2xl font-bold text-navy mb-2">
              You&apos;re all set!
            </h3>
            <p className="text-charcoal/60 text-sm mb-6">
              Check your email — we just sent your $30 off code. Use it whenever you&apos;re ready to book.
            </p>
            <button
              onClick={handleClose}
              className="bg-navy hover:bg-navy/90 text-white font-semibold px-6 py-2.5 rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
