"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="rounded-[24px] bg-cream p-6 shadow-[0_24px_60px_-36px_rgba(23,36,63,0.3)] md:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Don&apos;t See Your Area?</p>
          <h3 className="font-display text-3xl font-light leading-none tracking-tight text-ink md:text-4xl">
            We may still be
            <br />
            <em className="italic">able to help.</em>
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
            If you&apos;re outside our standard radius, send over your ZIP and what you need. If we can
            route a crew there, we&apos;ll let you know within one business day.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-green/15 bg-white p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green">Request Received</p>
            <h4 className="mt-3 font-display text-3xl font-light tracking-tight text-ink">
              Thanks. We&apos;ll take a look.
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We&apos;ll reach out if we can cover your area, and we&apos;ll include the soonest available
              service window.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                  Name
                </span>
                <input
                  required
                  type="text"
                  className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-navy/30 focus:ring-4 focus:ring-navy/8"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                  ZIP Code
                </span>
                <input
                  required
                  inputMode="numeric"
                  className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-navy/30 focus:ring-4 focus:ring-navy/8"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                Email
              </span>
              <input
                required
                type="email"
                className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-navy/30 focus:ring-4 focus:ring-navy/8"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                What You Need
              </span>
              <textarea
                required
                rows={4}
                placeholder="2BR condo, biweekly cleaning, evenings preferred..."
                className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-navy/30 focus:ring-4 focus:ring-navy/8"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy/92"
            >
              Add Me to the Waitlist
              <ArrowRight size={15} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
