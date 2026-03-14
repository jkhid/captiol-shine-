import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ArrowRight, Home, Building2, HardHat, Star } from "lucide-react";

const categories = [
  {
    icon: Home,
    label: "Residential",
    headline: "A cleaner home, on your schedule.",
    description:
      "From weekly upkeep to a full deep reset, our residential packages keep your home consistently fresh — with no contracts required.",
    services: [
      { name: "Standard Clean", detail: "Recurring maintenance — weekly or biweekly" },
      { name: "Deep Clean", detail: "Top-to-bottom reset, inside appliances & baseboards" },
      { name: "Move-In / Move-Out", detail: "Every cabinet, drawer, and corner — spotless" },
    ],
    cta: { label: "See Residential Pricing", href: "/pricing?service=residential" },
    accent: "bg-navy",
  },
  {
    icon: Star,
    label: "Airbnb & Short-Term Rentals",
    headline: "5-star turnovers, every time.",
    description:
      "Fast, reliable cleaning between guests — timed to your checkout. We handle linens, restocking checks, and same-day availability so you never miss a booking.",
    services: [
      { name: "Full Surface Clean & Sanitize", detail: "Kitchen, bathrooms, all rooms" },
      { name: "Linen & Bed Making", detail: "Fresh setup ready for next guest" },
      { name: "Restock & Trash Check", detail: "Essentials verified, trash removed" },
    ],
    cta: { label: "See Airbnb Pricing", href: "/pricing?service=airbnb" },
    accent: "bg-gold",
  },
  {
    icon: Building2,
    label: "Commercial",
    headline: "Professional spaces deserve professional cleaning.",
    description:
      "We service offices, retail spaces, and common areas in the Arlington area. Flexible scheduling including after-hours and weekend availability.",
    services: [
      { name: "Office & Workspace Cleaning", detail: "Desks, floors, kitchens, restrooms" },
      { name: "Retail & Lobby Cleaning", detail: "High-traffic areas and storefronts" },
      { name: "Recurring Contracts", detail: "Daily, weekly, or custom schedules" },
    ],
    cta: { label: "Request a Quote", href: "/pricing?service=commercial" },
    accent: "bg-navy",
  },
  {
    icon: HardHat,
    label: "Post-Construction",
    headline: "Ready for move-in. Not a speck of dust.",
    description:
      "Newly built or renovated spaces need a specialized clean before occupancy. We remove construction debris, dust, and residue from every surface.",
    services: [
      { name: "Debris & Dust Removal", detail: "Walls, vents, floors, fixtures" },
      { name: "Window & Glass Polish", detail: "Labels, film, and smudges removed" },
      { name: "Final Inspection Clean", detail: "Walkthrough-ready before handoff" },
    ],
    cta: { label: "Request a Quote", href: "/pricing?service=construction" },
    accent: "bg-charcoal",
  },
];

export default function ServicesGrid() {
  return (
    <SectionWrapper className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Services for every space
          </h2>
          <p className="mt-4 text-charcoal/70">
            Residential, commercial, post-construction, or short-term rental — we have the right clean for the job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.label}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col"
              >
                {/* Header bar */}
                <div className={`${cat.accent} px-6 py-5 flex items-center gap-3`}>
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-white font-semibold tracking-wide text-sm uppercase">
                    {cat.label}
                  </span>
                </div>

                {/* Body */}
                <div className="px-6 pt-6 pb-7 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-bold text-navy mb-2">
                    {cat.headline}
                  </h3>
                  <p className="text-sm text-charcoal/70 mb-5">{cat.description}</p>

                  <ul className="space-y-3 mb-7 flex-1">
                    {cat.services.map((svc) => (
                      <li key={svc.name} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                        <span className="text-sm text-charcoal">
                          <span className="font-semibold">{svc.name}</span>
                          <span className="text-charcoal/60"> — {svc.detail}</span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={cat.cta.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold transition-colors group"
                  >
                    {cat.cta.label}
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
