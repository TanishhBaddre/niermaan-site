import MentorSearch from "@/components/MentorSearch";

export default function FindMentorPage() {
  return (
    <div className="p-10 max-w-5xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">Find a Mentor</h1>

      <MentorSearch />
    </div>
  );
}
