import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase";
import { generateToken, type ContractorAgreement } from "@/lib/contractor-agreements";

export const dynamic = "force-dynamic";

// ─── GET: list all agreements ────────────────────────────────────────────────
export async function GET() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("contractor_agreements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ agreements: (data ?? []) as ContractorAgreement[] });
}

// ─── POST: create a new agreement ────────────────────────────────────────────
const CreateSchema = z.object({
  contractor_name:  z.string().trim().min(1).max(120),
  contractor_email: z.string().trim().email().optional().nullable(),
  effective_date:   z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  created_by:       z.string().trim().max(120).optional().nullable(),
});

export async function POST(req: NextRequest) {
  let body: z.infer<typeof CreateSchema>;
  try {
    body = CreateSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Generate a unique token. The DB column has a unique index, so retry on
  // the rare collision.
  let token = generateToken();
  for (let i = 0; i < 3; i++) {
    const { data: existing } = await admin
      .from("contractor_agreements")
      .select("id")
      .eq("token", token)
      .maybeSingle();
    if (!existing) break;
    token = generateToken();
  }

  const insert = {
    token,
    contractor_name:  body.contractor_name,
    contractor_email: body.contractor_email ?? null,
    effective_date:   body.effective_date ?? new Date().toISOString().slice(0, 10),
    created_by:       body.created_by ?? null,
  };

  const { data, error } = await admin
    .from("contractor_agreements")
    .insert(insert)
    .select("*")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Failed to create" }, { status: 500 });
  }

  return NextResponse.json({ agreement: data as ContractorAgreement });
}
