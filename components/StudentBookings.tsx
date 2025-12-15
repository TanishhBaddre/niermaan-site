"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  scheduled_at: string | null;
  status: string | null;
  program: string | null;
  notes: string | null;
  mentors?: { full_name: string | null; university: string | null } | null;
};

function StatusBadge({ status }: { status: string | null }) {
  const s = (status || "pending").toLowerCase();

  const colors: Record<string, string> = {
    pending: "bg-gray-200 text-gray-700",
    accepted: "bg-blue-100 text-blue-700",
    paid: "bg-green-200 text-green-700",
    declined: "bg-red-200 text-red-700"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[s] || colors.pending}`}>
      {s}
    </span>
  );
}

export default function StudentBookings({ reloadKey }: { reloadKey: number }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : data?.data || []);
      } catch (e) {
        console.error("Failed to load bookings:", e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [reloadKey]);

  async function handlePayNow(bookingId: string) {
    const res = await fetch("/api/payment/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId })
    });

    const data = await res.json();
    if (data?.url) window.location.href = data.url;
    else alert("Payment session error");
  }

  return (
    <div className="bg-white rounded-xl p-6 border shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-gray-900">My Bookings</h2>

      {loading ? (
        <p className="text-sm text-gray-500">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <div className="border rounded-lg p-5 bg-gray-50 text-gray-500 text-sm text-center">
          No bookings yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-600">Mentor</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-600">University</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-600">Program</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-600">Date &amp; Time</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-600">Status</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-600">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b last:border-0">
                  <td className="px-3 py-2">{b.mentors?.full_name || "Mentor"}</td>
                  <td className="px-3 py-2">{b.mentors?.university || "—"}</td>
                  <td className="px-3 py-2">{b.program || "—"}</td>
                  <td className="px-3 py-2">
                    {b.scheduled_at ? new Date(b.scheduled_at).toLocaleString() : "TBD"}
                  </td>
                  <td className="px-3 py-2">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-3 py-2">
                    {b.status === "accepted" && (
                      <button
                        onClick={() => handlePayNow(b.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700"
                      >
                        Pay Now (£30)
                      </button>
                    )}
                    {b.status === "paid" && (
                      <span className="text-green-600 text-xs font-medium">Payment Complete</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
