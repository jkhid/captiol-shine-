import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase";

export async function POST() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  await supabase.from("calendar_tokens").delete().eq("user_id", user.id);
  return NextResponse.json({ success: true });
}
