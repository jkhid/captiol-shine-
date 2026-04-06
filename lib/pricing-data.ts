export type HomeSize = "apartment" | "home" | "large";

export const HOME_SIZE_LABELS: Record<HomeSize, string> = {
  apartment: "Apartment / Condo (1-2 BR)",
  home: "Home (3 BR / 2 BA)",
  large: "Large Home (4+ BR)",
};

export type ServiceTier = "standard_biweekly" | "standard_weekly" | "deep" | "moveinout";

export interface PricingTier {
  key: ServiceTier;
  name: string;
  subtitle?: string;
  prices: Record<HomeSize, number>;
  included: string[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    key: "standard_biweekly",
    name: "Standard Clean",
    subtitle: "Biweekly — 10% off",
    prices: { apartment: 134, home: 179, large: 251 },
    included: [
      "Dust all surfaces & furniture",
      "Vacuum & mop all floors",
      "Clean & sanitize bathrooms",
      "Clean & sanitize kitchen",
      "Empty trash cans & replace liners",
    ],
  },
  {
    key: "standard_weekly",
    name: "Standard Clean",
    subtitle: "Weekly — 20% off",
    prices: { apartment: 119, home: 159, large: 223 },
    included: [
      "Everything in biweekly Standard Clean",
      "Priority scheduling",
      "Same dedicated cleaner each visit",
      "Deepest recurring discount",
      "Flexible skip or reschedule",
    ],
  },
  {
    key: "deep",
    name: "Deep Clean",
    subtitle: "One-time",
    prices: { apartment: 249, home: 375, large: 499 },
    included: [
      "Everything in Standard Clean",
      "Inside oven & microwave",
      "Baseboards & door frames",
      "Light fixtures & ceiling fans",
      "Window sills & tracks",
    ],
  },
  {
    key: "moveinout",
    name: "Move-In / Move-Out",
    prices: { apartment: 225, home: 349, large: 499 },
    included: [
      "Everything in Deep Clean",
      "Inside all cabinets & drawers",
      "Inside refrigerator & freezer",
      "Interior windows",
      "Garage sweep",
    ],
  },
];

export interface AddOn {
  name: string;
  price: number;
  unit?: string;
}

export const ADD_ONS: AddOn[] = [
  { name: "Inside Oven Cleaning", price: 40 },
  { name: "Inside Refrigerator", price: 30 },
  { name: "Interior Windows", price: 8, unit: "per window" },
  { name: "Laundry (wash, dry, fold)", price: 35, unit: "per load" },
  { name: "Inside Cabinets", price: 40, unit: "per room" },
  { name: "Garage Sweep & Organize", price: 100 },
];

export interface AirbnbTier {
  name: string;
  price: number;
}

export const AIRBNB_PRICING: AirbnbTier[] = [
  { name: "Studio / 1 BR", price: 85 },
  { name: "2 BR", price: 120 },
  { name: "3+ BR", price: 170 },
];

export const AIRBNB_LINEN_ADDON = 30;

// ── Commercial Pricing ────────────────────────────────────────────────────────

export type OfficeSize = "small" | "medium" | "large";

export interface CommercialTier {
  key: OfficeSize;
  name: string;
  sqft: string;
  weeklyPrice: number;
  twiceWeeklyPrice: number;
}

export const COMMERCIAL_TIERS: CommercialTier[] = [
  { key: "small",  name: "Small Office",  sqft: "Under 1,500 sq ft",   weeklyPrice: 180, twiceWeeklyPrice: 160 },
  { key: "medium", name: "Medium Office", sqft: "1,500 – 3,000 sq ft", weeklyPrice: 320, twiceWeeklyPrice: 290 },
  { key: "large",  name: "Large Office",  sqft: "3,000 – 5,000 sq ft", weeklyPrice: 550, twiceWeeklyPrice: 500 },
];

export const COMMERCIAL_INCLUDED = [
  "Vacuum & mop all floors",
  "Dust desks, shelves & surfaces",
  "Sanitize restrooms (toilets, sinks, mirrors)",
  "Wipe down kitchen / break room surfaces",
  "Empty all trash & replace liners",
  "Clean interior glass & door handles",
];

export const COMMERCIAL_ADDONS = [
  { name: "Restroom deep clean", price: 50 },
  { name: "Kitchen / break room detail", price: 40 },
  { name: "Floor buffing & waxing", price: 150 },
  { name: "Window washing (exterior)", price: 8, unit: "per pane" },
];

// ── Construction Cleanup ──────────────────────────────────────────────────────

export const CONSTRUCTION_PHASES = [
  {
    name: "Rough Clean",
    timing: "During active construction",
    included: [
      "Remove large debris & trash",
      "Broom-sweep all floors",
      "Wipe down major surfaces",
      "Clean windows & screens (basic)",
    ],
  },
  {
    name: "Final Clean",
    timing: "After trades finish",
    included: [
      "Detailed clean of all surfaces & fixtures",
      "Inside cabinets, drawers & closets",
      "Clean all appliances inside & out",
      "Scrub tile, grout & bathrooms",
      "Wipe down all trim, baseboards & doors",
    ],
  },
  {
    name: "Touch-Up",
    timing: "Before owner walkthrough",
    included: [
      "Light dust of all surfaces",
      "Polish glass & mirrors",
      "Spot-clean walls & switches",
      "Final floor cleaning",
    ],
  },
];

// Base standard clean prices (no recurring discount)
export const STANDARD_BASE_PRICES: Record<HomeSize, number> = {
  apartment: 149,
  home: 199,
  large: 279,
};

// Returns the base price for the first clean (no recurring discount applied)
export function getFirstCleanBasePrice(service: string, bedrooms: number): number {
  let homeSize: HomeSize = "apartment";
  if (bedrooms >= 4) homeSize = "large";
  else if (bedrooms >= 3) homeSize = "home";

  switch (service) {
    case "standard":   return STANDARD_BASE_PRICES[homeSize];
    case "deep":       return PRICING_TIERS[2].prices[homeSize];
    case "moveinout":  return PRICING_TIERS[3].prices[homeSize];
    case "airbnb":
      if (bedrooms >= 3) return 170;
      if (bedrooms >= 2) return 120;
      return 85;
    default: return STANDARD_BASE_PRICES[homeSize];
  }
}

export function calcAddOnTotal(addOns: string[]): number {
  return addOns.reduce((sum, name) => {
    const addon = ADD_ONS.find((a) => a.name === name);
    return sum + (addon?.price ?? 0);
  }, 0);
}

// Helper to estimate price for the booking form
export function estimatePrice(
  service: string,
  bedrooms: number,
  frequency: string,
  addOns: string[]
): number {
  let homeSize: HomeSize = "apartment";
  if (bedrooms >= 4) homeSize = "large";
  else if (bedrooms >= 3) homeSize = "home";

  let base = 0;
  switch (service) {
    case "standard":
      if (frequency === "weekly") base = PRICING_TIERS[1].prices[homeSize];
      else if (frequency === "biweekly") base = PRICING_TIERS[0].prices[homeSize];
      else if (frequency === "monthly") base = Math.round(STANDARD_BASE_PRICES[homeSize] * 0.95);
      else base = STANDARD_BASE_PRICES[homeSize];
      break;
    case "deep":
      base = PRICING_TIERS[2].prices[homeSize];
      break;
    case "moveinout":
      base = PRICING_TIERS[3].prices[homeSize];
      break;
    case "airbnb":
      if (bedrooms >= 3) base = 170;
      else if (bedrooms >= 2) base = 120;
      else base = 85;
      break;
    default:
      base = PRICING_TIERS[0].prices[homeSize];
  }

  const addOnTotal = addOns.reduce((sum, name) => {
    const addon = ADD_ONS.find((a) => a.name === name);
    return sum + (addon?.price ?? 0);
  }, 0);

  return base + addOnTotal;
}
