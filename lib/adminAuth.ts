export function checkAdminAuth() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("admin-auth") === "true";
}
