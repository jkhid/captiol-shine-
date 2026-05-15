"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateServicePrice,
  mapV2ToLegacy,
  SERVICE_TYPES_V2,
  SQFT_SLIDER,
  VALID_BATHS,
  CONDITIONS,
  type Bedrooms,
  type Bathrooms,
  type ServiceTypeV2,
  type Condition,
} from "@/lib/pricing-data";
import SqftSlider from "@/components/ui/SqftSlider";

const SERVICES: { key: ServiceTypeV2; label: string }[] = [
  { key: "weekly",   label: "Weekly"   },
  { key: "biweekly", label: "Biweekly" },
  { key: "monthly",  label: "Monthly"  },
  { key: "oneTime",  label: "One-Time" },
  { key: "deep",     label: "Deep"     },
  { key: "moveOut",  label: "Move-Out" },
];

const BR_LABELS: Record<Bedrooms, string> = {
  0: "Studio", 1: "1 BR", 2: "2 BR", 3: "3 BR", 4: "4 BR", 5: "5+ BR",
};

const BEDROOM_OPTIONS: Bedrooms[] = [0, 1, 2, 3, 4, 5];

export default function HeroQuoteCard() {
  const [serviceType, setServiceType] = useState<ServiceTypeV2>("biweekly");
  const [bedrooms, setBedrooms]       = useState<Bedrooms>(2);
  const [bathrooms, setBathrooms]     = useState<Bathrooms>("2");
  const [sqft, setSqft]               = useState<number>(SQFT_SLIDER.default);
  const [condition, setCondition]     = useState<Condition>("normal");

  function handleBedroomsChange(n: Bedrooms) {
    setBedrooms(n);
    const valid = VALID_BATHS[n];
    if (!valid.includes(bathrooms)) setBathrooms(valid[valid.length - 1]);
  }

  const validBaths   = VALID_BATHS[bedrooms];
  const showCondition = !SERVICE_TYPES_V2[serviceType].recurring && serviceType !== "oneTime";

  const result = useMemo(
    () => calculateServicePrice({
      sqft,
      bedrooms,
      bathroom: bathrooms,
      serviceType,
      condition,
    }),
    [sqft, bedrooms, bathrooms, serviceType, condition],
  );

  // Map V2 → legacy params for /book URL so the booking flow still understands it.
  const legacy = mapV2ToLegacy(serviceType);
  const bookHref =
    `/book?service=${legacy.service}` +
    `&frequency=${legacy.frequency}` +
    `&bedrooms=${bedrooms}&bathrooms=${bathrooms}` +
    `&sqft=${sqft}${showCondition ? `&condition=${condition}` : ""}`;

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-navy/12 border border-navy/8 p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold">Get Your Price</span>
        <span className="text-xs text-muted">Instant estimate</span>
      </div>

      {/* Service picker — 6 V2 types */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Service</label>
        <div className="grid grid-cols-3 gap-1.5">
          {SERVICES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setServiceType(key)}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                serviceType === key
                  ? "bg-navy text-white"
                  : "bg-paper text-charcoal hover:bg-cream"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
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

      {/* Sqft slider */}
      <div className="mb-5">
        <SqftSlider value={sqft} onChange={setSqft} compact />
      </div>

      {/* Condition — only for Deep / Move-Out */}
      {showCondition && (
        <div className="mb-5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Condition</label>
          <div className="grid grid-cols-3 gap-1.5">
            {(Object.keys(CONDITIONS) as Condition[]).map((c) => (
              <button
                key={c}
                onClick={() => setCondition(c)}
                className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                  condition === c
                    ? "bg-navy text-white"
                    : "bg-paper text-charcoal hover:bg-cream"
                }`}
              >
                {CONDITIONS[c].label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price display */}
      <div className="bg-paper rounded-xl px-4 py-4 mb-4 text-center">
        <p className="text-xs text-muted mb-1">Estimated price</p>
        <p className="font-display text-5xl text-ink font-semibold tracking-tight leading-none">
          ${result.price}
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
