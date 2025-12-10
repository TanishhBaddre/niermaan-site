import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
