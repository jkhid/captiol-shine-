import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase";

const Schema = z.object({
  name:  z.string().min(1).max(120),
  email: z.string().email().max(254),
});

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(req: NextRequest) {
  let body: z.infer<typeof Schema>;
  try {
    body = Schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid data." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const email = body.email.toLowerCase();

  // Return existing code if this email already signed up
  const { data: existing } = await supabase
    .from("referrals")
    .select("code")
    .eq("email", email)
    .single();

  if (existing) {
    return NextResponse.json({ code: existing.code });
  }

  // Generate a unique code (retry on collision)
  let code = generateCode();
  for (let i = 0; i < 5; i++) {
    const { data: collision } = await supabase
      .from("referrals")
      .select("id")
      .eq("code", code)
      .single();
    if (!collision) break;
    code = generateCode();
  }

  const { error } = await supabase
    .from("referrals")
    .insert({ name: body.name, email, code });

  if (error) {
    console.error("Referral insert error:", error);
    return NextResponse.json({ error: "Failed to create referral." }, { status: 500 });
  }

  return NextResponse.json({ code });
}
