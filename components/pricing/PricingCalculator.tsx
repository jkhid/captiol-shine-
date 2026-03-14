"use client";

import { useState } from "react";
import { PRICING_TIERS, HOME_SIZE_LABELS, type HomeSize } from "@/lib/pricing-data";
import PricingCard from "./PricingCard";

const sizes: HomeSize[] = ["apartment", "home", "large"];

export default function PricingCalculator() {
  const [selected, setSelected] = useState<HomeSize>("home");

  return (
    <div>
      {/* Toggle buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelected(size)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              selected === size
                ? "bg-navy text-white shadow-md"
                : "bg-gray-100 text-charcoal hover:bg-gray-200"
            }`}
          >
            {HOME_SIZE_LABELS[size]}
          </button>
        ))}
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICING_TIERS.map((tier) => (
          <PricingCard key={tier.key} tier={tier} homeSize={selected} />
        ))}
      </div>
    </div>
  );
}
