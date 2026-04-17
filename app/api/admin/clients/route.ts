import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase";
import { rowToClient, type ClientInput } from "@/lib/clients";

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const q = req.nextUrl.searchParams.get("q")?.trim();

  const supabase = createAdminClient();
  let query = supabase.from("clients").select("*").order("created_at", { ascending: false });

  if (q) {
    query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Clients fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch clients." }, { status: 500 });
  }

  return NextResponse.json((data ?? []).map(rowToClient));
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: ClientInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("clients")
    .insert({
      name: body.name.trim(),
      email: body.email ?? null,
      phone: body.phone ?? null,
      service_address: body.service_address ?? null,
      home_type: body.home_type ?? null,
      bedrooms: body.bedrooms ?? null,
      bathrooms: body.bathrooms ?? null,
      notes: body.notes ?? null,
      tags: body.tags ?? [],
      source: body.source ?? null,
      frequency: body.frequency ?? null,
      hear_about: body.hear_about ?? null,
      referral_code: body.referral_code ?? null,
      lead_booking_id: body.lead_booking_id ?? null,
    })
    .select("*")
    .single();

  if (error) {
    console.error("Client create error:", error);
    return NextResponse.json({ error: "Failed to create client." }, { status: 500 });
  }

  return NextResponse.json(rowToClient(data), { status: 201 });
}
