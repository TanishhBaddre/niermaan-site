"use client";

import { Suspense } from "react";
import PaymentInner from "./PaymentInner";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading payment...</div>}>
      <PaymentInner />
    </Suspense>
  );
}
