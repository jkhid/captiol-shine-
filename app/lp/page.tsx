import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone, Star, Shield, Leaf, Clock, Check,
  CalendarCheck, Sparkles, Home, Building2, HardHat, Briefcase, ArrowRight,
} from "lucide-react";
import BookOnlineButton from "@/components/lp/BookOnlineButton";
import CallButton from "@/components/lp/CallButton";

export const metadata: Metadata = {
  title: "Professional House Cleaning in Arlington, VA — Capitol Shine",
  description:
    "Arlington's top-rated cleaning service. Transparent pricing, eco-friendly products, licensed & insured. Book online in 60 seconds or call (703) 375-9132. $30 off your first clean.",
  openGraph: {
    title: "Professional House Cleaning in Arlington, VA — Capitol Shine",
    description:
      "Transparent pricing, eco-friendly products, licensed & insured. Book online in 60 seconds or call (703) 375-9132.",
    url: "https://capitolshinecleaners.com/lp",
  },
  robots: { index: false },
};

const PHONE     = "+17033759132";
const PHONE_DISPLAY = "(703) 375-9132";
const BOOK_URL  = "/book?promo=FIRST30";

const TRUST_ITEMS = [
  { icon: Star,    label: "5.0 on Google" },
  { icon: Shield,  label: "Licensed & Insured" },
  { icon: Leaf,    label: "Eco-Friendly Products" },
  { icon: Clock,   label: "No Payment Until After We Clean" },
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
    name: "Jennifer M.",
    location: "Clarendon, Arlington",
    body: "I've tried a few cleaning services over the years. Capitol Shine is the only one I've stuck with. They're consistent, easy to communicate with, and they actually clean everything — not just the obvious stuff.",
  },
  {
    name: "Marcus T.",
    location: "Rosslyn, Arlington",
    body: "Booked a move-out clean before handing back my keys. Got my full security deposit back. Worth every penny and then some.",
  },
  {
    name: "Priya S.",
    location: "Crystal City, Arlington",
    body: "Good value for the quality. My apartment looks noticeably better after each visit, not just tidier. Reliable team, no surprises on pricing.",
  },
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
              reviewCount: "47",
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
              Serving Arlington & Northern Virginia
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              A spotless home.<br className="hidden sm:block" /> No hassle. Guaranteed.
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto mb-10">
              Arlington's trusted cleaning service — transparent pricing, eco-friendly products, and a team that treats your home like their own.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
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
              Why Arlington homeowners choose us
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
