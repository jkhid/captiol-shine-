import Link from "next/link";
import type { BookingState } from "./BookingWizard";
import Card from "@/components/ui/Card";

interface Props {
  state: BookingState;
  dispatch: React.Dispatch<{ type: "SET_FIELD"; field: string; value: string | boolean }>;
  price: number;
  originalPrice: number;
  recurringPrice: number;
}

const hearAboutOptions = [
  "",
  "Google",
  "Nextdoor",
  "Referral",
  "Real Estate Agent",
  "Social Media",
  "Other",
];

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-charcoal mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent ${
          error ? "border-red-300" : "border-gray-200"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function ContactConfirm({ state, dispatch, price, originalPrice, recurringPrice }: Props) {
  const hasPromo = state.promoCode.toUpperCase() === "FIRST30";
  const set = (field: string) => (value: string | boolean) =>
    dispatch({ type: "SET_FIELD", field, value });

  const serviceLabels: Record<string, string> = {
    standard: "Standard Clean",
    deep: "Deep Clean",
    moveinout: "Move-In / Move-Out",
    airbnb: "Airbnb Turnover",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-navy mb-6">Contact Info & Confirmation</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          id="name"
          label="Full Name"
          value={state.name}
          onChange={set("name") as (v: string) => void}
          error={state.errors.name}
          required
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          value={state.email}
          onChange={set("email") as (v: string) => void}
          error={state.errors.email}
          placeholder="you@email.com"
          required
        />
        <InputField
          id="phone"
          label="Phone"
          type="tel"
          value={state.phone}
          onChange={set("phone") as (v: string) => void}
          error={state.errors.phone}
          placeholder="703-555-0199"
          required
        />
        <InputField
          id="address"
          label="Address"
          value={state.address}
          onChange={set("address") as (v: string) => void}
          error={state.errors.address}
          required
        />
        <InputField
          id="unit"
          label="Unit / Apt Number"
          value={state.unit}
          onChange={set("unit") as (v: string) => void}
          placeholder="Optional"
        />
        <div>
          <label htmlFor="hearAbout" className="block text-sm font-medium text-charcoal mb-1">
            How did you hear about us?
          </label>
          <select
            id="hearAbout"
            value={state.hearAbout}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "hearAbout", value: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-white"
          >
            <option value="">Select...</option>
            {hearAboutOptions.filter(Boolean).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          id="promoCode"
          label="Promo Code"
          value={state.promoCode}
          onChange={(v) => dispatch({ type: "SET_FIELD", field: "promoCode", value: v.toUpperCase() })}
          placeholder="e.g. FIRST30"
        />
        <InputField
          id="referralCode"
          label="Referral Code"
          value={state.referralCode}
          onChange={set("referralCode") as (v: string) => void}
          placeholder="Optional"
        />
      </div>

      {/* Summary */}
      <Card className="bg-off-white border-0">
        <h3 className="font-bold text-navy mb-3">Booking Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-charcoal/70">Service</span>
            <span className="font-medium">{serviceLabels[state.service] || state.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal/70">Home</span>
            <span className="font-medium">{state.homeType || "—"}, {state.bedrooms} BR</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal/70">Frequency</span>
            <span className="font-medium capitalize">{state.frequency.replace("-", " ")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal/70">Date</span>
            <span className="font-medium">{state.date || "—"}</span>
          </div>
          {state.addOns.length > 0 && (
            <div className="flex justify-between">
              <span className="text-charcoal/70">Add-ons</span>
              <span className="font-medium text-right">{state.addOns.join(", ")}</span>
            </div>
          )}
          {hasPromo && (
            <>
              <div className="flex justify-between text-charcoal/50 text-sm">
                <span>Original price</span>
                <span className="line-through">${originalPrice}</span>
              </div>
              <div className="flex justify-between text-cta-green">
                <span>Promo (FIRST30)</span>
                <span className="font-medium">−$30</span>
              </div>
            </>
          )}
          <div className="pt-2 border-t border-gray-200 space-y-1.5">
            <div className="flex justify-between">
              <span className="font-bold text-navy">
                {recurringPrice > 0 ? "First clean" : "Estimated Total"}
              </span>
              <span className="text-xl font-bold text-navy">${price}</span>
            </div>
            {recurringPrice > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/50">
                  Then per visit ({state.frequency})
                </span>
                <span className="font-semibold text-charcoal/70">${recurringPrice}</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Terms */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={state.agreeTerms}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "agreeTerms", value: e.target.checked })}
          className="accent-gold w-4 h-4 mt-0.5"
        />
        <span className="text-sm text-charcoal/70">
          I agree to Capitol Shine&apos;s{" "}
          <Link href="/terms" target="_blank" className="text-navy underline">service terms</Link>.
        </span>
      </label>
      {state.errors.agreeTerms && (
        <p className="text-xs text-red-500">{state.errors.agreeTerms}</p>
      )}
    </div>
  );
}
