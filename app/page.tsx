"use client";

import { useRouter } from "next/navigation";

const countries = [
  { name: "United Kingdom", code: "uk", mentors: 18 },
  { name: "United States", code: "usa", mentors: 12 },
  { name: "Canada", code: "canada", mentors: 10 },
  { name: "Europe", code: "europe", mentors: 9 },
  { name: "Australia", code: "australia", mentors: 7 }
];

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">

      {/* MISSION */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Guiding Ambition <span className="text-slate-500">into Legacy</span>
        </h1>

        <p className="mt-6 text-lg text-slate-600">
          We connect students with verified global mentors to help them
          secure admissions, careers, and long-term success abroad.
        </p>
      </section>

      {/* COUNTRY FILTER */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-center">
          Choose Your Destination
        </h2>

        <p className="text-center text-slate-500 mt-2">
          Select a country to view available mentors
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {countries.map(country => (
            <button
              key={country.code}
              onClick={() => router.push(`/mentors?country=${country.code}`)}
              className="border rounded-2xl p-6 text-left hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold">
                {country.name}
              </h3>

              <p className="mt-2 text-slate-600">
                {country.mentors} verified mentors
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* TRUST + CTA */}
      <section className="mt-24 text-center">
        <p className="text-slate-600 mb-6">
          Transparent pricing · Global access · Verified expertise
        </p>

        <button
          onClick={() => router.push("/mentors")}
          className="px-8 py-4 text-lg rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
        >
          Find Your Mentor
        </button>
      </section>

    </main>
  );
}
