import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";


export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
    console.error("❌ Webhook signature invalid", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const bookingId = session.client_reference_id;

    console.log("✔ Payment successful for booking:", bookingId);

    if (bookingId) {
      const supabase = supabaseAdmin;


      await supabase
        .from("bookings")
        .update({ status: "confirmed" })
        .eq("id", bookingId);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
