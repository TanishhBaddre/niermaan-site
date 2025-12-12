"use client";

export default function PaymentInner({
  mentor,
  slot,
  duration,
}: {
  mentor: string | null;
  slot: string | null;
  duration: string | null;
}) {
  const amount = duration === "45" ? 30 : 60;

  return (
    <main className="max-w-lg mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-10">Payment</h1>

      <p>Mentor: {mentor}</p>
      <p>Slot: {slot}</p>
      <p>Duration: {duration}</p>

      <p className="text-2xl font-bold mt-6">£{amount}</p>
    </main>
  );
}
