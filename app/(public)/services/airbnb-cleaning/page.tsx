import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { FAQAccordion } from "@/components/pricing/FAQ";

const URL = "https://capitolshinecleaners.com/services/airbnb-cleaning";

export const metadata: Metadata = {
  title: "Airbnb Cleaning Service — Arlington, VA | Capitol Shine",
  description:
    "Same-day Airbnb and short-term rental turnover cleaning in Arlington, VA. Flat-rate pricing by bedroom count starting at $85. Linen service available.",
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
    a: "Our Airbnb turnover pricing is flat-rate by bedroom count, starting at $85 for studios. Most 2-bedroom Arlington units fall around $135-$165. Linen service is an optional add-on.",
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
            offers: { "@type": "Offer", priceCurrency: "USD", price: "85" },
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

      <div className="bg-off-white min-h-screen">
        <section className="bg-navy py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              Arlington &amp; Northern Virginia
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Airbnb Cleaning Service in Arlington, VA
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Same-day turnovers your guests will notice. Flat-rate pricing, linen service available, and the
              reliability hosts need to protect their reviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link
                href="/book?service=airbnb"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-navy text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                Book Turnover
              </Link>
              <Link
                href="/pricing?service=airbnb"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white text-sm font-medium hover:border-white/50 transition-colors"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-6">
            What every turnover includes
          </h2>
          <p className="text-charcoal/70 mb-8 max-w-2xl">
            Built for hosts who don&apos;t have time to micromanage. Each turnover follows a repeatable
            scope designed to protect your reviews and keep your calendar moving.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {whatsIncluded.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                <CheckCircle2 size={16} className="text-cta-green flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white border-y border-gray-100 py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-6">
              Why NoVA hosts choose us
            </h2>
            <ul className="space-y-3">
              {whyHostsChoose.map((item) => (
                <li key={item} className="flex items-start gap-2 text-charcoal/80">
                  <CheckCircle2 size={18} className="text-cta-green flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-8">
            Airbnb cleaning FAQs
          </h2>
          <FAQAccordion items={faqs} />
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-navy rounded-2xl p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Turn your calendar over, stress-free.
            </h2>
            <p className="text-white/60 mb-6 max-w-sm mx-auto text-sm">
              Set up recurring turnovers in 60 seconds. First clean gets you a same-day response.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book?service=airbnb"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-navy text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                Book Turnover
              </Link>
              <a
                href="tel:+17033759132"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white text-sm font-medium hover:border-white/50 transition-colors"
              >
                Call (703) 375-9132
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
