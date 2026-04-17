import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { getAuthUrl } from "@/lib/google-calendar";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"));
  return NextResponse.redirect(getAuthUrl(user.id));
}
