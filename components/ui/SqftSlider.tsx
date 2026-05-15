"use client";

import { SQFT_SLIDER } from "@/lib/pricing-data";

interface Props {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
  compact?: boolean;
}

function formatSqft(n: number, max: number): string {
  if (n >= max) return `${n.toLocaleString()}+`;
  return n.toLocaleString();
}

export default function SqftSlider({
  value,
  onChange,
  min = SQFT_SLIDER.min,
  max = SQFT_SLIDER.max,
  step = SQFT_SLIDER.step,
  label = "Square footage",
  className = "",
  compact = false,
}: Props) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between mb-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
          {label}
        </label>
        <span
          className={
            compact
              ? "font-display text-sm font-semibold tracking-tight text-ink tabular-nums"
              : "font-display text-base font-semibold tracking-tight text-ink tabular-nums"
          }
        >
          {formatSqft(value, max)} sqft
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        aria-label={label}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-navy/10
                   focus:outline-none focus:ring-2 focus:ring-navy/20
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-gold
                   [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                   [&::-webkit-slider-thumb]:shadow-md
                   [&::-webkit-slider-thumb]:transition-transform
                   [&::-webkit-slider-thumb]:hover:scale-110
                   [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
                   [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gold
                   [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white
                   [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        style={{
          background: `linear-gradient(to right, #c79a3a 0%, #c79a3a ${pct}%, rgba(23,36,63,0.10) ${pct}%, rgba(23,36,63,0.10) 100%)`,
        }}
      />
      <div className="flex justify-between mt-1.5 text-[10.5px] text-muted/80 font-medium tabular-nums">
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}+</span>
      </div>
    </div>
  );
}
