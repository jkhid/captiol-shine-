"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/admin/ui/input";
import { Search } from "lucide-react";

export function ClientSearch({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial);
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (value) next.set("q", value);
      else next.delete("q");
      startTransition(() => router.replace(`?${next.toString()}`));
    }, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by name, email, or phone..."
        className="pl-9"
      />
    </div>
  );
}
