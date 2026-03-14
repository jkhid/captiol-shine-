import { Check } from "lucide-react";
import { CONSTRUCTION_PHASES } from "@/lib/pricing-data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import QuoteRequestForm from "./QuoteRequestForm";

export default function ConstructionPricing() {
  return (
    <SectionWrapper className="py-16 bg-off-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-3">
            Post-Construction Cleanup
          </h2>
          <p className="text-charcoal/70">
            Specialized cleaning for new builds and renovations. We work around your construction
            schedule and deliver a move-in ready result. Every project is quoted on-site — no
            guesswork, no surprises.
          </p>
        </div>

        {/* Phase breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {CONSTRUCTION_PHASES.map((phase, i) => (
            <div
              key={phase.name}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold text-navy">{phase.name}</div>
                  <div className="text-xs text-charcoal/50">{phase.timing}</div>
                </div>
              </div>
              <ul className="space-y-2">
                {phase.included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-charcoal/70">
                    <Check size={14} className="text-cta-green mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pricing note */}
        <div className="bg-navy/5 border border-navy/10 rounded-xl p-5 mb-10 max-w-2xl">
          <p className="text-sm text-navy font-medium mb-1">Pricing is always project-specific</p>
          <p className="text-sm text-charcoal/60">
            Construction cleanup varies widely based on square footage, number of trades involved,
            material types, and finish level. We provide a free on-site estimate before any work
            begins — typically within 24–48 hours of your request.
          </p>
        </div>

        {/* Quote form */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 max-w-2xl">
          <h3 className="font-display text-xl font-bold text-navy mb-1">
            Request a free estimate
          </h3>
          <p className="text-sm text-charcoal/60 mb-6">
            We&apos;ll schedule a walk-through within 24–48 hours and send you a firm quote before
            any work begins.
          </p>
          <QuoteRequestForm serviceType="construction" />
        </div>
      </div>
    </SectionWrapper>
  );
}
