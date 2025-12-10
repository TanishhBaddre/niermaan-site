"use client";

import { Suspense } from "react";
import BookingInner from "./BookingInner";

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading booking...</div>}>
      <BookingInner />
    </Suspense>
  );
}
