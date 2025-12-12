import MentorsClient from "./MentorsClient";

export const dynamic = "force-dynamic";

type Mentor = {
  id: string;
  full_name: string;
  headline?: string;
  bio?: string;
};

export default async function MentorsPage({
  searchParams,
}: {
  searchParams?: { country?: string };
}) {
  const country = searchParams?.country ?? null;

  const url = country
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/mentors?country=${country}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/mentors`;

  const res = await fetch(url, { cache: "no-store" });
  const mentors: Mentor[] = await res.json();

  return <MentorsClient mentors={mentors} country={country} />;
}
