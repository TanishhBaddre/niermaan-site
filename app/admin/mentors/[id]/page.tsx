"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Mentor = {
  id: string;
  full_name: string;
  email: string;
  country: string;
  city: string;
  university: string;
  degree: string;
  headline: string;
  bio: string | null;
  languages: string | null;
  approved: boolean;
  created_at: string;
};

export default function MentorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);

  // Load mentor info
  useEffect(() => {
    async function loadMentor() {
      const res = await fetch(`/api/admin/mentors/${id}`);
      const data = await res.json();
      setMentor(data);
      setLoading(false);
    }
    loadMentor();
  }, [id]);

  // Approve / Reject
  async function updateStatus(approved: boolean) {
    const res = await fetch(`/api/admin/mentors/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ approved }),
    });

    const data = await res.json();
    setMentor(data);
  }

  if (loading) return <p className="p-6">Loading...</p>;
  if (!mentor) return <p className="p-6">Mentor not found.</p>;

  return (
    <main className="p-6">
      <button className="underline mb-4" onClick={() => router.back()}>
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{mentor.full_name}</h1>
      <p className="text-gray-500 mb-4">{mentor.email}</p>

      <div className="space-y-2 mb-6">
        <p><strong>Location:</strong> {mentor.city}, {mentor.country}</p>
        <p><strong>University:</strong> {mentor.university}</p>
        <p><strong>Degree:</strong> {mentor.degree}</p>
        <p><strong>Headline:</strong> {mentor.headline}</p>
        <p><strong>Bio:</strong> {mentor.bio || "-"}</p>
        <p><strong>Languages:</strong> {mentor.languages || "-"}</p>
        <p><strong>Joined:</strong> {new Date(mentor.created_at).toLocaleDateString()}</p>
      </div>

      {/* Approve / Reject Section */}
      <div className="flex gap-4">
        {!mentor.approved && (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => updateStatus(true)}
          >
            Approve
          </button>
        )}

        {mentor.approved && (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => updateStatus(false)}
          >
            Reject
          </button>
        )}
      </div>
    </main>
  );
}
