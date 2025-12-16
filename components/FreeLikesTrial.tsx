import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  ShieldCheck,
  Zap,
  Lock,
  Star,
  ArrowRight,
} from "lucide-react";
import Script from "next/script";

type Status = "idle" | "loading" | "success" | "error" | "already";

declare global {
  interface Window {
    turnstile: any;
    onTurnstileSuccess: (token: string) => void;
  }
}

export default function FreeLikesTrial() {
  const [postUrl, setPostUrl] = useState("");
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const turnstileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.onTurnstileSuccess = (token: string) => {
      setCaptchaToken(token);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    // 🔑 EXECUTE INVISIBLE TURNSTILE FIRST
    if (!captchaToken && window.turnstile && turnstileRef.current) {
      window.turnstile.execute(turnstileRef.current);
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await axios.post("/api/free-likes", {
        postUrl,
        email,
        captchaToken,
      });

      if (res.data?.status === "already_used") {
        setStatus("already");
        setMessage("This free trial has already been used.");
        return;
      }

      setStatus("success");
      setMessage(
        "Your 5 free likes are being delivered now. Most orders start within minutes."
      );

      setPostUrl("");
      setEmail("");
      setCaptchaToken(null);
    } catch (err: any) {
      setStatus("error");
      setMessage(
        err?.response?.data?.message ||
          "We couldn’t process your request right now. Please try again."
      );
    }
  };

  return (
    <>
      {/* Cloudflare Turnstile */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />

      <section className="relative py-24">
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[32px] border border-[#CFE4FF] bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-between px-8 py-4 border-b border-[#E6F0FF] bg-[#F9FAFB]">
              <div className="flex items-center gap-2 text-sm font-bold text-[#007BFF]">
                <Star className="fill-[#007BFF]" size={16} />
                FREE TRIAL — LIMITED TIME
              </div>
              <span className="text-xs text-[#555]">
                Used by 100,000+ Creators
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 px-8 py-14">
              {/* LEFT */}
              <div className="space-y-7">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#007BFF] leading-tight">
                  See the Difference
                  <br />
                  Real Engagement Makes.
                </h2>

                <p className="text-[#444] text-lg max-w-lg">
                  Try YesViral with 5 Free Likes.  
                  Get <strong>5 High-Quality Instagram Likes</strong> on one post and see
                  how engagement instantly changes perception.
                </p>

                <div className="grid sm:grid-cols-3 gap-6 pt-4">
                  <div className="flex items-center gap-4 bg-white border border-[#E6F0FF] rounded-xl px-4 py-3 shadow-sm">
                    <ShieldCheck size={18} className="text-[#007BFF]" />
                    <span className="text-sm font-semibold text-[#111]">
                      Secure Delivery
                    </span>
                  </div>
                  <div className="flex items-center gap-4 bg-white border border-[#E6F0FF] rounded-xl px-4 py-3 shadow-sm">
                    <Lock size={18} className="text-[#007BFF]" />
                    <span className="text-sm font-semibold text-[#111]">
                      No Password Needed
                    </span>
                  </div>
                  <div className="flex items-center gap-4 bg-white border border-[#E6F0FF] rounded-xl px-4 py-3 shadow-sm">
                    <Zap size={18} className="text-[#007BFF]" />
                    <span className="text-sm font-semibold text-[#111]">
                      Starts in Minutes
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT — FORM */}
              <form
                onSubmit={handleSubmit}
                className="relative bg-[#F9FAFB] border border-[#CFE4FF] rounded-2xl p-8 shadow-lg space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold text-[#111] mb-2">
                    Instagram Post URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.instagram.com/p/..."
                    value={postUrl}
                    onChange={(e) => setPostUrl(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[#CFE4FF] px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#111] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[#CFE4FF] px-4 py-3"
                  />
                </div>

                {/* INVISIBLE TURNSTILE */}
                <div
                  ref={turnstileRef}
                  className="cf-turnstile"
                  data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                  data-callback="onTurnstileSuccess"
                  data-size="invisible"
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-[#007BFF] text-white font-extrabold py-4 rounded-xl hover:bg-[#005FCC] transition disabled:opacity-60"
                >
                  {status === "loading" ? "Sending Likes…" : <>Get 5 Free Likes <ArrowRight size={18} /></>}
                </button>

                {status !== "idle" && (
                  <p className={`text-sm text-center ${
                    status === "success"
                      ? "text-[#22C55E]"
                      : status === "already"
                      ? "text-[#FACC15]"
                      : "text-[#EF4444]"
                  }`}>
                    {message}
                  </p>
                )}

                <div className="pt-3 text-xs text-center text-[#888]">
                  Protected by Cloudflare • One-time use • No login required
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
