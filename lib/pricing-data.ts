// ─── Capitol Shine Pricing — V2 (hours × hourly rate) ────────────────────────
// Source of truth: public/capitol_shine_pricing_engine.js
// Residential pricing is sqft band → base hours → ± bath/bed adjustments →
// × condition factor (one-time services only) × hourly rate.
//
// Airbnb, commercial, and post-construction stay on their own pricing tracks
// (AIRBNB_PRICING, COMMERCIAL_TIERS, CONSTRUCTION_PHASES) below.

export type Bedrooms  = 0 | 1 | 2 | 3 | 4 | 5;
export type Bathrooms =
  | "1" | "1.5" | "2" | "2.5" | "3" | "3.5"
  | "4" | "4.5" | "5" | "5.5+";

export const BEDROOM_OPTIONS: Bedrooms[]  = [0, 1, 2, 3, 4, 5];
export const BATHROOM_OPTIONS: Bathrooms[] = [
  "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5+",
];

export const BEDROOM_LABELS: Record<Bedrooms, string> = {
  0: "Studio",
  1: "1 Bedroom",
  2: "2 Bedrooms",
  3: "3 Bedrooms",
  4: "4 Bedrooms",
  5: "5+ Bedrooms",
};

// Bathrooms valid for a given bedroom count. Upper bound extends with
// bedroom count so 5BR homes can pick up to 5.5+ baths (common in NoVA).
export const VALID_BATHS: Record<Bedrooms, Bathrooms[]> = {
  0: ["1"],
  1: ["1", "1.5"],
  2: ["1", "1.5", "2", "2.5"],
  3: ["1", "1.5", "2", "2.5", "3", "3.5"],
  4: ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5"],
  5: ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5+"],
};

// Legacy "service" key (still used by the booking API + DB).
export type ServiceKey = "standard" | "deep" | "moveinout";

export const SERVICE_LABELS: Record<ServiceKey, string> = {
  standard:  "Standard Clean",
  deep:      "Deep Clean",
  moveinout: "Move-In / Move-Out",
};

// Legacy frequency key (still used by the booking API + DB).
export type Frequency = "one-time" | "monthly" | "biweekly" | "weekly";

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  "one-time": "One-time",
  monthly:    "Monthly",
  biweekly:   "Biweekly",
  weekly:     "Weekly",
};

// ─── V2 service taxonomy ─────────────────────────────────────────────────────
// V2 collapses (service × frequency) into 6 flat service types.
// Use ServiceTypeV2 in UI; map to legacy { service, frequency } before
// hitting the API/DB via mapV2ToLegacy().

export type ServiceTypeV2 =
  | "weekly" | "biweekly" | "monthly"
  | "oneTime" | "deep" | "moveOut";

interface ServiceMeta {
  label: string;
  recurring: boolean;
  legacyService: ServiceKey;
  legacyFrequency: Frequency;
}

export const SERVICE_TYPES_V2: Record<ServiceTypeV2, ServiceMeta> = {
  weekly:   { label: "Weekly",             recurring: true,  legacyService: "standard",  legacyFrequency: "weekly"   },
  biweekly: { label: "Biweekly",           recurring: true,  legacyService: "standard",  legacyFrequency: "biweekly" },
  monthly:  { label: "Monthly",            recurring: true,  legacyService: "standard",  legacyFrequency: "monthly"  },
  oneTime:  { label: "One-Time Standard",  recurring: false, legacyService: "standard",  legacyFrequency: "one-time" },
  deep:     { label: "Deep Clean",         recurring: false, legacyService: "deep",      legacyFrequency: "one-time" },
  moveOut:  { label: "Move-In / Move-Out", recurring: false, legacyService: "moveinout", legacyFrequency: "one-time" },
};

export const SERVICE_TYPE_V2_KEYS: ServiceTypeV2[] = [
  "weekly", "biweekly", "monthly", "oneTime", "deep", "moveOut",
];

// ─── Condition (one-time services only) ──────────────────────────────────────

export type Condition = "light" | "normal" | "heavy";

export const CONDITIONS: Record<Condition, { label: string; description: string; factor: number }> = {
  light:  { label: "Light",  description: "Minimal clutter, well-maintained",       factor: 0.90 },
  normal: { label: "Normal", description: "Average everyday condition",             factor: 1.00 },
  heavy:  { label: "Heavy",  description: "Pets, kids, not cleaned recently",        factor: 1.15 },
};

// ─── Sqft slider config ──────────────────────────────────────────────────────

export const SQFT_SLIDER = {
  min: 500,
  max: 5000,
  step: 100,
  default: 1200,
};

// ─── Sqft → base hours bands ─────────────────────────────────────────────────

interface SqftBand {
  low: number;
  high: number;
  label: string;
  baseHrs: Record<ServiceTypeV2, number>;
}

export const SQ_FT_BANDS: SqftBand[] = [
  { low: 0,    high: 1000, label: "Under 1,000 sqft",   baseHrs: { weekly: 1.75, biweekly: 2.0,  monthly: 2.5,  oneTime: 3.5,  deep: 5.0,  moveOut: 7.0  } },
  { low: 1001, high: 1500, label: "1,001–1,500 sqft",   baseHrs: { weekly: 2.25, biweekly: 2.5,  monthly: 3.0,  oneTime: 4.0,  deep: 5.5,  moveOut: 8.0  } },
  { low: 1501, high: 2000, label: "1,501–2,000 sqft",   baseHrs: { weekly: 2.5,  biweekly: 2.75, monthly: 3.25, oneTime: 4.5,  deep: 6.5,  moveOut: 9.0  } },
  { low: 2001, high: 2500, label: "2,001–2,500 sqft",   baseHrs: { weekly: 2.75, biweekly: 3.0,  monthly: 3.5,  oneTime: 5.0,  deep: 7.0,  moveOut: 10.0 } },
  { low: 2501, high: 3000, label: "2,501–3,000 sqft",   baseHrs: { weekly: 3.25, biweekly: 3.5,  monthly: 4.0,  oneTime: 5.5,  deep: 7.5,  moveOut: 11.0 } },
  { low: 3001, high: 3500, label: "3,001–3,500 sqft",   baseHrs: { weekly: 3.5,  biweekly: 3.75, monthly: 4.25, oneTime: 6.0,  deep: 8.0,  moveOut: 12.0 } },
  { low: 3501, high: 4000, label: "3,501–4,000 sqft",   baseHrs: { weekly: 4.0,  biweekly: 4.25, monthly: 5.0,  oneTime: 7.0,  deep: 9.0,  moveOut: 13.0 } },
  { low: 4001, high: 5000, label: "4,001–5,000 sqft",   baseHrs: { weekly: 4.75, biweekly: 5.0,  monthly: 5.75, oneTime: 8.0,  deep: 10.5, moveOut: 15.0 } },
  { low: 5001, high: 6000, label: "5,001–6,000 sqft",   baseHrs: { weekly: 5.75, biweekly: 6.0,  monthly: 6.75, oneTime: 9.0,  deep: 12.0, moveOut: 17.0 } },
];

export function getSqftBand(sqft: number): SqftBand {
  return SQ_FT_BANDS.find((b) => sqft >= b.low && sqft <= b.high)
    ?? SQ_FT_BANDS[SQ_FT_BANDS.length - 1];
}

// Bathroom hour adjustment (baseline: 2 full baths).
function bathAdjustmentHrs(fullBaths: number, halfBaths: number): number {
  const diff = fullBaths - 2;
  let adj = 0;
  if (diff > 0) adj += diff * (25 / 60);   // +25 min per extra full bath
  if (diff < 0) adj += diff * (15 / 60);   // −15 min per fewer full bath
  adj += halfBaths * (15 / 60);             // +15 min per half bath
  return adj;
}

// Expected bedrooms for a given sqft.
function expectedBedrooms(sqft: number): number {
  if (sqft <= 1000) return 1;
  if (sqft <= 1500) return 2;
  if (sqft <= 2200) return 3;
  if (sqft <= 3000) return 3;
  if (sqft <= 4000) return 4;
  return 5;
}

// Bedroom hour adjustment.
function bedroomAdjustmentHrs(bedrooms: number, sqft: number): number {
  const diff = bedrooms - expectedBedrooms(sqft);
  if (diff > 0) return diff * (10 / 60);
  if (diff < 0) return diff * (8 / 60);
  return 0;
}

// Map combined bathroom string ("2.5") → { fullBaths, halfBaths }.
// "3.5+" is kept as a legacy alias so old links / cached URLs still resolve.
export function splitBathrooms(b: string): { fullBaths: number; halfBaths: number } {
  switch (b) {
    case "1":    return { fullBaths: 1, halfBaths: 0 };
    case "1.5":  return { fullBaths: 1, halfBaths: 1 };
    case "2":    return { fullBaths: 2, halfBaths: 0 };
    case "2.5":  return { fullBaths: 2, halfBaths: 1 };
    case "3":    return { fullBaths: 3, halfBaths: 0 };
    case "3.5":  return { fullBaths: 3, halfBaths: 1 };
    case "3.5+": return { fullBaths: 3, halfBaths: 1 };
    case "4":    return { fullBaths: 4, halfBaths: 0 };
    case "4.5":  return { fullBaths: 4, halfBaths: 1 };
    case "5":    return { fullBaths: 5, halfBaths: 0 };
    case "5.5+": return { fullBaths: 5, halfBaths: 1 };
    default:     return { fullBaths: 2, halfBaths: 0 };
  }
}

// ─── Hourly rate ─────────────────────────────────────────────────────────────

export const HOURLY_RATE = 68; // $/hr
export const HOURLY_MIN_HOURS = 2;
export const HOURLY_MIN_TOTAL = HOURLY_RATE * HOURLY_MIN_HOURS;

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

export function calcAddOnTotal(addOns: string[]): number {
  return addOns.reduce((sum, name) => {
    const a = ADD_ONS.find((x) => x.name === name);
    return sum + (a?.price ?? 0);
  }, 0);
}

// ─── Core V2 calculation ─────────────────────────────────────────────────────

export interface PriceInputsV2 {
  sqft: number;
  bedrooms: number;
  bathroom: string;            // combined ("1.5", "2", "2.5"…)
  serviceType: ServiceTypeV2;
  condition?: Condition;       // ignored for recurring types
}

export interface PriceResultV2 {
  serviceType: ServiceTypeV2;
  label: string;
  hours: number;
  price: number;
  low: number;
  high: number;
}

export function calculateServicePrice(p: PriceInputsV2): PriceResultV2 {
  const band = getSqftBand(p.sqft);
  const baseHrs = band.baseHrs[p.serviceType];
  if (baseHrs === undefined) throw new Error(`Unknown service type: ${p.serviceType}`);

  const { fullBaths, halfBaths } = splitBathrooms(p.bathroom);
  const rawHrs =
    baseHrs +
    bathAdjustmentHrs(fullBaths, halfBaths) +
    bedroomAdjustmentHrs(p.bedrooms, p.sqft);

  const isRecurring = SERVICE_TYPES_V2[p.serviceType].recurring;
  const condFactor  = isRecurring ? 1.0 : (CONDITIONS[p.condition ?? "normal"]?.factor ?? 1.0);

  const adjustedHrs = Math.max(rawHrs * condFactor, 1); // minimum 1 hour
  const price = adjustedHrs * HOURLY_RATE;

  return {
    serviceType: p.serviceType,
    label:       SERVICE_TYPES_V2[p.serviceType].label,
    hours:       Math.round(adjustedHrs * 100) / 100,
    price:       Math.round(price),
    low:         Math.round(price * 0.92),
    high:        Math.round(price * 1.08),
  };
}

export function calculateAllPrices(
  p: Omit<PriceInputsV2, "serviceType">,
): PriceResultV2[] {
  return SERVICE_TYPE_V2_KEYS.map((serviceType) =>
    calculateServicePrice({ ...p, serviceType }),
  );
}

// Legacy → V2 mapping.
export function mapLegacyToV2(service: string, frequency: string): ServiceTypeV2 {
  if (service === "deep")      return "deep";
  if (service === "moveinout") return "moveOut";
  // service === "standard" (or unknown)
  if (frequency === "weekly")   return "weekly";
  if (frequency === "biweekly") return "biweekly";
  if (frequency === "monthly")  return "monthly";
  return "oneTime";
}

// V2 → legacy mapping (for DB writes / email templates).
export function mapV2ToLegacy(t: ServiceTypeV2): { service: ServiceKey; frequency: Frequency } {
  const meta = SERVICE_TYPES_V2[t];
  return { service: meta.legacyService, frequency: meta.legacyFrequency };
}

function parseSqftInput(s: string | number | null | undefined): number {
  if (s === null || s === undefined || s === "") return SQFT_SLIDER.default;
  const n = typeof s === "number" ? s : parseInt(String(s).replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : SQFT_SLIDER.default;
}

// ─── Legacy-shape exports (route through V2) ─────────────────────────────────

export interface QuoteInputs {
  service:    ServiceKey;
  bedrooms:   number;
  bathrooms:  string;
  frequency:  Frequency;
  sqft?:      string | number | null;
  heavyDuty?: boolean;
  addOns?:    string[];
  condition?: Condition;
}

export interface QuoteBreakdown {
  base:               number;
  serviceMultiplier:  number;
  serviceAdjusted:    number;
  frequencyDiscount:  number;
  recurringPrice:     number;
  sqftSurcharge:      number;
  heavyDutySurcharge: number;
  addOnTotal:         number;
  total:              number;
  // V2 enrichments:
  hours:              number;
  serviceType:        ServiceTypeV2;
}

export function quoteBreakdown(inp: QuoteInputs): QuoteBreakdown {
  const serviceType = mapLegacyToV2(inp.service, inp.frequency);
  const sqft        = parseSqftInput(inp.sqft);
  const condition: Condition = inp.condition ?? (inp.heavyDuty ? "heavy" : "normal");

  const result = calculateServicePrice({
    sqft,
    bedrooms: inp.bedrooms,
    bathroom: inp.bathrooms,
    serviceType,
    condition,
  });

  const addOnTotal = calcAddOnTotal(inp.addOns ?? []);

  return {
    base:               result.price,
    serviceMultiplier:  1.0,
    serviceAdjusted:    result.price,
    frequencyDiscount:  0,
    recurringPrice:     result.price,
    sqftSurcharge:      0,
    heavyDutySurcharge: 0,
    addOnTotal,
    total:              result.price + addOnTotal,
    hours:              result.hours,
    serviceType,
  };
}

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

export function getFirstCleanBasePrice(
  service:   string,
  bedrooms:  number,
  bathrooms: string = "1",
  sqft:      string | number | null = null,
): number {
  const svc: ServiceKey = (["standard", "deep", "moveinout"].includes(service) ? service : "standard") as ServiceKey;
  return quoteBreakdown({ service: svc, bedrooms, bathrooms, frequency: "one-time", sqft }).total;
}

// ─── Airbnb / STR (unchanged) ────────────────────────────────────────────────

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
