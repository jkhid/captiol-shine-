"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import Logo from "@/components/ui/Logo";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Briefcase,
  Sparkles,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/calendar", label: "Calendar", icon: CalendarDays, exact: false },
  { href: "/admin/clients", label: "Clients", icon: Users, exact: false },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase, exact: false },
  { href: "/admin/leads", label: "Leads", icon: Sparkles, exact: false },
  { href: "/admin/settings", label: "Settings", icon: Settings, exact: false },
];

export default function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail?: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-white/10">
        <Logo className="[&_span]:text-white" />
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {navLinks.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
              isActive(href, exact)
                ? "bg-white/15 text-white"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        {userEmail && (
          <div className="px-4 py-2 text-xs text-white/40 truncate">{userEmail}</div>
        )}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className="hidden md:flex flex-col w-60 bg-navy flex-shrink-0">
        <Sidebar />
      </aside>

      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-60 bg-navy flex flex-col">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 h-14 flex items-center justify-between flex-shrink-0">
          <button
            className="md:hidden p-2 text-charcoal"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="hidden md:block" />
          <span className="text-sm text-charcoal/50">Capitol Shine Admin</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
