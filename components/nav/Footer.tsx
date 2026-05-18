import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { COMPANY } from "@/lib/constants";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";
import { Phone, Mail } from "lucide-react";

const SERVICE_LINKS = [
  { href: "/pricing?service=residential",  label: "Residential Cleaning" },
  { href: "/pricing?service=airbnb",       label: "Airbnb & STR" },
  { href: "/pricing?service=commercial",   label: "Commercial" },
  { href: "/pricing?service=construction", label: "Post-Construction" },
  { href: "/checklists",                   label: "Cleaning Checklists" },
];

const COMPANY_LINKS = [
  { href: "/areas",     label: "Service Areas" },
  { href: "/referrals", label: "Referral Program" },
  { href: "/blog",      label: "Blog" },
  { href: "/book",      label: "Book a Cleaning" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/60 border-t border-white/7 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <Logo className="[&_span]:text-white [&_.text-gold]:text-gold mb-4" />
            <p className="text-sm text-white/50 leading-relaxed mb-5">{COMPANY.tagline}</p>
            <div className="space-y-2 text-sm">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 hover:text-gold-2 transition-colors">
                <Phone size={13} /> {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-gold-2 transition-colors">
                <Mail size={13} /> {COMPANY.email}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Services</h5>
            <ul className="space-y-2.5 text-sm">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold-2 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Company</h5>
            <ul className="space-y-2.5 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold-2 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Service Areas</h5>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {NEIGHBORHOODS.slice(0, 10).map((n) => (
                <li key={n.name} className="text-white/45 text-xs">{n.name}</li>
              ))}
            </ul>
            <Link href="/areas" className="inline-block mt-3 text-xs text-gold hover:text-gold-2 transition-colors font-medium">
              All areas →
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-white/8 flex flex-wrap justify-between items-center gap-4 text-xs text-white/35">
          <span>&copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span>Licensed &amp; insured in Virginia · Arlington, VA</span>
        </div>
      </div>
    </footer>
  );
}
