import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, ChevronRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "House Cleaning Checklists | Capitol Shine Arlington VA",
  description:
    "See exactly what's included in every Capitol Shine cleaning service. Room-by-room checklists for standard, deep, and move-in/move-out cleaning in Arlington, VA.",
  openGraph: {
    title: "House Cleaning Checklists | Capitol Shine",
    description:
      "Complete room-by-room checklists for every residential cleaning service we offer in Arlington and Northern Virginia.",
  },
};

const checklists = [
  {
    href: "/checklists/standard-cleaning",
    title: "Standard Cleaning Checklist",
    subtitle: "Our recurring weekly & biweekly service",
    description:
      "A thorough top-to-bottom clean of every room — countertops, floors, bathrooms, kitchens, and more. Designed for homes that want to stay consistently clean.",
    highlights: ["Kitchen & bathrooms", "All floors vacuumed & mopped", "Surfaces dusted & wiped"],
    badge: "Most popular",
    badgeColor: "bg-gold text-navy",
  },
  {
    href: "/checklists/deep-cleaning",
    title: "Deep Cleaning Checklist",
    subtitle: "One-time intensive clean",
    description:
      "Everything in our standard clean, plus baseboards, inside the oven and microwave, ceiling fans, window sills and tracks, and all the spots that collect buildup over time.",
    highlights: ["Inside oven & microwave", "Baseboards & door frames", "Window sills & tracks"],
    badge: "Great for first-time clients",
    badgeColor: "bg-navy/10 text-navy",
  },
  {
    href: "/checklists/move-out-cleaning",
    title: "Move-In / Move-Out Cleaning Checklist",
    subtitle: "Full-property detail clean",
    description:
      "Our most thorough service. Every cabinet, drawer, appliance, closet, and surface — spotless for new owners, or to get your deposit back with no issues.",
    highlights: ["Inside all cabinets & drawers", "Inside fridge & freezer", "Interior windows throughout"],
    badge: "Deposit-ready clean",
    badgeColor: "bg-cta-green/10 text-cta-green",
  },
];

export default function ChecklistsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "House Cleaning Checklists — Capitol Shine",
            description: "Room-by-room cleaning checklists for residential cleaning services in Arlington, VA.",
            itemListElement: checklists.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.title,
              url: `https://capitolshinecleaners.com${c.href}`,
            })),
          }),
        }}
      />

      <div className="bg-off-white min-h-screen">
        {/* Hero */}
        <div className="bg-navy py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <ClipboardList size={13} />
              Arlington &amp; Northern Virginia
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Cleaning Service Checklists
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              No guessing what got cleaned. Every service comes with a clear scope —
              here&apos;s exactly what we cover, room by room.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-6">
          {checklists.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-7 md:p-9"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                    <span className="text-xs text-charcoal/40">{c.subtitle}</span>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-navy mb-2 group-hover:text-navy/80 transition-colors">
                    {c.title}
                  </h2>
                  <p className="text-charcoal/65 text-sm leading-relaxed mb-5">{c.description}</p>
                  <ul className="flex flex-wrap gap-3">
                    {c.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-1.5 text-xs text-charcoal/60">
                        <CheckCircle2 size={13} className="text-cta-green flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-shrink-0 flex items-center md:items-start md:pt-1">
                  <span className="flex items-center gap-1 text-sm font-medium text-navy group-hover:gap-2 transition-all">
                    View checklist <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-navy rounded-2xl p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Ready to get started?
            </h2>
            <p className="text-white/60 mb-6 max-w-sm mx-auto text-sm">
              Book online in 60 seconds — or call and mention FIRST30 for $30 off your first clean.
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
        </div>
      </div>
    </>
  );
}
