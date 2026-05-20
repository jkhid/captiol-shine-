// Service → Jobber product mapping.
//
// You create the products in Jobber (Products & Services), then paste the
// Jobber GraphQL product IDs into env vars. The booking sync uses these
// IDs as line items on the Request. If a mapping is missing, the booking
// still syncs but with no product line item (service detail goes in notes).
//
// To find a product ID: in Jobber UI, open the product and check the URL
// (it's the last path segment), or use the GraphQL `productsAndServices`
// query.

import type { ServiceTypeV2 } from "@/lib/pricing-data";

// Env var keys, in order matching the V2 service types.
const ENV_VAR_BY_SERVICE: Record<ServiceTypeV2 | "airbnb", string> = {
  weekly:   "JOBBER_PRODUCT_WEEKLY",
  biweekly: "JOBBER_PRODUCT_BIWEEKLY",
  monthly:  "JOBBER_PRODUCT_MONTHLY",
  oneTime:  "JOBBER_PRODUCT_ONETIME",
  deep:     "JOBBER_PRODUCT_DEEP",
  moveOut:  "JOBBER_PRODUCT_MOVEOUT",
  airbnb:   "JOBBER_PRODUCT_AIRBNB",
};

export function getProductIdForServiceType(
  serviceType: ServiceTypeV2 | "airbnb" | string,
): string | null {
  const envKey = ENV_VAR_BY_SERVICE[serviceType as ServiceTypeV2 | "airbnb"];
  if (!envKey) return null;
  const id = process.env[envKey];
  return id && id.trim().length > 0 ? id : null;
}

// Map the legacy "service" string from the booking row (e.g. "standard",
// "deep", "moveinout") + frequency back to a V2 service type so we can
// pick the right product.
export function legacyToV2(
  service: string,
  frequency: string | null | undefined,
): ServiceTypeV2 | "airbnb" {
  if (service === "deep")      return "deep";
  if (service === "moveinout") return "moveOut";
  if (service === "airbnb")    return "airbnb";
  // standard family — pick by frequency
  switch (frequency) {
    case "weekly":   return "weekly";
    case "biweekly": return "biweekly";
    case "monthly":  return "monthly";
    default:         return "oneTime";
  }
}
