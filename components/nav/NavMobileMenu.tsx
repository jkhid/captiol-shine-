"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { SERVICE_ITEMS, OTHER_LINKS } from "./nav-data";

export default function NavMobileMenu() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const close = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
    <>
      <button
        className="md:hidden p-2 text-navy"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="md:hidden fixed inset-0 top-[calc(68px+40px)] z-40 bg-paper overflow-y-auto">
          <div className="flex flex-col p-6 gap-1">
            <Link href="/" onClick={close} className="text-base font-medium text-charcoal hover:text-navy py-3 border-b border-navy/8">
              Home
            </Link>

            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center justify-between text-base font-medium text-charcoal hover:text-navy py-3 border-b border-navy/8 text-left w-full"
            >
              Services & Pricing
              <ChevronDown size={16} className={`transition-transform duration-150 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="pl-4 pb-2 space-y-1 border-b border-navy/8">
                {SERVICE_ITEMS.map(({ href, icon: Icon, label, description }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={close}
                    className="flex items-center gap-3 py-2.5 text-charcoal hover:text-navy transition-colors"
                  >
                    <span className="w-7 h-7 rounded-lg bg-navy/6 flex items-center justify-center flex-shrink-0">
                      <Icon size={13} className="text-navy" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{label}</span>
                      <span className="block text-xs text-muted">{description}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {OTHER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={close} className="text-base font-medium text-charcoal hover:text-navy py-3 border-b border-navy/8">
                {link.label}
              </Link>
            ))}

            <a href="tel:+17033759132" onClick={close} className="text-base font-medium text-charcoal hover:text-navy py-3 border-b border-navy/8">
              (703) 375-9132
            </a>

            <Link
              href="/book"
              onClick={close}
              className="mt-4 block bg-gold text-ink text-sm font-semibold text-center py-3.5 rounded-xl hover:bg-gold-2 transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
