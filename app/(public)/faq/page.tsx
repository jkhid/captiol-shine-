import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { FAQAccordion } from "@/components/pricing/FAQ";

const URL = "https://capitolshinecleaners.com/faq";

export const metadata: Metadata = {
  title: "Cleaning Service FAQ — Arlington, VA | Capitol Shine",
  description:
    "Answers to the most common questions about our house cleaning, Airbnb turnover, and commercial cleaning services in Arlington, VA and Northern Virginia.",
  openGraph: {
    title: "Frequently Asked Questions | Capitol Shine",
    description:
      "Everything clients ask about pricing, supplies, scheduling, pets, tipping, and more.",
    url: URL,
  },
  alternates: { canonical: URL },
};

type FAQSection = {
  heading: string;
  items: { q: string; a: string }[];
};

const sections: FAQSection[] = [
  {
    heading: "Pricing & booking",
    items: [
      {
        q: "How much does house cleaning cost in Arlington, VA?",
        a: "Our standard cleans start at $119 and deep cleans start at $249. Final pricing depends on home size, number of bathrooms, and service type. You can see exact flat-rate pricing on our pricing page and book online in 60 seconds.",
      },
      {
        q: "Do I have to sign a contract?",
        a: "No. All of our residential clients are month-to-month with no minimum commitment. Commercial clients work on a 30-day cancellation window. You stay because the service is reliable, not because you're locked in.",
      },
      {
        q: "How do I book a cleaning?",
        a: "The fastest way is to book online — choose your service, home size, and date, and the price is flat-rate. You can also call (703) 375-9132 if you'd rather speak with us first.",
      },
      {
        q: "Do you offer a new-client discount?",
        a: "Yes. First-time clients save $30 with promo code FIRST30 at checkout.",
      },
      {
        q: "What's your cancellation policy?",
        a: "We ask for 24 hours' notice on cancellations or reschedules so we can offer the slot to another client. Cancellations within 24 hours may incur a fee depending on the service.",
      },
    ],
  },
  {
    heading: "What's included",
    items: [
      {
        q: "What's the difference between a standard clean and a deep clean?",
        a: "A standard clean covers the high-traffic, maintenance-level work — counters, floors, bathrooms, kitchens, and trash. A deep clean adds the areas that don't get touched weekly: baseboards, inside appliances, grout, ceiling fans, window tracks, and more. Most first-time clients start with a deep clean.",
      },
      {
        q: "What's included in a move-out cleaning?",
        a: "Everything in a deep clean, plus inside every cabinet, drawer, appliance, and closet. It's our most thorough service and it's designed to get your full security deposit back. See our move-out cleaning page for the full scope.",
      },
      {
        q: "Can you see exactly what's covered in each service?",
        a: "Yes. We publish full room-by-room checklists for our standard, deep, and move-out services so you know exactly what's getting done.",
      },
    ],
  },
  {
    heading: "Supplies, pets, and access",
    items: [
      {
        q: "Do you bring your own supplies?",
        a: "Yes. We bring all cleaning products and equipment. If you have specific products you'd prefer we use — fragrance-free, specific wood cleaners, etc. — just let us know and we'll use what you have on hand.",
      },
      {
        q: "Are your products safe for pets and kids?",
        a: "Yes. We use EPA Safer Choice certified, eco-friendly products that are safe for kids, pets, and the environment. We still ask about pet allergies and preferences when you book.",
      },
      {
        q: "Do I need to be home during the cleaning?",
        a: "No. Many of our clients provide a key, lockbox code, or smart lock access. We'll confirm your preferred access method when you book.",
      },
      {
        q: "What should I do with my pets during the cleaning?",
        a: "Whatever's comfortable for them. Most clients let their pets roam — we're used to them. If your pet is anxious around strangers or vacuums, a closed room or crate is fine.",
      },
    ],
  },
  {
    heading: "Staff, insurance, and guarantees",
    items: [
      {
        q: "Are you licensed, bonded, and insured?",
        a: "Yes. Every Capitol Shine team is fully licensed, bonded, and insured in the Commonwealth of Virginia. We can provide a certificate of insurance on request — most commercial clients need one on file.",
      },
      {
        q: "Do you background-check your cleaners?",
        a: "Yes. Every team member goes through a background check and in-house training before they work in a client's home or business.",
      },
      {
        q: "Will I have the same cleaner every time?",
        a: "For recurring residential and commercial clients, yes — we rotate the same small team through your space so they know your preferences, your pets, and what you care about. For one-time cleans, we send whichever team has the best schedule fit.",
      },
      {
        q: "What if I'm not satisfied?",
        a: "We stand behind every clean with a 24-hour re-clean guarantee. If something was missed or done wrong, contact us within 24 hours and we'll come back at no extra cost.",
      },
    ],
  },
  {
    heading: "Tipping & payment",
    items: [
      {
        q: "How do I tip my cleaner?",
        a: "Tips are always appreciated but never expected. You can tip in cash on the day of service or add it to your invoice. 100% of tips go directly to your cleaner.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, ACH/bank transfer for commercial clients, and cash on the day of service.",
      },
      {
        q: "When is payment charged?",
        a: "For residential bookings, we authorize your card the morning of service and charge it once the clean is complete. Commercial clients are invoiced monthly.",
      },
    ],
  },
  {
    heading: "Service-specific",
    items: [
      {
        q: "Do you handle Airbnb and short-term rental turnovers?",
        a: "Yes. We offer same-day turnover cleaning for Airbnb, Vrbo, and other short-term rentals in Arlington and Northern Virginia. Linen service is available as an add-on. See our Airbnb cleaning service page for details.",
      },
      {
        q: "Do you handle post-construction cleanup?",
        a: "Yes. We clean new builds and renovations for contractors and homeowners across Northern Virginia — rough cleans during construction, final cleans before handoff, and pre-walkthrough touch-ups.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve Arlington, McLean, Alexandria, Falls Church, Rosslyn, Clarendon, Ballston, Crystal City, and the broader Northern Virginia area. See our service areas page for the full list.",
      },
    ],
  },
];

const allFAQs = sections.flatMap((s) => s.items);

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: allFAQs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <div className="bg-off-white min-h-screen">
        <section className="bg-navy py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <HelpCircle size={13} />
              Arlington &amp; Northern Virginia
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Everything clients ask before their first cleaning — pricing, supplies, pets, insurance,
              tipping, and more.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl md:text-2xl font-bold text-navy mb-6">
                {section.heading}
              </h2>
              <FAQAccordion items={section.items} />
            </div>
          ))}
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-navy rounded-2xl p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Didn&apos;t see your question?
            </h2>
            <p className="text-white/60 mb-6 max-w-sm mx-auto text-sm">
              Give us a call or book online — we&apos;re happy to answer anything before you book.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book?promo=FIRST30"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-navy text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                Book Online — $30 Off
              </Link>
              <a
                href="tel:+17033759132"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white text-sm font-medium hover:border-white/50 transition-colors"
              >
                Call (703) 375-9132
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
