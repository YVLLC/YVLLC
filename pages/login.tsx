import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth", {
        email,
        password,
        mode: "login"
      });

      if (res.status === 200) {
        router.push("/admin");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.error || "Login failed.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#F9FAFB] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Admin Login</h1>

        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#111]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#CFE4FF] rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111]">Password</label>
            <input
              type="password"
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
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}
