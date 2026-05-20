import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { exchangeCodeForTokens, saveCredentials } from "@/lib/jobber/tokens";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code  = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  const dest = (status: string) => {
    const u = new URL("/admin/integrations", req.url);
    u.searchParams.set("jobber", status);
    return NextResponse.redirect(u);
  };

  if (error) return dest(`error:${error}`);
  if (!code || !state) return dest("error:missing_params");

  const expectedState = req.cookies.get("jobber_oauth_state")?.value;
  if (!expectedState || expectedState !== state) {
    return dest("error:state_mismatch");
  }

  // Capture which admin authorized.
  let connectedBy: string | undefined;
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) { return req.cookies.get(name)?.value; },
          set() {},
          remove() {},
        },
      },
    );
    const { data: { user } } = await supabase.auth.getUser();
    connectedBy = user?.email ?? undefined;
  } catch { /* non-fatal */ }

  try {
    const tokens = await exchangeCodeForTokens(code);
    await saveCredentials({
      access_token:  tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in:    tokens.expires_in,
      scope:         tokens.scope,
      connected_by:  connectedBy,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Jobber OAuth callback failed:", message);
    // Pass the underlying error to the UI so we can diagnose. Truncate
    // to keep the URL sane.
    const trimmed = message.replace(/\s+/g, " ").slice(0, 400);
    return dest(`error:${encodeURIComponent(trimmed)}`);
  }

  const res = dest("connected");
  res.cookies.delete("jobber_oauth_state");
  return res;
}
