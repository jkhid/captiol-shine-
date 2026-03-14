interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="mb-10">
      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 rounded-full mb-4">
        <div
          className="absolute h-full bg-gold rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      {/* Step labels */}
      <div className="flex justify-between text-xs sm:text-sm">
        {labels.map((label, i) => (
          <span
            key={label}
            className={`${
              i + 1 <= currentStep ? "text-navy font-semibold" : "text-charcoal/40"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
