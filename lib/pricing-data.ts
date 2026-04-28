// ─── Capitol Shine Pricing v2 ────────────────────────────────────────────────
// Source of truth: public/Capitol_Shine_Pricing_v2.xlsx
// Standard one-time price = STANDARD_GRID[bedrooms][bathrooms]
// Deep / Move-In-Out = standard × multiplier
// Recurring frequencies apply a percentage discount to standard
// Sqft guardrail and heavy-duty surcharges add to the base.

export type Bedrooms  = 0 | 1 | 2 | 3 | 4 | 5;
export type Bathrooms = "1" | "1.5" | "2" | "2.5" | "3" | "3.5+";

export const BEDROOM_OPTIONS: Bedrooms[]  = [0, 1, 2, 3, 4, 5];
export const BATHROOM_OPTIONS: Bathrooms[] = ["1", "1.5", "2", "2.5", "3", "3.5+"];

export const BEDROOM_LABELS: Record<Bedrooms, string> = {
  0: "Studio",
  1: "1 Bedroom",
  2: "2 Bedrooms",
  3: "3 Bedrooms",
  4: "4 Bedrooms",
  5: "5+ Bedrooms",
};

// Bathrooms valid for a given bedroom count (matches the sheet's "—" cells).
export const VALID_BATHS: Record<Bedrooms, Bathrooms[]> = {
  0: ["1"],
  1: ["1", "1.5"],
  2: ["1", "1.5", "2"],
  3: ["1", "1.5", "2", "2.5"],
  4: ["1", "1.5", "2", "2.5", "3"],
  5: ["1", "1.5", "2", "2.5", "3", "3.5+"],
};

// Standard one-time clean — base prices
export const STANDARD_GRID: Record<Bedrooms, Partial<Record<Bathrooms, number>>> = {
  0: { "1": 150 },
  1: { "1": 165, "1.5": 180 },
  2: { "1": 195, "1.5": 210, "2": 225 },
  3: { "1": 235, "1.5": 250, "2": 265, "2.5": 280 },
  4: { "1": 285, "1.5": 300, "2": 315, "2.5": 330, "3": 345 },
  5: { "1": 345, "1.5": 360, "2": 375, "2.5": 390, "3": 405, "3.5+": 420 },
};

export type ServiceKey = "standard" | "deep" | "moveinout";

export const SERVICE_LABELS: Record<ServiceKey, string> = {
  standard:  "Standard Clean",
  deep:      "Deep Clean",
  moveinout: "Move-In / Move-Out",
};

export const SERVICE_MULTIPLIERS: Record<ServiceKey, number> = {
  standard:  1.0,
  deep:      1.6,
  moveinout: 2.0,
};

export type Frequency = "one-time" | "monthly" | "biweekly" | "weekly";

export const FREQUENCY_DISCOUNTS: Record<Frequency, number> = {
  "one-time": 0,
  monthly:    0.10,
  biweekly:   0.15,
  weekly:     0.20,
};

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  "one-time": "One-time",
  monthly:    "Monthly (10% off)",
  biweekly:   "Biweekly (15% off)",
  weekly:     "Weekly (20% off)",
};

// Sqft guardrail — typical max + surcharge tiers per bedroom count.
interface SqftGuardrail {
  typicalMax: number;
  tier1Max:   number;   // sqft up to here = +30 surcharge
  tier2Max:   number;   // sqft up to here = +55 surcharge
  // anything above tier2Max = +80 (or custom quote)
}

export const SQFT_GUARDRAIL: Record<Bedrooms, SqftGuardrail> = {
  0: { typicalMax: 600,  tier1Max: 1100, tier2Max: 1600 },
  1: { typicalMax: 900,  tier1Max: 1400, tier2Max: 1900 },
  2: { typicalMax: 1300, tier1Max: 1800, tier2Max: 2300 },
  3: { typicalMax: 2200, tier1Max: 2700, tier2Max: 3200 },
  4: { typicalMax: 3200, tier1Max: 3700, tier2Max: 4200 },
  5: { typicalMax: 4500, tier1Max: 5000, tier2Max: 5500 },
};

export const HEAVY_DUTY_SURCHARGE: Record<Bedrooms, number> = {
  0: 100, 1: 100, 2: 100, 3: 175, 4: 250, 5: 350,
};

// ─── Add-ons ─────────────────────────────────────────────────────────────────

export interface AddOn {
  name:  string;
  price: number;
  unit?: string;
}

export const ADD_ONS: AddOn[] = [
  { name: "Inside Oven",            price: 40 },
  { name: "Inside Refrigerator",    price: 35 },
  { name: "Interior Windows",       price: 8,   unit: "per window" },
  { name: "Wet Wipe Window Blinds", price: 10,  unit: "per window" },
  { name: "Inside Cabinets",        price: 60,  unit: "per kitchen" },
  { name: "Laundry & Folding",      price: 30,  unit: "per load" },
  { name: "Dishes",                 price: 25,  unit: "per load" },
  { name: "Garage Sweep & Organize", price: 100 },
];

// ─── Hourly ──────────────────────────────────────────────────────────────────

export const HOURLY_RATE = 50;     // $/hr per cleaner
export const HOURLY_MIN_HOURS = 2;
export const HOURLY_MIN_TOTAL = HOURLY_RATE * HOURLY_MIN_HOURS;

// ─── Airbnb / STR ────────────────────────────────────────────────────────────

export interface AirbnbTier {
  key:        "studio" | "1br" | "2br" | "3br";
  name:       string;
  turnover:   number;
  linenAddOn: number;
}

export const AIRBNB_PRICING: AirbnbTier[] = [
  { key: "studio", name: "Studio",       turnover: 95,  linenAddOn: 25 },
  { key: "1br",    name: "1 Bedroom",    turnover: 115, linenAddOn: 30 },
  { key: "2br",    name: "2 Bedrooms",   turnover: 145, linenAddOn: 35 },
  { key: "3br",    name: "3+ Bedrooms",  turnover: 195, linenAddOn: 45 },
];

// ─── Commercial (kept for internal reference; public page uses quote form) ───

export type OfficeSize = "small" | "medium" | "large";

export interface CommercialTier {
  key:              OfficeSize;
  name:             string;
  sqft:             string;
  weeklyPrice:      number;
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

// ─── Construction (quoted on-site) ───────────────────────────────────────────

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

// ─── Service inclusions (used by display + booking summary) ──────────────────

export const SERVICE_INCLUDED: Record<ServiceKey, string[]> = {
  standard: [
    "Dust all surfaces & furniture",
    "Vacuum & mop all floors",
    "Clean & sanitize bathrooms",
    "Clean & sanitize kitchen",
    "Empty trash cans & replace liners",
  ],
  deep: [
    "Everything in Standard Clean",
    "Inside oven & microwave",
    "Baseboards & door frames",
    "Light fixtures & ceiling fans",
    "Window sills & tracks",
  ],
  moveinout: [
    "Everything in Deep Clean",
    "Inside all cabinets & drawers",
    "Inside refrigerator & freezer",
    "Interior windows",
    "Garage sweep",
  ],
};

// ─── Calculation engine ──────────────────────────────────────────────────────

function clampBedrooms(n: number): Bedrooms {
  if (n <= 0) return 0;
  if (n >= 5) return 5;
  return n as Bedrooms;
}

function nearestValidBath(bedrooms: Bedrooms, bath: string): Bathrooms {
  const valid = VALID_BATHS[bedrooms];
  return (valid.includes(bath as Bathrooms) ? bath : valid[valid.length - 1]) as Bathrooms;
}

export function getStandardBase(bedrooms: number, bathrooms: string): number {
  const br = clampBedrooms(bedrooms);
  const ba = nearestValidBath(br, bathrooms);
  return STANDARD_GRID[br][ba] ?? STANDARD_GRID[br][VALID_BATHS[br][0]] ?? 0;
}

export function sqftSurcharge(bedrooms: number, sqftRaw: string | number | null | undefined): number {
  if (sqftRaw === null || sqftRaw === undefined || sqftRaw === "") return 0;
  const sqft = typeof sqftRaw === "number" ? sqftRaw : parseInt(String(sqftRaw).replace(/[^\d]/g, ""), 10);
  if (!Number.isFinite(sqft) || sqft <= 0) return 0;
  const g = SQFT_GUARDRAIL[clampBedrooms(bedrooms)];
  if (sqft <= g.typicalMax) return 0;
  if (sqft <= g.tier1Max)   return 30;
  if (sqft <= g.tier2Max)   return 55;
  return 80;
}

export function calcAddOnTotal(addOns: string[]): number {
  return addOns.reduce((sum, name) => {
    const a = ADD_ONS.find((x) => x.name === name);
    return sum + (a?.price ?? 0);
  }, 0);
}

export interface QuoteInputs {
  service:    ServiceKey;
  bedrooms:   number;
  bathrooms:  string;
  frequency:  Frequency;
  sqft?:      string | number | null;
  heavyDuty?: boolean;
  addOns?:    string[];
}

export interface QuoteBreakdown {
  base:              number;  // pre-multiplier standard base
  serviceMultiplier: number;
  serviceAdjusted:   number;  // base × multiplier
  frequencyDiscount: number;  // dollars off (recurring)
  recurringPrice:    number;  // serviceAdjusted − frequencyDiscount
  sqftSurcharge:     number;
  heavyDutySurcharge: number;
  addOnTotal:        number;
  total:             number;
}

export function quoteBreakdown(inp: QuoteInputs): QuoteBreakdown {
  const base = getStandardBase(inp.bedrooms, inp.bathrooms);
  const mult = SERVICE_MULTIPLIERS[inp.service];
  const serviceAdjusted = Math.round(base * mult);

  // Frequency discount only applies to standard recurring cleans.
  const discountPct = inp.service === "standard" ? FREQUENCY_DISCOUNTS[inp.frequency] : 0;
  const frequencyDiscount = Math.round(serviceAdjusted * discountPct);
  const recurringPrice    = serviceAdjusted - frequencyDiscount;

  const sqftS  = sqftSurcharge(inp.bedrooms, inp.sqft);
  const heavyD = inp.heavyDuty ? HEAVY_DUTY_SURCHARGE[clampBedrooms(inp.bedrooms)] : 0;
  const addOns = calcAddOnTotal(inp.addOns ?? []);

  return {
    base,
    serviceMultiplier: mult,
    serviceAdjusted,
    frequencyDiscount,
    recurringPrice,
    sqftSurcharge:      sqftS,
    heavyDutySurcharge: heavyD,
    addOnTotal:         addOns,
    total:              recurringPrice + sqftS + heavyD + addOns,
  };
}

// Backwards-compat: returns a single number total. Used by booking flow + API.
export function estimatePrice(
  service:   string,
  bedrooms:  number,
  frequency: string,
  addOns:    string[],
  bathrooms: string = "1",
  sqft:      string | null = null,
  heavyDuty: boolean = false,
): number {
  const svc: ServiceKey = (["standard", "deep", "moveinout"].includes(service) ? service : "standard") as ServiceKey;
  const freq: Frequency = (["one-time", "weekly", "biweekly", "monthly"].includes(frequency) ? frequency : "one-time") as Frequency;
  return quoteBreakdown({ service: svc, bedrooms, bathrooms, frequency: freq, sqft, heavyDuty, addOns }).total;
}

// First-clean price (no recurring discount) — used when a recurring promo applies.
export function getFirstCleanBasePrice(
  service:   string,
  bedrooms:  number,
  bathrooms: string = "1",
): number {
  const svc: ServiceKey = (["standard", "deep", "moveinout"].includes(service) ? service : "standard") as ServiceKey;
  return quoteBreakdown({ service: svc, bedrooms, bathrooms, frequency: "one-time" }).total;
}
