"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function MentorsPage() {
  const params = useSearchParams();
  const router = useRouter();

  const country = params.get("country");

  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const res = await fetch(
        country
          ? `/api/mentors?country=${country}`
          : `/api/mentors`
      );

      const data = await res.json();
      setMentors(data || []);
      setLoading(false);
    }

    load();
  }, [country]);

  if (loading) {
    return <p className="p-20 text-center text-slate-500">Loading mentors…</p>;
  }

  if (mentors.length === 0) {
    return (
      <p className="p-20 text-center text-slate-500">
        No mentors found for this country.
      </p>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-10">
        {country ? `Mentors in ${country.toUpperCase()}` : "All Mentors"}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {mentors.map((mentor: any) => (
          <button
            key={mentor.id}
            onClick={() =>
              router.push(`/booking?mentor=${mentor.id}`)
            }
            className="border rounded-xl p-6 text-left hover:shadow-md"
          >
            <h3 className="text-xl font-semibold">{mentor.full_name}</h3>
            <p className="text-slate-600">{mentor.university}</p>
          </button>
        ))}
      </div>
    </main>
  );
}
