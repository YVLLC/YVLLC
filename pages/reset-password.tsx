import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`
    });

    if (error) {
      toast.error(error.message || "Failed to send reset email.");
      setSubmitting(false);
      return;
    }

    toast.success("Password reset email sent! Check your inbox.");
    setSuccess(true);
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F0FF] to-white px-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-[#CFE4FF]">
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo.png" alt="YesViral Logo" width={48} height={48} />
          <h1 className="text-3xl font-bold text-[#007BFF] mt-3">Reset Password</h1>
          <p className="text-sm text-[#666] text-center leading-snug max-w-sm mt-2">
            Enter your email and we'll send you a secure link to reset your password.<br />
            Need help? <Link href="/contact" className="text-[#007BFF] hover:underline">Contact support</Link>
          </p>
        </div>

        {!success ? (
          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#111]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 mt-1 border border-[#CFE4FF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-sm"
                placeholder="your@email.com"
                disabled={submitting}
              />
            </div>
            <button
              type="submit"
              disabled={submitting || !email}
              className="w-full bg-[#007BFF] text-white py-3 rounded-xl text-sm font-semibold shadow hover:bg-[#005FCC] transition"
            >
              {submitting ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="flex justify-center mb-2">
              <svg width="40" height="40" fill="none" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="#E6F0FF" />
                <path d="M34 18l-12 12-6-6" stroke="#007BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-[#007BFF] mb-1">Check your inbox</h2>
            <p className="text-sm text-[#444]">
              We've sent a password reset link to <span className="font-semibold">{email}</span>.<br />
              It may take a minute to arrive.
            </p>
          </div>
        )}

        <div className="mt-8 text-xs text-[#888] text-center flex flex-col gap-2">
          <Link href="/login" className="text-[#007BFF] hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}