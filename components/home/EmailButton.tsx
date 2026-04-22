"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function EmailButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  const handleClick = () => {
    window.location.href = `mailto:${COMPANY.email}`;
    setOpen(true);
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => setOpen(false), 8000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(COMPANY.email);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail in some browsers / non-secure contexts. Silent.
    }
  };

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium border border-white/25 text-white/85 hover:border-white hover:text-white transition-colors"
      >
        <Mail size={12} />
        Email
      </button>

      {open && (
        <div
          role="dialog"
          className="absolute top-full left-0 mt-2 z-20 flex items-center gap-2 bg-white text-navy rounded-md shadow-lg border border-gray-200 px-3 py-2 text-xs whitespace-nowrap"
        >
          <span className="font-medium">{COMPANY.email}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-navy/5 hover:bg-navy/10 text-navy font-semibold"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
