import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Star, Shield, Leaf, Clock, Check,
  CalendarCheck, Sparkles, Home, Building2, HardHat, Briefcase,
} from "lucide-react";
import BookOnlineButton from "@/components/lp/BookOnlineButton";
import CallButton from "@/components/lp/CallButton";
import SaveOfferButton from "@/components/lp/SaveOfferButton";
import PricingCalculator from "@/components/pricing/PricingCalculator";
import { FAQAccordion } from "@/components/pricing/FAQ";
import { CUSTOMER_REVIEWS } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "House Cleaning in Northern Virginia — From $120 Weekly | Capitol Shine",
  description:
    "5.0-rated house cleaning across Arlington, McLean, Alexandria & Northern Virginia. Flat-rate recurring cleaning from $120 weekly and one-time cleans from $150. Pay only after we're done. Book in 60 seconds.",
  openGraph: {
    title: "House Cleaning in Northern Virginia — From $120 Weekly | Capitol Shine",
    description:
      "5.0-rated cleaning across Northern Virginia. Flat-rate recurring cleaning from $120 weekly and one-time cleans from $150.",
    url: "https://capitolshinecleaners.com/lp",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Capitol Shine — House Cleaning in Northern Virginia" }],
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
    q: "Are you licensed and insured?",
    a: "Yes — fully licensed and insured up to $2M in Virginia. We provide a certificate of insurance on request.",
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
    number: "01",
    title: "Book in 60 seconds",
    body: "Pick your service, home size, and date online — or just call us. No lengthy intake forms.",
  },
  {
    number: "02",
    title: "We show up, fully equipped",
    body: "Our team arrives on time with everything needed. You don't have to lift a finger.",
  },
  {
    number: "03",
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

const TESTIMONIALS = [CUSTOMER_REVIEWS[0], CUSTOMER_REVIEWS[1], CUSTOMER_REVIEWS[3]];

const SHOWCASE = [
  { room: "Kitchen",  src: "/marketing_photos/originals_edited/kitchen_galley_view.jpg",  alt: "Bright galley kitchen after a Capitol Shine clean" },
  { room: "Bathroom", src: "/marketing_photos/originals_edited/bath_upper_full_room.jpg", alt: "Spotless full bathroom with polished fixtures" },
  { room: "Bedroom",  src: "/marketing_photos/originals_edited/bedroom_empty_blue.jpg",   alt: "Fresh bedroom ready for guests" },
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
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: "6",
            },
          }),
        }}
      />

      <div className="bg-paper min-h-screen pb-20 md:pb-0">

        {/* ── Top bar ────────────────────────────────────────────────── */}
        <header className="bg-paper/92 backdrop-blur-md border-b border-navy/10 sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Capitol Shine home">
              <Image src="/logo-128.png" alt="" width={128} height={90} className="h-10 w-10 object-contain" priority />
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
        <section className="bg-paper py-20 md:py-28 px-4 border-b border-navy/8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-5">
              Arlington · McLean · Alexandria · Falls Church · & surrounding areas
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[68px] font-light text-ink leading-[0.96] tracking-tight">
              Spotless homes<br className="hidden sm:block" />
              across <em className="italic">Northern Virginia.</em>
            </h1>
            <p className="mt-7 text-muted text-lg leading-relaxed max-w-xl mx-auto">
              Flat-rate recurring cleaning from <span className="text-ink font-semibold">$120 weekly</span>,
              with one-time cleans from $150. 5.0 on Google, licensed & insured, same team every visit —
              and you pay only after we&apos;re done.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <CallButton
                phone={PHONE}
                label={`Call ${PHONE_DISPLAY}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-navy hover:bg-ink text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
              />
              <BookOnlineButton
                href={BOOK_URL}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gold hover:bg-gold/90 text-ink font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
              />
            </div>
            <p className="mt-4 text-sm text-muted">
              Prefer texting?{" "}
              <a href={SMS_URL} className="font-semibold text-charcoal hover:text-navy transition-colors">
                Send us a quick message →
              </a>
            </p>

            <div className="mt-10 pt-7 border-t border-navy/10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-charcoal/70">
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
        <div className="bg-cream border-b border-navy/8 py-5 px-4">
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
              <Check size={14} className="text-green flex-shrink-0" />
              No contracts required
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-green flex-shrink-0" />
              Confirmation within 30 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-green flex-shrink-0" />
              Same team every visit
            </span>
          </div>
        </div>

        {/* ── How it works ───────────────────────────────────────────── */}
        <section className="bg-paper py-20 md:py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">How it works</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-tight">
                Simple from<br /><em className="italic">start to finish.</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {STEPS.map((step) => (
                <div key={step.number} className="text-center">
                  <span className="font-display text-sm text-gold font-light tracking-wider mb-4 block">{step.number}</span>
                  <h3 className="font-display text-xl text-ink font-light tracking-tight mb-3">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Offer banner ───────────────────────────────────────────── */}
        <div className="bg-gold/10 border-y border-gold/30 py-10 px-4">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-1">Limited time offer</p>
              <p className="font-display text-2xl md:text-3xl text-ink font-light tracking-tight">
                $30 off <em className="italic">for new customers.</em>
              </p>
              <p className="text-muted text-sm mt-2">
                Use code <span className="font-mono font-bold text-gold bg-gold/15 px-2 py-0.5 rounded">FIRST30</span> — mention it when you call or enter it at checkout.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <CallButton
                phone={PHONE}
                iconSize={15}
                label="Call to claim"
                className="flex items-center justify-center gap-2 bg-navy text-white font-semibold px-5 py-3 rounded-xl hover:bg-ink transition-colors text-sm"
              />
              <BookOnlineButton
                href={BOOK_URL}
                label="Book online"
                iconSize={15}
                className="flex items-center justify-center gap-2 bg-gold text-ink font-semibold px-5 py-3 rounded-xl hover:bg-gold/90 transition-colors text-sm"
              />
              <SaveOfferButton
                source="lp-offer-banner"
                className="flex items-center justify-center gap-2 bg-white text-navy font-semibold px-5 py-3 rounded-xl border border-navy/15 hover:border-navy/30 transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        {/* ── Recent work ─────────────────────────────────────────────── */}
        <section className="bg-cream py-20 md:py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Our work</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-tight">
                Recent cleans,<br /><em className="italic">unedited.</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {SHOWCASE.map(({ room, src, alt }) => (
                <div key={room} className="relative overflow-hidden rounded-xl aspect-[3/2] bg-paper">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-ink/75 text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10">
                    {room}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ───────────────────────────────────────────────── */}
        <section className="bg-paper py-20 md:py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Services</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-tight mb-4">
                Every type of clean,<br /><em className="italic">covered.</em>
              </h2>
              <p className="text-muted max-w-xl mx-auto text-base">
                From weekly home cleaning to post-construction site cleanup, we serve homeowners and businesses across Northern Virginia.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SERVICES.map(({ icon: Icon, name, blurb, from }) => (
                <div key={name} className="bg-cream rounded-xl p-6 flex gap-4">
                  <span className="w-10 h-10 rounded-lg bg-navy/6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-navy" />
                  </span>
                  <div>
                    <div className="font-display text-lg text-ink font-semibold mb-1 tracking-tight">{name}</div>
                    <p className="text-sm text-muted leading-relaxed mb-2">{blurb}</p>
                    {from && (
                      <p className="text-xs font-semibold text-green">From ${from}/visit</p>
                    )}
                    {!from && (
                      <p className="text-xs font-semibold text-muted">Custom quote — free walk-through</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Capitol Shine ──────────────────────────────────────── */}
        <section className="bg-cream py-20 md:py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Why us</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-tight">
                Why Northern Virginia<br /><em className="italic">chooses Capitol Shine.</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {WHY_ITEMS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-3 bg-paper rounded-xl p-5 border border-navy/8">
                  <Icon size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-charcoal/80">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────────────────── */}
        <section className="bg-ink py-20 md:py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Reviews</p>
              <h2 className="font-display text-4xl md:text-5xl text-white font-light tracking-tight leading-tight">
                What our clients<br /><em className="italic">say.</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="text-xs text-white/40">
                    <p className="font-semibold text-white/70">{t.name}</p>
                    <p>{t.serviceLabel} · {t.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing estimator ──────────────────────────────────────── */}
        <section className="bg-paper py-20 md:py-24 px-4 border-y border-navy/8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
                Instant estimate
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-tight mb-4">
                See your price<br /><em className="italic">in 10 seconds.</em>
              </h2>
              <p className="text-muted max-w-xl mx-auto text-base">
                Pick your home size below for a starting estimate. Your final flat-rate price is
                confirmed when you book — no hourly billing, no surprise fees.
              </p>
            </div>
            <PricingCalculator />
            <p className="text-center text-xs text-muted mt-6">
              Estimates based on typical Northern Virginia homes. Final pricing confirmed at booking.
            </p>
          </div>
        </section>

        {/* ── 24-Hour Re-Clean Promise ──────────────────────────────── */}
        <section className="bg-paper py-16 md:py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-ink rounded-2xl p-10 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 bg-gold/15 text-gold text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                <Shield size={13} />
                Our Promise
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-white font-light tracking-tight leading-tight mb-4">
                The 24-hour<br /><em className="italic">re-clean promise.</em>
              </h2>
              <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                If anything isn&apos;t right when you walk in, tell us within 24 hours and we&apos;ll
                come back and re-clean it — <span className="text-white font-semibold">free, no
                questions asked</span>. Simple as that.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section className="bg-cream py-20 md:py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-tight">
                Questions<br /><em className="italic">before you book.</em>
              </h2>
            </div>
            <FAQAccordion items={LP_FAQS} />
          </div>
        </section>

        {/* ── Service areas ──────────────────────────────────────────── */}
        <section className="bg-paper py-14 px-4 border-y border-navy/8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-5">
              Areas we serve
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {AREAS.map((area) => (
                <span key={area} className="text-sm text-charcoal/70 bg-cream border border-navy/8 px-3 py-1.5 rounded-full">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────────────────── */}
        <section className="bg-paper py-24 md:py-28 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-tight mb-5">
              Ready for<br /><em className="italic">a cleaner home?</em>
            </h2>
            <p className="text-muted mb-9 max-w-md mx-auto text-base">
              Book online in 60 seconds or give us a call. We&apos;ll confirm your appointment within 30 minutes, and you won&apos;t pay a thing until after we clean.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <CallButton
                phone={PHONE}
                label={`Call ${PHONE_DISPLAY}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-navy hover:bg-ink text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
              />
              <BookOnlineButton
                href={BOOK_URL}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gold hover:bg-gold/90 text-ink font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
              />
            </div>
            <p className="mt-6 text-xs text-muted">
              $30 off for new customers — mention it when you call or enter FIRST30 online · No contracts · Satisfaction guaranteed
            </p>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <footer className="bg-ink py-10 px-4 text-center">
          <p className="text-white/55 text-xs mb-2">
            © {new Date().getFullYear()} Capitol Home Services LLC · Arlington, VA ·{" "}
            <a href={`tel:${PHONE}`} className="hover:text-white/80 transition-colors">{PHONE_DISPLAY}</a>
            {" · "}
            <a href="mailto:hello@capitolshinecleaners.com" className="hover:text-white/80 transition-colors">
              hello@capitolshinecleaners.com
            </a>
          </p>
          <p className="text-white/35 text-xs">
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            {" · "}
            <Link href="/service-agreement" className="hover:text-white/60 transition-colors">Service Agreement</Link>
            {" · "}
            <Link href="/" className="hover:text-white/60 transition-colors">Main Site</Link>
          </p>
        </footer>

        {/* ── Sticky mobile CTA ──────────────────────────────────────── */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-md border-t border-navy/10 p-3 flex gap-3">
          <CallButton
            phone={PHONE}
            iconSize={16}
            label="Call Now"
            className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-semibold text-sm py-3.5 rounded-xl"
          />
          <BookOnlineButton
            href={BOOK_URL}
            className="flex-1 flex items-center justify-center gap-2 bg-gold text-ink font-semibold text-sm py-3.5 rounded-xl"
            iconSize={16}
            label="Book Online"
          />
        </div>

      </div>
    </>
  );
}
