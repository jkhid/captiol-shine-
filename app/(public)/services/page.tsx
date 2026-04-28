import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Briefcase, ChevronRight, HardHat, House, Sparkles } from "lucide-react";
import { EditorialCloseCTA, EditorialHero } from "@/components/public/WavePage";

const URL = "https://capitolshinecleaners.com/services";

const services = [
  {
    number: "01",
    title: "Standard cleaning",
    description: "Recurring weekly or biweekly maintenance. Same scope, same cleaner, every visit.",
    price: "From $120 weekly",
    href: "/services/standard-cleaning",
    icon: House,
    accent: "from-[#f5eee0] to-white",
  },
  {
    number: "02",
    title: "Deep cleaning",
    description: "One-time intensive service for baseboards, inside appliances, grout, and hard-to-reach buildup.",
    price: "From $240",
    href: "/services/deep-cleaning",
    icon: Sparkles,
    accent: "from-[#eef2f8] to-white",
  },
  {
    number: "03",
    title: "Move-in / move-out",
    description: "Every cabinet, drawer, appliance, and closet cleaned for walkthrough-ready turnover.",
    price: "From $300",
    href: "/services/move-out-cleaning",
    icon: House,
    accent: "from-[#f7f0e7] to-white",
  },
  {
    number: "04",
    title: "Airbnb turnover",
    description: "Same-day turnovers, linen service, restocking, and damage reporting for hosts.",
    price: "From $95",
    href: "/services/airbnb-cleaning",
    icon: Building2,
    accent: "from-[#eef7f4] to-white",
  },
  {
    number: "05",
    title: "Commercial",
    description: "Offices, retail, and professional spaces. After-hours available, free walk-through first.",
    price: "Quoted by scope",
    href: "/services/commercial-cleaning",
    icon: Briefcase,
    accent: "from-[#eff3f8] to-white",
  },
  {
    number: "06",
    title: "Post-construction",
    description: "Rough, final, and pre-walkthrough cleaning for contractors and homeowners across NoVA.",
    price: "Quoted on-site",
    href: "/services/post-construction-cleaning",
    icon: HardHat,
    accent: "from-[#f5f2ea] to-white",
  },
];

export const metadata: Metadata = {
  title: "Cleaning Services — Arlington, VA | Capitol Shine",
  description:
    "Explore Capitol Shine's residential, Airbnb, commercial, and post-construction cleaning services in Arlington and Northern Virginia.",
  openGraph: {
    title: "Cleaning Services in Arlington, VA | Capitol Shine",
    description:
      "One trusted team for recurring home cleaning, deep cleans, move-out cleans, Airbnb turnovers, offices, and post-construction cleanup.",
    url: URL,
  },
  alternates: { canonical: URL },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Capitol Shine Services",
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: service.title,
              url: `https://capitolshinecleaners.com${service.href}`,
            })),
          }),
        }}
      />

      <EditorialHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="Everything We Clean"
        title={
          <>
            One team.
            <br />
            <em className="italic">Every kind of clean.</em>
          </>
        }
        description={
          <>
            Residential, commercial, short-term rental, or post-construction. One call, one
            accountable team, and transparent pricing wherever it makes sense to publish it.
          </>
        }
      />

      <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.href}
                href={service.href}
                className="group grid overflow-hidden rounded-[24px] border border-navy/10 bg-white shadow-[0_24px_60px_-40px_rgba(23,36,63,0.45)] transition hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-[0_32px_75px_-40px_rgba(23,36,63,0.4)] sm:grid-cols-[minmax(0,1fr)_190px]"
              >
                <div className="flex flex-col p-7 md:p-8">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-muted">
                    {service.number} / {services.length.toString().padStart(2, "0")}
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-light leading-none tracking-tight text-ink">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
                    {service.description}
                  </p>
                  <div className="mt-auto flex items-end justify-between gap-4 border-t border-navy/8 pt-6">
                    <span className="font-display text-2xl font-light tracking-tight text-ink">
                      {service.price}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy transition group-hover:gap-2">
                      View service
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
                <div className={`flex items-center justify-center bg-gradient-to-br ${service.accent} p-8`}>
                  <div className="flex h-full w-full flex-col justify-between rounded-[20px] border border-navy/10 bg-white/70 p-5 backdrop-blur">
                    <Icon size={28} className="text-navy" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                        Capitol Shine
                      </p>
                      <p className="mt-2 font-display text-5xl font-light leading-none tracking-tight text-ink">
                        {service.number}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <EditorialCloseCTA
        title={
          <>
            Not sure which one?
            <br />
            <em className="italic text-gold-2">Get a quote in 60 seconds.</em>
          </>
        }
        description={
          <>
            Tell us about the property and the scope. We&apos;ll point you to the right service and the
            clearest next step.
          </>
        }
        actions={
          <>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-2"
            >
              See Pricing
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Book Online
            </Link>
          </>
        }
      />
    </>
  );
}
