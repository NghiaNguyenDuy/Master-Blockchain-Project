"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("chair@voting.local");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/vote");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={onSubmit}
        className="border rounded-lg shadow p-6 w-full max-w-sm space-y-4 bg-white"
      >
        <h1 className="text-xl font-bold text-center">Login to Voting App</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            className="border rounded w-full px-2 py-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            className="border rounded w-full px-2 py-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded py-2"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
