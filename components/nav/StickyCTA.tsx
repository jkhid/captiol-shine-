import Link from "next/link";

export default function StickyCTA() {
  return (
    <div className="md:hidden fixed left-3 right-3 bottom-3 z-50 bg-navy text-white rounded-2xl px-4 py-3 shadow-2xl shadow-black/30 flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-semibold leading-tight">Book a Cleaning</p>
        <p className="text-xs text-gold-2 mt-0.5">Save $30 on your first clean</p>
      </div>
      <Link
        href="/book"
        className="flex-shrink-0 bg-gold text-ink text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gold-2 transition-colors whitespace-nowrap"
      >
        Book Now
      </Link>
    </div>
  );
}
