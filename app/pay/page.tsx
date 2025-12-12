import PaymentInner from "./PaymentInner";

export default function PayPage({
  searchParams,
}: {
  searchParams?: { mentor?: string; slot?: string; duration?: string };
}) {
  return (
    <PaymentInner
      mentor={searchParams?.mentor ?? null}
      slot={searchParams?.slot ?? null}
      duration={searchParams?.duration ?? null}
    />
  );
}
