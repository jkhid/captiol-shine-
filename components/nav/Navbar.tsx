"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Home, Building2, Briefcase, HardHat } from "lucide-react";
import Logo from "@/components/ui/Logo";

const SERVICE_ITEMS = [
  { href: "/pricing?service=residential",  icon: Home,      label: "Residential",  description: "Standard, Deep & Move-In/Out" },
  { href: "/pricing?service=commercial",   icon: Briefcase, label: "Commercial",   description: "Offices & retail spaces" },
  { href: "/pricing?service=construction", icon: HardHat,   label: "Construction", description: "Post-build & renovation" },
  { href: "/pricing?service=airbnb",       icon: Building2, label: "Airbnb / STR", description: "Turnover cleaning for hosts" },
];

const OTHER_LINKS = [
  { href: "/areas",       label: "Service Areas" },
  { href: "/checklists",  label: "Checklists" },
  { href: "/blog",        label: "Blog" },
];

export default function Navbar() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  return (
    <>
      {/* Promo bar */}
      <div className="bg-ink text-white text-center py-2.5 px-4 text-xs font-medium tracking-wide">
        New residential customers save{" "}
        <strong className="text-gold-2">$30 on their first clean</strong>
        {" "}— no code needed.
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-paper/92 backdrop-blur-md border-b border-navy/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
          <Logo />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            <Link href="/" className="text-sm font-medium text-charcoal hover:text-navy transition-colors">
              Home
            </Link>

            {/* Services dropdown */}
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button className="flex items-center gap-1 text-sm font-medium text-charcoal hover:text-navy transition-colors">
                Services & Pricing
                <ChevronDown size={13} className={`transition-transform duration-150 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl border border-navy/10 shadow-xl shadow-navy/8 overflow-hidden">
                  {SERVICE_ITEMS.map(({ href, icon: Icon, label, description }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setDropdownOpen(false)}
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

            {OTHER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-charcoal hover:text-navy transition-colors">
                {link.label}
              </Link>
            ))}

            <span className="text-muted text-sm font-medium tabular-nums hidden lg:block">(703) 375-9132</span>

            <Link
              href="/book"
              className="bg-gold text-ink text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gold-2 transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[calc(68px+40px)] z-40 bg-paper overflow-y-auto">
          <div className="flex flex-col p-6 gap-1">
            <Link href="/" onClick={closeMobile} className="text-base font-medium text-charcoal hover:text-navy py-3 border-b border-navy/8">
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
                    onClick={closeMobile}
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
              <Link key={link.href} href={link.href} onClick={closeMobile} className="text-base font-medium text-charcoal hover:text-navy py-3 border-b border-navy/8">
                {link.label}
              </Link>
            ))}

            <a href="tel:+17033759132" onClick={closeMobile} className="text-base font-medium text-charcoal hover:text-navy py-3 border-b border-navy/8">
              (703) 375-9132
            </a>

            <Link
              href="/book"
              onClick={closeMobile}
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
