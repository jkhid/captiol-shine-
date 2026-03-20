import SectionWrapper from "@/components/ui/SectionWrapper";
import { CalendarCheck, Sparkles, Sofa } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Request Online",
    description:
      "Pick your service, home size, and preferred date. Takes 60 seconds — no payment required.",
  },
  {
    icon: Sparkles,
    title: "We Confirm & Clean",
    description:
      "We'll reach out to confirm details before your appointment. Then our background-checked team shows up on time.",
  },
  {
    icon: Sofa,
    title: "Pay After. Love It.",
    description:
      "Payment is collected after the job is done. Not happy? We'll re-clean free, no questions asked.",
  },
];

export default function HowItWorks() {
  return (
    <SectionWrapper className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-navy text-center">
          How It Works
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
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
