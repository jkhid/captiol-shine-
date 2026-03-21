import Button from "@/components/ui/Button";
import { Star, Shield, ThumbsUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy via-navy to-navy/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
        <div className="max-w-3xl flex-1">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            A cleaner place.
            <br />
            A lighter week.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
            Arlington&apos;s trusted cleaning service — transparent pricing, eco-friendly products,
            and a team that treats your home like their own.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/pricing" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              See Our Pricing
            </Button>
            <Button href="/book" variant="gold">
              Book a Cleaning
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-gold fill-gold" /> 5.0 on Google
            </span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-gold" /> Licensed & Insured
            </span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span className="flex items-center gap-1.5">
              <ThumbsUp size={14} className="text-gold" /> Satisfaction Guaranteed
            </span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              No payment until after we clean
            </span>
          </div>
        </div>

        {/* Insurance badge */}
        <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
          <div className="relative w-52 h-52 rounded-full border-2 border-gold/40 flex flex-col items-center justify-center text-center p-6 bg-white/5 backdrop-blur-sm">
            <Shield size={32} className="text-gold mb-2" />
            <p className="text-white font-bold text-lg leading-tight">Licensed &amp; Insured</p>
            <p className="text-gold font-semibold text-sm mt-1">Up to $2M</p>
            <p className="text-white/60 text-xs mt-2">General Liability</p>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
}
