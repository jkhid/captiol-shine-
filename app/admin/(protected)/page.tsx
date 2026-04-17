import Link from "next/link";
import { createAdminClient } from "@/lib/supabase";
import { rowToJob, statusBadgeVariant, statusLabel, formatTime, serviceTypeLabel } from "@/lib/jobs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Badge } from "@/components/admin/ui/badge";
import {
  CalendarDays,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Sparkles,
  Clock,
} from "lucide-react";
import { IntakeQueue } from "@/components/admin/IntakeQueue";

export const dynamic = "force-dynamic";

function ymd(d: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [{ data: todayRows }, { data: weekRows }, { data: monthRows }, { data: leads }] = await Promise.all([
    supabase
      .from("jobs")
      .select("*, clients(name), cleaners(name)")
      .eq("scheduled_date", ymd(today))
      .order("scheduled_time_start"),
    supabase
      .from("jobs")
      .select("id, status")
      .gte("scheduled_date", ymd(today))
      .lte("scheduled_date", ymd(weekEnd))
      .neq("status", "cancelled"),
    supabase
      .from("jobs")
      .select("id, status, service_type, price, actual_duration_minutes")
      .gte("scheduled_date", ymd(monthStart))
      .lte("scheduled_date", ymd(monthEnd)),
    supabase
      .from("leads")
      .select("id, name, email, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const todayJobs = (todayRows ?? []).map(rowToJob);
  const upcomingThisWeek = (weekRows ?? []).length;

  const monthJobs = monthRows ?? [];
  const completedThisMonth = monthJobs.filter((j) => j.status === "completed").length;
  const revenueThisMonth = monthJobs
    .filter((j) => j.status === "completed")
    .reduce((sum, j) => sum + (Number(j.price) || 0), 0);
  const projectedRevenue = monthJobs
    .filter((j) => j.status !== "cancelled" && j.status !== "no_show")
    .reduce((sum, j) => sum + (Number(j.price) || 0), 0);

  // Avg duration by service type from completed jobs (use actual when available, else scheduled fallback skipped)
  const durationsByService: Record<string, number[]> = {};
  for (const j of monthJobs) {
    if (j.status === "completed" && j.actual_duration_minutes) {
      const k = j.service_type;
      (durationsByService[k] ||= []).push(j.actual_duration_minutes);
    }
  }
  const avgDurations = Object.entries(durationsByService)
    .map(([k, arr]) => ({ service: k, avg: Math.round(arr.reduce((a, b) => a + b, 0) / arr.length), count: arr.length }))
    .sort((a, b) => b.count - a.count);

  const cards = [
    { label: "Today's jobs", value: todayJobs.length, icon: CalendarDays, color: "text-navy", bg: "bg-navy/10" },
    { label: "Upcoming this week", value: upcomingThisWeek, icon: TrendingUp, color: "text-gold", bg: "bg-gold/10" },
    { label: "Completed this month", value: completedThisMonth, icon: CheckCircle2, color: "text-cta-green", bg: "bg-cta-green/10" },
    { label: "Revenue this month", value: `$${revenueThisMonth.toLocaleString()}`, icon: DollarSign, color: "text-cta-green", bg: "bg-cta-green/10" },
    { label: "Projected this month", value: `$${projectedRevenue.toLocaleString()}`, icon: DollarSign, color: "text-gold", bg: "bg-gold/10" },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">{greeting}</h1>
        <p className="text-sm text-charcoal/50 mt-0.5">
          {new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div className="text-2xl font-bold text-navy">{s.value}</div>
            <div className="text-xs text-charcoal/50 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Today&apos;s schedule</CardTitle>
            <Link href="/admin/calendar" className="text-sm text-gold hover:underline">View calendar</Link>
          </CardHeader>
          <CardContent>
            {todayJobs.length === 0 ? (
              <p className="text-sm text-charcoal/50">No jobs scheduled today.</p>
            ) : (
              <ul className="space-y-2">
                {todayJobs.map((j) => {
                  const borderMap: Record<string, string> = {
                    scheduled: "border-l-navy",
                    in_progress: "border-l-amber-400",
                    completed: "border-l-green-500",
                    cancelled: "border-l-gray-300",
                    no_show: "border-l-red-400",
                  };
                  return (
                    <li key={j.id} className={`border-l-[3px] ${borderMap[j.status] ?? "border-l-gray-200"} rounded-lg bg-gray-50/50 hover:bg-gray-50 px-4 py-3 flex items-center justify-between gap-4 transition-colors`}>
                      <div className="min-w-0">
                        <Link href={`/admin/jobs/${j.id}`} className="font-medium text-navy hover:underline">
                          {formatTime(j.scheduledTimeStart)} · {j.clientName ?? "—"}
                        </Link>
                        <div className="text-xs text-charcoal/60 mt-0.5">
                          {serviceTypeLabel(j.serviceType)}
                          {j.assignedCleanerName ? ` · ${j.assignedCleanerName}` : ""}
                        </div>
                      </div>
                      <Badge variant={statusBadgeVariant(j.status)}>{statusLabel(j.status)}</Badge>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Sparkles size={16} className="text-gold" /> Recent leads</CardTitle>
            <Link href="/admin/leads" className="text-sm text-gold hover:underline">All</Link>
          </CardHeader>
          <CardContent>
            {!leads || leads.length === 0 ? (
              <p className="text-sm text-charcoal/50">No leads yet.</p>
            ) : (
              <ul className="space-y-3">
                {leads.map((l) => (
                  <li key={l.id} className="text-sm">
                    <div className="font-medium text-navy">{l.name}</div>
                    <div className="text-xs text-charcoal/60 truncate">{l.email}</div>
                    <div className="text-[11px] text-charcoal/40 mt-0.5">
                      {new Date(l.created_at).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <IntakeQueue />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Clock size={16} className="text-charcoal/50" /> Average duration by service (this month)</CardTitle>
        </CardHeader>
        <CardContent>
          {avgDurations.length === 0 ? (
            <p className="text-sm text-charcoal/50">No completed jobs with tracked time yet — start/end jobs to populate benchmarks.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {avgDurations.map((d) => (
                <div key={d.service} className="rounded-lg border border-gray-100 p-4">
                  <div className="text-xs text-charcoal/50 uppercase tracking-wide mb-1">
                    {serviceTypeLabel(d.service as Parameters<typeof serviceTypeLabel>[0])}
                  </div>
                  <div className="text-2xl font-bold text-navy">{d.avg} min</div>
                  <div className="text-[11px] text-charcoal/40 mt-0.5">across {d.count} job{d.count === 1 ? "" : "s"}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
