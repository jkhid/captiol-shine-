import SectionWrapper from "@/components/ui/SectionWrapper";
import QuoteRequestForm from "./QuoteRequestForm";

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
