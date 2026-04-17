"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Job } from "@/lib/jobs";
import { SERVICE_TYPES, JOB_STATUSES } from "@/lib/jobs";
import type { Client } from "@/lib/clients";
import type { Cleaner } from "@/lib/cleaners";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Textarea } from "@/components/admin/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/admin/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  job?: Job;
  defaultClientId?: string;
  defaultDate?: string;
  onSaved?: (job: Job) => void;
}

const selectCls =
  "flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40";

export function JobDialog({ open, onOpenChange, job, defaultClientId, defaultDate, onSaved }: Props) {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    client_id: job?.clientId ?? defaultClientId ?? "",
    assigned_cleaner_id: job?.assignedCleanerId ?? "",
    service_type: job?.serviceType ?? "standard",
    status: job?.status ?? "scheduled",
    scheduled_date: job?.scheduledDate ?? defaultDate ?? "",
    scheduled_time_start: job?.scheduledTimeStart?.slice(0, 5) ?? "09:00",
    scheduled_time_end: job?.scheduledTimeEnd?.slice(0, 5) ?? "12:00",
    price: job?.price?.toString() ?? "",
    notes: job?.notes ?? "",
    recurring: job?.recurring ?? false,
    recurrence_rule: job?.recurrenceRule ?? "",
  });

  useEffect(() => {
    if (!open) return;
    setForm({
      client_id: job?.clientId ?? defaultClientId ?? "",
      assigned_cleaner_id: job?.assignedCleanerId ?? "",
      service_type: job?.serviceType ?? "standard",
      status: job?.status ?? "scheduled",
      scheduled_date: job?.scheduledDate ?? defaultDate ?? "",
      scheduled_time_start: job?.scheduledTimeStart?.slice(0, 5) ?? "09:00",
      scheduled_time_end: job?.scheduledTimeEnd?.slice(0, 5) ?? "12:00",
      price: job?.price?.toString() ?? "",
      notes: job?.notes ?? "",
      recurring: job?.recurring ?? false,
      recurrence_rule: job?.recurrenceRule ?? "",
    });
    (async () => {
      const [cR, kR] = await Promise.all([
        fetch("/api/admin/clients").then((r) => r.json()),
        fetch("/api/admin/cleaners").then((r) => r.json()).catch(() => []),
      ]);
      setClients(cR);
      setCleaners(kR);
    })();
  }, [open]);

  const upd = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      client_id: form.client_id,
      assigned_cleaner_id: form.assigned_cleaner_id || null,
      service_type: form.service_type,
      status: form.status,
      scheduled_date: form.scheduled_date,
      scheduled_time_start: form.scheduled_time_start + ":00",
      scheduled_time_end: form.scheduled_time_end + ":00",
      price: form.price ? Number(form.price) : null,
      notes: form.notes || null,
      recurring: form.recurring,
      recurrence_rule: form.recurring ? form.recurrence_rule || null : null,
    };

    const url = job ? `/api/admin/jobs/${job.id}` : "/api/admin/jobs";
    const method = job ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? "Save failed.");
      setLoading(false);
      return;
    }

    const saved = (await res.json()) as Job;
    setLoading(false);
    onOpenChange(false);
    onSaved?.(saved);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{job ? "Edit job" : "New job"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="client_id">Client *</Label>
            <select
              id="client_id"
              required
              value={form.client_id}
              onChange={(e) => upd("client_id", e.target.value)}
              className={selectCls}
            >
              <option value="">Select client…</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.phone ? `· ${c.phone}` : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="service_type">Service type *</Label>
              <select
                id="service_type"
                required
                value={form.service_type}
                onChange={(e) => upd("service_type", e.target.value as typeof form.service_type)}
                className={selectCls}
              >
                {SERVICE_TYPES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => upd("status", e.target.value as typeof form.status)}
                className={selectCls}
              >
                {JOB_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="scheduled_date">Date *</Label>
              <Input
                id="scheduled_date"
                type="date"
                required
                value={form.scheduled_date}
                onChange={(e) => upd("scheduled_date", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="scheduled_time_start">Start *</Label>
              <Input
                id="scheduled_time_start"
                type="time"
                required
                value={form.scheduled_time_start}
                onChange={(e) => upd("scheduled_time_start", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="scheduled_time_end">End *</Label>
              <Input
                id="scheduled_time_end"
                type="time"
                required
                value={form.scheduled_time_end}
                onChange={(e) => upd("scheduled_time_end", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="assigned_cleaner_id">Cleaner</Label>
              <select
                id="assigned_cleaner_id"
                value={form.assigned_cleaner_id ?? ""}
                onChange={(e) => upd("assigned_cleaner_id", e.target.value)}
                className={selectCls}
              >
                <option value="">Unassigned</option>
                {cleaners.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => upd("price", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="recurring"
              type="checkbox"
              checked={form.recurring}
              onChange={(e) => upd("recurring", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="recurring">Recurring</Label>
          </div>

          {form.recurring && (
            <div className="space-y-1.5">
              <Label htmlFor="recurrence_rule">Frequency</Label>
              <select
                id="recurrence_rule"
                value={form.recurrence_rule}
                onChange={(e) => upd("recurrence_rule", e.target.value)}
                className={selectCls}
              >
                <option value="">—</option>
                <option value="FREQ=WEEKLY">Weekly</option>
                <option value="FREQ=WEEKLY;INTERVAL=2">Bi-weekly</option>
                <option value="FREQ=MONTHLY">Monthly</option>
              </select>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => upd("notes", e.target.value)}
              rows={3}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : job ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
