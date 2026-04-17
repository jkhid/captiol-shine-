import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase";
import { rowToCleaner } from "@/lib/cleaners";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("cleaners")
    .select("*")
    .eq("active", true)
    .order("name");

  if (error) {
    console.error("Cleaners fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch cleaners." }, { status: 500 });
  }

  return NextResponse.json((data ?? []).map(rowToCleaner));
}
