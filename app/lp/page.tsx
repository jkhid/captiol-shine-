import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone, Star, Shield, Leaf, Clock, Check,
  CalendarCheck, Sparkles, Home, Building2, HardHat, Briefcase, ArrowRight,
} from "lucide-react";
import BookOnlineButton from "@/components/lp/BookOnlineButton";
import CallButton from "@/components/lp/CallButton";
import PricingCalculator from "@/components/pricing/PricingCalculator";
import { FAQAccordion } from "@/components/pricing/FAQ";

export const metadata: Metadata = {
  title: "House Cleaning in Northern Virginia — From $119 | Capitol Shine",
  description:
    "5.0-rated house cleaning across Arlington, McLean, Alexandria & Northern Virginia. Flat-rate from $119. Pay only after we're done. 24-hour re-clean promise. Book in 60 seconds.",
  openGraph: {
    title: "House Cleaning in Northern Virginia — From $119 | Capitol Shine",
    description:
      "5.0-rated cleaning across Northern Virginia. Flat-rate from $119. Pay only after we're done. 24-hour re-clean promise.",
    url: "https://capitolshinecleaners.com/lp",
  },
  robots: { index: false },
};

const PHONE     = "+17033759132";
const PHONE_DISPLAY = "(703) 375-9132";
const SMS_URL   = `sms:${PHONE}?&body=Hi%20Capitol%20Shine!%20I%27d%20like%20a%20quote%20for%20a%20cleaning.`;
const BOOK_URL  = "/book?promo=FIRST30";

const TRUST_ITEMS = [
  { icon: Star,    label: "5.0 on Google" },
  { icon: Shield,  label: "Licensed & Insured" },
  { icon: Leaf,    label: "Eco-Friendly Products" },
  { icon: Clock,   label: "Pay Only After We're Done" },
];

const LP_FAQS = [
  {
    q: "How much will my cleaning actually cost?",
    a: "Use the estimator above for a starting price based on your home size. Final pricing is confirmed when you book — flat-rate, no surprises, no hourly billing. Most Arlington 2-bedroom apartments fall between $139-$179 for a standard clean.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "No. Most clients give us a key, lockbox code, or smart lock access. We'll confirm the entry method when you book.",
  },
  {
    q: "Are you licensed, bonded, and insured?",
    a: "Yes — fully licensed, bonded, and insured up to $2M in Virginia. We provide a certificate of insurance on request.",
  },
  {
    q: "What products do you use? Are they safe for kids and pets?",
    a: "We use EPA Safer Choice certified, eco-friendly products that are safe for children, pets, and the environment. If you prefer specific products, we'll use what you have on hand.",
  },
  {
    q: "What if I'm not happy with the clean?",
    a: "Our 24-Hour Re-Clean Promise: if anything isn't right, contact us within 24 hours and we'll come back and re-clean free — no questions, no pushback.",
  },
  {
    q: "How quickly can you come out?",
    a: "We often have same-week availability across Arlington, McLean, Alexandria, and Falls Church. Book online or call (703) 375-9132 and we'll confirm your slot within 30 minutes.",
  },
];

const STEPS = [
  {
    number: "1",
    title: "Book in 60 seconds",
    body: "Pick your service, home size, and date online — or just call us. No lengthy intake forms.",
  },
  {
    number: "2",
    title: "We show up, fully equipped",
    body: "Our team arrives on time with everything needed. You don't have to lift a finger.",
  },
  {
    number: "3",
    title: "Come home to spotless",
    body: "We follow up after every visit. If something isn't right, we make it right — guaranteed.",
  },
];

const SERVICES = [
  {
    icon: Home,
    name: "Residential Cleaning",
    blurb: "Standard, deep, and move-in/out cleans for apartments and homes across Arlington.",
    from: "116",
  },
  {
    icon: Building2,
    name: "Airbnb & Short-Term Rentals",
    blurb: "Same-day turnovers your guests will notice. Flat-rate pricing, no surprise fees.",
    from: "100",
  },
  {
    icon: Briefcase,
    name: "Commercial Cleaning",
    blurb: "Recurring cleaning for offices and retail spaces. Free walk-through before we start.",
    from: null,
  },
  {
    icon: HardHat,
    name: "Post-Construction Cleanup",
    blurb: "Rough clean, final clean, or touch-up before owner walkthrough. Quoted on-site.",
    from: null,
  },
];

const TESTIMONIALS = [
  {
    name: "Joshua Kwok",
    location: "Google Review",
    body: "They arrived right on time, were super professional and friendly, and left my house sparkling clean from top to bottom. Every surface, floor, and even the hard-to-reach spots were spotless. I've tried a few services before, but this one is by far the best.",
  },
  {
    name: "Eren Y.",
    location: "Google Review",
    body: "Hired Jay and Capitol Shine for a deep clean before we moved out. The kitchen and bathrooms looked brand new. Amazing communication, easy to book, and fair pricing. Really recommend their services!",
  },
  {
    name: "Dr Prop",
    location: "Google Review",
    body: "Capitol Shine handled my weekly cleaning in Arlington and took care of my move-out deep clean when I had to relocate. Great to work with and always made my place spotless!",
  },
];

const BEFORE_AFTER = [
  { room: "Kitchen",     before: "/before-after/Kitchen_Before.jpg",     after: "/before-after/Kitchen_After.jpg" },
  { room: "Bathroom",    before: "/before-after/Bathroom_Before.jpg",    after: "/before-after/Bathroom_After.jpg" },
  { room: "Living Room", before: "/before-after/Living_Room_Before.jpg", after: "/before-after/Living_Room_After.jpg" },
];

const AREAS = [
  "Arlington", "Clarendon", "Rosslyn", "Ballston", "Crystal City",
  "McLean", "Alexandria", "Falls Church", "Pentagon City", "Lyon Village",
];

const WHY_ITEMS = [
  { icon: Shield,       label: "Licensed & insured up to $2M" },
  { icon: Leaf,         label: "Eco-friendly, pet-safe products" },
  { icon: CalendarCheck,label: "Flexible scheduling, easy to reschedule" },
  { icon: Clock,        label: "No payment until after we clean" },
  { icon: Sparkles,     label: "Satisfaction guaranteed — we'll make it right" },
  { icon: Star,         label: "5.0 rating across all Google reviews" },
];

export default function LandingPage() {
  return (
    <>
      {/* ── Schema ─────────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Capitol Shine",
            telephone: PHONE,
            url: "https://capitolshinecleaners.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1805 Key Blvd",
              addressLocality: "Arlington",
              addressRegion: "VA",
              postalCode: "22201",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: "6",
            },
          }),
        }}
      />

      <div className="bg-off-white min-h-screen pb-20 md:pb-0">

        {/* ── Top bar ────────────────────────────────────────────────── */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Capitol Shine home">
              <Image src="/updated_logo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" priority />
              <span className="font-display text-lg font-bold text-navy">
                Capitol <span className="text-gold">Shine</span>
              </span>
            </Link>
            <CallButton
              phone={PHONE}
              iconSize={15}
              label={PHONE_DISPLAY}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors [&>svg]:text-gold"
            />
          </div>
        </header>

        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-navy to-navy/90 text-white py-20 md:py-28 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Arlington · McLean · Alexandria · Falls Church · & surrounding areas
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Spotless homes across<br className="hidden sm:block" /> Northern Virginia.
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto mb-10">
              Flat-rate cleaning from <span className="text-white font-semibold">$119</span>. 5.0 on Google, licensed & insured, same team every visit — and you pay only after we&apos;re done.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
              <CallButton
                phone={PHONE}
                label={`Call ${PHONE_DISPLAY}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gold hover:bg-gold/90 text-navy font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg"
              />
              <BookOnlineButton
                href={BOOK_URL}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 text-navy font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg"
              />
            </div>
            <p className="text-sm text-white/60 mb-12">
              Prefer texting?{" "}
              <a href={SMS_URL} className="text-gold hover:text-gold/80 underline underline-offset-2">
                Send us a quick message →
              </a>
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/70">
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5">
                  <Icon size={14} className="text-gold flex-shrink-0" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Social proof bar ───────────────────────────────────────── */}
        <div className="bg-white border-b border-gray-100 py-5 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-8 text-sm text-charcoal/70">
            <span className="flex items-center gap-2 font-semibold text-navy">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </span>
              5.0 on Google
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-cta-green flex-shrink-0" />
              No contracts required
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-cta-green flex-shrink-0" />
              Confirmation within 30 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-cta-green flex-shrink-0" />
              Same team every visit
            </span>
          </div>
        </div>

        {/* ── How it works ───────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy text-center mb-12">
              Simple from start to finish
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STEPS.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-navy text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-navy text-lg mb-2">{step.title}</h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Before & after ─────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy text-center mb-3">
              See the difference
            </h2>
            <p className="text-charcoal/60 text-center mb-10 max-w-xl mx-auto text-sm">
              Real results from a recent deep clean in Arlington.
            </p>
            <div className="space-y-10">
              {BEFORE_AFTER.map(({ room, before, after }) => (
                <div key={room}>
                  <p className="text-xs font-semibold text-charcoal/40 uppercase tracking-widest mb-3 text-center">
                    {room}
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="absolute top-3 left-3 bg-charcoal/70 text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10">
                        Before
                      </div>
                      <Image
                        src={before}
                        alt={`${room} before cleaning`}
                        width={600}
                        height={450}
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="absolute top-3 left-3 bg-cta-green text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10">
                        After
                      </div>
                      <Image
                        src={after}
                        alt={`${room} after cleaning`}
                        width={600}
                        height={450}
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Offer banner ───────────────────────────────────────────── */}
        <div className="bg-gold/10 border-y border-gold/30 py-8 px-4">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-1">Limited time offer</p>
              <p className="font-display text-2xl font-bold text-navy">$30 off for new customers</p>
              <p className="text-charcoal/60 text-sm mt-1">
                Use code <span className="font-mono font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">FIRST30</span> — mention it when you call or enter it at checkout.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <CallButton
                phone={PHONE}
                iconSize={15}
                label="Call to claim"
                className="flex items-center justify-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-navy/90 transition-colors text-sm"
              />
              <BookOnlineButton
                href={BOOK_URL}
                label="Book online"
                iconSize={15}
                className="flex items-center justify-center gap-2 bg-gold text-navy font-semibold px-6 py-3 rounded-xl hover:bg-gold/90 transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        {/* ── Services ───────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy text-center mb-2">
              Every type of clean, covered
            </h2>
            <p className="text-charcoal/60 text-center mb-10 max-w-xl mx-auto">
              From weekly home cleaning to post-construction site cleanup, we serve homeowners and businesses across Northern Virginia.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SERVICES.map(({ icon: Icon, name, blurb, from }) => (
                <div key={name} className="bg-off-white rounded-xl p-6 flex gap-4">
                  <span className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-navy" />
                  </span>
                  <div>
                    <div className="font-semibold text-navy mb-1">{name}</div>
                    <p className="text-sm text-charcoal/60 leading-relaxed mb-2">{blurb}</p>
                    {from && (
                      <p className="text-xs font-semibold text-cta-green">From ${from}/visit</p>
                    )}
                    {!from && (
                      <p className="text-xs font-semibold text-charcoal/40">Custom quote — free walk-through</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Capitol Shine ──────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy text-center mb-10">
              Why Northern Virginia homeowners choose us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {WHY_ITEMS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                  <Icon size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-charcoal/80">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-navy">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white text-center mb-10">
              What our clients say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">&ldquo;{t.body}&rdquo;</p>
                  <div className="text-xs text-white/40">
                    <p className="font-semibold text-white/60">{t.name}</p>
                    <p>{t.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing estimator ──────────────────────────────────────── */}
        <section className="py-16 px-4 bg-off-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">
                Instant estimate
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-3">
                See your price in 10 seconds
              </h2>
              <p className="text-charcoal/60 max-w-xl mx-auto text-sm md:text-base">
                Pick your home size below for a starting estimate. Your final flat-rate price is
                confirmed when you book — no hourly billing, no surprise fees.
              </p>
            </div>
            <PricingCalculator />
            <p className="text-center text-xs text-charcoal/50 mt-6">
              Estimates based on typical Northern Virginia homes. Final pricing confirmed at booking.
            </p>
          </div>
        </section>

        {/* ── 24-Hour Re-Clean Promise ──────────────────────────────── */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl p-8 md:p-10 text-center border border-gold/20">
              <div className="inline-flex items-center gap-2 bg-gold/15 text-gold text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                <Shield size={13} />
                Our Promise
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                The 24-Hour Re-Clean Promise
              </h2>
              <p className="text-white/75 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                If anything isn&apos;t right when you walk in, tell us within 24 hours and we&apos;ll
                come back and re-clean it — <span className="text-white font-semibold">free, no
                questions asked</span>. Simple as that.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-off-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy text-center mb-10">
              Questions before you book
            </h2>
            <FAQAccordion items={LP_FAQS} />
          </div>
        </section>

        {/* ── Service areas ──────────────────────────────────────────── */}
        <section className="py-12 px-4 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold text-charcoal/40 uppercase tracking-widest mb-4">
              Areas we serve
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {AREAS.map((area) => (
                <span key={area} className="text-sm text-charcoal/60 bg-gray-100 px-3 py-1.5 rounded-full">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-off-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
              Ready for a cleaner home?
            </h2>
            <p className="text-charcoal/60 mb-8 max-w-md mx-auto">
              Book online in 60 seconds or give us a call. We'll confirm your appointment within 30 minutes, and you won't pay a thing until after we clean.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CallButton
                phone={PHONE}
                label={`Call ${PHONE_DISPLAY}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-navy hover:bg-navy/90 text-white font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-md"
              />
              <BookOnlineButton
                href={BOOK_URL}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gold hover:bg-gold/90 text-navy font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-md"
              />
            </div>
            <p className="mt-5 text-xs text-charcoal/40">
              $30 off for new customers — mention it when you call or enter FIRST30 online · No contracts · Satisfaction guaranteed
            </p>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <footer className="bg-navy py-8 px-4 text-center">
          <p className="text-white/40 text-xs mb-2">
            © {new Date().getFullYear()} Capitol Home Services LLC · Arlington, VA ·{" "}
            <a href={`tel:${PHONE}`} className="hover:text-white/70 transition-colors">{PHONE_DISPLAY}</a>
            {" · "}
            <a href="mailto:hello@capitolshinecleaners.com" className="hover:text-white/70 transition-colors">
              hello@capitolshinecleaners.com
            </a>
          </p>
          <p className="text-white/25 text-xs">
            <Link href="/terms" className="hover:text-white/50 transition-colors">Terms of Service</Link>
            {" · "}
            <Link href="/" className="hover:text-white/50 transition-colors">Main Site</Link>
          </p>
        </footer>

        {/* ── Sticky mobile CTA ──────────────────────────────────────── */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-3 flex gap-3 shadow-xl">
          <CallButton
            phone={PHONE}
            iconSize={16}
            label="Call Now"
            className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-bold text-sm py-3.5 rounded-xl"
          />
          <BookOnlineButton
            href={BOOK_URL}
            className="flex-1 flex items-center justify-center gap-2 bg-gold text-navy font-bold text-sm py-3.5 rounded-xl"
            iconSize={16}
            label="Book Online"
          />
        </div>

      </div>
    </>
  );
}
