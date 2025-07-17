import { useState, useRef } from "react";
import axios from "axios";
import {
  Search, CheckCircle, AlertTriangle, RefreshCw, MessageCircle, Home, ChevronDown
} from "lucide-react";
import Link from "next/link";

// --- STATUS & FAQS ---
const STATUS_ICONS = {
  searching: <RefreshCw className="animate-spin text-[#007BFF]" size={32} />,
  delivered: <CheckCircle className="text-[#22C55E]" size={32} />,
  completed: <CheckCircle className="text-[#22C55E]" size={32} />,
  in_progress: <RefreshCw className="animate-spin text-[#007BFF]" size={32} />,
  pending: <RefreshCw className="animate-spin text-[#007BFF]" size={32} />,
  unknown: <AlertTriangle className="text-yellow-500" size={32} />,
  error: <AlertTriangle className="text-red-500" size={32} />,
};

const STATUS_TITLES = {
  delivered: "Delivered!",
  completed: "Completed!",
  in_progress: "In Progress",
  pending: "Pending",
  unknown: "Order Not Found",
  error: "Order Not Found"
};

const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Most orders begin within 0–30 minutes, but some large or custom orders can take longer. If you don't see movement within 1 hour, please reach out to support."
  },
  {
    q: "My order says completed, but I don’t see results.",
    a: "It can take a few minutes for platforms to update stats. If it's still not visible after 30 min, contact our support team immediately."
  },
  {
    q: "What’s my order ID?",
    a: "Your order ID was shown on the confirmation page and sent to your email. Check spam if you don't see it."
  }
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFaq, setShowFaq] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/track", { orderId });
      setStatus(res.data.status?.toLowerCase() || "unknown");
    } catch {
      setError("Could not find order. Make sure the ID is correct.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const statusKey =
    loading ? "searching" :
    status === "delivered" || status === "completed" ? "delivered" :
    status === "in_progress" || status === "pending" ? "in_progress" :
    status === "error" || error ? "error" :
    status === "unknown" ? "unknown" :
    "";

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#f4f9ff] to-[#e6f0ff] flex flex-col items-center px-2 py-8 sm:py-16">
      <div className="w-full max-w-xl mx-auto glass-card px-4 sm:px-8 py-8 sm:py-12 rounded-3xl border-2 border-[#CFE4FF] shadow-xl space-y-10 relative">

        {/* Top Header */}
        <div className="text-center mb-2">
          <div className="flex justify-center mb-3">
            <Search className="text-[#007BFF]" size={40} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#007BFF] mb-1 tracking-tight">Track Your Order</h1>
          <p className="text-[#555] mb-2 text-base md:text-lg">We’re here for every step. Enter your order ID below to check the latest status.</p>
        </div>

        {/* Input & Button */}
        <form onSubmit={handleTrack} className="space-y-4 w-full">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter your Order ID"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-[#CFE4FF] rounded-xl bg-[#F9FBFF] text-lg focus:outline-none focus:border-[#007BFF] shadow-sm transition"
          />
          <button
            type="submit"
            disabled={loading || !orderId.trim()}
            className={`w-full bg-[#007BFF] text-white font-semibold py-3 rounded-xl hover:bg-[#005FCC] transition text-lg flex items-center justify-center gap-2 shadow-lg ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
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
                {status === "delivered" || status === "completed"
                  ? "Your order was completed! If you don't see results, please refresh your platform or reach out to our support team."
                  : status === "in_progress" || status === "pending"
                  ? "Your order is processing. You'll receive your results soon!"
                  : status === "unknown"
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
          <Link href="/checkout" className="flex-1">
            <button className="w-full flex items-center gap-2 bg-[#007BFF] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#005FCC] transition">
              Order Again
            </button>
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="w-full max-w-xl mx-auto mt-10 sm:mt-14">
        <h2 className="text-center text-xl font-bold mb-4 text-[#222]">Tracking Help & FAQs</h2>
        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`border border-[#CFE4FF] rounded-xl p-4 bg-[#F9FAFF] cursor-pointer transition-all ${showFaq === i ? "shadow-xl scale-[1.02]" : ""}`}
              onClick={() => setShowFaq(showFaq === i ? null : i)}
              tabIndex={0}
              onKeyDown={e => { if (e.key === "Enter") setShowFaq(showFaq === i ? null : i); }}
            >
              <div className="flex justify-between items-center select-none">
                <span className="font-semibold text-[#007BFF]">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${showFaq === i ? "rotate-180" : "rotate-0"}`}
                />
              </div>
              <div
                style={{
                  maxHeight: showFaq === i ? 200 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(.55,0,.1,1)"
                }}
              >
                {showFaq === i && (
                  <p className="mt-3 text-[#444] text-sm">{item.a}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support CTA */}
      <div className="w-full max-w-xl mx-auto mt-8 text-center">
        <Link href="/support">
          <button className="inline-flex items-center gap-2 bg-white border border-[#CFE4FF] text-[#007BFF] px-5 py-2.5 rounded-full shadow hover:bg-[#F2F9FF] font-semibold transition">
            <MessageCircle size={18} /> Need more help? Chat with our support team
          </button>
        </Link>
      </div>

      <style jsx global>{`
        .glass-card {
          background: rgba(255,255,255,0.87);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        @media (max-width: 540px) {
          .glass-card { padding-left: 0.6rem !important; padding-right: 0.6rem !important;}
        }
        ::-webkit-scrollbar { width: 0.6em; background: #eaf4ff;}
        ::-webkit-scrollbar-thumb { background: #e6f0ff; border-radius: 10px; }
      `}</style>
    </main>
  );
}
