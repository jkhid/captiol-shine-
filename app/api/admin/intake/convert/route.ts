import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase";
import { rowToClient } from "@/lib/clients";

// Converts a public bookings row into a client record (+ optionally links back).
// Does NOT create a job — that's done in the job dialog after conversion.
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { booking_id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body.booking_id) {
    return NextResponse.json({ error: "booking_id required." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data: booking, error: bErr } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", body.booking_id)
    .single();

  if (bErr || !booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  const { data: existing } = await supabase
    .from("clients")
    .select("id")
    .eq("lead_booking_id", booking.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "Already converted.", client_id: existing.id }, { status: 409 });
  }

  const { data: client, error: cErr } = await supabase
    .from("clients")
    .insert({
      name: booking.customer_name,
      email: booking.email,
      phone: booking.phone,
      service_address: booking.address,
      source: "organic",
      frequency: booking.frequency === "one-time" ? "one_time" : booking.frequency ?? null,
      home_type: booking.home_type ?? null,
      bedrooms: booking.bedrooms ?? null,
      bathrooms: booking.bathrooms ?? null,
      lead_booking_id: booking.id,
    })
    .select("*")
    .single();

  if (cErr || !client) {
    console.error("Intake conversion error:", cErr);
    return NextResponse.json({ error: "Failed to convert." }, { status: 500 });
  }

  return NextResponse.json(rowToClient(client), { status: 201 });
}
