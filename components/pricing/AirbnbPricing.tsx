import { AIRBNB_PRICING } from "@/lib/pricing-data";
import QuoteRequestForm from "./QuoteRequestForm";

const PROCESS_STEPS = [
  {
    title: "Tell us about your property",
    subtitle: "Quick form, takes 2 minutes",
    description:
      "Share your unit size, location, average turnover frequency, and whether you need linen service. We'll respond within a few hours.",
  },
  {
    title: "Lock in your rate",
    subtitle: "Firm pricing — no surprises",
    description:
      "We confirm your per-turnover rate based on the property and add any extras you need. Hosts with multiple properties or weekly turnovers get priority scheduling.",
  },
  {
    title: "Same-day turnovers, on autopilot",
    subtitle: "Reliable, consistent, on-time",
    description:
      "Book turnovers as needed via our scheduling link. We treat back-to-back guest days as a priority and confirm completion with photos on request.",
  },
];

export default function AirbnbPricing() {
  return (
    <div className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Estimated pricing table */}
        <section className="mb-14">
          <div className="max-w-2xl mb-6">
            <h2 className="font-display text-3xl text-ink font-light tracking-tight mb-2">
              Estimated turnover rates
            </h2>
            <p className="text-muted text-sm leading-relaxed">
              Starting rates — we confirm your exact per-turnover rate after a quick property review.
              Hosts with frequent turnovers may qualify for a discounted rate.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-navy/8 overflow-hidden">
            <table className="w-full text-sm">
              <caption className="sr-only">Airbnb turnover cleaning rates by unit size</caption>
              <thead>
                <tr className="bg-paper border-b border-navy/8 text-left">
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted">Unit size</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted text-right">Turnover</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted text-right">Linen add-on</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted text-right">With linen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/6">
                {AIRBNB_PRICING.map((tier) => (
                  <tr key={tier.key} className="hover:bg-paper/60 transition-colors">
                    <td className="px-5 py-4 font-medium text-charcoal">{tier.name}</td>
                    <td className="px-5 py-4 text-right font-semibold text-navy">${tier.turnover}</td>
                    <td className="px-5 py-4 text-right text-muted">+${tier.linenAddOn}</td>
                    <td className="px-5 py-4 text-right font-semibold text-navy">${tier.turnover + tier.linenAddOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="font-display text-3xl text-ink font-light tracking-tight mb-2">
            How it works
          </h2>
          <p className="text-muted text-sm mb-8">
            Built for hosts running properties in Arlington and the broader Northern Virginia / DC area.
          </p>
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
        <section className="bg-white rounded-2xl border border-navy/8 p-6 md:p-8 max-w-2xl">
          <h2 className="font-display text-2xl text-ink font-light tracking-tight mb-1">
            Set up turnover service
          </h2>
          <p className="text-sm text-muted mb-6">
            Tell us about your property and we&apos;ll confirm your rate within a few hours.
          </p>
          <QuoteRequestForm serviceType="airbnb" />
        </section>

      </div>
    </div>
  );
}
