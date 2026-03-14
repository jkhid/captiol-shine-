import SectionWrapper from "@/components/ui/SectionWrapper";
import { DollarSign, Leaf, ThumbsUp, UserCheck } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Our rates are published online. No surprise fees, ever.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Products",
    description: "EPA Safer Choice certified. Safe for kids, pets, and the planet.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description: "Not happy? We re-clean for free within 24 hours.",
  },
  {
    icon: UserCheck,
    title: "Background-Checked Team",
    description: "Every cleaner is vetted, trained, and insured.",
  },
];

export default function WhyUs() {
  return (
    <SectionWrapper className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-navy text-center">
          Why Capitol Shine
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center">
                <f.icon size={22} className="text-navy" />
              </div>
              <div>
                <h3 className="font-bold text-navy mb-1">{f.title}</h3>
                <p className="text-sm text-charcoal/70">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
