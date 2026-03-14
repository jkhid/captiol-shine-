import { createAdminClient } from "@/lib/supabase";
import { rowToBooking, getStats } from "@/lib/bookings";
import type { Booking } from "@/lib/bookings";
import { DollarSign, CalendarCheck, Repeat, TrendingUp } from "lucide-react";
import Link from "next/link";

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AdminDashboard() {
  let bookings: Booking[] = [];
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("bookings").select("*");
    bookings = (data ?? []).map(rowToBooking);
  } catch {
    // Table may not be created yet or service role key not configured
  }

  const stats = getStats(bookings);

  const statCards = [
    {
      label: "Revenue This Month",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-cta-green",
      bg: "bg-cta-green/10",
    },
    {
      label: "Bookings This Month",
      value: stats.totalBookings,
      icon: CalendarCheck,
      color: "text-navy",
      bg: "bg-navy/10",
    },
    {
      label: "Upcoming This Week",
      value: stats.upcomingThisWeek,
      icon: TrendingUp,
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      label: "Recurring Clients",
      value: stats.recurringClients,
      icon: Repeat,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  const maxService = Math.max(1, ...Object.values(stats.byService));
  const maxNeighborhood = Math.max(1, ...Object.values(stats.byNeighborhood));
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-bold text-navy">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div className="text-2xl font-bold text-navy">{s.value}</div>
            <div className="text-xs text-charcoal/50 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By service */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-semibold text-navy mb-5">Bookings by Service</h2>
          <div className="space-y-3">
            {Object.entries(stats.byService).map(([label, count]) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-charcoal/70">{label}</span>
                  <span className="font-semibold text-navy">{count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-navy rounded-full transition-all"
                    style={{ width: `${(count / maxService) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By neighborhood */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-semibold text-navy mb-5">Top Neighborhoods</h2>
          <div className="space-y-3">
            {Object.entries(stats.byNeighborhood)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 6)
              .map(([name, count]) => (
                <div key={name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-charcoal/70">{name}</span>
                    <span className="font-semibold text-navy">{count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full transition-all"
                      style={{ width: `${(count / maxNeighborhood) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-navy">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-sm text-gold hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-charcoal/40 uppercase tracking-wide">
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="font-medium text-charcoal">{b.customerName}</div>
                    <div className="text-xs text-charcoal/40">{b.neighborhood}</div>
                  </td>
                  <td className="px-6 py-3 text-charcoal/70">{b.serviceLabel}</td>
                  <td className="px-6 py-3 text-charcoal/70">{b.date}</td>
                  <td className="px-6 py-3 font-semibold text-navy">${b.price}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
