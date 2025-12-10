"use client";

import { Suspense } from "react";
import AuthInner from "./AuthInner";

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <AuthInner />
    </Suspense>
  );
}
