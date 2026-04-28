import { ADD_ONS } from "@/lib/pricing-data";

export default function AddOns() {
  return (
    <section className="bg-cream py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <h2 className="font-display text-3xl md:text-4xl text-ink font-light tracking-tight">
            Add-on services
          </h2>
          <p className="text-muted mt-2">Select any add-ons during booking — priced per visit.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ADD_ONS.map((addon) => (
            <div
              key={addon.name}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-white border border-navy/8"
            >
              <span className="text-sm font-medium text-charcoal">{addon.name}</span>
              <span className="text-sm font-semibold text-navy ml-4 flex-shrink-0">
                +${addon.price}
                {addon.unit && (
                  <span className="text-xs font-normal text-muted ml-1">{addon.unit}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
