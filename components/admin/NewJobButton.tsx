"use client";

import { useState } from "react";
import { Button } from "@/components/admin/ui/button";
import { JobDialog } from "./JobDialog";
import { Plus } from "lucide-react";

export function NewJobButton({ defaultClientId }: { defaultClientId?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus size={16} /> New job
      </Button>
      <JobDialog open={open} onOpenChange={setOpen} defaultClientId={defaultClientId} />
    </>
  );
}
