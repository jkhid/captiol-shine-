import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import ChecklistSidebarCalculator from "@/components/public/ChecklistSidebarCalculator";
import { EditorialCloseCTA, PageBreadcrumbs } from "@/components/public/WavePage";

const URL = "https://capitolshinecleaners.com/checklists/move-out-cleaning";

const rooms = [
  {
    number: "01",
    name: "Kitchen",
    items: [
      "Inside upper / lower cabinets + drawers",
      "Wipe cabinet interiors, shelves, back walls",
      "Inside oven (racks, walls, door glass)",
      "Inside microwave",
      "Inside fridge / freezer (shelves, drawers, door seals)",
      "Inside dishwasher (walls, filter, gasket)",
      "Degrease range hood + filter",
      "Sanitize countertops, sink, faucet",
      "Wipe appliance exteriors",
      "Wipe cabinet fronts + handles",
      "Sweep + mop",
      "Empty / clean trash",
    ],
  },
  {
    number: "02",
    name: "Bathrooms",
    items: [
      "Scrub + disinfect toilet + behind base",
      "Inside medicine cabinet + vanity cabinets",
      "Sanitize sink, vanity, faucet",
      "Polish mirror + chrome",
      "Scrub tile grout",
      "Descale faucets + shower head",
      "Scrub shower / tub",
      "Clean exhaust fan cover",
      "Sweep + mop",
    ],
  },
  {
    number: "03",
    name: "Bedrooms",
    items: [
      "Clean closet interiors (shelves, rods, walls, floor)",
      "Dust furniture",
      "Wipe walls + spot-clean scuffs",
      "Vacuum carpets or mop (corners + edges)",
      "Vacuum under / behind furniture where accessible",
    ],
  },
  {
    number: "04",
    name: "Living & common",
    items: [
      "Closet interiors + storage",
      "Dust furniture, shelves, ledges",
      "Wipe walls + baseboards",
      "Vacuum / mop floors",
      "Wipe blinds / window treatments",
    ],
  },
  {
    number: "05",
    name: "Windows",
    items: [
      "Interior glass on all windows",
      "Wipe frames + sills",
      "Clean sills + tracks",
      "Wipe interior screens where accessible",
    ],
  },
  {
    number: "06",
    name: "Throughout home",
    items: [
      "Wipe all baseboards",
      "Clean door frames + trim",
      "Wipe switches + outlet covers",
      "Ceiling fan blades + housing",
      "Wipe light fixtures",
      "Clean HVAC vent covers",
      "Wipe door handles / knobs",
      "Empty all trash",
    ],
  },
  {
    number: "07",
    name: "Additional",
    items: [
      "Garage sweep (if applicable)",
      "Wipe garage walls + baseboards",
      "Clean laundry room (washer / dryer area, shelves)",
    ],
  },
];

export const metadata: Metadata = {
  title: "Move-Out Cleaning Checklist — Arlington, VA | Capitol Shine",
  description:
    "See every task included in our move-out and move-in cleaning service in Arlington, VA. Cabinets, appliances, closets, windows, and walkthrough-ready detail cleaning.",
  openGraph: {
    title: "Move-Out Cleaning Checklist | Capitol Shine",
    description:
      "Room-by-room checklist for our most detailed move-out and move-in cleaning service in Arlington and Northern Virginia.",
    url: URL,
  },
  alternates: { canonical: URL },
};

export default function MoveOutCleaningChecklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Move-Out Cleaning Checklist",
            description:
              "Full-property move-out and move-in cleaning checklist for Arlington, VA homes.",
            serviceType: "Move-Out Cleaning",
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
                { label: "Move-out" },
              ]}
            />
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Move-Out · Most Detailed
            </p>
            <h1 className="max-w-4xl font-display text-[3.35rem] font-light leading-[0.94] tracking-tight text-ink md:text-[4.7rem]">
              Move-out cleaning
              <br />
              <em className="italic">checklist.</em>
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted md:text-[1.3rem] md:leading-[1.45]">
              Our most detailed clean. Inside every cabinet, drawer, and appliance, plus closet
              interiors and interior windows. Built to hold up during landlord walkthroughs.
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
              <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
                <ChecklistSidebarCalculator
                  service="moveinout"
                  defaultBedrooms={2}
                  defaultBathrooms="2"
                />
                <div className="rounded-2xl bg-ink p-5 text-sm leading-relaxed text-white/80">
                  <strong className="text-gold-2">Booking tip:</strong> Schedule after furniture is out,
                  but before the final landlord walkthrough. End-of-month slots fill fastest, so 48-72
                  hours ahead is safest.
                </div>
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
                          <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-green" />
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
              Get your
              <br />
              <em className="italic text-gold-2">full deposit back.</em>
            </>
          }
          description={
            <>
              Detailed receipt included, and the scope is built around what landlords actually inspect.
              Book this week while the end-of-month schedule still has room.
            </>
          }
          actions={
            <>
              <Link
                href="/book?promo=FIRST30&service=moveinout"
                className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-2"
              >
                Book Online
              </Link>
              <Link
                href="/checklists/deep-cleaning"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
              >
                Compare Deep Cleaning
              </Link>
            </>
          }
        />
      </div>
    </>
  );
}
