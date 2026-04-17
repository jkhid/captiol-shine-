"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/admin/ui/button";
import { CheckCircle2, Link2, Unlink } from "lucide-react";

export function GoogleCalendarCard({
  connected,
  status,
}: {
  connected: boolean;
  status?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const disconnect = async () => {
    if (!confirm("Disconnect Google Calendar? Existing events will remain on your calendar but new jobs won't sync.")) return;
    setLoading(true);
    await fetch("/api/google/disconnect", { method: "POST" });
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-charcoal/70">
        Push jobs to your Google Calendar so scheduled work shows up alongside personal events. Updates and reschedules sync automatically.
      </p>

      {status === "connected" && (
        <div className="rounded-md bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-800">
          Google Calendar connected.
        </div>
      )}
      {status === "error" && (
        <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">
          Couldn&apos;t connect. Try again.
        </div>
      )}
      {status === "incomplete" && (
        <div className="rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-800">
          Google didn&apos;t return a refresh token. Revoke access in your Google account (myaccount.google.com → Security → Third-party access) and reconnect.
        </div>
      )}

      {connected ? (
        <div className="flex items-center justify-between gap-4 rounded-md border border-gray-200 p-3">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 size={18} className="text-green-600" />
            <span className="font-medium text-navy">Connected</span>
          </div>
          <Button variant="outline" onClick={disconnect} disabled={loading}>
            <Unlink size={14} /> Disconnect
          </Button>
        </div>
      ) : (
        <a href="/api/google/connect">
          <Button>
            <Link2 size={14} /> Connect Google Calendar
          </Button>
        </a>
      )}
    </div>
  );
}
