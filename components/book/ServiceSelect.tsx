import { SERVICE_DESCRIPTIONS } from "@/lib/constants";
import type { BookingState } from "./BookingWizard";

const services = [
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
      <h2 className="text-xl font-bold text-navy mb-6">Select Your Service</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((s) => (
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
      {state.errors.service && (
        <p className="mt-3 text-sm text-red-500">{state.errors.service}</p>
      )}
    </div>
  );
}
