"use client";

import { useState } from "react";

type ServiceType = "commercial" | "construction" | "airbnb";

interface QuoteFormState {
  name: string;
  email: string;
  phone: string;
  spaceType: string;
  sqft: string;
  frequency: string;
  timeline: string;
  notes: string;
}

const COMMERCIAL_SPACE_TYPES  = ["Office", "Retail", "Medical / Dental", "Warehouse", "Other"];
const COMMERCIAL_FREQUENCIES  = ["Weekly", "2x / Week", "3x / Week", "Daily (M–F)", "Not sure yet"];
const CONSTRUCTION_PROJECT_TYPES = ["New Construction", "Gut Renovation", "Partial Renovation", "Other"];
const AIRBNB_PROPERTY_TYPES   = ["Studio", "1 Bedroom", "2 Bedrooms", "3+ Bedrooms"];
const AIRBNB_FREQUENCIES      = ["Daily", "2–3x / Week", "Weekly", "Biweekly", "Varies / On demand"];
const TIMELINES = ["ASAP", "Within 2 weeks", "1 month", "2–3 months", "Just planning ahead"];

export default function QuoteRequestForm({ serviceType }: { serviceType: ServiceType }) {
  const [form, setForm] = useState<QuoteFormState>({
    name: "", email: "", phone: "",
    spaceType: "", sqft: "", frequency: "", timeline: "", notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (field: keyof QuoteFormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, serviceType }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-semibold text-navy text-lg">Request received!</p>
        <p className="text-muted mt-2 text-sm">
          We&apos;ll be in touch within 24–48 hours to schedule your free estimate.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-navy/12 px-3.5 py-2.5 text-sm text-charcoal bg-paper focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40 transition-colors";
  const labelClass = "block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5";

  const spaceTypeOptions =
    serviceType === "commercial" ? COMMERCIAL_SPACE_TYPES :
    serviceType === "airbnb"     ? AIRBNB_PROPERTY_TYPES :
    CONSTRUCTION_PROJECT_TYPES;
  const spaceTypeLabel =
    serviceType === "commercial" ? "Space type" :
    serviceType === "airbnb"     ? "Property size" :
    "Project type";
  const sqftLabel =
    serviceType === "airbnb" ? "Approx. sq ft (optional)" : "Approx. sq ft";
  const showFrequency   = serviceType === "commercial" || serviceType === "airbnb";
  const frequencyOptions = serviceType === "airbnb" ? AIRBNB_FREQUENCIES : COMMERCIAL_FREQUENCIES;
  const frequencyLabel   = serviceType === "airbnb" ? "Average turnover frequency" : "Desired cleaning frequency";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full name *</label>
          <input required className={inputClass} value={form.name} onChange={set("name")} placeholder="Jane Smith" maxLength={120} />
        </div>
        <div>
          <label className={labelClass}>Phone *</label>
          <input required type="tel" className={inputClass} value={form.phone} onChange={set("phone")} placeholder="(703) 555-0100" maxLength={20} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Email *</label>
        <input required type="email" className={inputClass} value={form.email} onChange={set("email")} placeholder="jane@company.com" maxLength={254} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{spaceTypeLabel}</label>
          <select className={inputClass} value={form.spaceType} onChange={set("spaceType")}>
            <option value="">Select…</option>
            {spaceTypeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{sqftLabel}</label>
          <input className={inputClass} value={form.sqft} onChange={set("sqft")} placeholder="e.g. 2,000" maxLength={20} />
        </div>
      </div>

      {showFrequency && (
        <div>
          <label className={labelClass}>{frequencyLabel}</label>
          <select className={inputClass} value={form.frequency} onChange={set("frequency")}>
            <option value="">Select…</option>
            {frequencyOptions.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className={labelClass}>Timeline</label>
        <select className={inputClass} value={form.timeline} onChange={set("timeline")}>
          <option value="">Select…</option>
          {TIMELINES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Additional details</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={3}
          value={form.notes}
          onChange={set("notes")}
          placeholder="Anything else we should know about the job?"
          maxLength={1000}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again or call us directly.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gold text-ink font-semibold text-sm py-3.5 rounded-xl hover:bg-gold-2 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Request Free Estimate"}
      </button>
    </form>
  );
}
