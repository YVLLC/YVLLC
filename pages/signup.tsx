// signup.tsx — Premium Signup UI + Welcome Email Integration
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import { sendEmail } from "@/lib/email"; // <-- ADDED
import { getWelcomeEmailHtml } from "@/lib/emailTemplates"; // <-- ADDED

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "Signup failed");
      setLoading(false);
      return;
    }

    // Send Welcome Email (Postmark)
    try {
      await sendEmail({
        to: email,
        subject: "🎉 Welcome to YesViral — Your Account is Ready!",
        html: getWelcomeEmailHtml({ name: email.split("@")[0] }),
      });

      console.log("📨 Welcome email sent.");
    } catch (err) {
      console.error("Welcome email failed:", err);
    }

    toast.success("Account created! Check your inbox 👀");
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F0FF] to-white px-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-[#CFE4FF]">
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo.png" alt="YesViral Logo" width={48} height={48} />
          <h1 className="text-3xl font-bold text-[#007BFF] mt-3">Sign Up</h1>
          <p className="text-sm text-[#666]">Create your account to get started</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-xs text-[#888] mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#007BFF] hover:underline">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
