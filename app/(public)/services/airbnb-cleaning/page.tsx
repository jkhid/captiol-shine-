import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { FAQAccordion } from "@/components/pricing/FAQ";

const URL = "https://capitolshinecleaners.com/services/airbnb-cleaning";

export const metadata: Metadata = {
  title: "Airbnb Cleaning Service — Arlington, VA | Capitol Shine",
  description:
    "Same-day Airbnb and short-term rental turnover cleaning in Arlington, VA. Flat-rate pricing by bedroom count starting at $95. Linen service available.",
  openGraph: {
    title: "Airbnb & Short-Term Rental Cleaning in Arlington, VA | Capitol Shine",
    description:
      "Consistent turnover cleans, same-day availability, and linen service for NoVA Airbnb hosts.",
    url: URL,
  },
  alternates: { canonical: URL },
};

const whatsIncluded = [
  "Full turnover of all bedrooms and bathrooms",
  "Fresh linens and bed-making (with linen add-on)",
  "Restock toiletries, coffee, and basic supplies",
  "Dishwasher load, unload, and kitchen reset",
  "Trash removal and liner replacement",
  "Damage and missing-item reporting with photos",
  "Guest-ready staging before every check-in",
  "Consistent same-team rotation when possible",
];

const whyHostsChoose = [
  "Same-day availability for back-to-back bookings",
  "Flat-rate pricing by bedroom count — no hourly surprises",
  "Linen service available (we handle laundry, you don't)",
  "We report damage and low supplies with photos so you never get a 1-star surprise",
];

const faqs = [
  {
    q: "How much does Airbnb cleaning cost in Arlington?",
    a: "Our Airbnb turnover pricing is flat-rate by bedroom count, starting at $95 for studios. Most 2-bedroom Arlington units fall around $145-$180 depending on linen needs. Linen service is an optional add-on.",
  },
  {
    q: "Can you handle same-day turnovers?",
    a: "Yes — same-day turnover is the core of this service. We coordinate with your checkout and check-in windows so your unit is guest-ready between bookings.",
  },
  {
    q: "Do you provide linens or handle laundry?",
    a: "We offer an optional linen service: we bring fresh hotel-grade sheets and towels, take the used set with us for laundering, and return them for the next turnover. Pricing is per bedroom.",
  },
  {
    q: "What if a guest leaves damage or stolen items?",
    a: "We photograph and report anything unusual — damage, missing items, extreme mess that's outside normal turnover scope — so you can act on it with your guest or Airbnb resolution center before the next check-in.",
  },
  {
    q: "Can I schedule recurring turnovers automatically?",
    a: "Yes. We can sync with your booking calendar (Airbnb, Vrbo, or manual). You only confirm exceptions.",
  },
];

export default function AirbnbCleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Airbnb Turnover Cleaning",
            serviceType: "Short-Term Rental Cleaning",
            provider: {
              "@type": "LocalBusiness",
              name: "Capitol Shine Cleaners",
              telephone: "+1-703-375-9132",
              areaServed: "Arlington, VA and Northern Virginia",
            },
            areaServed: ["Arlington, VA", "McLean, VA", "Alexandria, VA", "Falls Church, VA"],
            description:
              "Same-day Airbnb and short-term rental turnover cleaning in Arlington and Northern Virginia. Flat-rate pricing by bedroom count.",
            url: URL,
            offers: { "@type": "Offer", priceCurrency: "USD", price: "95" },
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
              <li className="text-charcoal">Airbnb Cleaning</li>
            </ol>
          </nav>
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Arlington & Northern Virginia</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-none">
            Airbnb cleaning service<br />
            <em className="italic">in Arlington, VA.</em>
          </h1>
          <p className="mt-4 text-muted text-base leading-relaxed max-w-xl">
            Same-day turnovers your guests will notice. Flat-rate pricing, linen service available,
            and the reliability hosts need to protect their reviews.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/pricing?service=airbnb"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy/90 transition-colors"
            >
              Get Turnover Quote
            </Link>
            <Link
              href="/pricing?service=airbnb"
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
          What every turnover includes
        </h2>
        <p className="text-muted mb-8 max-w-2xl">
          Built for hosts who don&apos;t have time to micromanage. Each turnover follows a repeatable
          scope designed to protect your reviews and keep your calendar moving.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {whatsIncluded.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
              <CheckCircle2 size={16} className="text-green flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Why hosts choose */}
      <section className="bg-white border-y border-navy/8 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl text-ink font-light tracking-tight mb-6">
            Why NoVA hosts choose us
          </h2>
          <ul className="space-y-3">
            {whyHostsChoose.map((item) => (
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
          Airbnb cleaning FAQs
        </h2>
        <FAQAccordion items={faqs} />
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-ink rounded-2xl p-8 md:p-10 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-white font-light tracking-tight">
            Turn your calendar over,<br />
            <em className="italic">stress-free.</em>
          </h2>
          <p className="text-white/60 mt-3 mb-6 max-w-sm mx-auto text-sm">
            Set up recurring turnovers in 60 seconds. First clean gets you a same-day response.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/pricing?service=airbnb"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-navy text-sm font-semibold hover:bg-gold/90 transition-colors"
            >
              Get Turnover Quote
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
