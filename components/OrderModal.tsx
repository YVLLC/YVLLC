import { useState, useEffect } from "react";
import {
  Instagram,
  Youtube,
  Music2,
  UserPlus,
  ThumbsUp,
  Eye,
  X,
  CheckCircle,
  Tag,
  Image as ImgIcon,
  UserCircle2,
  Play,
} from "lucide-react";

// ==============================
// TYPES
// ==============================
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

// ==============================
// COLOR PALETTE
// ==============================
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

// ==============================
// PLATFORM DATA
// ==============================
const PLATFORMS: Platform[] = [
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
      },
      {
        type: "Likes",
        price: 0.07,
        icon: <ThumbsUp size={17} className="text-[#E1306C]" />,
      },
      {
        type: "Views",
        price: 0.04,
        icon: <Eye size={17} className="text-[#E1306C]" />,
      },
    ],
  },
  {
    key: "tiktok",
    name: "TikTok",
    color: "#00F2EA",
    icon: <Music2 className="text-[#00F2EA]" size={26} />,
    services: [
      {
        type: "Followers",
        price: 0.1,
        icon: <UserPlus size={17} className="text-[#00F2EA]" />,
      },
      {
        type: "Likes",
        price: 0.08,
        icon: <ThumbsUp size={17} className="text-[#00F2EA]" />,
      },
      {
        type: "Views",
        price: 0.06,
        icon: <Eye size={17} className="text-[#00F2EA]" />,
      },
    ],
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
      },
      {
        type: "Likes",
        price: 0.09,
        icon: <ThumbsUp size={17} className="text-[#FF0000]" />,
      },
      {
        type: "Views",
        price: 0.05,
        icon: <Eye size={17} className="text-[#FF0000]" />,
      },
    ],
  },
];

const steps = [
  { label: "Platform" },
  { label: "Service" },
  { label: "Details" },
  { label: "Review" },
];

// ==============================
// DISCOUNT CALC
// ==============================
function getDiscountedPrice(price: number) {
  const discount = 0.02 + Math.random() * 0.02;
  return {
    discount: Math.round(discount * 100),
    discounted: Number((price * (1 - discount)).toFixed(3)),
  };
}

// ==============================
// QUICK AMOUNTS
// ==============================
function getQuickAmounts(platform: Platform, service: Service) {
  const type = service.type.toLowerCase();
  const key = platform.key;

  if (key === "instagram" && type === "views")
    return [500, 2000, 5000, 10000, 20000, 50000];
  if (key === "instagram" && type === "followers")
    return [100, 200, 350, 500, 1000, 2000, 5000, 10000];
  if (key === "instagram" && type === "likes")
    return [50, 100, 300, 500, 1000, 2000, 5000];

  if (key === "tiktok" && (type === "followers" || type === "likes"))
    return [100, 250, 500, 1000, 2000, 5000, 10000];
  if (key === "tiktok" && type === "views")
    return [1000, 2000, 5000, 10000];

  if (key === "youtube" && type === "views")
    return [200, 500, 1000, 2000];
  if (key === "youtube" && type === "subscribers")
    return [200, 500, 1000];
  if (key === "youtube" && type === "likes")
    return [250, 500, 1000];

  return [100, 500, 1000, 2000];
}

// ==============================
// COMPONENT: PREMIUM PREVIEW CARD
// ==============================
function PremiumPreview({
  target,
  platform,
  service,
}: {
  target: string;
  platform: Platform;
  service: Service;
}) {
  const isProfile =
    service.type === "Followers" || service.type === "Subscribers";

  return (
    <div className="w-full rounded-2xl border border-[#CFE4FF] bg-[#F5FAFF] p-4 shadow-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {platform.icon}
          <span className="font-semibold text-[#111]">{platform.name}</span>
        </div>

        <span className="text-[11px] px-2 py-1 rounded-full bg-[#E6F0FF] text-[#007BFF] font-semibold">
          Preview
        </span>
      </div>

      {/* Body */}
      <div className="w-full flex flex-col items-center gap-3">
        {isProfile ? (
          <>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E6F0FF] to-[#D7E6FF] flex items-center justify-center shadow-inner">
              <UserCircle2 size={42} className="text-[#007BFF]" />
            </div>
            <span className="text-sm font-medium text-[#111] truncate max-w-[200px]">
              {target}
            </span>
            <span className="text-xs text-[#777]">Profile preview (visual only)</span>
          </>
        ) : (
          <>
            <div className="w-full max-w-[220px] aspect-video rounded-xl bg-gradient-to-br from-[#E6F0FF] to-[#D7E6FF] shadow-inner flex items-center justify-center">
              <Play className="text-[#007BFF]" size={32} />
            </div>
            <span className="text-sm font-medium text-[#111] truncate max-w-[240px] text-center">
              {target}
            </span>
            <span className="text-xs text-[#777]">Post preview (visual only)</span>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="pt-2">
        <span className="text-[11px] font-semibold text-[#007BFF] bg-[#E6F0FF] px-2 py-1 rounded-full">
          Your Order Preview
        </span>
      </div>
    </div>
  );
}

// ==============================
// MAIN MODAL COMPONENT
// ==============================
export default function OrderModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [platform, setPlatform] = useState<Platform>(PLATFORMS[0]);
  const [service, setService] = useState<Service>(PLATFORMS[0].services[0]);
  const [quantity, setQuantity] = useState<number>(100);
  const [target, setTarget] = useState("");

  const { discount, discounted } = getDiscountedPrice(service.price);

  if (!open) return null;

  // ==============================
  // RENDER
  // ==============================
  return (
    <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-xl border border-[#CFE4FF] flex flex-col max-h-[92vh]">
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-[#E6F0FF] relative">
          <button
            className="absolute top-4 right-6 bg-white p-2 rounded-full shadow hover:bg-[#F7FAFF]"
            onClick={onClose}
          >
            <X size={20} className="text-[#007BFF]" />
          </button>

          <div className="flex items-center gap-2">
            {platform.icon}
            <h2 className="font-black text-xl">{platform.name}</h2>
          </div>

          {/* Steps */}
          <div className="mt-4 flex items-center justify-between">
            {steps.map((s, i) => {
              const active = step === i;
              const done = step > i;

              return (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-bold ${
                      active
                        ? "bg-[#007BFF] border-[#007BFF] text-white shadow"
                        : done
                        ? "bg-[#E6F0FF] border-[#007BFF] text-[#007BFF]"
                        : "bg-[#E6F0FF] border-[#CFE4FF] text-[#777]"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs mt-1">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto">

          {/* STEP 0 - PLATFORM */}
          {step === 0 && (
            <div className="flex flex-col items-center">
              <h3 className="font-black text-2xl mb-6">Choose Platform</h3>

              <div className="flex flex-wrap gap-4 justify-center">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.key}
                    className={`px-5 py-4 rounded-xl border-2 flex flex-col items-center gap-2 w-[115px] transition ${
                      p.key === platform.key
                        ? "bg-[#E6F0FF] border-[#007BFF] scale-[1.05]"
                        : "bg-white border-[#CFE4FF]"
                    }`}
                    onClick={() => {
                      setPlatform(p);
                      setService(p.services[0]);
                      setStep(1);
                    }}
                  >
                    {p.icon}
                    <span className="font-semibold text-sm">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 - SERVICE */}
          {step === 1 && (
            <div>
              <h3 className="font-black text-2xl text-center mb-6">
                {platform.name} Services
              </h3>

              <div className="flex flex-col gap-4">
                {platform.services.map((s) => {
                  const { discounted: d } = getDiscountedPrice(s.price);

                  return (
                    <button
                      key={s.type}
                      className={`px-6 py-4 rounded-xl border-2 flex items-center justify-between transition ${
                        s.type === service.type
                          ? "bg-[#E6F0FF] border-[#007BFF] scale-[1.03]"
                          : "bg-white border-[#CFE4FF]"
                      }`}
                      onClick={() => {
                        setService(s);
                        setStep(2);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {s.icon}
                        <span className="font-semibold">{s.type}</span>
                      </div>

                      <span className="text-sm text-[#007BFF] font-bold">
                        ${d.toFixed(2)}/ea
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(0)}
                className="mt-6 text-[#007BFF] underline text-sm mx-auto block"
              >
                ← Back
              </button>
            </div>
          )}

          {/* STEP 2 - DETAILS */}
          {step === 2 && (
            <div>
              <h3 className="font-black text-2xl text-center mb-6">
                Order Details
              </h3>

              {/* TARGET INPUT */}
              <label className="font-semibold text-[#111] block mb-2">
                {service.type === "Followers" || service.type === "Subscribers"
                  ? "Profile or Username"
                  : "Post / Video Link"}
              </label>

              <input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder={
                  service.type === "Followers" || service.type === "Subscribers"
                    ? "Profile URL or @username"
                    : "Paste full post / video link"
                }
                className="w-full px-4 py-3 border border-[#CFE4FF] rounded-xl bg-white outline-none focus:border-[#007BFF]"
              />

              {/* AMOUNT */}
              <div className="mt-6 flex flex-col items-center">
                <span className="font-semibold text-[#111] mb-3">Amount</span>

                <div className="flex flex-wrap gap-2 justify-center">
                  {getQuickAmounts(platform, service).map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setQuantity(amt)}
                      className={`px-5 py-2 rounded-full text-sm font-bold border transition ${
                        quantity === amt
                          ? "bg-[#007BFF] text-white border-[#007BFF]"
                          : "bg-[#E6F0FF] text-[#007BFF] border-[#CFE4FF]"
                      }`}
                    >
                      {amt >= 1000 ? `${amt / 1000}K` : amt}
                    </button>
                  ))}
                </div>

                <div className="mt-4 font-bold text-xl text-[#007BFF]">
                  Total: ${(discounted * quantity).toFixed(2)}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  className="px-6 py-3 bg-[#E6F0FF] text-[#007BFF] rounded-xl border border-[#CFE4FF]"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  className="px-6 py-3 bg-[#007BFF] text-white rounded-xl"
                  onClick={() => {
                    if (!target.trim()) return;
                    setStep(3);
                  }}
                >
                  Review
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 – REVIEW WITH PREMIUM PREVIEW */}
          {step === 3 && (
            <div>
              <h3 className="font-black text-2xl text-center mb-6">
                Review & Checkout
              </h3>

              {/* Order Summary */}
              <div className="bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  {platform.icon}
                  <span className="font-semibold text-lg">{platform.name}</span>
                  <span className="ml-3 px-3 py-1 rounded-full bg-[#E6F0FF] text-[#007BFF] font-semibold text-xs">
                    {service.type}
                  </span>
                </div>

                <div className="text-sm text-[#444]">
                  <b>Target:</b> {target}
                </div>
                <div className="text-sm text-[#444]">
                  <b>Amount:</b> {quantity.toLocaleString()}
                </div>
                <div className="text-sm text-[#444]">
                  <b>Price:</b>{" "}
                  <span className="text-[#007BFF] font-semibold">
                    ${discounted.toFixed(3)}/ea
                  </span>
                </div>

                <div className="font-extrabold text-xl text-[#007BFF] mt-3">
                  Total: ${(discounted * quantity).toFixed(2)}
                </div>
              </div>

              {/* PREMIUM PREVIEW */}
              <PremiumPreview
                target={target}
                platform={platform}
                service={service}
              />

              <div className="flex justify-between mt-8">
                <button
                  className="px-6 py-3 bg-[#E6F0FF] text-[#007BFF] rounded-xl border border-[#CFE4FF]"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button
                  className="px-6 py-3 bg-gradient-to-br from-[#007BFF] to-[#005FCC] text-white rounded-xl flex items-center gap-2"
                  onClick={() => {
                    const order = {
                      amount: quantity,
                      target,
                      platform: platform.key,
                      service: service.type,
                      total: Number((discounted * quantity).toFixed(2)),
                    };

                    const encoded = btoa(
                      encodeURIComponent(JSON.stringify(order))
                    );

                    window.location.href =
                      "https://checkout.yesviral.com/checkout?order=" + encoded;
                  }}
                >
                  <CheckCircle size={20} />
                  Secure Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
