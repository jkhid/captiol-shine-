import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/supabase-server";
import AdminShell from "@/components/admin/AdminShell";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/admin/login");
  }
  return <AdminShell userEmail={user.email ?? null}>{children}</AdminShell>;
}
