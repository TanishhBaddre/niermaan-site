"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Mentor = {
  id: string;
  full_name: string;
  headline: string | null;
  bio: string | null;
};

export default function BookingInner() {
  const params = useSearchParams();
  const router = useRouter();
  const mentorId = params.get("mentor");

  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [duration, setDuration] = useState<"45" | "90" | "">("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  // ----------------------------
  // LOAD MENTOR
  // ----------------------------
  useEffect(() => {
    if (!mentorId) {
      setError("Missing mentor id.");
      setIsLoading(false);
      return;
    }

    async function loadMentor() {
      try {
        setIsLoading(true);

        const safeId = mentorId ?? "";
const res = await fetch(`/api/mentors/${encodeURIComponent(safeId)}`);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load mentor");
        }

        setMentor(data);
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    loadMentor();
  }, [mentorId]);

  // ----------------------------
  // CONTINUE BUTTON
  // ----------------------------
  const handleContinue = () => {
    if (!mentor || !duration || !selectedSlot) {
      alert("Please select duration and time.");
      return;
    }

    router.push(
      `/auth?mentor=${mentor.id}&slot=${encodeURIComponent(
        selectedSlot
      )}&duration=${duration}`
    );
  };

  // ----------------------------
  // UI STATES
  // ----------------------------
  if (isLoading) {
    return <main className="p-20 text-center text-slate-500">Loading mentor…</main>;
  }

  if (error || !mentor) {
    return <main className="p-20 text-center text-red-500">{error ?? "Error loading mentor"}</main>;
  }

  // ----------------------------
  // MAIN RENDER
  // ----------------------------
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-center mb-10">Book a Session</h1>

      {/* Mentor Info */}
      <div className="flex gap-6 items-center mb-12">
        <div className="w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-semibold">
          {mentor.full_name
            .split(" ")
            .map((x) => x[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{mentor.full_name}</h2>
          <p className="text-slate-600">{mentor.headline || "Verified mentor"}</p>
        </div>
      </div>

      {/* Duration */}
      <h3 className="text-xl font-semibold mb-4">Session Duration</h3>
      <div className="flex gap-4 mb-8">
        {["45", "90"].map((d) => (
          <button
            key={d}
            className={`border rounded-xl px-6 py-3 ${
              duration === d ? "bg-slate-900 text-white" : ""
            }`}
            onClick={() => setDuration(d as "45" | "90")}
          >
            £{d === "45" ? 30 : 60} — {d} minutes
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <h3 className="text-xl font-semibold mb-4">Choose a Time Slot</h3>
      <div className="grid grid-cols-3 gap-4">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            className={`border rounded-xl px-4 py-3 hover:shadow ${
              selectedSlot === slot ? "bg-slate-900 text-white" : ""
            }`}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        className="mt-10 w-full bg-slate-900 text-white py-4 rounded-xl text-lg hover:bg-slate-800"
      >
        Continue → Login / Payment
      </button>
    </main>
  );
}
