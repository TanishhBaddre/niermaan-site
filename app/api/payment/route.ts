import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      console.error("Stripe error: STRIPE_SECRET_KEY is missing");
      return NextResponse.json(
        { error: "missing_key", message: "STRIPE_SECRET_KEY is not set" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: "2025-11-17.clover",
    });

    const body = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: body.productName,
              description: body.description,
            },
            unit_amount: body.amount * 100, // in pence
          },
          quantity: 1,
        },
      ],
      success_url: process.env.STRIPE_SUCCESS_URL as string,
      cancel_url: process.env.STRIPE_CANCEL_URL as string,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      {
        error: "stripe_error",
        message: err?.message || "Unknown Stripe error",
      },
      { status: 500 }
    );
  }
}
