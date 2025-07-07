import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase"; // ✅ must exist

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Signup error:", error.message);
      setError(error.message || "Signup failed.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#F9FAFB] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Create an Account</h1>

        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 mb-3 text-sm">
            Account created! Redirecting to login...
          </p>
        )}

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
            className="w-full bg-[#007BFF] text-white py-2 rounded-lg hover:bg-[#005FCC]"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
}
