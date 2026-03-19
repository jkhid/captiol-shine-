export const COMPANY = {
  name: "Capitol Shine",
  tagline: "The standard your home deserves.",
  phone: "703-375-9132",
  email: "hello@capitolshinecleaning.co",
  address: "Arlington, VA",
} as const;

export const SERVICE_DESCRIPTIONS = {
  standard: {
    name: "Standard Clean",
    short: "Recurring maintenance for a consistently fresh home. Weekly or biweekly.",
    included: [
      "Dust all surfaces & furniture",
      "Vacuum & mop all floors",
      "Clean & sanitize bathrooms",
      "Clean & sanitize kitchen",
      "Empty trash cans & replace liners",
    ],
  },
  deep: {
    name: "Deep Clean",
    short: "Top-to-bottom reset. Inside appliances, baseboards, and every forgotten corner.",
    included: [
      "Everything in Standard Clean",
      "Inside oven & microwave",
      "Baseboards & door frames",
      "Light fixtures & ceiling fans",
      "Window sills & tracks",
    ],
  },
  moveinout: {
    name: "Move-In / Move-Out",
    short: "Get your deposit back — or start fresh in your new place.",
    included: [
      "Everything in Deep Clean",
      "Inside all cabinets & drawers",
      "Inside refrigerator & freezer",
      "Interior windows",
      "Garage sweep",
    ],
  },
  airbnb: {
    name: "Airbnb Turnover",
    short: "Fast, reliable turnover cleaning for short-term rental hosts.",
    included: [
      "Full surface clean & sanitize",
      "Fresh linens & bed making",
      "Restock essentials check",
      "Trash removal & setup",
      "Same-day availability",
    ],
  },
} as const;

export type ServiceKey = keyof typeof SERVICE_DESCRIPTIONS;
