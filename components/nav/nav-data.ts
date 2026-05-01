import { Home, Building2, Briefcase, HardHat, type LucideIcon } from "lucide-react";

export type NavServiceItem = {
  href: string;
  icon: LucideIcon;
  label: string;
  description: string;
};

export const SERVICE_ITEMS: NavServiceItem[] = [
  { href: "/pricing?service=residential",  icon: Home,      label: "Residential",  description: "Standard, Deep & Move-In/Out" },
  { href: "/pricing?service=commercial",   icon: Briefcase, label: "Commercial",   description: "Offices & retail spaces" },
  { href: "/pricing?service=construction", icon: HardHat,   label: "Construction", description: "Post-build & renovation" },
  { href: "/pricing?service=airbnb",       icon: Building2, label: "Airbnb / STR", description: "Turnover cleaning for hosts" },
];

export const OTHER_LINKS = [
  { href: "/areas",      label: "Service Areas" },
  { href: "/checklists", label: "Checklists" },
  { href: "/blog",       label: "Blog" },
];
