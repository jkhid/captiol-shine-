import { checkConnectionHealth, loadCredentials } from "@/lib/jobber/tokens";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import ConnectionPanel from "./ConnectionPanel";

export const dynamic = "force-dynamic";

export default async function IntegrationsPage({
  searchParams,
}: {
  searchParams: { jobber?: string };
}) {
  const creds = await loadCredentials();
  const connected = !!creds;
  const jobberStatus = searchParams.jobber ?? null;

  // Live health check — does the token actually still work? Without this,
  // a revoked or rotated refresh token would show "Connected" even though
  // every sync would silently fail.
  const health = connected
    ? await checkConnectionHealth()
    : { ok: false, error: "Not connected" };
  const isHealthy = connected && health.ok;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Integrations</h1>
        <p className="text-sm text-charcoal/60 mt-1">
          Connect Capitol Shine to your operational tools.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Jobber</CardTitle>
            <span
              className={
                "text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border " +
                (isHealthy
                  ? "bg-green/10 text-green border-green/30"
                  : connected
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-cream text-charcoal border-navy/15")
              }
            >
              {isHealthy ? "Connected" : connected ? "Token invalid" : "Not connected"}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-charcoal/75 mb-4">
            When connected, every booking submitted on the website creates a Client and a Request in your Jobber account. Existing clients are matched by email, then phone. The Resend customer confirmation email continues to fire so the customer still gets an instant acknowledgment.
          </p>

          {jobberStatus === "connected" && (
            <div className="bg-green/8 border border-green/30 rounded-lg px-4 py-3 mb-4 text-sm text-green font-medium">
              Jobber connected. New bookings will sync going forward.
            </div>
          )}
          {connected && !health.ok && !jobberStatus && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4 text-sm text-amber-800">
              <p className="font-semibold mb-1">Token invalid — bookings will fail to sync.</p>
              <p className="font-mono text-[12.5px] break-all">{health.error}</p>
              <p className="mt-2 text-xs">
                Click <strong>Disconnect</strong> below, then <strong>Connect to Jobber</strong> again to issue a fresh token pair. Common cause: Jobber rotated the refresh token, or access was revoked outside this app.
              </p>
            </div>
          )}
          {jobberStatus?.startsWith("error:") && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm text-red-700">
              <p className="font-semibold mb-1">Connection failed.</p>
              <p className="font-mono text-[12.5px] break-all">
                {decodeURIComponent(jobberStatus.replace(/^error:/, ""))}
              </p>
              <p className="mt-2 text-xs text-red-600/80">
                Common causes: redirect URI in Jobber doesn&apos;t match the env var exactly, client secret was rotated, or the authorization code was already used. Click <strong>Connect to Jobber</strong> again to retry with a fresh code.
              </p>
            </div>
          )}

          <ConnectionPanel
            connected={connected}
            connectedAt={creds?.connected_at ?? null}
            connectedBy={creds?.connected_by ?? null}
            lastRefreshedAt={creds?.last_refreshed_at ?? null}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product mapping</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-charcoal/75 space-y-3">
          <p>
            Booking line items map to Jobber products via env vars. Create the products in Jobber (Products &amp; Services), copy each product&apos;s GraphQL ID, and add them to your Vercel env:
          </p>
          <ul className="font-mono text-[12.5px] bg-cream rounded-lg p-4 space-y-1">
            <li>JOBBER_PRODUCT_WEEKLY=&lt;id&gt;</li>
            <li>JOBBER_PRODUCT_BIWEEKLY=&lt;id&gt;</li>
            <li>JOBBER_PRODUCT_MONTHLY=&lt;id&gt;</li>
            <li>JOBBER_PRODUCT_ONETIME=&lt;id&gt;</li>
            <li>JOBBER_PRODUCT_DEEP=&lt;id&gt;</li>
            <li>JOBBER_PRODUCT_MOVEOUT=&lt;id&gt;</li>
            <li>JOBBER_PRODUCT_AIRBNB=&lt;id&gt;</li>
          </ul>
          <p className="text-xs text-charcoal/55">
            If a mapping isn&apos;t set, the booking still syncs but with no product line item. Service details land in the Request notes either way.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
