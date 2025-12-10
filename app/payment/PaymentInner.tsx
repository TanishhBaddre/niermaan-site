"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentInner() {
  const params = useSearchParams();

  const mentor = params.get("mentor");
  const slot = params.get("slot");
  const duration = params.get("duration");

  const amount = duration === "45" ? 30 : 60;

  const handlePay = async () => {
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: `Session with Mentor ${mentor}`,
          description: `Duration: ${duration} mins | Slot: ${slot}`,
          amount,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        alert("Payment failed");
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      alert("Unexpected payment error.");
    }
  };

  return (
    <main className="max-w-lg mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-center mb-10">Payment</h1>

      <div className="border rounded-xl p-6 mb-10">
        <p className="text-lg">Mentor ID: {mentor}</p>
        <p className="text-lg">Time Slot: {slot}</p>
        <p className="text-lg">Duration: {duration} minutes</p>

        <p className="text-2xl font-bold mt-6">£{amount}</p>
      </div>

      <button
        onClick={handlePay}
        className="w-full py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800"
      >
        Pay with Stripe
      </button>
    </main>
  );
}
