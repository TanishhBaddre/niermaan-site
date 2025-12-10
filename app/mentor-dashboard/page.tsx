"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MentorDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load booking requests for this mentor
  useEffect(() => {
    async function loadRequests() {
      const res = await fetch("/api/bookings?type=mentor");
      const data = await res.json();
      setRequests(data || []);
      setLoading(false);
    }
    loadRequests();
  }, []);

  // Accept booking
  async function handleAccept(id: string) {
    const res = await fetch("/api/bookings/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: id }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Booking accepted!");
      window.location.reload();
    } else {
      alert("Failed: " + data.error);
    }
  }

  // Decline booking
  async function handleDecline(id: string) {
    const res = await fetch("/api/bookings/decline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: id }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Booking declined.");
      window.location.reload();
    } else {
      alert("Failed: " + data.error);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10">Mentor Dashboard</h1>

      {/** ==== TOP GRID (existing) ==== */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Profile */}
        <div className="border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-sm text-slate-600 mb-4">
            View and update your personal details.
          </p>
          <Link
            href="/mentor-dashboard/profile"
            className="mt-4 block w-full bg-slate-900 text-white py-2 text-center rounded-lg"
          >
            Edit Profile
          </Link>
        </div>

        {/* Documents */}
        <div className="border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Documents</h2>
          <p className="text-sm text-slate-600 mb-4">
            Upload ID, certificates, and verification files.
          </p>
          <Link
            href="/mentor-dashboard/documents"
            className="mt-4 block w-full bg-slate-900 text-white py-2 text-center rounded-lg"
          >
            Upload Documents
          </Link>
        </div>

        {/* Bank Details */}
        <div className="border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Bank Details</h2>
          <p className="text-sm text-slate-600 mb-4">
            Add your bank information to receive payments.
          </p>
          <button className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg">
            Add Bank Account
          </button>
        </div>
      </div>

      {/** ==== BOOKING REQUESTS SECTION ==== */}
      <div className="border rounded-2xl p-6 shadow-sm mb-12">
        <h2 className="text-xl font-semibold mb-2">Booking Requests</h2>
        <p className="text-sm text-slate-600 mb-4">
          Review new requests from students.
        </p>

        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-slate-500">No booking requests yet.</p>
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="flex justify-between items-center border rounded-xl p-4 mb-3 bg-white"
            >
              <div>
                <p className="font-semibold">{req.student_email}</p>
                <p className="text-sm text-slate-600">
                  Program: {req.program || "N/A"}
                </p>
                <p className="text-xs text-slate-500">
                  Requested for: {new Date(req.scheduled_at).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(req.id)}
                  className="px-4 py-2 bg-green-200 text-green-900 rounded-lg hover:bg-green-300"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleDecline(req.id)}
                  className="px-4 py-2 bg-red-200 text-red-900 rounded-lg hover:bg-red-300"
                >
                  Decline
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/** ==== UPCOMING SESSIONS ==== */}
      <div className="border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Upcoming Sessions</h2>
        <p className="text-sm text-slate-600 mb-4">
          Your confirmed upcoming student sessions will appear here.
        </p>
        <button className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg">
          View Sessions
        </button>
      </div>
    </main>
  );
}
