import type { Metadata } from "next";
import Link from "next/link";
import HowItWorksReferral from "@/components/referrals/HowItWorksReferral";
import ReferralForm from "@/components/referrals/ReferralForm";
import Testimonials from "@/components/referrals/Testimonials";
import { FAQAccordion } from "@/components/pricing/FAQ";
import { EditorialCloseCTA, EditorialHero } from "@/components/public/WavePage";

const URL = "https://capitolshinecleaners.com/referrals";

const referralFAQs = [
  {
    q: "Is there a limit to how many people I can refer?",
    a: "No. Refer as many friends, neighbors, or coworkers as you want. There is no cap on referral credits.",
  },
  {
    q: "When does my credit apply?",
    a: "Once your friend completes their first cleaning, your $30 credit is automatically applied to your next scheduled appointment.",
  },
  {
    q: "Can I stack referral credits?",
    a: "Yes. Credits stack on future bookings, so multiple successful referrals can cover a meaningful portion of recurring service.",
  },
];

export const metadata: Metadata = {
  title: "Referral Program — Give $30, Get $30 | Capitol Shine",
  description:
    "Share Capitol Shine with a friend and you both save $30 on home cleaning. No cap on referral credits.",
  openGraph: {
    title: "Referral Program | Capitol Shine",
    description: "Give $30, Get $30. Refer friends and save on home cleaning.",
    url: URL,
  },
  alternates: { canonical: URL },
};

export default function ReferralsPage() {
  return (
    <>
      <EditorialHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Referrals" }]}
        eyebrow="Refer a Friend"
        title={
          <>
            Give <em className="italic text-gold">$30</em>.
            <br />
            Get <em className="italic"> $30</em>.
          </>
        }
        description={
          <>
            Love your clean? Share Capitol Shine with a friend, neighbor, or coworker. They save $30.
            You save $30. No cap, ever.
          </>
        }
        actions={
          <>
            <a
              href="#share"
              className="inline-flex items-center justify-center rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy/92"
            >
              Get My Referral Link
            </a>
            <Link
              href="/book?promo=FIRST30"
              className="inline-flex items-center justify-center rounded-xl border border-navy/12 bg-white px-5 py-3 text-sm font-medium text-ink transition hover:border-navy/25"
            >
              Book First Clean
            </Link>
          </>
        }
        aside={
          <div className="relative aspect-square overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#1f3152,#17243f)] p-6 text-gold-2 shadow-[0_30px_80px_-45px_rgba(12,21,41,0.95)]">
            <div className="absolute inset-8 rounded-[18px] border border-dashed border-gold/35" />
            <div className="absolute left-6 top-6 text-[11px] uppercase tracking-[0.18em] text-white/50">
              Capitol Shine
            </div>
            <div className="absolute right-6 top-6 text-right text-[11px] uppercase tracking-[0.18em] text-white/50">
              Member · 2026
            </div>
            <div className="relative flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-[clamp(6rem,13vw,9rem)] font-light leading-[0.8] tracking-[-0.05em]">
                $30
              </p>
              <p className="mt-2 text-lg uppercase tracking-[0.28em] text-gold">both ways</p>
            </div>
          </div>
        }
      />

      <HowItWorksReferral />
      <ReferralForm />
      <Testimonials />

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[24px] border border-navy/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(23,36,63,0.35)] md:p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Referral FAQ</p>
          <h2 className="font-display text-4xl font-light leading-none tracking-tight text-ink">
            A few quick
            <br />
            <em className="italic">questions.</em>
          </h2>
          <div className="mt-8">
            <FAQAccordion items={referralFAQs} />
          </div>
        </div>
      </section>

      <EditorialCloseCTA
        title={
          <>
            Not a client yet?
            <br />
            <em className="italic text-gold-2">Start here.</em>
          </>
        }
        description={
          <>
            Book your first clean and get $30 off automatically. Once you&apos;re in the system, your
            referral link is ready whenever you want to share it.
          </>
        }
        actions={
          <>
            <Link
              href="/book?promo=FIRST30"
              className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-2"
            >
              Book Your First Clean
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
