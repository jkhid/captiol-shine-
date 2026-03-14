"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Home, Building2, Briefcase, HardHat } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

const SERVICE_ITEMS = [
  { href: "/pricing?service=residential",  icon: Home,      label: "Residential",  description: "Standard, Deep & Move-In/Out" },
  { href: "/pricing?service=airbnb",       icon: Building2, label: "Airbnb / STR", description: "Turnover cleaning for hosts" },
  { href: "/pricing?service=commercial",   icon: Briefcase, label: "Commercial",   description: "Offices & retail spaces" },
  { href: "/pricing?service=construction", icon: HardHat,   label: "Construction", description: "Post-build & renovation" },
];

const OTHER_LINKS = [
  { href: "/areas",     label: "Service Areas" },
  { href: "/referrals", label: "Referral Program" },
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-charcoal hover:text-navy transition-colors">
            Home
          </Link>

          {/* Services & Pricing dropdown */}
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="flex items-center gap-1 text-sm font-medium text-charcoal hover:text-navy transition-colors">
              Services & Pricing
              <ChevronDown size={14} className={`transition-transform duration-150 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden">
                {SERVICE_ITEMS.map(({ href, icon: Icon, label, description }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-off-white transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-navy/10 transition-colors">
                      <Icon size={15} className="text-navy" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-navy">{label}</span>
                      <span className="block text-xs text-charcoal/50 mt-0.5">{description}</span>
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

          <Button href="/book" variant="gold">Book Now</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-navy"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-white overflow-y-auto">
          <div className="flex flex-col p-6 gap-1">
            <Link href="/" onClick={closeMobile} className="text-lg font-medium text-charcoal hover:text-navy py-3 border-b border-gray-100">
              Home
            </Link>

            {/* Services expandable */}
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center justify-between text-lg font-medium text-charcoal hover:text-navy py-3 border-b border-gray-100 text-left w-full"
            >
              Services & Pricing
              <ChevronDown size={18} className={`transition-transform duration-150 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="pl-4 pb-2 space-y-1 border-b border-gray-100">
                {SERVICE_ITEMS.map(({ href, icon: Icon, label, description }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMobile}
                    className="flex items-center gap-3 py-2.5 text-charcoal hover:text-navy transition-colors"
                  >
                    <span className="w-7 h-7 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-navy" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{label}</span>
                      <span className="block text-xs text-charcoal/50">{description}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {OTHER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMobile} className="text-lg font-medium text-charcoal hover:text-navy py-3 border-b border-gray-100">
                {link.label}
              </Link>
            ))}

            <Button href="/book" variant="gold" className="mt-4">
              Book Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
