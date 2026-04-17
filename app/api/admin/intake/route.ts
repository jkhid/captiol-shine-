import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase";
import { rowToBooking } from "@/lib/bookings";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();

  const { data: linkedIds } = await supabase
    .from("clients")
    .select("lead_booking_id")
    .not("lead_booking_id", "is", null);

  const exclude = (linkedIds ?? []).map((r) => r.lead_booking_id).filter(Boolean) as string[];

  let query = supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (exclude.length > 0) {
    query = query.not("id", "in", `(${exclude.join(",")})`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Intake fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch." }, { status: 500 });
  }

  return NextResponse.json((data ?? []).map(rowToBooking));
}
