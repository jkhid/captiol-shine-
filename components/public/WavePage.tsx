import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function PageBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && <ChevronRight size={12} className="text-navy/30" />}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-navy">
                {item.label}
              </Link>
            ) : (
              <span className="text-charcoal">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EditorialHero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  actions,
  aside,
}: {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-navy/8 bg-paper py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs ? <PageBreadcrumbs items={breadcrumbs} /> : null}
        <div className={aside ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center" : "max-w-4xl"}>
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">{eyebrow}</p>
            <h1 className="font-display text-5xl font-light leading-[0.95] tracking-tight text-ink md:text-6xl">
              {title}
            </h1>
            <div className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</div>
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-4xl font-light leading-none tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      {description ? (
        <div className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{description}</div>
      ) : null}
    </div>
  );
}

export function EditorialCloseCTA({
  title,
  description,
  actions,
}: {
  title: ReactNode;
  description: ReactNode;
  actions: ReactNode;
}) {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-ink px-6 py-12 text-center shadow-[0_30px_80px_-40px_rgba(12,21,41,0.7)] sm:px-10 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-4xl font-light leading-[0.96] tracking-tight text-white md:text-6xl">
            {title}
          </h2>
          <div className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {description}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>
        </div>
      </div>
    </section>
  );
}
