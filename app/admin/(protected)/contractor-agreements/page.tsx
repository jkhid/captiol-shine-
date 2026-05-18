import { createAdminClient } from "@/lib/supabase";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { statusLabel, statusBadgeClass, type ContractorAgreement } from "@/lib/contractor-agreements";
import NewAgreementForm from "./NewAgreementForm";

export const dynamic = "force-dynamic";

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function ContractorAgreementsPage() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("contractor_agreements")
    .select("*")
    .order("created_at", { ascending: false });

  const agreements = (data ?? []) as ContractorAgreement[];

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Contractor Agreements</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Generate signing links for new subcontractors. You copy the link into your post-interview email.
          </p>
        </div>
        <p className="text-sm text-charcoal/50">{agreements.length} total</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New agreement</CardTitle>
        </CardHeader>
        <CardContent>
          <NewAgreementForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All agreements</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {agreements.length === 0 ? (
            <p className="text-sm text-charcoal/50 p-6">
              No agreements yet. Create one above and the share link will appear.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs text-charcoal/40 uppercase tracking-wide">
                    <th className="px-4 py-3">Contractor</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created</th>
                    <th className="px-4 py-3">Signed</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {agreements.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-navy">{a.contractor_name}</div>
                        {a.contractor_email && (
                          <div className="text-xs text-charcoal/55">{a.contractor_email}</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${statusBadgeClass(a.status)}`}
                        >
                          {statusLabel(a.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-charcoal/70">{fmtDate(a.created_at)}</td>
                      <td className="px-4 py-3 text-charcoal/70">{fmtDate(a.signed_at)}</td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/contractor-agreements/${a.id}`}
                          className="text-sm font-medium text-navy hover:underline"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
