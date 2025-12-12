import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Niermaan
        </h1>

        <p className="text-slate-600 mb-8">
          Book 1-on-1 sessions with verified mentors from top global universities.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/mentors"
            className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800"
          >
            Browse Mentors
          </Link>

          <Link
            href="/dashboard"
            className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
