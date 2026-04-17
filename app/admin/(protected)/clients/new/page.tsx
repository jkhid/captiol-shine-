import { ClientForm } from "@/components/admin/ClientForm";

export default function NewClientPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">New client</h1>
        <p className="text-sm text-charcoal/60">Add a client manually.</p>
      </div>
      <ClientForm />
    </div>
  );
}
