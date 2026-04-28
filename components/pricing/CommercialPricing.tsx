import QuoteRequestForm from "./QuoteRequestForm";

const PROCESS_STEPS = [
  {
    title: "Request a quote",
    subtitle: "We respond same business day",
    description:
      "Fill out a short form with your space size, location, and cleaning frequency. A team member will follow up to confirm details and schedule your walk-through.",
  },
  {
    title: "Free walk-through",
    subtitle: "In-person, no obligation",
    description:
      "We assess your space firsthand — layout, condition, traffic areas, and specific needs — so your quote reflects reality, not a rough guess.",
  },
  {
    title: "Receive your proposal",
    subtitle: "Firm, itemized pricing — no surprises",
    description:
      "We send a detailed written proposal breaking down exactly what's included and what each visit costs. No hidden fees, no pressure to sign.",
  },
];

export default function CommercialPricing() {
  return (
    <div className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* How it works */}
        <section className="mb-14">
          <div className="mb-8">
            <h2 className="font-display text-3xl text-ink font-light tracking-tight mb-2">
              How our commercial process works
            </h2>
            <p className="text-muted text-sm leading-relaxed">
              Every commercial space is different — square footage, layout, and frequency all affect the rate.
              Getting started with a recurring commercial cleaning service in Arlington &amp; Northern Virginia
              is straightforward.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="bg-white rounded-2xl border border-navy/8 p-5 flex items-start gap-4"
              >
                <span className="w-8 h-8 rounded-full bg-navy text-white text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-navy text-sm">{step.title}</p>
                  <p className="text-xs text-muted mb-1.5">{step.subtitle}</p>
                  <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quote form */}
        <section className="bg-white rounded-2xl border border-navy/8 p-6 md:p-8">
          <h2 className="font-display text-2xl text-ink font-light tracking-tight mb-1">
            Get a free estimate
          </h2>
          <p className="text-sm text-muted mb-6">
            No commitment — we&apos;ll confirm your rate after a quick walk-through.
          </p>
          <QuoteRequestForm serviceType="commercial" />
        </section>

      </div>
    </div>
  );
}
