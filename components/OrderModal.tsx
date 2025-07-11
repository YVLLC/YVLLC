import { useState, useEffect } from "react";
import {
  Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, X, Loader2, CheckCircle, Lock, Star
} from "lucide-react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Stripe key — replace with your live/public key in production!
const stripePromise = loadStripe("pk_live_51Rgpc4Dzq312KvGPUkyCKLxH4ZdPWeJlmBAnMrSlAl5BHF8Wu8qFW6hqxKlo3l7F87X3qmvVnmDrZYcP3FSSTPVN00fygC8Pfl");

// Real, natural service details!
const PLATFORMS = [
  {
    key: "instagram",
    name: "Instagram",
    color: "#E1306C",
    icon: <Instagram className="text-[#E1306C]" size={26} />,
    services: [
      {
        type: "Followers",
        price: 0.09,
        icon: <UserPlus size={17} className="text-[#E1306C]" />,
        desc: "Attract genuine Instagram followers. Real, active accounts only. Zero bots, zero risk. 100% refill guarantee if you lose any.",
        features: [
          "100% real, active users",
          "Followers stay — or we refill, free",
          "No account login required",
          "Start seeing results in 2–10 minutes"
        ]
      },
      {
        type: "Likes",
        price: 0.07,
        icon: <ThumbsUp size={17} className="text-[#E1306C]" />,
        desc: "Boost your posts with authentic likes from real profiles. Get on the Explore page and attract organic engagement.",
        features: [
          "No fakes, no bots, real users only",
          "Works for any public post or Reel",
          "Blazing fast delivery",
          "Permanent results"
        ]
      },
      {
        type: "Views",
        price: 0.04,
        icon: <Eye size={17} className="text-[#E1306C]" />,
        desc: "Want your Reels and videos seen by more people? Our real views help you rank higher and increase reach — 100% safe.",
        features: [
          "Guaranteed retention & delivery",
          "Increases reach + organic growth",
          "No password, no risk",
          "Great for Reels, Stories, IGTV"
        ]
      },
      {
        type: "Comments",
        price: 0.20,
        icon: <X size={17} className="text-[#E1306C]" />,
        desc: "Level up your social proof. Choose random or custom comments — all posted from active profiles, never bots.",
        features: [
          "Custom or random text",
          "Only real accounts (no bots)",
          "Increases engagement rate",
          "Perfect for boosting promo posts"
        ]
      }
    ]
  },
  {
    key: "tiktok",
    name: "TikTok",
    color: "#00F2EA",
    icon: <Music2 className="text-[#00F2EA]" size={26} />,
    services: [
      {
        type: "Followers",
        price: 0.10,
        icon: <UserPlus size={17} className="text-[#00F2EA]" />,
        desc: "Grow your TikTok audience with real, permanent followers. Your account stays safe — no logins, no sketchy methods.",
        features: [
          "Real users, not bots",
          "Works for any public profile",
          "No password needed",
          "Includes 30-day refill protection"
        ]
      },
      {
        type: "Likes",
        price: 0.08,
        icon: <ThumbsUp size={17} className="text-[#00F2EA]" />,
        desc: "Get your TikToks trending! Real people liking your videos within minutes. Perfect for launching a new post.",
        features: [
          "High-retention, permanent likes",
          "Delivered instantly",
          "Boosts algorithm ranking",
          "No password, 100% private"
        ]
      },
      {
        type: "Views",
        price: 0.06,
        icon: <Eye size={17} className="text-[#00F2EA]" />,
        desc: "Watch your views skyrocket with our genuine TikTok view campaigns — designed for maximum FYP exposure.",
        features: [
          "Guaranteed real, high-retention views",
          "Safe for any video or Reel",
          "Fastest delivery on the market",
          "24/7 support if you need help"
        ]
      }
    ]
  },
  {
    key: "youtube",
    name: "YouTube",
    color: "#FF0000",
    icon: <Youtube className="text-[#FF0000]" size={26} />,
    services: [
      {
        type: "Subscribers",
        price: 0.12,
        icon: <UserPlus size={17} className="text-[#FF0000]" />,
        desc: "Get real YouTube subscribers, no drop, no risk. Unlock channel features and look more established instantly.",
        features: [
          "Worldwide or targeted delivery",
          "Eligible for monetization",
          "No fake or dead accounts",
          "Refill guarantee included"
        ]
      },
      {
        type: "Likes",
        price: 0.09,
        icon: <ThumbsUp size={17} className="text-[#FF0000]" />,
        desc: "Make your videos stand out with genuine likes. Attract more organic traffic and boost video rankings.",
        features: [
          "Delivered in minutes",
          "Permanent engagement",
          "Only from active profiles",
          "No password required"
        ]
      },
      {
        type: "Views",
        price: 0.05,
        icon: <Eye size={17} className="text-[#FF0000]" />,
        desc: "Increase your video’s views with high-retention, real watch time. Safe for AdSense and YouTube Partner.",
        features: [
          "100% authentic, high retention",
          "Safe for channel and monetization",
          "Fastest delivery in the industry",
          "Counts toward YouTube algorithms"
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

function PaymentForm({ amount, orderDetails, onPaymentSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (e) => {
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
          card: elements.getElement(CardElement),
        }
      });
      if (stripeError) throw new Error(stripeError.message);

      const jap = await fetch("/api/jap_order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...orderDetails, paymentId: paymentIntent.id }),
      });
      const japResult = await jap.json();
      if (!jap.ok && japResult?.error) throw new Error(japResult.error || "JAP order failed.");
      onPaymentSuccess();
    } catch (e) {
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
      <div className="text-xs text-gray-400 text-center mt-1">
        SSL-encrypted checkout. We never store your card info.
      </div>
    </form>
  );
}

export default function OrderModal({
  open,
  onClose,
  initialPlatform,
  initialService
}) {
  const [step, setStep] = useState(0);
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [service, setService] = useState(PLATFORMS[0].services[0]);
  const [quantity, setQuantity] = useState(100);
  const [target, setTarget] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

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
    setStep(stepToSet);
  }, [open, initialPlatform, initialService]);

  if (!open) return null;

  const choosePlatform = (p) => {
    setPlatform(p);
    setService(p.services[0]);
    setQuantity(100);
    setTarget("");
    setError("");
    setStep(1);
  };

  const chooseService = (s) => {
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
    setDone(false);
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
      <div className="relative max-w-md w-full sm:w-[98vw] md:w-[96vw] mx-auto bg-white/95 rounded-3xl shadow-2xl border border-[#e3edfc] overflow-visible max-h-[98vh] flex flex-col"
        style={{ minHeight: '440px', maxHeight: '98vh' }}>
        {/* Modal HEADER */}
        <div className="w-full px-4 pt-7 pb-3 rounded-t-3xl relative bg-gradient-to-r from-[#f7fbff] via-[#ecf4ff] to-[#f8fbff] border-b border-[#e3edfc]">
          <button
            className="absolute top-4 right-5 z-20 bg-white/95 border border-[#e3edfc] shadow-lg rounded-full p-2 hover:bg-[#eaf4ff] transition"
            onClick={closeAndReset}
            aria-label="Close"
            style={{ boxShadow: "0 2px 14px 0 #0086ff18" }}
          >
            <X size={22} className="text-[#007BFF]" />
          </button>
          <div className="flex items-center gap-2 pr-9">
            {platform.icon}
            <span className="font-extrabold text-lg" style={{ color: platform.color }}>
              {platform.name}
            </span>
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
        {/* Modal CONTENT */}
        <div className="px-4 py-6 flex-1 overflow-y-auto min-h-[340px]">
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
          {step === 1 && (
            <>
              <h3 className="font-bold text-xl mb-3 text-[#222] text-center">
                {platform.icon} {platform.name} Services
              </h3>
              {/* Scrollable service picker for mobile! */}
              <div className="w-full overflow-x-auto hide-scrollbar mb-2">
                <div className="flex gap-3 min-w-[340px] pb-2">
                  {platform.services.map((s) => (
                    <button
                      key={s.type}
                      className={`rounded-xl flex items-center justify-between px-5 py-4 border-2 text-base font-semibold shadow hover:shadow-lg transition min-w-[220px]
                        ${service.type === s.type ? "border-[#007BFF] bg-[#E8F1FF] text-[#007BFF]" : "border-[#D2E6FF] text-[#222] bg-white"}`}
                      onClick={() => chooseService(s)}
                      style={{ flex: '0 0 220px' }}
                    >
                      <div className="flex items-center gap-2">
                        {s.icon}
                        <span>{s.type}</span>
                      </div>
                      <span className="font-normal text-[13px] text-[#888]">${s.price}/ea</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Service details, always visible */}
              <div className="mt-4 rounded-xl bg-[#F5FAFF] border border-[#CFE4FF] p-5 shadow flex flex-col gap-2 animate-fadeInPop">
                <div className="flex items-center gap-2 mb-2">
                  {service.icon}
                  <span className="font-bold text-[#007BFF]">{service.type}</span>
                  <Star size={15} className="text-yellow-400 animate-pulse" />
                </div>
                <div className="text-[#444] text-sm mb-1">{service.desc}</div>
                <ul className="space-y-1">
                  {service.features && service.features.map((f, i) => (
                    <li key={i} className="text-xs text-[#007BFF] flex items-center gap-2">
                      <CheckCircle size={12} className="inline text-[#22C55E]" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="block mx-auto mt-7 text-[#007BFF] underline text-sm" onClick={() => setStep(0)}>← Back</button>
            </>
          )}
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
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 700px) {
          .max-w-md { max-width: 99vw !important; }
        }
      `}</style>
    </div>
  );
}
