"use client";

import { useSearchParams } from "next/navigation";

export default function PayPage() {
  const searchParams = useSearchParams();

  const mentor = searchParams.get("mentor") ?? "Mentor";
  const duration = Number(searchParams.get("duration") ?? 30);

  // simple pricing logic
  const price = duration === 60 ? 50 : 30;

  async function handlePay() {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: "test-booking-id",
        mentorName: mentor,
        price,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Payment failed");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Complete Payment</h1>

      <p><strong>Mentor:</strong> {mentor}</p>
      <p><strong>Duration:</strong> {duration} minutes</p>
      <p className="text-2xl font-semibold">Price: £{price}</p>

      <button
        onClick={handlePay}
        className="mt-4 bg-black text-white px-6 py-3 rounded"
      >
        Pay £{price}
      </button>
    </div>
  );
}
