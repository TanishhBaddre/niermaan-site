"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookPage() {
  const router = useRouter();

  const [duration, setDuration] = useState(45);

  function handleContinue() {
    router.push(`/pay?duration=${duration}`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white gap-6">
      <h1 className="text-3xl font-bold">Book Session</h1>

      <div className="flex gap-4">
        <button
          onClick={() => setDuration(45)}
          className={`px-4 py-2 rounded ${
            duration === 45 ? "bg-white text-black" : "bg-gray-700"
          }`}
        >
          45 min
        </button>

        <button
          onClick={() => setDuration(90)}
          className={`px-4 py-2 rounded ${
            duration === 90 ? "bg-white text-black" : "bg-gray-700"
          }`}
        >
          90 min
        </button>
      </div>

      <button
        onClick={handleContinue}
        className="mt-6 bg-green-500 text-black px-6 py-3 rounded text-lg font-semibold"
      >
        Continue
      </button>
    </div>
  );
}
