import { useState, useEffect } from "react";
import {
  Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, X, CheckCircle, Tag
} from "lucide-react";

// --- TYPE DEFINITIONS ---
type ServiceType =
  | "Followers"
  | "Likes"
  | "Views"
  | "Comments"
  | "Subscribers";

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

type StealthPackageResult = {
  pkg: string;
  type: string;
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
      { type: "Views", price: 0.04, icon: <Eye size={17} className="text-[#E1306C]" /> },
      { type: "Comments", price: 0.20, icon: <X size={17} className="text-[#E1306C]" /> }
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

// --- DISCOUNT LOGIC ---
function getDiscountedPrice(price: number): {discount: number, discounted: number} {
  // Small "flash sale" discount between 2-4%
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
    if (service.type === "Comments") type = "Comments";
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
  const [done, setDone] = useState<boolean>(false);

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

  const choosePlatform = (p: Platform) => {
    setPlatform(p);
    setService(p.services[0]);
    setQuantity(100);
    setTarget("");
    setError("");
    setStep(1);
  };

  const chooseService = (s: Service) => {
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

  // -- Stripe-safe order info --
  const { pkg, type } = getStealthPackage(platform, service);
  const { discount, discounted } = getDiscountedPrice(service.price);
  const orderToSend = {
    package: pkg,
    type: type,
    amount: quantity,
    reference: target,
    total: Number((discounted * quantity).toFixed(2))
  };

  // Amount Quick Options
  const quickAmounts = [100, 500, 1000, 2000, 5000, 10000, 25000, 50000];

  return (
    <div className="fixed z-[9999] inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
      <div className="relative max-w-md w-[96vw] mx-auto bg-white/95 rounded-3xl shadow-2xl border border-[#e3edfc] overflow-hidden animate-fadeInPop">
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
                <div
                  className={`
                    rounded-full w-7 h-7 flex items-center justify-center font-bold
                    ${
                      step === i || (done && i === 4)
                        ? "bg-[#007BFF] text-white shadow"
                        : step > i
                        ? "bg-[#95e1fc] text-[#0d88c7]"
                        : "bg-[#e6f4ff] text-[#A0B3C7]"
                    }
                    border-2 border-white
                    transition
                  `}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-xs font-semibold whitespace-nowrap ${
                    step === i || (done && i === 4) ? "text-[#007BFF]" : "text-[#A0B3C7]"
                  }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div className="w-6 h-1 bg-[#e3edfc] rounded-full flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Modal CONTENT */}
        <div className="px-5 py-7 max-h-[75vh] overflow-y-auto">
          {step === 0 && (
            <>
              <h3 className="font-bold text-xl mb-3 text-[#222] text-center">Pick a Platform</h3>
              <div className="flex justify-center gap-3 flex-wrap">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.key}
                    className={`
                      rounded-xl flex flex-col items-center gap-1 px-5 py-4 border-2 font-bold text-sm shadow hover:shadow-lg transition
                      ${
                        platform.key === p.key
                          ? "border-[#007BFF] bg-[#F5FAFF] text-[#007BFF] scale-105"
                          : "border-[#D2E6FF] text-[#333] bg-white"
                      }
                    `}
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
              <div className="flex flex-col gap-3">
                {platform.services.map((s) => {
                  const { discount, discounted } = getDiscountedPrice(s.price);
                  return (
                    <button
                      key={s.type}
                      className={`
                        rounded-xl flex items-center justify-between px-5 py-4 border-2 text-base font-semibold shadow hover:shadow-lg transition group
                        ${
                          service.type === s.type
                            ? "border-[#007BFF] bg-[#E8F1FF] text-[#007BFF] scale-[1.04]"
                            : "border-[#D2E6FF] text-[#222] bg-white"
                        }
                      `}
                      onClick={() => chooseService(s)}
                    >
                      <div className="flex items-center gap-2">
                        {s.icon}
                        <span className="">{s.type}</span>
                        {discount > 0 && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-[#e7f7f0] text-[#08a881] text-xs font-bold flex items-center gap-1 animate-flashSale">
                            <Tag size={14} className="mr-0.5" />-{discount}%
                          </span>
                        )}
                      </div>
                      <span className="font-normal text-[13px] text-[#888] flex items-center gap-2">
                        <span className="line-through text-[#c7c7c7]">${s.price.toFixed(2)}</span>
                        <span className="font-bold text-[#007BFF]">${discounted.toFixed(2)}/each</span>
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
            </>
          )}
          {step === 2 && (
            <>
              <h3 className="font-bold text-xl mb-4 text-[#222] text-center">
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
                    className="w-full border border-[#CFE4FF] rounded-xl px-4 py-3 text-base font-medium outline-[#007BFF] bg-white/90 shadow focus:border-[#007BFF] focus:ring-2 focus:ring-[#E8F1FF] transition"
                    placeholder={`Paste your link or username here`}
                    value={target}
                    onChange={e => setTarget(e.target.value)}
                  />
                </div>
                <div className="mt-6 flex flex-col items-center justify-center gap-4">
                  <div className="flex flex-col items-center gap-1 w-full">
                    <span className="text-[#222] text-base font-semibold">Amount</span>
                    <div className="flex gap-2 flex-wrap justify-center w-full">
                      {quickAmounts.map(val => (
                        <button
                          key={val}
                          type="button"
                          className={`
                            rounded-full px-5 py-2 font-bold border text-sm shadow
                            ${quantity === val ? "bg-[#007BFF] text-white border-[#007BFF]" : "bg-[#f1f7ff] text-[#007BFF] border-[#b0d8ff]"}
                            hover:bg-[#e6f4ff] hover:border-[#007BFF] transition
                          `}
                          onClick={() => setQuantity(val)}
                        >
                          {val >= 1000 ? `${val/1000}K` : val}
                        </button>
                      ))}
                    </div>
                    <span className="font-bold text-[#007BFF] text-xl mt-2">
                      Total: <span className="text-[#11aa80]">${(discounted * quantity).toFixed(2)}</span>
                      <span className="ml-2 text-sm text-[#c7c7c7] line-through">${(service.price * quantity).toFixed(2)}</span>
                    </span>
                    <span className="text-xs text-[#08a881] font-semibold mt-1">
                      Flash Sale! {discount}% off for a limited time
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl font-extrabold text-lg flex justify-center items-center gap-2 bg-gradient-to-br from-[#007BFF] to-[#35c4ff] hover:from-[#005FCC] hover:to-[#28a3e6] text-white shadow-xl transition mt-8"
                >
                  <CheckCircle size={20} /> Continue to Secure Checkout
                </button>
                {error && <div className="mt-2 text-red-500 text-center">{error}</div>}
              </form>
              <button
                className="block mx-auto mt-8 text-[#007BFF] underline text-sm"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
            </>
          )}
          {step === 3 && (
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto text-green-500" size={48} />
              <h3 className="text-2xl font-bold text-[#222]">Order Sent!</h3>
              <p className="text-[#444] text-base">
                Redirecting to secure checkout...
              </p>
            </div>
          )}
          {step === 4 && done && (
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto text-green-500" size={48} />
              <h3 className="text-2xl font-bold text-[#222]">Thank You! 🎉</h3>
              <p className="text-[#444] text-base">
                Your order was received and is being processed.
                <br />
                You’ll receive updates shortly.
              </p>
              <button
                className="mt-5 bg-[#007BFF] text-white px-6 py-2 rounded-xl font-bold"
                onClick={closeAndReset}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeInPop {
          from {
            opacity: 0;
            transform: translateY(32px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeInPop {
          animation: fadeInPop 0.22s cubic-bezier(0.39, 1.7, 0.47, 0.99);
        }
        @keyframes flashSale {
          0%,100% { background: #e7f7f0; color: #08a881;}
          50% { background: #bbfbe3; color: #06a06c;}
        }
        .animate-flashSale {
          animation: flashSale 2.5s infinite;
        }
      `}</style>
    </div>
  );
}