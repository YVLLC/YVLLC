// pages/signup.tsx
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const res = await axios.post("/api/signup", { email, password });

      if (res.status === 200) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setError("Unexpected error. Please try again.");
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      const message = err?.response?.data?.message || "Signup failed.";
      setError(message);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#F9FAFB] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Create an Account</h1>

        {error && <p className="text-red-500 mb-3 text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 mb-3 text-sm text-center">Account created! Redirecting...</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#111]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#CFE4FF] rounded-lg mt-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#111]">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#CFE4FF] rounded-lg mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#007BFF] text-white py-2 rounded-lg hover:bg-[#005FCC] transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
}
