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
  delivered: <CheckCircle className="text-[#007BFF]" size={32} />, // CHANGED from green → YesViral blue
  completed: <CheckCircle className="text-[#007BFF]" size={32} />, // CHANGED
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
    a: "It can take a few minutes for platforms to update stats. If it's still not visible after 30 minutes, contact support immediately with your order ID.",
  },
  {
    q: "What’s my order ID?",
    a: "Your order ID was shown on the confirmation page and in your email. Check spam if you don't see it.",
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

  // --- FOLLOWIZ TRACKING ---
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
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#F4F7FF] via-[#E6F0FF] to-[#F9FBFF] px-3 py-6 sm:py-12 flex flex-col items-center">

      {/* BG Glow Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-10 h-72 w-72 rounded-full bg-[#007BFF]/12 blur-3xl" />
        <div className="absolute top-10 right-[-80px] h-72 w-72 rounded-full bg-[#007BFF]/10 blur-3xl" />
      </div>

      {/* Order Modal */}
      <OrderModal open={showOrderModal} onClose={() => setShowOrderModal(false)} />

      {/* TOP NAV — CHANGED LOGO TO REAL YESVIRAL LOGO */}
      <header className="z-10 mb-6 flex w-full max-w-5xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/yesviral-logo.png" // ← YOUR REAL LOGO HERE
            alt="YesViral"
            className="h-9 w-9 rounded-xl border border-[#CFE4FF] shadow-md object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold text-[#0F172A]">YesViral</span>
            <span className="text-[11px] text-[#64748B]">Real-time growth tracking</span>
          </div>
        </Link>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <div className="z-10 flex w-full max-w-5xl flex-col gap-8 lg:flex-row">

        {/* MAIN TRACKING CARD */}
        <div className="relative w-full lg:flex-[1.2]">
          <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-[#007BFF] via-[#005FCC] to-[#0EA5E9] opacity-80" />
          <div className="relative glass-card border border-white/60 bg-white/95 px-5 py-7 shadow-xl sm:px-8 sm:py-10 rounded-[24px] space-y-7">

            {/* TITLE SECTION */}
            <div className="text-center mb-2">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6F0FF]">
                <Search className="text-[#007BFF]" size={26} />
              </div>

              <h1 className="text-3xl md:text-[2.3rem] font-black text-[#0B63E6] tracking-tight">
                Track Your YesViral Order
              </h1>

              <p className="mx-auto max-w-md text-sm md:text-base text-[#4B5563]">
                Enter your order ID below to check the latest delivery status in real time.
              </p>

              {/* 🔥 MOVED ENGINE BADGE (YESVIRAL BLUE) */}
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#EAF2FF] px-3 py-1 border border-[#C7DBFF] text-[11px] font-semibold text-[#007BFF]">
                <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
                Live order engine online
              </div>

              {/* ⭐ STARS CHANGED TO YESVIRAL BLUE */}
              <div className="mt-3 flex items-center justify-center gap-2 text-[11px]">
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
                <span className="font-semibold text-[#0F172A]">4.8 / 5</span>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleTrack} className="space-y-4 w-full">
              <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
                Order ID
              </label>

              <input
                ref={inputRef}
                placeholder="e.g. 4839201349" // CHANGED RANDOM NUMBERS
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                className="w-full rounded-xl border-2 border-[#CFE4FF] bg-[#F9FBFF] px-4 py-3 text-[15px] shadow-sm focus:border-[#007BFF] outline-none"
              />

              <button
                type="submit"
                disabled={loading || !orderId.trim()}
                className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-3.5 text-[15px] font-semibold shadow-lg hover:bg-blue-700 transition"
              >
                {loading && <RefreshCw className="animate-spin" size={18} />}
                {loading ? "Checking status..." : "Track Order"}
              </button>
            </form>

            {/* STATUS */}
            {(statusKey || error) && (
              <div className="rounded-xl border border-[#D6E4FF] bg-[#F5F8FF] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-[#E0ECFF] shadow-inner">
                    {STATUS_ICONS[statusKey || "unknown"]}
                  </div>

                  <div>
                    <p className="font-extrabold text-[#0F172A]">
                      {STATUS_TITLES[statusKey || "unknown"]}
                    </p>

                    {!error && (
                      <p className="text-sm text-[#4B5563] mt-1">
                        {statusKey === "delivered"
                          ? "Your YesViral order has been successfully delivered!"
                          : statusKey === "in_progress"
                          ? "Your order is actively processing through our private delivery pools."
                          : statusKey === "unknown"
                          ? "Order could not be located. Double-check your ID."
                          : null}
                      </p>
                    )}

                    {error && (
                      <p className="text-sm font-semibold text-red-500 mt-1">
                        {error}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link href="/" className="flex-1">
                <button className="w-full rounded-xl border border-[#CFE4FF] bg-white py-2.5 text-[#007BFF] font-semibold shadow-sm hover:bg-[#EAF2FF]">
                  <Home size={17} /> Home
                </button>
              </Link>

              {/* CHANGED BLACK BUTTON → YESVIRAL BLUE */}
              <button
                type="button"
                onClick={() => setShowOrderModal(true)}
                className="flex-1 rounded-xl bg-[#007BFF] text-white py-2.5 font-semibold shadow-lg hover:bg-[#005FCC] transition"
              >
                <Repeat size={17} /> Place Another Order
              </button>
            </div>
          </div>
        </div>

        {/* FAQ COLUMN — UNCHANGED */}
        <aside className="relative w-full lg:flex-[0.9]">
          <div className="rounded-2xl border border-[#D5E4FF] bg-white/95 px-4 py-6 shadow-xl sm:px-6 sm:py-7">
            <h2 className="text-lg font-black text-[#0F172A] mb-3">
              Tracking Help & FAQs
            </h2>

            <div className="space-y-3">
              {FAQS.map((item, i) => (
                <div
                  key={i}
                  className={`cursor-pointer rounded-xl border border-[#CFE4FF] bg-[#F9FAFF] p-4 transition ${
                    showFaq === i ? "shadow-xl scale-[1.02]" : "shadow-sm"
                  }`}
                  onClick={() => setShowFaq(showFaq === i ? null : i)}
                >
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#007BFF]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        showFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {showFaq === i && (
                    <p className="mt-3 text-sm text-[#4B5563]">{item.a}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link href="/contact">
                <button className="inline-flex items-center gap-2 rounded-full border border-[#CFE4FF] bg-white px-5 py-2.5 text-[#007BFF] font-semibold hover:bg-[#EFF5FF]">
                  <MessageCircle size={17} /> Need more help?
                </button>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <style jsx global>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(14px);
        }
      `}</style>
    </main>
  );
}
