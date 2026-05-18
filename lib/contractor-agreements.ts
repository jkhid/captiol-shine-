import crypto from "crypto";

export interface ContractorAgreement {
  id: string;
  token: string;
  status: "pending" | "viewed" | "signed" | "voided";
  contractor_name: string;
  contractor_email: string | null;
  effective_date: string;       // YYYY-MM-DD
  created_by: string | null;
  created_at: string;
  viewed_at: string | null;
  signed_at: string | null;
  signed_typed_name: string | null;
  signer_ip: string | null;
  signer_user_agent: string | null;
  updated_at: string;
}

// Company-side defaults baked into the template. Update here if business
// details change.
export const COMPANY = {
  legalName:  "Capitol Home Services LLC",
  dba:        "Capitol Shine",
  address:    "1805 Key Blvd, Arlington, VA 22201",
  signer:     "Jay Khidir",
  signerTitle: "Owner",
} as const;

// ─── Token generation ─────────────────────────────────────────────────────────
// 12 chars from an unambiguous alphabet — no 0/O/1/I/l. Safe for sharing
// verbally or pasting into email body.

const ALPHA = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export function generateToken(): string {
  const buf = crypto.randomBytes(12);
  let out = "";
  for (let i = 0; i < 12; i++) out += ALPHA[buf[i] % ALPHA.length];
  return out;
}

// ─── Status helpers ──────────────────────────────────────────────────────────

export function statusLabel(s: ContractorAgreement["status"]): string {
  switch (s) {
    case "pending": return "Awaiting signature";
    case "viewed":  return "Opened, not signed";
    case "signed":  return "Signed";
    case "voided":  return "Voided";
  }
}

export function statusBadgeClass(s: ContractorAgreement["status"]): string {
  switch (s) {
    case "pending": return "bg-cream text-charcoal border-navy/15";
    case "viewed":  return "bg-amber-50 text-amber-800 border-amber-200";
    case "signed":  return "bg-green/10 text-green border-green/30";
    case "voided":  return "bg-gray-100 text-gray-500 border-gray-200";
  }
}

// ─── Display helpers ─────────────────────────────────────────────────────────

export function formatEffectiveDate(d: string): string {
  // Avoid timezone shift by treating as a local YYYY-MM-DD
  const [year, month, day] = d.split("-").map(Number);
  if (!year || !month || !day) return d;
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

export function formatSignedDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

export function rowToAgreement(row: Record<string, unknown>): ContractorAgreement {
  return row as unknown as ContractorAgreement;
}
