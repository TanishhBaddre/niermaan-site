"use client";

import { useState } from "react";

export default function StudentFindPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);

    const res = await fetch(`/api/mentors?search=${query}`);
    const data = await res.json();

    setResults(data || []);
    setLoading(false);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Find Your Mentor
      </h1>

      {/* SEARCH BAR */}
      <div className="flex gap-4 max-w-xl mx-auto mb-14">
        <input
          className="flex-1 border rounded-xl px-4 py-3"
          placeholder="Search by name, university, program…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={search}
          className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800"
        >
          Search
        </button>
      </div>

      {/* RESULTS */}
      {loading && (
        <p className="text-center text-slate-500">Searching…</p>
      )}

      {!loading && results.length === 0 && (
        <p className="text-center text-slate-500">
          No mentors found. Try a different search.
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((m) => (
          <div
            key={m.id}
            className="border rounded-2xl p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-semibold mb-4">
              {m.full_name?.split(" ").map((p: string) => p[0])
.join("").slice(0, 2)}
            </div>

            <h3 className="text-lg font-semibold">{m.full_name}</h3>

            <p className="text-slate-600 text-sm mt-1">{m.university}</p>

            <p className="text-slate-500 text-sm mt-3 line-clamp-2">
              {m.bio}
            </p>

            <button
              onClick={() => window.location.href = `/booking?mentor=${m.id}`}
              className="mt-4 w-full py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800"
            >
              View Mentor
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
