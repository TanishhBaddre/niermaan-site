import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

// -----------------------------
// GET: Fetch all mentors
// -----------------------------
export async function GET() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("mentors")
    .select("*");

  if (error) {
    console.error("Mentors GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// -----------------------------
// PATCH: Approve / Update mentor
// -----------------------------
export async function PATCH(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { id, approved } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Missing mentor ID" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("mentors")
    .update({ approved })
    .eq("id", id);

  if (error) {
    console.error("Mentors PATCH error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
