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
import OrderModal from "@/components/OrderModal";

// --- STATUS & FAQS ---
const STATUS_ICONS: Record<string, JSX.Element> = {
  searching: <RefreshCw className="animate-spin text-[#007BFF]" size={32} />,
  delivered: <CheckCircle className="text-[#007BFF]" size={32} />,   // changed from green
  completed: <CheckCircle className="text-[#007BFF]" size={32} />,   // changed from green
  in_progress: <RefreshCw className="animate-spin text-[#007BFF]" size={32} />,
  pending: <RefreshCw className="animate-spin text-[#007BFF]" size={32} />,
  unknown: <AlertTriangle className="text-[#FACC15]" size={32} />, // keep yellow for "warning"
  error: <AlertTriangle className="text-[#EF4444]" size={32} />,  // error stays red
};

const STATUS_TITLES = {
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
    a: "It can take a few minutes for platforms to update stats. If it's still not visible after 30 minutes, contact our support team immediately with your order ID.",
  },
  {
    q: "What’s my order ID?",
    a: "Your order ID was shown on the confirmation page and sent to your email. Check spam and promotions if you don't see it.",
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

  const handleTrack = async (e: any) => {
    e.preventDefault();
    setStatus("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/track", { orderId });
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
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#F4F7FF] via-[#E6F0FF] to-[#F9FBFF] px-3 py-6 sm:py-12 flex flex-col items-center">

      {/* Background lights → YESVIRAL BLUE ONLY */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-10 h-72 w-72 rounded-full bg-[#007BFF]/12 blur-3xl" />
        <div className="absolute top-10 right-[-80px] h-72 w-72 rounded-full bg-[#007BFF]/10 blur-3xl" />
        <div className="absolute bottom-[-80px] left-10 h-72 w-72 rounded-full bg-[#005FCC]/10 blur-3xl" />
      </div>

      <OrderModal open={showOrderModal} onClose={() => setShowOrderModal(false)} />

      {/* Header */}
      <header className="z-10 mb-6 flex w-full max-w-5xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-md border border-[#CFE4FF]/80">
            <span className="text-xs font-black tracking-tight text-[#007BFF]">YV</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold tracking-tight text-[#0F172A]">
              YesViral
            </span>
            <span className="text-[11px] font-medium text-[#64748B]">
              Real-time growth tracking
            </span>
          </div>
        </Link>

        {/* Online badge → YesViral Blue */}
        <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium text-[#007BFF]">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 border border-[#CFE4FF] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#007BFF] animate-pulse" />
            Live order engine online
          </span>
        </div>
      </header>

      {/* Main wrapper + card */}
      <div className="z-10 flex w-full max-w-5xl flex-col gap-8 lg:flex-row lg:items-start">
        <div className="relative w-full lg:flex-[1.2]">

          {/* Frame gradient updated to YesViral blues */}
          <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-[#007BFF] via-[#005FCC] to-[#007BFF] opacity-80" />

          <div className="relative glass-card border border-white/60 bg-white/90 px-5 py-7 shadow-[0_24px_60px_rgba(15,23,42,0.16)] sm:px-8 sm:py-10 rounded-[24px] space-y-7">

            {/* Header */}
            <div className="text-center mb-2">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6F0FF] shadow-inner">
                <Search className="text-[#007BFF]" size={26} />
              </div>
              <h1 className="text-3xl md:text-[2.3rem] font-black text-[#007BFF] mb-2 tracking-tight">
                Track Your YesViral Order
              </h1>

              {/* Stars → Now YesViral Blue */}
              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[#64748B]">
                <div className="flex items-center gap-[2px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      fill={i < 4 ? "#007BFF" : "#CFE4FF"}
                      stroke="#005FCC"
                      strokeWidth="1.1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.3l6.18 3.7-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold text-[#0B63E6]">
                  4.8 / 5
                </span>
                <span>Avg. satisfaction on tracked orders</span>
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleTrack} className="space-y-4 w-full">
              <div className="relative">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                  Order ID
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#9CA3AF]">
                    #
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="e.g. 48392-YESVIRAL-1293"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-[#CFE4FF] bg-[#F9FBFF] pl-7 pr-4 py-3 text-[15px] font-medium text-[#0F172A] shadow-sm transition focus:border-[#007BFF] focus:ring-2 focus:ring-[#CFE4FF]"
                  />

                  <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-2 py-[3px] text-[10px] font-semibold text-[#64748B] shadow-sm border border-[#CFE4FF]">
                    Secure lookup
                  </div>
                </div>
              </div>

              {/* Button updated */}
              <button
                type="submit"
                disabled={loading || !orderId.trim()}
                className={`group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#007BFF] to-[#005FCC] py-3.5 text-[15px] font-semibold text-white shadow-[0_16px_40px_rgba(0,123,255,0.45)] transition hover:brightness-105 active:scale-95 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading && <RefreshCw className="animate-spin" size={18} />}
                {loading ? "Checking..." : "Track Order"}
              </button>
            </form>

            {/* Status Output */}
            {(statusKey || error) && (
              <div className="mt-1 flex flex-col items-center gap-3 rounded-2xl border border-[#CFE4FF] bg-[#F5F7FF] px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-inner border border-[#CFE4FF]">
                    {STATUS_ICONS[statusKey || "unknown"]}
                  </div>
                  <div className="text-left">
                    <div className="text-[15px] font-extrabold text-[#0B63E6]">
                      {STATUS_TITLES[statusKey || "unknown"] || status}
                    </div>
                    {error && (
                      <p className="mt-1 text-[13px] text-red-500 font-medium">
                        {error}
                      </p>
                    )}
                  </div>
                </div>

                {/* Progress bar → all YesViral blues */}
                <div className="mt-1 w-full max-w-md">
                  <div className="flex justify-between text-[11px] text-[#6B7280] font-semibold uppercase tracking-[0.16em] mb-1">
                    <span>Order Placed</span>
                    <span>Processing</span>
                    <span>Delivered</span>
                  </div>

                  <div className="relative h-1.5 w-full rounded-full bg-[#CFE4FF] overflow-hidden">
                    <div
                      className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                        statusKey === "delivered"
                          ? "w-full bg-[#007BFF]"
                          : statusKey === "in_progress"
                          ? "w-1/2 bg-[#007BFF]"
                          : "w-1/3 bg-[#007BFF]"
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Buttons */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
              <Link href="/" className="sm:flex-1">
                <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#CFE4FF] bg-white px-6 py-2.5 text-[#007BFF] font-semibold shadow-sm hover:bg-[#E6F0FF] transition">
                  <Home size={17} />
                  Back to Home
                </button>
              </Link>

              {/* BLACK BUTTON → Now YesViral Blue */}
              <button
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#007BFF] hover:bg-[#005FCC] px-6 py-2.5 text-white font-semibold shadow-[0_16px_35px_rgba(0,123,255,0.45)] transition sm:flex-1"
                onClick={() => setShowOrderModal(true)}
              >
                <Repeat size={17} /> Place Another Order
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="relative w-full lg:flex-[0.9]">
          <div className="relative mt-4 lg:mt-0 rounded-[22px] border border-[#CFE4FF] bg-white px-4 py-5 shadow-[0_18px_40px_rgba(0,123,255,0.12)] sm:px-6 sm:py-7">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-[16px] font-black text-[#0F172A]">
                  Tracking help & FAQs
                </h2>
                <p className="text-[12px] text-[#64748B] mt-1">
                  Quick answers for the most common questions.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-[#F3F6FF] px-3 py-1 text-[11px] font-semibold text-[#007BFF] border border-[#CFE4FF]">
                <span className="h-2 w-2 rounded-full bg-[#007BFF] animate-pulse" />
                Support responds in under 24 hours
              </div>
            </div>

            <div className="space-y-3">
              {FAQS.map((item, i) => (
                <div
                  key={i}
                  className={`cursor-pointer rounded-xl border border-[#CFE4FF] bg-[#F9FAFF] p-4 transition-all ${
                    showFaq === i ? "shadow-xl scale-[1.02]" : "shadow-sm"
                  }`}
                  onClick={() => setShowFaq(showFaq === i ? null : i)}
                >
                  <div className="flex items-center justify-between select-none">
                    <span className="text-[14px] font-semibold text-[#007BFF]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#64748B] transition-transform ${
                        showFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {showFaq === i && (
                    <p className="mt-3 text-[13px] leading-relaxed text-[#4B5563]">
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link href="/contact">
                <button className="inline-flex items-center gap-2 rounded-full border border-[#CFE4FF] bg-white px-5 py-2.5 text-[#007BFF] text-[13px] font-semibold shadow-sm hover:bg-[#EAF2FF] transition">
                  <MessageCircle size={17} />
                  Need more help?
                </button>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <style jsx global>{`
        .glass-card {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(14px);
        }
      `}</style>
    </main>
  );
}
