import { Check } from "lucide-react";
import { COMMERCIAL_TIERS, COMMERCIAL_INCLUDED, COMMERCIAL_ADDONS } from "@/lib/pricing-data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import QuoteRequestForm from "./QuoteRequestForm";

export default function CommercialPricing() {
  return (
    <>
      <SectionWrapper className="py-16 bg-off-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-3">
              Commercial Cleaning
            </h2>
            <p className="text-charcoal/70">
              Professional recurring cleaning for offices, retail, and commercial spaces in the
              Arlington & Northern Virginia area. Pricing below is a starting guide — we&apos;ll
              confirm your exact rate after a quick walk-through.
            </p>
          </div>

          {/* Pricing table */}
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-navy/10">
                  <th className="text-left py-3 pr-6 font-semibold text-charcoal/60 w-1/3">Space Size</th>
                  <th className="py-3 px-4 font-semibold text-navy text-center">Weekly</th>
                  <th className="py-3 px-4 font-semibold text-navy text-center">2x / Week</th>
                  <th className="py-3 px-4 font-semibold text-navy text-center">3x+ / Daily</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMMERCIAL_TIERS.map((tier) => (
                  <tr key={tier.key} className="hover:bg-white transition-colors">
                    <td className="py-4 pr-6">
                      <div className="font-semibold text-navy">{tier.name}</div>
                      <div className="text-xs text-charcoal/50 mt-0.5">{tier.sqft}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-xl font-bold text-navy">${tier.weeklyPrice}</span>
                      <span className="text-xs text-charcoal/50 block">/visit</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-xl font-bold text-navy">${tier.twiceWeeklyPrice}</span>
                      <span className="text-xs text-charcoal/50 block">/visit</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <a href="#quote" className="text-sm font-semibold text-gold hover:underline">Get a quote</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm text-charcoal/70 mt-3 font-medium">
              * Prices are estimates only — final rate may be lower or higher depending on space condition, layout, and specific needs. Confirmed after a free walk-through.
            </p>
          </div>

          {/* What's included + Add-ons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <div>
              <h3 className="font-semibold text-navy mb-4">Every visit includes</h3>
              <ul className="space-y-2">
                {COMMERCIAL_INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-charcoal/70">
                    <Check size={15} className="text-cta-green mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-navy mb-4">Popular add-ons</h3>
              <div className="space-y-2">
                {COMMERCIAL_ADDONS.map((addon) => (
                  <div
                    key={addon.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100 text-sm"
                  >
                    <span className="text-charcoal/70">{addon.name}</span>
                    <span className="font-bold text-navy">
                      +${addon.price}
                      {"unit" in addon && (
                        <span className="text-xs font-normal text-charcoal/50 ml-1">{addon.unit}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quote form */}
          <div id="quote" className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 max-w-2xl">
            <h3 className="font-display text-xl font-bold text-navy mb-1">
              Get a free estimate
            </h3>
            <p className="text-sm text-charcoal/60 mb-6">
              Tell us about your space and we&apos;ll be in touch within a few hours to schedule a
              quick walk-through.
            </p>
            <QuoteRequestForm serviceType="commercial" />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
