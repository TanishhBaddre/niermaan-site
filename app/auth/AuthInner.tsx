"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthInner({
  mentor,
  slot,
  duration,
}: {
  mentor: string | null;
  slot: string | null;
  duration: string | null;
}) {
  const router = useRouter();

  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && mentor && slot && duration) {
      router.push(
        `/pay?mentor=${mentor}&slot=${encodeURIComponent(slot)}&duration=${duration}`
      );
    }
  }, [mentor, slot, duration, router]);

  const continueToPayment = () => {
    router.push(
      `/pay?mentor=${mentor}&slot=${encodeURIComponent(
        slot ?? ""
      )}&duration=${duration}`
    );
  };

  return (
    <main className="max-w-lg mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-center mb-10">Your Account</h1>

      <div className="flex gap-4 justify-center mb-8">
        <button onClick={() => setMode("signup")}>Sign Up</button>
        <button onClick={() => setMode("login")}>Log In</button>
      </div>

      {mode === "signup" && (
        <input
          placeholder="Full Name"
          className="w-full border rounded-xl px-4 py-3 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        placeholder="Email"
        className="w-full border rounded-xl px-4 py-3 mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border rounded-xl px-4 py-3 mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {mode === "signup" && (
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded-xl px-4 py-3 mb-4"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      )}

      <button
        onClick={continueToPayment}
        className="w-full bg-slate-900 text-white py-4 rounded-xl"
      >
        Continue
      </button>
    </main>
  );
}
