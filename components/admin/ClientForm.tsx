"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Client } from "@/lib/clients";
import { CLIENT_SOURCES, CLIENT_FREQUENCIES } from "@/lib/clients";
import { Button } from "@/components/admin/ui/button";
import { Card, CardContent } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Textarea } from "@/components/admin/ui/textarea";

export function ClientForm({ client }: { client?: Client }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: client?.name ?? "",
    email: client?.email ?? "",
    phone: client?.phone ?? "",
    service_address: client?.serviceAddress ?? "",
    home_type: client?.homeType ?? "",
    bedrooms: client?.bedrooms?.toString() ?? "",
    bathrooms: client?.bathrooms ?? "",
    source: client?.source ?? "",
    frequency: (client?.frequency ?? "") as string,
    tags: client?.tags.join(", ") ?? "",
    notes: client?.notes ?? "",
  });

  const upd = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: form.name,
      email: form.email || null,
      phone: form.phone || null,
      service_address: form.service_address || null,
      home_type: form.home_type || null,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms || null,
      source: form.source || null,
      frequency: (form.frequency || null) as "one_time" | "weekly" | "biweekly" | "monthly" | null,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      notes: form.notes || null,
    };

    const url = client ? `/api/admin/clients/${client.id}` : "/api/admin/clients";
    const method = client ? "PATCH" : "POST";

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

    const saved = (await res.json()) as Client;
    router.push(`/admin/clients/${saved.id}`);
    router.refresh();
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" required value={form.name} onChange={(e) => upd("name", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => upd("phone", e.target.value)} />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="service_address">Service address</Label>
              <Input
                id="service_address"
                value={form.service_address}
                onChange={(e) => upd("service_address", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="home_type">Home type</Label>
              <Input id="home_type" value={form.home_type} onChange={(e) => upd("home_type", e.target.value)} placeholder="e.g. Apartment, Townhouse" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input id="bedrooms" type="number" value={form.bedrooms} onChange={(e) => upd("bedrooms", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input id="bathrooms" value={form.bathrooms} onChange={(e) => upd("bathrooms", e.target.value)} placeholder="e.g. 1.5" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="frequency">Frequency</Label>
              <select
                id="frequency"
                value={form.frequency}
                onChange={(e) => upd("frequency", e.target.value)}
                className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
              >
                <option value="">—</option>
                {CLIENT_FREQUENCIES.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="source">Source</Label>
              <select
                id="source"
                value={form.source}
                onChange={(e) => upd("source", e.target.value)}
                className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
              >
                <option value="">—</option>
                {CLIENT_SOURCES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input id="tags" value={form.tags} onChange={(e) => upd("tags", e.target.value)} placeholder="vip, pets" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={form.notes}
                onChange={(e) => upd("notes", e.target.value)}
                rows={4}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : client ? "Save changes" : "Create client"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
