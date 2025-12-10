"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Mentor = {
  id: string;
  full_name: string;
  headline: string | null;
  bio: string | null;
};

export default function BookingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const mentorId = params.get("mentor");

  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [duration, setDuration] = useState<"45" | "90" | "">("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  useEffect(() => {
  if (!mentorId) {
    setError("Missing mentor id.");
    setIsLoading(false);
    return;
  }

  async function loadMentor(id: string) {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`/api/mentors/${encodeURIComponent(id)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to load mentor");
      }

      setMentor(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  // call with a guaranteed string
  loadMentor(mentorId);
}, [mentorId]);


  const handleContinue = () => {
    if (!mentor || !duration || !selectedSlot) {
      alert("Please select a session duration and time slot.");
      return;
    }

    router.push(
      `/auth?mentor=${encodeURIComponent(
        mentor.id
      )}&slot=${encodeURIComponent(selectedSlot)}&duration=${duration}`
    );
  };

  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-center text-slate-500">Loading mentor…</p>
      </main>
    );
  }

  if (error || !mentor) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-center text-red-500">
          {error || "Mentor not found."}
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-center mb-10">
        Book a Session
      </h1>

      {/* Mentor info */}
      <div className="flex gap-6 items-center mb-12">
        <div className="w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-semibold">
          {mentor.full_name
            ?.split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "M"}
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{mentor.full_name}</h2>
          <p className="text-slate-600">
            {mentor.headline || "Verified mentor"}
          </p>
        </div>
      </div>

      {/* Duration */}
      <h3 className="text-xl font-semibold mb-4">Session Duration</h3>
      <div className="flex gap-4 mb-8">
        <button
          className={`border rounded-xl px-6 py-3 ${
            duration === "45" ? "bg-slate-900 text-white" : ""
          }`}
          onClick={() => setDuration("45")}
        >
          £30 — 45 minutes
        </button>
        <button
          className={`border rounded-xl px-6 py-3 ${
            duration === "90" ? "bg-slate-900 text-white" : ""
          }`}
          onClick={() => setDuration("90")}
        >
          £60 — 90 minutes
        </button>
      </div>

      {/* Time slots */}
      <h3 className="text-xl font-semibold mb-4">Choose a Time Slot</h3>
      <div className="grid grid-cols-3 gap-4">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            className={`border rounded-xl px-4 py-3 text-center hover:shadow ${
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
