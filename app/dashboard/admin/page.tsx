import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import { Th, Td } from "@/components/Table";
import { Users, GraduationCap, CalendarDays } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata.role !== "admin") {
    redirect("/dashboard");
  }

  const [{ data: mentors }, { data: users }, { data: bookings }] =
    await Promise.all([
      supabase.from("mentors").select("*"),
      supabase.from("profiles").select("*"),
      supabase.from("bookings").select("*"),
    ]);

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold text-slate-800">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <StatCard
          label="Total Users"
          value={users?.length || 0}
          icon={<Users className="text-blue-600" size={32} />}
        />
        
        <StatCard
          label="Total Mentors"
          value={mentors?.length || 0}
          icon={<GraduationCap className="text-blue-600" size={32} />}
        />

        <StatCard
          label="Total Bookings"
          value={bookings?.length || 0}
          icon={<CalendarDays className="text-blue-600" size={32} />}
        />
      </div>

      {/* Mentor Directory */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Mentor Directory
        </h2>

        <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <thead className="bg-slate-100">
            <tr>
              <Th>Name</Th>
              <Th>Country</Th>
              <Th>University</Th>
              <Th>Status</Th>
            </tr>
          </thead>

          <tbody>
            {mentors?.map((m: any) => (
              <tr key={m.id} className="border-t hover:bg-slate-50 transition">
                <Td>{m.full_name}</Td>
                <Td>{m.country}</Td>
                <Td>{m.university}</Td>
                <Td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${m.approved
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                    }
                  `}
                  >
                    {m.approved ? "Approved" : "Pending"}
                  </span>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center gap-4">
      {icon}
      <div>
        <p className="text-slate-500 text-sm">{label}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
