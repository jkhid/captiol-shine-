import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase";
import type { ContractorAgreement } from "@/lib/contractor-agreements";

export const dynamic = "force-dynamic";

const SignSchema = z.object({
  typed_name: z.string().trim().min(2).max(120),
  consent:    z.literal(true),
});

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  let body: z.infer<typeof SignSchema>;
  try {
    body = SignSchema.parse(await req.json());
  } catch {
    return NextResponse.json(
      { error: "You need to type your full name and confirm consent before signing." },
      { status: 400 },
    );
  }

  const admin = createAdminClient();
  const { data: existing } = await admin
    .from("contractor_agreements")
    .select("*")
    .eq("token", params.token)
    .maybeSingle();

  if (!existing) {
    return NextResponse.json({ error: "Agreement not found" }, { status: 404 });
  }
  const agreement = existing as ContractorAgreement;

  if (agreement.status === "voided") {
    return NextResponse.json(
      { error: "This agreement has been voided. Contact Capitol Shine for a new link." },
      { status: 410 },
    );
  }
  if (agreement.status === "signed") {
    return NextResponse.json(
      { error: "This agreement has already been signed." },
      { status: 409 },
    );
  }

  // Audit trail
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    null;
  const userAgent = req.headers.get("user-agent") ?? null;

  const now = new Date().toISOString();

  const { data, error } = await admin
    .from("contractor_agreements")
    .update({
      status: "signed",
      signed_at: now,
      signed_typed_name: body.typed_name,
      signer_ip: ip,
      signer_user_agent: userAgent,
    })
    .eq("id", agreement.id)
    .select("*")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Failed to record signature" }, { status: 500 });
  }

  return NextResponse.json({ agreement: data as ContractorAgreement });
}
