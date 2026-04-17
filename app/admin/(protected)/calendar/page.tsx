import { CalendarView } from "@/components/admin/CalendarView";

export const dynamic = "force-dynamic";

export default function CalendarPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-navy">Calendar</h1>
      <CalendarView />
    </div>
  );
}
