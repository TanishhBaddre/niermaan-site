import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "../../../../lib/supabaseServer";


export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();

  const { email, password } = await req.json();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 401 });

  return NextResponse.json({ success: true });
}
