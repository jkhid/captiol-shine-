import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { AIRBNB_PRICING, AIRBNB_LINEN_ADDON } from "@/lib/pricing-data";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function AirbnbPricing() {
  return (
    <SectionWrapper className="py-16 bg-off-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-2">
          Airbnb / Short-Term Rental
        </h2>
        <p className="text-charcoal/70 mb-8">
          Turnover cleaning with same-day availability. Consistent quality your guests will notice.
        </p>
        <Card className="max-w-xl">
          <div className="space-y-3 mb-6">
            {AIRBNB_PRICING.map((tier) => (
              <div
                key={tier.name}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <span className="font-medium">{tier.name}</span>
                <span className="text-xl font-bold text-navy">${tier.price}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2 text-charcoal/70">
              <span>Linen service add-on</span>
              <span className="font-semibold">+${AIRBNB_LINEN_ADDON}</span>
            </div>
          </div>
          <Button href="/book" variant="green" className="w-full">
            Set Up Recurring Turnovers
          </Button>
        </Card>
      </div>
    </SectionWrapper>
  );
}
