// components/OrderModal.tsx
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, X, Loader2
} from "lucide-react";

const stripePromise = loadStripe("pk_test_51RgpcCRfq6GJQepR3xUT0RkiGdN8ZSRu3OR15DfKhpMNj5QgmysYrmGQ8rGCXiI6Vi3B2L5Czmf7cRvIdtKRrSOw00SaVptcQt");

// Platform & service structure
const PLATFORMS = [
  {
    key: "instagram",
    name: "Instagram",
    icon: <Instagram className="text-[#E1306C]" size={24} />,
    services: [
      { type: "Followers", price: 0.09, icon: <UserPlus size={18} className="text-[#E1306C]" /> },
      { type: "Likes", price: 0.07, icon: <ThumbsUp size={18} className="text-[#E1306C]" /> },
      { type: "Views", price: 0.04, icon: <Eye size={18} className="text-[#E1306C]" /> }
    ]
  },
  {
    key: "tiktok",
    name: "TikTok",
    icon: <Music2 className="text-[#00F2EA]" size={24} />,
    services: [
      { type: "Followers", price: 0.10, icon: <UserPlus size={18} className="text-[#00F2EA]" /> },
      { type: "Likes", price: 0.08, icon: <ThumbsUp size={18} className="text-[#00F2EA]" /> },
      { type: "Views", price: 0.06, icon: <Eye size={18} className="text-[#00F2EA]" /> }
    ]
  },
  {
    key: "youtube",
    name: "YouTube",
    icon: <Youtube className="text-[#FF0000]" size={24} />,
    services: [
      { type: "Subscribers", price: 0.12, icon: <UserPlus size={18} className="text-[#FF0000]" /> },
      { type: "Likes", price: 0.09, icon: <ThumbsUp size={18} className="text-[#FF0000]" /> },
      { type: "Views", price: 0.05, icon: <Eye size={18} className="text-[#FF0000]" /> }
    ]
  }
];

export default function OrderModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [service, setService] = useState(PLATFORMS[0].services[0]);
  const [quantity, setQuantity] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handlePlatform = (p: typeof platform) => {
    setPlatform(p);
    setService(p.services[0]);
    setQuantity(100);
  };

  const handleService = (s: typeof service) => {
    setService(s);
    setQuantity(100);
  };

  const total = (service.price * quantity).toFixed(2);

  // Stripe checkout
  const handleCheckout = async () => {
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
          metadata: { platform: platform.name, service: service.type, quantity }
        })
      });
      const session = await res.json();
      setLoading(false);
      if (session.id) await stripe?.redirectToCheckout({ sessionId: session.id });
      else setError("Unable to start checkout. Please try again.");
    } catch (e) {
      setLoading(false);
      setError("Checkout failed. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg mx-auto rounded-2xl shadow-2xl relative animate-fadeInFast p-8">
        <button className="absolute right-5 top-5 p-2 rounded-full bg-[#F5FAFF] hover:bg-[#E6F0FF]" onClick={onClose}>
          <X size={22} className="text-[#007BFF]" />
        </button>
        <h2 className="text-3xl font-extrabold text-[#007BFF] mb-5 text-center">Place Your Order</h2>
        {/* Platform selection */}
        <div className="flex gap-4 justify-center mb-6">
          {PLATFORMS.map(p => (
            <button
              key={p.key}
              onClick={() => handlePlatform(p)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg border-2 text-base font-medium transition shadow-sm
                ${platform.key === p.key ? "bg-[#F5FAFF] border-[#007BFF] text-[#007BFF]" : "bg-white border-[#CFE4FF] text-[#333] hover:bg-[#F2F9FF]"}
              `}
            >
              {p.icon}
              {p.name}
            </button>
          ))}
        </div>
        {/* Service selection */}
        <div className="flex gap-3 justify-center mb-6">
          {platform.services.map(s => (
            <button
              key={s.type}
              onClick={() => handleService(s)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg border-2 text-base font-medium transition shadow-sm
                ${service.type === s.type ? "bg-[#E8F1FF] border-[#007BFF] text-[#007BFF]" : "bg-white border-[#CFE4FF] text-[#333] hover:bg-[#F2F9FF]"}
              `}
            >
              {s.icon}
              {s.type}
              <span className="text-xs text-[#888]">${s.price}/ea</span>
            </button>
          ))}
        </div>
        {/* Quantity + order */}
        <div className="bg-[#F5FAFF] border border-[#CFE4FF] p-6 rounded-xl mb-4">
          <div className="mb-3 flex items-center gap-2">
            <label className="font-semibold mr-2">Quantity:</label>
            <input
              type="number"
              min={10}
              max={100000}
              step={10}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="border border-[#CFE4FF] rounded-lg px-4 py-2 w-32 text-lg font-medium"
            />
            <span className="ml-auto font-bold text-[#007BFF] text-lg">${total}</span>
          </div>
          <button
            className="w-full bg-[#007BFF] hover:bg-[#005FCC] text-white py-3 rounded-xl font-bold shadow transition text-lg"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin mr-2 inline" /> : "Order Now"}
          </button>
          {error && <div className="mt-3 text-red-500 text-sm text-center">{error}</div>}
        </div>
        {/* Payment icons */}
        <div className="flex justify-center mt-4 gap-2 opacity-80">
          <svg width="34" height="20" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><text x="7" y="16" fill="#007BFF" fontWeight="bold" fontSize="14" fontFamily="sans-serif">VISA</text></svg>
          <svg width="34" height="20" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><circle cx="14" cy="12" r="7" fill="#007BFF" fillOpacity="0.6" /><circle cx="22" cy="12" r="7" fill="#007BFF" fillOpacity="0.9" /></svg>
          <svg width="34" height="20" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><circle cx="11" cy="12" r="5" fill="#007BFF" /><rect x="19" y="7" width="10" height="10" rx="2" fill="#005FCC" /><text x="19" y="21" fill="#fff" fontWeight="bold" fontSize="8" fontFamily="sans-serif">Pay</text></svg>
          <svg width="34" height="20" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><rect x="7" y="7" width="10" height="10" rx="2" fill="#007BFF" /><rect x="19" y="7" width="10" height="10" rx="2" fill="#005FCC" /><text x="11" y="21" fill="#fff" fontWeight="bold" fontSize="8" fontFamily="sans-serif">G</text><text x="24" y="21" fill="#fff" fontWeight="bold" fontSize="8" fontFamily="sans-serif">Pay</text></svg>
          <svg width="34" height="20" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><circle cx="18" cy="12" r="7" fill="#007BFF" /><text x="13" y="17" fill="#fff" fontWeight="bold" fontSize="13" fontFamily="monospace">₿</text></svg>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeInFast {
          from { opacity: 0; transform: translateY(24px);}
          to   { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInFast {
          animation: fadeInFast 0.17s cubic-bezier(.39,1.7,.47,.99);
        }
      `}</style>
    </div>
  );
}
