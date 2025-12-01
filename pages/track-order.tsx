import { useState, useRef } from "react";
import axios from "axios";
import {
  Search,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  MessageCircle,
  Home,
  ChevronDown,
  Repeat,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import OrderModal from "@/components/OrderModal";

// --- STATUS & FAQS ---
const STATUS_ICONS: Record<string, JSX.Element> = {
  searching: <RefreshCw className="animate-spin text-[#007BFF]" size={32} />,
  // ✅ Use YesViral blue instead of green
  delivered: <CheckCircle className="text-[#007BFF]" size={32} />,
  completed: <CheckCircle className="text-[#007BFF]" size={32} />,
  in_progress: <RefreshCw className="animate-spin text-[#007BFF]" size={32} />,
  pending: <RefreshCw className="animate-spin text-[#007BFF]" size={32} />,
  unknown: <AlertTriangle className="text-yellow-500" size={32} />,
  error: <AlertTriangle className="text-red-500" size={32} />,
};

const STATUS_TITLES: Record<string, string> = {
  delivered: "Delivered!",
  completed: "Completed!",
  in_progress: "In Progress",
  pending: "Pending",
  unknown: "Order Not Found",
  error: "Order Not Found",
  searching: "Searching...",
};

const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Most orders begin within 0–30 minutes, but some large or custom orders can take longer. If you don't see movement within 1 hour, please reach out to support.",
  },
  {
    q: "My order says completed, but I don’t see results.",
    a: "It can take a few minutes for platforms to update stats. If it's still not visible after 30 min, contact our support team immediately.",
  },
  {
    q: "What’s my order ID?",
    a: "Your order ID was shown on the confirmation page and sent to your email. Check spam if you don't see it.",
  },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFaq, setShowFaq] = useState<number | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ You can later wire this to a real health check endpoint
  const engineOnline = true;

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/track", { orderId });

      // ⭐ FOLLOWIZ STATUS
      const followizStatus = res.data.data?.status?.toLowerCase() || "unknown";
      setStatus(followizStatus);
    } catch {
      setError("Could not find order. Make sure the ID is correct.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const statusKey =
    loading
      ? "searching"
      : status === "delivered" || status === "completed"
      ? "delivered"
      : status === "in progress" ||
        status === "processing" ||
        status === "pending" ||
        status === "in_progress"
      ? "in_progress"
      : status === "error" || error
      ? "error"
      : status === "unknown"
      ? "unknown"
      : "";

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#f4f9ff] to-[#e6f0ff] flex flex-col items-center px-2 py-8 sm:py-16">
      {/* Order Modal */}
      <OrderModal
        open={showOrderModal}
        onClose={() => setShowOrderModal(false)}
      />

      {/* ✅ Brand header with REAL logo (replaces any YV text badge) */}
      <div className="w-full max-w-xl mx-auto mb-6 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="YesViral Logo"
            width={40}
            height={40}
            className="rounded-xl shadow-sm border border-[#CFE4FF]"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-extrabold tracking-tight text-[#007BFF]">
              YesViral
            </span>
            <span className="text-[11px] text-[#64748B]">
              Secure Order Tracking
            </span>
          </div>
        </Link>
      </div>

      <div className="w-full max-w-xl mx-auto glass-card px-4 sm:px-8 py-8 sm:py-12 rounded-3xl border-2 border-[#CFE4FF] shadow-xl space-y-10 relative">
        {/* Top Header */}
        <div className="text-center mb-2">
          <div className="flex justify-center mb-3">
            <Search className="text-[#007BFF]" size={40} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#007BFF] mb-1 tracking-tight">
            Track Your Order
          </h1>
          <p className="text-[#555] mb-2 text-base md:text-lg">
            We’re here for every step. Enter your order ID below to check the
            latest status.
          </p>

          {/* ✅ Live engine badge moved into the card w/ red/green dot */}
          <div className="mt-3 flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF2FF] px-3 py-1 border border-[#CFE4FF] shadow-sm">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  engineOnline ? "bg-[#22C55E]" : "bg-red-500"
                } animate-pulse`}
              />
              <span className="text-[11px] font-semibold text-[#0B63E6]">
                {engineOnline ? "Track Engine Online" : "Track Engine Offline"}
              </span>
            </div>

            {/* ✅ 4.8 / 5 rating stars in YesViral blue */}
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill={i < 4 ? "#007BFF" : "#CFE4FF"}
                    stroke="#007BFF"
                    strokeWidth="1.1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.3l6.18 3.7-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-semibold text-[#0B63E6]">
                4.8 / 5 rating
              </span>
            </div>
          </div>
        </div>

        {/* Input & Button */}
        <form onSubmit={handleTrack} className="space-y-4 w-full">
          <input
            ref={inputRef}
            type="text"
            // ✅ Random numeric-style placeholder instead of YESVIRAL4242424
            placeholder="9473821-48293"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-[#CFE4FF] rounded-xl bg-[#F9FBFF] text-lg focus:outline-none focus:border-[#007BFF] shadow-sm transition"
          />
          <button
            type="submit"
            disabled={loading || !orderId.trim()}
            // ✅ Premium YesViral button (not black)
            className={`w-full bg-gradient-to-br from-[#007BFF] to-[#005FCC] text-white font-semibold py-3 rounded-xl hover:brightness-105 transition text-lg flex items-center justify-center gap-2 shadow-[0_10px_28px_rgba(0,123,255,0.45)] ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading && <RefreshCw className="animate-spin" size={20} />}
            {loading ? "Tracking..." : "Track Order"}
          </button>
        </form>

        {/* Status Output */}
        {(statusKey || error) && (
          <div className="mt-1 flex flex-col items-center gap-2">
            <div className="rounded-full bg-white shadow flex items-center justify-center w-14 h-14 border border-[#E6F0FF]">
              {STATUS_ICONS[statusKey || "unknown"]}
            </div>
            <div className="font-bold text-lg text-[#005FCC]">
              {STATUS_TITLES[statusKey || "unknown"] || status}
            </div>
            {status && !error && (
              <p className="text-[#333] text-base text-center">
                {statusKey === "delivered"
                  ? "Your order was completed!"
                  : statusKey === "in_progress"
                  ? "Your order is processing. You'll receive your results soon!"
                  : statusKey === "unknown"
                  ? "Order not found. Please check your ID and try again."
                  : null}
              </p>
            )}
            {error && (
              <p className="text-red-500 text-base">{error}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Link href="/" className="flex-1">
            <button className="w-full flex items-center gap-2 bg-[#E8F1FF] text-[#007BFF] font-semibold px-6 py-2.5 rounded-xl hover:bg-[#E6F0FF] border border-[#CFE4FF] transition">
              <Home size={18} /> Home
            </button>
          </Link>
          <button
            className="w-full flex items-center gap-2 bg-gradient-to-br from-[#007BFF] to-[#005FCC] text-white font-semibold px-6 py-2.5 rounded-xl hover:brightness-105 transition justify-center shadow-lg"
            onClick={() => setShowOrderModal(true)}
            type="button"
          >
            <Repeat size={19} /> Order Again
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="w-full max-w-xl mx-auto mt-10 sm:mt-14">
        <h2 className="text-center text-xl font-bold mb-4 text-[#222]">
          Tracking Help & FAQs
        </h2>
        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`border border-[#CFE4FF] rounded-xl p-4 bg-[#F9FAFF] cursor-pointer transition-all ${
                showFaq === i ? "shadow-xl scale-[1.02]" : ""
              }`}
              onClick={() => setShowFaq(showFaq === i ? null : i)}
            >
              <div className="flex justify-between items-center select-none">
                <span className="font-semibold text-[#007BFF]">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    showFaq === i ? "rotate-180" : ""
                  }`}
                />
              </div>

              {showFaq === i && (
                <p className="mt-3 text-[#444] text-sm">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Support CTA */}
      <div className="w-full max-w-xl mx-auto mt-8 text-center">
        <Link href="/contact">
          <button className="inline-flex items-center gap-2 bg-white border border-[#CFE4FF] text-[#007BFF] px-5 py-2.5 rounded-full shadow hover:bg-[#F2F9FF] font-semibold transition">
            <MessageCircle size={18} /> Need more help? Chat with our support
            team
          </button>
        </Link>
      </div>

      <style jsx global>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.87);
          backdrop-filter: blur(6px);
        }
      `}</style>
    </main>
  );
}
