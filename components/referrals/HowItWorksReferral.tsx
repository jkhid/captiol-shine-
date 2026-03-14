import SectionWrapper from "@/components/ui/SectionWrapper";
import { Share2, CalendarCheck, Wallet } from "lucide-react";

const steps = [
  {
    icon: Share2,
    title: "Share Your Link",
    description: "Send your unique referral link to a friend, neighbor, or coworker.",
  },
  {
    icon: CalendarCheck,
    title: "They Book",
    description: "When they complete their first cleaning, you both get $30 off.",
  },
  {
    icon: Wallet,
    title: "You Save",
    description: "Credits apply automatically to your next booking. No limits.",
  },
];

export default function HowItWorksReferral() {
  return (
    <SectionWrapper className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-navy text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center mb-4">
                <step.icon size={28} className="text-navy" />
              </div>
              <div className="text-sm font-semibold text-gold mb-1">Step {i + 1}</div>
              <h3 className="text-xl font-bold text-navy mb-2">{step.title}</h3>
              <p className="text-charcoal/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
