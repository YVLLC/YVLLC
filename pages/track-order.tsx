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
  Stars,
} from "lucide-react";
import Link from "next/link";
import OrderModal from "@/components/OrderModal";

// --- STATUS ICONS ---
const STATUS_ICONS: Record<string, JSX.Element> = {
  searching: (
    <div className="animate-pulse">
      <RefreshCw className="animate-spin text-[#007BFF]" size={36} />
    </div>
  ),
  delivered: <CheckCircle className="text-[#22C55E]" size={36} />,
  completed: <CheckCircle className="text-[#22C55E]" size={36} />,
  in_progress: (
    <RefreshCw className="animate-spin text-[#007BFF]" size={36} />
  ),
  pending: <RefreshCw className="animate-spin text-[#007BFF]" size={36} />,
  unknown: <AlertTriangle className="text-yellow-500" size={36} />,
  error: <AlertTriangle className="text-red-500" size={36} />,
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

// --- FAQ DATA ---
const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Most orders begin within 0–30 minutes. Larger or premium packages can take longer depending on volume. If nothing starts after 1 hour, contact support."
  },
  {
    q: "My order says completed but I see no change.",
    a: "Platforms sometimes delay stat updates. Give it 5–10 minutes. Still nothing? Reach out to support and we’ll resolve it fast."
  },
  {
    q: "Where do I find my order ID?",
    a: "Your Order ID appears on the confirmation page and inside your email receipt. If you don’t see it, check spam or promotions."
  }
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFaq, setShowFaq] = useState<number | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- HANDLE TRACKING ---
  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("");
    setLoading(true);

    try {
      const res = await axios.post("/api/track", { orderId });

      const followizStatus = res.data.data?.status?.toLowerCase() || "unknown";
      setStatus(followizStatus);
    } catch {
      setError("Order not found. Make sure the ID is correct.");
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
      : ["in progress", "processing", "pending", "in_progress"].includes(status)
      ? "in_progress"
      : error
      ? "error"
      : "unknown";

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#F5F9FF] via-[#EDF4FF] to-[#DCEAFF] flex flex-col items-center px-4 py-12 sm:py-20 relative">

      {/* FLOATING BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#007BFF]/20 blur-[100px] rounded-full animate-pulse"></div>
      </div>

      {/* ORDER MODAL */}
      <OrderModal open={showOrderModal} onClose={() => setShowOrderModal(false)} />

      {/* CARD */}
      <div className="w-full max-w-xl mx-auto bg-white/90 backdrop-blur-xl px-6 sm:px-10 py-10 sm:py-14 rounded-3xl border border-[#CFE4FF] shadow-[0_25px_60px_rgba(0,0,0,0.12)] space-y-12 relative overflow-hidden">

        {/* Card Glow Accent */}
        <div className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-[#007BFF] to-[#005FCC]"></div>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Stars className="text-[#007BFF]" size={42} />
          </div>
          <h1 className="text-4xl font-extrabold text-[#0A2B61] tracking-tight">
            Track Your Order
          </h1>
          <p className="text-[#4A5B73] text-base">
            Real-time updates powered by YesViral. Enter your Order ID to begin.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleTrack} className="space-y-4 w-full">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter your Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              className="w-full px-5 py-3.5 border-2 border-[#CFE4FF] rounded-xl bg-[#F8FAFF] text-lg shadow-sm focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/30 transition"
            />
            <Search className="absolute top-3.5 right-4 text-[#7EA6E6]" size={22} />
          </div>

          <button
            type="submit"
            disabled={loading || !orderId.trim()}
            className={`w-full bg-gradient-to-br from-[#007BFF] to-[#005FCC] text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.015] transition-all flex items-center justify-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading && <RefreshCw className="animate-spin" size={20} />}
            {loading ? "Searching..." : "Track Order"}
          </button>
        </form>

        {/* STATUS DISPLAY */}
        {(status || error) && (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-white border border-[#E1EAFF] rounded-full shadow">
              {STATUS_ICONS[statusKey]}
            </div>

            <h2 className="text-xl font-bold text-[#0056B3]">
              {STATUS_TITLES[statusKey]}
            </h2>

            {!error && (
              <p className="text-[#3A4A63]">
                {statusKey === "delivered"
                  ? "Your order has been successfully delivered!"
                  : statusKey === "in_progress"
                  ? "Your order is processing. Results will begin shortly!"
                  : statusKey === "unknown"
                  ? "Order not found. Double-check your ID and try again."
                  : null}
              </p>
            )}

            {error && (
              <p className="text-red-500 text-md font-medium">{error}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <button className="w-full sm:w-auto flex items-center gap-2 bg-white border border-[#CFE4FF] text-[#007BFF] px-6 py-3 rounded-xl shadow hover:bg-[#F3F8FF] transition font-semibold">
              <Home size={18} /> Home
            </button>
          </Link>

          <button
            className="w-full sm:w-auto flex items-center gap-2 bg-[#007BFF] text-white px-6 py-3 rounded-xl shadow hover:bg-[#005FCC] transition font-semibold"
            onClick={() => setShowOrderModal(true)}
          >
            <Repeat size={18} /> Order Again
          </button>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="w-full max-w-xl mx-auto mt-14 space-y-4">
        <h2 className="text-center text-2xl font-bold text-[#0A2B61] mb-4">
          FAQs & Tracking Help
        </h2>

        {FAQS.map((item, i) => (
          <div
            key={i}
            className={`border border-[#CFE4FF] bg-white/80 backdrop-blur-md rounded-xl p-4 cursor-pointer transition-all shadow-sm hover:shadow-lg ${
              showFaq === i ? "scale-[1.02]" : ""
            }`}
            onClick={() => setShowFaq(showFaq === i ? null : i)}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#0056B3]">{item.q}</span>
              <ChevronDown
                className={`transition-transform ${showFaq === i ? "rotate-180" : ""}`}
                size={20}
              />
            </div>

            {showFaq === i && (
              <p className="mt-3 text-[#4A5B73] text-sm">{item.a}</p>
            )}
          </div>
        ))}
      </section>

      {/* Support CTA */}
      <div className="w-full max-w-xl mx-auto mt-10 text-center">
        <Link href="/contact">
          <button className="inline-flex items-center gap-2 bg-white border border-[#CFE4FF] text-[#007BFF] px-6 py-3 rounded-full shadow hover:bg-[#F1F7FF] font-semibold transition">
            <MessageCircle size={18} /> Need help? Contact Support
          </button>
        </Link>
      </div>

    </main>
  );
}
