"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin-auth") === "true";
    if (!isAdmin) router.push("/admin/login");
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="mt-6 space-y-4">
        <a
          href="/admin/mentors"
          className="block p-4 bg-gray-100 border rounded hover:bg-gray-200"
        >
          Manage Mentors
        </a>
      </div>
    </main>
  );
}
