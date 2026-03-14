import { ADD_ONS } from "@/lib/pricing-data";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";
import type { BookingState } from "./BookingWizard";

type Action =
  | { type: "SET_FIELD"; field: string; value: string | number }
  | { type: "TOGGLE_ADDON"; addon: string };

interface Props {
  state: BookingState;
  dispatch: React.Dispatch<Action>;
}

const homeTypes = ["Apartment/Condo", "House", "Townhouse"];
const bedroomOptions = [1, 2, 3, 4, 5];
const bathroomOptions = ["1", "1.5", "2", "2.5", "3", "3+"];

export default function HomeDetails({ state, dispatch }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-navy mb-6">Home Details</h2>

      {/* Home Type */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Home Type</label>
        <div className="flex flex-wrap gap-3">
          {homeTypes.map((type) => (
            <button
              key={type}
              onClick={() => dispatch({ type: "SET_FIELD", field: "homeType", value: type })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                state.homeType === type
                  ? "bg-navy text-white"
                  : "bg-gray-100 text-charcoal hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {state.errors.homeType && (
          <p className="mt-1 text-sm text-red-500">{state.errors.homeType}</p>
        )}
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Bedrooms</label>
          <div className="flex gap-2">
            {bedroomOptions.map((n) => (
              <button
                key={n}
                onClick={() => dispatch({ type: "SET_FIELD", field: "bedrooms", value: n })}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                  state.bedrooms === n
                    ? "bg-navy text-white"
                    : "bg-gray-100 text-charcoal hover:bg-gray-200"
                }`}
              >
                {n === 5 ? "5+" : n}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Bathrooms</label>
          <div className="flex flex-wrap gap-2">
            {bathroomOptions.map((n) => (
              <button
                key={n}
                onClick={() => dispatch({ type: "SET_FIELD", field: "bathrooms", value: n })}
                className={`px-3 h-10 rounded-lg text-sm font-medium transition-all ${
                  state.bathrooms === n
                    ? "bg-navy text-white"
                    : "bg-gray-100 text-charcoal hover:bg-gray-200"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sqft */}
      <div>
        <label htmlFor="sqft" className="block text-sm font-medium text-charcoal mb-2">
          Approximate Square Footage <span className="text-charcoal/40">(optional)</span>
        </label>
        <input
          id="sqft"
          type="text"
          value={state.sqft}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "sqft", value: e.target.value })}
          placeholder="e.g., 1200"
          className="w-full max-w-xs px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
        />
      </div>

      {/* Neighborhood */}
      <div>
        <label htmlFor="neighborhood" className="block text-sm font-medium text-charcoal mb-2">
          Neighborhood
        </label>
        <select
          id="neighborhood"
          value={state.neighborhood}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "neighborhood", value: e.target.value })}
          className="w-full max-w-xs px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-white"
        >
          <option value="">Select neighborhood</option>
          {NEIGHBORHOODS.map((n) => (
            <option key={n.name} value={n.name}>
              {n.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add-ons */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Add-Ons</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ADD_ONS.map((addon) => (
            <label
              key={addon.name}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                state.addOns.includes(addon.name)
                  ? "border-gold bg-gold/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                checked={state.addOns.includes(addon.name)}
                onChange={() => dispatch({ type: "TOGGLE_ADDON", addon: addon.name })}
                className="accent-gold w-4 h-4"
              />
              <span className="flex-1 text-sm">{addon.name}</span>
              <span className="text-sm font-semibold text-navy">
                +${addon.price}
                {addon.unit && <span className="text-xs font-normal text-charcoal/50"> {addon.unit}</span>}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
