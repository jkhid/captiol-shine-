import Link from "next/link";
import { createAdminClient } from "@/lib/supabase";
import { rowToJob, serviceTypeLabel, statusLabel, statusBadgeVariant, formatTime } from "@/lib/jobs";
import { Card } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { Badge } from "@/components/admin/ui/badge";
import { NewJobButton } from "@/components/admin/NewJobButton";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("jobs")
    .select("*, clients(name), cleaners(name)")
    .order("scheduled_date", { ascending: false })
    .order("scheduled_time_start", { ascending: false })
    .limit(200);

  const jobs = (data ?? []).map(rowToJob);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Jobs</h1>
          <p className="text-sm text-charcoal/60">{jobs.length} recent</p>
        </div>
        <NewJobButton />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Cleaner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-charcoal/50">
                  No jobs yet. Create one to get started.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((j) => (
                <TableRow key={j.id}>
                  <TableCell className="whitespace-nowrap">
                    <Link href={`/admin/jobs/${j.id}`} className="font-medium text-navy hover:underline">
                      {new Date(j.scheduledDate).toLocaleDateString()}
                    </Link>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-charcoal/70">
                    {formatTime(j.scheduledTimeStart)}
                  </TableCell>
                  <TableCell>
                    {j.clientName ? (
                      <Link href={`/admin/clients/${j.clientId}`} className="hover:underline">
                        {j.clientName}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>{serviceTypeLabel(j.serviceType)}</TableCell>
                  <TableCell className="text-charcoal/70">{j.assignedCleanerName ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(j.status)}>{statusLabel(j.status)}</Badge>
                  </TableCell>
                  <TableCell className="text-charcoal/70">
                    {j.price != null ? `$${j.price.toFixed(2)}` : "—"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
