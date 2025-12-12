import { Suspense } from "react";
import MentorsInner from "./MentorsInner";

export default function MentorsPage() {
  return (
    <Suspense
      fallback={
        <main className="p-20 text-center text-slate-500">
          Loading mentors…
        </main>
      }
    >
      <MentorsInner />
    </Suspense>
  );
}
