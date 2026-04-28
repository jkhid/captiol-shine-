import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="bg-ink py-20 md:py-28 text-center relative overflow-hidden">
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(700px 400px at 50% 110%, rgba(199,154,58,.14), transparent 60%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-5">Get started today</p>

        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-tight leading-none mb-5">
          Ready for a<br />
          <em className="italic text-gold-2">spotless</em> home?
        </h2>

        <p className="text-white/55 text-lg max-w-md mx-auto mb-8 leading-relaxed">
          New residential customers save $30 on their first clean.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-gold text-ink font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-gold-2 transition-colors"
          >
            Book Your Cleaning
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-transparent text-white font-semibold text-sm px-7 py-3.5 rounded-xl border border-white/25 hover:border-white/50 transition-colors"
          >
            See Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
