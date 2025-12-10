import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { bookingId } = await req.json();

    const { error } = await supabase
      .from("bookings")
      .update({ status: "confirmed" })
      .eq("id", bookingId);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
