import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Image from "next/image";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.error(error.message || "Failed to update password.");
      setSubmitting(false);
      return;
    }
    toast.success("Password updated! You can now log in.");
    setTimeout(() => router.push("/login"), 1200);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F0FF] to-white px-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-[#CFE4FF]">
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo.png" alt="YesViral Logo" width={48} height={48} />
          <h1 className="text-3xl font-bold text-[#007BFF] mt-3">Set a New Password</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-4 py-2.5 mt-1 border border-[#CFE4FF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-sm"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#007BFF] text-white py-3 rounded-xl text-sm font-semibold shadow hover:bg-[#005FCC] transition"
          >
            {submitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </main>
  );
}