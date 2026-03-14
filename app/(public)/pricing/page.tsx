import type { Metadata } from "next";
import Link from "next/link";
import { Home, Building2, Briefcase, HardHat } from "lucide-react";
import PricingCalculator from "@/components/pricing/PricingCalculator";
import AddOns from "@/components/pricing/AddOns";
import AirbnbPricing from "@/components/pricing/AirbnbPricing";
import CommercialPricing from "@/components/pricing/CommercialPricing";
import ConstructionPricing from "@/components/pricing/ConstructionPricing";
import PricingFAQ from "@/components/pricing/FAQ";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Cleaning services for Arlington, VA — residential, Airbnb, commercial, and post-construction. Transparent pricing with no hidden fees.",
  openGraph: {
    title: "Services & Pricing | Capitol Shine",
    description: "Residential, Airbnb, commercial & construction cleaning in Arlington, VA.",
  },
};

const TABS = [
  { key: "residential",  label: "Residential",   icon: Home,      description: "Standard, Deep & Move-In/Out" },
  { key: "airbnb",       label: "Airbnb / STR",   icon: Building2, description: "Turnover cleaning for hosts" },
  { key: "commercial",   label: "Commercial",     icon: Briefcase, description: "Offices & retail spaces" },
  { key: "construction", label: "Construction",   icon: HardHat,   description: "Post-build & renovation" },
] as const;

type ServiceKey = typeof TABS[number]["key"];

const HERO_COPY: Record<ServiceKey, { heading: string; sub: string }> = {
  residential: {
    heading: "Simple, transparent pricing.",
    sub: "No hidden fees. No estimates needed. Pick your home size and service — your price is right here.",
  },
  airbnb: {
    heading: "Airbnb & short-term rental cleaning.",
    sub: "Consistent, same-day turnovers your guests will notice. Flat-rate pricing by bedroom count.",
  },
  commercial: {
    heading: "Commercial cleaning for Northern Virginia.",
    sub: "Recurring office and retail cleaning at competitive rates. Free walk-through before we start.",
  },
  construction: {
    heading: "Post-construction cleanup done right.",
    sub: "Rough clean, final clean, or touch-up — we work around your schedule. All jobs quoted on-site.",
  },
};

export default function PricingPage({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  const service: ServiceKey =
    TABS.some((t) => t.key === searchParams.service)
      ? (searchParams.service as ServiceKey)
      : "residential";

  const { heading, sub } = HERO_COPY[service];

  return (
    <>
      {/* Hero + tab strip */}
      <section className="bg-off-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
              {heading}
            </h1>
            <p className="mt-4 text-lg text-charcoal/70">{sub}</p>
          </div>

          {/* Service tab strip */}
          <div className="flex flex-wrap justify-center gap-3">
            {TABS.map(({ key, label, icon: Icon }) => (
              <Link
                key={key}
                href={`/pricing?service=${key}`}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  service === key
                    ? "bg-navy text-white shadow-md"
                    : "bg-gray-100 text-charcoal hover:bg-gray-200"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tab content */}
      {service === "residential" && (
        <>
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PricingCalculator />
            </div>
          </section>
          <AddOns />
        </>
      )}
      {service === "airbnb"       && <AirbnbPricing />}
      {service === "commercial"   && <CommercialPricing />}
      {service === "construction" && <ConstructionPricing />}

      <PricingFAQ />
    </>
  );
}
