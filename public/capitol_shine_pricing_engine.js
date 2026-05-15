/**
 * ============================================================
 * CAPITOL SHINE — PRICING ENGINE
 * ============================================================
 * 
 * Pure pricing logic for Capitol Shine cleaning services.
 * No UI framework dependencies — just functions and data.
 * 
 * Feed this file to Claude Code with your existing calculator
 * component and ask it to wire the inputs/outputs together.
 * 
 * HOW IT WORKS:
 * 1. Square footage determines a base hour estimate per service type
 * 2. Bathroom count adjusts hours (baseline: 2 full baths)
 * 3. Bedroom count adjusts hours (based on what's expected for the sqft)
 * 4. Condition multiplier applies to one-time/deep/move-out only
 *    (recurring cleans ignore condition — you maintain the baseline)
 * 5. Adjusted hours × hourly rate = price
 * 6. ±8% range shown for variability
 * 
 * TO CALIBRATE: As you time real jobs, update the baseHrs values
 * in SQ_FT_BANDS. That's the single source of truth.
 * 
 * ============================================================
 */

// ---- CONFIGURATION ----

const HOURLY_RATE = 688; // $/hr — change this to adjust all prices

// Base hours by square footage band (assumes 2 full bath baseline)
// Each band has estimated solo-cleaner hours per service type
const SQ_FT_BANDS = [
  {
    low: 0, high: 1000,
    label: "Under 1,000 sqft",
    baseHrs: { weekly: 1.75, biweekly: 2.0, monthly: 2.5, oneTime: 3.5, deep: 5.0, moveOut: 7.0 }
  },
  {
    low: 1001, high: 1500,
    label: "1,001–1,500 sqft",
    baseHrs: { weekly: 2.25, biweekly: 2.5, monthly: 3.0, oneTime: 4.0, deep: 5.5, moveOut: 8.0 }
  },
  {
    low: 1501, high: 2000,
    label: "1,501–2,000 sqft",
    baseHrs: { weekly: 2.5, biweekly: 2.75, monthly: 3.25, oneTime: 4.5, deep: 6.5, moveOut: 9.0 }
  },
  {
    low: 2001, high: 2500,
    label: "2,001–2,500 sqft",
    baseHrs: { weekly: 2.75, biweekly: 3.0, monthly: 3.5, oneTime: 5.0, deep: 7.0, moveOut: 10.0 }
  },
  {
    low: 2501, high: 3000,
    label: "2,501–3,000 sqft",
    baseHrs: { weekly: 3.25, biweekly: 3.5, monthly: 4.0, oneTime: 5.5, deep: 7.5, moveOut: 11.0 }
  },
  {
    low: 3001, high: 3500,
    label: "3,001–3,500 sqft",
    baseHrs: { weekly: 3.5, biweekly: 3.75, monthly: 4.25, oneTime: 6.0, deep: 8.0, moveOut: 12.0 }
  },
  {
    low: 3501, high: 4000,
    label: "3,501–4,000 sqft",
    baseHrs: { weekly: 4.0, biweekly: 4.25, monthly: 5.0, oneTime: 7.0, deep: 9.0, moveOut: 13.0 }
  },
  {
    low: 4001, high: 5000,
    label: "4,001–5,000 sqft",
    baseHrs: { weekly: 4.75, biweekly: 5.0, monthly: 5.75, oneTime: 8.0, deep: 10.5, moveOut: 15.0 }
  },
  {
    low: 5001, high: 6000,
    label: "5,001–6,000 sqft",
    baseHrs: { weekly: 5.75, biweekly: 6.0, monthly: 6.75, oneTime: 9.0, deep: 12.0, moveOut: 17.0 }
  },
];

// Service type definitions
const SERVICE_TYPES = {
  weekly:  { label: "Weekly",              recurring: true  },
  biweekly:{ label: "Biweekly",           recurring: true  },
  monthly: { label: "Monthly",             recurring: true  },
  oneTime: { label: "One-Time Standard",   recurring: false },
  deep:    { label: "Deep Clean",          recurring: false },
  moveOut: { label: "Move-In / Move-Out",  recurring: false },
};

// Condition multipliers — only applied to non-recurring services
const CONDITIONS = {
  light:  { label: "Light (minimal clutter, well-maintained)", factor: 0.90 },
  normal: { label: "Normal",                                   factor: 1.00 },
  heavy:  { label: "Heavy (pets, kids, not cleaned recently)",  factor: 1.15 },
};

// Add-on services
const ADD_ONS = [
  { id: "oven",     label: "Inside Oven",                    price: 40,  perUnit: false },
  { id: "fridge",   label: "Inside Refrigerator",            price: 30,  perUnit: false },
  { id: "windows",  label: "Interior Windows (per window)",  price: 8,   perUnit: true  },
  { id: "laundry",  label: "Laundry (per load)",             price: 35,  perUnit: true  },
  { id: "cabinets", label: "Inside Cabinets (per room)",     price: 40,  perUnit: true  },
  { id: "garage",   label: "Garage Sweep & Organize",        price: 100, perUnit: false },
];


// ---- CORE PRICING FUNCTIONS ----

/**
 * Find the sq ft band for a given square footage.
 * Returns the band object, or the largest band if sqft exceeds all ranges.
 */
function getSqftBand(sqft) {
  return SQ_FT_BANDS.find(b => sqft >= b.low && sqft <= b.high)
    || SQ_FT_BANDS[SQ_FT_BANDS.length - 1];
}

/**
 * Bathroom hour adjustment.
 * Baseline: 2 full baths.
 * Each full bath above 2: +25 min
 * Each full bath below 2: -15 min
 * Each half bath: +15 min
 */
function getBathAdjustment(fullBaths, halfBaths) {
  const diff = fullBaths - 2;
  let adj = 0;
  if (diff > 0) adj += diff * (25 / 60);   // +0.417 hr per extra full bath
  if (diff < 0) adj += diff * (15 / 60);   // -0.250 hr per fewer full bath
  adj += halfBaths * (15 / 60);              // +0.250 hr per half bath
  return adj;
}

/**
 * Expected bedroom count for a given sqft range.
 * Used to determine if a home has "extra" bedrooms for its size.
 */
function getExpectedBedrooms(sqft) {
  if (sqft <= 1000) return 1;
  if (sqft <= 1500) return 2;
  if (sqft <= 2200) return 3;
  if (sqft <= 3000) return 3;
  if (sqft <= 4000) return 4;
  return 5;
}

/**
 * Bedroom hour adjustment.
 * Each bedroom above expected: +10 min
 * Each bedroom below expected: -8 min
 */
function getBedroomAdjustment(bedrooms, sqft) {
  const expected = getExpectedBedrooms(sqft);
  const diff = bedrooms - expected;
  if (diff > 0) return diff * (10 / 60);    // +0.167 hr per extra bedroom
  if (diff < 0) return diff * (8 / 60);     // -0.133 hr per fewer bedroom
  return 0;
}

/**
 * Calculate price for a single service type.
 * 
 * @param {Object} params
 * @param {number} params.sqft          - Square footage of home
 * @param {number} params.bedrooms      - Number of bedrooms
 * @param {number} params.fullBaths     - Number of full bathrooms
 * @param {number} params.halfBaths     - Number of half bathrooms
 * @param {string} params.serviceType   - Key from SERVICE_TYPES (e.g. "biweekly", "deep")
 * @param {string} params.condition     - Key from CONDITIONS ("light", "normal", "heavy")
 * @param {number} [params.hourlyRate]  - Override hourly rate (defaults to HOURLY_RATE)
 * 
 * @returns {Object} { serviceType, label, hours, price, low, high }
 */
function calculateServicePrice({
  sqft,
  bedrooms,
  fullBaths,
  halfBaths,
  serviceType,
  condition = "normal",
  hourlyRate = HOURLY_RATE,
}) {
  const band = getSqftBand(sqft);
  const baseHrs = band.baseHrs[serviceType];

  if (baseHrs === undefined) {
    throw new Error(`Unknown service type: ${serviceType}`);
  }

  const bathAdj = getBathAdjustment(fullBaths, halfBaths);
  const brAdj = getBedroomAdjustment(bedrooms, sqft);
  const rawHrs = baseHrs + bathAdj + brAdj;

  // Condition only applies to non-recurring services
  const isRecurring = SERVICE_TYPES[serviceType]?.recurring ?? false;
  const condFactor = isRecurring ? 1.0 : (CONDITIONS[condition]?.factor ?? 1.0);

  const adjustedHrs = Math.max(rawHrs * condFactor, 1); // minimum 1 hour
  const price = adjustedHrs * hourlyRate;

  return {
    serviceType,
    label: SERVICE_TYPES[serviceType].label,
    hours: Math.round(adjustedHrs * 100) / 100,
    price: Math.round(price),
    low: Math.round(price * 0.92),
    high: Math.round(price * 1.08),
  };
}

/**
 * Calculate prices for ALL service types at once.
 * Returns an array of price objects, one per service type.
 * 
 * @param {Object} params - Same as calculateServicePrice minus serviceType
 * @returns {Array} Array of { serviceType, label, hours, price, low, high }
 */
function calculateAllPrices({
  sqft,
  bedrooms,
  fullBaths,
  halfBaths,
  condition = "normal",
  hourlyRate = HOURLY_RATE,
}) {
  return Object.keys(SERVICE_TYPES).map(serviceType =>
    calculateServicePrice({
      sqft, bedrooms, fullBaths, halfBaths,
      serviceType, condition, hourlyRate,
    })
  );
}

/**
 * Calculate add-on total.
 * 
 * @param {Object} selections - e.g. { oven: 1, windows: 6, laundry: 2 }
 * @returns {number} Total add-on cost
 */
function calculateAddOns(selections = {}) {
  let total = 0;
  ADD_ONS.forEach(addon => {
    const qty = selections[addon.id];
    if (qty && qty > 0) {
      total += addon.price * qty;
    }
  });
  return total;
}


// ---- USAGE EXAMPLES ----

/*
// Example 1: Quick quote for a specific service
const biweeklyPrice = calculateServicePrice({
  sqft: 1400,
  bedrooms: 4,
  fullBaths: 2,
  halfBaths: 1,
  serviceType: "biweekly",
  condition: "normal",
});
// => { serviceType: "biweekly", label: "Biweekly", hours: 3.17, price: 206, low: 189, high: 222 }


// Example 2: Full quote with all service types
const allPrices = calculateAllPrices({
  sqft: 1400,
  bedrooms: 4,
  fullBaths: 2,
  halfBaths: 1,
  condition: "normal",
});
// => Array of 6 objects, one per service type


// Example 3: With add-ons
const addOnTotal = calculateAddOns({ oven: 1, windows: 8 });
// => 104  ($40 oven + $8 × 8 windows)
// Add to any service price: allPrices[1].price + addOnTotal


// Example 4: Override hourly rate
const premiumQuote = calculateServicePrice({
  sqft: 2000,
  bedrooms: 3,
  fullBaths: 2,
  halfBaths: 0,
  serviceType: "deep",
  condition: "heavy",
  hourlyRate: 70,
});
*/


// ---- EXPORTS ----
// Uncomment the export style that matches your project:

// ES Modules (Next.js, Vite, modern React):
export {
  HOURLY_RATE,
  SQ_FT_BANDS,
  SERVICE_TYPES,
  CONDITIONS,
  ADD_ONS,
  getSqftBand,
  getBathAdjustment,
  getBedroomAdjustment,
  getExpectedBedrooms,
  calculateServicePrice,
  calculateAllPrices,
  calculateAddOns,
};

// CommonJS (older Node.js, if needed — uncomment and comment out the above):
// module.exports = {
//   HOURLY_RATE,
//   SQ_FT_BANDS,
//   SERVICE_TYPES,
//   CONDITIONS,
//   ADD_ONS,
//   getSqftBand,
//   getBathAdjustment,
//   getBedroomAdjustment,
//   getExpectedBedrooms,
//   calculateServicePrice,
//   calculateAllPrices,
//   calculateAddOns,
// };
