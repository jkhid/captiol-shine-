import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock3, MapPin, Phone } from "lucide-react";
import ServiceMap from "@/components/areas/ServiceMap";
import WaitlistForm from "@/components/areas/WaitlistForm";
import { EditorialCloseCTA, EditorialHero, SectionIntro } from "@/components/public/WavePage";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";

const URL = "https://capitolshinecleaners.com/areas";

export const metadata: Metadata = {
  title: "Service Areas — Arlington, McLean, Alexandria & Northern Virginia",
  description:
    "Capitol Shine serves Arlington, McLean, Alexandria, Falls Church, Rosslyn, Clarendon, Ballston, Crystal City, and surrounding Northern Virginia neighborhoods.",
  openGraph: {
    title: "Service Areas — Arlington, McLean, Alexandria & Northern Virginia | Capitol Shine",
    description:
      "Professional cleaning in Arlington, McLean, Alexandria, Falls Church, and surrounding Northern Virginia communities.",
    url: URL,
  },
  alternates: { canonical: URL },
};

export default function AreasPage() {
  return (
    <>
      <EditorialHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]}
        eyebrow="Arlington & Northern Virginia"
        title={
          <>
            Proudly serving
            <br />
            <em className="italic">15+ neighborhoods.</em>
          </>
        }
        description={
          <>
            Fast response across Arlington County, plus McLean, Alexandria, and Falls Church. Built
            around the neighborhoods we clean every single week.
          </>
        }
      />

      <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="grid gap-6 overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#1f3152,#17243f)] p-6 text-white shadow-[0_30px_90px_-50px_rgba(12,21,41,0.95)] md:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10 lg:p-10">
            <div className="max-w-xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-2">
                Arlington routes · Northern Virginia
              </p>
              <h2 className="font-display text-4xl font-light leading-[0.95] tracking-tight md:text-5xl">
                30-minute
                <br />
                <em className="italic text-gold-2">average response.</em>
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/68 md:text-base">
                Our fastest routes stay centered around Arlington, then stretch into the nearby NoVA
                neighborhoods we service every week. Outside the usual radius? Tell us where you are.
                We can often still make it work.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold-2"
                >
                  Book This Week
                </Link>
                <a
                  href="tel:+17033759132"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  <Phone size={15} />
                  Call
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[20px] border border-white/10 bg-white/5">
              <ServiceMap heightClass="h-[360px] md:h-[420px] lg:h-[460px]" />
            </div>
          </div>

          <div>
            <SectionIntro
              eyebrow="Service Radius"
              title={
                <>
                  Where we clean
                  <br />
                  <em className="italic">every week.</em>
                </>
              }
              description={
                <>
                  These are our most active neighborhoods today. Same-day availability varies by route,
                  but this is where we can usually move fastest.
                </>
              }
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {NEIGHBORHOODS.map((neighborhood) => (
                <Link
                  key={neighborhood.name}
                  href={`/book?zip=${neighborhood.zip}`}
                  className="group rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_18px_50px_-38px_rgba(23,36,63,0.5)] transition hover:-translate-y-0.5 hover:border-navy/25 hover:shadow-[0_28px_70px_-40px_rgba(23,36,63,0.35)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-3xl font-light tracking-tight text-ink">
                        {neighborhood.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{neighborhood.description}</p>
                    </div>
                    <span className="rounded-md bg-cream px-2.5 py-1 font-mono text-[11px] text-muted">
                      {neighborhood.zip}
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-4 border-t border-navy/8 pt-4 text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={14} className="text-navy/60" />
                      ~{neighborhood.responseTime}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-green" />
                      Same-day possible
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} className="text-navy/60" />
                      Book in {neighborhood.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <WaitlistForm />
        </div>
      </section>

      <EditorialCloseCTA
        title={
          <>
            One call.
            <br />
            <em className="italic text-gold-2">One trusted team.</em>
          </>
        }
        description={
          <>
            Save $30 on your first clean. Book online in under a minute or call and we&apos;ll route you
            to the soonest available slot.
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
    </>
  );
}
