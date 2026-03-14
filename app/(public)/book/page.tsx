import type { Metadata } from "next";
import BookingWizard from "@/components/book/BookingWizard";

export const metadata: Metadata = {
  title: "Book Now",
  description:
    "Book your home cleaning in 60 seconds. Pick your details and we'll confirm within 30 minutes.",
  openGraph: {
    title: "Book a Cleaning | Capitol Shine",
    description: "Book your Arlington home cleaning in 60 seconds.",
  },
};

export default function BookPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingWizard />
      </div>
    </section>
  );
}
