"use client";

import { ADD_ONS, calcAddOnTotal } from "@/lib/pricing-data";

interface Props {
  service: string;
  bedrooms: number;
  frequency: string;
  addOns: string[];
  date: string;
  timeSlot: string;
  basePrice: number;
  promoDiscount: number;
}

const SERVICE_LABELS: Record<string, string> = {
  standard: "Standard clean",
  deep: "Deep clean",
  moveinout: "Move-in / Move-out",
  airbnb: "Airbnb turnover",
};

const FREQ_LABELS: Record<string, string> = {
  "one-time": "One-time",
  monthly: "Monthly",
  biweekly: "Biweekly",
  weekly: "Weekly",
};

export default function OrderSummary({
  service, bedrooms, frequency, addOns, date, timeSlot, basePrice, promoDiscount,
}: Props) {
  const addonTotal = calcAddOnTotal(addOns);
  const subtotal = basePrice + addonTotal;
  const finalPrice = Math.max(0, subtotal - promoDiscount);
  const hasPromo = promoDiscount > 0;

  const addOnPrices = Object.fromEntries(ADD_ONS.map((a) => [a.name, a.price]));

  const subtitle = [
    SERVICE_LABELS[service] ?? service,
    `${bedrooms} BR`,
    service === "standard" && frequency !== "one-time" ? FREQ_LABELS[frequency] : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const freqLabel =
    frequency === "one-time" ? "One-time clean" : `${FREQ_LABELS[frequency]} recurring`;

  function formatDate(s: string) {
    const d = new Date(s + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return (
    <div
      className="sticky top-24 bg-ink text-white rounded-2xl p-7"
      style={{ boxShadow: "0 30px 60px -30px rgba(15,23,42,.4)" }}
    >
      <h3 className="font-display text-[22px] tracking-tight mb-1.5">Order summary</h3>
      <p className="text-white/60 text-[13px] mb-5">{subtitle}</p>

      <div className="divide-y divide-white/8">
        <div className="flex justify-between py-2.5 text-sm">
          <span className="text-white/60">{freqLabel}</span>
          <span className="font-medium">${basePrice}</span>
        </div>
        {addOns.map((addon) => (
          <div key={addon} className="flex justify-between py-2.5 text-sm">
            <span className="text-white/60">{addon}</span>
            <span className="font-medium">+${addOnPrices[addon] ?? "—"}</span>
          </div>
        ))}
        {date && (
          <div className="flex justify-between py-2.5 text-sm">
            <span className="text-white/60">Date</span>
            <span className="font-medium">{formatDate(date)}</span>
          </div>
        )}
        {timeSlot && (
          <div className="flex justify-between py-2.5 text-sm">
            <span className="text-white/60">Time</span>
            <span className="font-medium">{timeSlot}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-baseline pt-[18px] pb-2.5 border-t border-white/15 mt-3.5">
        <span className="text-[13px] text-white/70 uppercase tracking-[.08em]">Total</span>
        <span className="font-display leading-none tracking-tight">
          {hasPromo && (
            <span className="text-white/40 line-through text-[22px] mr-2.5 font-display">
              ${subtotal}
            </span>
          )}
          <span className="text-[46px]">${finalPrice}</span>
        </span>
      </div>

      {hasPromo && (
        <div
          className="flex justify-between items-center px-3.5 py-2.5 rounded-lg text-[12.5px] text-gold-2 mt-3"
          style={{
            background: "rgba(199,154,58,.14)",
            border: "1px dashed rgba(227,192,122,.5)",
          }}
        >
          <span>✦ FIRST30 applied</span>
          <span className="font-bold">−${promoDiscount}</span>
        </div>
      )}

      <div className="mt-[18px] text-xs text-white/55 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          Pay only after we clean
        </div>
        <div className="flex items-center gap-2">
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Licensed & insured in VA
        </div>
        <div className="flex items-center gap-2">
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          24-hour re-clean guarantee
        </div>
      </div>
    </div>
  );
}
