"use client";

import { useState } from "react";
import { Search, Calendar, GraduationCap, MapPin } from "lucide-react";

type Mentor = {
  id: string;
  full_name: string | null;
  university: string | null;
  country: string | null;
  expertise: string | null;
  bio: string | null;
};

export default function MentorSearch({ onBooked }: { onBooked?: () => void }) {
  const [query, setQuery] = useState("");
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [program, setProgram] = useState("");
  const [notes, setNotes] = useState("");
  const [creating, setCreating] = useState(false);

  async function handleSearch() {
    setLoading(true);
    try {
      const res = await fetch(`/api/mentors?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      // 🔒 Always turn the response into an ARRAY
      const list: Mentor[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setMentors(list);
    } catch (e) {
      console.error(e);
      alert("Failed to load mentors");
      setMentors([]); // fallback to empty array
    } finally {
      setLoading(false);
    }
  }

  function openBookingForm(mentor: Mentor) {
    setSelectedMentor(mentor);
  }

  async function handleCreateBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedMentor) return;

    if (!date || !time) {
      alert("Please choose date and time");
      return;
    }

    const scheduledAt = new Date(`${date}T${time}:00`).toISOString();

    setCreating(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mentorId: selectedMentor.id,
          scheduledAt,
          program,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error(data);
        alert(data.error || "Failed to create booking");
        return;
      }

      alert("Booking request sent!");
      setSelectedMentor(null);
      setDate("");
      setTime("");
      setProgram("");
      setNotes("");
      onBooked?.(); // call only if provided
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 border shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Find a Mentor</h2>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border flex-1">
          <Search className="text-gray-600" />
          <input
            type="text"
            placeholder="Search by country, university, or program..."
            className="bg-transparent w-full outline-none text-gray-100"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Mentor Results */}
      {mentors.length === 0 ? (
        <p className="text-sm text-gray-500">
          No mentors found yet. Try a different search.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mentors.map((m) => (
            <div
              key={m.id}
              className="border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="text-blue-700" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {m.full_name || "Mentor"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {m.university || "University not set"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {m.country || "Country not set"}
              </p>
              {m.expertise && (
                <p className="text-xs text-gray-500 mt-1">
                  Expertise: {m.expertise}
                </p>
              )}
              <button
                type="button"
                onClick={() => openBookingForm(m)}
                className="mt-3 inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                <Calendar className="h-4 w-4" />
                Request Session
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Booking Form */}
      {selectedMentor && (
        <form
          onSubmit={handleCreateBooking}
          className="mt-6 border-t pt-4 space-y-3"
        >
          <p className="font-semibold text-gray-900">
            Request session with {selectedMentor.full_name || "mentor"}
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-gray-900"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Program / Degree you are targeting
            </label>
            <input
              type="text"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-gray-900"
              placeholder="e.g. MS in Computer Science, BBA, MBA..."
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Notes for mentor (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-gray-900"
              rows={3}
              placeholder="Share your background, questions, or goals."
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60"
              disabled={creating}
            >
              {creating ? "Sending request..." : "Send Request"}
            </button>
            <button
              type="button"
              onClick={() => setSelectedMentor(null)}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
