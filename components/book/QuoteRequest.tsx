"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface Props {
  propertyType: string;
  onBack: () => void;
}

const PROPERTY_LABELS: Record<string, string> = {
  commercial: "Commercial",
  postconstruction: "Post-Construction",
};

interface QuoteForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  sqft: string;
  frequency: string;
  notes: string;
}

const initialForm: QuoteForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  sqft: "",
  frequency: "",
  notes: "",
};

export default function QuoteRequest({ propertyType, onBack }: Props) {
  const [form, setForm] = useState<QuoteForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (field: keyof QuoteForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Please enter a valid email.";
    if (!form.phone.trim()) errs.phone = "Phone is required.";
    else if (!/^[\d\s\-().+]{7,}$/.test(form.phone))
      errs.phone = "Please enter a valid phone number.";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          serviceType: propertyType === "postconstruction" ? "construction" : propertyType,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cta-green/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-cta-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-navy mb-3">Request received!</h2>
        <p className="text-charcoal/70 mb-2">
          We&apos;ll be in touch within a few hours with a custom quote.
        </p>
        <p className="text-charcoal/60 text-sm">Check your email for confirmation.</p>
      </div>
    );
  }

  const label = PROPERTY_LABELS[propertyType] ?? propertyType;

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold">
        {label} Cleaning
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your name"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 ${
              errors.name ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 ${
              errors.email ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="(555) 555-5555"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 ${
              errors.phone ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1">Property Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="123 Main St, Arlington, VA"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Approx. Sq Ft</label>
            <input
              type="text"
              value={form.sqft}
              onChange={(e) => set("sqft", e.target.value)}
              placeholder="e.g. 2,500"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Frequency</label>
            <select
              value={form.frequency}
              onChange={(e) => set("frequency", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option value="">Select…</option>
              <option value="one-time">One-time</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1">Additional Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            rows={3}
            placeholder="Anything else we should know about your space or needs?"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none"
          />
        </div>
      </div>

      {submitError && <p className="mt-4 text-sm text-red-600">{submitError}</p>}

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button variant="green" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Sending…" : "Request Quote"}
        </Button>
      </div>
    </div>
  );
}
