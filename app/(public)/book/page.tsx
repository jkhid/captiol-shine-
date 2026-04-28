import type { Metadata } from "next";
import Link from "next/link";
import BookingWizard from "@/components/book/BookingWizard";

export const metadata: Metadata = {
  title: "Book a Cleaning — Arlington, VA | Capitol Shine",
  description:
    "Book your Arlington house cleaning in 60 seconds. Transparent pricing, no payment until after we clean. We confirm your appointment within 30 minutes.",
  openGraph: {
    title: "Book a Cleaning | Capitol Shine",
    description: "Book your Arlington home cleaning in 60 seconds. We confirm within 30 minutes.",
    url: "https://capitolshinecleaners.com/book",
  },
  alternates: { canonical: "https://capitolshinecleaners.com/book" },
};

const bookingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "House Cleaning — Book Online",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://capitolshinecleaners.com",
    name: "Capitol Shine",
  },
  areaServed: { "@type": "City", name: "Arlington, VA" },
  url: "https://capitolshinecleaners.com/book",
  description:
    "Book residential house cleaning in Arlington, VA online. Standard, deep, and move-in/out cleans. No payment until after service.",
};

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookingSchema) }}
      />

      {/* Page header */}
      <section className="bg-paper border-b border-navy/8 py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-xs text-muted font-medium">
              <li><Link href="/" className="hover:text-navy transition-colors">Home</Link></li>
              <li className="text-navy/30">/</li>
              <li className="text-charcoal">Book</li>
            </ol>
          </nav>
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Arlington, VA</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-none">
            Book your cleaning<br />
            <em className="italic">in 60 seconds.</em>
          </h1>
          <p className="mt-4 text-muted text-base leading-relaxed max-w-lg">
            Pick your details and we&apos;ll confirm your appointment within 30 minutes.
            No payment until after we clean.
          </p>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-10 md:py-14 bg-paper">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingWizard />
        </div>
      </section>
    </>
  );
}
