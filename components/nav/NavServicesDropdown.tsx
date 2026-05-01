"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SERVICE_ITEMS } from "./nav-data";

export default function NavServicesDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="flex items-center gap-1 text-sm font-medium text-charcoal hover:text-navy transition-colors">
        Services & Pricing
        <ChevronDown size={13} className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl border border-navy/10 shadow-xl shadow-navy/8 overflow-hidden">
          {SERVICE_ITEMS.map(({ href, icon: Icon, label, description }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 px-4 py-3 hover:bg-paper transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-navy/6 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-navy/10 transition-colors">
                <Icon size={14} className="text-navy" />
              </span>
              <span>
                <span className="block text-sm font-medium text-navy">{label}</span>
                <span className="block text-xs text-muted mt-0.5">{description}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
