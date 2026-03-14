import { ADD_ONS } from "@/lib/pricing-data";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function AddOns() {
  return (
    <SectionWrapper className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-2">
          Add-On Services
        </h2>
        <p className="text-charcoal/60 mb-8">Add-ons can be selected during booking.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ADD_ONS.map((addon) => (
            <div
              key={addon.name}
              className="flex items-center justify-between p-4 rounded-lg bg-off-white"
            >
              <span className="font-medium text-charcoal">{addon.name}</span>
              <span className="text-navy font-bold">
                ${addon.price}
                {addon.unit && (
                  <span className="text-xs font-normal text-charcoal/60 ml-1">
                    {addon.unit}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
