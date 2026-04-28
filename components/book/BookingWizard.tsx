"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ADD_ONS, calcAddOnTotal, estimatePrice, VALID_BATHS } from "@/lib/pricing-data";
import type { Bedrooms } from "@/lib/pricing-data";
import Calendar from "@/components/ui/Calendar";
import OrderSummary from "./OrderSummary";
import Link from "next/link";

// ─── Legacy type export — keeps old (unused) component files compiling ─────────
export interface BookingState {
  step: number; propertyType: string; service: string; homeType: string;
  bedrooms: number; bathrooms: string; sqft: string; neighborhood: string;
  addOns: string[]; heavyDuty: boolean; frequency: string; date: string;
  timeWindow: string; instructions: string; name: string; email: string;
  phone: string; address: string; unit: string; hearAbout: string;
  referralCode: string; promoCode: string; agreeTerms: boolean;
  submitted: boolean; errors: Record<string, string>;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    key: "standard",
    name: "Standard clean",
    sub: "Recurring or one-time",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
      </svg>
    ),
  },
  {
    key: "deep",
    name: "Deep clean",
    sub: "Best first clean",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    key: "moveinout",
    name: "Move-in / Move-out",
    sub: "Deposit-ready",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    key: "airbnb",
    name: "Airbnb turnover",
    sub: "Same-day available",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

const BEDROOM_OPTIONS = [
  { value: 1, label: "1 BR" },
  { value: 2, label: "2 BR" },
  { value: 3, label: "3 BR" },
  { value: 4, label: "4+ BR" },
];

const FREQ_OPTIONS = [
  { value: "one-time", label: "One-time", discount: "" },
  { value: "monthly",  label: "Monthly",  discount: "-10%" },
  { value: "biweekly", label: "Biweekly", discount: "-15%" },
  { value: "weekly",   label: "Weekly",   discount: "-20%" },
];

const TIME_SLOTS = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-navy/12 bg-paper text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40 transition-colors";

// ─── Step 1 ───────────────────────────────────────────────────────────────────

interface Step1Props {
  service: string;
  onServiceChange: (s: string) => void;
  bedrooms: number;
  onBedroomsChange: (n: number) => void;
  bathrooms: string;
  onBathroomsChange: (b: string) => void;
  frequency: string;
  onFrequencyChange: (f: string) => void;
  addOns: string[];
  onToggleAddon: (name: string) => void;
  date: string;
  onDateChange: (d: string) => void;
  timeSlot: string;
  onTimeSlotChange: (t: string) => void;
  errors: Record<string, string>;
  onContinue: () => void;
}

function Step1({
  service, onServiceChange, bedrooms, onBedroomsChange,
  bathrooms, onBathroomsChange,
  frequency, onFrequencyChange, addOns, onToggleAddon,
  date, onDateChange, timeSlot, onTimeSlotChange,
  errors, onContinue,
}: Step1Props) {
  const activeCard = "border-navy bg-gradient-to-b from-navy/[0.04] to-gold/[0.04]";
  const idleCard   = "border-navy/10 bg-white hover:border-navy/25";

  return (
    <div className="space-y-8">
      {/* Service cards */}
      <div>
        <h2 className="font-display text-[28px] tracking-tight mb-1.5">What can we clean?</h2>
        <p className="text-muted text-sm mb-5">Pick a service. Your price updates live on the right.</p>
        <div className="grid grid-cols-2 gap-2.5">
          {SERVICES.map((s) => (
            <button
              key={s.key}
              onClick={() => onServiceChange(s.key)}
              className={`flex gap-3.5 p-[18px] rounded-xl border text-left transition-all ${
                service === s.key ? activeCard : idleCard
              }`}
            >
              <div className="w-[38px] h-[38px] rounded-lg bg-cream flex items-center justify-center text-navy flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <div className="font-semibold text-[15px] text-navy mb-0.5">{s.name}</div>
                <div className="text-[12.5px] text-muted">{s.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Home size */}
      <div>
        <h3 className="font-display text-[22px] tracking-tight mb-3">Home size</h3>
        <div className="grid grid-cols-4 gap-2">
          {BEDROOM_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onBedroomsChange(opt.value)}
              className={`py-3.5 rounded-[10px] border text-[14px] font-semibold text-center transition-all ${
                bedrooms === opt.value
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-ink border-navy/12 hover:border-navy/30"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <h3 className="font-display text-[22px] tracking-tight mb-3">Bathrooms</h3>
        <div className="flex flex-wrap gap-2">
          {VALID_BATHS[Math.min(bedrooms, 5) as Bedrooms].map((opt) => (
            <button
              key={opt}
              onClick={() => onBathroomsChange(opt)}
              className={`px-4 py-3 rounded-[10px] border text-[14px] font-semibold text-center transition-all min-w-[56px] ${
                bathrooms === opt
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-ink border-navy/12 hover:border-navy/30"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Frequency — standard only */}
      {service === "standard" && (
        <div>
          <h3 className="font-display text-[22px] tracking-tight mb-3">Frequency</h3>
          <div className="grid grid-cols-4 gap-2">
            {FREQ_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onFrequencyChange(opt.value)}
                className={`py-3 rounded-[10px] border text-center transition-all ${
                  frequency === opt.value
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-ink border-navy/12 hover:border-navy/30"
                }`}
              >
                <div className="text-[13px] font-semibold">{opt.label}</div>
                {opt.discount && (
                  <div
                    className={`text-[10.5px] mt-0.5 ${
                      frequency === opt.value ? "text-gold-2" : "text-muted"
                    }`}
                  >
                    {opt.discount}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add-ons */}
      <div>
        <h3 className="font-display text-[22px] tracking-tight mb-1">
          Add-ons{" "}
          <span className="text-muted text-base font-normal font-sans">(optional)</span>
        </h3>
        <div className="grid grid-cols-2 gap-2.5 mt-3">
          {ADD_ONS.map((addon) => (
            <button
              key={addon.name}
              onClick={() => onToggleAddon(addon.name)}
              className={`flex justify-between items-center p-3.5 rounded-[10px] border text-sm transition-all ${
                addOns.includes(addon.name)
                  ? "border-navy bg-gradient-to-b from-navy/[0.04] to-gold/[0.04]"
                  : "border-navy/10 bg-white hover:border-navy/25"
              }`}
            >
              <span className="font-medium text-ink text-left leading-snug">
                {addon.name}
                {addon.unit && (
                  <span className="block text-[11px] text-muted font-normal">{addon.unit}</span>
                )}
              </span>
              <span className="text-muted text-[13px] flex-shrink-0 ml-2">+${addon.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div>
        <h3 className="font-display text-[22px] tracking-tight mb-3">Pick a date</h3>
        <Calendar selected={date} onChange={onDateChange} disablePast />
        {errors.date && <p className="mt-2 text-sm text-red-500">{errors.date}</p>}

        {date && (
          <div className="mt-6">
            <h3 className="font-display text-[18px] tracking-tight mb-3">Time window</h3>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => onTimeSlotChange(slot)}
                  className={`py-2.5 rounded-lg border text-[13px] font-medium text-center transition-all ${
                    timeSlot === slot
                      ? "border-navy bg-navy text-white"
                      : "border-navy/10 bg-white hover:border-navy/25 text-ink"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            {errors.timeSlot && (
              <p className="mt-2 text-sm text-red-500">{errors.timeSlot}</p>
            )}
          </div>
        )}
      </div>

      <button
        onClick={onContinue}
        disabled={!date || !timeSlot}
        className="w-full py-4 bg-navy text-white rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-navy/90 transition-colors flex items-center justify-center gap-2"
      >
        Continue to contact
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

interface Step2Props {
  contact: { name: string; email: string; phone: string; address: string; notes: string };
  onChange: (field: string, value: string) => void;
  promoCode: string;
  onPromoChange: (v: string) => void;
  errors: Record<string, string>;
  submitting: boolean;
  submitError: string;
  finalPrice: number;
  onBack: () => void;
  onSubmit: () => void;
}

function Step2({
  contact, onChange, promoCode, onPromoChange,
  errors, submitting, submitError, finalPrice, onBack, onSubmit,
}: Step2Props) {
  const canSubmit = !submitting && !!contact.name && !!contact.email && !!contact.phone;

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="text-sm text-muted hover:text-navy transition-colors inline-flex items-center gap-1.5 mb-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div>
        <h2 className="font-display text-[28px] tracking-tight mb-1.5">Where &amp; who?</h2>
        <p className="text-muted text-sm mb-5">We need this to confirm and dispatch. No card required.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Full name" required error={errors.name}>
          <input
            type="text"
            value={contact.name}
            onChange={(e) => onChange("name", e.target.value)}
            className={`${inputCls} ${errors.name ? "border-red-300" : ""}`}
          />
        </Field>
        <Field label="Phone" required error={errors.phone}>
          <input
            type="tel"
            value={contact.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="(555) 000-0000"
            className={`${inputCls} ${errors.phone ? "border-red-300" : ""}`}
          />
        </Field>
      </div>

      <Field label="Email" required error={errors.email}>
        <input
          type="email"
          value={contact.email}
          onChange={(e) => onChange("email", e.target.value)}
          className={`${inputCls} ${errors.email ? "border-red-300" : ""}`}
        />
      </Field>

      <Field label="Service address" required error={errors.address}>
        <input
          type="text"
          value={contact.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="123 Main St, Arlington VA 22201"
          className={`${inputCls} ${errors.address ? "border-red-300" : ""}`}
        />
      </Field>

      <Field label="Notes" sublabel="pets, parking, access...">
        <textarea
          value={contact.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          rows={3}
          className={`${inputCls} resize-none`}
        />
      </Field>

      <Field label="Promo code">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => onPromoChange(e.target.value.toUpperCase())}
          placeholder="e.g. FIRST30"
          className={inputCls}
        />
      </Field>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="w-full py-4 bg-gold text-navy rounded-xl text-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gold/90 transition-colors flex items-center justify-center gap-2 mt-2"
      >
        {submitting ? "Confirming…" : `Confirm booking · $${finalPrice}`}
        {!submitting && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[12.5px] text-muted pt-1">
        <svg className="w-3.5 h-3.5 text-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        No card required · Pay after we clean · 24-hour re-clean guarantee
      </div>
    </div>
  );
}

// ─── Field helper ─────────────────────────────────────────────────────────────

function Field({
  label, sublabel, required, error, children,
}: {
  label: string;
  sublabel?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal mb-1.5">
        {label}
        {sublabel && <span className="text-muted font-normal"> ({sublabel})</span>}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Main wizard ──────────────────────────────────────────────────────────────

function BookingWizardInner() {
  const searchParams = useSearchParams();

  const [step, setStep]           = useState(1);
  const [service, setService]     = useState("standard");
  const [bedrooms, setBedrooms]   = useState(2);
  const [bathrooms, setBathrooms] = useState("1");
  const [frequency, setFrequency] = useState("biweekly");
  const [addOns, setAddOns]       = useState<string[]>([]);
  const [date, setDate]           = useState("");
  const [timeSlot, setTimeSlot]   = useState("");
  const [promoCode, setPromoCode] = useState("FIRST30");
  const [contact, setContact]     = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const svc  = searchParams.get("service");
    const br   = parseInt(searchParams.get("bedrooms") ?? "");
    const freq = searchParams.get("frequency");
    const promo = searchParams.get("promo");
    if (svc)   setService(svc);
    if (!isNaN(br) && br > 0) setBedrooms(Math.min(br, 4));
    if (freq)  setFrequency(freq);
    if (promo) setPromoCode(promo.toUpperCase());
  }, [searchParams]);

  const effectiveFreq = service === "standard" ? frequency : "one-time";

  const handleBedroomsChange = (n: number) => {
    setBedrooms(n);
    const valid = VALID_BATHS[Math.min(n, 5) as Bedrooms];
    if (!valid.includes(bathrooms as any)) setBathrooms(valid[0]);
  };

  const basePrice = useMemo(
    () => estimatePrice(service, bedrooms, effectiveFreq, [], bathrooms, null, false),
    [service, bedrooms, effectiveFreq, bathrooms],
  );

  const promoDiscount = promoCode.toUpperCase() === "FIRST30" ? 30 : 0;
  const finalPrice    = Math.max(0, basePrice + calcAddOnTotal(addOns) - promoDiscount);

  const toggleAddon = (name: string) =>
    setAddOns((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name],
    );

  const handleContinue = () => {
    const errs: Record<string, string> = {};
    if (!date)     errs.date     = "Please select a date.";
    if (!timeSlot) errs.timeSlot = "Please select a time.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (!contact.name.trim())  errs.name    = "Name is required.";
    if (!contact.email.trim()) errs.email   = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))
                               errs.email   = "Valid email required.";
    if (!contact.phone.trim()) errs.phone   = "Phone is required.";
    if (!contact.address.trim()) errs.address = "Address is required.";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyType: "residential",
          service,
          homeType: "",
          bedrooms,
          bathrooms,
          sqft: "",
          neighborhood: "",
          heavyDuty: false,
          frequency: effectiveFreq,
          addOns,
          date,
          timeWindow: timeSlot,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
          unit: "",
          instructions: contact.notes,
          hearAbout: "",
          referralCode: "",
          promoCode,
          agreeTerms: true,
          price: finalPrice,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-18020726483/EL0tCM6mqZgcENPt-ZBD",
        });
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success ────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-green/10 flex items-center justify-center">
          <svg className="w-9 h-9 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-4xl tracking-tight mb-3">You&apos;re booked.</h2>
        <p className="text-muted text-base max-w-sm mx-auto mb-6 leading-relaxed">
          We&apos;ve sent a confirmation to{" "}
          <strong className="text-charcoal">{contact.email}</strong>. Someone will
          reach out within 30 minutes to confirm details.
        </p>
        <div className="flex justify-between items-center px-4 py-4 bg-cream rounded-xl mb-6 text-sm">
          <span className="text-muted">Reference</span>
          <span className="font-mono font-semibold text-navy tracking-wide">
            CS-{Date.now().toString().slice(-6)}
          </span>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy/90 transition-colors"
        >
          Back to home
        </Link>
      </div>
    );
  }

  // ── Wizard ────────────────────────────────────────────────────────────────
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
      {/* Left: form card */}
      <div
        className="bg-white border border-navy/12 rounded-2xl p-8"
        style={{ boxShadow: "0 30px 60px -40px rgba(15,23,42,.18)" }}
      >
        {/* Steps bar */}
        <div className="flex gap-2 mb-7">
          {[
            { n: 1, label: "Service & schedule" },
            { n: 2, label: "Contact & confirm" },
          ].map((s) => (
            <span
              key={s.n}
              className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold uppercase tracking-[.04em] ${
                step >= s.n ? "bg-navy text-white" : "bg-cream text-muted"
              }`}
            >
              {s.n} · {s.label}
            </span>
          ))}
        </div>

        {step === 1 && (
          <Step1
            service={service}
            onServiceChange={(s) => {
              setService(s);
              if (s !== "standard") setFrequency("one-time");
            }}
            bedrooms={bedrooms}
            onBedroomsChange={handleBedroomsChange}
            bathrooms={bathrooms}
            onBathroomsChange={setBathrooms}
            frequency={frequency}
            onFrequencyChange={setFrequency}
            addOns={addOns}
            onToggleAddon={toggleAddon}
            date={date}
            onDateChange={setDate}
            timeSlot={timeSlot}
            onTimeSlotChange={setTimeSlot}
            errors={errors}
            onContinue={handleContinue}
          />
        )}

        {step === 2 && (
          <Step2
            contact={contact}
            onChange={(field, value) =>
              setContact((prev) => ({ ...prev, [field]: value }))
            }
            promoCode={promoCode}
            onPromoChange={setPromoCode}
            errors={errors}
            submitting={submitting}
            submitError={submitError}
            finalPrice={finalPrice}
            onBack={() => { setStep(1); setErrors({}); }}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      {/* Right: sticky order summary */}
      <OrderSummary
        service={service}
        bedrooms={bedrooms}
        frequency={effectiveFreq}
        addOns={addOns}
        date={date}
        timeSlot={timeSlot}
        basePrice={basePrice}
        promoDiscount={promoDiscount}
      />
    </div>
  );
}

export default function BookingWizard() {
  return (
    <Suspense fallback={null}>
      <BookingWizardInner />
    </Suspense>
  );
}
