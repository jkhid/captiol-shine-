"use client";

import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import type { EventClickArg, EventInput, EventDropArg, EventContentArg } from "@fullcalendar/core";
import type { Job } from "@/lib/jobs";
import { serviceTypeLabel } from "@/lib/jobs";
import { JobDialog } from "./JobDialog";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

const SERVICE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  standard:          { bg: "#EEF2FF", border: "#6366f1", text: "#3730a3" },
  deep:              { bg: "#F0FDFA", border: "#14b8a6", text: "#0f766e" },
  move_in:           { bg: "#FFF7ED", border: "#f97316", text: "#9a3412" },
  move_out:          { bg: "#FEF3C7", border: "#f59e0b", text: "#92400e" },
  airbnb:            { bg: "#FFF1F2", border: "#f43f5e", text: "#9f1239" },
  commercial:        { bg: "#E8EDF7", border: "#1B2A4A", text: "#1B2A4A" },
  post_construction: { bg: "#F5F3FF", border: "#8b5cf6", text: "#5b21b6" },
};

const STATUS_ICON: Record<string, string> = {
  in_progress: "⏳",
  completed: "✓",
  cancelled: "✗",
  no_show: "⊘",
};

function jobToEvent(j: Job): EventInput {
  const start = `${j.scheduledDate}T${j.scheduledTimeStart}`;
  const end = `${j.scheduledDate}T${j.scheduledTimeEnd}`;
  const c = SERVICE_COLORS[j.serviceType] ?? SERVICE_COLORS.standard;
  const statusIcon = STATUS_ICON[j.status] ?? "";
  const price = j.price != null ? ` · $${j.price}` : "";

  const base: EventInput = {
    id: j.id,
    title: `${statusIcon ? statusIcon + " " : ""}${j.clientName ?? "—"} · ${serviceTypeLabel(j.serviceType)}${price}`,
    extendedProps: { job: j },
    backgroundColor: c.bg,
    borderColor: c.border,
    textColor: c.text,
    classNames: [
      "cs-event",
      `cs-status-${j.status}`,
      j.recurring ? "cs-recurring" : "",
    ].filter(Boolean),
  };

  if (j.recurring && j.recurrenceRule) {
    // e.g. "FREQ=WEEKLY;INTERVAL=2"
    return {
      ...base,
      rrule: {
        freq: j.recurrenceRule.includes("MONTHLY") ? "monthly" : "weekly",
        interval: j.recurrenceRule.includes("INTERVAL=2") ? 2 : 1,
        dtstart: start,
      },
      duration: diffDuration(j.scheduledTimeStart, j.scheduledTimeEnd),
    };
  }

  return { ...base, start, end };
}

function diffDuration(startT: string, endT: string) {
  const [sh, sm] = startT.split(":").map(Number);
  const [eh, em] = endT.split(":").map(Number);
  const mins = eh * 60 + em - (sh * 60 + sm);
  const hh = Math.floor(mins / 60);
  const mm = mins % 60;
  return { hours: hh, minutes: mm };
}

function renderEvent(arg: EventContentArg) {
  const j = arg.event.extendedProps.job as Job | undefined;
  const time = arg.timeText;
  const statusIcon = j ? (STATUS_ICON[j.status] ?? "") : "";
  const price = j?.price != null ? `$${j.price}` : "";

  return (
    <div className="cs-event-inner">
      <div className="cs-event-line1">
        {statusIcon && <span className="cs-event-status">{statusIcon}</span>}
        {time && <span className="cs-event-time">{time}</span>}
        <span className="cs-event-client">{j?.clientName ?? "—"}</span>
      </div>
      <div className="cs-event-line2">
        {j && <span>{serviceTypeLabel(j.serviceType)}</span>}
        {price && <span className="cs-event-price">{price}</span>}
      </div>
    </div>
  );
}

export function CalendarView() {
  const calRef = useRef<FullCalendar | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editJob, setEditJob] = useState<Job | undefined>();
  const [defaultDate, setDefaultDate] = useState<string | undefined>();

  const load = async () => {
    const res = await fetch("/api/admin/jobs", { cache: "no-store" });
    if (res.ok) setJobs(await res.json());
  };

  useEffect(() => {
    load();
    const supabase = createSupabaseBrowserClient();
    const channel = supabase
      .channel("jobs-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "jobs" }, () => load())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleEventClick = (info: EventClickArg) => {
    const j = info.event.extendedProps.job as Job;
    setEditJob(j);
    setDefaultDate(undefined);
    setDialogOpen(true);
  };

  const handleDateClick = (info: DateClickArg) => {
    setEditJob(undefined);
    setDefaultDate(info.dateStr.slice(0, 10));
    setDialogOpen(true);
  };

  const handleEventDrop = async (info: EventDropArg) => {
    const j = info.event.extendedProps.job as Job;
    if (j.recurring) {
      info.revert();
      alert("Edit the job to reschedule a recurring series.");
      return;
    }
    const start = info.event.start;
    const end = info.event.end;
    if (!start) return;

    const pad = (n: number) => n.toString().padStart(2, "0");
    const date = `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`;
    const startTime = `${pad(start.getHours())}:${pad(start.getMinutes())}:00`;
    const endTime = end
      ? `${pad(end.getHours())}:${pad(end.getMinutes())}:00`
      : j.scheduledTimeEnd;

    const res = await fetch(`/api/admin/jobs/${j.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scheduled_date: date,
        scheduled_time_start: startTime,
        scheduled_time_end: endTime,
      }),
    });
    if (!res.ok) {
      info.revert();
      alert("Failed to reschedule.");
    } else {
      load();
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 fc-admin">
        <FullCalendar
          ref={calRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{ today: "Today", month: "Month", week: "Week", day: "Day" }}
          buttonIcons={{ prev: "chevron-left", next: "chevron-right" }}
          height="78vh"
          events={jobs.map(jobToEvent)}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          eventDrop={handleEventDrop}
          eventDisplay="block"
          eventContent={renderEvent}
          editable
          nowIndicator
          dayMaxEvents={3}
          slotMinTime="06:00:00"
          slotMaxTime="22:00:00"
          eventTimeFormat={{ hour: "numeric", minute: "2-digit", meridiem: "short" }}
          displayEventEnd={false}
        />
      </div>

      <JobDialog
        open={dialogOpen}
        onOpenChange={(v) => {
          setDialogOpen(v);
          if (!v) load();
        }}
        job={editJob}
        defaultDate={defaultDate}
      />
    </>
  );
}
