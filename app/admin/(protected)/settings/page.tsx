import { isGoogleConnected } from "@/lib/google-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { GoogleCalendarCard } from "@/components/admin/GoogleCalendarCard";

export const dynamic = "force-dynamic";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { google?: string };
}) {
  const connected = await isGoogleConnected();
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-navy">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Google Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <GoogleCalendarCard connected={connected} status={searchParams.google} />
        </CardContent>
      </Card>
    </div>
  );
}
