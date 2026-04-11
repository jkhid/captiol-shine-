import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronRight, ClipboardList } from "lucide-react";
import { FAQAccordion } from "@/components/pricing/FAQ";

const URL = "https://capitolshinecleaners.com/services/move-out-cleaning";

export const metadata: Metadata = {
  title: "Move-Out Cleaning Service — Arlington, VA | Capitol Shine",
  description:
    "Move-out and move-in cleaning in Arlington, VA. Inside every cabinet, drawer, and appliance — spotless for new owners, or to get your full security deposit back.",
  openGraph: {
    title: "Move-Out Cleaning Service in Arlington, VA | Capitol Shine",
    description:
      "Deposit-ready move-out cleaning for Arlington renters and homeowners. Every cabinet, appliance, and surface detailed.",
    url: URL,
  },
  alternates: { canonical: URL },
};

const whatsIncluded = [
  "Inside all kitchen cabinets and drawers",
  "Inside oven, fridge, freezer, and dishwasher",
  "Inside bathroom vanities and medicine cabinets",
  "Baseboards and door frames throughout",
  "Interior windows and window tracks",
  "Closet shelves and interiors",
  "Scuff marks on walls (where removable)",
  "Light fixtures, ceiling fans, and switch plates",
];

const whoItsFor = [
  "Renters who want their full security deposit back",
  "Sellers preparing for buyer walkthrough or photos",
  "Buyers moving into a previously occupied home",
  "Landlords turning over units between tenants",
];

const faqs = [
  {
    q: "How much does move-out cleaning cost in Arlington, VA?",
    a: "Pricing depends on home size and condition, but most 1-2 bedroom Arlington apartments fall between $300 and $500. Three-bedroom homes typically run $500-$750. You can see exact pricing on our pricing page or get a quote in under 60 seconds.",
  },
  {
    q: "How long does a move-out clean take?",
    a: "A thorough move-out clean for a standard one-bedroom Arlington apartment takes 6-8 hours. Larger homes can run a full day. The difference from a standard clean is the inside-everything work: cabinets, appliances, closets, window tracks.",
  },
  {
    q: "Will this help me get my security deposit back?",
    a: "Yes — that's exactly what it's designed for. We provide a detailed receipt you can share with your landlord or property manager if there's any dispute. Our checklist mirrors what Arlington property managers actually inspect.",
  },
  {
    q: "Do I need to be there during the cleaning?",
    a: "No. Most clients provide a key, lockbox code, or smart lock access. We'll confirm access details when you book.",
  },
  {
    q: "Can you clean the same day I'm moving out?",
    a: "Same-day cleans are often possible depending on schedule. For guaranteed availability, we recommend booking your move-out clean a few days in advance.",
  },
];

export default function MoveOutCleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Move-Out Cleaning Service",
            serviceType: "Move-Out Cleaning",
            provider: {
              "@type": "LocalBusiness",
              name: "Capitol Shine Cleaners",
              telephone: "+1-703-375-9132",
              areaServed: "Arlington, VA and Northern Virginia",
            },
            areaServed: ["Arlington, VA", "McLean, VA", "Alexandria, VA", "Falls Church, VA"],
            description:
              "Professional move-out and move-in cleaning in Arlington, VA. Deposit-ready detail clean of every cabinet, appliance, and surface.",
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
              Move-Out Cleaning Service in Arlington, VA
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Get your full security deposit back. Every cabinet, drawer, appliance, and surface detailed to
              the standard Arlington landlords actually inspect.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link
                href="/book?service=moveout"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-navy text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                Book Move-Out Clean
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white text-sm font-medium hover:border-white/50 transition-colors"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-6">
            What&apos;s included
          </h2>
          <p className="text-charcoal/70 mb-8 max-w-2xl">
            Our most thorough service. Move-out cleaning goes well beyond a deep clean —
            every cabinet interior, every appliance, every closet, every window track.
            This is the clean that gets deposits returned.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {whatsIncluded.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                <CheckCircle2 size={16} className="text-cta-green flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/checklists/move-out-cleaning"
              className="inline-flex items-center gap-1 text-sm font-medium text-navy hover:gap-2 transition-all"
            >
              <ClipboardList size={15} /> Full room-by-room checklist <ChevronRight size={15} />
            </Link>
            <Link
              href="/blog/move-out-cleaning-checklist-arlington"
              className="inline-flex items-center gap-1 text-sm font-medium text-navy hover:gap-2 transition-all"
            >
              Arlington renter&apos;s guide <ChevronRight size={15} />
            </Link>
          </div>
        </section>

        <section className="bg-white border-y border-gray-100 py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-6">
              Who it&apos;s for
            </h2>
            <ul className="space-y-3">
              {whoItsFor.map((item) => (
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
            Move-out cleaning FAQs
          </h2>
          <FAQAccordion items={faqs} />
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-navy rounded-2xl p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Get your deposit back.
            </h2>
            <p className="text-white/60 mb-6 max-w-sm mx-auto text-sm">
              Book a move-out clean online in 60 seconds. Detailed receipt provided.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book?service=moveout"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-navy text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                Book Move-Out Clean
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
