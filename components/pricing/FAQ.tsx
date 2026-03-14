"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface FAQItem {
  q: string;
  a: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left font-medium text-navy hover:bg-gray-50 transition-colors"
            aria-expanded={openIndex === i}
          >
            {item.q}
            <ChevronDown
              size={18}
              className={`flex-shrink-0 transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4 text-sm text-charcoal/70 leading-relaxed">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const pricingFAQs: FAQItem[] = [
  {
    q: "What's included in a Standard Clean?",
    a: "A Standard Clean covers dusting all surfaces, vacuuming and mopping floors, cleaning and sanitizing kitchens and bathrooms, and emptying all trash. It's designed to maintain a consistently fresh home between deeper cleans.",
  },
  {
    q: "How is Deep Clean different from Standard?",
    a: "A Deep Clean includes everything in a Standard Clean plus detailed attention to areas like baseboards, door frames, inside the oven and microwave, light fixtures, ceiling fans, and window sills. It's a top-to-bottom reset for your home.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "Nope! Many of our clients provide a key, lockbox code, or smart lock access. We'll coordinate a secure entry method that works best for you.",
  },
  {
    q: "What products do you use?",
    a: "We use EPA Safer Choice certified, eco-friendly cleaning products that are safe for kids, pets, and the environment. If you have specific product preferences, just let us know.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "We stand behind our work with a satisfaction guarantee. If you're not happy with any aspect of your cleaning, contact us within 24 hours and we'll re-clean at no extra cost.",
  },
  {
    q: "How do I tip my cleaner?",
    a: "Tips are always appreciated but never expected. You can tip in cash on the day of service, or we can add it to your invoice. 100% of tips go directly to your cleaner.",
  },
];

export default function PricingFAQ() {
  return (
    <SectionWrapper className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-8">
          Frequently Asked Questions
        </h2>
        <FAQAccordion items={pricingFAQs} />
      </div>
    </SectionWrapper>
  );
}
