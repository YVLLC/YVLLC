import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, X, Loader2, CheckCircle, Lock, Star
} from "lucide-react";

const stripePromise = loadStripe("pk_test_51RgpcCRfq6GJQepR3xUT0RkiGdN8ZSRu3OR15DfKhpMNj5QgmysYrmGQ8rGCXiI6Vi3B2L5Czmf7cRvIdtKRrSOw00SaVptcQt");

const PLATFORMS = [
  {
    key: "instagram",
    name: "Instagram",
    color: "#E1306C",
    icon: <Instagram className="text-[#E1306C] drop-shadow-glow" size={26} />,
    banner: "Most popular for fast growth 🚀",
    services: [
      { type: "Followers", price: 0.09, icon: <UserPlus size={18} className="text-[#E1306C]" /> },
      { type: "Likes", price: 0.07, icon: <ThumbsUp size={18} className="text-[#E1306C]" /> },
      { type: "Views", price: 0.04, icon: <Eye size={18} className="text-[#E1306C]" /> }
    ]
  },
  {
    key: "tiktok",
    name: "TikTok",
    color: "#00F2EA",
    icon: <Music2 className="text-[#00F2EA] drop-shadow-glow" size={26} />,
    banner: "Instant TikTok virality 🌊",
    services: [
      { type: "Followers", price: 0.10, icon: <UserPlus size={18} className="text-[#00F2EA]" /> },
      { type: "Likes", price: 0.08, icon: <ThumbsUp size={18} className="text-[#00F2EA]" /> },
      { type: "Views", price: 0.06, icon: <Eye size={18} className="text-[#00F2EA]" /> }
    ]
  },
  {
    key: "youtube",
    name: "YouTube",
    color: "#FF0000",
    icon: <Youtube className="text-[#FF0000] drop-shadow-glow" size={26} />,
    banner: "Boost your channel & videos 📈",
    services: [
      { type: "Subscribers", price: 0.12, icon: <UserPlus size={18} className="text-[#FF0000]" /> },
      { type: "Likes", price: 0.09, icon: <ThumbsUp size={18} className="text-[#FF0000]" /> },
      { type: "Views", price: 0.05, icon: <Eye size={18} className="text-[#FF0000]" /> }
    ]
  }
];

const FAQS = [
  { q: "How fast is delivery?", a: "Most orders start within 1–10 minutes. You'll get a confirmation and can track your order in real time." },
  { q: "Do you need my password?", a: "Never. We only require your username or content URL. Your info stays private." },
  { q: "Is this safe & real?", a: "100%. We use safe, tested methods and only real engagement. Money-back if not delivered." }
];

export default function OrderModal({ open, onClose }) {
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [service, setService] = useState(PLATFORMS[0].services[0]);
  const [quantity, setQuantity] = useState(100);
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handlePlatform = (p) => {
    setPlatform(p);
    setService(p.services[0]);
    setQuantity(100);
    setTarget("");
    setError("");
  };

  const handleService = (s) => {
    setService(s);
    setQuantity(100);
    setError("");
  };

  const handleCheckout = async () => {
    if (!target || quantity < 10) {
      setError("Enter a valid username or URL and quantity.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const stripe = await stripePromise;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          line_items: [{
            price_data: {
              currency: "usd",
              product_data: { name: `${platform.name} ${service.type}` },
              unit_amount: Math.round(service.price * 100),
            },
            quantity,
          }],
          metadata: { platform: platform.name, service: service.type, quantity, target }
        })
      });
      const session = await res.json();
      setLoading(false);
      if (session.id) {
        await stripe?.redirectToCheckout({ sessionId: session.id });
        setSuccess(true);
      } else setError("Unable to start checkout. Please try again.");
    } catch {
      setLoading(false);
      setError("Checkout failed. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center backdrop-blur-lg animate-fadeInSuper">
      <div className="bg-white relative w-full max-w-xl rounded-3xl shadow-[0_8px_48px_8px_rgba(0,0,0,0.12)] border-4 border-[#E8F1FF] p-8 sm:p-10 mx-4">
        <button
          className="absolute right-5 top-5 p-2 bg-[#F5FAFF] hover:bg-[#E8F1FF] rounded-full shadow"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={22} className="text-[#007BFF]" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          {platform.icon}
          <h2 className="text-3xl font-extrabold" style={{ color: platform.color }}>{platform.name} Order</h2>
        </div>
        <div className="text-xs sm:text-sm text-[#007BFF] font-bold tracking-wide mb-4">{platform.banner}</div>

        <div className="flex gap-3 mb-7 mt-3 justify-center">
          {PLATFORMS.map((p) => (
            <button
              key={p.key}
              className={`rounded-lg px-3 py-2 flex flex-col items-center border-2 font-bold text-sm shadow
                ${platform.key === p.key
                  ? "border-[#007BFF] bg-[#F5FAFF] text-[#007BFF] scale-105"
                  : "border-[#D2E6FF] text-[#222] hover:bg-[#F9FAFF]"} transition`}
              onClick={() => handlePlatform(p)}
            >
              {p.icon}
              <span>{p.name}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-3 mb-6 justify-center">
          {platform.services.map((s) => (
            <button
              key={s.type}
              className={`rounded-lg px-3 py-2 flex flex-col items-center border-2 text-xs sm:text-sm font-semibold
                ${service.type === s.type
                  ? "border-[#007BFF] bg-[#E8F1FF] text-[#007BFF] scale-105"
                  : "border-[#D2E6FF] text-[#222] hover:bg-[#F5FAFF]"} transition`}
              onClick={() => handleService(s)}
            >
              {s.icon}
              <span>{s.type}</span>
              <span className="font-normal text-[11px] text-[#888]">${s.price} / each</span>
            </button>
          ))}
        </div>

        <form
          className="bg-[#F5FAFF] border border-[#D2E6FF] rounded-2xl p-5 space-y-4"
          onSubmit={e => { e.preventDefault(); handleCheckout(); }}
        >
          <div className="flex items-center gap-3">
            <label className="font-bold text-[#007BFF] w-28">Link or @</label>
            <input
              type="text"
              placeholder={`Paste your ${platform.name} username or post link`}
              className="w-full border border-[#CFE4FF] rounded-md px-3 py-2 text-base outline-[#007BFF] font-medium"
              value={target}
              onChange={e => setTarget(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="font-bold text-[#007BFF] w-28">Quantity</label>
            <input
              type="number"
              min={10}
              max={500000}
              step={10}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="border border-[#CFE4FF] rounded-md px-3 py-2 text-base w-28 font-bold"
            />
            <span className="ml-auto font-bold text-[#007BFF] text-lg">
              ${(service.price * quantity).toFixed(2)}
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-extrabold text-lg transition shadow-lg flex justify-center items-center gap-2
            bg-gradient-to-br from-[#007BFF] to-[#35c4ff] hover:from-[#005FCC] hover:to-[#28a3e6] text-white
            ${loading ? "opacity-80" : ""}`}
          >
            {loading ? <Loader2 className="animate-spin mr-1" size={20} /> : <CheckCircle size={20} />}
            {loading ? "Processing…" : "Order & Checkout"}
          </button>
          {error && <div className="mt-2 text-red-500 text-center">{error}</div>}
        </form>

        <div className="mt-7">
          <div className="flex items-center gap-1 justify-center mb-2">
            <Lock size={18} className="text-[#007BFF]" />
            <span className="text-xs text-[#555] font-semibold">SSL Secured · 100% Safe Payments</span>
          </div>
          <div className="flex justify-center gap-1 opacity-80">
            <svg width="34" height="20" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><text x="7" y="16" fill="#007BFF" fontWeight="bold" fontSize="14" fontFamily="sans-serif">VISA</text></svg>
            <svg width="34" height="20" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><circle cx="14" cy="12" r="7" fill="#007BFF" fillOpacity="0.6" /><circle cx="22" cy="12" r="7" fill="#007BFF" fillOpacity="0.9" /></svg>
            <svg width="34" height="20" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><circle cx="11" cy="12" r="5" fill="#007BFF" /><rect x="19" y="7" width="10" height="10" rx="2" fill="#005FCC" /><text x="19" y="21" fill="#fff" fontWeight="bold" fontSize="8" fontFamily="sans-serif">Pay</text></svg>
            <svg width="34" height="20" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><rect x="7" y="7" width="10" height="10" rx="2" fill="#007BFF" /><rect x="19" y="7" width="10" height="10" rx="2" fill="#005FCC" /><text x="11" y="21" fill="#fff" fontWeight="bold" fontSize="8" fontFamily="sans-serif">G</text><text x="24" y="21" fill="#fff" fontWeight="bold" fontSize="8" fontFamily="sans-serif">Pay</text></svg>
            <svg width="34" height="20" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><circle cx="18" cy="12" r="7" fill="#007BFF" /><text x="13" y="17" fill="#fff" fontWeight="bold" fontSize="13" fontFamily="monospace">₿</text></svg>
          </div>
        </div>

        <div className="mt-7 text-center">
          <div className="flex gap-2 justify-center mb-1">
            <Star className="text-yellow-400" size={18} />
            <span className="font-bold text-[#111]">4.9/5 average · 10,000+ clients</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="rounded-xl bg-[#FAFCFF] border border-[#E8F1FF] p-3 text-xs text-left shadow">
                <div className="font-bold text-[#007BFF] mb-1">{q}</div>
                <div className="text-[#333]">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeInSuper {
          from { opacity: 0; transform: scale(.95);}
          to   { opacity: 1; transform: scale(1);}
        }
        .animate-fadeInSuper { animation: fadeInSuper 0.24s cubic-bezier(.39,1.7,.47,.99); }
        .drop-shadow-glow { filter: drop-shadow(0 0 6px #7de4ff70) drop-shadow(0 1px 1px #fff2); }
      `}</style>
    </div>
  );
}
