import { createAdminClient } from "@/lib/supabase";
import { rowToLead } from "@/lib/leads";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Badge } from "@/components/admin/ui/badge";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  const leads = (data ?? []).map(rowToLead);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy">Leads</h1>
        <p className="text-sm text-charcoal/50">{leads.length} total</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Captured offers</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {leads.length === 0 ? (
            <p className="text-sm text-charcoal/50 p-6">No leads yet. Visitors who claim the offer on the landing page will show up here.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs text-charcoal/40 uppercase tracking-wide">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Captured</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {leads.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-navy">{l.name}</td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${l.email}`} className="text-navy hover:underline">{l.email}</a>
                      </td>
                      <td className="px-4 py-3">
                        {l.phone ? (
                          <a href={`tel:${l.phone}`} className="text-navy hover:underline">{l.phone}</a>
                        ) : (
                          <span className="text-charcoal/40">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {l.source ? <Badge variant="outline">{l.source}</Badge> : <span className="text-charcoal/40">—</span>}
                      </td>
                      <td className="px-4 py-3 text-charcoal/60 text-xs">
                        {new Date(l.createdAt).toLocaleString()}
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
