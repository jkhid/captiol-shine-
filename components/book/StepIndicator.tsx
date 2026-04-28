interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="mb-10">
      <div className="relative h-1.5 bg-navy/10 rounded-full mb-4">
        <div
          className="absolute h-full bg-gold rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-xs">
        {labels.map((label, i) => (
          <span
            key={label}
            className={`font-medium transition-colors ${
              i + 1 < currentStep
                ? "text-muted"
                : i + 1 === currentStep
                ? "text-navy font-semibold"
                : "text-navy/30"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
