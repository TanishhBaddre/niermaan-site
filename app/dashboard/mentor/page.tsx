import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import {
  Calendar,
  Users,
  DollarSign,
  CheckCircle2,
  Clock,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

export default async function MentorDashboard() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only mentors can see this page
  if (!user || user.app_metadata.role !== "mentor") {
    redirect("/dashboard");
  }

  // Load profile + bookings
  const [{ data: profile }, { data: bookings }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, university, country")
      .eq("id", user.id)
      .single(),
    supabase
      .from("bookings")
      .select("*")
      .eq("mentor_id", user.id)
      .order("scheduled_at", { ascending: true }),
  ]);

  const allBookings = (bookings ?? []) as any[];

  const upcomingSessions = allBookings.filter(
    (b) => b.status === "confirmed" || b.status === "upcoming"
  );
  const pendingRequests = allBookings.filter((b) => b.status === "pending");
  const completedSessions = allBookings.filter(
    (b) => b.status === "completed"
  );

  const uniqueStudents = new Set(
    allBookings.map((b) => b.student_id || b.student_name)
  );

  const totalStudents = uniqueStudents.size;
  const totalEarnings = 0; // TODO: replace with real earnings when you add an "amount" column

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Mentor Portal
          </p>
          <h1 className="text-4xl font-bold text-slate-900 mt-1">
            Welcome, {profile?.full_name || "Mentor"}
          </h1>
          <p className="text-slate-600 mt-1">
            {profile?.university && (
              <>
                <span className="font-medium">{profile.university}</span>
                {profile?.country && <> • {profile.country}</>}
              </>
            )}
          </p>
        </div>

        <div className="rounded-xl border border-yellow-400/60 bg-gradient-to-r from-[#0F1E3A] to-[#1D4ED8] text-white px-6 py-4 shadow-md max-w-md">
          <p className="text-sm font-semibold uppercase tracking-wide text-yellow-200/90">
            Profile status
          </p>
          <p className="mt-1 font-medium">
            Complete your profile and keep availability updated to attract more
            students.
          </p>
        </div>
      </header>

      {/* KPI cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard
          label="Upcoming Sessions"
          value={upcomingSessions.length}
          icon={<Calendar className="text-blue-500" size={28} />}
        />
        <KpiCard
          label="Total Students"
          value={totalStudents}
          icon={<Users className="text-indigo-500" size={28} />}
        />
        <KpiCard
          label="Completed Sessions"
          value={completedSessions.length}
          icon={<CheckCircle2 className="text-emerald-500" size={28} />}
        />
        <KpiCard
          label="Earnings (Coming Soon)"
          value={totalEarnings}
          icon={<DollarSign className="text-yellow-500" size={28} />}
          isCurrency
        />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Pending requests */}
        <div className="xl:col-span-1">
          <SectionHeader
            title="Booking Requests"
            subtitle="Review new requests from students"
          />
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {pendingRequests.length === 0 ? (
              <EmptyState message="No pending requests at the moment." />
            ) : (
              <ul className="divide-y divide-slate-100">
                {pendingRequests.map((req: any) => (
                  <li key={req.id} className="p-4 flex items-start gap-3">
                    <div className="mt-1">
                      <Clock className="text-indigo-500" size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">
                        {req.student_name || "Student"}
                      </p>
                      <p className="text-sm text-slate-600">
                        Program: {req.program || "Not specified"}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Requested for:{" "}
                        {req.scheduled_at
                          ? new Date(req.scheduled_at).toLocaleString()
                          : "TBD"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Accept
                      </button>
                      <button className="px-3 py-1 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                        Decline
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Upcoming sessions */}
        <div className="xl:col-span-2">
          <SectionHeader
            title="Upcoming Sessions"
            subtitle="Your confirmed and upcoming meetings"
          />
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Program
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date &amp; Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {upcomingSessions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-slate-500 text-sm"
                    >
                      No upcoming sessions scheduled yet.
                    </td>
                  </tr>
                ) : (
                  upcomingSessions.map((session: any) => (
                    <tr
                      key={session.id}
                      className="border-t border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="px-4 py-3 text-sm text-slate-800">
                        {session.student_name || "Student"}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {session.program || "—"}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {session.scheduled_at
                          ? new Date(
                              session.scheduled_at
                            ).toLocaleString()
                          : "TBD"}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                          <Calendar size={14} />
                          {session.status || "Upcoming"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <a
                          href={session.meeting_url || "#"}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                        >
                          Join call
                          <ArrowRight size={14} />
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <SectionHeader
          title="Quick Actions"
          subtitle="Keep your mentor profile strong and visible to students"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard
            title="Verify your profile"
            description="Upload your degree and ID documents to increase trust and visibility."
            icon={<GraduationCap size={22} />}
          />
          <QuickActionCard
            title="Update availability"
            description="Set your weekly time slots so students can book easily."
            icon={<Clock size={22} />}
          />
          <QuickActionCard
            title="Improve your bio"
            description="Highlight your achievements and mentoring experience."
            icon={<Users size={22} />}
          />
        </div>
      </section>
    </div>
  );
}

function KpiCard({
  label,
  value,
  icon,
  isCurrency,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  isCurrency?: boolean;
}) {
  const displayValue = isCurrency ? `$${value.toLocaleString()}` : value;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-[#0F1E3A]/5 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="text-2xl font-bold text-slate-900 mt-1">
          {displayValue}
        </p>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-3">
      <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
        <span className="h-6 w-1 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#0F1E3A]" />
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-white via-white to-slate-50 border border-slate-200 rounded-2xl shadow-sm p-5 flex gap-3">
      <div className="mt-1 h-9 w-9 rounded-full bg-[#0F1E3A] text-yellow-300 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600 mt-1">{description}</p>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="px-4 py-6 text-sm text-slate-500 text-center">
      {message}
    </div>
  );
}
