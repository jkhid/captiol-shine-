import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import ChecklistSidebarCalculator from "@/components/public/ChecklistSidebarCalculator";
import { EditorialCloseCTA, PageBreadcrumbs } from "@/components/public/WavePage";

const URL = "https://capitolshinecleaners.com/checklists/standard-cleaning";

const rooms = [
  {
    number: "01",
    name: "Kitchen",
    items: [
      "Wipe & sanitize countertops",
      "Clean stovetop + knobs",
      "Wipe exterior of fridge",
      "Wipe exterior of oven",
      "Wipe exterior of microwave",
      "Wipe exterior of dishwasher",
      "Sanitize sink + faucet",
      "Wipe cabinet fronts",
      "Empty + reline trash",
      "Sweep floor",
      "Mop floor",
    ],
  },
  {
    number: "02",
    name: "Bathrooms",
    items: [
      "Scrub & disinfect toilet (bowl, seat, lid, tank, base)",
      "Clean & sanitize sink + vanity",
      "Polish mirror",
      "Scrub shower walls",
      "Scrub tub + fixtures",
      "Disinfect shower / tub floor",
      "Sweep floor",
      "Mop floor",
      "Empty trash",
    ],
  },
  {
    number: "03",
    name: "Bedrooms",
    items: [
      "Dust furniture surfaces",
      "Wipe nightstands + lamp bases",
      "Vacuum carpets",
      "Mop hard floors",
      "Empty trash",
      "Make bed if fresh linens are out",
    ],
  },
  {
    number: "04",
    name: "Living & common areas",
    items: [
      "Dust furniture, shelves, decor",
      "Wipe coffee + end tables",
      "Vacuum upholstery cushions",
      "Vacuum or mop floors",
      "Wipe windowsills",
      "Dust ceiling fans within reach",
    ],
  },
  {
    number: "05",
    name: "Throughout home",
    items: [
      "Wipe light switches",
      "Wipe door handles",
      "Empty all trash + replace liners",
      "Dust accessible horizontal surfaces",
    ],
  },
];

export const metadata: Metadata = {
  title: "Standard Cleaning Checklist — Arlington, VA | Capitol Shine",
  description:
    "See every task included in our standard weekly and biweekly house cleaning service in Arlington, VA. A complete room-by-room checklist with no surprises.",
  openGraph: {
    title: "Standard Cleaning Checklist | Capitol Shine",
    description:
      "Room-by-room checklist for our standard recurring cleaning service in Arlington and Northern Virginia.",
    url: URL,
  },
  alternates: { canonical: URL },
};

export default function StandardCleaningChecklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Standard House Cleaning Checklist",
            description:
              "Recurring weekly and biweekly house cleaning checklist for Arlington, VA homes.",
            serviceType: "Standard House Cleaning",
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
                { label: "Standard" },
              ]}
            />
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Standard Clean · Most Popular
            </p>
            <h1 className="max-w-4xl font-display text-[3.35rem] font-light leading-[0.94] tracking-tight text-ink md:text-[4.7rem]">
              Standard cleaning
              <br />
              <em className="italic">checklist.</em>
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted md:text-[1.3rem] md:leading-[1.45]">
              Our most popular service. Same scope every visit, a reliable maintenance baseline,
              and every task below included at no extra charge.
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <ChecklistSidebarCalculator
                  service="standard"
                  defaultBedrooms={2}
                  defaultBathrooms="1.5"
                  defaultFrequency="biweekly"
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
                          <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-green" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}

                <div className="mt-8 rounded-2xl bg-cream p-6">
                  <h3 className="font-display text-[2rem] font-light tracking-tight text-ink md:text-[2.35rem]">
                    Not included in standard
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
                    Inside oven, inside fridge, interior windows, baseboards, and ceiling fan blades
                    are outside standard scope. For those, see the{" "}
                    <Link
                      href="/checklists/deep-cleaning"
                      className="font-semibold text-navy underline decoration-navy/20 underline-offset-4"
                    >
                      deep clean checklist
                    </Link>
                    , or add them as one-time extras when booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EditorialCloseCTA
          title={
            <>
              Set up
              <br />
              <em className="italic text-gold-2">recurring service.</em>
            </>
          }
          description={
            <>
              Same cleaner when possible. Same scope. Every visit. New clients save $30 on the first
              clean with FIRST30.
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
