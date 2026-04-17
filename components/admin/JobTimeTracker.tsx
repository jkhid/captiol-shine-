"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Job } from "@/lib/jobs";
import { Button } from "@/components/admin/ui/button";
import { Play, Square, RotateCcw } from "lucide-react";

export function JobTimeTracker({ job }: { job: Job }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"start" | "end" | "reset" | null>(null);

  const patch = async (body: Record<string, unknown>, kind: "start" | "end" | "reset") => {
    setLoading(kind);
    const res = await fetch(`/api/admin/jobs/${job.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) alert("Failed to update.");
    else router.refresh();
    setLoading(null);
  };

  const started = !!job.actualStartTime;
  const ended = !!job.actualEndTime;

  return (
    <div className="space-y-4">
      {started && (
        <div className="text-sm text-charcoal/80 space-y-1">
          <div>
            <span className="text-charcoal/50">Started:</span>{" "}
            {new Date(job.actualStartTime!).toLocaleString()}
          </div>
          {ended && (
            <>
              <div>
                <span className="text-charcoal/50">Ended:</span>{" "}
                {new Date(job.actualEndTime!).toLocaleString()}
              </div>
              <div className="font-medium text-navy">
                Duration: {job.actualDurationMinutes} min
              </div>
            </>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2 fixed bottom-0 inset-x-0 p-4 bg-white border-t border-gray-200 md:static md:p-0 md:border-0 md:bg-transparent">
        {!started && (
          <Button
            size="lg"
            className="w-full sm:w-auto"
            disabled={loading !== null}
            onClick={() =>
              patch(
                { actual_start_time: new Date().toISOString(), status: "in_progress" },
                "start"
              )
            }
          >
            <Play size={16} /> Start now
          </Button>
        )}
        {started && !ended && (
          <Button
            size="lg"
            variant="gold"
            className="w-full sm:w-auto"
            disabled={loading !== null}
            onClick={() =>
              patch(
                { actual_end_time: new Date().toISOString(), status: "completed" },
                "end"
              )
            }
          >
            <Square size={16} /> End now
          </Button>
        )}
        {(started || ended) && (
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
            disabled={loading !== null}
            onClick={() =>
              patch(
                { actual_start_time: null, actual_end_time: null, status: "scheduled" },
                "reset"
              )
            }
          >
            <RotateCcw size={16} /> Reset
          </Button>
        )}
      </div>
    </div>
  );
}
