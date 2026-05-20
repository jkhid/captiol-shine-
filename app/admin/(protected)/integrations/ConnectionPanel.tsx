"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  connected: boolean;
  connectedAt: string | null;
  connectedBy: string | null;
  lastRefreshedAt: string | null;
}

function fmt(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString();
}

export default function ConnectionPanel({
  connected,
  connectedAt,
  connectedBy,
  lastRefreshedAt,
}: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDisconnect() {
    if (!confirm("Disconnect Jobber? New bookings will stop syncing until you reconnect.")) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/jobber/disconnect", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to disconnect");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to disconnect");
    } finally {
      setBusy(false);
    }
  }

  if (!connected) {
    return (
      <a
        href="/api/jobber/authorize"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white rounded-lg text-sm font-semibold hover:bg-ink transition-colors"
      >
        Connect to Jobber
      </a>
    );
  }

  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2 text-sm">
        <div>
          <dt className="text-[11px] font-bold text-charcoal/45 uppercase tracking-wider">Connected</dt>
          <dd className="text-charcoal/85">{fmt(connectedAt)}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-bold text-charcoal/45 uppercase tracking-wider">By</dt>
          <dd className="text-charcoal/85">{connectedBy ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-bold text-charcoal/45 uppercase tracking-wider">Last token refresh</dt>
          <dd className="text-charcoal/85">{fmt(lastRefreshedAt)}</dd>
        </div>
      </dl>

      <div className="flex items-center gap-3">
        <a
          href="/api/jobber/authorize"
          className="text-xs font-medium text-navy hover:underline"
        >
          Reconnect
        </a>
        <button
          onClick={handleDisconnect}
          disabled={busy}
          className="text-xs text-red-600 font-medium hover:underline disabled:opacity-50"
        >
          {busy ? "Disconnecting…" : "Disconnect"}
        </button>
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    </div>
  );
}
