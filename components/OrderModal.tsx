import { useState, useEffect } from "react";
import {
  Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, X, CheckCircle, Tag
} from "lucide-react";

// --- TYPE DEFINITIONS ---
type ServiceType =
  | "Followers"
  | "Likes"
  | "Views"
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
    icon: <Instagram className="text-[#E1306C]" size={28} />,
    services: [
      { type: "Followers", price: 0.09, icon: <UserPlus size={18} className="text-[#E1306C]" /> },
      { type: "Likes", price: 0.07, icon: <ThumbsUp size={18} className="text-[#E1306C]" /> },
      { type: "Views", price: 0.04, icon: <Eye size={18} className="text-[#E1306C]" /> }
      // Comments removed
    ]
  },
  {
    key: "tiktok",
    name: "TikTok",
    color: "#00F2EA",
    icon: <Music2 className="text-[#00F2EA]" size={28} />,
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
    icon: <Youtube className="text-[#FF0000]" size={28} />,
    services: [
      { type: "Subscribers", price: 0.12, icon: <UserPlus size={18} className="text-[#FF0000]" /> },
      { type: "Likes", price: 0.09, icon: <ThumbsUp size={18} className="text-[#FF0000]" /> },
      { type: "Views", price: 0.05, icon: <Eye size={18} className="text-[#FF0000]" /> }
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

  const colorPrimary = "#0051ff";
  const colorAccent = "#E1306C";
  const colorBg = "#f7f9ff";
  const colorBg2 = "#f0f6ff";

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

  // Custom quick amounts for each service/platform
  function getQuickAmounts(platform: Platform, service: Service) {
    // Instagram Views
    if (
      platform.key === "instagram" &&
      service.type.toLowerCase() === "views"
    ) {
      return [500, 2000, 5000, 10000, 20000, 50000];
    }
    // Instagram Followers
    if (
      platform.key === "instagram" &&
      service.type.toLowerCase() === "followers"
    ) {
      return [100, 200, 350, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
    }
    // Instagram Likes
    if (
      platform.key === "instagram" &&
      service.type.toLowerCase() === "likes"
    ) {
      return [50, 100, 300, 500, 1000, 2000, 5000, 10000, 20000];
    }
    // TikTok Followers or Likes
    if (
      platform.key === "tiktok" &&
      (service.type.toLowerCase() === "followers" ||
        service.type.toLowerCase() === "likes")
    ) {
      return [100, 250, 500, 1000, 2000, 5000, 10000];
    }
    // TikTok Views
    if (
      platform.key === "tiktok" &&
      service.type.toLowerCase() === "views"
    ) {
      return [1000, 2000, 5000, 10000, 20000, 50000];
    }
    // YouTube Views
    if (
      platform.key === "youtube" &&
      service.type.toLowerCase() === "views"
    ) {
      return [200, 500, 1000, 2000, 5000, 10000];
    }
    // YouTube Subscribers
    if (
      platform.key === "youtube" &&
      service.type.toLowerCase() === "subscribers"
    ) {
      return [200, 500, 1000, 2000, 5000, 10000];
    }
    // YouTube Likes
    if (
      platform.key === "youtube" &&
      service.type.toLowerCase() === "likes"
    ) {
      return [250, 500, 1000, 2000, 5000, 10000];
    }
    // Default options for all others
    return [100, 500, 1000, 2000, 5000, 10000, 25000, 50000];
  }

  return (
    <div className="fixed z-[9999] inset-0 flex items-center justify-center bg-black/80 backdrop-blur-[3px]">
      <div
        className="relative max-w-lg w-[98vw] mx-auto rounded-[2.7rem] border-2 border-[#e3edfc] overflow-hidden shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${colorBg} 65%, ${colorAccent}05 100%)`,
          boxShadow: "0 6px 36px 0 #0048b925"
        }}
      >
        {/* Modal HEADER */}
        <div
          className="w-full px-6 pt-9 pb-4 rounded-t-[2.7rem] relative"
          style={{
            background: `linear-gradient(90deg, ${colorPrimary}0c 0%, ${colorAccent}09 100%)`,
            borderBottom: `2px solid #e3edfc`
          }}
        >
          <button
            className="absolute top-5 right-6 z-20 bg-white/95 border border-[#e3edfc] shadow-lg rounded-full p-[10px] hover:bg-[#f8faff] transition"
            onClick={closeAndReset}
            aria-label="Close"
            style={{ boxShadow: "0 2px 14px 0 #0086ff18" }}
          >
            <X size={22} className="text-[#007BFF]" />
          </button>
          <div className="flex items-center gap-2 pr-11">
            {platform.icon}
            <span className="font-black text-2xl tracking-tight" style={{ color: platform.color }}>
              {platform.name}
            </span>
          </div>
          {/* Steps */}
          <div className="flex items-center justify-center gap-x-2 gap-y-2 mt-6 mb-[-4px] min-h-[42px]">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={`
                    rounded-full w-8 h-8 flex items-center justify-center font-black text-base
                    ${
                      step === i || (done && i === 4)
                        ? "bg-[#0051ff] text-white shadow"
                        : step > i
                        ? "bg-[#E1306C]/70 text-[#fff] border-[#E1306C] border"
                        : "bg-[#dde8ff] text-[#A0B3C7]"
                    }
                    border-2 border-white
                    transition
                  `}
                  style={{
                    boxShadow: step === i ? "0 2px 14px #0051ff33" : undefined
                  }}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-xs font-extrabold tracking-wide whitespace-nowrap ${
                    step === i || (done && i === 4) ? "text-[#0051ff]" : "text-[#A0B3C7]"
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
        <div className="px-8 py-9 max-h-[78vh] overflow-y-auto" style={{ background: colorBg2 }}>
          {step === 0 && (
            <>
              <h3 className="font-black text-2xl mb-5 text-[#222] text-center tracking-tight drop-shadow-sm">Choose a Platform</h3>
              <div className="flex justify-center gap-7 flex-wrap">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.key}
                    className={`
                      rounded-2xl flex flex-col items-center gap-2 px-8 py-6 border-2 font-black text-lg shadow hover:shadow-2xl transition
                      ${
                        platform.key === p.key
                          ? "border-[#0051ff] bg-[#e8efff] text-[#0051ff] scale-105"
                          : "border-[#D2E6FF] text-[#222] bg-white/95"
                      }
                    `}
                    style={{
                      minWidth: 128,
                      boxShadow: platform.key === p.key ? "0 3px 18px #0051ff15" : "0 2px 10px #cde0ff0a"
                    }}
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
              <h3 className="font-black text-2xl mb-5 text-[#222] text-center tracking-tight">
                <span className="inline-flex items-center gap-2">{platform.icon} {platform.name} Services</span>
              </h3>
              <div className="flex flex-col gap-5">
                {platform.services.map((s) => {
                  const { discount, discounted } = getDiscountedPrice(s.price);
                  return (
                    <button
                      key={s.type}
                      className={`
                        rounded-2xl flex items-center justify-between px-6 py-5 border-2 text-xl font-extrabold shadow hover:shadow-xl transition group
                        ${
                          service.type === s.type
                            ? "border-[#0051ff] bg-[#e8efff] text-[#0051ff] scale-[1.045]"
                            : "border-[#D2E6FF] text-[#222] bg-white/95"
                        }
                      `}
                      style={{
                        boxShadow: service.type === s.type ? "0 3px 18px #0051ff15" : undefined
                      }}
                      onClick={() => chooseService(s)}
                    >
                      <div className="flex items-center gap-3">
                        {s.icon}
                        <span className="">{s.type}</span>
                        {discount > 0 && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-[#e7f7f0] text-[#08a881] text-xs font-black flex items-center gap-1 animate-flashSale">
                            <Tag size={14} className="mr-0.5" />-{discount}%
                          </span>
                        )}
                      </div>
                      <span className="font-normal text-lg text-[#888] flex items-center gap-2">
                        <span className="line-through text-[#c7c7c7]">${s.price.toFixed(2)}</span>
                        <span className="font-black text-[#0051ff]">${discounted.toFixed(2)}/ea</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                className="block mx-auto mt-7 text-[#0051ff] underline text-md font-bold"
                onClick={() => setStep(0)}
              >
                ← Back
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h3 className="font-black text-2xl mb-7 text-[#222] text-center tracking-tight">
                Order Details
              </h3>
              <form
                className="space-y-10"
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
                <div className="flex flex-col items-center gap-2">
                  <label className="block font-extrabold text-[#0051ff] mb-2 text-lg">Profile or Link</label>
                  <input
                    type="text"
                    autoFocus
                    className="w-full border border-[#CFE4FF] rounded-2xl px-5 py-4 text-lg font-extrabold outline-[#0051ff] bg-white/98 shadow-lg focus:border-[#0051ff] focus:ring-2 focus:ring-[#E8F1FF] transition tracking-wide"
                    placeholder={`Paste your link or username here`}
                    value={target}
                    onChange={e => setTarget(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex flex-col items-center gap-2 w-full">
                    <span className="text-[#0051ff] text-lg font-bold tracking-wide">Amount</span>
                    <div className="flex gap-2 flex-wrap justify-center w-full">
                      {getQuickAmounts(platform, service).map(val => (
                        <button
                          key={val}
                          type="button"
                          className={`
                            rounded-full px-6 py-2 font-bold border text-lg shadow
                            ${quantity === val ? "bg-[#0051ff] text-white border-[#0051ff] scale-105" : "bg-[#f1f7ff] text-[#0051ff] border-[#b0d8ff]"}
                            hover:bg-[#e6f4ff] hover:border-[#0051ff] transition
                          `}
                          onClick={() => setQuantity(val)}
                        >
                          {val >= 1000
                            ? val % 1000 === 0
                              ? `${val/1000}K`
                              : `${val}`
                            : val}
                        </button>
                      ))}
                    </div>
                    <span className="font-black text-[#0051ff] text-2xl mt-2 drop-shadow">
                      Total: <span className="text-[#11aa80]">${(discounted * quantity).toFixed(2)}</span>
                      <span className="ml-2 text-lg text-[#c7c7c7] line-through">${(service.price * quantity).toFixed(2)}</span>
                    </span>
                    <span className="text-xs text-[#08a881] font-semibold mt-1 uppercase tracking-wide animate-pulse">
                      Flash Sale! {discount}% off for a limited time
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-[1.6rem] font-extrabold text-xl flex justify-center items-center gap-2 bg-gradient-to-br from-[#0051ff] to-[#E1306C] hover:from-[#003bb6] hover:to-[#b30d4a] text-white shadow-xl transition mt-8 tracking-tight"
                  style={{
                    letterSpacing: ".01em",
                    boxShadow: "0 4px 22px #0051ff15,0 2px 8px #E1306C10"
                  }}
                >
                  <CheckCircle size={22} /> Continue to Secure Checkout
                </button>
                {error && <div className="mt-4 text-[#E1306C] text-center font-bold">{error}</div>}
              </form>
              <button
                className="block mx-auto mt-8 text-[#0051ff] underline text-md font-bold"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
            </>
          )}
          {step === 3 && (
            <div className="text-center space-y-7">
              <CheckCircle className="mx-auto text-[#11aa80]" size={60} />
              <h3 className="text-3xl font-black text-[#0051ff] tracking-tight drop-shadow">Order Sent!</h3>
              <p className="text-[#444] text-lg font-semibold">
                Redirecting to secure checkout...
              </p>
            </div>
          )}
          {step === 4 && done && (
            <div className="text-center space-y-7">
              <CheckCircle className="mx-auto text-[#11aa80]" size={60} />
              <h3 className="text-3xl font-black text-[#0051ff] tracking-tight drop-shadow">Thank You! 🎉</h3>
              <p className="text-[#444] text-lg font-semibold">
                Your order was received and is being processed.
                <br />
                You’ll receive updates shortly.
              </p>
              <button
                className="mt-7 bg-[#0051ff] text-white px-8 py-3 rounded-2xl font-black text-lg tracking-tight shadow-xl"
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
        .animate-pulse {
          animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .65; }
        }
        input:focus { outline: none !important; }
      `}</style>
    </div>
  );
}