export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  neighborhood: string;
  service: string;
  serviceLabel: string;
  homeType: string;
  bedrooms: number;
  frequency: string;
  date: string;
  timeWindow: string;
  addOns: string[];
  price: number;
  status: BookingStatus;
  createdAt: string;
  notes?: string;
}

export function getStats(bookings: Booking[]) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const weekEnd = new Date(now);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const thisMonth = bookings.filter((b) => new Date(b.date) >= monthStart);
  const upcoming = bookings.filter(
    (b) => new Date(b.date) >= now && (b.status === "confirmed" || b.status === "pending")
  );
  const thisWeek = upcoming.filter((b) => new Date(b.date) <= weekEnd);
  const recurring = bookings.filter((b) => b.frequency !== "one-time");

  const revenue = thisMonth
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.price, 0);

  const byService: Record<string, number> = {};
  bookings.forEach((b) => { byService[b.serviceLabel] = (byService[b.serviceLabel] ?? 0) + 1; });

  const byNeighborhood: Record<string, number> = {};
  bookings.forEach((b) => { byNeighborhood[b.neighborhood] = (byNeighborhood[b.neighborhood] ?? 0) + 1; });

  return {
    totalRevenue: revenue,
    totalBookings: thisMonth.length,
    upcomingThisWeek: thisWeek.length,
    recurringClients: recurring.length,
    byService,
    byNeighborhood,
  };
}

// Maps a Supabase DB row (snake_case) to the Booking interface (camelCase)
export function rowToBooking(row: Record<string, unknown>): Booking {
  return {
    id: row.id as string,
    customerName: row.customer_name as string,
    email: row.email as string,
    phone: row.phone as string,
    address: row.address as string,
    neighborhood: (row.neighborhood as string) ?? "",
    service: row.service as string,
    serviceLabel: row.service_label as string,
    homeType: (row.home_type as string) ?? "",
    bedrooms: (row.bedrooms as number) ?? 0,
    frequency: (row.frequency as string) ?? "one-time",
    date: row.date as string,
    timeWindow: (row.time_window as string) ?? "no-preference",
    addOns: (row.add_ons as string[]) ?? [],
    price: row.price as number,
    status: row.status as BookingStatus,
    createdAt: row.created_at as string,
    notes: row.notes as string | undefined,
  };
}

export const SERVICE_LABELS: Record<string, string> = {
  standard: "Standard Clean",
  deep: "Deep Clean",
  moveinout: "Move-In/Out",
  airbnb: "Airbnb Turnover",
};
