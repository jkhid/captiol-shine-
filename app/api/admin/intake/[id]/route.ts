import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase";

const EDITABLE = [
  "customer_name",
  "email",
  "phone",
  "address",
  "service_label",
  "home_type",
  "bedrooms",
  "bathrooms",
  "date",
  "price",
  "frequency",
  "notes",
  "status",
] as const;

const VALID_STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (body.status && !VALID_STATUSES.includes(body.status as string)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  for (const k of EDITABLE) {
    if (k in body) {
      const numFields = ["price", "bedrooms"];
      patch[k] = numFields.includes(k) ? Number(body[k]) : (body[k] ?? null);
    }
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "No fields." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("bookings")
    .update(patch)
    .eq("id", params.id);

  if (error) {
    console.error("Booking update error:", error);
    return NextResponse.json({ error: "Failed to update." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
