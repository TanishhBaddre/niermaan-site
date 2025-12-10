"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  GraduationCap,
  UserCircle
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/admin", label: "Admin", icon: Users },
  { href: "/dashboard/mentor", label: "Mentor", icon: GraduationCap },
  { href: "/dashboard/student", label: "Student", icon: UserCircle }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold tracking-tight">Niermaan</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all 
                ${active ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              <Icon size={20} />
              <span className="text-lg">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
