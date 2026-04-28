import { Check } from "lucide-react";
import { CONSTRUCTION_PHASES } from "@/lib/pricing-data";
import QuoteRequestForm from "./QuoteRequestForm";

export default function ConstructionPricing() {
  return (
    <div className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Intro */}
        <div className="max-w-2xl mb-10">
          <h2 className="font-display text-3xl text-ink font-light tracking-tight mb-2">
            Post-construction cleanup
          </h2>
          <p className="text-muted leading-relaxed">
            Specialized cleaning for new builds and renovations. We work around your construction
            schedule and deliver a move-in ready result. Every project is quoted on-site — no
            guesswork, no surprises.
          </p>
        </div>

        {/* Phase breakdown */}
        <section className="mb-12">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-5">
            Three phases of construction cleaning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CONSTRUCTION_PHASES.map((phase, i) => (
              <article
                key={phase.name}
                className="bg-white rounded-2xl border border-navy/8 p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-navy text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-navy text-sm leading-tight">{phase.name}</p>
                    <p className="text-xs text-muted">{phase.timing}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {phase.included.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <Check size={13} className="text-green mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Pricing note */}
        <div className="bg-navy/5 border border-navy/12 rounded-xl p-5 mb-10 max-w-2xl">
          <p className="text-sm font-semibold text-navy mb-1">Pricing is always project-specific</p>
          <p className="text-sm text-muted leading-relaxed">
            Construction cleanup varies widely based on square footage, number of trades involved,
            material types, and finish level. We provide a free on-site estimate before any work
            begins — typically within 24–48 hours of your request.
          </p>
        </div>

        {/* Quote form */}
        <section className="bg-white rounded-2xl border border-navy/8 p-6 md:p-8 max-w-2xl">
          <h2 className="font-display text-2xl text-ink font-light tracking-tight mb-1">
            Request a free estimate
          </h2>
          <p className="text-sm text-muted mb-6">
            We&apos;ll schedule a walk-through within 24–48 hours and send you a firm quote before
            any work begins.
          </p>
          <QuoteRequestForm serviceType="construction" />
        </section>

      </div>
    </div>
  );
}
