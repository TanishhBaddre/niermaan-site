import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabaseServer";


export default async function MentorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) return notFound();

  const supabase = await createSupabaseServer();
  const { data: mentor } = await supabase
    .from("mentors")
    .select("*")
    .eq("id", id)
    .single();

  if (!mentor) return notFound();

  return (
  <div className="max-w-5xl mx-auto py-12 px-6">
    {/* MAIN CARD */}
    <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
      
      {/* HEADER */}
      <div className="flex items-center gap-8">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
          <span className="text-white text-4xl font-bold">
            {mentor.full_name.split(" ").map((n: string) => n[0]).join("")}

          </span>
        </div>

        {/* Name + Tags */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{mentor.full_name}</h1>

          <div className="flex gap-3 mt-3 flex-wrap">
            <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2 text-sm">
              🎓 {mentor.university}
            </span>

            <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-2 text-sm">
              🌍 {mentor.country}
            </span>
          </div>

          <p className="text-gray-500 italic mt-3 text-lg">{mentor.expertise}</p>
        </div>
      </div>

      <hr className="my-10" />

      {/* ABOUT SECTION */}
      <h2 className="text-2xl font-semibold text-gray-800">About</h2>
      <p className="mt-3 text-gray-700 leading-relaxed text-lg">
        {mentor.bio}
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center border border-gray-100">
          <p className="text-3xl font-bold text-blue-600">4.9 ⭐</p>
          <p className="text-gray-500 mt-1 font-medium">Rating</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center border border-gray-100">
          <p className="text-3xl font-bold text-purple-600">120+</p>
          <p className="text-gray-500 mt-1 font-medium">Students Mentored</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center border border-gray-100">
          <p className="text-3xl font-bold text-green-600">5 yrs</p>
          <p className="text-gray-500 mt-1 font-medium">Experience</p>
        </div>

      </div>

      {/* CTA BUTTON */}
      <div className="mt-12 text-center">
        <a
          href={`/booking?mentor=${mentor.id}`}
          className="inline-block px-10 py-4 text-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition"
        >
          Book a Session →
        </a>
      </div>

    </div>
  </div>
);



}
