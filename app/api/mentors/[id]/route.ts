import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(req: Request, context: { params: { id: string } }) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("mentors")
    .select("*")
    .eq("id", context.params.id)
    .single();

  return NextResponse.json({ data, error });
}
