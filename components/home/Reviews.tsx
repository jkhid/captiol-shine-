import { CUSTOMER_REVIEWS, getInitials } from "@/lib/reviews";

const REVIEWS = CUSTOMER_REVIEWS.slice(0, 3);

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-gold fill-gold" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Reviews</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink font-light tracking-tight leading-tight">
              What our customers say
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-2xl border border-navy/10 px-5 py-4 self-start sm:self-auto">
            <div className="relative w-7 h-7 rounded-full flex-shrink-0"
              style={{
                background: "conic-gradient(from 90deg, #4285F4 0 25%, #34A853 0 50%, #FBBC05 0 75%, #EA4335 0)",
              }}
            >
              <div className="absolute inset-[4px] bg-white rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#4285F4]" style={{ fontFamily: "Arial, sans-serif" }}>G</span>
              </div>
            </div>
            <div>
              <p className="font-display text-2xl text-ink font-semibold leading-none tracking-tight">5.0</p>
              <Stars count={5} />
              <p className="text-xs text-muted mt-0.5">on Google</p>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-white rounded-2xl border border-navy/8 p-6 flex flex-col gap-4">
              <Stars count={r.rating} />
              <p className="text-charcoal text-sm leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-navy/6">
                <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {getInitials(r.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{r.name}</p>
                  <p className="text-xs text-muted">{r.serviceLabel} · {r.source}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
