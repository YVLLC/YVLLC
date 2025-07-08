import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, X, Loader2, CheckCircle, Lock
} from "lucide-react";

const stripePromise = loadStripe("pk_test_51RgpcCRfq6GJQepR3xUT0RkiGdN8ZSRu3OR15DfKhpMNj5QgmysYrmGQ8rGCXiI6Vi3B2L5Czmf7cRvIdtKRrSOw00SaVptcQt");

const PLATFORMS = [
  {
    key: "instagram",
    name: "Instagram",
    color: "#E1306C",
    icon: <Instagram className="text-[#E1306C]" size={26} />,
    services: [
      { type: "Followers", price: 0.09, icon: <UserPlus size={17} className="text-[#E1306C]" /> },
      { type: "Likes", price: 0.07, icon: <ThumbsUp size={17} className="text-[#E1306C]" /> },
      { type: "Views", price: 0.04, icon: <Eye size={17} className="text-[#E1306C]" /> }
    ]
  },
  {
    key: "tiktok",
    name: "TikTok",
    color: "#00F2EA",
    icon: <Music2 className="text-[#00F2EA]" size={26} />,
    services: [
      { type: "Followers", price: 0.10, icon: <UserPlus size={17} className="text-[#00F2EA]" /> },
      { type: "Likes", price: 0.08, icon: <ThumbsUp size={17} className="text-[#00F2EA]" /> },
      { type: "Views", price: 0.06, icon: <Eye size={17} className="text-[#00F2EA]" /> }
    ]
  },
  {
    key: "youtube",
    name: "YouTube",
    color: "#FF0000",
    icon: <Youtube className="text-[#FF0000]" size={26} />,
    services: [
      { type: "Subscribers", price: 0.12, icon: <UserPlus size={17} className="text-[#FF0000]" /> },
      { type: "Likes", price: 0.09, icon: <ThumbsUp size={17} className="text-[#FF0000]" /> },
      { type: "Views", price: 0.05, icon: <Eye size={17} className="text-[#FF0000]" /> }
    ]
  }
];

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OrderModal({ open, onClose }: OrderModalProps) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [service, setService] = useState(PLATFORMS[0].services[0]);
  const [quantity, setQuantity] = useState(100);
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  // Step change resets lower steps:
  const choosePlatform = (p: typeof platform) => {
    setPlatform(p);
    setService(p.services[0]);
    setQuantity(100);
    setTarget("");
    setError("");
    setStep(1);
  };

  const chooseService = (s: typeof service) => {
    setService(s);
    setQuantity(100);
    setError("");
    setStep(2);
  };

  const resetModal = () => {
    setStep(0);
    setPlatform(PLATFORMS[0]);
    setService(PLATFORMS[0].services[0]);
    setQuantity(100);
    setTarget("");
    setError("");
    setLoading(false);
  };

  const closeAndReset = () => {
    resetModal();
    onClose();
  };

  // Checkout
  const handleCheckout = async () => {
    if (!target || quantity < 10) {
      setError("Paste your profile link or username, and enter a quantity.");
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
      if (session.id) await stripe?.redirectToCheckout({ sessionId: session.id });
      else setError("Unable to start checkout. Please try again.");
    } catch {
      setLoading(false);
      setError("Checkout failed. Try again.");
    }
  };

  // Stepper UI
  const steps = [
    { label: "Platform" },
    { label: "Service" },
    { label: "Details" },
  ];

  return (
    <div className="fixed z-[9999] inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
      {/* Modal */}
      <div className="relative max-w-md w-[96vw] mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_10px_48px_8px_rgba(0,34,64,0.13)] border border-[#e3edfc] overflow-hidden animate-fadeInPop">
        {/* X button sits alone, floating above */}
        <button
          className="absolute top-[-16px] right-[-16px] z-20 bg-white/95 border border-[#e3edfc] shadow-xl rounded-full p-2 hover:bg-[#eaf4ff] transition"
          onClick={closeAndReset}
          aria-label="Close"
          style={{ boxShadow: "0 2px 14px 0 #0086ff18" }}
        >
          <X size={22} className="text-[#007BFF]" />
        </button>

        {/* Header: platform, and stepper below */}
        <div className="w-full px-7 pt-7 pb-3 bg-gradient-to-r from-[#f7fbff] via-[#ecf4ff] to-[#f8fbff] border-b border-[#e3edfc]">
          <div className="flex items-center gap-2">
            {platform.icon}
            <span className="font-extrabold text-lg" style={{ color: platform.color }}>
              {platform.name}
            </span>
          </div>
          {/* STEPPER - visible and clear, always below header */}
          <div className="flex items-center justify-center gap-4 mt-5 mb-[-6px]">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className={`
                  rounded-full w-7 h-7 flex items-center justify-center font-bold
                  ${step === i ? "bg-[#007BFF] text-white shadow" :
                    step > i ? "bg-[#95e1fc] text-[#0d88c7]" :
                      "bg-[#e6f4ff] text-[#A0B3C7]"}
                  border-2 border-white
                  transition
                `}>
                  {i + 1}
                </div>
                <span className={`text-xs font-semibold ${step === i ? "text-[#007BFF]" : "text-[#A0B3C7]"}`}>{s.label}</span>
                {i < steps.length - 1 && <div className="w-6 h-1 bg-[#e3edfc] rounded-full" />}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="px-7 py-7">
          {/* Step 0: Platform */}
          {step === 0 && (
            <>
              <h3 className="font-bold text-xl mb-3 text-[#222] text-center">Pick a Platform</h3>
              <div className="flex justify-center gap-3">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.key}
                    className={`rounded-xl flex flex-col items-center gap-1 px-5 py-4 border-2 font-bold text-sm shadow hover:shadow-lg transition 
                      ${platform.key === p.key ? "border-[#007BFF] bg-[#F5FAFF] text-[#007BFF] scale-105" : "border-[#D2E6FF] text-[#333] bg-white"}`}
                    onClick={() => choosePlatform(p)}
                  >
                    {p.icon}
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 1: Service */}
          {step === 1 && (
            <>
              <h3 className="font-bold text-xl mb-3 text-[#222] text-center">
                {platform.icon} {platform.name} Services
              </h3>
              <div className="flex flex-col gap-3">
                {platform.services.map((s) => (
                  <button
                    key={s.type}
                    className={`rounded-xl flex items-center justify-between px-5 py-4 border-2 text-base font-semibold shadow hover:shadow-lg transition
                      ${service.type === s.type ? "border-[#007BFF] bg-[#E8F1FF] text-[#007BFF]" : "border-[#D2E6FF] text-[#222] bg-white"}`}
                    onClick={() => chooseService(s)}
                  >
                    <div className="flex items-center gap-2">
                      {s.icon}
                      <span>{s.type}</span>
                    </div>
                    <span className="font-normal text-[13px] text-[#888]">${s.price}/each</span>
                  </button>
                ))}
              </div>
              <button className="block mx-auto mt-7 text-[#007BFF] underline text-sm" onClick={() => setStep(0)}>← Back</button>
            </>
          )}

          {/* Step 2: Info/Checkout */}
          {step === 2 && (
            <>
              <h3 className="font-bold text-xl mb-4 text-[#222] text-center">Your {service.type} Order</h3>
              <form
                className="space-y-5"
                onSubmit={e => { e.preventDefault(); handleCheckout(); }}
              >
                <div>
                  <label className="block font-semibold text-[#007BFF] mb-1">Profile or Post Link</label>
                  <input
                    type="text"
                    autoFocus
                    className="w-full border border-[#CFE4FF] rounded-lg px-3 py-2 text-base font-medium outline-[#007BFF] bg-white/90"
                    placeholder={`Paste your ${platform.name} username or post link`}
                    value={target}
                    onChange={e => setTarget(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="font-semibold text-[#007BFF]">Quantity</label>
                  <input
                    type="number"
                    min={10}
                    max={500000}
                    step={10}
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    className="border border-[#CFE4FF] rounded-lg px-3 py-2 text-base w-24 font-bold bg-white/90"
                  />
                  <span className="ml-auto font-bold text-[#007BFF] text-lg">
                    ${(service.price * quantity).toFixed(2)}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-extrabold text-lg flex justify-center items-center gap-2
                  bg-gradient-to-br from-[#007BFF] to-[#35c4ff] hover:from-[#005FCC] hover:to-[#28a3e6] text-white shadow-lg transition"
                >
                  {loading ? <Loader2 className="animate-spin mr-1" size={20} /> : <CheckCircle size={20} />}
                  {loading ? "Processing…" : "Order & Checkout"}
                </button>
                {error && <div className="mt-2 text-red-500 text-center">{error}</div>}
              </form>
              <div className="mt-6 flex items-center gap-2 justify-center text-[#007BFF] text-sm font-semibold">
                <Lock size={16} /> SSL Secured · Safe Payments
              </div>
              <div className="flex justify-center gap-1 mt-2 opacity-70">
                <svg width="30" height="18" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><text x="7" y="16" fill="#007BFF" fontWeight="bold" fontSize="12" fontFamily="sans-serif">VISA</text></svg>
                <svg width="30" height="18" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><circle cx="14" cy="12" r="7" fill="#007BFF" fillOpacity="0.6" /><circle cx="22" cy="12" r="7" fill="#007BFF" fillOpacity="0.9" /></svg>
                <svg width="30" height="18" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><circle cx="11" cy="12" r="5" fill="#007BFF" /><rect x="19" y="7" width="10" height="10" rx="2" fill="#005FCC" /><text x="19" y="21" fill="#fff" fontWeight="bold" fontSize="7" fontFamily="sans-serif">Pay</text></svg>
                <svg width="30" height="18" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><rect x="7" y="7" width="10" height="10" rx="2" fill="#007BFF" /><rect x="19" y="7" width="10" height="10" rx="2" fill="#005FCC" /><text x="11" y="21" fill="#fff" fontWeight="bold" fontSize="7" fontFamily="sans-serif">G</text><text x="24" y="21" fill="#fff" fontWeight="bold" fontSize="7" fontFamily="sans-serif">Pay</text></svg>
                <svg width="30" height="18" viewBox="0 0 36 24"><rect width="36" height="24" rx="4" fill="#fff" /><circle cx="18" cy="12" r="7" fill="#007BFF" /><text x="13" y="17" fill="#fff" fontWeight="bold" fontSize="11" fontFamily="monospace">₿</text></svg>
              </div>
              <button className="block mx-auto mt-7 text-[#007BFF] underline text-sm" onClick={() => setStep(1)}>← Back</button>
            </>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeInPop {
          from { opacity: 0; transform: translateY(32px) scale(.95);}
          to   { opacity: 1; transform: translateY(0) scale(1);}
        }
        .animate-fadeInPop { animation: fadeInPop 0.22s cubic-bezier(.39,1.7,.47,.99); }
      `}</style>
    </div>
  );
}
