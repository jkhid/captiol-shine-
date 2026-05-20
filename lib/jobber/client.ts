import { getValidAccessToken, refreshAccessToken, saveCredentials, loadCredentials } from "./tokens";

const GRAPHQL_URL = "https://api.getjobber.com/api/graphql";
const API_VERSION = "2025-04-16"; // pinned API version; bump deliberately

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string; extensions?: Record<string, unknown> }>;
}

export class JobberApiError extends Error {
  status: number;
  details: unknown;
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "JobberApiError";
    this.status = status;
    this.details = details;
  }
}

/**
 * Make a GraphQL request to Jobber's API.
 * Automatically refreshes the access token on 401 and retries once.
 */
export async function jobberQuery<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  let token = await getValidAccessToken();

  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type":  "application/json",
        "X-JOBBER-GRAPHQL-VERSION": API_VERSION,
      },
      body: JSON.stringify({ query, variables: variables ?? {} }),
    });

    // Hard auth failure → force refresh + retry once
    if (res.status === 401 && attempt === 0) {
      const creds = await loadCredentials();
      if (!creds) throw new JobberApiError("Jobber disconnected", 401);
      const fresh = await refreshAccessToken(creds.refresh_token);
      await saveCredentials({
        access_token:  fresh.access_token,
        refresh_token: fresh.refresh_token ?? creds.refresh_token,
        expires_in:    fresh.expires_in,
        scope:         fresh.scope,
      });
      token = fresh.access_token;
      continue;
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new JobberApiError(`Jobber HTTP ${res.status}: ${text}`, res.status, text);
    }

    const body = (await res.json()) as GraphQLResponse<T>;

    if (body.errors && body.errors.length > 0) {
      const msg = body.errors.map((e) => e.message).join("; ");
      throw new JobberApiError(`Jobber GraphQL: ${msg}`, 200, body.errors);
    }
    if (!body.data) {
      throw new JobberApiError("Jobber returned no data", 200, body);
    }
    return body.data;
  }

  throw new JobberApiError("Jobber auth retry exhausted", 401);
}
