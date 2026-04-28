import type { Metadata } from "next";
import Link from "next/link";
import { Home, Building2, Briefcase, HardHat } from "lucide-react";
import PricingCalculator from "@/components/pricing/PricingCalculator";
import AddOns from "@/components/pricing/AddOns";
import AirbnbPricing from "@/components/pricing/AirbnbPricing";
import CommercialPricing from "@/components/pricing/CommercialPricing";
import ConstructionPricing from "@/components/pricing/ConstructionPricing";
import PricingFAQ from "@/components/pricing/FAQ";

const SERVICE_META: Record<string, { title: string; description: string }> = {
  residential: {
    title: "House Cleaning Prices — Arlington, VA | Capitol Shine",
    description:
      "Transparent house cleaning prices in Arlington, VA. Standard cleans from $150, deep cleans from $240, move-in/out from $300. No hidden fees, no contracts. Book online in 60 seconds.",
  },
  airbnb: {
    title: "Airbnb & Short-Term Rental Cleaning — Arlington, VA | Capitol Shine",
    description:
      "Same-day Airbnb and vacation rental turnover cleaning in Arlington and Northern Virginia. Reliable, consistent turnovers your guests will notice. Request a rate today.",
  },
  commercial: {
    title: "Commercial Office Cleaning — Arlington & Northern Virginia | Capitol Shine",
    description:
      "Recurring office and retail cleaning in Arlington, VA. Free walk-through estimate, flexible scheduling including after hours. No long-term contracts.",
  },
  construction: {
    title: "Post-Construction Cleaning — Arlington & Northern Virginia | Capitol Shine",
    description:
      "Post-construction cleanup in Northern Virginia. Rough clean, final clean, and touch-up before owner walkthrough. Free on-site estimate within 24–48 hours.",
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { service?: string };
}): Promise<Metadata> {
  const key = searchParams.service && SERVICE_META[searchParams.service]
    ? searchParams.service
    : "residential";
  const { title, description } = SERVICE_META[key];
  const url = `https://capitolshinecleaners.com/pricing${key !== "residential" ? `?service=${key}` : ""}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

const TABS = [
  { key: "residential",  label: "Residential",   icon: Home,      description: "Standard, Deep & Move-In/Out" },
  { key: "airbnb",       label: "Airbnb / STR",   icon: Building2, description: "Turnover cleaning for hosts" },
  { key: "commercial",   label: "Commercial",     icon: Briefcase, description: "Offices & retail spaces" },
  { key: "construction", label: "Construction",   icon: HardHat,   description: "Post-build & renovation" },
] as const;

type ServiceKey = typeof TABS[number]["key"];

const HERO_COPY: Record<ServiceKey, { eyebrow: string; heading: string; sub: string }> = {
  residential: {
    eyebrow: "Residential cleaning",
    heading: "Transparent pricing.\nNo surprises.",
    sub: "Pick your home size and service type — your price is right here. No estimates needed, no hidden fees.",
  },
  airbnb: {
    eyebrow: "Airbnb & short-term rentals",
    heading: "5-star turnovers,\nevery time.",
    sub: "Same-day turnovers your guests will notice. Flat-rate estimates below — confirmed after a quick property review.",
  },
  commercial: {
    eyebrow: "Commercial cleaning",
    heading: "Professional spaces.\nProfessional clean.",
    sub: "Recurring office and retail cleaning at competitive rates. Free walk-through before we start.",
  },
  construction: {
    eyebrow: "Post-construction",
    heading: "Move-in ready.\nNot a speck of dust.",
    sub: "Specialized cleanup for new builds and renovations. Every project quoted on-site — no guesswork.",
  },
};

// Service JSON-LD schema
function serviceSchema(service: ServiceKey) {
  const labels: Record<ServiceKey, string> = {
    residential: "Residential House Cleaning",
    airbnb: "Airbnb & Short-Term Rental Cleaning",
    commercial: "Commercial Office Cleaning",
    construction: "Post-Construction Cleaning",
  };
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: labels[service],
    serviceType: labels[service],
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://capitolshinecleaners.com",
      name: "Capitol Shine",
    },
    areaServed: [
      { "@type": "City", name: "Arlington, VA" },
      { "@type": "City", name: "Alexandria, VA" },
      { "@type": "City", name: "McLean, VA" },
    ],
    url: `https://capitolshinecleaners.com/pricing${service !== "residential" ? `?service=${service}` : ""}`,
  };
}

export default function PricingPage({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  const service: ServiceKey =
    TABS.some((t) => t.key === searchParams.service)
      ? (searchParams.service as ServiceKey)
      : "residential";

  const { eyebrow, heading, sub } = HERO_COPY[service];
  const headingLines = heading.split("\n");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
      />

      {/* Page header */}
      <section className="bg-paper py-14 md:py-20 border-b border-navy/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-muted font-medium">
              <li><Link href="/" className="hover:text-navy transition-colors">Home</Link></li>
              <li className="text-navy/30">/</li>
              <li className="text-charcoal">Pricing</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">{eyebrow}</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink font-light tracking-tight leading-none">
              {headingLines.map((line, i) => (
                <span key={i}>
                  {i === 1 ? <em className="italic">{line}</em> : line}
                  {i < headingLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="mt-5 text-lg text-muted leading-relaxed max-w-xl">{sub}</p>
          </div>

          {/* Service tabs */}
          <div className="mt-10 flex flex-wrap gap-2">
            {TABS.map(({ key, label, icon: Icon }) => (
              <Link
                key={key}
                href={`/pricing?service=${key}`}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                  service === key
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-charcoal border-navy/12 hover:border-navy/30"
                }`}
              >
                <Icon size={14} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tab content */}
      {service === "residential" && (
        <>
          <section className="py-16 md:py-20">
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

      <PricingFAQ service={service} />
    </>
  );
}
