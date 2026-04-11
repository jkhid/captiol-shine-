import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { FAQAccordion } from "@/components/pricing/FAQ";

const URL = "https://capitolshinecleaners.com/services/post-construction-cleaning";

export const metadata: Metadata = {
  title: "Post-Construction Cleaning — Arlington & Northern Virginia | Capitol Shine",
  description:
    "Post-construction cleanup for new builds and renovations in Northern Virginia. Rough clean, final clean, and pre-walkthrough touch-up. All jobs quoted on-site.",
  openGraph: {
    title: "Post-Construction Cleaning in Northern Virginia | Capitol Shine",
    description:
      "Specialized construction cleanup for contractors and homeowners across Arlington, McLean, Alexandria, and Fairfax.",
    url: URL,
  },
  alternates: { canonical: URL },
};

const phases = [
  {
    title: "Rough Clean",
    desc: "Mid-build debris removal and dust control before finish carpentry, paint, or flooring goes in.",
  },
  {
    title: "Final Clean",
    desc: "Full detail clean of every finished surface — windows, fixtures, floors, cabinetry interiors — ready for handoff.",
  },
  {
    title: "Touch-Up Before Walkthrough",
    desc: "Last-mile clean scheduled right before owner walkthrough or punch-list review, so nothing reflects poorly on your build.",
  },
];

const whatsIncluded = [
  "Construction dust removal from every surface",
  "Sticker, adhesive, and paint overspray removal",
  "Interior window and track cleaning",
  "Inside all cabinets, drawers, and closets",
  "Bathroom and kitchen fixture polishing",
  "Floor vacuuming, mopping, and final detailing",
  "Light fixture and ceiling fan dusting",
  "HVAC vent wipe-down",
];

const faqs = [
  {
    q: "How much does post-construction cleaning cost?",
    a: "Post-construction jobs are always quoted on-site — the right price depends on square footage, finish type, and how much drywall dust and debris is actually present. We provide firm, itemized pricing before work begins.",
  },
  {
    q: "Do you work on contractor schedules?",
    a: "Yes. We&apos;re set up to work around your trades and inspections. Most contractors schedule us for a rough clean before finishes go in, plus a final clean right before the walkthrough.",
  },
  {
    q: "Can you clean around other trades still on site?",
    a: "Yes, with coordination. We frequently share sites with trim carpenters, painters, and HVAC finishers — we just need a site plan so we don&apos;t re-dirty each other&apos;s work.",
  },
  {
    q: "What areas do you serve for post-construction?",
    a: "Arlington, McLean, Alexandria, Falls Church, Fairfax, Vienna, and the broader Northern Virginia construction market. We travel across the region for larger builds.",
  },
  {
    q: "Can you handle large new-build projects?",
    a: "Yes. We scale crew size to the project. Recent work has included multi-unit new construction and full gut renovations.",
  },
];

export default function PostConstructionCleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Post-Construction Cleaning",
            serviceType: "Post-Construction Cleanup",
            provider: {
              "@type": "LocalBusiness",
              name: "Capitol Shine Cleaners",
              telephone: "+1-703-375-9132",
              areaServed: "Northern Virginia",
            },
            areaServed: ["Arlington, VA", "McLean, VA", "Alexandria, VA", "Falls Church, VA", "Fairfax, VA"],
            description:
              "Post-construction cleanup for new builds and renovations in Northern Virginia. Rough, final, and pre-walkthrough cleans.",
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
              Post-Construction Cleaning in Northern Virginia
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Rough clean, final clean, and pre-walkthrough touch-up. Specialized crews, firm on-site quotes,
              and no surprises before owner handoff.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link
                href="/pricing?service=construction"
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
            Three cleanup phases
          </h2>
          <p className="text-charcoal/70 mb-8 max-w-2xl">
            Most builds need us more than once. We can run any combination of the three phases below,
            scheduled around your construction timeline.
          </p>
          <div className="space-y-5">
            {phases.map((p) => (
              <div key={p.title} className="bg-white border border-gray-100 rounded-xl p-6">
                <h3 className="font-display text-lg font-bold text-navy mb-2">{p.title}</h3>
                <p className="text-sm text-charcoal/70">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border-y border-gray-100 py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-6">
              What&apos;s included in a final clean
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                  <CheckCircle2 size={16} className="text-cta-green flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-8">
            Post-construction cleaning FAQs
          </h2>
          <FAQAccordion items={faqs} />
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-navy rounded-2xl p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Get an on-site quote this week.
            </h2>
            <p className="text-white/60 mb-6 max-w-sm mx-auto text-sm">
              Contractors and homeowners across Northern Virginia trust us with pre-handoff cleanup.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/pricing?service=construction"
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
