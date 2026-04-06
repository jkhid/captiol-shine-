"use client";

import { useReducer, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import StepIndicator from "./StepIndicator";
import ServiceSelect from "./ServiceSelect";
import HomeDetails from "./HomeDetails";
import Schedule from "./Schedule";
import ContactConfirm from "./ContactConfirm";
import QuoteRequest from "./QuoteRequest";
import Button from "@/components/ui/Button";
import { estimatePrice } from "@/lib/pricing-data";

export interface BookingState {
  step: number;
  propertyType: string;
  service: string;
  homeType: string;
  bedrooms: number;
  bathrooms: string;
  sqft: string;
  neighborhood: string;
  addOns: string[];
  frequency: string;
  date: string;
  timeWindow: string;
  instructions: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  unit: string;
  hearAbout: string;
  referralCode: string;
  promoCode: string;
  agreeTerms: boolean;
  submitted: boolean;
  errors: Record<string, string>;
}

type Action =
  | { type: "SET_FIELD"; field: string; value: string | number | boolean | string[] }
  | { type: "TOGGLE_ADDON"; addon: string }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "SUBMIT" };

const initialState: BookingState = {
  step: 1,
  propertyType: "",
  service: "",
  homeType: "",
  bedrooms: 2,
  bathrooms: "1",
  sqft: "",
  neighborhood: "",
  addOns: [],
  frequency: "one-time",
  date: "",
  timeWindow: "no-preference",
  instructions: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  unit: "",
  hearAbout: "",
  referralCode: "",
  promoCode: "",
  agreeTerms: false,
  submitted: false,
  errors: {},
};

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value, errors: { ...state.errors, [action.field]: "" } };
    case "TOGGLE_ADDON": {
      const addOns = state.addOns.includes(action.addon)
        ? state.addOns.filter((a) => a !== action.addon)
        : [...state.addOns, action.addon];
      return { ...state, addOns };
    }
    case "NEXT_STEP":
      return { ...state, step: Math.min(state.step + 1, 4), errors: {} };
    case "PREV_STEP":
      return { ...state, step: Math.max(state.step - 1, 1), errors: {} };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SUBMIT":
      return { ...state, submitted: true };
    default:
      return state;
  }
}

function validateStep(state: BookingState): Record<string, string> {
  const errors: Record<string, string> = {};
  switch (state.step) {
    case 1:
      if (!state.propertyType) errors.service = "Please select a property type.";
      else if (state.propertyType === "residential" && !state.service) errors.service = "Please select a service.";
      break;
    case 2:
      if (!state.homeType) errors.homeType = "Please select a home type.";
      break;
    case 3:
      if (!state.date) errors.date = "Please select a date.";
      break;
    case 4:
      if (!state.name.trim()) errors.name = "Name is required.";
      if (!state.email.trim()) errors.email = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email))
        errors.email = "Please enter a valid email.";
      if (!state.phone.trim()) errors.phone = "Phone is required.";
      else if (!/^[\d\s\-().+]{7,}$/.test(state.phone))
        errors.phone = "Please enter a valid phone number.";
      if (!state.address.trim()) errors.address = "Address is required.";
      if (!state.agreeTerms) errors.agreeTerms = "You must agree to the service terms.";
      break;
  }
  return errors;
}

const stepLabels = ["Service", "Details", "Schedule", "Confirm"];

function BookingWizardInner() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) dispatch({ type: "SET_FIELD", field: "referralCode", value: ref.toUpperCase() });
    const promo = searchParams.get("promo");
    if (promo) dispatch({ type: "SET_FIELD", field: "promoCode", value: promo.toUpperCase() });
  }, [searchParams]);

  const isRecurringFreq = state.frequency === "weekly" || state.frequency === "biweekly";
  const recurringPerVisit = estimatePrice(state.service, state.bedrooms, state.frequency, state.addOns);
  const promoDiscount = state.promoCode.toUpperCase() === "FIRST30" ? 30 : 0;
  const price = Math.max(0, recurringPerVisit - promoDiscount);

  const handleNext = () => {
    const errors = validateStep(state);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }
    dispatch({ type: "NEXT_STEP" });
  };

  const handleSubmit = async () => {
    const errors = validateStep(state);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state, price }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      dispatch({ type: "SUBMIT" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (state.submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cta-green/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-cta-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-navy mb-3">Thank you!</h2>
        <p className="text-charcoal/70 mb-2">
          We&apos;ll confirm your appointment within 30 minutes.
        </p>
        <p className="text-charcoal/60 text-sm">Check your email for details.</p>
      </div>
    );
  }

  if (state.propertyType === "commercial" || state.propertyType === "postconstruction") {
    return (
      <div>
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            Get a custom quote.
          </h1>
          <p className="mt-4 text-lg text-charcoal/70">
            Tell us about your space and we&apos;ll get back to you within a few hours.
          </p>
        </div>
        <QuoteRequest
          propertyType={state.propertyType}
          onBack={() => dispatch({ type: "SET_FIELD", field: "propertyType", value: "" })}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
          Book your cleaning in 60 seconds.
        </h1>
        <p className="mt-4 text-lg text-charcoal/70">
          Pick your details below and we&apos;ll confirm your appointment within 30 minutes.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-cta-green">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          No payment today — we collect after the job is done
        </p>
      </div>
      <StepIndicator currentStep={state.step} totalSteps={4} labels={stepLabels} />

      <div className="min-h-[400px]">
        {state.step === 1 && <ServiceSelect state={state} dispatch={dispatch} />}
        {state.step === 2 && <HomeDetails state={state} dispatch={dispatch} />}
        {state.step === 3 && <Schedule state={state} dispatch={dispatch} />}
        {state.step === 4 && (
          <ContactConfirm
            state={state}
            dispatch={dispatch}
            price={price}
            originalPrice={recurringPerVisit}
            recurringPrice={isRecurringFreq && promoDiscount > 0 ? recurringPerVisit : 0}
          />
        )}
      </div>

      {/* Price summary bar — only show from Step 3 onward */}
      {state.step >= 3 && state.service && (
        <div className="mt-8 p-4 rounded-lg bg-navy/5 flex items-center justify-between">
          {isRecurringFreq && promoDiscount > 0 ? (
            <>
              <div>
                <span className="text-sm text-charcoal/70">First clean</span>
                <span className="ml-2 text-xs font-semibold text-cta-green">FIRST30 applied</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-navy">${price}</span>
                <span className="block text-xs text-charcoal/50">then ${recurringPerVisit}/visit</span>
              </div>
            </>
          ) : (
            <>
              <span className="text-sm text-charcoal/70">Estimated Price</span>
              <span className="text-2xl font-bold text-navy">${price}</span>
            </>
          )}
        </div>
      )}

      {submitError && (
        <p className="mt-4 text-sm text-red-600 text-center">{submitError}</p>
      )}

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        {state.step > 1 ? (
          <Button variant="outline" onClick={() => dispatch({ type: "PREV_STEP" })}>
            Back
          </Button>
        ) : (
          <div />
        )}
        {state.step < 4 ? (
          <Button variant="gold" onClick={handleNext}>
            Continue
          </Button>
        ) : (
          <Button variant="green" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting…" : "Confirm Booking"}
          </Button>
        )}
      </div>
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
