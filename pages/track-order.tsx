import { useState } from "react";
import axios from "axios";
import { Search, CheckCircle, AlertTriangle, RefreshCw, MessageCircle, Home, ChevronDown } from "lucide-react";
import Link from "next/link";

const STATUS_ICONS: Record<string, JSX.Element> = {
  searching: <RefreshCw className="animate-spin text-[#007BFF]" size={32} />,
  delivered: <CheckCircle className="text-green-500" size={32} />,
  completed: <CheckCircle className="text-green-500" size={32} />,
  in_progress: <RefreshCw className="animate-spin text-[#007BFF]" size={32} />,
  unknown: <AlertTriangle className="text-yellow-500" size={32} />,
  error: <AlertTriangle className="text-red-500" size={32} />,
};

const STATUS_TITLES: Record<string, string> = {
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

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/track", { orderId });
      setStatus(res.data.status?.toLowerCase() || "unknown");
    } catch (err: any) {
      setError("Could not find order. Make sure the ID is correct.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const statusKey =
    loading ? "searching" :
    status === "delivered" || status === "completed" ? "delivered" :
    status === "in_progress" ? "in_progress" :
    status === "pending" ? "in_progress" :
    status === "error" || error ? "error" :
    status === "unknown" ? "unknown" :
    "";

  return (
    <main className="max-w-xl mx-auto px-4 py-20">
      <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-md p-8 space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Search className="text-[#007BFF]" size={38} />
          </div>
          <h1 className="text-3xl font-extrabold text-[#007BFF] mb-1">Track Your Order</h1>
          <p className="text-[#444] mb-2">We’re here for every step. Enter your order ID below to check the latest status.</p>
        </div>

        <form onSubmit={handleTrack} className="space-y-5">
          <input
            type="text"
            placeholder="Enter your Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-[#CFE4FF] rounded-xl bg-[#F9FBFF] text-lg focus:outline-none focus:border-[#007BFF] transition"
          />
          <button
            type="submit"
            disabled={loading || !orderId.trim()}
            className={`w-full bg-[#007BFF] text-white font-semibold py-3 rounded-xl hover:bg-[#005FCC] transition text-lg flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading && <RefreshCw className="animate-spin" size={20} />}
            {loading ? "Tracking..." : "Track Order"}
          </button>
        </form>

        {(statusKey || error) && (
          <div className="mt-3 flex flex-col items-center gap-2">
            <div>{STATUS_ICONS[statusKey || "unknown"]}</div>
            <div className="font-bold text-lg text-[#005FCC]">
              {STATUS_TITLES[statusKey || "unknown"] || status}
            </div>
            {status && !error && (
              <p className="text-[#222] text-base text-center">
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

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <button className="flex items-center gap-2 bg-[#E8F1FF] text-[#007BFF] font-semibold px-6 py-2.5 rounded-xl hover:bg-[#E6F0FF] border border-[#CFE4FF] transition">
              <Home size={18} /> Home
            </button>
          </Link>
          <Link href="/checkout">
            <button className="flex items-center gap-2 bg-[#007BFF] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#005FCC] transition">
              Order Again
            </button>
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-12 mb-6">
        <h2 className="text-center text-xl font-bold mb-5 text-[#222]">Tracking Help & FAQs</h2>
        <div className="space-y-3 max-w-xl mx-auto">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`border border-[#CFE4FF] rounded-xl p-4 bg-[#F9FAFF] cursor-pointer transition-all ${
                showFaq === i ? "shadow-lg" : ""
              }`}
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
                  transition: "max-height 0.3s"
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
      <div className="mt-8 text-center">
        <Link href="/support">
          <button className="inline-flex items-center gap-2 bg-white border border-[#CFE4FF] text-[#007BFF] px-5 py-2.5 rounded-full shadow hover:bg-[#F2F9FF] font-semibold transition">
            <MessageCircle size={18} /> Need more help? Chat with our support team
          </button>
        </Link>
      </div>
    </main>
  );
}
