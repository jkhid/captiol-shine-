import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone, CalendarCheck, ArrowLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Standard House Cleaning Checklist | Capitol Shine Arlington VA",
  description:
    "See every task included in our standard recurring house cleaning service in Arlington, VA. A complete room-by-room checklist — no surprises.",
  openGraph: {
    title: "Standard House Cleaning Checklist | Capitol Shine",
    description:
      "Complete room-by-room checklist for our standard weekly and biweekly cleaning service in Arlington and Northern Virginia.",
    url: "https://capitolshinecleaners.com/checklists/standard-cleaning",
  },
  alternates: { canonical: "https://capitolshinecleaners.com/checklists/standard-cleaning" },
};

const rooms = [
  {
    name: "Kitchen",
    items: [
      "Wipe and sanitize all countertops",
      "Clean stovetop surface and control knobs",
      "Wipe exterior of all appliances — refrigerator, oven, microwave, dishwasher",
      "Clean and sanitize kitchen sink and faucet",
      "Wipe down cabinet fronts",
      "Empty and reline trash can",
      "Sweep and mop floor",
    ],
  },
  {
    name: "Bathrooms",
    items: [
      "Scrub and disinfect toilet — bowl, seat, lid, tank, and base",
      "Clean and sanitize sink and vanity countertop",
      "Polish mirror to a streak-free finish",
      "Scrub shower walls, tub surround, and fixtures",
      "Disinfect shower and tub floor",
      "Sweep and mop bathroom floor",
      "Empty trash can",
    ],
  },
  {
    name: "Bedrooms",
    items: [
      "Dust all furniture surfaces — dressers, nightstands, shelves",
      "Wipe down nightstands and visible lamp bases",
      "Vacuum carpets or mop hard floors",
      "Empty trash cans",
      "Make bed if fresh linens are left out",
    ],
  },
  {
    name: "Living & Common Areas",
    items: [
      "Dust all furniture, shelves, and decorative items",
      "Wipe down coffee table and end tables",
      "Vacuum upholstered furniture cushions",
      "Vacuum carpets or mop hard floors",
      "Wipe windowsills",
      "Dust ceiling fan blades within safe reach",
    ],
  },
  {
    name: "Throughout the Home",
    items: [
      "Wipe light switches and door handles",
      "Empty all trash cans and replace liners",
      "Dust all accessible horizontal surfaces",
    ],
  },
];

const related = [
  { href: "/checklists/deep-cleaning", label: "Deep Cleaning Checklist" },
  { href: "/checklists/move-out-cleaning", label: "Move-In / Move-Out Checklist" },
];

export default function StandardCleaningChecklist() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Standard House Cleaning — Capitol Shine",
            description:
              "Recurring weekly and biweekly house cleaning service in Arlington, VA covering kitchens, bathrooms, bedrooms, and all common areas.",
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
            serviceType: "Standard House Cleaning",
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
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              Weekly &amp; Biweekly
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
              Standard House Cleaning Checklist
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-xl">
              Our most popular service. A consistent, thorough clean on a schedule that works for you —
              so your home is always ready without you having to think about it.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Intro */}
          <p className="text-charcoal/70 leading-relaxed mb-10">
            Our standard cleaning covers every room from top to bottom. Whether you book weekly or
            biweekly, the same scope applies every visit — giving you a reliable baseline that keeps
            your home consistently clean between appointments. Every task listed below is included
            at no extra charge.
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
              <p className="text-white font-semibold text-lg mb-1">$30 off your first clean</p>
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

          {/* What's not included note */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-12">
            <h3 className="font-semibold text-charcoal text-sm mb-2">Not included in standard cleaning</h3>
            <p className="text-charcoal/65 text-sm leading-relaxed">
              Inside the oven, inside the refrigerator, interior windows, baseboards, and ceiling fans are
              not part of our standard service — these are covered in our{" "}
              <Link href="/checklists/deep-cleaning" className="text-navy font-medium underline hover:no-underline">
                Deep Cleaning
              </Link>
              . You can also add individual tasks as add-ons when booking.
            </p>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy mb-6">Common questions</h2>
            <div className="space-y-5">
              {[
                {
                  q: "Do I need to be home during the cleaning?",
                  a: "Not at all. Most clients leave a key or provide a door code. As long as we can access the property, you don't need to be there.",
                },
                {
                  q: "Will I have the same cleaner each visit?",
                  a: "Yes, we make every effort to send the same cleaner for recurring appointments. Consistency matters — your cleaner learns your preferences over time.",
                },
                {
                  q: "What if I need to skip or reschedule?",
                  a: "Just let us know at least 48 hours ahead and we'll find a new time that works. No fees for rescheduling with sufficient notice.",
                },
                {
                  q: "Do I need to provide any cleaning supplies?",
                  a: "No. We bring everything — eco-friendly products, microfiber cloths, vacuums, and mops. Just let us know if you have a preference for a specific product on any surface.",
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
              Ready for a cleaner home?
            </h2>
            <p className="text-white/60 mb-6 max-w-md mx-auto text-sm">
              Book a standard cleaning in 60 seconds. No contracts, no hidden fees —
              and $30 off your first visit with code FIRST30.
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
