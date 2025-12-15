"use client";

import { useSearchParams } from "next/navigation";

export default function PayContent() {
  const searchParams = useSearchParams();

  const mentor = searchParams.get("mentor");
  const price = searchParams.get("price");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Complete Payment</h1>
      <p>Mentor: {mentor}</p>
      <p>Price: £{price}</p>

      {/* your existing payment button logic stays here */}
    </div>
  );
}
