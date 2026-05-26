import crypto from "crypto";

export type PhotoSessionStatus = "pending" | "partial" | "ready" | "submitted" | "archived";
export type PhotoCategory = "before" | "after";

export interface PhotoSession {
  id: string;
  token: string;
  status: PhotoSessionStatus;
  property_address: string;
  service_date: string | null;
  cleaner_name: string | null;
  created_by: string | null;
  notes: string | null;
  created_at: string;
  first_uploaded_at: string | null;
  ready_at: string | null;
  submitted_at: string | null;
  archived_at: string | null;
  updated_at: string;
}

export interface SessionPhoto {
  id: string;
  session_id: string;
  category: PhotoCategory;
  storage_path: string;
  width: number | null;
  height: number | null;
  size_bytes: number | null;
  sort_order: number;
  uploaded_at: string;
}

export const STORAGE_BUCKET = "job-photos";

// 12-char unambiguous-alphabet token (no 0/O/1/I/l). Safe to share verbally
// and short enough to text without wrapping.
const ALPHA = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
export function generateSessionToken(): string {
  const buf = crypto.randomBytes(12);
  let out = "";
  for (let i = 0; i < 12; i++) out += ALPHA[buf[i] % ALPHA.length];
  return out;
}

export function statusLabel(s: PhotoSessionStatus): string {
  switch (s) {
    case "pending":   return "Awaiting photos";
    case "partial":   return "Partial upload";
    case "ready":     return "Ready for PDF";
    case "submitted": return "Submitted";
    case "archived":  return "Archived";
  }
}

export function statusBadgeClass(s: PhotoSessionStatus): string {
  switch (s) {
    case "pending":   return "bg-cream text-charcoal border-navy/15";
    case "partial":   return "bg-amber-50 text-amber-800 border-amber-200";
    case "ready":     return "bg-green/10 text-green border-green/30";
    case "submitted": return "bg-navy/10 text-navy border-navy/20";
    case "archived":  return "bg-gray-100 text-gray-500 border-gray-200";
  }
}

// Compute the session status from the photos present.
export function computeStatus(beforeCount: number, afterCount: number, currentStatus: PhotoSessionStatus): PhotoSessionStatus {
  // Don't downgrade submitted/archived
  if (currentStatus === "submitted" || currentStatus === "archived") return currentStatus;
  if (beforeCount > 0 && afterCount > 0) return "ready";
  if (beforeCount > 0 || afterCount > 0) return "partial";
  return "pending";
}

export function storagePath(sessionId: string, category: PhotoCategory, photoId: string, ext: string): string {
  return `${sessionId}/${category}/${photoId}.${ext}`;
}

export function formatPropertyDate(d: string | null): string {
  if (!d) return "—";
  const [y, m, day] = d.split("-").map(Number);
  if (!y || !m || !day) return d;
  return new Date(y, m - 1, day).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
