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
  delivered: <CheckCircle className="text-[#22C55E]" size={32} />,
  completed: <CheckCircle className="text-[#22C55E]" size={32} />,
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

      {/* Background lights */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-10 h-72 w-72 rounded-full bg-[#007BFF]/12 blur-3xl" />
        <div className="absolute top-10 right-[-80px] h-72 w-72 rounded-full bg-[#22C55E]/8 blur-3xl" />
        <div className="absolute bottom-[-80px] left-10 h-72 w-72 rounded-full bg-[#0EA5E9]/10 blur-3xl" />
      </div>

      {/* Order Modal */}
      <OrderModal open={showOrderModal} onClose={() => setShowOrderModal(false)} />

      {/* HEADER */}
      <header className="z-10 mb-6 flex w-full max-w-5xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-md border border-[#CFE4FF]/80 overflow-hidden">
            <Image src="/logo.png" alt="YesViral Logo" width={34} height={34} className="object-contain" />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold tracking-tight text-[#0F172A]">YesViral</span>
            <span className="text-[11px] font-medium text-[#64748B]">Real-time growth tracking</span>
            <span className="text-[11px] font-medium text-[#94A3B8]">Powered by Private Delivery Networks</span>
          </div>
        </Link>
      </header>

      {/* MAIN WRAPPER */}
      <div className="z-10 flex w-full max-w-5xl flex-col gap-8 lg:flex-row lg:items-start">

        {/* LEFT CARD */}
        <div className="relative w-full lg:flex-[1.2]">

          {/* UPDATED BLUE GRADIENT BORDER */}
          <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-[#007BFF] via-[#0EA5E9] to-[#005FCC] opacity-80" />

          {/* MAIN CARD */}
          <div className="relative glass-card border border-white/60 bg-white/90 px-5 py-7 shadow-[0_24px_60px_rgba(15,23,42,0.16)] sm:px-8 sm:py-10 rounded-[24px] space-y-7">

            {/* HEADER CONTENT */}
            <div className="text-center mb-2">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6F0FF] shadow-inner">
                <Search className="text-[#007BFF]" size={26} />
              </div>

              <h1 className="text-3xl md:text-[2.3rem] font-black text-[#0B63E6] mb-2 tracking-tight">
                Track Your YesViral Order
              </h1>

              <p className="mx-auto max-w-md text-sm md:text-base text-[#4B5563]">
                Drop your order ID below to see the latest status across our private delivery networks in real time.
              </p>

              {/* MAIN BADGE */}
              <div className="mt-3 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F0F5FF] px-4 py-1.5 border border-[#CFE4FF] shadow-sm text-[11px] font-semibold text-[#007BFF]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E] animate-pulse" />
                  Live Order Engine Synced
                </span>
              </div>

              {/* Stars */}
              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#64748B]">
                <div className="flex items-center gap-[2px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      fill={i < 4 ? "#007BFF" : "#E5E7EB"}
                      stroke={i < 4 ? "#005FCC" : "#9CA3AF"}
                      strokeWidth="1.1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.3l6.18 3.7-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold text-[#0F172A]">4.8 / 5</span>
                <span>Avg. satisfaction on tracked orders</span>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleTrack} className="space-y-4 w-full">
              <div className="relative">
                <label htmlFor="order-id" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                  Order ID
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#9CA3AF]">#</span>

                  <input
                    id="order-id"
                    ref={inputRef}
                    type="text"
                    placeholder="e.g. 98718168"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-[#CFE4FF] bg-[#F9FBFF] pl-7 pr-4 py-3 text-[15px] font-medium text-[#0F172A] shadow-sm outline-none transition focus:border-[#007BFF] focus:ring-2 focus:ring-[#E0EDFF]"
                  />
                </div>

                <p className="mt-1 text-[11px] text-[#6B7280]">
                  You’ll find this on your confirmation page and in your email receipt.
                </p>
              </div>

              {/* TRACK BUTTON (BLUE OVERLAY FIXED) */}
              <button
                type="submit"
                disabled={loading || !orderId.trim()}
                className={`group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#007BFF] to-[#005FCC] py-3.5 text-[15px] font-semibold text-white shadow-[0_16px_40px_rgba(37,99,235,0.55)] transition hover:brightness-[1.03] active:scale-[0.99] ${
                  loading || !orderId.trim() ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {!loading && (
                  <span className="absolute inset-[1px] rounded-[11px] bg-gradient-to-r from-[#007BFF] to-[#005FCC] opacity-0 transition group-hover:opacity-100" />
                )}

                <span className="relative flex items-center gap-2">
                  {loading && <RefreshCw className="animate-spin" size={18} />}
                  {loading ? "Checking live status..." : "Track Order"}
                </span>
              </button>
            </form>

            {/* STATUS OUTPUT */}
            {(statusKey || error) && (
              <div className="mt-1 flex flex-col items-center gap-3 rounded-2xl border border-[#E0EDFF] bg-[#F5F7FF] px-4 py-4 sm:px-6 sm:py-5">

                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-inner border border-[#E0ECFF]">
                    {STATUS_ICONS[statusKey || "unknown"]}
                  </div>

                  <div className="text-left">
                    <div className="text-[15px] font-extrabold text-[#0F172A]">
                      {STATUS_TITLES[statusKey || "unknown"] || status}
                    </div>

                    {status && !error && (
                      <p className="mt-1 text-[13px] text-[#4B5563] max-w-md">
                        {statusKey === "delivered"
                          ? "Your YesViral order has been fully delivered. If you have any concerns, reach out with your order ID."
                          : statusKey === "in_progress"
                          ? "Your order is actively processing through our delivery pools. You’ll continue see results roll in soon."
                          : statusKey === "unknown"
                          ? "We couldn’t locate this order. Double-check the ID or reach out to support and we’ll investigate."
                          : null}
                      </p>
                    )}

                    {error && <p className="mt-1 text-[13px] font-medium text-red-500">{error}</p>}
                  </div>
                </div>

                {/* BLUE PROGRESS BAR */}
                <div className="mt-1 flex w-full max-w-md flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] text-[#6B7280] font-semibold uppercase tracking-[0.16em]">
                    <span>Order Placed</span>
                    <span>Processing</span>
                    <span>Delivered</span>
                  </div>

                  <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#E0ECFF]">
                    <div
                      className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#007BFF] via-[#0EA5E9] to-[#005FCC] transition-all duration-500 ${
                        statusKey === "delivered"
                          ? "w-full"
                          : statusKey === "in_progress" || statusKey === "searching"
                          ? "w-1/2"
                          : "w-1/3"
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
              <Link href="/" className="sm:flex-1">
                <button className="group flex w-full items-center justify-center gap-2 rounded-xl border border-[#CFE4FF] bg-white/90 px-6 py-2.5 text-[14px] font-semibold text-[#0B63E6] shadow-sm transition hover:bg-[#EAF2FF]">
                  <Home size={17} />
                  <span>Back to Home</span>
                </button>
              </Link>

              {/* PLACE ANOTHER ORDER — BLUE */}
              <button
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#007BFF] px-6 py-2.5 text-[14px] font-semibold text-white shadow-[0_16px_35px_rgba(15,23,42,0.6)] transition hover:bg-[#005FCC] sm:flex-1"
                onClick={() => setShowOrderModal(true)}
                type="button"
              >
                <Repeat size={17} />
                <span>Place Another Order</span>
              </button>
            </div>
          </div>
        </div>

        {/* FAQ SIDEBAR */}
        <aside className="relative w-full lg:flex-[0.9]">
          <div className="relative mt-4 lg:mt-0 rounded-[22px] border border-[#D5E4FF] bg-white/95 px-4 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.10)] sm:px-6 sm:py-7">

            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-[16px] font-black tracking-tight text-[#0F172A]">Tracking help & FAQs</h2>
                <p className="mt-1 text-[12px] text-[#64748B] max-w-xs">Quick answers for the most common tracking questions.</p>
              </div>

              <div className="hidden sm:flex items-center gap-2 rounded-full bg-[#F3F6FF] px-3 py-1 text-[11px] font-semibold text-[#0B63E6] border border-[#D0E2FF]">
                <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span>Support responds in under 24 hours</span>
              </div>
            </div>

            <div className="space-y-3">
              {FAQS.map((item, i) => (
                <div
                  key={i}
                  className={`cursor-pointer rounded-xl border border-[#CFE4FF] bg-[#F9FAFF] p-4 transition-all ${showFaq === i ? "shadow-xl scale-[1.02]" : "shadow-sm"}`}
                  onClick={() => setShowFaq(showFaq === i ? null : i)}
                >
                  <div className="flex items-center justify-between select-none">
                    <span className="text-[14px] font-semibold text-[#0B63E6]">{item.q}</span>
                    <ChevronDown className={`h-5 w-5 text-[#64748B] transition-transform ${showFaq === i ? "rotate-180" : ""}`} />
                  </div>

                  {showFaq === i && <p className="mt-3 text-[13px] leading-relaxed text-[#4B5563]">{item.a}</p>}
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link href="/contact">
                <button className="inline-flex items-center gap-2 rounded-full border border-[#CFE4FF] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#007BFF] shadow-sm transition hover:bg-[#EFF5FF]">
                  <MessageCircle size={17} />
                  <span>Need more help? Chat with our support team</span>
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
          -webkit-backdrop-filter: blur(14px);
        }
      `}</style>
    </main>
  );
}
