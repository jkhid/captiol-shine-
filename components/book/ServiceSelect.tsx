import { SERVICE_DESCRIPTIONS } from "@/lib/constants";
import type { BookingState } from "./BookingWizard";

const propertyTypes = [
  {
    key: "residential",
    name: "Residential",
    description: "Houses, apartments, condos & townhomes",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
      </svg>
    ),
  },
  {
    key: "commercial",
    name: "Commercial",
    description: "Offices, retail spaces & businesses",
    badge: "Get a quote",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    key: "postconstruction",
    name: "Post-Construction",
    description: "New builds & renovation cleanups",
    badge: "Get a quote",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
];

const residentialServices = [
  { key: "standard", ...SERVICE_DESCRIPTIONS.standard, startPrice: "$119" },
  { key: "deep", ...SERVICE_DESCRIPTIONS.deep, startPrice: "$249" },
  { key: "moveinout", ...SERVICE_DESCRIPTIONS.moveinout, startPrice: "$225" },
  { key: "airbnb", ...SERVICE_DESCRIPTIONS.airbnb, startPrice: "$85" },
];

interface Props {
  state: BookingState;
  dispatch: React.Dispatch<{ type: "SET_FIELD"; field: string; value: string }>;
}

export default function ServiceSelect({ state, dispatch }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-6">What type of property?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {propertyTypes.map((pt) => (
          <button
            key={pt.key}
            onClick={() => dispatch({ type: "SET_FIELD", field: "propertyType", value: pt.key })}
            className={`text-left p-5 rounded-xl border-2 transition-all ${
              state.propertyType === pt.key
                ? "border-gold bg-gold/5 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className={`mb-3 ${state.propertyType === pt.key ? "text-gold" : "text-charcoal/40"}`}>
              {pt.icon}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-navy">{pt.name}</h3>
              {pt.badge && (
                <span className="text-xs font-medium text-gold/80 bg-gold/10 px-2 py-0.5 rounded-full">
                  {pt.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-charcoal/60 mt-1">{pt.description}</p>
          </button>
        ))}
      </div>

      {state.propertyType === "residential" && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-4">What kind of clean?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {residentialServices.map((s) => (
              <button
                key={s.key}
                onClick={() => dispatch({ type: "SET_FIELD", field: "service", value: s.key })}
                className={`text-left p-5 rounded-xl border-2 transition-all ${
                  state.service === s.key
                    ? "border-gold bg-gold/5 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-navy">{s.name}</h3>
                  <span className="text-sm font-semibold text-gold">from {s.startPrice}</span>
                </div>
                <p className="text-sm text-charcoal/60 mt-1">{s.short}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {state.errors.service && (
        <p className="mt-3 text-sm text-red-500">{state.errors.service}</p>
      )}
    </div>
  );
}
