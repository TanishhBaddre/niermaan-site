"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ProfileForm = {
  fullName: string;
  email: string;
  country: string;
  city: string;
  university: string;
  degree: string;
  headline: string;
  bio: string;
  languages: string; // comma separated, e.g. "English,Hindi"
};

const emptyProfile: ProfileForm = {
  fullName: "",
  email: "",
  country: "",
  city: "",
  university: "",
  degree: "",
  headline: "",
  bio: "",
  languages: "",
};

export default function MentorProfilePage() {
  const [form, setForm] = useState<ProfileForm>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Load profile on first render
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/mentor/profile");
        const data = await res.json();

        if (res.ok && data.profile) {
          setForm({
            fullName: data.profile.full_name ?? "",
            email: data.profile.email ?? "",
            country: data.profile.country ?? "",
            city: data.profile.city ?? "",
            university: data.profile.university ?? "",
            degree: data.profile.degree ?? "",
            headline: data.profile.headline ?? "",
            bio: data.profile.bio ?? "",
            languages: data.profile.languages ?? "",
          });
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function updateField<K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/mentor/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Save error:", data);
        setMessage("Something went wrong saving your profile.");
        return;
      }

      setMessage("Profile saved successfully.");
    } catch (err) {
      console.error("Save error:", err);
      setMessage("Something went wrong saving your profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <p>Loading profile…</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
      <p className="text-slate-600 mb-6">
        Update your personal and professional information. This is what students
        will see on your mentor profile.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal details */}
        <section className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              value={form.country}
              onChange={(e) => updateField("country", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </section>

        {/* Academic / professional */}
        <section className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">University</label>
            <input
              type="text"
              value={form.university}
              onChange={(e) => updateField("university", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Degree</label>
            <input
              type="text"
              value={form.degree}
              onChange={(e) => updateField("degree", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </section>

        <section>
          <label className="block text-sm font-medium mb-1">
            Headline (short one-liner)
          </label>
          <input
            type="text"
            placeholder="e.g. MSc student at University of Manchester"
            value={form.headline}
            onChange={(e) => updateField("headline", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </section>

        <section>
          <label className="block text-sm font-medium mb-1">
            Bio / About you
          </label>
          <textarea
            rows={5}
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </section>

        <section>
          <label className="block text-sm font-medium mb-1">
            Languages (comma separated)
          </label>
          <input
            type="text"
            placeholder="English,Hindi"
            value={form.languages}
            onChange={(e) => updateField("languages", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </section>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Link
            href="/mentor-dashboard"
            className="text-sm text-slate-600 hover:underline"
          >
            ← Back to dashboard
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-slate-900 text-white disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save profile"}
          </button>
        </div>

        {message && (
          <p className="text-sm mt-2 text-slate-700">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
