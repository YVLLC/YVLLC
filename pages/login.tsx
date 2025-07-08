import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error("Invalid email or password");
      setLoading(false);
      return;
    }

    toast.success("Logged in successfully");
    setTimeout(() => {
      router.push(email === "admin@yesviral.com" ? "/admin" : "/dashboard");
    }, 800);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F0FF] to-white px-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-[#CFE4FF]">
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo.png" alt="YesViral Logo" width={48} height={48} />
          <h1 className="text-3xl font-bold text-[#007BFF] mt-3">Welcome Back</h1>
          <p className="text-sm text-[#666] text-center leading-snug max-w-sm mt-2">
            Trusted by thousands. Secure, fast, and effective growth services for Instagram, TikTok, and YouTube.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#111]">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 mt-1 border border-[#CFE4FF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-[#111]">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 mt-1 border border-[#CFE4FF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#007BFF] text-white py-3 rounded-xl text-sm font-semibold shadow hover:bg-[#005FCC] transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-xs text-[#888] mt-6">
          Forgot your password?{" "}
          <a href="#" className="text-[#007BFF] hover:underline">
            Reset it
          </a>
        </p>
      </div>
    </main>
  );
}
