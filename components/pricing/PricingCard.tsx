import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Check } from "lucide-react";
import type { PricingTier, HomeSize } from "@/lib/pricing-data";

interface PricingCardProps {
  tier: PricingTier;
  homeSize: HomeSize;
}

export default function PricingCard({ tier, homeSize }: PricingCardProps) {
  const price = tier.prices[homeSize];

  return (
    <Card hover className="flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-navy">{tier.name}</h3>
        {tier.subtitle && (
          <span className="text-sm text-charcoal/60">{tier.subtitle}</span>
        )}
      </div>
      <div className="mb-6">
        <span className="text-4xl font-bold text-navy">${price}</span>
      </div>
      <ul className="space-y-2 mb-6 flex-1">
        {tier.included.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
            <Check size={16} className="text-cta-green flex-shrink-0 mt-0.5" />
            {item}
          </li>
        ))}
      </ul>
      <Button href="/book" variant="green" className="w-full">
        Book This Service
      </Button>
    </Card>
  );
}
