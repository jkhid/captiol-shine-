import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import type { ContractorAgreement } from "@/lib/contractor-agreements";

export const dynamic = "force-dynamic";

// Public read by token. Marks viewed_at on first view (status pending → viewed).
export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const admin = createAdminClient();
  const { data } = await admin
    .from("contractor_agreements")
    .select("*")
    .eq("token", params.token)
    .maybeSingle();

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const agreement = data as ContractorAgreement;

  // Mark first view if still pending
  if (agreement.status === "pending") {
    await admin
      .from("contractor_agreements")
      .update({ status: "viewed", viewed_at: new Date().toISOString() })
      .eq("id", agreement.id);
    agreement.status = "viewed";
    agreement.viewed_at = new Date().toISOString();
  }

  return NextResponse.json({ agreement });
}
