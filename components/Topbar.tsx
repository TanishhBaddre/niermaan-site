"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  }

  return (
    <header className="w-full h-16 border-b bg-white shadow-sm flex items-center justify-between px-8">
      <h2 className="text-xl font-semibold tracking-tight">Dashboard</h2>

      <button
        onClick={logout}
        className="flex items-center gap-2 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </header>
  );
}
