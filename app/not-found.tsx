import Link from "next/link";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-off-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <p className="text-6xl font-bold text-gold mb-4">404</p>
          <h1 className="font-display text-3xl font-bold text-navy mb-4">
            Page not found
          </h1>
          <p className="text-charcoal/70 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-navy text-white text-sm font-medium hover:bg-navy/90 transition-colors"
            >
              Go home
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-navy text-navy text-sm font-medium hover:bg-navy hover:text-white transition-colors"
            >
              Book a cleaning
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
