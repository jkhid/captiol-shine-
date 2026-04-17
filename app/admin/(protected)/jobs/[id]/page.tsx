import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase";
import { rowToJob, serviceTypeLabel, statusLabel, statusBadgeVariant, formatTime } from "@/lib/jobs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Badge } from "@/components/admin/ui/badge";
import { ArrowLeft, Clock, Calendar, User, DollarSign, StickyNote } from "lucide-react";
import { JobActions } from "@/components/admin/JobActions";
import { JobTimeTracker } from "@/components/admin/JobTimeTracker";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("*, clients(name), cleaners(name)")
    .eq("id", params.id)
    .single();

  if (error || !data) notFound();
  const job = rowToJob(data);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-28 md:pb-6">
      <Link href="/admin/jobs" className="inline-flex items-center gap-1 text-sm text-charcoal/60 hover:text-navy">
        <ArrowLeft size={16} /> Back to jobs
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">{serviceTypeLabel(job.serviceType)}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant={statusBadgeVariant(job.status)}>{statusLabel(job.status)}</Badge>
            {job.recurring && <Badge variant="outline">Recurring</Badge>}
          </div>
        </div>
        <JobActions job={job} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-charcoal/40" />
              {new Date(job.scheduledDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-charcoal/40" />
              {formatTime(job.scheduledTimeStart)} – {formatTime(job.scheduledTimeEnd)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client &amp; cleaner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <User size={14} className="text-charcoal/40" />
              {job.clientName ? (
                <Link href={`/admin/clients/${job.clientId}`} className="text-navy hover:underline">
                  {job.clientName}
                </Link>
              ) : (
                "—"
              )}
            </div>
            <div className="flex items-center gap-2">
              <User size={14} className="text-charcoal/40" />
              <span>{job.assignedCleanerName ?? "Unassigned"}</span>
            </div>
            {job.price != null && (
              <div className="flex items-center gap-2">
                <DollarSign size={14} className="text-charcoal/40" />${job.price.toFixed(2)}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {job.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StickyNote size={16} /> Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm whitespace-pre-wrap text-charcoal/80">{job.notes}</CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Time tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <JobTimeTracker job={job} />
        </CardContent>
      </Card>
    </div>
  );
}
