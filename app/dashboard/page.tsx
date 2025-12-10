import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function DashboardIndex() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const role = user.app_metadata?.role;

  switch (role) {
    case "admin":
      redirect("/dashboard/admin");
    case "mentor":
      redirect("/dashboard/mentor");
    case "student":
      redirect("/dashboard/student");
    default:
      return <div className="p-10">Invalid role. Contact support.</div>;
  }
}
