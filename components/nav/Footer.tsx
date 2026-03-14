import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { COMPANY } from "@/lib/constants";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";
import { Phone, Mail, Shield } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Services & Pricing" },
  { href: "/areas", label: "Service Areas" },
  { href: "/referrals", label: "Referral Program" },
  { href: "/book", label: "Book Now" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Logo className="[&_span]:text-white [&_.text-gold]:text-gold" />
            <p className="mt-3 text-sm text-gray-300">{COMPANY.tagline}</p>
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone size={14} /> {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Mail size={14} /> {COMPANY.email}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-semibold mb-4">Service Areas</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-300">
              {NEIGHBORHOODS.map((n) => (
                <li key={n.name}>{n.name}</li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h3 className="font-semibold mb-4">Trust & Safety</h3>
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
              <Shield size={16} className="text-gold flex-shrink-0" />
              Licensed & Insured in Virginia
            </div>
            <p className="text-sm text-gray-300">
              Background-checked team. Eco-friendly products. Satisfaction guaranteed.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
