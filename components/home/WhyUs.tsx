import { DollarSign, Leaf, ThumbsUp, UserCheck } from "lucide-react";

const PILLARS = [
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description: "Not happy? We re-clean for free within 24 hours — no questions asked.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Our rates are published online. No surprise fees, no upsells at the door.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Products",
    description: "EPA Safer Choice certified. Safe for kids, pets, and the environment.",
  },
  {
    icon: UserCheck,
    title: "Background-Checked Team",
    description: "Every cleaner is vetted, trained, and fully insured before entering your home.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Our promise</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-tight">
            100% satisfaction,{" "}
            <em className="italic">guaranteed.</em>
          </h2>
          <p className="mt-4 text-muted text-lg leading-relaxed max-w-xl">
            If you&apos;re not completely happy, we&apos;ll come back and re-clean within 24 hours — no cost, no hassle.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl">
          {PILLARS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-navy/8 flex items-center justify-center mt-0.5">
                <Icon size={18} className="text-navy" />
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1 tracking-tight">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
