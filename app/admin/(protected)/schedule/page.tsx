"use client";

import { useState, useEffect } from "react";
import { type Booking, type BookingStatus } from "@/lib/bookings";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const SERVICE_COLORS: Record<string, string> = {
  "Standard Clean": "bg-navy/10 border-navy/30 text-navy",
  "Deep Clean": "bg-gold/10 border-gold/40 text-yellow-800",
  "Move-Out": "bg-purple-100 border-purple-300 text-purple-800",
  "Move-In": "bg-purple-100 border-purple-300 text-purple-800",
  "Move-In/Out": "bg-purple-100 border-purple-300 text-purple-800",
  "Airbnb Turnover": "bg-cta-green/10 border-cta-green/30 text-cta-green",
};

const STATUS_DOT: Record<BookingStatus, string> = {
  pending: "bg-yellow-400",
  confirmed: "bg-cta-green",
  completed: "bg-gray-400",
  cancelled: "bg-red-400",
};

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getWeekDates(anchor: Date): Date[] {
  const d = new Date(anchor);
  d.setDate(d.getDate() - d.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(d);
    day.setDate(d.getDate() + i);
    return day;
  });
}

function getMonthCells(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

function buildDayMap(bookings: Booking[]): Record<string, Booking[]> {
  const map: Record<string, Booking[]> = {};
  bookings.forEach((b) => {
    if (!map[b.date]) map[b.date] = [];
    map[b.date].push(b);
  });
  return map;
}

function BookingChip({ b, compact = false }: { b: Booking; compact?: boolean }) {
  return (
    <div
      className={`rounded border px-1.5 py-1 text-xs leading-snug truncate ${
        SERVICE_COLORS[b.serviceLabel] ?? "bg-gray-100 border-gray-300 text-charcoal"
      }`}
    >
      <div className="flex items-center gap-1">
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_DOT[b.status]}`} />
        <span className="font-semibold truncate">{b.customerName.split(" ")[0]}</span>
        {!compact && <span className="opacity-60 truncate hidden sm:inline">— {b.serviceLabel}</span>}
      </div>
    </div>
  );
}

// ── Week view ────────────────────────────────────────────────────────────────

function WeekView({
  anchor,
  setAnchor,
  allByDay,
  today,
}: {
  anchor: Date;
  setAnchor: (d: Date) => void;
  allByDay: Record<string, Booking[]>;
  today: string;
}) {
  const week = getWeekDates(anchor);

  const shiftWeek = (dir: 1 | -1) => {
    const d = new Date(anchor);
    d.setDate(d.getDate() + dir * 7);
    setAnchor(d);
  };

  const weekStart = MONTHS[week[0].getMonth()];
  const weekEnd   = MONTHS[week[6].getMonth()];
  const label =
    weekStart === weekEnd
      ? `${weekStart} ${week[0].getFullYear()}`
      : `${weekStart} – ${weekEnd} ${week[6].getFullYear()}`;

  const totalBookings = week.flatMap((d) => allByDay[toISO(d)] ?? []).length;
  const totalRevenue  = week
    .flatMap((d) => allByDay[toISO(d)] ?? [])
    .filter((b) => b.status !== "cancelled")
    .reduce((s, b) => s + b.price, 0);

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <button onClick={() => shiftWeek(-1)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Previous week">
          <ChevronLeft size={18} />
        </button>
        <div className="text-center">
          <div className="text-sm font-semibold text-navy">{label}</div>
          <div className="text-xs text-charcoal/40 mt-0.5">{totalBookings} bookings · ${totalRevenue.toLocaleString()}</div>
        </div>
        <button onClick={() => shiftWeek(1)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Next week">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 divide-x divide-gray-100">
        {week.map((day, i) => {
          const iso = toISO(day);
          const dayBookings = allByDay[iso] ?? [];
          const isToday = iso === today;

          return (
            <div key={iso} className="min-h-[220px] flex flex-col">
              <div className={`px-2 py-2 text-center border-b border-gray-100 ${isToday ? "bg-navy/5" : ""}`}>
                <div className="text-xs text-charcoal/40">{DAYS_SHORT[i]}</div>
                <div className={`text-sm font-bold mt-0.5 ${isToday ? "text-navy" : "text-charcoal"}`}>
                  {day.getDate()}
                </div>
              </div>
              <div className="flex-1 p-1.5 space-y-1.5">
                {dayBookings.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <span className="text-xs text-charcoal/20">—</span>
                  </div>
                ) : (
                  dayBookings.map((b) => (
                    <div key={b.id} className={`rounded-md border px-2 py-1.5 text-xs leading-snug ${
                      SERVICE_COLORS[b.serviceLabel] ?? "bg-gray-100 border-gray-300 text-charcoal"
                    }`}>
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_DOT[b.status]}`} />
                        <span className="font-semibold truncate">{b.customerName.split(" ")[0]}</span>
                      </div>
                      <div className="truncate opacity-70">{b.serviceLabel}</div>
                      <div className="flex items-center gap-1 opacity-60 mt-0.5">
                        <Clock size={10} />
                        <span className="capitalize">{b.timeWindow.replace("-", " ")}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ── Month view ───────────────────────────────────────────────────────────────

function MonthView({
  year,
  month,
  setYearMonth,
  allByDay,
  bookings,
  today,
}: {
  year: number;
  month: number;
  setYearMonth: (y: number, m: number) => void;
  allByDay: Record<string, Booking[]>;
  bookings: Booking[];
  today: string;
}) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const cells = getMonthCells(year, month);

  const shiftMonth = (dir: 1 | -1) => {
    let m = month + dir;
    let y = year;
    if (m > 11) { m = 0; y++; }
    if (m < 0)  { m = 11; y--; }
    setYearMonth(y, m);
    setSelectedDay(null);
  };

  const monthBookings = bookings.filter((b) => {
    const [y, m] = b.date.split("-").map(Number);
    return y === year && m - 1 === month;
  });
  const monthRevenue = monthBookings
    .filter((b) => b.status !== "cancelled")
    .reduce((s, b) => s + b.price, 0);

  const selectedBookings = selectedDay ? (allByDay[selectedDay] ?? []) : [];

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <button onClick={() => shiftMonth(-1)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Previous month">
          <ChevronLeft size={18} />
        </button>
        <div className="text-center">
          <div className="text-sm font-semibold text-navy">{MONTHS[month]} {year}</div>
          <div className="text-xs text-charcoal/40 mt-0.5">{monthBookings.length} bookings · ${monthRevenue.toLocaleString()}</div>
        </div>
        <button onClick={() => shiftMonth(1)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Next month">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {DAYS_SHORT.map((d) => (
          <div key={d} className="text-center text-xs text-charcoal/40 py-2">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 divide-x divide-y divide-gray-100">
        {cells.map((day, i) => {
          if (!day) return <div key={`blank-${i}`} className="min-h-[90px] bg-gray-50/50" />;

          const iso = toISO(day);
          const dayBookings = allByDay[iso] ?? [];
          const isToday = iso === today;
          const isSelected = iso === selectedDay;
          const overflow = dayBookings.length > 2;

          return (
            <div
              key={iso}
              onClick={() => setSelectedDay(iso === selectedDay ? null : iso)}
              className={`min-h-[90px] p-1.5 flex flex-col cursor-pointer transition-colors ${
                isSelected ? "bg-navy/5 ring-1 ring-inset ring-navy/20" :
                isToday    ? "bg-gold/5" : "hover:bg-gray-50"
              }`}
            >
              <div className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full mb-1 ${
                isToday ? "bg-navy text-white" : "text-charcoal/60"
              }`}>
                {day.getDate()}
              </div>
              <div className="space-y-0.5 flex-1">
                {dayBookings.slice(0, 2).map((b) => (
                  <BookingChip key={b.id} b={b} compact />
                ))}
                {overflow && (
                  <div className="text-xs text-charcoal/40 pl-1">+{dayBookings.length - 2} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected day detail panel */}
      {selectedDay && (
        <div className="border-t border-gray-100 px-6 py-4">
          <h3 className="text-sm font-semibold text-navy mb-3">
            {new Date(selectedDay + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            <span className="ml-2 text-charcoal/40 font-normal">({selectedBookings.length} booking{selectedBookings.length !== 1 ? "s" : ""})</span>
          </h3>
          {selectedBookings.length === 0 ? (
            <p className="text-sm text-charcoal/40">No bookings on this day.</p>
          ) : (
            <div className="space-y-2">
              {selectedBookings.map((b) => (
                <div key={b.id} className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 text-sm">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[b.status]}`} />
                      <span className="font-semibold text-navy">{b.customerName}</span>
                      <span className={`px-1.5 py-0.5 rounded text-xs capitalize ${
                        b.status === "confirmed" ? "bg-green-100 text-green-700" :
                        b.status === "pending"   ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-500"
                      }`}>{b.status}</span>
                    </div>
                    <div className="text-charcoal/60 mt-0.5">{b.serviceLabel} · {b.neighborhood}</div>
                    <div className="text-charcoal/40 text-xs mt-0.5 capitalize flex items-center gap-1">
                      <Clock size={10} /> {b.timeWindow.replace("-", " ")}
                    </div>
                  </div>
                  <div className="text-navy font-bold flex-shrink-0">${b.price}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SchedulePage() {
  const now = new Date();
  const today = toISO(now);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"week" | "month">("month");
  const [anchor, setAnchor] = useState(now);
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((r) => r.json())
      .then((data) => { setBookings(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const allByDay = buildDayMap(bookings);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-navy">Schedule</h1>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
          {(["week", "month"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 capitalize transition-colors ${
                view === v ? "bg-navy text-white" : "bg-white text-charcoal/60 hover:bg-gray-50"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-charcoal/40 text-sm">Loading schedule...</div>
        ) : view === "week" ? (
          <WeekView anchor={anchor} setAnchor={setAnchor} allByDay={allByDay} today={today} />
        ) : (
          <MonthView
            year={viewYear}
            month={viewMonth}
            setYearMonth={(y, m) => { setViewYear(y); setViewMonth(m); }}
            allByDay={allByDay}
            bookings={bookings}
            today={today}
          />
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        {Object.entries(SERVICE_COLORS).map(([label, cls]) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded border ${cls}`} />
            <span className="text-charcoal/60">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-3 ml-4">
          {Object.entries(STATUS_DOT).map(([status, cls]) => (
            <div key={status} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${cls}`} />
              <span className="text-charcoal/60 capitalize">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
