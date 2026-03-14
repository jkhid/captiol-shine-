import type { Metadata } from "next";
import HowItWorksReferral from "@/components/referrals/HowItWorksReferral";
import ReferralForm from "@/components/referrals/ReferralForm";
import { FAQAccordion } from "@/components/pricing/FAQ";

export const metadata: Metadata = {
  title: "Referral Program",
  description:
    "Give $30, Get $30. Share Capitol Shine with a friend and you both save on home cleaning.",
  openGraph: {
    title: "Referral Program | Capitol Shine",
    description: "Give $30, Get $30. Refer friends and save on home cleaning.",
  },
};

const referralFAQs = [
  {
    q: "Is there a limit to how many people I can refer?",
    a: "No! Refer as many friends as you'd like. There's no cap on referral credits.",
  },
  {
    q: "When does my credit apply?",
    a: "Credits are automatically applied to your next scheduled cleaning after your friend completes their first appointment.",
  },
  {
    q: "Can I combine referral credits?",
    a: "Yes — credits stack on future bookings. You can accumulate multiple $30 credits and use them on upcoming cleanings.",
  },
];

export default function ReferralsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-navy to-navy/95 py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Give $30, Get $30.
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Love your clean? Share Capitol Shine with a friend. You both save.
          </p>
        </div>
      </section>
      <HowItWorksReferral />
      <ReferralForm />
      <section className="py-16 bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-8">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={referralFAQs} />
        </div>
      </section>
    </>
  );
}
