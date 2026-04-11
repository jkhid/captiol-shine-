import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { FAQAccordion } from "@/components/pricing/FAQ";

const URL = "https://capitolshinecleaners.com/services/commercial-cleaning";

export const metadata: Metadata = {
  title: "Commercial Cleaning Service — Arlington, VA | Capitol Shine",
  description:
    "Recurring commercial and office cleaning in Arlington, VA and Northern Virginia. Weekly, 2x, or 3x per week. Free walk-through estimate. After-hours available.",
  openGraph: {
    title: "Commercial Cleaning Service in Arlington, VA | Capitol Shine",
    description:
      "Reliable office, retail, and commercial cleaning for Northern Virginia businesses. Free on-site walk-through.",
    url: URL,
  },
  alternates: { canonical: URL },
};

const whatsIncluded = [
  "Daily, weekly, or custom recurring schedules",
  "Reception, office, and conference room detailing",
  "Restroom cleaning and restocking",
  "Kitchen and break room sanitization",
  "Trash, recycling, and liner replacement",
  "Floor care — vacuuming, mopping, hard-floor buffing",
  "Entry glass, interior glass, and high-touch sanitization",
  "Supply management and inventory tracking",
];

const industries = [
  "Professional offices and coworking spaces",
  "Medical and dental practices",
  "Retail and showroom spaces",
  "Fitness studios and wellness practices",
  "Small restaurants and cafes (front-of-house)",
];

const faqs = [
  {
    q: "How much does commercial cleaning cost in Arlington?",
    a: "Commercial cleaning is quoted by square footage, service frequency, and scope. After a free on-site walk-through we deliver firm, itemized pricing — no hourly surprises. Most small offices fall in the $300-$800/month range depending on schedule.",
  },
  {
    q: "Do you offer after-hours cleaning?",
    a: "Yes. Most of our commercial clients schedule cleanings after business hours or overnight so the space is ready before the next workday. We carry keys, alarm codes, or coordinate with building management.",
  },
  {
    q: "Are you insured and bonded?",
    a: "Yes. Every Capitol Shine team is fully licensed, bonded, and insured. We provide a certificate of insurance on request — many commercial clients need one on file.",
  },
  {
    q: "How quickly can you start?",
    a: "Most commercial accounts can be onboarded within 5-10 business days of signing. Urgent turnarounds are possible depending on current capacity.",
  },
  {
    q: "Do you require a long-term contract?",
    a: "No. We work month-to-month with a standard 30-day cancellation window. Businesses stay with us because the service is reliable, not because they're locked in.",
  },
];

export default function CommercialCleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Commercial Cleaning Service",
            serviceType: "Commercial Cleaning",
            provider: {
              "@type": "LocalBusiness",
              name: "Capitol Shine Cleaners",
              telephone: "+1-703-375-9132",
              areaServed: "Arlington, VA and Northern Virginia",
            },
            areaServed: ["Arlington, VA", "McLean, VA", "Alexandria, VA", "Falls Church, VA", "Tysons Corner, VA"],
            description:
              "Recurring commercial and office cleaning service in Arlington and Northern Virginia. Free walk-through estimate, after-hours service available.",
            url: URL,
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
              Commercial Cleaning Service in Arlington, VA
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Reliable recurring cleaning for offices, retail, and professional spaces across Northern Virginia.
              Free on-site walk-through before you ever get a quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link
                href="/pricing?service=commercial"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-navy text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                Request a Quote
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

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-6">
            What&apos;s included
          </h2>
          <p className="text-charcoal/70 mb-8 max-w-2xl">
            Every commercial account runs on a written scope of work built around your space and schedule.
            Standard inclusions across offices, retail, and professional practices:
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
              Spaces we clean
            </h2>
            <ul className="space-y-3">
              {industries.map((item) => (
                <li key={item} className="flex items-start gap-2 text-charcoal/80">
                  <CheckCircle2 size={18} className="text-cta-green flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/blog/hiring-a-commercial-cleaning-company-northern-virginia"
                className="inline-flex items-center gap-1 text-sm font-medium text-navy hover:gap-2 transition-all"
              >
                Guide: What to look for when hiring a commercial cleaner in NoVA →
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-8">
            Commercial cleaning FAQs
          </h2>
          <FAQAccordion items={faqs} />
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-navy rounded-2xl p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Free walk-through, same-day response.
            </h2>
            <p className="text-white/60 mb-6 max-w-sm mx-auto text-sm">
              Tell us about your space and we&apos;ll schedule a no-obligation walk-through this week.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/pricing?service=commercial"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-navy text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                Request a Quote
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
