import { createAdminClient } from "@/lib/supabase";
import { jobberQuery } from "./client";
import { getProductIdForServiceType, legacyToV2 } from "./products";

// ─── Booking shape we read from the bookings table ──────────────────────────
// (We type only the columns we need to keep this loose to schema drift.)
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

function normalizePhoneDigits(raw: string): string {
  return raw.replace(/\D/g, "");
}

// ─── Client lookup / create ─────────────────────────────────────────────────

interface ClientSearchHit {
  id: string;
}

const SEARCH_CLIENTS_BY_EMAIL = `
  query SearchClientsByEmail($email: String!) {
    clients(filter: { email: { contains: $email } }, first: 5) {
      nodes { id emails { address } }
    }
  }
`;

const SEARCH_CLIENTS_BY_PHONE = `
  query SearchClientsByPhone($phone: String!) {
    clients(filter: { phoneNumber: { contains: $phone } }, first: 5) {
      nodes { id phones { number } }
    }
  }
`;

interface ClientSearchEmailResp {
  clients: { nodes: Array<{ id: string; emails: Array<{ address: string }> }> };
}
interface ClientSearchPhoneResp {
  clients: { nodes: Array<{ id: string; phones: Array<{ number: string }> }> };
}

async function findClientByEmail(email: string): Promise<string | null> {
  try {
    const data = await jobberQuery<ClientSearchEmailResp>(SEARCH_CLIENTS_BY_EMAIL, { email });
    const normalized = email.trim().toLowerCase();
    const hit = data.clients.nodes.find((c) =>
      c.emails.some((e) => e.address?.toLowerCase().trim() === normalized),
    );
    return hit?.id ?? null;
  } catch {
    return null;
  }
}

async function findClientByPhone(phone: string): Promise<string | null> {
  const target = normalizePhoneDigits(phone);
  if (target.length < 7) return null;
  try {
    const data = await jobberQuery<ClientSearchPhoneResp>(SEARCH_CLIENTS_BY_PHONE, { phone: target });
    const hit = data.clients.nodes.find((c) =>
      c.phones.some((p) => normalizePhoneDigits(p.number ?? "").endsWith(target.slice(-7))),
    );
    return hit?.id ?? null;
  } catch {
    return null;
  }
}

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
    firstName: first,
    lastName:  last,
    emails:    booking.email ? [{ description: "MAIN", address: booking.email, primary: true }] : [],
    phones:    booking.phone ? [{ description: "MAIN", number: booking.phone, primary: true }] : [],
    // AddressAttributes uses street1/street2, not street. We pack the full
    // booking address string into street1 since the booking form captures
    // address as a single field and we don't try to parse out city/state/zip.
    properties: booking.address ? [{ address: { street1: booking.address } }] : [],
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
  if (booking.email) {
    const byEmail = await findClientByEmail(booking.email);
    if (byEmail) return { clientId: byEmail, matchedBy: "email" };
  }
  if (booking.phone) {
    const byPhone = await findClientByPhone(booking.phone);
    if (byPhone) return { clientId: byPhone, matchedBy: "phone" };
  }
  const created = await createClient(booking);
  return { clientId: created, matchedBy: "created" };
}

// ─── Request create ─────────────────────────────────────────────────────────

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
  const svc = booking.service_label ?? booking.service ?? "Cleaning";
  const size = booking.bedrooms != null && booking.bathrooms
    ? ` (${booking.bedrooms} BR / ${booking.bathrooms} BA)`
    : "";
  return `${svc}${size}`.slice(0, 200);
}

function buildRequestNotes(booking: BookingRow): string {
  const lines: string[] = [];
  if (booking.service_label) lines.push(`Service: ${booking.service_label}`);
  if (booking.bedrooms != null) lines.push(`Bedrooms: ${booking.bedrooms}`);
  if (booking.bathrooms) lines.push(`Bathrooms: ${booking.bathrooms}`);
  if (booking.sqft) lines.push(`Square footage: ${booking.sqft}`);
  if (booking.frequency) lines.push(`Frequency: ${booking.frequency}`);
  if (booking.date) lines.push(`Requested date: ${booking.date}`);
  if (booking.time_window) lines.push(`Time window: ${booking.time_window}`);
  if (booking.price != null) lines.push(`Quoted price: $${booking.price}`);
  if (booking.instructions) lines.push(`Notes: ${booking.instructions}`);
  lines.push(`Source: capitolshinecleaners.com booking form`);
  lines.push(`Booking ID: ${booking.id}`);
  return lines.join("\n");
}

export async function createRequestForBooking(
  booking: BookingRow,
  clientId: string,
): Promise<string> {
  const productId = getProductIdForServiceType(
    legacyToV2(booking.service, booking.frequency),
  );

  const input: Record<string, unknown> = {
    clientId,
    title:       buildRequestTitle(booking),
    description: buildRequestNotes(booking),
  };

  if (productId) {
    input.lineItems = [
      {
        productOrServiceId: productId,
        quantity: 1,
        ...(booking.price != null ? { unitCost: booking.price } : {}),
      },
    ];
  }

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
