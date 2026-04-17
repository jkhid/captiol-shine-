import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase";
import { rowToClient, type ClientInput } from "@/lib/clients";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  const { data, error } = await supabase.from("clients").select("*").eq("id", params.id).single();
  if (error || !data) {
    return NextResponse.json({ error: "Client not found." }, { status: 404 });
  }
  return NextResponse.json(rowToClient(data));
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Partial<ClientInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  for (const k of [
    "name",
    "email",
    "phone",
    "service_address",
    "home_type",
    "bedrooms",
    "bathrooms",
    "notes",
    "tags",
    "source",
    "frequency",
    "hear_about",
    "referral_code",
    "lead_booking_id",
  ] as const) {
    if (k in body) {
      const v = body[k as keyof ClientInput];
      patch[k] = k === "bedrooms" ? (v != null ? Number(v) : null) : (v ?? null);
    }
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "No fields to update." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("clients")
    .update(patch)
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) {
    console.error("Client update error:", error);
    return NextResponse.json({ error: "Failed to update client." }, { status: 500 });
  }

  return NextResponse.json(rowToClient(data));
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  const { error } = await supabase.from("clients").delete().eq("id", params.id);
  if (error) {
    console.error("Client delete error:", error);
    return NextResponse.json({ error: "Failed to delete client." }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
