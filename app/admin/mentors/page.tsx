"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Mentor = {
  id: string;
  full_name: string;
  email: string;
  approved: boolean;
};

export default function AdminMentorsPage() {
  const router = useRouter();
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin-auth") === "true";
    if (!isAdmin) router.push("/admin/login");

    async function loadMentors() {
      const res = await fetch("/api/admin/mentors");
      const data = await res.json();
      setMentors(data);
    }

    loadMentors();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Mentors</h1>

      <table className="w-full border">
        <thead>
          <tr className="border bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {mentors.map((m) => (
            <tr key={m.id} className="border">
              <td className="p-2">{m.full_name}</td>
              <td className="p-2">{m.email}</td>
              <td className="p-2">
                {m.approved ? "Approved" : "Pending"}
              </td>
              <td className="p-2">
                <Link
                  href={`/admin/mentors/${m.id}`}
                  className="text-blue-600 underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
