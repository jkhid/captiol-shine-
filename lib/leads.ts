export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: string | null;
  consentMarketing: boolean;
  promoCode: string;
  redeemedAt: string | null;
  createdAt: string;
}

export function rowToLead(row: Record<string, unknown>): Lead {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    phone: (row.phone as string) ?? null,
    source: (row.source as string) ?? null,
    consentMarketing: (row.consent_marketing as boolean) ?? false,
    promoCode: (row.promo_code as string) ?? "FIRST30",
    redeemedAt: (row.redeemed_at as string) ?? null,
    createdAt: row.created_at as string,
  };
}
