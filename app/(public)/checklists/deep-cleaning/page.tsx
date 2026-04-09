import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone, CalendarCheck, ArrowLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Deep Cleaning Checklist | Capitol Shine Arlington VA",
  description:
    "Everything included in our deep house cleaning service in Arlington, VA. A complete room-by-room checklist covering baseboards, inside appliances, grout, and more.",
  openGraph: {
    title: "Deep Cleaning Checklist | Capitol Shine",
    description:
      "See every task covered in our one-time deep cleaning service for homes in Arlington and Northern Virginia.",
    url: "https://capitolshinecleaners.com/checklists/deep-cleaning",
  },
  alternates: { canonical: "https://capitolshinecleaners.com/checklists/deep-cleaning" },
};

const rooms = [
  {
    name: "Kitchen",
    items: [
      "Wipe and sanitize all countertops",
      "Clean stovetop surface, burner grates, and drip pans",
      "Clean inside microwave — walls, ceiling, and turntable",
      "Clean inside oven — racks, interior walls, and oven door glass",
      "Degrease range hood exterior and filter",
      "Wipe exterior of all appliances",
      "Clean and sanitize kitchen sink, faucet, and drain area",
      "Wipe cabinet fronts and handles",
      "Wipe top of refrigerator",
      "Empty and reline trash can",
      "Sweep and mop floor",
    ],
  },
  {
    name: "Bathrooms",
    items: [
      "Scrub and disinfect toilet — bowl, seat, lid, tank, and base",
      "Clean behind and around base of toilet",
      "Clean and sanitize sink and vanity countertop",
      "Polish mirror and chrome fixtures to a streak-free finish",
      "Scrub tile grout lines in shower and tub surround",
      "Descale and polish faucets and shower head",
      "Scrub shower walls, tub surround, and fixtures",
      "Clean bathroom exhaust fan cover",
      "Detail around tub and shower caulking and hardware",
      "Sweep and mop bathroom floor",
      "Empty trash can",
    ],
  },
  {
    name: "Bedrooms",
    items: [
      "Dust all furniture surfaces — dressers, nightstands, shelves, headboards",
      "Wipe down nightstands and lamp bases",
      "Vacuum carpets or mop hard floors",
      "Vacuum under bed (where accessible)",
      "Empty trash cans",
      "Make bed if fresh linens are left out",
    ],
  },
  {
    name: "Living & Common Areas",
    items: [
      "Dust all furniture, shelves, and decorative items",
      "Wipe down coffee table, end tables, and entertainment center",
      "Vacuum upholstered furniture and cushions",
      "Vacuum carpets or mop hard floors",
      "Wipe down blinds (horizontal slats)",
    ],
  },
  {
    name: "Throughout the Home",
    items: [
      "Wipe all baseboards throughout",
      "Clean all door frames and trim",
      "Wipe all light switches and outlet covers",
      "Clean and detail ceiling fan blades and housing",
      "Wipe light fixtures and reachable lamp shades",
      "Clean window sills and window tracks",
      "Wipe door handles and knobs",
      "Empty all trash cans and replace liners",
    ],
  },
];

const related = [
  { href: "/checklists/standard-cleaning", label: "Standard Cleaning Checklist" },
  { href: "/checklists/move-out-cleaning", label: "Move-In / Move-Out Checklist" },
];

export default function DeepCleaningChecklist() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Deep House Cleaning — Capitol Shine",
            description:
              "One-time intensive deep cleaning service in Arlington, VA. Covers everything in a standard clean plus baseboards, inside appliances, grout lines, ceiling fans, window tracks, and more.",
            provider: {
              "@type": "LocalBusiness",
              name: "Capitol Shine",
              url: "https://capitolshinecleaners.com",
              telephone: "+17033759132",
              areaServed: [
                "Arlington, VA",
                "Alexandria, VA",
                "McLean, VA",
                "Falls Church, VA",
                "Rosslyn, VA",
              ],
            },
            serviceType: "Deep House Cleaning",
          }),
        }}
      />

      <div className="bg-off-white min-h-screen">
        {/* Hero */}
        <div className="bg-navy py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/checklists"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={14} /> All checklists
            </Link>
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              One-time intensive clean
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
              Deep Cleaning Checklist
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-xl">
              Ideal for first-time clients, seasonal resets, or homes that haven&apos;t had a
              professional clean in a while. We go well beyond the surface.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Intro */}
          <p className="text-charcoal/70 leading-relaxed mb-10">
            A deep clean is our most thorough one-time service. It covers everything in our standard
            clean, plus all the areas that collect buildup over weeks and months — baseboards, inside
            appliances, grout lines, window tracks, ceiling fans, and more. Many clients start with a
            deep clean and then switch to a recurring standard clean to maintain the results.
          </p>

          {/* Checklist */}
          <div className="space-y-8">
            {rooms.map((room) => (
              <div key={room.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                <h2 className="font-display text-lg font-bold text-navy mb-5">{room.name}</h2>
                <ul className="space-y-3">
                  {room.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-cta-green flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal/75 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mid-page CTA */}
          <div className="my-12 bg-navy rounded-2xl p-7 md:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-white font-semibold text-lg mb-1">Book a deep clean today</p>
              <p className="text-white/55 text-sm">
                New customers get $30 off. Mention it when you call or use code FIRST30 at checkout.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/book?promo=FIRST30"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gold text-navy text-sm font-bold hover:bg-gold/90 transition-colors"
              >
                <CalendarCheck size={15} />
                Book Online
              </Link>
              <a
                href="tel:+17033759132"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-white text-sm font-medium hover:border-white/50 transition-colors"
              >
                <Phone size={15} />
                (703) 375-9132
              </a>
            </div>
          </div>

          {/* Tip */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-12">
            <h3 className="font-semibold text-charcoal text-sm mb-2">Pro tip: Start with a deep clean</h3>
            <p className="text-charcoal/65 text-sm leading-relaxed">
              If you&apos;re switching to a recurring service, starting with a deep clean gives us a
              strong baseline to maintain going forward. Many clients find that the standard clean is
              all they need once the home has been properly reset.
            </p>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy mb-6">Common questions</h2>
            <div className="space-y-5">
              {[
                {
                  q: "How long does a deep clean take?",
                  a: "It depends on the size of the home and how long since the last professional clean. A 2-bedroom home typically takes 3 to 5 hours. We&apos;ll give you a time estimate when you book.",
                },
                {
                  q: "What&apos;s the difference between a deep clean and a standard clean?",
                  a: "A standard clean covers the main surfaces every visit. A deep clean goes further — baseboards, inside the oven and microwave, grout lines, window tracks, and ceiling fan housings. Think of it as a full reset versus regular maintenance.",
                },
                {
                  q: "Is a deep clean required before starting recurring service?",
                  a: "We recommend it, but don&apos;t require it. If your home is already in good shape, we can assess during the first visit and adjust the scope accordingly.",
                },
                {
                  q: "Do you bring your own supplies?",
                  a: "Yes. We bring all cleaning products, microfiber cloths, and equipment. All products are eco-friendly and safe for kids and pets.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-gray-100 pb-5">
                  <h3 className="font-semibold text-charcoal text-sm mb-1.5">{q}</h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related checklists */}
          <div className="mb-12">
            <h2 className="font-display text-xl font-bold text-navy mb-4">Other checklists</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="flex items-center justify-between gap-3 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 hover:shadow-md transition-shadow group"
                >
                  <span className="text-sm font-medium text-navy">{r.label}</span>
                  <ChevronRight size={15} className="text-charcoal/30 group-hover:text-navy transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-navy rounded-2xl p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Ready for a deep clean?
            </h2>
            <p className="text-white/60 mb-6 max-w-md mx-auto text-sm">
              Book in 60 seconds. No contracts, transparent pricing — and $30 off your first visit
              with code FIRST30.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book?promo=FIRST30"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-navy text-sm font-bold hover:bg-gold/90 transition-colors"
              >
                <CalendarCheck size={15} />
                Book Online — $30 Off
              </Link>
              <a
                href="tel:+17033759132"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white text-sm font-medium hover:border-white/50 transition-colors"
              >
                <Phone size={15} />
                Call (703) 375-9132
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
