import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    console.log("🔥 /api/payment route hit");

    const body = await req.json();
    const { bookingId, mentorName, price } = body;

    if (!bookingId || !price) {
      return NextResponse.json(
        { error: "Missing bookingId or price" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: mentorName ?? "Mentor Session",
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],

      metadata: {
        bookingId,
      },

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
