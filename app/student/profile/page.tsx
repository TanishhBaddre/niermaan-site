"use client";

import { useEffect, useState } from "react";

type Profile = {
  full_name: string;
  university: string;
  goals: string;
};

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    university: "",
    goals: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const res = await fetch("/api/student/profile");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to load profile");
        }

        setProfile({
          full_name: data.full_name ?? "",
          university: data.university ?? "",
          goals: data.goals ?? "",
        });
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/student/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save profile");
      }

      setProfile({
        full_name: data.full_name ?? "",
        university: data.university ?? "",
        goals: data.goals ?? "",
      });
      setMessage("Profile updated!");
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-500">Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8">
      <div>
        <p className="text-sm tracking-wide text-gray-500 font-semibold">
          STUDENT PROFILE
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">
          Edit your profile
        </h1>
        <p className="text-gray-500 mt-1">
          This helps mentors understand your background and goals.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow border p-6 space-y-6"
      >
        {message && (
          <p className="text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
            {message}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            value={profile.full_name}
            onChange={(e) =>
              setProfile((p) => ({ ...p, full_name: e.target.value }))
            }
            placeholder="John Carter"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            University
          </label>
          <input
            type="text"
            className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            value={profile.university}
            onChange={(e) =>
              setProfile((p) => ({ ...p, university: e.target.value }))
            }
            placeholder="e.g. London University"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Goals
          </label>
          <textarea
            className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            rows={4}
            value={profile.goals}
            onChange={(e) =>
              setProfile((p) => ({ ...p, goals: e.target.value }))
            }
            placeholder="Describe the programs, countries, or career paths you’re aiming for…"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
