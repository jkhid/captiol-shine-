import { notFound } from "next/navigation";
import { Dancing_Script } from "next/font/google";
import { createAdminClient } from "@/lib/supabase";
import type { ContractorAgreement } from "@/lib/contractor-agreements";
import SignClient from "./SignClient";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Independent Contractor Agreement — Capitol Shine",
  robots: { index: false, follow: false },
};

export default async function SignPage({ params }: { params: { token: string } }) {
  const admin = createAdminClient();
  const { data } = await admin
    .from("contractor_agreements")
    .select("*")
    .eq("token", params.token)
    .maybeSingle();

  if (!data) notFound();
  const agreement = data as ContractorAgreement;

  // Mark viewed on server fetch (first time)
  if (agreement.status === "pending") {
    const now = new Date().toISOString();
    await admin
      .from("contractor_agreements")
      .update({ status: "viewed", viewed_at: now })
      .eq("id", agreement.id);
    agreement.status = "viewed";
    agreement.viewed_at = now;
  }

  return (
    <SignClient agreement={agreement} signatureFontClass={dancing.className} />
  );
}
