import Link from "next/link";

type Mentor = {
  id: string;
  full_name: string;
  headline?: string;
  bio?: string;
};

export default async function MentorsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mentors`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <main className="p-20 text-center">
        Failed to load mentors
      </main>
    );
  }

  const mentors: Mentor[] = await res.json();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">All Mentors</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentors.map((m) => (
          <Link
            key={m.id}
            href={`/booking?mentor=${m.id}`}
            className="border rounded-2xl p-6 hover:shadow-lg transition bg-white"
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
          </Link>
        ))}
      </div>
    </main>
  );
}
