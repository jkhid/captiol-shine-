export type HomeSize = "studio" | "apartment" | "home" | "large";

export const HOME_SIZE_LABELS: Record<HomeSize, string> = {
  studio:    "1 Bedroom",
  apartment: "2 Bedrooms",
  home:      "3 Bedrooms",
  large:     "4+ Bedrooms",
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
    prices: { studio: 130, apartment: 161, home: 202, large: 260 },
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
    prices: { studio: 116, apartment: 143, home: 180, large: 231 },
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
    prices: { studio: 250, apartment: 300, home: 420, large: 550 },
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
    prices: { studio: 250, apartment: 300, home: 420, large: 550 },
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
  { name: "Studio / 1 BR", price: 100 },
  { name: "2 BR", price: 140 },
  { name: "3+ BR", price: 190 },
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
  studio:    145,
  apartment: 179,
  home:      225,
  large:     289,
};

function bedroomsToHomeSize(bedrooms: number): HomeSize {
  if (bedrooms >= 4) return "large";
  if (bedrooms >= 3) return "home";
  if (bedrooms >= 2) return "apartment";
  return "studio";
}

// Returns the base price for the first clean (no recurring discount applied)
export function getFirstCleanBasePrice(service: string, bedrooms: number): number {
  const homeSize = bedroomsToHomeSize(bedrooms);

  switch (service) {
    case "standard":   return STANDARD_BASE_PRICES[homeSize];
    case "deep":       return PRICING_TIERS[2].prices[homeSize];
    case "moveinout":  return PRICING_TIERS[3].prices[homeSize];
    case "airbnb":
      if (bedrooms >= 3) return 190;
      if (bedrooms >= 2) return 140;
      return 100;
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
  const homeSize = bedroomsToHomeSize(bedrooms);

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
      if (bedrooms >= 3) base = 190;
      else if (bedrooms >= 2) base = 140;
      else base = 100;
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
