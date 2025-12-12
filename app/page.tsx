import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold mb-6">
        Welcome to Niermaan
      </h1>

      <p className="text-slate-600 max-w-xl mb-10">
        Book 1-on-1 mentorship sessions with verified mentors from top universities.
      </p>

      <Link
        href="/mentors"
        className="px-8 py-4 bg-slate-900 text-white rounded-xl text-lg hover:bg-slate-800 transition"
      >
        Browse Mentors →
      </Link>
    </main>
  );
}
