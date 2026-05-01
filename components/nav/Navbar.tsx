import Link from "next/link";
import Logo from "@/components/ui/Logo";
import NavServicesDropdown from "./NavServicesDropdown";
import NavMobileMenu from "./NavMobileMenu";
import { OTHER_LINKS } from "./nav-data";

export default function Navbar() {
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

            <NavServicesDropdown />

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

          <NavMobileMenu />
        </nav>
      </header>
    </>
  );
}
