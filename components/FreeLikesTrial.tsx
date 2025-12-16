import { useState } from "react";
import axios from "axios";

type Status = "idle" | "loading" | "success" | "error" | "already";

export default function FreeLikesTrial() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await axios.post("/api/free-likes-followiz", {
        username,
        email,
      });

      if (res.data?.status === "already_used") {
        setStatus("already");
        setMessage("This free trial has already been used.");
        return;
      }

      setStatus("success");
      setMessage(
        "Your 5 free Instagram likes are being delivered. This usually takes just a few minutes."
      );
      setUsername("");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(
        err?.response?.data?.message ||
          "We couldn’t process your request right now. Please try again."
      );
    }
  };

  return (
    <section className="bg-white border-t border-[#E6F0FF] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#F9FAFB] rounded-3xl shadow-xl p-8 md:p-12 text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111111] mb-3">
            Try YesViral — Free Instagram Likes
          </h2>

          <p className="text-[#444444] max-w-xl mx-auto mb-8">
            See how real engagement changes perception.  
            No password required. One-time trial. Delivered safely.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 justify-center items-stretch"
          >
            <input
              type="text"
              placeholder="Instagram username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              required
              className="flex-1 rounded-xl border border-[#CFE4FF] px-4 py-3 text-[#111111] focus:outline-none focus:border-[#0056B3]"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              required
              className="flex-1 rounded-xl border border-[#CFE4FF] px-4 py-3 text-[#111111] focus:outline-none focus:border-[#0056B3]"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl bg-[#007BFF] px-6 py-3 font-semibold text-white hover:bg-[#005FCC] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending…" : "Get 5 Free Likes"}
            </button>
          </form>

          {/* Status Message */}
          {status !== "idle" && (
            <div className="mt-6">
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-[#22C55E]"
                    : status === "already"
                    ? "text-[#FACC15]"
                    : "text-[#EF4444]"
                }`}
              >
                {message}
              </p>
            </div>
          )}

          {/* Trust Footer */}
          <div className="mt-8 text-xs text-[#888888]">
            No password required • Secure delivery • Used by 100,000+ creators
          </div>
        </div>
      </div>
    </section>
  );
}
