import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();

  const formData = await req.formData();
  const full_name = formData.get("full_name")?.toString();
  const university = formData.get("university")?.toString();
  const goals = formData.get("goals")?.toString();
  const preferences = formData.get("preferences")?.toString();

  // Upload avatar if provided
  const avatar = formData.get("avatar") as File | null;
  let avatar_url = null;

  if (avatar && avatar.size > 0) {
    const ext = avatar.name.split(".").pop();
    const fileName = `avatar-${Date.now()}.${ext}`;

    await supabase.storage
      .from("avatars")
      .upload(fileName, avatar, { contentType: avatar.type });

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    avatar_url = data.publicUrl;
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" });

  await supabase.from("students").update({
    full_name,
    university,
    goals,
    preferences,
    ...(avatar_url && { avatar_url })
  })
  .eq("id", user.id);

  return NextResponse.redirect("/student/profile");
}
