import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Dancing_Script } from "next/font/google";
import { createAdminClient } from "@/lib/supabase";
import {
  formatSignedDate,
  statusBadgeClass,
  statusLabel,
  type ContractorAgreement,
} from "@/lib/contractor-agreements";
import AgreementBody from "@/components/contractor-agreements/AgreementBody";
import AdminDetailActions from "./AdminDetailActions";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export const dynamic = "force-dynamic";

export default async function AgreementDetailPage({ params }: { params: { id: string } }) {
  const admin = createAdminClient();
  const { data } = await admin
    .from("contractor_agreements")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (!data) notFound();
  const agreement = data as ContractorAgreement;

  return (
    <div className="space-y-6">
      <div className="print:hidden">
        <Link
          href="/admin/contractor-agreements"
          className="inline-flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-navy transition-colors"
        >
          <ArrowLeft size={14} /> All agreements
        </Link>
        <div className="flex items-end justify-between gap-4 mt-3">
          <div>
            <h1 className="text-2xl font-bold text-navy">{agreement.contractor_name}</h1>
            {agreement.contractor_email && (
              <p className="text-sm text-charcoal/60 mt-0.5">{agreement.contractor_email}</p>
            )}
          </div>
          <span
            className={`inline-flex items-center text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border ${statusBadgeClass(agreement.status)}`}
          >
            {statusLabel(agreement.status)}
          </span>
        </div>
      </div>

      <div className="print:hidden">
        <AdminDetailActions agreement={agreement} />
      </div>

      {/* Audit + key dates panel */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-charcoal/55 mb-4">
          Audit trail
        </h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <Detail label="Created"   value={new Date(agreement.created_at).toLocaleString()} />
          <Detail label="Token"     value={agreement.token} mono />
          <Detail label="Effective date" value={agreement.effective_date} />
          <Detail label="First viewed" value={agreement.viewed_at ? new Date(agreement.viewed_at).toLocaleString() : "—"} />
          <Detail
            label="Signed"
            value={agreement.signed_at ? new Date(agreement.signed_at).toLocaleString() : "—"}
          />
          <Detail label="Typed signature" value={agreement.signed_typed_name ?? "—"} />
          <Detail label="Signer IP" value={agreement.signer_ip ?? "—"} mono />
          <Detail label="User agent" value={agreement.signer_user_agent ?? "—"} mono small />
        </dl>
      </div>

      {/* Rendered agreement */}
      <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10">
        <AgreementBody
          contractorName={agreement.contractor_name}
          contractorEmail={agreement.contractor_email}
          effectiveDate={agreement.effective_date}
          signedAt={agreement.signed_at}
          signedTypedName={agreement.signed_typed_name}
          signatureFontClass={dancing.className}
        />
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  mono,
  small,
}: {
  label: string;
  value: string;
  mono?: boolean;
  small?: boolean;
}) {
  return (
    <div>
      <dt className="text-[11px] font-bold text-charcoal/45 uppercase tracking-wider mb-1">{label}</dt>
      <dd
        className={[
          "text-charcoal/85 break-words",
          mono ? "font-mono" : "",
          small ? "text-xs" : "text-sm",
        ].join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}
