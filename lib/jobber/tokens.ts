import { createAdminClient } from "@/lib/supabase";

const TOKEN_URL = "https://api.getjobber.com/api/oauth/token";

// Refresh the access token 5 minutes before it actually expires so concurrent
// requests don't race against the boundary.
const REFRESH_BUFFER_MS = 5 * 60 * 1000;

export interface JobberCredentials {
  id: string;
  access_token: string;
  refresh_token: string;
  expires_at: string;            // ISO timestamp
  scope: string | null;
  jobber_account_id: string | null;
  connected_by: string | null;
  connected_at: string;
  last_refreshed_at: string | null;
  updated_at: string;
}

interface RawTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in?: number;            // not returned by Jobber, but support if present
  token_type?: string;
  scope?: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;             // seconds, always populated after normalization
  token_type?: string;
  scope?: string;
}

// Jobber doesn't return `expires_in` directly. Their access tokens are JWTs
// with an `exp` claim. Decode the JWT to get the remaining lifetime, falling
// back to a conservative 50-minute default if anything goes wrong.
function computeExpiresInSeconds(accessToken: string, hint: number | undefined): number {
  if (typeof hint === "number" && hint > 0) return hint;

  try {
    const parts = accessToken.split(".");
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8"));
      if (typeof payload.exp === "number") {
        const remaining = payload.exp - Math.floor(Date.now() / 1000);
        if (remaining > 60) return remaining; // at least 1 minute remaining
      }
    }
  } catch {
    // fall through
  }
  return 50 * 60; // 50 minutes, safe default
}

function normalize(raw: RawTokenResponse): TokenResponse {
  return {
    access_token:  raw.access_token,
    refresh_token: raw.refresh_token,
    expires_in:    computeExpiresInSeconds(raw.access_token, raw.expires_in),
    token_type:    raw.token_type,
    scope:         raw.scope,
  };
}

function clientId(): string {
  const id = process.env.JOBBER_CLIENT_ID;
  if (!id) throw new Error("JOBBER_CLIENT_ID is not set");
  return id;
}
function clientSecret(): string {
  const s = process.env.JOBBER_CLIENT_SECRET;
  if (!s) throw new Error("JOBBER_CLIENT_SECRET is not set");
  return s;
}
function redirectUri(): string {
  const u = process.env.JOBBER_REDIRECT_URI;
  if (!u) throw new Error("JOBBER_REDIRECT_URI is not set");
  return u;
}

// ─── Token retrieval / storage ──────────────────────────────────────────────

export async function loadCredentials(): Promise<JobberCredentials | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("jobber_credentials")
    .select("*")
    .limit(1)
    .maybeSingle();
  return (data as JobberCredentials | null) ?? null;
}

export async function isConnected(): Promise<boolean> {
  const creds = await loadCredentials();
  return !!creds;
}

export async function disconnect(): Promise<void> {
  const admin = createAdminClient();
  await admin.from("jobber_credentials").delete().not("id", "is", null);
}

interface SaveArgs {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope?: string;
  connected_by?: string;
  jobber_account_id?: string | null;
}

export async function saveCredentials(args: SaveArgs): Promise<void> {
  const admin = createAdminClient();
  const existing = await loadCredentials();

  const expiresAt = new Date(Date.now() + args.expires_in * 1000).toISOString();

  if (existing) {
    await admin
      .from("jobber_credentials")
      .update({
        access_token:      args.access_token,
        refresh_token:     args.refresh_token,
        expires_at:        expiresAt,
        scope:             args.scope ?? existing.scope,
        last_refreshed_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
  } else {
    await admin.from("jobber_credentials").insert({
      access_token:      args.access_token,
      refresh_token:     args.refresh_token,
      expires_at:        expiresAt,
      scope:             args.scope ?? null,
      connected_by:      args.connected_by ?? null,
      jobber_account_id: args.jobber_account_id ?? null,
    });
  }
}

// ─── OAuth exchanges ────────────────────────────────────────────────────────

export async function exchangeCodeForTokens(code: string): Promise<TokenResponse> {
  const body = new URLSearchParams({
    client_id:     clientId(),
    client_secret: clientSecret(),
    grant_type:    "authorization_code",
    code,
    redirect_uri:  redirectUri(),
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Jobber token exchange failed: ${res.status} ${text}`);
  }
  const raw = (await res.json()) as RawTokenResponse;
  return normalize(raw);
}

export async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const body = new URLSearchParams({
    client_id:     clientId(),
    client_secret: clientSecret(),
    grant_type:    "refresh_token",
    refresh_token: refreshToken,
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Jobber token refresh failed: ${res.status} ${text}`);
  }
  const raw = (await res.json()) as RawTokenResponse;
  return normalize(raw);
}

// Returns a valid access token, refreshing if it's expired or about to expire.
// Throws if not connected.
export async function getValidAccessToken(): Promise<string> {
  const creds = await loadCredentials();
  if (!creds) throw new Error("Jobber is not connected. Connect at /admin/integrations.");

  const expiresInMs = new Date(creds.expires_at).getTime() - Date.now();
  if (expiresInMs > REFRESH_BUFFER_MS) {
    return creds.access_token;
  }

  // Refresh
  const fresh = await refreshAccessToken(creds.refresh_token);
  await saveCredentials({
    access_token:  fresh.access_token,
    refresh_token: fresh.refresh_token ?? creds.refresh_token,
    expires_in:    fresh.expires_in,
    scope:         fresh.scope,
  });
  return fresh.access_token;
}

// Build the OAuth authorize URL.
export function buildAuthorizeUrl(state: string, scopes: string[]): string {
  const url = new URL("https://api.getjobber.com/api/oauth/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id",     clientId());
  url.searchParams.set("redirect_uri",  redirectUri());
  url.searchParams.set("state",         state);
  url.searchParams.set("scope",         scopes.join(" "));
  return url.toString();
}
