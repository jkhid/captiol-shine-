import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase";

const ALLOWED_STATUSES = new Set(["pending", "confirmed", "completed", "cancelled"]);

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let status: unknown;
  try {
    ({ status } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof status !== "string" || !ALLOWED_STATUSES.has(status)) {
    return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", params.id);

  if (error) {
    console.error("Admin booking update error:", error);
    return NextResponse.json({ error: "Failed to update booking." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
