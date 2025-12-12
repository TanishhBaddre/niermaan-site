import BookingInner from "./BookingInner";

export default function BookingPage({
  searchParams,
}: {
  searchParams?: { mentor?: string };
}) {
  return <BookingInner mentorId={searchParams?.mentor ?? null} />;
}
