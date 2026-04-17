import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase";
import { rowToBooking } from "@/lib/bookings";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Admin bookings fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings." }, { status: 500 });
  }

  return NextResponse.json((data ?? []).map(rowToBooking));
}
