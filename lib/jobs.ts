export type JobServiceType =
  | "standard"
  | "deep"
  | "move_in"
  | "move_out"
  | "airbnb"
  | "commercial"
  | "post_construction";

export type JobStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show";

export interface Job {
  id: string;
  clientId: string;
  clientName?: string | null;
  assignedCleanerId: string | null;
  assignedCleanerName?: string | null;
  parentJobId: string | null;
  serviceType: JobServiceType;
  status: JobStatus;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTimeStart: string; // HH:MM:SS
  scheduledTimeEnd: string;
  actualStartTime: string | null;
  actualEndTime: string | null;
  actualDurationMinutes: number | null;
  price: number | null;
  notes: string | null;
  recurring: boolean;
  recurrenceRule: string | null;
  googleEventId: string | null;
  reminderSentAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export function rowToJob(row: Record<string, unknown>): Job {
  const client = row.clients as { name?: string } | undefined;
  const cleaner = row.cleaners as { name?: string } | undefined;
  return {
    id: row.id as string,
    clientId: row.client_id as string,
    clientName: client?.name ?? null,
    assignedCleanerId: (row.assigned_cleaner_id as string) ?? null,
    assignedCleanerName: cleaner?.name ?? null,
    parentJobId: (row.parent_job_id as string) ?? null,
    serviceType: row.service_type as JobServiceType,
    status: row.status as JobStatus,
    scheduledDate: row.scheduled_date as string,
    scheduledTimeStart: row.scheduled_time_start as string,
    scheduledTimeEnd: row.scheduled_time_end as string,
    actualStartTime: (row.actual_start_time as string) ?? null,
    actualEndTime: (row.actual_end_time as string) ?? null,
    actualDurationMinutes: (row.actual_duration_minutes as number) ?? null,
    price: (row.price as number) ?? null,
    notes: (row.notes as string) ?? null,
    recurring: (row.recurring as boolean) ?? false,
    recurrenceRule: (row.recurrence_rule as string) ?? null,
    googleEventId: (row.google_event_id as string) ?? null,
    reminderSentAt: (row.reminder_sent_at as string) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export interface JobInput {
  client_id: string;
  assigned_cleaner_id?: string | null;
  service_type: JobServiceType;
  status?: JobStatus;
  scheduled_date: string;
  scheduled_time_start: string;
  scheduled_time_end: string;
  price?: number | null;
  notes?: string | null;
  recurring?: boolean;
  recurrence_rule?: string | null;
}

export const SERVICE_TYPES: { value: JobServiceType; label: string }[] = [
  { value: "standard", label: "Standard Clean" },
  { value: "deep", label: "Deep Clean" },
  { value: "move_in", label: "Move-In" },
  { value: "move_out", label: "Move-Out" },
  { value: "airbnb", label: "Airbnb Turnover" },
  { value: "commercial", label: "Commercial" },
  { value: "post_construction", label: "Post-Construction" },
];

export const JOB_STATUSES: { value: JobStatus; label: string }[] = [
  { value: "scheduled", label: "Scheduled" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no_show", label: "No-show" },
];

export function serviceTypeLabel(t: JobServiceType): string {
  return SERVICE_TYPES.find((s) => s.value === t)?.label ?? t;
}

export function statusLabel(s: JobStatus): string {
  return JOB_STATUSES.find((x) => x.value === s)?.label ?? s;
}

export function statusBadgeVariant(s: JobStatus) {
  switch (s) {
    case "scheduled":
      return "default" as const;
    case "in_progress":
      return "warning" as const;
    case "completed":
      return "success" as const;
    case "cancelled":
    case "no_show":
      return "destructive" as const;
  }
}

export function formatTime(t: string): string {
  // "14:30:00" → "2:30 PM"
  const [h, m] = t.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
