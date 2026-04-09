import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone, CalendarCheck, ArrowLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Move-Out Cleaning Checklist Arlington VA | Capitol Shine",
  description:
    "The complete move-out and move-in cleaning checklist for Arlington, VA. See every task covered — cabinets, appliances, closets, windows, and more — to get your deposit back.",
  openGraph: {
    title: "Move-Out Cleaning Checklist | Capitol Shine Arlington VA",
    description:
      "Full move-out and move-in cleaning checklist for homes in Arlington and Northern Virginia. Deposit-ready clean guaranteed.",
    url: "https://capitolshinecleaners.com/checklists/move-out-cleaning",
  },
  alternates: { canonical: "https://capitolshinecleaners.com/checklists/move-out-cleaning" },
};

const rooms = [
  {
    name: "Kitchen",
    items: [
      "Clean inside all upper and lower cabinets and drawers",
      "Wipe cabinet interiors, shelves, and back walls",
      "Clean inside oven — racks, interior walls, and door glass",
      "Clean inside microwave — walls, ceiling, and turntable",
      "Clean inside refrigerator and freezer — all shelves, drawers, and door seals",
      "Clean inside dishwasher — interior walls, filter, and door gasket",
      "Degrease range hood exterior and filter",
      "Clean and sanitize countertops, sink, and faucet",
      "Wipe exterior of all appliances",
      "Wipe cabinet fronts and handles",
      "Sweep and mop floor",
      "Empty and clean trash can",
    ],
  },
  {
    name: "Bathrooms",
    items: [
      "Scrub and disinfect toilet — bowl, seat, lid, tank, and base",
      "Clean behind and around base of toilet",
      "Clean inside medicine cabinet and vanity cabinets",
      "Clean and sanitize sink, vanity countertop, and faucet",
      "Polish mirror and all chrome fixtures",
      "Scrub tile grout lines in shower and tub",
      "Descale and polish faucets and shower head",
      "Scrub shower walls, tub surround, and fixtures",
      "Clean bathroom exhaust fan cover",
      "Sweep and mop bathroom floor",
    ],
  },
  {
    name: "Bedrooms",
    items: [
      "Clean all closet interiors — shelves, rods, walls, and floor",
      "Dust all furniture surfaces",
      "Wipe down all walls and spot-clean marks and scuffs",
      "Vacuum carpets or mop hard floors — including corners and edges",
      "Vacuum under and behind furniture where accessible",
    ],
  },
  {
    name: "Living & Common Areas",
    items: [
      "Clean all closet interiors and storage areas",
      "Dust all furniture, shelves, and ledges",
      "Wipe down all walls and baseboards",
      "Vacuum carpets or mop hard floors",
      "Wipe down blinds and window treatments",
    ],
  },
  {
    name: "Windows",
    items: [
      "Clean interior glass on all windows throughout the home",
      "Wipe all window frames and sills",
      "Clean window sills and tracks",
      "Wipe interior window screens where accessible",
    ],
  },
  {
    name: "Throughout the Home",
    items: [
      "Wipe all baseboards throughout",
      "Clean all door frames and trim",
      "Wipe all light switches and outlet covers",
      "Clean ceiling fan blades and housing",
      "Wipe light fixtures",
      "Clean HVAC vent covers",
      "Wipe door handles and knobs throughout",
      "Empty all trash cans",
    ],
  },
  {
    name: "Additional Areas",
    items: [
      "Garage sweep (if applicable)",
      "Wipe down garage walls and baseboards (if applicable)",
      "Clean laundry room — inside washer and dryer area, shelves",
    ],
  },
];

const related = [
  { href: "/checklists/standard-cleaning", label: "Standard Cleaning Checklist" },
  { href: "/checklists/deep-cleaning", label: "Deep Cleaning Checklist" },
];

export default function MoveOutCleaningChecklist() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Move-In / Move-Out Cleaning — Capitol Shine",
            description:
              "Full-property move-out and move-in cleaning service in Arlington, VA. Covers every cabinet, drawer, appliance, closet, and interior window for a deposit-ready clean.",
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
            serviceType: "Move-Out Cleaning",
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
              Full-property detail clean
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
              Move-In / Move-Out Cleaning Checklist
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-xl">
              Our most thorough service. Every cabinet, drawer, appliance, closet, and surface —
              cleaned for outgoing tenants looking to get their deposit back, or new owners moving in.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Intro */}
          <p className="text-charcoal/70 leading-relaxed mb-10">
            Move-out cleaning is the most detailed clean we do. It goes well beyond our deep clean —
            covering every interior cabinet and drawer, inside all appliances, closet interiors, interior
            windows, and every room from floor to ceiling. The goal is to leave the property in
            move-in-ready condition, whether you&apos;re a tenant trying to get your security deposit
            back or a new homeowner who wants a fresh start.
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
              <p className="text-white font-semibold text-lg mb-1">Book your move-out clean</p>
              <p className="text-white/55 text-sm">
                New customers get $30 off. Call us or use code FIRST30 at checkout.
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
          <div className="bg-green-50 border border-green-100 rounded-xl p-5 mb-12">
            <h3 className="font-semibold text-charcoal text-sm mb-2">Booking tip</h3>
            <p className="text-charcoal/65 text-sm leading-relaxed">
              Schedule your move-out clean for after you&apos;ve moved your furniture and belongings
              out, but before your final walkthrough with your landlord or property manager. This gives
              us full access and ensures nothing gets missed. We recommend booking at least a few days
              in advance to secure your preferred time.
            </p>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy mb-6">Common questions</h2>
            <div className="space-y-5">
              {[
                {
                  q: "Do I need to have the home empty before you arrive?",
                  a: "For a move-out clean, yes — the home should be empty or nearly empty so we can access all cabinets, closets, and every room without working around furniture and boxes.",
                },
                {
                  q: "Can you help me get my security deposit back?",
                  a: "Our move-out clean is specifically designed to meet landlord standards. We cover everything typically listed on move-out inspection checklists. While we can't guarantee your landlord's decision, our cleaning holds up to professional scrutiny.",
                },
                {
                  q: "How far in advance should I book?",
                  a: "At least 48 to 72 hours ahead is ideal. Move-out cleans take longer than standard visits, so spots fill quickly — especially at the end and beginning of each month when most leases turn over.",
                },
                {
                  q: "What if there are specific things my landlord is looking for?",
                  a: "Let us know when you book. If you have a move-out checklist from your landlord, share it with us and we'll make sure everything on it gets addressed.",
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
              Moving out soon?
            </h2>
            <p className="text-white/60 mb-6 max-w-md mx-auto text-sm">
              Book your move-out clean online or give us a call. New customers get $30 off their
              first appointment.
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
