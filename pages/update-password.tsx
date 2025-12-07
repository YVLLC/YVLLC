import { useState, FormEvent, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Image from "next/image";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [tokenMissing, setTokenMissing] = useState(false);

  // 🔥 Check if Supabase recovery token is present
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      setTokenMissing(true);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message || "Failed to update password.");
      setSubmitting(false);
      return;
    }

    toast.success("Your password has been updated.");
    setTimeout(() => router.push("/login"), 1200);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F0FF] to-white px-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-[#CFE4FF]">

        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo.png" alt="YesViral Logo" width={54} height={54} />
          <h1 className="text-3xl font-extrabold text-[#007BFF] mt-3 tracking-tight">
            Set a New Password
          </h1>
          <p className="text-sm text-[#666] text-center mt-2">
            Choose a strong password to secure your YesViral account.
          </p>
        </div>

        {/* 🔥 If user visited page without Supabase token */}
        {tokenMissing ? (
          <div className="text-center py-6">
            <p className="text-[#444] text-sm mb-3">
              This reset link is invalid or expired.
            </p>
            <button
              onClick={() => router.push("/reset-password")}
              className="bg-[#007BFF] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow hover:bg-[#005FCC] transition"
            >
              Request a New Reset Link
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-[#111] mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 border border-[#CFE4FF] rounded-xl
                          focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-sm"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-[#111] mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 border border-[#CFE4FF] rounded-xl
                          focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-sm"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#007BFF] text-white py-3 rounded-xl text-sm font-semibold
                         shadow-lg hover:bg-[#005FCC] transition disabled:opacity-60"
            >
              {submitting ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-8 text-xs text-[#888] text-center">
          Protecting your account with SSL + encrypted authentication.
        </div>

      </div>
    </main>
  );
}
