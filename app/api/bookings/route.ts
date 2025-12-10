import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Read URL params
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  // ========== STUDENT DASHBOARD BOOKINGS ==========
  if (type !== "mentor") {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        "id, scheduled_at, status, program, notes, mentors(full_name, university)"
      )
      .eq("student_id", user.id)
      .order("scheduled_at", { ascending: true });

    if (error) {
      console.error("Bookings GET error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  }

  // ========== MENTOR DASHBOARD REQUESTS ==========
  const { data, error } = await supabase
    .from("bookings")
    .select("id, scheduled_at, status, program, student_name, notes, student_id")
    .eq("mentor_id", user.id)
    .order("scheduled_at", { ascending: true });

  if (error) {
    console.error("Mentor Requests GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

// ========== CREATE BOOKING ==========
export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { mentorId, scheduledAt, program, notes } = body;

  if (!mentorId || !scheduledAt) {
    return NextResponse.json(
      { error: "mentorId and scheduledAt are required" },
      { status: 400 }
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { error } = await supabase.from("bookings").insert({
    mentor_id: mentorId,
    student_id: user.id,
    student_name: profile?.full_name || user.email,
    program,
    notes,
    scheduled_at: scheduledAt,
    status: "pending",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
