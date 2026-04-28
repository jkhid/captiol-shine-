"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, ChevronUp, Info } from "lucide-react";
import {
  BEDROOM_OPTIONS,
  BEDROOM_LABELS,
  VALID_BATHS,
  FREQUENCY_LABELS,
  SERVICE_INCLUDED,
  SERVICE_LABELS,
  quoteBreakdown,
  type Bedrooms,
  type Bathrooms,
  type Frequency,
  type ServiceKey,
} from "@/lib/pricing-data";

const FREQUENCIES: Frequency[] = ["one-time", "monthly", "biweekly", "weekly"];
const SERVICES: ServiceKey[] = ["standard", "deep", "moveinout"];

export default function PricingCalculator() {
  const [bedrooms, setBedrooms]     = useState<Bedrooms>(2);
  const [bathrooms, setBathrooms]   = useState<Bathrooms>("2");
  const [frequency, setFrequency]   = useState<Frequency>("one-time");
  const [sqft, setSqft]             = useState<string>("");
  const [heavyDuty, setHeavyDuty]   = useState<boolean>(false);
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);

  const validBaths = VALID_BATHS[bedrooms];
  const effectiveBath: Bathrooms = validBaths.includes(bathrooms)
    ? bathrooms
    : validBaths[validBaths.length - 1];

  const cards = useMemo(() => {
    return SERVICES.map((service) => {
      const breakdown = quoteBreakdown({
        service,
        bedrooms,
        bathrooms: effectiveBath,
        frequency: service === "standard" ? frequency : "one-time",
        sqft,
        heavyDuty,
      });
      return { service, breakdown };
    });
  }, [bedrooms, effectiveBath, frequency, sqft, heavyDuty]);

  const sqftHasSurcharge = cards.some((c) => c.breakdown.sqftSurcharge > 0);
  const heavyDutyAmount  = cards[0]?.breakdown.heavyDutySurcharge ?? 0;

  const bookHref = (svc: ServiceKey) => {
    const params = new URLSearchParams({
      service: svc,
      bedrooms: String(bedrooms),
      bathrooms: effectiveBath,
      frequency: svc === "standard" ? frequency : "one-time",
    });
    if (sqft) params.set("sqft", sqft);
    if (heavyDuty) params.set("heavy", "1");
    return `/book?${params.toString()}`;
  };

  const btnBase = "px-3 h-10 rounded-lg text-sm font-medium transition-all";
  const btnActive = "bg-navy text-white";
  const btnIdle = "bg-paper text-charcoal hover:bg-cream border border-navy/10";

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

        {/* Advanced toggles */}
        <button
          type="button"
          onClick={() => setAdvancedOpen((v) => !v)}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-ink transition-colors"
        >
          {advancedOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          Advanced options (square footage, heavy duty)
        </button>

        {advancedOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t border-navy/8">
            <div>
              <label htmlFor="sqft" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                Square footage <span className="text-muted/60 normal-case font-normal">(optional)</span>
              </label>
              <input
                id="sqft"
                type="text"
                inputMode="numeric"
                value={sqft}
                onChange={(e) => setSqft(e.target.value.replace(/[^\d]/g, "").slice(0, 5))}
                placeholder="e.g. 1,200"
                className="w-full max-w-xs px-4 py-2.5 rounded-lg border border-navy/12 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40 transition-colors"
              />
              {sqftHasSurcharge ? (
                <p className="mt-1.5 text-xs text-muted flex items-center gap-1">
                  <Info size={12} /> Surcharge applied — larger than typical for {BEDROOM_LABELS[bedrooms]}.
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-muted/70">Leave blank if unsure — no surcharge unless your home is unusually large.</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Excessive mess</label>
              <label className="inline-flex items-center gap-3 cursor-pointer p-3 rounded-lg bg-white border border-navy/10 hover:border-navy/20 transition-colors">
                <input
                  type="checkbox"
                  checked={heavyDuty}
                  onChange={(e) => setHeavyDuty(e.target.checked)}
                  className="accent-gold w-4 h-4"
                />
                <span className="text-sm text-charcoal">
                  Heavy duty <span className="text-muted">(pet damage, hoarding, post-party)</span>
                  {heavyDuty && heavyDutyAmount > 0 && (
                    <span className="ml-2 font-semibold text-navy">+${heavyDutyAmount}</span>
                  )}
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Service cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(({ service, breakdown }) => {
          const isStandard = service === "standard";
          const showsRecurringDiscount = isStandard && breakdown.frequencyDiscount > 0;
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
                {showsRecurringDiscount && (
                  <span className="text-sm text-muted line-through mr-2">
                    ${breakdown.serviceAdjusted}
                  </span>
                )}
                <span className="font-display text-5xl text-ink font-semibold tracking-tight leading-none">
                  ${breakdown.total}
                </span>
                {showsRecurringDiscount && (
                  <p className="text-xs text-green font-medium mt-1">
                    {Math.round((breakdown.frequencyDiscount / breakdown.serviceAdjusted) * 100)}% off recurring rate
                  </p>
                )}
              </div>

              {/* Inline breakdown when surcharges apply */}
              {(breakdown.sqftSurcharge > 0 || breakdown.heavyDutySurcharge > 0) && (
                <div className="text-xs text-muted mb-4 space-y-0.5 bg-paper rounded-lg p-3">
                  <div className="flex justify-between">
                    <span>Base ({BEDROOM_LABELS[bedrooms]}, {effectiveBath} BA)</span>
                    <span>${breakdown.serviceAdjusted}</span>
                  </div>
                  {showsRecurringDiscount && (
                    <div className="flex justify-between text-green">
                      <span>{FREQUENCY_LABELS[frequency]}</span>
                      <span>−${breakdown.frequencyDiscount}</span>
                    </div>
                  )}
                  {breakdown.sqftSurcharge > 0 && (
                    <div className="flex justify-between">
                      <span>Sqft surcharge</span><span>+${breakdown.sqftSurcharge}</span>
                    </div>
                  )}
                  {breakdown.heavyDutySurcharge > 0 && (
                    <div className="flex justify-between">
                      <span>Heavy duty</span><span>+${breakdown.heavyDutySurcharge}</span>
                    </div>
                  )}
                </div>
              )}

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
