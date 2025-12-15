import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabaseServer";

export default async function DashboardPage() {
  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl">Dashboard</h1>
      <p>Welcome, {user.email}</p>
    </div>
  );
}
