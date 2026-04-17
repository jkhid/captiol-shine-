"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Booking, BookingStatus } from "@/lib/bookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Badge } from "@/components/admin/ui/badge";
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
import { Inbox, UserPlus, CheckCircle2, XCircle, Pencil } from "lucide-react";

const STATUS_STYLE: Record<string, string> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "destructive",
  completed: "default",
};

export function IntakeQueue() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [editing, setEditing] = useState<Booking | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/intake");
        if (res.ok) {
          const all: Booking[] = await res.json();
          setBookings(all.filter((b) => b.status !== "cancelled"));
        }
      } catch {
        // ignore
      }
      setLoading(false);
    })();
  }, []);

  const updateStatus = async (bookingId: string, status: BookingStatus) => {
    setBusy(bookingId);
    const res = await fetch(`/api/admin/intake/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      if (status === "cancelled") {
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      } else {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
        );
      }
    } else {
      alert("Failed to update status.");
    }
    setBusy(null);
  };

  const convert = async (bookingId: string) => {
    setBusy(bookingId);
    const res = await fetch("/api/admin/intake/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_id: bookingId }),
    });
    const data = await res.json();
    if (res.ok) {
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      router.push(`/admin/clients/${data.id}`);
    } else if (res.status === 409) {
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      router.push(`/admin/clients/${data.client_id}`);
    } else {
      alert(data.error ?? "Failed to convert.");
    }
    setBusy(null);
  };

  const openEdit = (b: Booking) => {
    setEditing(b);
    setEditForm({
      customer_name: b.customerName,
      email: b.email,
      phone: b.phone,
      address: b.address,
      service_label: b.serviceLabel,
      home_type: b.homeType ?? "",
      bedrooms: String(b.bedrooms ?? ""),
      bathrooms: b.bathrooms ?? "",
      date: b.date,
      price: String(b.price),
      frequency: b.frequency,
      notes: b.notes ?? "",
    });
  };

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    const res = await fetch(`/api/admin/intake/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === editing.id
            ? {
                ...b,
                customerName: editForm.customer_name,
                email: editForm.email,
                phone: editForm.phone,
                address: editForm.address,
                serviceLabel: editForm.service_label,
                homeType: editForm.home_type,
                bedrooms: Number(editForm.bedrooms) || 0,
                bathrooms: editForm.bathrooms,
                date: editForm.date,
                price: Number(editForm.price),
                frequency: editForm.frequency,
                notes: editForm.notes || undefined,
              }
            : b
        )
      );
      setEditing(null);
    } else {
      alert("Failed to save.");
    }
    setSaving(false);
  };

  if (loading) return null;
  if (bookings.length === 0) return null;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Inbox size={16} className="text-gold" />
            Pending intake
            <Badge variant="warning" className="ml-1">{bookings.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-gray-100">
            {bookings.map((b) => (
              <li key={b.id} className="px-4 py-4 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(b)}
                        className="font-medium text-navy hover:underline text-left flex items-center gap-1.5"
                      >
                        {b.customerName}
                        <Pencil size={12} className="text-charcoal/30" />
                      </button>
                      <Badge variant={STATUS_STYLE[b.status] as "warning" | "success" | "destructive" | "default"}>
                        {b.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-charcoal/60 mt-1">
                      {b.serviceLabel} · {b.date} · ${b.price}
                      {b.homeType ? ` · ${b.homeType}` : ""}
                      {b.bedrooms ? ` · ${b.bedrooms} BR` : ""}
                      {b.bathrooms ? ` / ${b.bathrooms} BA` : ""}
                    </div>
                    <div className="text-xs text-charcoal/40">
                      <a href={`tel:${b.phone}`} className="hover:text-navy">{b.phone}</a>
                      {" · "}
                      <a href={`mailto:${b.email}`} className="hover:text-navy">{b.email}</a>
                    </div>
                    {b.notes && (
                      <div className="text-xs text-charcoal/50 mt-1 italic">{b.notes}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {b.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={busy === b.id}
                        onClick={() => updateStatus(b.id, "confirmed")}
                        className="text-cta-green border-cta-green/30 hover:bg-cta-green/5"
                      >
                        <CheckCircle2 size={14} /> Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={busy === b.id}
                        onClick={() => updateStatus(b.id, "cancelled")}
                        className="text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <XCircle size={14} /> Cancel
                      </Button>
                    </>
                  )}
                  {b.status === "confirmed" && (
                    <>
                      <Button
                        size="sm"
                        disabled={busy === b.id}
                        onClick={() => convert(b.id)}
                      >
                        <UserPlus size={14} />
                        {busy === b.id ? "Converting..." : "Convert to client"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={busy === b.id}
                        onClick={() => updateStatus(b.id, "cancelled")}
                        className="text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <XCircle size={14} /> Dismiss
                      </Button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={(v) => !v && setEditing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Name</Label>
                <Input
                  value={editForm.customer_name ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, customer_name: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input
                  value={editForm.phone ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input
                value={editForm.email ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Address</Label>
              <Input
                value={editForm.address ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, address: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label>Service</Label>
                <Input
                  value={editForm.service_label ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, service_label: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={editForm.date ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, date: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  value={editForm.price ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, price: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label>Home type</Label>
                <Input
                  value={editForm.home_type ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, home_type: e.target.value }))}
                  placeholder="e.g. Apartment"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Bedrooms</Label>
                <Input
                  type="number"
                  value={editForm.bedrooms ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, bedrooms: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Bathrooms</Label>
                <Input
                  value={editForm.bathrooms ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, bathrooms: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea
                rows={2}
                value={editForm.notes ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, notes: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={saveEdit} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
