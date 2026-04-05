import SectionWrapper from "@/components/ui/SectionWrapper";
import QuoteRequestForm from "./QuoteRequestForm";

const COMMERCIAL_PROCESS_STEPS = [
  {
    title: "Request a Quote",
    subtitle: "We respond same business day",
    description:
      "Fill out a short form with your space size, location, and cleaning frequency. A team member will follow up to confirm details and schedule your visit.",
  },
  {
    title: "Free Walk-Through",
    subtitle: "In-person, no obligation",
    description:
      "We assess your space firsthand — layout, condition, traffic areas, and specific needs — so your quote reflects reality, not a rough guess.",
  },
  {
    title: "Receive Your Proposal",
    subtitle: "Firm, itemized pricing — no surprises",
    description:
      "We send a detailed written proposal breaking down exactly what's included and what each visit costs. No hidden fees, no pressure to sign.",
  },
];

export default function CommercialPricing() {
  return (
    <SectionWrapper className="py-16 bg-off-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-3">
            Commercial Cleaning
          </h2>
          <p className="text-charcoal/70">
            Every commercial space is different — square footage, layout, and frequency all affect the
            rate. Fill out the form below and we&apos;ll get back to you within a few hours to
            schedule a free walk-through and give you an exact quote.
          </p>
        </div>

        {/* How it works */}
        <div className="mb-10">
          <h3 className="font-semibold text-navy mb-1">How our commercial cleaning process works</h3>
          <p className="text-sm text-charcoal/60 mb-5">
            Getting started with a recurring commercial cleaning service in Arlington &amp; Northern
            Virginia is straightforward — here&apos;s what to expect.
          </p>
          <div className="flex flex-col gap-4">
            {COMMERCIAL_PROCESS_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4"
              >
                <span className="w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold text-navy">{step.title}</div>
                  <div className="text-xs text-charcoal/50 mb-1">{step.subtitle}</div>
                  <p className="text-sm text-charcoal/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h3 className="font-display text-xl font-bold text-navy mb-1">Get a free estimate</h3>
          <p className="text-sm text-charcoal/60 mb-6">
            No commitment — we&apos;ll confirm your rate after a quick walk-through.
          </p>
          <QuoteRequestForm serviceType="commercial" />
        </div>
      </div>
    </SectionWrapper>
  );
}
