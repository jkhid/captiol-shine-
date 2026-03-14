"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  selected: string; // YYYY-MM-DD
  onChange: (date: string) => void;
  disablePast?: boolean;
  disableSundays?: boolean;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function Calendar({
  selected,
  onChange,
  disablePast = true,
  disableSundays = true,
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const days = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    // Sunday = 0, Saturday = 6
    const startDow = firstDay.getDay();

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [];

    // Leading blanks
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return cells;
  }, [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-semibold text-navy">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-charcoal/40 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day, i) => {
          if (day === null) {
            return <div key={`blank-${i}`} />;
          }

          const dateStr = toDateStr(viewYear, viewMonth, day);
          const dateObj = new Date(viewYear, viewMonth, day);
          const isSunday = dateObj.getDay() === 0;
          const isPast = disablePast && dateStr < todayStr;
          const isDisabled = isPast || (disableSundays && isSunday);
          const isSelected = dateStr === selected;
          const isToday = dateStr === todayStr;

          return (
            <button
              key={dateStr}
              disabled={isDisabled}
              onClick={() => onChange(dateStr)}
              className={`
                h-9 w-full rounded-lg text-sm font-medium transition-all
                ${isSelected
                  ? "bg-gold text-navy shadow-sm"
                  : isToday
                    ? "bg-navy/5 text-navy hover:bg-navy/10"
                    : isDisabled
                      ? "text-charcoal/20 cursor-not-allowed"
                      : "text-charcoal hover:bg-gray-100"
                }
              `}
              aria-label={`${MONTHS[viewMonth]} ${day}, ${viewYear}${isSunday ? " (unavailable)" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      {disableSundays && (
        <p className="mt-3 text-xs text-charcoal/40 text-center">
          Sundays are unavailable
        </p>
      )}
    </div>
  );
}
