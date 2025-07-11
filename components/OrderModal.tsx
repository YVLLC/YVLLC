import { useState, useEffect } from "react";
import {
  Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, X, Loader2, CheckCircle, Lock, Star, RefreshCcw, ShieldCheck, BarChart, MessageCircle, Clock, UserCheck, Zap
} from "lucide-react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_live_51Rgpc4Dzq312KvGPUkyCKLxH4ZdPWeJlmBAnMrSlAl5BHF8Wu8qFW6hqxKlo3l7F87X3qmvVnmDrZYcP3FSSTPVN00fygC8Pfl");

const PLATFORMS = [
  {
    key: "instagram",
    name: "Instagram",
    icon: <Instagram size={22} className="text-[#E1306C]" />,
    services: [
      {
        type: "Followers",
        price: 0.09,
        icon: <UserPlus size={16} className="text-[#E1306C]" />,
        desc: "Boost your IG page instantly with real, organic followers. Perfect for credibility and rapid growth.",
        features: [
          { text: "Genuine, active users only", icon: <CheckCircle size={16} className="text-green-500" /> },
          { text: "Starts in under 10 minutes", icon: <Zap size={16} className="text-[#007BFF]" /> },
          { text: "No password required", icon: <Lock size={16} className="text-[#007BFF]" /> },
          { text: "Guaranteed refill for 30 days", icon: <RefreshCcw size={16} className="text-[#22C55E]" /> }
        ]
      },
      {
        type: "Likes",
        price: 0.07,
        icon: <ThumbsUp size={16} className="text-[#E1306C]" />,
        desc: "Get high-quality likes on your posts to boost reach and engagement. Works for Reels & Photos.",
        features: [
          { text: "Real likes from real profiles", icon: <CheckCircle size={16} className="text-green-500" /> },
          { text: "Works for all post types", icon: <Star size={16} className="text-yellow-400" /> },
          { text: "Delivery starts instantly", icon: <Zap size={16} className="text-[#007BFF]" /> },
        ]
      },
      {
        type: "Views",
        price: 0.04,
        icon: <Eye size={16} className="text-[#E1306C]" />,
        desc: "Increase views on any video—IGTV, Reels, or Stories. 100% real and high-retention.",
        features: [
          { text: "High retention, real views", icon: <CheckCircle size={16} className="text-green-500" /> },
          { text: "Suitable for all video content", icon: <Eye size={16} className="text-[#007BFF]" /> },
        ]
      },
      {
        type: "Comments",
        price: 0.20,
        icon: <X size={16} className="text-[#E1306C]" />,
        desc: "Custom, authentic comments from active users. Great for boosting engagement and trust.",
        features: [
          { text: "Custom comment support", icon: <MessageCircle size={16} className="text-[#007BFF]" /> },
          { text: "Delivered by real users", icon: <CheckCircle size={16} className="text-green-500" /> },
        ]
      }
    ]
  },
  {
    key: "tiktok",
    name: "TikTok",
    icon: <Music2 size={22} className="text-[#00F2EA]" />,
    services: [
      {
        type: "Followers",
        price: 0.10,
        icon: <UserPlus size={16} className="text-[#00F2EA]" />,
        desc: "Explode your TikTok presence with real followers. Get featured & go viral faster.",
        features: [
          { text: "Organic growth only", icon: <BarChart size={16} className="text-[#007BFF]" /> },
          { text: "Fastest delivery in the industry", icon: <Zap size={16} className="text-[#00F2EA]" /> },
          { text: "No ban risk, fully safe", icon: <ShieldCheck size={16} className="text-[#22C55E]" /> },
        ]
      },
      {
        type: "Likes",
        price: 0.08,
        icon: <ThumbsUp size={16} className="text-[#00F2EA]" />,
        desc: "Real TikTok likes, delivered instantly to your videos for max algorithm boost.",
        features: [
          { text: "No bots, no drop", icon: <CheckCircle size={16} className="text-green-500" /> },
          { text: "Full support for trending sounds", icon: <Music2 size={16} className="text-[#00F2EA]" /> },
        ]
      },
      {
        type: "Views",
        price: 0.06,
        icon: <Eye size={16} className="text-[#00F2EA]" />,
        desc: "Boost your TikTok videos to the For You Page with authentic views.",
        features: [
          { text: "High retention, real views", icon: <CheckCircle size={16} className="text-green-500" /> },
          { text: "Works for all video types", icon: <Eye size={16} className="text-[#00F2EA]" /> },
        ]
      }
    ]
  },
  {
    key: "youtube",
    name: "YouTube",
    icon: <Youtube size={22} className="text-[#FF0000]" />,
    services: [
      {
        type: "Subscribers",
        price: 0.12,
        icon: <UserPlus size={16} className="text-[#FF0000]" />,
        desc: "Grow your channel with real YouTube subscribers. No risk, no drops.",
        features: [
          { text: "Real, active subscribers", icon: <UserCheck size={16} className="text-[#FF0000]" /> },
          { text: "30-day refill guarantee", icon: <RefreshCcw size={16} className="text-[#22C55E]" /> },
        ]
      },
      {
        type: "Likes",
        price: 0.09,
        icon: <ThumbsUp size={16} className="text-[#FF0000]" />,
        desc: "Increase video likes to build trust and get recommended more.",
        features: [
          { text: "Genuine likes, not bots", icon: <CheckCircle size={16} className="text-green-500" /> },
          { text: "Works for Shorts, Streams, and more", icon: <Zap size={16} className="text-[#FF0000]" /> },
        ]
      },
      {
        type: "Views",
        price: 0.05,
        icon: <Eye size={16} className="text-[#FF0000]" />,
        desc: "Drive real viewers to your videos. Helps with ranking & monetization.",
        features: [
          { text: "Guaranteed watch-time", icon: <Clock size={16} className="text-[#007BFF]" /> },
          { text: "100% safe, no risk", icon: <ShieldCheck size={16} className="text-green-500" /> },
        ]
      }
    ]
  }
];

const steps = [
  { label: "Platform" },
  { label: "Service" },
  { label: "Details" },
  { label: "Payment" },
  { label: "Done" }
];

function PaymentForm({
  amount,
  orderDetails,
  onPaymentSuccess,
  onError
}: {
  amount: number;
  orderDetails: any;
  onPaymentSuccess: () => void;
  onError?: (err: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/payment_intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const { clientSecret, error: serverError } = await res.json();
      if (serverError || !clientSecret) throw new Error(serverError || "Payment failed.");

      if (!stripe || !elements) throw new Error("Stripe not loaded");
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        }
      });
      if (stripeError) throw new Error(stripeError.message);

      onPaymentSuccess();
    } catch (e: any) {
      setError(e.message || "An error occurred.");
      onError?.(e.message || "Payment error");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handlePayment} className="space-y-5">
      <div className="border rounded-lg px-3 py-2 bg-white">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl font-extrabold text-lg flex justify-center items-center gap-2
        bg-gradient-to-br from-[#007BFF] to-[#35c4ff] hover:from-[#005FCC] hover:to-[#28a3e6] text-white shadow-lg transition"
      >
        {loading ? <Loader2 className="animate-spin mr-1" size={20} /> : <CheckCircle size={20} />}
        {loading ? "Processing…" : "Pay & Order"}
      </button>
      <div className="flex items-center gap-2 justify-center text-[#007BFF] text-sm font-semibold mt-2">
        <Lock size={16} /> 100% Secure Card Payment
      </div>
    </form>
  );
}

export default function OrderModal({
  open,
  onClose,
  initialPlatform,
  initialService
}: {
  open: boolean,
  onClose: () => void,
  initialPlatform?: string | null,
  initialService?: string | null
}) {
  const [step, setStep] = useState<number>(0);
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [service, setService] = useState(PLATFORMS[0].services[0]);
  const [hoveredService, setHoveredService] = useState<typeof service | null>(null);
  const [quantity, setQuantity] = useState(100);
  const [target, setTarget] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [isDetailsHovered, setIsDetailsHovered] = useState(false);

  useEffect(() => {
    if (!open) return;
    let selectedPlatform = PLATFORMS[0];
    let selectedService = PLATFORMS[0].services[0];
    let stepToSet = 0;

    if (initialPlatform) {
      const foundPlat = PLATFORMS.find(
        p =>
          p.key === initialPlatform.toLowerCase() ||
          p.name.toLowerCase() === initialPlatform.toLowerCase()
      );
      if (foundPlat) {
        selectedPlatform = foundPlat;
        if (initialService) {
          const foundServ = foundPlat.services.find(
            s => s.type.toLowerCase() === initialService.toLowerCase()
          );
          if (foundServ) {
            selectedService = foundServ;
            stepToSet = 2;
          } else {
            selectedService = foundPlat.services[0];
            stepToSet = 1;
          }
        } else {
          selectedService = foundPlat.services[0];
          stepToSet = 1;
        }
      }
    }

    setPlatform(selectedPlatform);
    setService(selectedService);
    setQuantity(100);
    setTarget("");
    setError("");
    setDone(false);
    setHoveredService(null);
    setStep(stepToSet);
    setIsDetailsHovered(false);
  }, [open, initialPlatform, initialService]);

  if (!open) return null;

  const choosePlatform = (p: typeof platform) => {
    setPlatform(p);
    setService(p.services[0]);
    setQuantity(100);
    setTarget("");
    setError("");
    setHoveredService(null);
    setStep(1);
  };

  const chooseService = (s: typeof service) => {
    setService(s);
    setQuantity(100);
    setError("");
    setHoveredService(null);
    setStep(2);
  };

  const resetModal = () => {
    setStep(0);
    setPlatform(PLATFORMS[0]);
    setService(PLATFORMS[0].services[0]);
    setQuantity(100);
    setTarget("");
    setError("");
    setHoveredService(null);
    setDone(false);
    setIsDetailsHovered(false);
  };

  const closeAndReset = () => {
    resetModal();
    onClose();
  };

  const orderDetails = {
    platform: platform.key,
    service: service.type,
    quantity,
    target,
    price: service.price * quantity,
  };
  const amountCents = Math.round(service.price * quantity * 100);

  return (
    <div className="fixed z-[9999] inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
      <div className="relative max-w-md w-[96vw] mx-auto bg-white/95 rounded-3xl shadow-2xl border border-[#e3edfc] overflow-visible max-h-[98vh] flex flex-col" style={{ minHeight: 440 }}>
        {/* Modal HEADER */}
        <div className="w-full px-4 pt-7 pb-3 rounded-t-3xl relative bg-gradient-to-r from-[#f7fbff] via-[#ecf4ff] to-[#f8fbff] border-b border-[#e3edfc]">
          <button
            className="absolute top-4 right-5 z-20 bg-white/95 border border-[#e3edfc] shadow-lg rounded-full p-2 hover:bg-[#eaf4ff] transition"
            onClick={closeAndReset}
            aria-label="Close"
            style={{ boxShadow: "0 2px 14px 0 #0086ff18" }}
          >
            <span className="sr-only">Close</span>✕
          </button>
          <div className="flex items-center gap-2 pr-9">
            {platform.icon}
            <span className="font-extrabold text-lg">{platform.name}</span>
          </div>
          {/* Steps */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 mt-5 mb-[-6px] min-h-[42px]">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2 flex-shrink-0">
                <div className={`
                  rounded-full w-7 h-7 flex items-center justify-center font-bold
                  ${step === i || (done && i === 4) ? "bg-[#007BFF] text-white shadow" :
                    step > i ? "bg-[#95e1fc] text-[#0d88c7]" :
                      "bg-[#e6f4ff] text-[#A0B3C7]"}
                  border-2 border-white
                  transition
                `}>
                  {i + 1}
                </div>
                <span className={`text-xs font-semibold whitespace-nowrap ${step === i || (done && i === 4) ? "text-[#007BFF]" : "text-[#A0B3C7]"}`}>{s.label}</span>
                {i < steps.length - 1 && <div className="w-6 h-1 bg-[#e3edfc] rounded-full flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>
        {/* CONTENT */}
        <div className="px-4 py-6 flex-1 overflow-y-auto min-h-[340px]">
          {/* Step 0: Pick Platform */}
          {step === 0 && (
            <>
              <h3 className="font-bold text-xl mb-3 text-[#222] text-center">Pick a Platform</h3>
              <div className="flex justify-center gap-3 flex-wrap">
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
          {/* Step 1: Service List with hover/tap update */}
          {step === 1 && (
            <>
              <h3 className="font-bold text-xl mb-3 text-[#222] text-center">
                {platform.icon} {platform.name} Services
              </h3>
              <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
                {platform.services.map((s) => (
                  <button
                    key={s.type}
                    className={`flex items-center justify-between px-4 py-4 rounded-xl border-2 text-base font-semibold shadow hover:shadow-lg transition
                      ${service.type === s.type ? "border-[#007BFF] bg-[#E8F1FF] text-[#007BFF]" : "border-[#D2E6FF] text-[#222] bg-white"}`}
                    onClick={() => chooseService(s)}
                    onMouseEnter={() => setHoveredService(s)}
                    onMouseLeave={() => {
                      if (!isDetailsHovered) setHoveredService(null);
                    }}
                    onFocus={() => setHoveredService(s)}
                    onBlur={() => {
                      if (!isDetailsHovered) setHoveredService(null);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {s.icon}
                      <span>{s.type}</span>
                    </div>
                    <span className="font-normal text-[13px] text-[#888]">${s.price}/ea</span>
                  </button>
                ))}
              </div>
              <div
                onMouseEnter={() => setIsDetailsHovered(true)}
                onMouseLeave={() => {
                  setIsDetailsHovered(false);
                  setHoveredService(null);
                }}
                className="mt-5 bg-[#F5FAFF] border border-[#CFE4FF] p-5 rounded-xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  {(hoveredService || service).icon}
                  <span className="font-bold text-[#007BFF]">{(hoveredService || service).type}</span>
                  <Star size={15} className="text-yellow-400 animate-pulse" />
                </div>
                <div className="text-[#444] text-sm mb-3">{(hoveredService || service).desc}</div>
                <ul className="space-y-2">
                  {(hoveredService || service).features?.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[#222] text-[15px]">
                      {f.icon}
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="block mx-auto mt-7 text-[#007BFF] underline text-sm" onClick={() => setStep(0)}>← Back</button>
            </>
          )}
          {/* Step 2: Order Details */}
          {step === 2 && (
            <>
              <h3 className="font-bold text-xl mb-4 text-[#222] text-center">Your {service.type} Order</h3>
              <form
                className="space-y-5"
                onSubmit={e => {
                  e.preventDefault();
                  if (!target || quantity < 10) {
                    setError("Paste your profile link or username, and enter a quantity.");
                    return;
                  }
                  setError("");
                  setStep(3);
                }}
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
                  className="w-full py-3 rounded-xl font-extrabold text-lg flex justify-center items-center gap-2
                  bg-gradient-to-br from-[#007BFF] to-[#35c4ff] hover:from-[#005FCC] hover:to-[#28a3e6] text-white shadow-lg transition"
                >
                  <CheckCircle size={20} /> Continue to Payment
                </button>
                {error && <div className="mt-2 text-red-500 text-center">{error}</div>}
              </form>
              <button className="block mx-auto mt-7 text-[#007BFF] underline text-sm" onClick={() => setStep(1)}>← Back</button>
            </>
          )}
          {/* Step 3: Payment */}
          {step === 3 && (
            <>
              <h3 className="font-bold text-xl mb-4 text-[#222] text-center">Pay & Complete Your Order</h3>
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={amountCents}
                  orderDetails={orderDetails}
                  onPaymentSuccess={() => { setStep(4); setDone(true); }}
                  onError={setError}
                />
              </Elements>
              {error && <div className="mt-2 text-red-500 text-center">{error}</div>}
              <button className="block mx-auto mt-7 text-[#007BFF] underline text-sm" onClick={() => setStep(2)}>← Back</button>
            </>
          )}
          {/* Step 4: Success */}
          {step === 4 && done && (
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto text-green-500" size={48} />
              <h3 className="text-2xl font-bold text-[#222]">Thank You! 🎉</h3>
              <p className="text-[#444] text-base">
                Your order was received and is being processed.<br />
                You’ll receive updates shortly.
              </p>
              <button className="mt-5 bg-[#007BFF] text-white px-6 py-2 rounded-xl font-bold" onClick={closeAndReset}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeInPop {
          from { opacity: 0; transform: translateY(32px) scale(.95);}
          to   { opacity: 1; transform: translateY(0) scale(1);}
        }
        .animate-fadeInPop { animation: fadeInPop 0.22s cubic-bezier(.39,1.7,.47,.99); }
        @media (max-width: 700px) {
          .max-w-md { max-width: 99vw !important; }
        }
      `}</style>
    </div>
  );
}
