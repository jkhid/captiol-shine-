import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, CheckCircle2, Lock, Sparkles } from "lucide-react";
import { EditorialCloseCTA } from "@/components/public/WavePage";

const URL = "https://capitolshinecleaners.com/checklists";

export const metadata: Metadata = {
  title: "House Cleaning Checklists | Capitol Shine Arlington VA",
  description:
    "See exactly what's included in every Capitol Shine cleaning service. Room-by-room checklists for standard, deep, and move-in/move-out cleaning in Arlington, VA.",
  openGraph: {
    title: "House Cleaning Checklists | Capitol Shine",
    description:
      "Complete room-by-room checklists for every residential cleaning service we offer in Arlington and Northern Virginia.",
    url: URL,
  },
  alternates: { canonical: URL },
};

const checklists = [
  {
    href: "/checklists/standard-cleaning",
    title: "Standard cleaning",
    subtitle: "Weekly or biweekly recurring maintenance. Same scope, every visit.",
    description:
      "A thorough top-to-bottom clean of every room, designed for homes that want to stay consistently clean.",
    highlights: [
      "Kitchen — counters, stovetop, exteriors, sink, floor",
      "Bathrooms — toilet, sink, shower, mirror, floor",
      "Bedrooms — dust, vacuum, trash, beds",
      "Common areas — dust, vacuum, sills, fans",
    ],
    badge: "Most popular",
    badgeColor: "bg-cream text-navy",
    icon: Sparkles,
  },
  {
    href: "/checklists/deep-cleaning",
    title: "Deep cleaning",
    subtitle: "One-time intensive. Standard plus baseboards, inside appliances, grout, fans.",
    description:
      "Everything in our standard clean, plus the spots that collect buildup over time and never get handled in a maintenance visit.",
    highlights: [
      "Inside oven, microwave, range hood",
      "Wipe all baseboards, door frames, trim",
      "Detail ceiling fan blades + housing",
      "Window sills, tracks, switch plates",
    ],
    badge: "First-timers",
    badgeColor: "bg-cream text-navy",
    icon: Sparkles,
  },
  {
    href: "/checklists/move-out-cleaning",
    title: "Move-in / Move-out",
    subtitle: "Most detailed clean. Inside every cabinet, drawer, appliance, closet.",
    description:
      "Our most thorough service, built for landlord walkthroughs, buyer handoffs, and truly empty-home resets.",
    highlights: [
      "Inside fridge, oven, dishwasher, microwave",
      "Inside all cabinets, drawers, closets",
      "Interior windows + tracks",
      "Wall scuff spot-cleaning",
    ],
    badge: "Deposit-ready",
    badgeColor: "bg-cream text-navy",
    icon: Lock,
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

      <div className="min-h-screen bg-paper">
        <section className="border-b border-navy/10 bg-paper py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              No guessing what got cleaned
            </p>
            <h1 className="max-w-4xl font-display text-[4.1rem] font-light leading-[0.92] tracking-tight text-ink md:text-[5.6rem] lg:text-[6.1rem]">
              Cleaning <em className="italic">checklists.</em>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted md:text-[1.5rem] md:leading-[1.45]">
              Every service comes with a clear scope. Here&apos;s exactly what we cover,
              room by room, before you ever book.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-3">
            {checklists.map((c) => {
              const Icon = c.icon;

              return (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group flex h-full flex-col rounded-[28px] border border-navy/10 bg-white p-7 shadow-[0_24px_60px_-40px_rgba(23,36,63,0.35)] transition hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_30px_80px_-40px_rgba(23,36,63,0.35)] md:p-8"
                >
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[18px] bg-cream text-navy">
                      <Icon size={26} />
                    </div>
                    <span className={`rounded-xl px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                  </div>

                  <h2 className="text-[1.85rem] font-semibold leading-[1.04] tracking-tight text-ink md:text-[2.5rem]">
                    {c.title}
                  </h2>
                  <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">{c.subtitle}</p>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{c.description}</p>

                  <ul className="mt-8 space-y-3 text-sm leading-relaxed text-charcoal/85 md:text-[0.9rem]">
                    {c.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-green" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto border-t border-navy/8 pt-7">
                    <span className="inline-flex items-center gap-2 text-[1.1rem] font-semibold text-navy transition-all group-hover:gap-3">
                      View checklist
                      <ChevronRight size={20} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <EditorialCloseCTA
          title={
            <>
              Ready to book?
              <br />
              <em className="italic text-gold-2">Know exactly what you&apos;re getting.</em>
            </>
          }
          description={
            <>
              Pick the right service, book online in under a minute, and get $30 off your first clean.
            </>
          }
          actions={
            <>
              <Link
                href="/book?promo=FIRST30"
                className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-2"
              >
                Book Online
              </Link>
              <a
                href="tel:+17033759132"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
              >
                Call (703) 375-9132
              </a>
            </>
          }
        />
      </div>
    </>
  );
}
