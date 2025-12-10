import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,);

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Invalid webhook signature:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // -----------------------------
  //   PAYMENT SUCCESS EVENT
  // -----------------------------
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const bookingId = session.client_reference_id;

    console.log("✔ Payment successful. Booking ID:", bookingId);

    if (!bookingId) {
      console.error("❌ No bookingId found in session");
      return NextResponse.json({ error: "No bookingId" }, { status: 400 });
    }

    // Update booking to PAID
    const { error } = await supabaseAdmin
      .from("bookings")
      .update({ status: "paid" })
      .eq("id", bookingId);

    if (error) {
      console.error("❌ Database update failed:", error);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }

    console.log("✔ Booking updated to PAID");
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
