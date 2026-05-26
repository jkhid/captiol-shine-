import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { generatePhotoReportPdf } from "@/lib/job-photos/pdf";
import type { PhotoSession, SessionPhoto } from "@/lib/job-photos";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // PDF gen can take a while with many photos

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const admin = createAdminClient();
  const { data: sessionRow } = await admin
    .from("photo_sessions")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();
  if (!sessionRow) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const session = sessionRow as PhotoSession;

  const { data: photoRows } = await admin
    .from("photo_session_photos")
    .select("*")
    .eq("session_id", session.id)
    .order("category")
    .order("sort_order");
  const photos = (photoRows ?? []) as SessionPhoto[];

  const beforePhotos = photos.filter((p) => p.category === "before");
  const afterPhotos  = photos.filter((p) => p.category === "after");

  try {
    const pdfBytes = await generatePhotoReportPdf({ session, beforePhotos, afterPhotos });
    const slug = session.property_address.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
    const filename = `cleaning-report-${slug}-${session.service_date ?? session.id.slice(0, 8)}.pdf`;

    return new NextResponse(new Uint8Array(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
