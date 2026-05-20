import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServerClient } from "@supabase/ssr";
import { buildAuthorizeUrl } from "@/lib/jobber/tokens";

export const dynamic = "force-dynamic";

const SCOPES = [
  "read_clients",
  "write_clients",
  "read_requests",
  "write_requests",
  "read_quotes",
];

export async function GET(req: NextRequest) {
  // Only an authenticated admin can initiate the OAuth flow.
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
  if (!user) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("next", "/admin/integrations");
    return NextResponse.redirect(loginUrl);
  }

  // CSRF protection: random state, stored in an HttpOnly cookie.
  const state = crypto.randomBytes(24).toString("base64url");
  const target = buildAuthorizeUrl(state, SCOPES);

  const res = NextResponse.redirect(target);
  res.cookies.set("jobber_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600, // 10 minutes
  });
  return res;
}
