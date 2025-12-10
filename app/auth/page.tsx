"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const params = useSearchParams();

  const mentor = params.get("mentor");
  const slot = params.get("slot");
  const duration = params.get("duration");

  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // If user already "logged in", skip to payment
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && mentor && slot && duration) {
      router.push(
        `/payment?mentor=${mentor}&slot=${encodeURIComponent(
          slot
        )}&duration=${duration}`
      );
    }
  }, [mentor, slot, duration, router]);

  const handleSignup = () => {
    if (!name || !email || !password || !confirm) {
      alert("All fields required");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const userData = { name, email };
    localStorage.setItem("user", JSON.stringify(userData));

    router.push(
      `/payment?mentor=${mentor}&slot=${encodeURIComponent(
        slot || ""
      )}&duration=${duration}`
    );
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    const userData = { email };
    localStorage.setItem("user", JSON.stringify(userData));

    router.push(
      `/payment?mentor=${mentor}&slot=${encodeURIComponent(
        slot || ""
      )}&duration=${duration}`
    );
  };

  return (
    <main className="max-w-lg mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-center mb-10">Your Account</h1>

      {/* Tabs */}
      <div className="flex gap-4 justify-center">
        <button
          className={`px-6 py-2 border-b-2 ${
            mode === "signup"
              ? "border-slate-900 font-semibold"
              : "border-transparent"
          }`}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
        <button
          className={`px-6 py-2 border-b-2 ${
            mode === "login"
              ? "border-slate-900 font-semibold"
              : "border-transparent"
          }`}
          onClick={() => setMode("login")}
        >
          Log In
        </button>
      </div>

      {/* Form */}
      <div className="mt-10">
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
          onClick={mode === "signup" ? handleSignup : handleLogin}
          className="w-full bg-slate-900 text-white py-4 rounded-xl hover:bg-slate-800"
        >
          {mode === "signup" ? "Create Account" : "Log In"}
        </button>
      </div>
    </main>
  );
}
