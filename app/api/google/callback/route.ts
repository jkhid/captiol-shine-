import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { getOAuthClient } from "@/lib/google-calendar";
import { createAdminClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.redirect(new URL("/admin/login", req.url));

  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");
  if (error || !code) {
    return NextResponse.redirect(new URL(`/admin/settings?google=error`, req.url));
  }

  try {
    const oauth = getOAuthClient();
    const { tokens } = await oauth.getToken(code);
    if (!tokens.access_token || !tokens.refresh_token || !tokens.expiry_date) {
      return NextResponse.redirect(new URL(`/admin/settings?google=incomplete`, req.url));
    }

    const supabase = createAdminClient();
    await supabase
      .from("calendar_tokens")
      .upsert(
        {
          user_id: user.id,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at: new Date(tokens.expiry_date).toISOString(),
        },
        { onConflict: "user_id" }
      );

    return NextResponse.redirect(new URL(`/admin/settings?google=connected`, req.url));
  } catch (err) {
    console.error("[google/callback] failed:", err);
    return NextResponse.redirect(new URL(`/admin/settings?google=error`, req.url));
  }
}
