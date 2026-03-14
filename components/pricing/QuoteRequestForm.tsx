"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

type ServiceType = "commercial" | "construction";

interface QuoteFormState {
  name: string;
  email: string;
  phone: string;
  spaceType: string;
  sqft: string;
  timeline: string;
  notes: string;
}

const COMMERCIAL_SPACE_TYPES = ["Office", "Retail", "Medical / Dental", "Warehouse", "Other"];
const CONSTRUCTION_PROJECT_TYPES = ["New Construction", "Gut Renovation", "Partial Renovation", "Other"];
const TIMELINES = ["ASAP", "Within 2 weeks", "1 month", "2–3 months", "Just planning ahead"];

export default function QuoteRequestForm({ serviceType }: { serviceType: ServiceType }) {
  const [form, setForm] = useState<QuoteFormState>({
    name: "", email: "", phone: "",
    spaceType: "", sqft: "", timeline: "", notes: "",
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
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-full bg-cta-green/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-cta-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-semibold text-navy text-lg">Request received!</p>
        <p className="text-charcoal/60 mt-2 text-sm">
          We&apos;ll be in touch within 24–48 hours to schedule your free estimate.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy/50 transition-colors";
  const labelClass = "block text-xs font-medium text-charcoal/60 mb-1";

  const spaceTypeOptions = serviceType === "commercial" ? COMMERCIAL_SPACE_TYPES : CONSTRUCTION_PROJECT_TYPES;
  const spaceTypeLabel  = serviceType === "commercial" ? "Space type" : "Project type";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name / Email / Phone */}
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

      {/* Space / project details */}
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
          <label className={labelClass}>Approx. square footage</label>
          <input className={inputClass} value={form.sqft} onChange={set("sqft")} placeholder="e.g. 2,000" maxLength={20} />
        </div>
      </div>

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

      <Button type="submit" variant="primary" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request Free Estimate"}
      </Button>
    </form>
  );
}
