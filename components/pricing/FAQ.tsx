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

const residentialFAQs: FAQItem[] = [
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
    a: "Nope. Many of our clients provide a key, lockbox code, or smart lock access. We'll coordinate a secure entry method that works best for you.",
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

const commercialFAQs: FAQItem[] = [
  {
    q: "How is commercial cleaning priced?",
    a: "Commercial cleaning is quoted by square footage, frequency, and scope. After a free on-site walk-through you'll get firm, itemized pricing. Most small offices in Northern Virginia fall in the $300-$800/month range depending on schedule.",
  },
  {
    q: "Do you offer after-hours or overnight cleaning?",
    a: "Yes. Most commercial clients schedule cleanings after business hours so the space is ready before the next workday. We carry keys, alarm codes, or coordinate with building management.",
  },
  {
    q: "Are you licensed, bonded, and insured?",
    a: "Yes. Every Capitol Shine team is fully licensed, bonded, and insured. We provide a certificate of insurance on request — many commercial clients need one on file.",
  },
  {
    q: "Do you require a long-term contract?",
    a: "No. We work month-to-month with a standard 30-day cancellation window. Businesses stay with us because the service is reliable, not because they're locked in.",
  },
  {
    q: "How quickly can you start service?",
    a: "Most commercial accounts can be onboarded within 5-10 business days of signing. Urgent turnarounds are possible depending on current capacity.",
  },
  {
    q: "Which areas do you cover for commercial cleaning?",
    a: "Arlington, Alexandria, McLean, Tysons, Falls Church, Vienna, Reston, Fairfax, and surrounding Northern Virginia communities.",
  },
];

const airbnbFAQs: FAQItem[] = [
  {
    q: "Can you handle same-day turnovers?",
    a: "Yes. Same-day turnover is the core of this service. We coordinate with your checkout and check-in windows so your unit is guest-ready between bookings.",
  },
  {
    q: "Do you provide linens and handle laundry?",
    a: "Yes. Our optional linen service brings fresh hotel-grade sheets and towels, takes the used set with us for laundering, and returns them for the next turnover. Pricing is $30 per bedroom.",
  },
  {
    q: "What if a guest leaves damage or missing items?",
    a: "We photograph and report anything unusual — damage, missing items, or extreme mess outside normal turnover scope — so you can act on it with your guest or Airbnb's resolution center before the next check-in.",
  },
  {
    q: "Can I sync turnovers with my booking calendar?",
    a: "Yes. We can sync with Airbnb, Vrbo, or handle manual scheduling. You only confirm exceptions.",
  },
  {
    q: "Do you restock consumables?",
    a: "We can refill host-supplied consumables (coffee, soap, paper products) as part of the turnover. Just leave them accessible and we'll track levels between visits.",
  },
  {
    q: "What happens if there's an issue between guests?",
    a: "We text you immediately with photos. If something prevents us from turning the unit, you'll know within an hour so you can contact the incoming guest.",
  },
];

const constructionFAQs: FAQItem[] = [
  {
    q: "What's the difference between rough, final, and touch-up cleans?",
    a: "Rough clean happens during active construction to clear debris and dust. Final clean happens after trades finish — detailed work on fixtures, cabinets, floors, and appliances. Touch-up is a light pass right before owner walkthrough.",
  },
  {
    q: "How is post-construction cleaning priced?",
    a: "Every job is quoted on-site. Pricing depends on square footage, finish type, and how much drywall dust and debris is actually present. We provide firm, itemized pricing before work begins.",
  },
  {
    q: "Can you work around other trades still on site?",
    a: "Yes, with coordination. We frequently share sites with trim carpenters, painters, and HVAC finishers — we just need a site plan so we don't re-dirty each other's work.",
  },
  {
    q: "Do you handle large new-build or multi-unit projects?",
    a: "Yes. We scale crew size to the project. Recent work has included multi-unit new construction and full gut renovations across Northern Virginia.",
  },
  {
    q: "How soon can you get on site?",
    a: "For scheduled projects, we lock in dates weeks in advance to line up with your trades. For urgent pre-walkthrough cleans, we can often turn around within 24-48 hours.",
  },
  {
    q: "Do you carry the insurance required for active job sites?",
    a: "Yes. We carry general liability and provide a certificate of insurance on request. Many GCs and property managers in NoVA need one on file before we start.",
  },
];

const FAQ_SETS: Record<string, FAQItem[]> = {
  residential:  residentialFAQs,
  commercial:   commercialFAQs,
  airbnb:       airbnbFAQs,
  construction: constructionFAQs,
};

export default function PricingFAQ({ service = "residential" }: { service?: string }) {
  const items = FAQ_SETS[service] ?? residentialFAQs;
  return (
    <SectionWrapper className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-8">
          Frequently Asked Questions
        </h2>
        <FAQAccordion items={items} />
      </div>
    </SectionWrapper>
  );
}
