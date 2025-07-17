import { useState, useEffect, useRef } from "react";
import {
  Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, X, CheckCircle, Tag
} from "lucide-react";

// --- COLORWAY ---
const COLORS = {
  primary: "#007BFF",
  primaryHover: "#005FCC",
  background: "#FFFFFF",
  text: "#111111",
  textSecondary: "#444444",
  muted: "#888888",
  accentBg: "#E6F0FF",
  border: "#CFE4FF",
  success: "#22C55E",
  error: "#EF4444",
  warning: "#FACC15",
  focus: "#0056B3",
};

// --- DATA ---
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

const steps = [
  { label: "Platform" },
  { label: "Service" },
  { label: "Details" },
  { label: "Checkout" },
  { label: "Done" }
];

// --- LOGIC ---
function getDiscountedPrice(price: number) {
  const discount = 0.02 + Math.random() * 0.02;
  const discounted = Math.max(0.01, Number((price * (1 - discount)).toFixed(3)));
  return { discount: Math.round(discount * 100), discounted };
}

function getStealthPackage(platform, service) {
  let pkg = "Premium Package";
  let type = "Standard";
  if (platform && service) {
    if (platform.key === "instagram" && service.type === "Followers") pkg = "Insta Package";
    if (platform.key === "instagram" && service.type === "Likes") pkg = "Insta Plus";
    if (platform.key === "tiktok") pkg = "Ultimate Package";
    if (platform.key === "youtube") pkg = "Pro Package";
    if (service.type === "Followers" || service.type === "Subscribers") type = "Growth";
    if (service.type === "Likes") type = "Engagement";
    if (service.type === "Views") type = "Boost";
  }
  return { pkg, type };
}

function getQuickAmounts(platform, service) {
  if (platform.key === "instagram" && service.type.toLowerCase() === "views")
    return [500, 2000, 5000, 10000, 20000, 50000];
  if (platform.key === "instagram" && service.type.toLowerCase() === "followers")
    return [100, 200, 350, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
  if (platform.key === "instagram" && service.type.toLowerCase() === "likes")
    return [50, 100, 300, 500, 1000, 2000, 5000, 10000, 20000];
  if (platform.key === "tiktok" && (service.type.toLowerCase() === "followers" || service.type.toLowerCase() === "likes"))
    return [100, 250, 500, 1000, 2000, 5000, 10000];
  if (platform.key === "tiktok" && service.type.toLowerCase() === "views")
    return [1000, 2000, 5000, 10000, 20000, 50000];
  if (platform.key === "youtube" && service.type.toLowerCase() === "views")
    return [200, 500, 1000, 2000, 5000, 10000];
  if (platform.key === "youtube" && service.type.toLowerCase() === "subscribers")
    return [200, 500, 1000, 2000, 5000, 10000];
  if (platform.key === "youtube" && service.type.toLowerCase() === "likes")
    return [250, 500, 1000, 2000, 5000, 10000];
  return [100, 500, 1000, 2000, 5000, 10000, 25000, 50000];
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

  // For animated stepper line
  const stepperRef = useRef<HTMLDivElement>(null);

  // Responsive lock scroll on modal open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

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

  // Stripe-safe order info
  const { pkg, type } = getStealthPackage(platform, service);
  const { discount, discounted } = getDiscountedPrice(service.price);
  const orderToSend = {
    package: pkg,
    type: type,
    amount: quantity,
    reference: target,
    total: Number((discounted * quantity).toFixed(2))
  };

  // Stepper animation logic
  const stepCount = steps.length;
  const percent = step === stepCount - 1 ? 100 : Math.max(0, (step / (stepCount - 1)) * 100);

  return (
    <div className="fixed z-[9999] inset-0 flex items-center justify-center bg-black/80 backdrop-blur-[2.5px]">
      <div
        className="relative w-full max-w-lg mx-auto bg-white rounded-2xl sm:rounded-[2.2rem] border-2 shadow-[0_6px_48px_0_rgba(0,123,255,0.13)] flex flex-col"
        style={{
          minHeight: 0,
          maxHeight: "96vh",
          borderColor: COLORS.border,
          boxShadow: "0 8px 48px 0 #007bff18"
        }}
      >
        {/* HEADER */}
        <div
          className="relative px-6 pt-7 pb-5 rounded-t-2xl sm:rounded-t-[2.2rem] border-b"
          style={{
            background: `linear-gradient(90deg, ${COLORS.accentBg} 0%, ${COLORS.background} 80%)`,
            borderColor: COLORS.border
          }}
        >
          <button
            className="absolute top-5 right-7 z-20 bg-white border border-[#e3edfc] shadow-lg rounded-full p-2 hover:bg-[#f8faff] transition"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={22} className="text-[#007BFF]" />
          </button>
          <div className="flex items-center gap-2">
            {platform.icon}
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight" style={{ color: platform.color }}>
              {platform.name}
            </span>
          </div>
          {/* Stepper */}
          <div className="relative mt-6 mb-[-10px] px-1" ref={stepperRef}>
            <div className="absolute left-0 right-0 top-1/2 h-[5px] rounded-full bg-[#E6F0FF] z-0" style={{transform: "translateY(-50%)"}} />
            <div
              className="absolute left-0 top-1/2 h-[5px] rounded-full z-10 stepper-anim-line"
              style={{
                width: `${percent}%`,
                background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.primaryHover} 100%)`,
                transition: "width .3s cubic-bezier(.51,1.15,.67,.97)",
                transform: "translateY(-50%)"
              }}
            />
            <div className="relative flex items-center justify-between z-20">
              {steps.map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center flex-1 min-w-0"
                  style={{zIndex: 4}}
                >
                  <div
                    className={`
                      flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 font-extrabold text-base sm:text-lg border-2 transition
                      ${step === i
                        ? "bg-[#007BFF] text-white border-[#007BFF] shadow-lg scale-110"
                        : step > i
                        ? "bg-[#22C55E] text-white border-[#22C55E]"
                        : "bg-[#E6F0FF] text-[#888] border-[#E6F0FF]"}
                    `}
                    style={{
                      marginBottom: 3,
                      boxShadow: step === i ? "0 2px 10px #007bff22" : undefined
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-xs font-bold text-center whitespace-nowrap mt-1 transition`}
                    style={{
                      color:
                        step === i
                          ? COLORS.primary
                          : step > i
                          ? COLORS.success
                          : COLORS.muted,
                      textShadow: step === i ? "0 1px 0 #fff" : "none"
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-7" style={{ background: COLORS.background }}>
          {step === 0 && (
            <div>
              <h3 className="font-black text-2xl mb-7 text-[#111111] text-center tracking-tight">Choose Platform</h3>
              <div className="flex justify-center gap-5 sm:gap-8 flex-wrap">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.key}
                    className={`
                      rounded-xl flex flex-col items-center gap-1 px-6 py-5 border-2 font-bold text-sm shadow hover:shadow-lg transition
                      ${
                        platform.key === p.key
                          ? "border-[#007BFF] bg-[#E6F0FF] text-[#007BFF] scale-105"
                          : "border-[#CFE4FF] text-[#111111] bg-white"
                      }
                    `}
                    style={{
                      minWidth: 110,
                      minHeight: 90
                    }}
                    onClick={() => {
                      setPlatform(p);
                      setService(p.services[0]);
                      setStep(1);
                    }}
                  >
                    {p.icon}
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <h3 className="font-black text-2xl mb-7 text-[#111111] text-center">
                {platform.icon} {platform.name} Services
              </h3>
              <div className="flex flex-col gap-4">
                {platform.services.map((s) => {
                  const { discount, discounted } = getDiscountedPrice(s.price);
                  return (
                    <button
                      key={s.type}
                      className={`
                        rounded-xl flex items-center justify-between px-6 py-4 border-2 text-lg font-bold shadow hover:shadow-xl transition group
                        ${
                          service.type === s.type
                            ? "border-[#007BFF] bg-[#E6F0FF] text-[#007BFF] scale-105"
                            : "border-[#CFE4FF] text-[#111111] bg-white"
                        }
                      `}
                      onClick={() => {
                        setService(s);
                        setStep(2);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {s.icon}
                        <span className="">{s.type}</span>
                        {discount > 0 && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-[#e7f7f0] text-[#22C55E] text-xs font-bold flex items-center gap-1 animate-flashSale">
                            <Tag size={14} className="mr-0.5" />-{discount}%
                          </span>
                        )}
                      </div>
                      <span className="font-normal text-[15px] text-[#888] flex items-center gap-2">
                        <span className="line-through text-[#c7c7c7]">${s.price.toFixed(2)}</span>
                        <span className="font-bold text-[#007BFF]">${discounted.toFixed(2)}/ea</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                className="block mx-auto mt-7 text-[#007BFF] underline text-sm"
                onClick={() => setStep(0)}
              >
                ← Back
              </button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="font-black text-2xl mb-7 text-[#111111] text-center">
                Order Details
              </h3>
              <form
                className="space-y-8"
                onSubmit={e => {
                  e.preventDefault();
                  if (!target) {
                    setError("Paste your profile link or username.");
                    return;
                  }
                  setError("");
                  const orderString = btoa(unescape(encodeURIComponent(JSON.stringify(orderToSend))));
                  window.location.href = "https://checkout.yesviral.com/checkout?order=" + orderString;
                }}
              >
                <div className="flex flex-col items-center">
                  <label className="block font-semibold text-[#007BFF] mb-2 text-lg">Profile or Link</label>
                  <input
                    type="text"
                    autoFocus
                    className="w-full border border-[#CFE4FF] rounded-xl px-4 py-3 text-base font-medium outline-[#007BFF] bg-white/90 shadow focus:border-[#007BFF] focus:ring-2 focus:ring-[#E6F0FF] transition"
                    placeholder={`Paste your link or username here`}
                    value={target}
                    onChange={e => setTarget(e.target.value)}
                  />
                </div>
                <div className="mt-5 flex flex-col items-center justify-center gap-3">
                  <div className="flex flex-col items-center gap-1 w-full">
                    <span className="text-[#111] text-base font-semibold">Amount</span>
                    <div className="flex gap-2 flex-wrap justify-center w-full">
                      {getQuickAmounts(platform, service).map(val => (
                        <button
                          key={val}
                          type="button"
                          className={`
                            rounded-full px-5 py-2 font-bold border text-sm shadow
                            ${quantity === val ? "bg-[#007BFF] text-white border-[#007BFF]" : "bg-[#E6F0FF] text-[#007BFF] border-[#CFE4FF]"}
                            hover:bg-[#E6F0FF] hover:border-[#007BFF] transition
                          `}
                          onClick={() => setQuantity(val)}
                        >
                          {val >= 1000 ? `${val/1000}K` : val}
                        </button>
                      ))}
                    </div>
                    <span className="font-bold text-[#007BFF] text-xl mt-2">
                      Total: <span className="text-[#22C55E]">${(discounted * quantity).toFixed(2)}</span>
                      <span className="ml-2 text-sm text-[#c7c7c7] line-through">${(service.price * quantity).toFixed(2)}</span>
                    </span>
                    <span className="text-xs text-[#22C55E] font-semibold mt-1 animate-flashSale">
                      Flash Sale! {discount}% off for a limited time
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl font-extrabold text-lg flex justify-center items-center gap-2 bg-gradient-to-br from-[#007BFF] to-[#005FCC] hover:from-[#005FCC] hover:to-[#007BFF] text-white shadow-xl transition mt-8"
                  style={{
                    boxShadow: "0 3px 18px #007BFF15,0 2px 8px #005FCC10"
                  }}
                >
                  <CheckCircle size={20} /> Continue to Secure Checkout
                </button>
                {error && <div className="mt-2 text-[#EF4444] text-center">{error}</div>}
              </form>
              <button
                className="block mx-auto mt-8 text-[#007BFF] underline text-sm"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto" size={48} style={{ color: COLORS.success }} />
              <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Order Sent!</h3>
              <p className="text-[#444] text-base">
                Redirecting to secure checkout...
              </p>
            </div>
          )}
          {step === 4 && done && (
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto" size={48} style={{ color: COLORS.success }} />
              <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Thank You! 🎉</h3>
              <p className="text-[#444] text-base">
                Your order was received and is being processed.
                <br />
                You’ll receive updates shortly.
              </p>
              <button
                className="mt-5 bg-[#007BFF] text-white px-6 py-2 rounded-xl font-bold"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes flashSale {
          0%,100% { background: #e7f7f0; color: #22C55E;}
          50% { background: #dbffe6; color: #16a34a;}
        }
        .animate-flashSale {
          animation: flashSale 2.5s infinite;
        }
        @media (max-width: 650px) {
          .max-w-lg { max-width: 98vw !important; }
          .rounded-2xl, .sm\\:rounded-\\[2.2rem\\] { border-radius: 1.25rem !important; }
        }
      `}</style>
    </div>
  );
}