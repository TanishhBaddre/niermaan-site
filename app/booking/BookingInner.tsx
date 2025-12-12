"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingInner({ mentorId }: { mentorId: string | null }) {
  const router = useRouter();
  const [duration, setDuration] = useState<"45" | "90" | "">("");
  const [slot, setSlot] = useState("");

  if (!mentorId) {
    return <p className="p-20 text-center">Missing mentor</p>;
  }

  return (
    <main className="max-w-xl mx-auto p-20">
      <h1 className="text-3xl font-bold mb-6">Book Session</h1>

      <button onClick={() => setDuration("45")}>45 min</button>
      <button onClick={() => setDuration("90")}>90 min</button>

      <button onClick={() => setSlot("10:00 AM")}>10:00 AM</button>

      <button
        onClick={() =>
          router.push(
            `/auth?mentor=${mentorId}&slot=${encodeURIComponent(
              slot
            )}&duration=${duration}`
          )
        }
      >
        Continue
      </button>
    </main>
  );
}
