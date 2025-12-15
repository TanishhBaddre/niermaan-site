"use client";

import { Suspense } from "react";
import PayContent from "./pay-content";

export default function PayPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Loading payment…</div>}>
      <PayContent />
    </Suspense>
  );
}
