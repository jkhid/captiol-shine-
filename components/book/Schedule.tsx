import Calendar from "@/components/ui/Calendar";
import type { BookingState } from "./BookingWizard";

interface Props {
  state: BookingState;
  dispatch: React.Dispatch<{ type: "SET_FIELD"; field: string; value: string }>;
}

const frequencies = [
  { value: "one-time", label: "One-time", discount: "" },
  { value: "weekly", label: "Weekly", discount: "20% off" },
  { value: "biweekly", label: "Biweekly", discount: "10% off" },
  { value: "monthly", label: "Monthly", discount: "5% off" },
];

const timeWindows = [
  { value: "morning", label: "Morning (8am–12pm)" },
  { value: "afternoon", label: "Afternoon (12pm–4pm)" },
  { value: "no-preference", label: "No Preference" },
];

export default function Schedule({ state, dispatch }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-navy mb-6">Schedule</h2>

      {/* Frequency */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Frequency</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {frequencies.map((f) => (
            <button
              key={f.value}
              onClick={() => dispatch({ type: "SET_FIELD", field: "frequency", value: f.value })}
              className={`p-3 rounded-lg text-sm font-medium transition-all text-center ${
                state.frequency === f.value
                  ? "bg-navy text-white"
                  : "bg-gray-100 text-charcoal hover:bg-gray-200"
              }`}
            >
              {f.label}
              {f.discount && (
                <span className={`block text-xs mt-0.5 ${
                  state.frequency === f.value ? "text-gold" : "text-cta-green"
                }`}>
                  {f.discount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">
          Preferred Date
        </label>
        <Calendar
          selected={state.date}
          onChange={(date) => dispatch({ type: "SET_FIELD", field: "date", value: date })}
          disablePast
        />
        {state.errors.date && (
          <p className="mt-2 text-sm text-red-500">{state.errors.date}</p>
        )}
      </div>

      {/* Time Window */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">
          Preferred Time Window
        </label>
        <div className="flex flex-wrap gap-3">
          {timeWindows.map((tw) => (
            <button
              key={tw.value}
              onClick={() => dispatch({ type: "SET_FIELD", field: "timeWindow", value: tw.value })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                state.timeWindow === tw.value
                  ? "bg-navy text-white"
                  : "bg-gray-100 text-charcoal hover:bg-gray-200"
              }`}
            >
              {tw.label}
            </button>
          ))}
        </div>
      </div>

      {/* Special Instructions */}
      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-charcoal mb-2">
          Special Instructions <span className="text-charcoal/40">(optional)</span>
        </label>
        <textarea
          id="instructions"
          value={state.instructions}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "instructions", value: e.target.value })}
          placeholder="Any special requests, entry instructions, pet info, etc."
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}
