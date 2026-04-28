import Link from "next/link";

const SERVICES = [
  {
    num: "01",
    name: "Standard Clean",
    tagline: "Recurring maintenance for a consistently fresh home.",
    description:
      "Dust, vacuum, mop, bathrooms, kitchen — everything reset on your schedule. Weekly, biweekly, or monthly. No contracts.",
    from: "$150",
    href: "/pricing?service=residential",
  },
  {
    num: "02",
    name: "Deep Clean",
    tagline: "Top-to-bottom reset — every surface, appliance, and corner.",
    description:
      "Everything in Standard, plus inside the oven and microwave, baseboards, door frames, ceiling fans, and window sills. Perfect for a first clean or seasonal refresh.",
    from: "$240",
    href: "/pricing?service=residential",
  },
  {
    num: "03",
    name: "Move-In / Move-Out",
    tagline: "Spotless for deposit recovery or a fresh start.",
    description:
      "All Deep Clean tasks plus inside every cabinet and drawer, inside the refrigerator, interior windows, and garage sweep. Leave nothing behind — or arrive to nothing left undone.",
    from: "$300",
    href: "/pricing?service=residential",
  },
];

const OTHER_SERVICES = [
  { label: "Airbnb & STR Turnover", href: "/pricing?service=airbnb" },
  { label: "Commercial Cleaning",   href: "/pricing?service=commercial" },
  { label: "Post-Construction",     href: "/pricing?service=construction" },
];

export default function ServicesGrid() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Residential</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-tight">
            Every type of clean,<br />
            <em className="italic">covered.</em>
          </h2>
        </div>

        {/* Numbered service rows */}
        <div className="divide-y divide-navy/8">
          {SERVICES.map((svc) => (
            <div key={svc.num} className="py-10 flex flex-col sm:flex-row sm:items-start gap-6 group">

              {/* Number */}
              <div className="flex-shrink-0 w-12">
                <span className="font-display text-sm text-gold font-light tracking-wider">{svc.num}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-2xl md:text-3xl text-ink font-light tracking-tight mb-2">
                  {svc.name}
                </h3>
                <p className="text-navy/70 font-medium text-sm mb-3">{svc.tagline}</p>
                <p className="text-muted text-sm leading-relaxed max-w-2xl">{svc.description}</p>
              </div>

              {/* From price + CTA */}
              <div className="flex-shrink-0 text-right sm:text-right flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider">From</p>
                  <p className="font-display text-2xl text-ink font-semibold tracking-tight">{svc.from}</p>
                </div>
                <Link
                  href={svc.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold transition-colors group-hover:gap-2"
                >
                  See pricing
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Other services row */}
        <div className="mt-12 pt-8 border-t border-navy/8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">Also available</span>
          {OTHER_SERVICES.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-charcoal hover:text-navy transition-colors"
            >
              {label} →
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
