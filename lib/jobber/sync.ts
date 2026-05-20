import { createAdminClient } from "@/lib/supabase";
import { jobberQuery } from "./client";
import { getProductIdForServiceType, legacyToV2 } from "./products";

// ─── Booking shape we read from the bookings table ──────────────────────────
// (We type only the columns we need to stay loose to schema drift.)
export interface BookingRow {
  id:             string;
  customer_name:  string;
  email:          string;
  phone:          string;
  address:        string;
  service:        string;
  service_label?: string | null;
  bedrooms?:      number | null;
  bathrooms?:     string | null;
  sqft?:          string | null;
  frequency?:     string | null;
  date?:          string | null;
  time_window?:   string | null;
  instructions?:  string | null;
  price?:         number | null;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

function digitsOnly(raw: string | null | undefined): string {
  return (raw ?? "").replace(/\D/g, "");
}

// ─── Dedupe via Supabase ────────────────────────────────────────────────────
// Jobber's ClientFilterAttributes doesn't expose email or phone, so we can't
// query their API for prior clients. Instead, we look up our own bookings
// table for any past booking that we already pushed to Jobber. If we find
// a match by email or phone, we reuse that Jobber client ID. Clean, fast,
// no extra API calls.

async function findExistingJobberClientId(
  bookingId: string,
  email: string | null,
  phone: string | null,
): Promise<{ clientId: string; matchedBy: "email" | "phone" } | null> {
  const admin = createAdminClient();

  if (email) {
    const { data } = await admin
      .from("bookings")
      .select("jobber_client_id")
      .neq("id", bookingId)
      .ilike("email", email)
      .not("jobber_client_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(1);
    const hit = data?.[0]?.jobber_client_id as string | null | undefined;
    if (hit) return { clientId: hit, matchedBy: "email" };
  }

  if (phone) {
    const tail = digitsOnly(phone).slice(-10);
    if (tail.length === 10) {
      const { data } = await admin
        .from("bookings")
        .select("jobber_client_id, phone")
        .neq("id", bookingId)
        .not("jobber_client_id", "is", null)
        .order("created_at", { ascending: false })
        .limit(30);
      for (const row of data ?? []) {
        const rowTail = digitsOnly(row.phone as string | null).slice(-10);
        const id = (row.jobber_client_id as string | null) ?? null;
        if (rowTail === tail && id) return { clientId: id, matchedBy: "phone" };
      }
    }
  }

  return null;
}

// ─── Client create ──────────────────────────────────────────────────────────

const CREATE_CLIENT = `
  mutation CreateClient($input: ClientCreateInput!) {
    clientCreate(input: $input) {
      client { id }
      userErrors { message }
    }
  }
`;

interface ClientCreateResp {
  clientCreate: {
    client: { id: string } | null;
    userErrors: Array<{ message: string }>;
  };
}

async function createClient(booking: BookingRow): Promise<string> {
  const { first, last } = splitName(booking.customer_name);
  const input = {
    firstName: first || booking.customer_name,
    lastName:  last,
    emails: booking.email
      ? [{ description: "MAIN", address: booking.email, primary: true }]
      : [],
    phones: booking.phone
      ? [{ description: "MAIN", number: booking.phone, primary: true, smsAllowed: true }]
      : [],
    properties: booking.address
      ? [{ address: { street1: booking.address } }]
      : [],
  };

  const data = await jobberQuery<ClientCreateResp>(CREATE_CLIENT, { input });
  if (data.clientCreate.userErrors.length > 0) {
    throw new Error(
      `clientCreate userErrors: ${data.clientCreate.userErrors.map((e) => e.message).join("; ")}`,
    );
  }
  const id = data.clientCreate.client?.id;
  if (!id) throw new Error("clientCreate returned no client");
  return id;
}

export async function findOrCreateClient(booking: BookingRow): Promise<{
  clientId: string;
  matchedBy: "email" | "phone" | "created";
}> {
  const existing = await findExistingJobberClientId(booking.id, booking.email, booking.phone);
  if (existing) return existing;
  const created = await createClient(booking);
  return { clientId: created, matchedBy: "created" };
}

// ─── Request create ─────────────────────────────────────────────────────────
// RequestCreateInput has no `description` field. The only freeform text is
// `title`. The booking details go into the single line item's description.

const CREATE_REQUEST = `
  mutation CreateRequest($input: RequestCreateInput!) {
    requestCreate(input: $input) {
      request { id }
      userErrors { message }
    }
  }
`;

interface RequestCreateResp {
  requestCreate: {
    request: { id: string } | null;
    userErrors: Array<{ message: string }>;
  };
}

function buildRequestTitle(booking: BookingRow): string {
  const svc = booking.service_label ?? "Cleaning";
  const size = booking.bedrooms != null && booking.bathrooms
    ? ` (${booking.bedrooms} BR / ${booking.bathrooms} BA)`
    : "";
  const date = booking.date ? ` — ${booking.date}` : "";
  return `${svc}${size}${date}`.slice(0, 200);
}

function buildLineItemDescription(booking: BookingRow): string {
  const lines: string[] = [];
  if (booking.bedrooms != null) lines.push(`Bedrooms: ${booking.bedrooms}`);
  if (booking.bathrooms)        lines.push(`Bathrooms: ${booking.bathrooms}`);
  if (booking.sqft)             lines.push(`Square footage: ${booking.sqft}`);
  if (booking.frequency)        lines.push(`Frequency: ${booking.frequency}`);
  if (booking.date)             lines.push(`Requested date: ${booking.date}`);
  if (booking.time_window)      lines.push(`Time window: ${booking.time_window}`);
  if (booking.address)          lines.push(`Address: ${booking.address}`);
  if (booking.instructions)     lines.push(`Customer notes: ${booking.instructions}`);
  lines.push("");
  lines.push(`Source: capitolshinecleaners.com booking form`);
  lines.push(`Booking ID: ${booking.id}`);
  return lines.join("\n");
}

export async function createRequestForBooking(
  booking: BookingRow,
  clientId: string,
): Promise<string> {
  const productId  = getProductIdForServiceType(legacyToV2(booking.service, booking.frequency));
  const serviceName = booking.service_label ?? "Cleaning";

  const lineItem: Record<string, unknown> = {
    name: serviceName,
    description: buildLineItemDescription(booking),
    quantity: 1,
    saveToProductsAndServices: false,
  };
  if (productId)               lineItem.productOrServiceId = productId;
  if (booking.price != null)   lineItem.unitPrice = booking.price;

  const input = {
    clientId,
    title: buildRequestTitle(booking),
    lineItems: [lineItem],
  };

  const data = await jobberQuery<RequestCreateResp>(CREATE_REQUEST, { input });
  if (data.requestCreate.userErrors.length > 0) {
    throw new Error(
      `requestCreate userErrors: ${data.requestCreate.userErrors.map((e) => e.message).join("; ")}`,
    );
  }
  const id = data.requestCreate.request?.id;
  if (!id) throw new Error("requestCreate returned no request");
  return id;
}

// ─── Top-level push ─────────────────────────────────────────────────────────

export interface PushResult {
  ok: true;
  clientId: string;
  requestId: string;
  matchedBy: "email" | "phone" | "created";
}

export interface PushFailure {
  ok: false;
  error: string;
}

export type PushOutcome = PushResult | PushFailure;

export async function pushBookingToJobber(booking: BookingRow): Promise<PushOutcome> {
  try {
    const { clientId, matchedBy } = await findOrCreateClient(booking);
    const requestId = await createRequestForBooking(booking, clientId);

    const admin = createAdminClient();
    await admin
      .from("bookings")
      .update({
        jobber_client_id:   clientId,
        jobber_request_id:  requestId,
        jobber_sync_status: "synced",
        jobber_synced_at:   new Date().toISOString(),
        jobber_error:       null,
      })
      .eq("id", booking.id);

    return { ok: true, clientId, requestId, matchedBy };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const admin = createAdminClient();
    await admin
      .from("bookings")
      .update({
        jobber_sync_status: "failed",
        jobber_error:       message.slice(0, 1000),
      })
      .eq("id", booking.id);
    return { ok: false, error: message };
  }
}

// Used by the admin "Retry sync" action.
export async function retrySyncForBookingId(bookingId: string): Promise<PushOutcome> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .maybeSingle();
  if (error || !data) return { ok: false, error: "Booking not found" };
  return pushBookingToJobber(data as BookingRow);
}
