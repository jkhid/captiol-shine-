"use client";

import { useState } from "react";
import Link from "next/link";
import {
  estimatePrice,
  BEDROOM_OPTIONS,
  VALID_BATHS,
  type Bedrooms,
  type Bathrooms,
  type ServiceKey,
} from "@/lib/pricing-data";

const SERVICES: { key: ServiceKey; label: string }[] = [
  { key: "standard",  label: "Standard" },
  { key: "deep",      label: "Deep" },
  { key: "moveinout", label: "Move-In/Out" },
];

const FREQUENCIES = [
  { value: "one-time",  label: "One-Time" },
  { value: "monthly",   label: "Monthly" },
  { value: "biweekly",  label: "Biweekly" },
  { value: "weekly",    label: "Weekly" },
];

const BR_LABELS: Record<Bedrooms, string> = {
  0: "Studio", 1: "1 BR", 2: "2 BR", 3: "3 BR", 4: "4 BR", 5: "5+ BR",
};

export default function HeroQuoteCard() {
  const [service, setService]     = useState<ServiceKey>("standard");
  const [bedrooms, setBedrooms]   = useState<Bedrooms>(2);
  const [bathrooms, setBathrooms] = useState<Bathrooms>("1");
  const [frequency, setFrequency] = useState("one-time");

  // When bedrooms change, clamp bathrooms to a valid option
  function handleBedroomsChange(n: Bedrooms) {
    setBedrooms(n);
    const valid = VALID_BATHS[n];
    if (!valid.includes(bathrooms)) setBathrooms(valid[0]);
  }

  const validBaths = VALID_BATHS[bedrooms];
  const price = estimatePrice(
    service,
    bedrooms,
    service === "standard" ? frequency : "one-time",
    [],
    bathrooms,
    null,
    false,
  );
  const bookHref = `/book?service=${service}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&frequency=${frequency}`;

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-navy/12 border border-navy/8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold">Get Your Price</span>
        <span className="text-xs text-muted">Instant estimate</span>
      </div>

      {/* Service tabs */}
      <div className="flex gap-1 mb-5 p-1 bg-paper rounded-xl">
        {SERVICES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setService(key)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              service === key
                ? "bg-navy text-white shadow-sm"
                : "text-muted hover:text-navy"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Bedrooms */}
      <div className="mb-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Bedrooms</label>
        <div className="grid grid-cols-6 gap-1">
          {BEDROOM_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => handleBedroomsChange(n)}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                bedrooms === n
                  ? "bg-navy text-white"
                  : "bg-paper text-charcoal hover:bg-cream"
              }`}
            >
              {BR_LABELS[n]}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Bathrooms</label>
        <div className="flex gap-1.5 flex-wrap">
          {validBaths.map((b) => (
            <button
              key={b}
              onClick={() => setBathrooms(b)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                bathrooms === b
                  ? "bg-navy text-white"
                  : "bg-paper text-charcoal hover:bg-cream"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Frequency — standard only */}
      {service === "standard" && (
        <div className="mb-5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Frequency</label>
          <div className="grid grid-cols-2 gap-1.5">
            {FREQUENCIES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFrequency(value)}
                className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                  frequency === value
                    ? "bg-navy text-white"
                    : "bg-paper text-charcoal hover:bg-cream"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price display */}
      <div className="bg-paper rounded-xl px-4 py-4 mb-4 text-center">
        <p className="text-xs text-muted mb-1">Estimated price</p>
        <p className="font-display text-5xl text-ink font-semibold tracking-tight leading-none">
          ${price}
        </p>
        <p className="text-xs text-muted mt-1.5">Final price confirmed after we review your space</p>
      </div>

      <Link
        href={bookHref}
        className="block w-full bg-gold text-ink font-semibold text-sm text-center py-3.5 rounded-xl hover:bg-gold-2 transition-colors"
      >
        Book This Clean →
      </Link>

      <p className="text-center text-xs text-muted mt-3">No payment until after we clean</p>
    </div>
  );
}
