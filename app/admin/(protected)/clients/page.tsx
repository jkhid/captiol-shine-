import Link from "next/link";
import { createAdminClient } from "@/lib/supabase";
import { rowToClient, frequencyLabel } from "@/lib/clients";
import { Card } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { Badge } from "@/components/admin/ui/badge";
import { Plus, Search } from "lucide-react";
import { ClientSearch } from "@/components/admin/ClientSearch";

export const dynamic = "force-dynamic";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "from-navy to-navy/80",
  "from-emerald-600 to-emerald-500",
  "from-violet-600 to-violet-500",
  "from-amber-600 to-amber-500",
  "from-rose-600 to-rose-500",
  "from-cyan-600 to-cyan-500",
];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const supabase = createAdminClient();
  const q = searchParams.q?.trim();

  let query = supabase.from("clients").select("*").order("created_at", { ascending: false });
  if (q) {
    query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
  }
  const { data } = await query;
  const clients = (data ?? []).map(rowToClient);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Clients</h1>
          <p className="text-sm text-charcoal/50">{clients.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/clients/new">
            <Plus size={16} />
            New client
          </Link>
        </Button>
      </div>

      <Card className="p-4">
        <ClientSearch initial={q ?? ""} />
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-charcoal/50">
                  {q ? (
                    <>No clients match <span className="font-medium">&ldquo;{q}&rdquo;</span>.</>
                  ) : (
                    <>
                      <Search size={24} className="mx-auto mb-2 opacity-40" />
                      No clients yet. Create one or convert a pending intake.
                    </>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              clients.map((c) => (
                <TableRow key={c.id} className="cursor-pointer group">
                  <TableCell>
                    <Link href={`/admin/clients/${c.id}`} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColor(c.name)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {initials(c.name)}
                      </div>
                      <div>
                        <span className="font-medium text-navy group-hover:underline">{c.name}</span>
                        {c.email && <div className="text-xs text-charcoal/50 truncate max-w-[180px]">{c.email}</div>}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-charcoal/70">{c.phone ?? "—"}</TableCell>
                  <TableCell>
                    <div className="text-xs text-charcoal/60">
                      {c.homeType && <span className="bg-gray-100 px-1.5 py-0.5 rounded font-medium mr-1">{c.homeType}</span>}
                      {c.bedrooms != null && <span>{c.bedrooms}BR</span>}
                      {c.bathrooms && <span> / {c.bathrooms}BA</span>}
                      {!c.homeType && c.bedrooms == null && "—"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {c.frequency ? (
                      <Badge variant={c.frequency === "one_time" ? "outline" : "success"}>
                        {frequencyLabel(c.frequency)}
                      </Badge>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    {c.source ? <Badge variant="secondary">{c.source}</Badge> : "—"}
                  </TableCell>
                  <TableCell className="text-charcoal/50 text-xs">
                    {new Date(c.createdAt).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
