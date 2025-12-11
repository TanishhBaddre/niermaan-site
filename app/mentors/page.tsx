"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function MentorsPage() {
  const params = useSearchParams();
  const router = useRouter();
  const country = params.get("country");

  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const url = country
        ? `/api/mentors?country=${country}`
        : `/api/mentors`;

      const res = await fetch(url);
      const data = await res.json();

      setMentors(data || []);
      setLoading(false);
    }

    load();
  }, [country]);

  if (loading) {
    return (
      <main className="p-20 text-center text-slate-500">
        Loading mentors…
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-3">
        {country ? `${country.toUpperCase()} Mentors` : "All Mentors"}
      </h1>
      <p className="text-slate-600 mb-10">
        Verified mentors from top global universities.
      </p>

      {mentors.length === 0 && (
        <p className="text-center text-slate-500 text-lg p-20">
          No mentors found for this region.
        </p>
      )}

      {/* MENTOR GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentors.map((m) => (
          <div
            key={m.id}
            className="border rounded-2xl p-6 hover:shadow-lg transition cursor-pointer bg-white"
            onClick={() => router.push(`/booking?mentor=${m.id}`)}
          >
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-semibold mb-4">
              {m.full_name?.split(" ").map((p: string) => p[0])
.join("").slice(0, 2)}
            </div>

            <h3 className="text-xl font-semibold">{m.full_name}</h3>
            <p className="text-slate-600 text-sm mt-1">
              {m.headline || "Verified Mentor"}
            </p>

            <p className="text-slate-500 text-sm mt-3 line-clamp-2">
              {m.bio || "Experienced mentor helping students succeed."}
            </p>

            <button className="mt-6 w-full py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800">
              Book Session
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
