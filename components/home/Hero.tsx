import Link from "next/link";
import Button from "@/components/ui/Button";
import { Star, Shield, ThumbsUp, Tag, Phone, MessageSquare } from "lucide-react";
import EmailButton from "@/components/home/EmailButton";

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
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/pricing" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              See Our Pricing
            </Button>
            <Button href="/book" variant="gold">
              Book a Cleaning
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-white/60 text-sm mr-1">(703) 375-9132</span>
            <a
              href="tel:+17033759132"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium border border-white/25 text-white/85 hover:border-white hover:text-white transition-colors"
            >
              <Phone size={12} />
              Call
            </a>
            <a
              href="sms:+17033759132"
              className="hidden [@media(pointer:coarse)]:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium border border-white/25 text-white/85 hover:border-white hover:text-white transition-colors"
            >
              <MessageSquare size={12} />
              Text
            </a>
            <div className="[@media(pointer:coarse)]:hidden">
              <EmailButton />
            </div>
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

        {/* Promo card */}
        <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-52 text-center shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
              <Tag size={18} className="text-gold" />
            </div>
            <div className="font-display text-5xl font-bold text-navy leading-none">$30</div>
            <div className="text-xs font-semibold text-charcoal/40 uppercase tracking-widest mt-0.5">off</div>
            <div className="text-sm font-semibold text-navy mt-2">Your First Cleaning</div>
            <div className="mt-3 font-mono font-bold text-gold text-sm bg-gold/10 rounded-lg px-3 py-1.5 tracking-wider">
              FIRST30
            </div>
            <div className="text-xs text-charcoal/40 mt-2">Apply code at checkout</div>
            <Link
              href="/book?promo=FIRST30"
              className="mt-4 block text-xs font-semibold text-white bg-navy rounded-xl py-2.5 hover:bg-navy/90 transition-colors"
            >
              Claim Offer →
            </Link>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
}
