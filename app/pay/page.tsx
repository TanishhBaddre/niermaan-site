"use client";

import { useSearchParams } from "next/navigation";

export default function PayPage() {
  const searchParams = useSearchParams();

  const mentor = searchParams.get("mentor");
  const duration = searchParams.get("duration");

  const price = 30; // £30 — keep it simple for now

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
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl mb-4">Payment</h1>

      <p>Mentor: {mentor}</p>
      <p>Duration: {duration} minutes</p>

      <p className="text-2xl mt-4">£{price}</p>

      <button
        onClick={handlePay}
        className="mt-6 bg-white text-black px-6 py-3 rounded"
      >
        Pay £{price}
      </button>
    </div>
  );
}
