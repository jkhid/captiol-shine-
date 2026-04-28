import { SectionIntro } from "@/components/public/WavePage";

const steps = [
  {
    number: "01",
    title: "Share your link",
    description:
      "Send your referral link to a friend, neighbor, or coworker. Texts, emails, group chats, condo Slack threads. Whatever works.",
  },
  {
    number: "02",
    title: "They book",
    description:
      "When they complete their first cleaning, your friend gets $30 off and your credit is automatically queued for the next visit.",
  },
  {
    number: "03",
    title: "You save",
    description:
      "Credits stack. Refer a few neighbors in the same building and your recurring clean starts paying for itself.",
  },
];

export default function HowItWorksReferral() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="How It Works"
          title={
            <>
              Three steps.
              <br />
              <em className="italic">No catch.</em>
            </>
          }
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-[22px] border border-navy/10 bg-white p-7 shadow-[0_24px_60px_-40px_rgba(23,36,63,0.4)]"
            >
              <p className="font-display text-6xl font-light leading-none tracking-tight text-gold">
                {step.number}
              </p>
              <h3 className="mt-5 font-display text-3xl font-light leading-none tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
