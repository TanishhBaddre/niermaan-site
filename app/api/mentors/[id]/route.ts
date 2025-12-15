import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabaseServer";


export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer();

  const { data, error } = await supabase
    .from("mentors")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}
