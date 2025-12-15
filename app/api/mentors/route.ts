import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();

  // Base query: get mentors (optionally only approved)
  let query = supabase
    .from("mentors")
    .select("*"); // .eq("approved", true)  ← add this back later if you want

  // If user typed something, search across multiple fields
  if (q) {
    query = query.or(
      `full_name.ilike.%${q}%,` +
        `university.ilike.%${q}%,` +
        `country.ilike.%${q}%,` +
        `expertise.ilike.%${q}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("Mentors GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Always return an array
  return NextResponse.json(data ?? []);
}
