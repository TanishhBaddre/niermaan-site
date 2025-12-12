import AuthInner from "./AuthInner";

export default function AuthPage({
  searchParams,
}: {
  searchParams?: { mentor?: string; slot?: string; duration?: string };
}) {
  return (
    <AuthInner
      mentor={searchParams?.mentor ?? null}
      slot={searchParams?.slot ?? null}
      duration={searchParams?.duration ?? null}
    />
  );
}
