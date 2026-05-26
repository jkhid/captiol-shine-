import Link from "next/link";
import { createAdminClient } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import {
  statusBadgeClass,
  statusLabel,
  type PhotoSession,
} from "@/lib/job-photos";
import NewSessionForm from "./NewSessionForm";

export const dynamic = "force-dynamic";

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function PhotoSessionsPage() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("photo_sessions")
    .select("*")
    .neq("status", "archived")
    .order("created_at", { ascending: false });
  const sessions = (data ?? []) as PhotoSession[];

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Photo Sessions</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Generate cleaning report links for property management. Cleaners upload before/after photos from their phone, you click Generate PDF.
          </p>
        </div>
        <p className="text-sm text-charcoal/50">{sessions.length} active</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New photo session</CardTitle>
        </CardHeader>
        <CardContent>
          <NewSessionForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All active sessions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {sessions.length === 0 ? (
            <p className="text-sm text-charcoal/50 p-6">
              No active photo sessions. Create one above and the share link will appear.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs text-charcoal/40 uppercase tracking-wide">
                    <th className="px-4 py-3">Property</th>
                    <th className="px-4 py-3">Cleaner</th>
                    <th className="px-4 py-3">Service date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sessions.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-navy">{s.property_address}</div>
                      </td>
                      <td className="px-4 py-3 text-charcoal/75">{s.cleaner_name ?? "—"}</td>
                      <td className="px-4 py-3 text-charcoal/75">{fmtDate(s.service_date)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${statusBadgeClass(s.status)}`}>
                          {statusLabel(s.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-charcoal/70">{fmtDate(s.created_at)}</td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/photo-sessions/${s.id}`}
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
