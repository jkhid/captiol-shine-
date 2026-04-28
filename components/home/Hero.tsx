import Link from "next/link";
import { Star, Shield, Leaf, Check } from "lucide-react";
import HeroQuoteCard from "./HeroQuoteCard";

const TRUST_ITEMS = [
  { icon: Star,   text: "5.0 on Google",       fill: true },
  { icon: Check,  text: "Pay after we clean",   fill: false },
  { icon: Shield, text: "Licensed & Insured",   fill: false },
  { icon: Leaf,   text: "Eco-friendly products",fill: false },
];

export default function Hero() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

          {/* Left — text */}
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold mb-5">
              Arlington, VA
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-[68px] font-light text-ink leading-[0.96] tracking-tight">
              A cleaner place.<br />
              A lighter <em className="italic">week.</em>
            </h1>

            <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
              Arlington&apos;s trusted house cleaning service — transparent pricing,
              eco-friendly products, and a team that treats your home like their own.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-navy text-white font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-ink transition-colors"
              >
                Book Your Cleaning
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-white text-navy font-semibold text-sm px-6 py-3.5 rounded-xl border border-navy/20 hover:border-navy/40 transition-colors"
              >
                See Pricing
              </Link>
            </div>

            <p className="mt-4 text-sm text-muted">
              Questions?{" "}
              <a href="tel:+17033759132" className="font-semibold text-charcoal hover:text-navy transition-colors">
                (703) 375-9132
              </a>
            </p>

            {/* Trust strip */}
            <div className="mt-8 pt-6 border-t border-navy/10 flex flex-wrap gap-x-6 gap-y-2.5">
              {TRUST_ITEMS.map(({ icon: Icon, text, fill }) => (
                <span key={text} className="flex items-center gap-1.5 text-sm text-charcoal/70">
                  <Icon
                    size={14}
                    className={fill ? "text-gold fill-gold" : "text-gold"}
                  />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Right — quote card */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <HeroQuoteCard />
          </div>

        </div>
      </div>
    </section>
  );
}
