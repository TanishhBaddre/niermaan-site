import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(req: Request) {
  const { bookingId } = await req.json();

  const { error } = await supabaseAdmin
    .from("bookings")
    .update({ status: "accepted" })
    .eq("id", bookingId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
