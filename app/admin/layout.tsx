import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin | Capitol Shine", template: "%s | CS Admin" },
  robots: "noindex,nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
