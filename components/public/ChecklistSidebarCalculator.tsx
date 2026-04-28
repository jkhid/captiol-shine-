"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BEDROOM_LABELS,
  BEDROOM_OPTIONS,
  FREQUENCY_LABELS,
  VALID_BATHS,
  quoteBreakdown,
  type Bathrooms,
  type Bedrooms,
  type Frequency,
  type ServiceKey,
} from "@/lib/pricing-data";

const DURATION_ESTIMATES: Record<ServiceKey, Record<Bedrooms, string>> = {
  standard: {
    0: "1.5-2 hours",
    1: "2-2.5 hours",
    2: "2-3 hours",
    3: "3-4 hours",
    4: "4-5 hours",
    5: "5-6 hours",
  },
  deep: {
    0: "2.5-3.5 hours",
    1: "3-4 hours",
    2: "3-5 hours",
    3: "5-6 hours",
    4: "6-7 hours",
    5: "7-8+ hours",
  },
  moveinout: {
    0: "4-6 hours",
    1: "6-8 hours",
    2: "7-9 hours",
    3: "8-10 hours",
    4: "10-12 hours",
    5: "12+ hours",
  },
};

const BOOK_LABELS: Record<ServiceKey, string> = {
  standard: "Book this clean",
  deep: "Book deep clean",
  moveinout: "Book move-out",
};

type Props = {
  service: ServiceKey;
  defaultBedrooms?: Bedrooms;
  defaultBathrooms?: Bathrooms;
  defaultFrequency?: Frequency;
};

function bedroomShortLabel(bedrooms: Bedrooms): string {
  if (bedrooms === 0) return "Studio";
  if (bedrooms === 5) return "5+ BR";
  return `${bedrooms} BR`;
}

export default function ChecklistSidebarCalculator({
  service,
  defaultBedrooms = 2,
  defaultBathrooms = "2",
  defaultFrequency = "biweekly",
}: Props) {
  const [bedrooms, setBedrooms] = useState<Bedrooms>(defaultBedrooms);
  const validBaths = VALID_BATHS[bedrooms];
  const safeDefaultBath = validBaths.includes(defaultBathrooms) ? defaultBathrooms : validBaths[validBaths.length - 1];
  const [bathrooms, setBathrooms] = useState<Bathrooms>(safeDefaultBath);
  const [frequency, setFrequency] = useState<Frequency>(
    service === "standard" ? defaultFrequency : "one-time",
  );

  const effectiveBath = validBaths.includes(bathrooms) ? bathrooms : validBaths[validBaths.length - 1];
  const effectiveFrequency = service === "standard" ? frequency : "one-time";

  const breakdown = useMemo(
    () =>
      quoteBreakdown({
        service,
        bedrooms,
        bathrooms: effectiveBath,
        frequency: effectiveFrequency,
      }),
    [service, bedrooms, effectiveBath, effectiveFrequency],
  );

  const duration = DURATION_ESTIMATES[service][bedrooms];
  const bookHref = useMemo(() => {
    const params = new URLSearchParams({
      service,
      bedrooms: String(bedrooms),
      bathrooms: effectiveBath,
      frequency: effectiveFrequency,
      promo: "FIRST30",
    });
    return `/book?${params.toString()}`;
  }, [service, bedrooms, effectiveBath, effectiveFrequency]);

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_18px_50px_-40px_rgba(23,36,63,0.35)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Frequency</p>
        {service === "standard" ? (
          <select
            value={frequency}
            onChange={(event) => setFrequency(event.target.value as Frequency)}
            className="mt-3 w-full rounded-xl border border-navy/10 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-navy/30 focus:ring-4 focus:ring-navy/8"
          >
            <option value="weekly">{FREQUENCY_LABELS.weekly}</option>
            <option value="biweekly">{FREQUENCY_LABELS.biweekly}</option>
            <option value="monthly">{FREQUENCY_LABELS.monthly}</option>
            <option value="one-time">{FREQUENCY_LABELS["one-time"]}</option>
          </select>
        ) : (
          <p className="mt-3 text-[1.75rem] leading-none tracking-tight text-ink">One-time</p>
        )}
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_18px_50px_-40px_rgba(23,36,63,0.35)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Home size</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <select
            value={bedrooms}
            onChange={(event) => {
              const nextBedrooms = Number(event.target.value) as Bedrooms;
              setBedrooms(nextBedrooms);
              const nextValidBaths = VALID_BATHS[nextBedrooms];
              if (!nextValidBaths.includes(bathrooms)) {
                setBathrooms(nextValidBaths[nextValidBaths.length - 1]);
              }
            }}
            className="w-full rounded-xl border border-navy/10 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-navy/30 focus:ring-4 focus:ring-navy/8"
          >
            {BEDROOM_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {BEDROOM_LABELS[option]}
              </option>
            ))}
          </select>
          <select
            value={effectiveBath}
            onChange={(event) => setBathrooms(event.target.value as Bathrooms)}
            className="w-full rounded-xl border border-navy/10 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-navy/30 focus:ring-4 focus:ring-navy/8"
          >
            {validBaths.map((option) => (
              <option key={option} value={option}>
                {option} BA
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_18px_50px_-40px_rgba(23,36,63,0.35)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          Duration estimate · {bedroomShortLabel(bedrooms)}
        </p>
        <p className="mt-3 text-[1.75rem] leading-none tracking-tight text-ink">{duration}</p>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_18px_50px_-40px_rgba(23,36,63,0.35)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          Price · {bedroomShortLabel(bedrooms)} · {effectiveBath} BA
        </p>
        <p className="mt-3 text-[1.75rem] leading-none tracking-tight text-ink">
          ${breakdown.total} / visit
        </p>
      </div>

      <Link
        href={bookHref}
        className="inline-flex items-center justify-center rounded-2xl bg-navy px-5 py-4 text-base font-semibold text-white transition hover:bg-navy/92"
      >
        {BOOK_LABELS[service]}
      </Link>
    </div>
  );
}
