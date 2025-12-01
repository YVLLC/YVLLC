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

const STATUS_ICONS: Record<string, JSX.Element> = {
  searching: <RefreshCw className="animate-spin text-[#007BFF]" size={32} />,
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
    a: "Most orders begin within 0–30 minutes, but larger orders may take longer. If there is no movement after 1 hour, contact support.",
  },
  {
    q: "My order says completed, but I don’t see results.",
    a: "Stats may take a few minutes to refresh on social platforms. If nothing updates after 30 minutes, reach out with your order ID.",
  },
  {
    q: "What’s my order ID?",
    a: "Your confirmation page and your email receipt both include your unique order ID.",
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

  const engineOnline = true; // you can switch with real-time API later

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/track", { orderId });
      const followizStatus = res.data.data?.status?.toLowerCase() || "unknown";
      setStatus(followizStatus);
    } catch {
      setError("Could not find order. Check the ID & try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const statusKey =
    loading
      ? "searching"
      : ["delivered", "completed"].includes(status)
      ? "delivered"
      : ["in progress", "processing", "pending", "in_progress"].includes(status)
      ? "in_progress"
      : error
      ? "error"
      : status === "unknown"
      ? "unknown"
      : "";

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-br from-[#F4F7FF] via-[#E6F0FF] to-[#F9FBFF] px-3 py-10 sm:py-16 flex flex-col items-center">
      {/* Order Modal */}
      <OrderModal open={showOrderModal} onClose={() => setShowOrderModal(false)} />

      {/* BRAND HEADER */}
      <header className="z-10 mb-7 flex w-full max-w-5xl items-center justify-between px-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="YesViral Logo"
            width={46}
            height={46}
            className="rounded-xl shadow-md border border-[#CFE4FF]"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-[#0B63E6]">
              YesViral
            </span>
            <span className="text-[11px] text-[#64748B]">Order Tracking</span>
          </div>
        </Link>
      </header>

      <div className="z-10 flex w-full max-w-5xl flex-col gap-10 lg:flex-row lg:items-start">
        {/* LEFT MAIN TRACKING CARD */}
        <div className="relative w-full lg:flex-[1.3]">
          <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-[#007BFF] via-[#005FCC] to-[#007BFF]" />
          <div className="relative glass-card border border-white/60 bg-white/90 px-6 py-8 shadow-xl sm:px-9 sm:py-12 rounded-[24px] space-y-8">

            {/* HEADER */}
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6F0FF] shadow-inner">
                <Search className="text-[#007BFF]" size={26} />
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-[#007BFF] mb-1 tracking-tight">
                Track Your Order
              </h1>

              <p className="text-[#4B5563] text-sm md:text-base">
                Enter your Order ID below to see real-time delivery updates.
              </p>

              {/* ⭐ LIVE ENGINE BADGE */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#EAF2FF] px-3 py-1 border border-[#CFE4FF] shadow-sm text-xs font-semibold">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    engineOnline ? "bg-[#22C55E]" : "bg-red-500"
                  } animate-pulse`}
                />
                {engineOnline ? "Order Engine Online" : "Order Engine Offline"}
              </div>

              {/* YesViral Stars */}
              <div className="mt-4 flex justify-center items-center gap-1">
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
                <span className="ml-1 text-xs font-semibold text-[#0B63E6]">
                  4.8 / 5 rating
                </span>
              </div>
            </div>

            {/* INPUT */}
            <form onSubmit={handleTrack} className="space-y-4 w-full">
              <div className="relative">
                <label
                  htmlFor="order-id"
                  className="block text-xs font-semibold uppercase text-[#64748B] mb-1 tracking-[0.12em]"
                >
                  Order ID
                </label>
                <input
                  id="order-id"
                  ref={inputRef}
                  type="text"
                  placeholder="9473821-48293"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                  className="w-full rounded-xl border-2 border-[#CFE4FF] bg-[#F9FBFF] px-4 py-3 text-[15px] font-medium text-[#0F172A] shadow-sm outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#E0EDFF]"
                />
                <p className="mt-1 text-[11px] text-[#6B7280]">
                  You received this after checkout.
                </p>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading || !orderId.trim()}
                className={`w-full py-3.5 rounded-xl font-semibold text-white text-lg flex items-center justify-center gap-2 bg-gradient-to-br from-[#007BFF] to-[#005FCC] shadow-[0_12px_32px_rgba(0,123,255,0.45)] hover:brightness-105 active:scale-[0.98] transition ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading && <RefreshCw className="animate-spin" size={18} />}
                {loading ? "Searching..." : "Track Order"}
              </button>
            </form>

            {/* STATUS */}
            {(statusKey || error) && (
              <div className="flex flex-col items-center gap-3 border border-[#DDEAFF] bg-[#F5F8FF] rounded-2xl py-5 px-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-white border border-[#E0ECFF] shadow-inner flex items-center justify-center">
                    {STATUS_ICONS[statusKey || "unknown"]}
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-[#0F172A]">
                      {STATUS_TITLES[statusKey || "unknown"]}
                    </div>
                    {error && (
                      <p className="text-sm text-red-500 mt-1">{error}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="flex-1">
                <button className="w-full flex items-center justify-center gap-2 bg-white border border-[#CFE4FF] px-6 py-2.5 rounded-xl text-[#007BFF] font-semibold hover:bg-[#EAF2FF]">
                  <Home size={16} /> Home
                </button>
              </Link>
              <button
                onClick={() => setShowOrderModal(true)}
                className="flex-1 w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#007BFF] to-[#005FCC] text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:brightness-105"
              >
                <Repeat size={16} /> Order Again
              </button>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <aside className="lg:flex-[0.85] w-full">
          <div className="rounded-[22px] bg-white border border-[#D5E4FF] p-6 shadow-xl">
            <h2 className="text-lg font-black text-[#0F172A] mb-4">
              Tracking FAQs
            </h2>

            <div className="space-y-3">
              {FAQS.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setShowFaq(showFaq === i ? null : i)}
                  className={`border border-[#CFE4FF] rounded-xl p-4 bg-[#F9FAFF] cursor-pointer transition-all ${
                    showFaq === i ? "shadow-xl scale-[1.02]" : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#007BFF]">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#64748B] transition-transform ${
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

            <div className="mt-7 text-center">
              <Link href="/contact">
                <button className="inline-flex items-center gap-2 bg-white border border-[#CFE4FF] text-[#007BFF] px-6 py-2.5 rounded-full shadow hover:bg-[#EBF3FF] font-semibold">
                  <MessageCircle size={18} /> Need more help?
                </button>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <style jsx global>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
      `}</style>
    </main>
  );
}
