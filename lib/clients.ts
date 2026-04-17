export type ClientFrequency = "one_time" | "weekly" | "biweekly" | "monthly";

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  serviceAddress: string | null;
  notes: string | null;
  tags: string[];
  source: string | null;
  frequency: ClientFrequency | null;
  homeType: string | null;
  bedrooms: number | null;
  bathrooms: string | null;
  hearAbout: string | null;
  referralCode: string | null;
  leadBookingId: string | null;
  createdAt: string;
  updatedAt: string;
}

export function rowToClient(row: Record<string, unknown>): Client {
  return {
    id: row.id as string,
    name: row.name as string,
    email: (row.email as string) ?? null,
    phone: (row.phone as string) ?? null,
    serviceAddress: (row.service_address as string) ?? (row.address as string) ?? null,
    notes: (row.notes as string) ?? null,
    tags: (row.tags as string[]) ?? [],
    source: (row.source as string) ?? null,
    frequency: (row.frequency as ClientFrequency) ?? null,
    homeType: (row.home_type as string) ?? null,
    bedrooms: (row.bedrooms as number) ?? null,
    bathrooms: (row.bathrooms as string) ?? null,
    hearAbout: (row.hear_about as string) ?? null,
    referralCode: (row.referral_code as string) ?? null,
    leadBookingId: (row.lead_booking_id as string) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export interface ClientInput {
  name: string;
  email?: string | null;
  phone?: string | null;
  service_address?: string | null;
  home_type?: string | null;
  bedrooms?: number | null;
  bathrooms?: string | null;
  notes?: string | null;
  tags?: string[];
  source?: string | null;
  frequency?: ClientFrequency | null;
  hear_about?: string | null;
  referral_code?: string | null;
  lead_booking_id?: string | null;
}

export const CLIENT_FREQUENCIES: { value: ClientFrequency; label: string }[] = [
  { value: "one_time", label: "One-time" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Bi-weekly" },
  { value: "monthly", label: "Monthly" },
];

export function frequencyLabel(f: ClientFrequency | null): string {
  if (!f) return "—";
  return CLIENT_FREQUENCIES.find((x) => x.value === f)?.label ?? f;
}

export const CLIENT_SOURCES = [
  { value: "referral", label: "Referral" },
  { value: "google_ads", label: "Google Ads" },
  { value: "nextdoor", label: "NextDoor" },
  { value: "organic", label: "Organic / SEO" },
  { value: "manual", label: "Manual" },
] as const;
