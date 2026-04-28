const STEPS = [
  {
    num: "1",
    title: "Request Online",
    description:
      "Pick your service, home size, and preferred date. Takes 60 seconds — no payment required upfront.",
  },
  {
    num: "2",
    title: "We Confirm & Clean",
    description:
      "We reach out to confirm details before your appointment. Our background-checked team arrives on time, every time.",
  },
  {
    num: "3",
    title: "Pay After. Love It.",
    description:
      "We collect payment only after the job is done. Not satisfied? We re-clean within 24 hours — no questions, no cost.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-navy py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Simple process</p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-light tracking-tight leading-tight">
            How it works
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STEPS.map((step) => (
            <div key={step.num} className="text-center">
              <div className="w-11 h-11 rounded-full border border-white/20 bg-white/6 text-white font-display text-lg font-light flex items-center justify-center mx-auto mb-5">
                {step.num}
              </div>
              <h3 className="text-white font-semibold text-lg mb-3 tracking-tight">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
