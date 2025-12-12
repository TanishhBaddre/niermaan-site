import { Suspense } from "react";
import MentorsInner from "./MentorsInner";

// 🔴 CRITICAL: this disables static prerendering
export const dynamic = "force-dynamic";

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
