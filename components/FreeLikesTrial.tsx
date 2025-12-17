import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ShieldCheck, Zap, Lock, Star, ArrowRight } from "lucide-react";
import Script from "next/script";
import Image from "next/image";

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
        setMessage("This Free Trial Has Already Been Used.");
        return;
      }

      setStatus("success");
      setMessage(
        "Your 5 Likes Are Being Delivered Now. Most Trials Start Within Minutes."
      );

      setPostUrl("");
      setEmail("");
      setCaptchaToken(null);
    } catch (err: any) {
      setStatus("error");
      setMessage(
        err?.response?.data?.message ||
          "We Couldn’t Process Your Trial Right Now. Please Try Again."
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

      <section className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-[#CFE4FF] bg-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.15)]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 sm:px-10 py-4 border-b border-[#E6F0FF] bg-[#F9FAFB]">
              <div className="flex items-center gap-2 text-sm font-extrabold text-[#007BFF]">
                <Star size={16} className="fill-[#007BFF]" />
                FREE TRIAL — ONE TIME
              </div>
              <span className="text-xs text-[#666]">
                Trusted By 100,000+ Creators
              </span>
            </div>

            {/* Content */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 px-6 sm:px-10 py-10 sm:py-16">
              {/* Left */}
              <div className="space-y-6">
                {/* LOGO */}
                <div className="mb-2">
                  <Image
                    src="/logo.png"
                    alt="YesViral Logo"
                    width={48}
                    height={48}
                    priority
                  />
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#007BFF] leading-tight">
                  Try YesViral.
                  <br />
                  Get 5 Instagram Likes.
                </h2>

                <p className="text-[#444] text-base sm:text-lg max-w-xl">
                  Test Our Service With A One-Time Free Trial. You’ll Receive{" "}
                  <strong>5 Real Instagram Likes</strong> On One Post To See How
                  YesViral Engagement Looks Before You Buy.
                </p>

                <p className="text-sm text-[#666]">
                  One-Time Trial • No Password Required • No Subscription
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="flex items-center gap-3 rounded-xl border border-[#E6F0FF] bg-white px-4 py-3 shadow-sm">
                    <ShieldCheck size={18} className="text-[#007BFF]" />
                    <span className="text-sm font-semibold text-[#111]">
                      Private Delivery
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-[#E6F0FF] bg-white px-4 py-3 shadow-sm">
                    <Lock size={18} className="text-[#007BFF]" />
                    <span className="text-sm font-semibold text-[#111]">
                      No Password Required
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-[#E6F0FF] bg-white px-4 py-3 shadow-sm">
                    <Zap size={18} className="text-[#007BFF]" />
                    <span className="text-sm font-semibold text-[#111]">
                      Starts Within Minutes
                    </span>
                  </div>
                </div>
              </div>

              {/* Right — Form */}
              <form
                onSubmit={handleSubmit}
                className="relative rounded-2xl border border-[#CFE4FF] bg-[#F9FAFB] p-6 sm:p-8 shadow-lg space-y-5"
              >
                <div>
                  <label className="block text-sm font-bold text-[#111] mb-1.5">
                    Instagram Post URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.instagram.com/p/..."
                    value={postUrl}
                    onChange={(e) => setPostUrl(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[#CFE4FF] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#111] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[#CFE4FF] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                  />
                </div>

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
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#007BFF] py-4 text-sm font-extrabold text-white transition hover:bg-[#005FCC] disabled:opacity-60"
                >
                  {status === "loading" ? (
                    "Sending Likes…"
                  ) : (
                    <>
                      Start Free Trial <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {status !== "idle" && (
                  <p
                    className={`text-sm text-center ${
                      status === "success"
                        ? "text-[#22C55E]"
                        : status === "already"
                        ? "text-[#FACC15]"
                        : "text-[#EF4444]"
                    }`}
                  >
                    {message}
                  </p>
                )}

                <p className="pt-2 text-xs text-center text-[#888]">
                  Protected By Cloudflare • One-Time Use • No Login Required
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
