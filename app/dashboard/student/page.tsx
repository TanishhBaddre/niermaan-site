"use client";

import { Calendar, CheckCircle2, User } from "lucide-react";
import MentorSearch from "../../../components/MentorSearch";
import StudentBookings from "../../../components/StudentBookings";

import { useState } from "react";

export default function StudentDashboardPage() {
  const [reloadKey, setReloadKey] = useState(0);

  function handleBooked() {
    setReloadKey((k) => k + 1);
  }

  return (
    <div className="p-8 space-y-8">
      {/* Top Section */}
      <div className="space-y-2">
        <p className="text-sm tracking-wide text-gray-500 font-semibold">
          STUDENT PORTAL
        </p>
        <h1 className="text-4xl font-bold text-gray-900">Welcome, Student</h1>
      </div>

      {/* Profile Status */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-6 rounded-xl shadow-md flex justify-between items-center">
        <div>
          <p className="text-sm font-semibold text-yellow-300">PROFILE STATUS</p>
          <p className="text-lg">
            Complete your profile to get better mentor matches.
          </p>
        </div>
        <CheckCircle2 className="h-12 w-12 text-yellow-300" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<User className="text-blue-700 h-8 w-8" />}
          label="Saved Mentors"
          value={0}
        />
        <StatCard
          icon={<Calendar className="text-blue-700 h-8 w-8" />}
          label="Upcoming Sessions"
          value={0}
        />
        <StatCard
          icon={<CheckCircle2 className="text-blue-700 h-8 w-8" />}
          label="Completed Sessions"
          value={0}
        />
      </div>

      {/* Search */}
      <MentorSearch onBooked={handleBooked} />

      {/* Bookings List */}
      <StudentBookings reloadKey={reloadKey} />
    </div>
  );
}

// -------------------------
//   STAT CARD COMPONENT
// -------------------------
function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-white rounded-xl shadow border text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        {icon}
        <p className="text-gray-500 font-medium">{label}</p>
      </div>

      <p className="text-3xl font-bold mt-3 text-gray-900">{value}</p>
    </div>
  );
}
