import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
import ChecklistSidebarCalculator from "@/components/public/ChecklistSidebarCalculator";
import { EditorialCloseCTA, PageBreadcrumbs } from "@/components/public/WavePage";

const URL = "https://capitolshinecleaners.com/checklists/deep-cleaning";

const rooms = [
  {
    number: "01",
    name: "Kitchen",
    items: [
      "Countertops",
      "Stovetop + burner grates + drip pans",
      "Inside microwave (walls, ceiling, turntable)",
      "Inside oven (racks, walls, glass)",
      "Degrease range hood + filter",
      "Wipe appliance exteriors",
      "Sanitize sink, faucet, drain",
      "Wipe cabinet fronts + handles",
      "Wipe top of fridge",
      "Empty + reline trash",
      "Sweep + mop",
    ],
  },
  {
    number: "02",
    name: "Bathrooms",
    items: [
      "Scrub + disinfect toilet",
      "Clean behind / around toilet base",
      "Sanitize sink + vanity",
      "Polish mirror + chrome",
      "Scrub tile grout",
      "Descale + polish faucets, shower head",
      "Scrub shower / tub",
      "Clean exhaust fan cover",
      "Detail caulking + hardware",
      "Sweep + mop",
      "Empty trash",
    ],
  },
  {
    number: "03",
    name: "Bedrooms",
    items: [
      "Dust dressers, nightstands, shelves, headboards",
      "Wipe nightstands + lamp bases",
      "Vacuum carpets or mop",
      "Vacuum under bed where accessible",
      "Empty trash",
      "Make bed if linens out",
    ],
  },
  {
    number: "04",
    name: "Living & common",
    items: [
      "Dust furniture, shelves, decor",
      "Wipe coffee + end tables + entertainment center",
      "Vacuum upholstery + cushions",
      "Vacuum / mop floors",
      "Wipe horizontal blind slats",
    ],
  },
  {
    number: "05",
    name: "Throughout home",
    items: [
      "Wipe all baseboards",
      "Clean door frames + trim",
      "Wipe all switches + outlet covers",
      "Detail ceiling fan blades + housing",
      "Wipe light fixtures + reachable lamp shades",
      "Clean window sills + interior tracks",
      "Wipe door handles / knobs",
      "Empty all trash + replace liners",
    ],
  },
];

export const metadata: Metadata = {
  title: "Deep Cleaning Checklist — Arlington, VA | Capitol Shine",
  description:
    "See every task included in our deep house cleaning service in Arlington, VA. A room-by-room checklist covering baseboards, inside appliances, grout, fans, and more.",
  openGraph: {
    title: "Deep Cleaning Checklist | Capitol Shine",
    description:
      "Room-by-room checklist for our one-time deep cleaning service in Arlington and Northern Virginia.",
    url: URL,
  },
  alternates: { canonical: URL },
};

export default function DeepCleaningChecklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Deep Cleaning Checklist",
            description:
              "One-time intensive deep cleaning checklist for Arlington, VA homes.",
            serviceType: "Deep House Cleaning",
            provider: {
              "@type": "LocalBusiness",
              name: "Capitol Shine",
              url: "https://capitolshinecleaners.com",
              telephone: "+17033759132",
            },
            areaServed: ["Arlington, VA", "Alexandria, VA", "McLean, VA", "Falls Church, VA"],
          }),
        }}
      />

      <div className="min-h-screen bg-paper">
        <section className="border-b border-navy/10 bg-paper py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PageBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Checklists", href: "/checklists" },
                { label: "Deep" },
              ]}
            />
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Deep Clean · One-Time
            </p>
            <h1 className="max-w-4xl font-display text-[3.35rem] font-light leading-[0.94] tracking-tight text-ink md:text-[4.7rem]">
              Deep cleaning
              <br />
              <em className="italic">checklist.</em>
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted md:text-[1.3rem] md:leading-[1.45]">
              One-time intensive cleaning for first-time clients, seasonal resets, or homes without a
              recent professional clean. Many clients start here and then switch to recurring standard.
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <ChecklistSidebarCalculator
                  service="deep"
                  defaultBedrooms={2}
                  defaultBathrooms="2"
                />
              </aside>

              <div>
                {rooms.map((room) => (
                  <section key={room.number} className="border-b border-navy/10 py-8 first:pt-0">
                    <h2 className="flex items-center gap-4 font-display text-[1.95rem] font-semibold leading-none tracking-tight text-ink md:text-[2.75rem]">
                      <span className="font-mono text-[0.85rem] font-semibold tracking-[0.12em] text-muted">
                        {room.number}
                      </span>
                      {room.name}
                    </h2>
                    <ul className="mt-8 columns-1 gap-x-10 md:columns-2">
                      {room.items.map((item) => (
                        <li
                          key={item}
                          className="flex break-inside-avoid items-start gap-3 py-2 text-base leading-relaxed text-charcoal/90 md:text-[1.05rem]"
                        >
                          <Sparkles size={17} className="mt-1 flex-shrink-0 text-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        <EditorialCloseCTA
          title={
            <>
              The reset
              <br />
              <em className="italic text-gold-2">your home needs.</em>
            </>
          }
          description={
            <>
              Most clients start with a deep clean, then move into recurring service. New clients save
              $30 on the first appointment with FIRST30.
            </>
          }
          actions={
            <>
              <Link
                href="/book?promo=FIRST30&service=deep"
                className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-2"
              >
                Book Online
              </Link>
              <Link
                href="/checklists/standard-cleaning"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
              >
                Compare Standard Cleaning
              </Link>
            </>
          }
        />
      </div>
    </>
  );
}
