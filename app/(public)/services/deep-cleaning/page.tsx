import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronRight, ClipboardList } from "lucide-react";
import { FAQAccordion } from "@/components/pricing/FAQ";

const URL = "https://capitolshinecleaners.com/services/deep-cleaning";

export const metadata: Metadata = {
  title: "Deep Cleaning Service — Arlington, VA | Capitol Shine",
  description:
    "One-time deep house cleaning in Arlington, VA. Inside oven, baseboards, grout, ceiling fans, window tracks — every spot that builds up over time. Flat-rate pricing from $240.",
  openGraph: {
    title: "Deep Cleaning Service in Arlington, VA | Capitol Shine",
    description:
      "Professional deep house cleaning in Arlington and Northern Virginia. Everything a standard clean covers, plus the spots that never get touched.",
    url: URL,
  },
  alternates: { canonical: URL },
};

const whatsIncluded = [
  "Inside oven, microwave, and range hood",
  "Baseboards, door frames, and crown molding",
  "Ceiling fans and light fixtures",
  "Window sills and interior tracks",
  "Bathroom grout and tile scrubbing",
  "Switch plates and outlet covers",
  "Behind and around accessible appliances",
  "Inside all cabinets (on request)",
];

const whoItsFor = [
  "First-time clients starting a recurring service",
  "Homes that haven't had a professional clean in 6+ months",
  "Pre-listing prep before selling or photographing a home",
  "Post-holiday or end-of-season resets",
];

const faqs = [
  {
    q: "How long does a deep cleaning take?",
    a: "A deep clean typically takes two to three times longer than a standard cleaning. For a one-bedroom Arlington apartment, expect 4-5 hours. A three-bedroom home usually runs 6-8 hours depending on condition.",
  },
  {
    q: "How much does deep cleaning cost in Arlington?",
    a: "Our deep cleans start at $240 for smaller homes. Final pricing depends on square footage, number of bathrooms, and the condition of the space. You can see exact pricing on our pricing page.",
  },
  {
    q: "How often should I get a deep clean?",
    a: "Most households benefit from a deep clean twice a year — typically spring and fall. Homes with pets, kids, or heavy daily use often move to quarterly. See our deep cleaning frequency guide for more.",
  },
  {
    q: "What's the difference between a deep clean and a standard clean?",
    a: "A standard clean covers counters, floors, kitchens, bathrooms, and trash — the regular-maintenance tasks. A deep clean adds everything that doesn't get touched week to week: baseboards, inside appliances, grout, ceiling fans, window tracks, and more.",
  },
];

export default function DeepCleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Deep House Cleaning",
            serviceType: "Deep Cleaning",
            provider: {
              "@type": "LocalBusiness",
              name: "Capitol Shine Cleaners",
              telephone: "+1-703-375-9132",
              areaServed: "Arlington, VA and Northern Virginia",
            },
            areaServed: [
              "Arlington, VA", "McLean, VA", "Alexandria, VA", "Falls Church, VA",
            ],
            description:
              "One-time deep house cleaning in Arlington, VA covering baseboards, inside appliances, grout, ceiling fans, and every spot that builds up over time.",
            url: URL,
            offers: { "@type": "Offer", priceCurrency: "USD", price: "240", priceValidUntil: "2026-12-31" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-paper border-b border-navy/8 py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-xs text-muted font-medium">
              <li><Link href="/" className="hover:text-navy transition-colors">Home</Link></li>
              <li className="text-navy/30">/</li>
              <li><Link href="/services" className="hover:text-navy transition-colors">Services</Link></li>
              <li className="text-navy/30">/</li>
              <li className="text-charcoal">Deep Cleaning</li>
            </ol>
          </nav>
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Arlington & Northern Virginia</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-none">
            Deep cleaning service<br />
            <em className="italic">in Arlington, VA.</em>
          </h1>
          <p className="mt-4 text-muted text-base leading-relaxed max-w-xl">
            A one-time reset that covers everything a standard clean skips — inside the oven, baseboards,
            grout, ceiling fans, window tracks, and the spots buildup actually hides in.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/book?promo=FIRST30&service=deep"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy/90 transition-colors"
            >
              Book Online — $30 Off
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-navy/15 text-navy text-sm font-medium hover:border-navy/30 transition-colors"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="font-display text-2xl md:text-3xl text-ink font-light tracking-tight mb-6">
          What a deep clean covers
        </h2>
        <p className="text-muted mb-8 max-w-2xl">
          Everything included in our standard cleaning, plus the areas that collect buildup between visits.
          This is the service we recommend for first-time clients and homes that haven&apos;t had a professional
          touch in a while.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {whatsIncluded.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
              <CheckCircle2 size={16} className="text-green flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            href="/checklists/deep-cleaning"
            className="inline-flex items-center gap-1 text-sm font-medium text-navy hover:gap-2 transition-all"
          >
            <ClipboardList size={15} /> See the full room-by-room checklist <ChevronRight size={15} />
          </Link>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-white border-y border-navy/8 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl text-ink font-light tracking-tight mb-6">
            Who deep cleaning is for
          </h2>
          <ul className="space-y-3">
            {whoItsFor.map((item) => (
              <li key={item} className="flex items-start gap-2 text-charcoal/80">
                <CheckCircle2 size={18} className="text-green flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="font-display text-2xl md:text-3xl text-ink font-light tracking-tight mb-8">
          Deep cleaning FAQs
        </h2>
        <FAQAccordion items={faqs} />
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-ink rounded-2xl p-8 md:p-10 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-white font-light tracking-tight">
            Ready for a reset?<br />
            <em className="italic">Book in 60 seconds.</em>
          </h2>
          <p className="text-white/60 mt-3 mb-6 max-w-sm mx-auto text-sm">
            New clients save $30 with promo FIRST30.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/book?promo=FIRST30&service=deep"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-navy text-sm font-semibold hover:bg-gold/90 transition-colors"
            >
              Book Online — $30 Off
            </Link>
            <a
              href="tel:+17033759132"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white text-sm font-medium hover:border-white/40 transition-colors"
            >
              Call (703) 375-9132
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
