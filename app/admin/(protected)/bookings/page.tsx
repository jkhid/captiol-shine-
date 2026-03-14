"use client";

import { useState, useEffect } from "react";
import { type Booking, type BookingStatus } from "@/lib/bookings";
import { Search, ChevronDown } from "lucide-react";

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-700",
};

const ALL_STATUSES: (BookingStatus | "all")[] = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((r) => r.json())
      .then((data) => { setBookings(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const filtered = bookings
    .filter((b) => filter === "all" || b.status === filter)
    .filter(
      (b) =>
        !search ||
        b.customerName.toLowerCase().includes(search.toLowerCase()) ||
        b.neighborhood.toLowerCase().includes(search.toLowerCase()) ||
        b.serviceLabel.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const counts = ALL_STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = s === "all" ? bookings.length : bookings.filter((b) => b.status === s).length;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-navy">Bookings</h1>
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
          <p className="text-charcoal/40 text-sm">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-navy">Bookings</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search by name, neighborhood, service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize ${
                filter === s
                  ? "bg-navy text-white"
                  : "bg-white border border-gray-200 text-charcoal/60 hover:border-gray-300"
              }`}
            >
              {s} <span className="opacity-60">({counts[s]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-charcoal/40 uppercase tracking-wide">
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-charcoal/40">
                    No bookings found.
                  </td>
                </tr>
              )}
              {filtered.map((b) => (
                <>
                  <tr
                    key={b.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                  >
                    <td className="px-6 py-3">
                      <div className="font-medium text-charcoal">{b.customerName}</div>
                      <div className="text-xs text-charcoal/40">{b.neighborhood}</div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="text-charcoal/70">{b.serviceLabel}</div>
                      <div className="text-xs text-charcoal/40 capitalize">{b.frequency.replace("-", " ")}</div>
                    </td>
                    <td className="px-6 py-3 text-charcoal/70">{b.date}</td>
                    <td className="px-6 py-3 text-charcoal/70 capitalize">
                      {b.timeWindow.replace("-", " ")}
                    </td>
                    <td className="px-6 py-3 font-semibold text-navy">${b.price}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[b.status]}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        {b.status === "pending" && (
                          <button
                            onClick={(e) => { e.stopPropagation(); updateStatus(b.id, "confirmed"); }}
                            className="px-3 py-1 rounded-md bg-cta-green text-white text-xs font-medium hover:bg-cta-green/90 transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                        {b.status === "confirmed" && (
                          <button
                            onClick={(e) => { e.stopPropagation(); updateStatus(b.id, "completed"); }}
                            className="px-3 py-1 rounded-md bg-navy text-white text-xs font-medium hover:bg-navy/90 transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        <ChevronDown
                          size={14}
                          className={`text-charcoal/30 transition-transform ${expanded === b.id ? "rotate-180" : ""}`}
                        />
                      </div>
                    </td>
                  </tr>
                  {expanded === b.id && (
                    <tr key={`${b.id}-expanded`} className="bg-gray-50">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-xs text-charcoal/40 mb-0.5">Email</div>
                            <a href={`mailto:${b.email}`} className="text-navy hover:underline">{b.email}</a>
                          </div>
                          <div>
                            <div className="text-xs text-charcoal/40 mb-0.5">Phone</div>
                            <a href={`tel:${b.phone}`} className="text-navy hover:underline">{b.phone}</a>
                          </div>
                          <div>
                            <div className="text-xs text-charcoal/40 mb-0.5">Address</div>
                            <span>{b.address}</span>
                          </div>
                          <div>
                            <div className="text-xs text-charcoal/40 mb-0.5">Home</div>
                            <span>{b.homeType}, {b.bedrooms} BR</span>
                          </div>
                          {b.addOns.length > 0 && (
                            <div className="col-span-2">
                              <div className="text-xs text-charcoal/40 mb-0.5">Add-Ons</div>
                              <span>{b.addOns.join(", ")}</span>
                            </div>
                          )}
                          {b.notes && (
                            <div className="col-span-2 sm:col-span-4">
                              <div className="text-xs text-charcoal/40 mb-0.5">Notes</div>
                              <span className="text-charcoal/70 italic">{b.notes}</span>
                            </div>
                          )}
                        </div>
                        {b.status === "pending" && (
                          <div className="mt-4 flex gap-2">
                            <button
                              onClick={() => updateStatus(b.id, "confirmed")}
                              className="px-4 py-1.5 rounded-lg bg-cta-green text-white text-xs font-medium hover:bg-cta-green/90 transition-colors"
                            >
                              Confirm Booking
                            </button>
                            <button
                              onClick={() => updateStatus(b.id, "cancelled")}
                              className="px-4 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
