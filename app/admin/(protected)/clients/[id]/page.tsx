import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase";
import { rowToClient, frequencyLabel } from "@/lib/clients";
import { rowToJob, serviceTypeLabel, statusLabel, statusBadgeVariant, formatTime } from "@/lib/jobs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Badge } from "@/components/admin/ui/badge";
import { ArrowLeft, Mail, MapPin, Phone, Home, Calendar, DollarSign, Briefcase } from "lucide-react";
import { ClientActions } from "@/components/admin/ClientActions";
import { NewJobButton } from "@/components/admin/NewJobButton";

export const dynamic = "force-dynamic";

const STATUS_LEFT_BORDER: Record<string, string> = {
  scheduled: "border-l-navy",
  in_progress: "border-l-amber-400",
  completed: "border-l-green-500",
  cancelled: "border-l-gray-300",
  no_show: "border-l-red-400",
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("clients").select("*").eq("id", params.id).single();
  if (error || !data) notFound();
  const client = rowToClient(data);

  const { data: jobRows } = await supabase
    .from("jobs")
    .select("*, cleaners(name)")
    .eq("client_id", client.id)
    .order("scheduled_date", { ascending: false });
  const jobs = (jobRows ?? []).map(rowToJob);

  const totalRevenue = jobs
    .filter((j) => j.status === "completed")
    .reduce((sum, j) => sum + (j.price ?? 0), 0);
  const lastJob = jobs.find((j) => j.status === "completed");
  const memberSince = new Date(client.createdAt).toLocaleDateString([], {
    month: "short",
    year: "numeric",
  });

  const stats = [
    { label: "Jobs", value: jobs.length, icon: Briefcase },
    { label: "Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign },
    { label: "Client since", value: memberSince, icon: Calendar },
    {
      label: "Last service",
      value: lastJob
        ? new Date(lastJob.scheduledDate).toLocaleDateString([], { month: "short", day: "numeric" })
        : "—",
      icon: Calendar,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/admin/clients" className="inline-flex items-center gap-1 text-sm text-charcoal/60 hover:text-navy transition-colors">
        <ArrowLeft size={16} /> Back to clients
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy to-navy/80 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
              {initials(client.name)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy">{client.name}</h1>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {client.frequency && (
                  <Badge variant={client.frequency === "one_time" ? "outline" : "success"}>
                    {frequencyLabel(client.frequency)}
                  </Badge>
                )}
                {client.source && <Badge variant="secondary">{client.source}</Badge>}
                {client.tags.map((t) => (
                  <Badge key={t} variant="outline">{t}</Badge>
                ))}
              </div>
            </div>
          </div>
          <ClientActions client={client} />
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                <s.icon size={16} className="text-charcoal/40" />
              </div>
              <div>
                <div className="text-sm font-semibold text-navy">{s.value}</div>
                <div className="text-[11px] text-charcoal/45">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="group hover:border-gray-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone size={15} className="text-charcoal/30" /> Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {client.phone && (
              <a href={`tel:${client.phone}`} className="flex items-center gap-2 text-navy hover:underline">
                <span className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-navy/60" />
                </span>
                {client.phone}
              </a>
            )}
            {client.email && (
              <a href={`mailto:${client.email}`} className="flex items-center gap-2 text-navy hover:underline">
                <span className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-navy/60" />
                </span>
                {client.email}
              </a>
            )}
            {!client.phone && !client.email && <p className="text-charcoal/50">No contact info.</p>}
          </CardContent>
        </Card>

        <Card className="group hover:border-gray-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home size={15} className="text-charcoal/30" /> Property
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {client.serviceAddress ? (
              <div className="flex items-start gap-2">
                <span className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-navy/60" />
                </span>
                <span className="text-charcoal/80 pt-1.5">{client.serviceAddress}</span>
              </div>
            ) : (
              <p className="text-charcoal/50">No address on file.</p>
            )}
            {(client.homeType || client.bedrooms != null || client.bathrooms) && (
              <div className="flex items-center gap-4 text-charcoal/70 pl-10">
                {client.homeType && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-md font-medium">
                    {client.homeType}
                  </span>
                )}
                {client.bedrooms != null && (
                  <span className="text-xs">{client.bedrooms} BR</span>
                )}
                {client.bathrooms && (
                  <span className="text-xs">{client.bathrooms} BA</span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      {client.notes && (
        <Card className="hover:border-gray-300 transition-colors">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm whitespace-pre-wrap text-charcoal/80">
            {client.notes}
          </CardContent>
        </Card>
      )}

      {/* Job history */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Job history ({jobs.length})</CardTitle>
          <NewJobButton defaultClientId={client.id} />
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <p className="text-sm text-charcoal/50">No jobs yet.</p>
          ) : (
            <ul className="space-y-2">
              {jobs.map((j) => (
                <li
                  key={j.id}
                  className={`border-l-[3px] ${STATUS_LEFT_BORDER[j.status] ?? "border-l-gray-200"} rounded-lg bg-gray-50/50 hover:bg-gray-50 px-4 py-3 flex items-center justify-between gap-4 transition-colors`}
                >
                  <div className="min-w-0">
                    <Link href={`/admin/jobs/${j.id}`} className="font-medium text-navy hover:underline">
                      {new Date(j.scheduledDate).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })} · {formatTime(j.scheduledTimeStart)}
                    </Link>
                    <div className="text-xs text-charcoal/60 mt-0.5">
                      {serviceTypeLabel(j.serviceType)}
                      {j.assignedCleanerName ? ` · ${j.assignedCleanerName}` : ""}
                      {j.price != null ? ` · $${j.price}` : ""}
                      {j.actualDurationMinutes != null ? ` · ${j.actualDurationMinutes} min` : ""}
                    </div>
                  </div>
                  <Badge variant={statusBadgeVariant(j.status)}>{statusLabel(j.status)}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
