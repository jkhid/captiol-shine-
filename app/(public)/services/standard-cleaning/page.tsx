import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import { EditorialCloseCTA, EditorialHero, SectionIntro } from "@/components/public/WavePage";

const URL = "https://capitolshinecleaners.com/services/standard-cleaning";

const roomSections = [
  {
    title: "Kitchen",
    items: [
      "Wipe and sanitize countertops",
      "Clean stovetop and knobs",
      "Wipe appliance exteriors",
      "Sanitize sink and faucet",
      "Wipe cabinet fronts",
      "Empty and reline trash",
      "Sweep and mop floor",
    ],
  },
  {
    title: "Bathrooms",
    items: [
      "Scrub and disinfect toilet",
      "Clean sink and vanity",
      "Polish mirrors",
      "Scrub shower walls and tub",
      "Disinfect fixtures and handles",
      "Sweep and mop floor",
    ],
  },
  {
    title: "Bedrooms",
    items: [
      "Dust furniture surfaces",
      "Wipe nightstands and lamp bases",
      "Vacuum carpets or mop hard floors",
      "Empty trash cans",
      "Make beds if fresh linens are out",
    ],
  },
  {
    title: "Living & common areas",
    items: [
      "Dust furniture, shelves, and decor",
      "Wipe coffee and end tables",
      "Vacuum upholstery cushions",
      "Vacuum or mop floors",
      "Wipe windowsills",
      "Dust accessible ceiling fans",
    ],
  },
];

const frequencyOptions = [
  {
    title: "One-time",
    price: "From $150",
    note: "Single visit",
    items: ["Same scope as recurring", "Best for occasional maintenance", "No recurring discount"],
  },
  {
    title: "Biweekly",
    price: "From $135",
    note: "10% off",
    items: ["Every 2 weeks", "Same dedicated cleaner when possible", "Easy skip or reschedule"],
  },
  {
    title: "Weekly",
    price: "From $120",
    note: "20% off",
    featured: true,
    items: ["Priority scheduling", "Best recurring value", "Most consistent home baseline"],
  },
];

export const metadata: Metadata = {
  title: "Standard Cleaning Service — Arlington, VA | Capitol Shine",
  description:
    "Recurring weekly and biweekly house cleaning in Arlington, VA. Transparent pricing, consistent scope, and the same trusted team when possible.",
  openGraph: {
    title: "Standard Cleaning Service in Arlington, VA | Capitol Shine",
    description:
      "Recurring maintenance cleaning for Arlington homes. Same scope every visit, transparent pricing, and no surprises.",
    url: URL,
  },
  alternates: { canonical: URL },
};

export default function StandardCleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Standard House Cleaning",
            serviceType: "Recurring Residential Cleaning",
            provider: {
              "@type": "LocalBusiness",
              name: "Capitol Shine",
              telephone: "+1-703-375-9132",
            },
            areaServed: ["Arlington, VA", "McLean, VA", "Alexandria, VA", "Falls Church, VA"],
            url: URL,
            description:
              "Recurring weekly or biweekly residential cleaning service for homes in Arlington and Northern Virginia.",
          }),
        }}
      />

      <EditorialHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Standard Cleaning" },
        ]}
        eyebrow="Residential · Recurring"
        title={
          <>
            Standard cleaning
            <br />
            <em className="italic">service in Arlington.</em>
          </>
        }
        description={
          <>
            Recurring weekly or biweekly maintenance that keeps your home consistently fresh. Same
            scope, same expectations, and the same cleaner whenever possible.
          </>
        }
        actions={
          <>
            <Link
              href="/book?promo=FIRST30"
              className="inline-flex items-center justify-center rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy/92"
            >
              Book Online
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl border border-navy/12 bg-white px-5 py-3 text-sm font-medium text-ink transition hover:border-navy/25"
            >
              See Full Pricing
            </Link>
            <a
              href="tel:+17033759132"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy/12 bg-white px-5 py-3 text-sm font-medium text-ink transition hover:border-navy/25"
            >
              <Phone size={15} />
              Call
            </a>
          </>
        }
        aside={
          <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_30px_90px_-55px_rgba(23,36,63,0.6)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/before-after/Living_Room_After.jpg"
                alt="Freshly cleaned living room"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 360px, 100vw"
              />
            </div>
            <div className="border-t border-navy/8 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Starting from</p>
              <p className="mt-2 font-display text-4xl font-light tracking-tight text-ink">$150</p>
              <p className="mt-2 text-sm text-muted">One-bedroom visit. Recurring schedules save more.</p>
            </div>
          </div>
        }
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="What&apos;s Included · Every Visit"
            title={
              <>
                Same scope.
                <br />
                <em className="italic">Every time.</em>
              </>
            }
            description={
              <>
                Reliable baseline maintenance for kitchens, bathrooms, bedrooms, and common areas.
                These are the tasks your recurring service covers at every visit.
              </>
            }
          />
          <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-navy/10 md:grid-cols-2">
            {roomSections.map((section, index) => (
              <div
                key={section.title}
                className={`py-8 ${index % 2 === 0 ? "md:border-r md:border-navy/10 md:pr-10" : "md:pl-2"}`}
              >
                <h2 className="font-display text-3xl font-light tracking-tight text-ink">{section.title}</h2>
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-charcoal/80">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Frequency Options"
            title={
              <>
                More often,
                <br />
                <em className="italic">more saved.</em>
              </>
            }
            description={
              <>
                Recurring clients get the cleanest experience and the best rate. Weekly and biweekly
                plans also make it easier to keep the same team on your home.
              </>
            }
          />

          <div className="mt-10 grid gap-px overflow-hidden rounded-[24px] border border-navy/10 bg-navy/10 lg:grid-cols-3">
            {frequencyOptions.map((option) => (
              <div
                key={option.title}
                className={`relative bg-white p-6 md:p-7 ${option.featured ? "bg-cream" : ""}`}
              >
                {option.featured ? (
                  <span className="absolute right-5 top-5 rounded-md bg-gold px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
                    Best value
                  </span>
                ) : null}
                <h3 className="font-display text-3xl font-light tracking-tight text-ink">{option.title}</h3>
                <p className="mt-3 font-display text-4xl font-light tracking-tight text-ink">{option.price}</p>
                <p className="mt-1 text-sm font-medium text-green">{option.note}</p>
                <ul className="mt-6 space-y-3">
                  {option.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-charcoal/80">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[24px] border border-amber-200 bg-amber-50 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
            Not Included In Standard
          </p>
          <h2 className="mt-4 font-display text-4xl font-light leading-none tracking-tight text-ink">
            Looking for
            <br />
            <em className="italic">something deeper?</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/75 md:text-base">
            Inside the oven, inside the fridge, baseboards, interior windows, grout scrubbing, and
            detailed fan cleaning are outside standard maintenance scope. Most first-time clients start
            with a{" "}
            <Link href="/services/deep-cleaning" className="font-semibold text-navy underline decoration-navy/20 underline-offset-4">
              deep cleaning
            </Link>
            , then move to recurring standard once the home has been reset.
          </p>
        </div>
      </section>

      <EditorialCloseCTA
        title={
          <>
            Lighter weeks.
            <br />
            <em className="italic text-gold-2">Cleaner home.</em>
          </>
        }
        description={
          <>
            Set up weekly or biweekly service and keep the baseline handled. New clients save $30 on
            the first visit with FIRST30.
          </>
        }
        actions={
          <>
            <Link
              href="/book?promo=FIRST30"
              className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-2"
            >
              Book Standard Cleaning
            </Link>
            <Link
              href="/checklists/standard-cleaning"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
            >
              View Checklist
            </Link>
          </>
        }
      />
    </>
  );
}
