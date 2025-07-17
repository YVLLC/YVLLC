import { useState, useEffect } from "react";
import {
  Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, X, CheckCircle, Tag
} from "lucide-react";

// --- TYPE DEFINITIONS ---
type ServiceType = "Followers" | "Likes" | "Views" | "Subscribers";
type Service = {
  type: ServiceType | string;
  price: number;
  icon: JSX.Element;
};
type Platform = {
  key: string;
  name: string;
  color: string;
  icon: JSX.Element;
  services: Service[];
};
type StealthPackageResult = { pkg: string; type: string; };

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
const PLATFORMS: Platform[] = [
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
  { label: "Review" }
];

// --- DISCOUNT LOGIC ---
function getDiscountedPrice(price: number): { discount: number; discounted: number } {
  const discount = 0.02 + Math.random() * 0.02;
  const discounted = Math.max(0.01, Number((price * (1 - discount)).toFixed(3)));
  return { discount: Math.round(discount * 100), discounted };
}

// --- SAFETY: Stripe-safe checkout info only! ---
function getStealthPackage(platform: Platform, service: Service): StealthPackageResult {
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

// --- PROPS TYPES ---
type OrderModalProps = {
  open: boolean;
  onClose: () => void;
  initialPlatform?: string;
  initialService?: string;
};

export default function OrderModal({
  open,
  onClose,
  initialPlatform,
  initialService
}: OrderModalProps) {
  const [step, setStep] = useState(0);
  const [platform, setPlatform] = useState<Platform>(PLATFORMS[0]);
  const [service, setService] = useState<Service>(PLATFORMS[0].services[0]);
  const [quantity, setQuantity] = useState<number>(100);
  const [target, setTarget] = useState<string>("");
  const [error, setError] = useState<string>("");

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
    setStep(stepToSet);
  }, [open, initialPlatform, initialService]);

  if (!open) return null;

  function getQuickAmounts(platform: Platform, service: Service) {
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

  const { pkg, type } = getStealthPackage(platform, service);
  const { discount, discounted } = getDiscountedPrice(service.price);
  const orderToSend = {
    package: pkg,
    type: type,
    amount: quantity,
    reference: target,
    total: Number((discounted * quantity).toFixed(2))
  };

  function handleNext() {
    if (step === 2) {
      if (!target.trim()) {
        setError("Paste your profile link or username.");
        return;
      }
      if (!quantity || quantity < 1) {
        setError("Enter a valid quantity.");
        return;
      }
    }
    setError("");
    setStep(step + 1);
  }

  function handleBack() {
    setError("");
    setStep(step - 1);
  }

  function handleSecureCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!target.trim()) {
      setError("Paste your profile link or username.");
      return;
    }
    setError("");
    const orderString = btoa(unescape(encodeURIComponent(JSON.stringify(orderToSend))));
    window.location.href = "https://checkout.yesviral.com/checkout?order=" + orderString;
  }

  // --- UI ---
  return (
    <div className="fixed z-[9999] inset-0 flex items-center justify-center bg-black/85 backdrop-blur-[2.5px]">
      <div
        className="relative w-full max-w-lg mx-auto bg-white rounded-3xl border-2 shadow-[0_6px_48px_0_rgba(0,123,255,0.13)] flex flex-col"
        style={{ minHeight: 0, maxHeight: "94vh" }}
      >
        {/* Header */}
        <div
          className="w-full px-6 pt-6 pb-4 rounded-t-3xl border-b flex flex-col gap-2"
          style={{
            background: `linear-gradient(90deg, ${COLORS.accentBg} 0%, ${COLORS.background} 80%)`,
            borderColor: COLORS.border,
            boxShadow: "0 2px 16px 0 #e6f0ff1e"
          }}
        >
          <button
            className="absolute top-5 right-7 z-20 bg-white border border-[#e3edfc] shadow-lg rounded-full p-2 hover:bg-[#f8faff] transition"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={22} className="text-[#007BFF]" />
          </button>
          <div className="flex items-center gap-2 pr-14">
            {platform.icon}
            <span className="font-extrabold text-lg tracking-tight" style={{ color: platform.color }}>
              {platform.name}
            </span>
          </div>
          {/* Step Circles & Labels */}
          <div className="relative w-full flex items-center justify-between mt-4 px-2 z-10">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center flex-1 min-w-0">
                <div
                  className={`
                    flex items-center justify-center rounded-full border-4 font-bold text-base
                    ${step === i ? "bg-[#007BFF] text-white border-[#007BFF] shadow" : step > i ? "bg-[#E6F0FF] text-[#007BFF] border-[#007BFF]" : "bg-[#E6F0FF] text-[#888] border-[#E6F0FF]"}
                    transition-all duration-300
                  `}
                  style={{
                    width: 36,
                    height: 36,
                    zIndex: 2,
                    boxShadow: step === i ? "0 2px 10px #007BFF20" : undefined,
                  }}
                >
                  {i + 1}
                </div>
                <span
                  className={`mt-2 text-xs font-semibold whitespace-nowrap text-center ${step === i ? "text-[#007BFF]" : "text-[#888]"}`}
                  style={{ width: "max-content" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          {/* Progress Bar Under Steps */}
          <div className="relative w-full h-3 mt-2 mb-[-8px] px-3 flex items-center">
            <div
              className="absolute left-0 top-1/2 w-full h-2 rounded-full"
              style={{
                background: COLORS.accentBg,
                transform: "translateY(-50%)",
                borderRadius: 9999,
              }}
            />
            <div
              className="absolute left-0 top-1/2 h-2 transition-all duration-500"
              style={{
                width: `${(step) / (steps.length - 1) * 100}%`,
                background: COLORS.primary,
                boxShadow: "0 0 10px #007bff55",
                transform: "translateY(-50%)",
                borderRadius: 9999,
                zIndex: 1,
                transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>
        </div>
        {/* Content - now with rounded-b-3xl */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-7 rounded-b-3xl" style={{ background: COLORS.background }}>
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
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-[#E6F0FF] text-[#007BFF] text-xs font-bold flex items-center gap-1">
                            <Tag size={14} className="mr-0.5 text-[#007BFF]" />-{discount}%
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
                onClick={handleBack}
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
              <div className="space-y-8">
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
                      Total: <span className="text-[#007BFF]">${(discounted * quantity).toFixed(2)}</span>
                      <span className="ml-2 text-sm text-[#c7c7c7] line-through">${(service.price * quantity).toFixed(2)}</span>
                    </span>
                    <span className="text-xs text-[#007BFF] font-semibold mt-1">
                      Flash Sale! {discount}% off for a limited time
                    </span>
                  </div>
                </div>
                {error && <div className="mt-2 text-[#EF4444] text-center">{error}</div>}
              </div>
              <div className="flex justify-between mt-8">
                <button
                  className="px-6 py-3 rounded-xl font-bold bg-[#E6F0FF] text-[#007BFF] border border-[#CFE4FF] hover:bg-[#d7eafd] shadow transition text-lg"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  className="px-6 py-3 rounded-xl font-bold bg-[#007BFF] text-white hover:bg-[#005FCC] shadow transition text-lg"
                  onClick={handleNext}
                >
                  Review
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <form onSubmit={handleSecureCheckout}>
              <h3 className="font-black text-2xl mb-5 text-[#111] text-center">Review & Secure Checkout</h3>
              <div className="bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl px-6 py-7 mb-7">
                <div className="flex items-center gap-2 mb-2">
                  {platform.icon}
                  <span className="font-semibold text-lg">{platform.name}</span>
                  <span className="ml-3 px-3 py-1 rounded-full bg-[#E6F0FF] text-[#007BFF] font-semibold text-xs">{service.type}</span>
                </div>
                <div className="text-[#444] mb-1"><b>Target:</b> {target}</div>
                <div className="text-[#444] mb-1"><b>Amount:</b> {quantity}</div>
                <div className="text-[#444] mb-1"><b>Unit:</b> ${discounted}/ea <span className="text-[#c7c7c7] line-through">${service.price}/ea</span></div>
                <div className="mt-2 font-extrabold text-lg text-[#007BFF]">
                  Total: ${(discounted * quantity).toFixed(2)}
                </div>
              </div>
              <div className="flex justify-between mt-7">
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl font-bold bg-[#E6F0FF] text-[#007BFF] border border-[#CFE4FF] hover:bg-[#d7eafd] shadow transition text-lg"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold bg-gradient-to-br from-[#007BFF] to-[#005FCC] hover:from-[#005FCC] hover:to-[#007BFF] text-white shadow-lg transition text-lg flex items-center gap-2"
                >
                  <CheckCircle size={20} />
                  Secure Checkout
                </button>
              </div>
            </form>
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
        ::-webkit-scrollbar { width: 0.7em; background: #f7f9ff;}
        ::-webkit-scrollbar-thumb {
          background: #e6f0ff;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}