"use client";

import { useRouter } from "next/navigation";

type Mentor = {
  id: string;
  full_name: string;
  headline?: string;
  bio?: string;
};

export default function MentorsClient({
  mentors,
  country,
}: {
  mentors: Mentor[];
  country: string | null;
}) {
  const router = useRouter();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-3">
        {country ? `${country.toUpperCase()} Mentors` : "All Mentors"}
      </h1>

      <p className="text-slate-600 mb-10">
        Verified mentors from top global universities.
      </p>

      {mentors.length === 0 && (
        <p className="text-center text-slate-500 text-lg p-20">
          No mentors found.
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentors.map((m) => (
          <div
            key={m.id}
            onClick={() => router.push(`/booking?mentor=${m.id}`)}
            className="border rounded-2xl p-6 hover:shadow-lg transition cursor-pointer bg-white"
          >
            <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-semibold mb-4">
              {m.full_name
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)}
            </div>

            <h3 className="text-xl font-semibold">{m.full_name}</h3>

            <p className="text-slate-600 text-sm mt-1">
              {m.headline || "Verified Mentor"}
            </p>

            <p className="text-slate-500 text-sm mt-3 line-clamp-2">
              {m.bio || "Experienced mentor helping students succeed."}
            </p>

            <button className="mt-6 w-full py-2 bg-slate-900 text-white rounded-xl">
              Book Session
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
