import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const dynamic = "force-dynamic";

// Admin-only diagnostic. Reports whether each Jobber env var is set,
// the masked value of the IDs, and the exact redirect URI the server
// will send to Jobber. Never returns the actual secret value.

function mask(v: string | undefined): string {
  if (!v) return "(not set)";
  if (v.length <= 8) return "•".repeat(v.length);
  return v.slice(0, 4) + "…" + v.slice(-4);
}

export async function GET(req: NextRequest) {
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
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    runtime:           process.env.VERCEL ? "vercel" : "local",
    node_version:      process.version,
    client_id_set:     !!process.env.JOBBER_CLIENT_ID,
    client_id_masked:  mask(process.env.JOBBER_CLIENT_ID),
    client_id_length:  process.env.JOBBER_CLIENT_ID?.length ?? 0,
    secret_set:        !!process.env.JOBBER_CLIENT_SECRET,
    secret_length:     process.env.JOBBER_CLIENT_SECRET?.length ?? 0,
    redirect_uri:      process.env.JOBBER_REDIRECT_URI ?? "(not set)",
    products: {
      weekly:   !!process.env.JOBBER_PRODUCT_WEEKLY,
      biweekly: !!process.env.JOBBER_PRODUCT_BIWEEKLY,
      monthly:  !!process.env.JOBBER_PRODUCT_MONTHLY,
      onetime:  !!process.env.JOBBER_PRODUCT_ONETIME,
      deep:     !!process.env.JOBBER_PRODUCT_DEEP,
      moveout:  !!process.env.JOBBER_PRODUCT_MOVEOUT,
      airbnb:   !!process.env.JOBBER_PRODUCT_AIRBNB,
    },
  });
}
