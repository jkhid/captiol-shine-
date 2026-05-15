"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import {
  BEDROOM_OPTIONS,
  VALID_BATHS,
  FREQUENCY_LABELS,
  SERVICE_INCLUDED,
  SERVICE_LABELS,
  SQFT_SLIDER,
  CONDITIONS,
  calculateServicePrice,
  type Bedrooms,
  type Bathrooms,
  type Frequency,
  type ServiceKey,
  type Condition,
  type ServiceTypeV2,
} from "@/lib/pricing-data";
import SqftSlider from "@/components/ui/SqftSlider";

const FREQUENCIES: Frequency[] = ["one-time", "monthly", "biweekly", "weekly"];
const SERVICES: ServiceKey[]   = ["standard", "deep", "moveinout"];

// Map Standard service + selected frequency to a V2 service key.
function standardFrequencyToV2(freq: Frequency): ServiceTypeV2 {
  switch (freq) {
    case "weekly":   return "weekly";
    case "biweekly": return "biweekly";
    case "monthly":  return "monthly";
    default:         return "oneTime";
  }
}

function serviceToV2(service: ServiceKey, freq: Frequency): ServiceTypeV2 {
  if (service === "deep")      return "deep";
  if (service === "moveinout") return "moveOut";
  return standardFrequencyToV2(freq);
}

export default function PricingCalculator() {
  const [bedrooms, setBedrooms]   = useState<Bedrooms>(2);
  const [bathrooms, setBathrooms] = useState<Bathrooms>("2");
  const [frequency, setFrequency] = useState<Frequency>("biweekly");
  const [sqft, setSqft]           = useState<number>(SQFT_SLIDER.default);
  const [condition, setCondition] = useState<Condition>("normal");

  const validBaths = VALID_BATHS[bedrooms];
  const effectiveBath: Bathrooms = validBaths.includes(bathrooms)
    ? bathrooms
    : validBaths[validBaths.length - 1];

  // Compute price for each service.
  const cards = useMemo(() => {
    return SERVICES.map((service) => {
      const v2 = serviceToV2(service, frequency);
      const result = calculateServicePrice({
        sqft,
        bedrooms,
        bathroom: effectiveBath,
        serviceType: v2,
        condition,
      });

      // Strikethrough on recurring standard: compare to its one-time price
      // so customers see the recurring saving.
      let oneTimeCompare: number | null = null;
      if (service === "standard" && frequency !== "one-time") {
        oneTimeCompare = calculateServicePrice({
          sqft,
          bedrooms,
          bathroom: effectiveBath,
          serviceType: "oneTime",
          condition,
        }).price;
      }

      return { service, v2, result, oneTimeCompare };
    });
  }, [bedrooms, effectiveBath, frequency, sqft, condition]);

  const bookHref = (svc: ServiceKey) => {
    const params = new URLSearchParams({
      service: svc,
      bedrooms: String(bedrooms),
      bathrooms: effectiveBath,
      frequency: svc === "standard" ? frequency : "one-time",
      sqft: String(sqft),
    });
    if (svc !== "standard" || frequency === "one-time") params.set("condition", condition);
    return `/book?${params.toString()}`;
  };

  const btnBase   = "px-3 h-10 rounded-lg text-sm font-medium transition-all";
  const btnActive = "bg-navy text-white";
  const btnIdle   = "bg-paper text-charcoal hover:bg-cream border border-navy/10";

  return (
    <div>
      {/* Selectors */}
      <div className="bg-paper rounded-2xl border border-navy/8 p-6 md:p-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Bedrooms
            </label>
            <div className="flex flex-wrap gap-2">
              {BEDROOM_OPTIONS.map((br) => (
                <button
                  key={br}
                  type="button"
                  onClick={() => setBedrooms(br)}
                  className={`${btnBase} ${bedrooms === br ? btnActive : btnIdle}`}
                >
                  {br === 0 ? "Studio" : br === 5 ? "5+" : br}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Bathrooms
            </label>
            <div className="flex flex-wrap gap-2">
              {validBaths.map((ba) => (
                <button
                  key={ba}
                  type="button"
                  onClick={() => setBathrooms(ba)}
                  className={`${btnBase} ${effectiveBath === ba ? btnActive : btnIdle}`}
                >
                  {ba}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Frequency <span className="text-muted/60 normal-case font-normal">(Standard only)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {FREQUENCIES.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className={`${btnBase} text-xs ${frequency === f ? btnActive : btnIdle}`}
                >
                  {FREQUENCY_LABELS[f]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-navy/8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SqftSlider value={sqft} onChange={setSqft} />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Condition{" "}
              <span className="text-muted/60 normal-case font-normal">
                (applies to Deep, Move-Out, and One-Time)
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(CONDITIONS) as Condition[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCondition(c)}
                  className={`${btnBase} ${condition === c ? btnActive : btnIdle}`}
                  title={CONDITIONS[c].description}
                >
                  {CONDITIONS[c].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(({ service, result, oneTimeCompare }) => {
          const isStandard = service === "standard";
          return (
            <article
              key={service}
              className="bg-white rounded-2xl border border-navy/8 p-6 flex flex-col"
            >
              <header className="mb-4">
                <h2 className="text-lg font-semibold text-navy tracking-tight">
                  {SERVICE_LABELS[service]}
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  {isStandard
                    ? frequency === "one-time" ? "One-time visit" : FREQUENCY_LABELS[frequency]
                    : "One-time"}
                </p>
              </header>

              <div className="mb-5">
                {oneTimeCompare !== null && oneTimeCompare > result.price && (
                  <span className="text-sm text-muted line-through mr-2">
                    ${oneTimeCompare}
                  </span>
                )}
                <span className="font-display text-5xl text-ink font-semibold tracking-tight leading-none">
                  ${result.price}
                </span>
                {oneTimeCompare !== null && oneTimeCompare > result.price && (
                  <p className="text-xs text-green font-medium mt-1">
                    {Math.round(((oneTimeCompare - result.price) / oneTimeCompare) * 100)}% off recurring rate
                  </p>
                )}
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {SERVICE_INCLUDED[service].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                    <Check size={15} className="text-green flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={bookHref(service)}
                className="block w-full text-center px-4 py-3 rounded-xl bg-gold text-ink text-sm font-semibold hover:bg-gold-2 transition-colors"
              >
                Book This Service
              </Link>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        Prices include all standard supplies. Add-ons priced separately below.
        Final price confirmed after we review your space.
      </p>
    </div>
  );
}
