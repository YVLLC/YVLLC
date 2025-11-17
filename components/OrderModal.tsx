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

type StealthPackageResult = { pkg: string; type: string };

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

// --- HELPERS ---
function getQuickAmounts(platform: Platform, service: Service): number[] {
  const t = service.type.toString().toLowerCase();

  if (platform.key === "instagram" && t === "views")
    return [500, 2000, 5000, 10000, 20000, 50000];
  if (platform.key === "instagram" && t === "followers")
    return [100, 200, 350, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
  if (platform.key === "instagram" && t === "likes")
    return [50, 100, 300, 500, 1000, 2000, 5000, 10000, 20000];

  if (platform.key === "tiktok" && (t === "followers" || t === "likes"))
    return [100, 250, 500, 1000, 2000, 5000, 10000];
  if (platform.key === "tiktok" && t === "views")
    return [1000, 2000, 5000, 10000, 20000, 50000];

  if (platform.key === "youtube" && t === "views")
    return [200, 500, 1000, 2000, 5000, 10000];
  if (platform.key === "youtube" && t === "subscribers")
    return [200, 500, 1000, 2000, 5000, 10000];
  if (platform.key === "youtube" && t === "likes")
    return [250, 500, 1000, 2000, 5000, 10000];

  return [100, 500, 1000, 2000, 5000, 10000, 25000, 50000];
}

function isUrl(str: string): boolean {
  return /^https?:\/\//i.test(str.trim());
}

function extractHandle(raw: string): string {
  const value = raw.trim();
  if (!value) return "";
  if (isUrl(value)) {
    try {
      const url = new URL(value);
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts.length > 0) return parts[0];
      return url.hostname.replace("www.", "");
    } catch {
      return value;
    }
  }
  return value.replace("@", "");
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
  initialService,
}: OrderModalProps) {
  const [step, setStep] = useState(0);
  const [platform, setPlatform] = useState<Platform>(PLATFORMS[0]);
  const [service, setService] = useState<Service>(PLATFORMS[0].services[0]);
  const [quantity, setQuantity] = useState<number>(100);
  const [target, setTarget] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Scroll lock
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Initialize from props
  useEffect(() => {
    if (!open) return;

    let selectedPlatform = PLATFORMS[0];
    let selectedService = PLATFORMS[0].services[0];
    let stepToSet = 0;

    if (initialPlatform) {
      const foundPlat = PLATFORMS.find(
        (p) =>
          p.key === initialPlatform.toLowerCase() ||
          p.name.toLowerCase() === initialPlatform.toLowerCase()
      );
      if (foundPlat) {
        selectedPlatform = foundPlat;
        if (initialService) {
          const foundServ = foundPlat.services.find(
            (s) => s.type.toString().toLowerCase() === initialService.toLowerCase()
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

  const { pkg, type } = getStealthPackage(platform, service);
  const { discount, discounted } = getDiscountedPrice(service.price);

  const orderToSend = {
    package: pkg,
    type,
    amount: quantity,
    reference: target,
    total: Number((discounted * quantity).toFixed(2)),
  };

  // ---- VALIDATION CONFIG FOR TARGET ----
  const serviceType = service.type.toString().toLowerCase();
  const needsMediaLink = serviceType === "likes" || serviceType === "views";
  const isFollowerService = serviceType === "followers" || serviceType === "subscribers";

  const targetLabel = needsMediaLink
    ? "Post / Video Link"
    : platform.key === "youtube"
    ? "Channel Link"
    : "Profile Link or @username";

  const targetPlaceholder = needsMediaLink
    ? `Paste the full ${platform.name} post / video URL`
    : platform.key === "youtube"
    ? "Paste your YouTube channel link"
    : `Paste your profile link or @username`;

  // ---- STEP HANDLERS ----
  function handleNext() {
    if (step === 2) {
      const value = target.trim();
      if (!value) {
        setError(
          needsMediaLink
            ? "Paste the full link to the post or video."
            : "Paste your profile link or username."
        );
        return;
      }
      if (needsMediaLink && !isUrl(value)) {
        setError("Please paste a valid link starting with http or https.");
        return;
      }
      if (!quantity || quantity < 1) {
        setError("Select a valid amount.");
        return;
      }
    }
    setError("");
    setStep((s) => s + 1);
  }

  function handleBack() {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  }

  function handleSecureCheckout(e: React.FormEvent) {
    e.preventDefault();
    const value = target.trim();
    if (!value) {
      setError(
        needsMediaLink
          ? "Paste the full link to the post or video."
          : "Paste your profile link or username."
      );
      return;
    }
    if (needsMediaLink && !isUrl(value)) {
      setError("Please paste a valid link starting with http or https.");
      return;
    }

    setError("");
    const orderString = btoa(unescape(encodeURIComponent(JSON.stringify(orderToSend))));
    window.location.href =
      "https://checkout.yesviral.com/checkout?order=" + orderString;
  }

  // --- SMART PREVIEW (STYLE A – device mockup) ---
  const handleOrTitle = extractHandle(target);
  const isVideoLayout = needsMediaLink;
  const amountLabel =
    quantity >= 1000 ? `${(quantity / 1000).toFixed(quantity % 1000 === 0 ? 0 : 1)}K` : quantity;

  function SmartPreview() {
    return (
      <div className="w-full flex justify-center mt-6">
        <div
          className="
            relative bg-[#020617] rounded-[28px]
            px-3.5 pt-4 pb-3
            border border-[#0f172a]
            shadow-[0_18px_45px_rgba(15,23,42,0.85)]
            max-w-[260px] w-full
          "
        >
          {/* Top notch / speaker */}
          <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-24 h-5 bg-[#020617] rounded-b-2xl border-t border-x border-[#0b1220]" />

          {/* Gradient aura */}
          <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_top,_#38bdf8,_transparent_60%),radial-gradient(circle_at_bottom,_#4f46e5,_transparent_55%)] pointer-events-none" />

          {/* Inner content */}
          <div className="relative z-10 flex flex-col gap-3">
            {/* Status Row */}
            <div className="flex items-center justify-between text-[10px] text-[#cbd5f5]">
              <div className="flex items-center gap-1.5">
                {platform.icon}
                <span className="font-semibold">{platform.name}</span>
              </div>
              <span className="px-1.5 py-px rounded-full bg-[#0b1220] border border-[#1e293b] text-[9px] uppercase tracking-[0.12em] text-[#e5f0ff]">
                Live preview
              </span>
            </div>

            {/* MAIN PREVIEW AREA */}
            {isVideoLayout ? (
              // --- VIDEO / POST style preview (Likes / Views) ---
              <div className="w-full rounded-2xl bg-[#020617] border border-[#1e293b] overflow-hidden">
                <div className="relative w-full">
                  {/* Aspect ratio box */}
                  <div className="w-full pt-[130%] bg-[#020617] relative overflow-hidden">
                    {/* Content gradient "thumbnail" */}
                    <div className="absolute inset-[6px] rounded-2xl bg-[radial-gradient(circle_at_top,_#38bdf8,_#0f172a_60%),radial-gradient(circle_at_bottom,_#6366f1,_#020617_65%)] flex items-center justify-center">
                      {/* Play icon */}
                      <div className="w-11 h-11 rounded-full border border-white/25 bg-black/30 flex items-center justify-center backdrop-blur-[4px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Top overlay: handle + views */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[10px] text-white/80">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#38bdf8] to-[#6366f1] border border-white/30" />
                        <div className="flex flex-col leading-[1.1]">
                          <span className="font-semibold truncate max-w-[90px]">
                            {handleOrTitle || "Preview account"}
                          </span>
                          <span className="text-[9px] text-white/60">
                            {platform.name} • {service.type}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-black/45 border border-white/15 text-[9px] font-semibold text-white/85 backdrop-blur-[4px]">
                        {amountLabel} {service.type}
                      </span>
                    </div>

                    {/* Bottom overlay: engagement bar */}
                    <div className="absolute bottom-2 left-2 right-2 text-[9px] text-white/85">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-[4px]">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                          Boost in progress
                        </span>
                        <span className="text-white/70 font-medium">
                          +{amountLabel} {service.type}
                        </span>
                      </div>
                      <div className="w-full h-[3px] rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#38bdf8] to-[#22c55e] animate-preview-bar" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // --- PROFILE-STYLE PREVIEW (Followers / Subscribers) ---
              <div className="w-full rounded-2xl bg-[#020617] border border-[#1e293b] px-3.5 py-3.5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[radial-gradient(circle_at_top,_#38bdf8,_#6366f1)] border border-white/25 shadow-[0_0_0_2px_rgba(8,47,73,0.7)]" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#22c55e] border border-[#020617]" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-semibold text-[#e5f0ff]">
                        {handleOrTitle || "Your profile"}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-full bg-[#0b1220] border border-[#1e293b] text-[8px] uppercase tracking-[0.14em] text-[#cbd5f5]">
                        Boosting
                      </span>
                    </div>
                    <span className="text-[10px] text-[#9ca3c7]">
                      {platform.name} • {service.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#cbd5f5] mt-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#6b7280] uppercase tracking-[0.12em]">
                      Before
                    </span>
                    <span className="font-semibold">12,485</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-[#6b7280] uppercase tracking-[0.12em]">
                      Boost
                    </span>
                    <span className="font-semibold text-[#38bdf8]">
                      +{amountLabel} {service.type}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-[#6b7280] uppercase tracking-[0.12em]">
                      After
                    </span>
                    <span className="font-semibold text-[#e5f0ff]">
                      12,485 + {amountLabel}
                    </span>
                  </div>
                </div>

                <div className="mt-1.5">
                  <div className="w-full h-[3px] rounded-full bg-[#0f172a] overflow-hidden">
                    <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-[#38bdf8] via-[#6366f1] to-[#22c55e] animate-preview-bar" />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px] text-[#6b7280]">Order queued</span>
                    <span className="text-[9px] text-[#cbd5f5] font-medium">
                      High-Quality {service.type}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom text */}
            <div className="text-[10px] text-[#94a3c6]">
              This is a visual preview only. Your exact results will depend on the amount and
              package you select.
            </div>
          </div>
        </div>
      </div>
    );
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
            boxShadow: "0 2px 16px 0 #e6f0ff1e",
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
            <span
              className="font-extrabold text-lg tracking-tight"
              style={{ color: platform.color }}
            >
              {platform.name}
            </span>
          </div>

          {/* Step circles */}
          <div className="relative w-full flex items-center justify-between mt-4 px-2 z-10">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center flex-1 min-w-0">
                <div
                  className={`
                    flex items-center justify-center rounded-full border-4 font-bold text-base
                    ${
                      step === i
                        ? "bg-[#007BFF] text-white border-[#007BFF] shadow"
                        : step > i
                        ? "bg-[#E6F0FF] text-[#007BFF] border-[#007BFF]"
                        : "bg-[#E6F0FF] text-[#888] border-[#E6F0FF]"
                    }
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
                  className={`mt-2 text-xs font-semibold whitespace-nowrap text-center ${
                    step === i ? "text-[#007BFF]" : "text-[#888]"
                  }`}
                  style={{ width: "max-content" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Animated blue line under steps */}
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
              className="absolute left-0 top-1/2 h-2 transition-all duration-500 animate-step-glow"
              style={{
                width: `${(step / (steps.length - 1)) * 100}%`,
                background: COLORS.primary,
                boxShadow: "0 0 16px #007bff66",
                transform: "translateY(-50%)",
                borderRadius: 9999,
                zIndex: 1,
              }}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div
          className="flex-1 overflow-y-auto px-5 sm:px-8 py-7 rounded-b-3xl"
          style={{ background: COLORS.background }}
        >
          {/* STEP 0: PLATFORM */}
          {step === 0 && (
            <div>
              <h3 className="font-black text-2xl mb-7 text-[#111111] text-center tracking-tight">
                Choose Platform
              </h3>
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
                      minHeight: 90,
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

          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <div>
              <h3 className="font-black text-2xl mb-7 text-[#111111] text-center">
                {platform.icon} {platform.name} Services
              </h3>
              <div className="flex flex-col gap-4">
                {platform.services.map((s) => {
                  const { discount: localDiscount, discounted: localDiscounted } =
                    getDiscountedPrice(s.price);
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
                        <span>{s.type}</span>
                        {localDiscount > 0 && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-[#E6F0FF] text-[#007BFF] text-xs font-bold flex items-center gap-1">
                            <Tag size={14} className="mr-0.5 text-[#007BFF]" />-
                            {localDiscount}%
                          </span>
                        )}
                      </div>
                      <span className="font-normal text-[15px] text-[#888] flex items-center gap-2">
                        <span className="line-through text-[#c7c7c7]">
                          ${s.price.toFixed(2)}
                        </span>
                        <span className="font-bold text-[#007BFF]">
                          ${localDiscounted.toFixed(2)}/ea
                        </span>
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

          {/* STEP 2: DETAILS + SMART PREVIEW */}
          {step === 2 && (
            <div>
              <h3 className="font-black text-2xl mb-3 text-[#111111] text-center">
                Order Details
              </h3>
              <p className="text-xs text-center text-[#666] mb-6">
                {isFollowerService
                  ? "We’ll boost your profile with High-Quality Followers/Subscribers."
                  : "We’ll boost engagement directly on this post or video."}
              </p>
              <div className="space-y-7">
                {/* TARGET INPUT */}
                <div className="flex flex-col">
                  <label className="block font-semibold text-[#007BFF] mb-2 text-sm">
                    {targetLabel}
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="
                      w-full border border-[#CFE4FF] rounded-xl px-4 py-3 text-base font-medium
                      outline-none bg-white/90 shadow
                      focus:border-[#007BFF] focus:ring-2 focus:ring-[#E6F0FF]
                      transition
                    "
                    placeholder={targetPlaceholder}
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                  />
                  <span className="mt-1 text-[11px] text-[#888]">
                    {needsMediaLink
                      ? "Paste the exact link to the post or video you want boosted."
                      : "You can use @username or your full profile/channel link."}
                  </span>
                </div>

                {/* AMOUNT + TOTAL */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center gap-1 w-full">
                    <span className="text-[#111] text-base font-semibold self-start">
                      Amount
                    </span>
                    <div className="flex gap-2 flex-wrap justify-center w-full">
                      {getQuickAmounts(platform, service).map((val) => (
                        <button
                          key={val}
                          type="button"
                          className={`
                            rounded-full px-5 py-2 font-bold border text-sm shadow
                            ${
                              quantity === val
                                ? "bg-[#007BFF] text-white border-[#007BFF]"
                                : "bg-[#E6F0FF] text-[#007BFF] border-[#CFE4FF]"
                            }
                            hover:bg-[#E6F0FF] hover:border-[#007BFF] transition
                          `}
                          onClick={() => setQuantity(val)}
                        >
                          {val >= 1000 ? `${val / 1000}K` : val}
                        </button>
                      ))}
                    </div>
                    <span className="font-bold text-[#007BFF] text-xl mt-2">
                      Total:{" "}
                      <span className="text-[#007BFF]">
                        ${(discounted * quantity).toFixed(2)}
                      </span>
                      <span className="ml-2 text-sm text-[#c7c7c7] line-through">
                        ${(service.price * quantity).toFixed(2)}
                      </span>
                    </span>
                    <span className="text-[11px] text-[#007BFF] font-semibold mt-1">
                      Flash Sale! {discount}% off for a limited time
                    </span>
                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="mt-1 text-[#EF4444] text-center text-sm">{error}</div>
                )}
              </div>

              {/* SMART PREVIEW (PHONE MOCKUP) */}
              <SmartPreview />

              {/* ACTIONS */}
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

          {/* STEP 3: REVIEW + PREVIEW */}
          {step === 3 && (
            <form onSubmit={handleSecureCheckout}>
              <h3 className="font-black text-2xl mb-4 text-[#111] text-center">
                Review & Secure Checkout
              </h3>

              {/* Top summary card */}
              <div className="bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl px-6 py-6 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  {platform.icon}
                  <span className="font-semibold text-lg">{platform.name}</span>
                  <span className="ml-3 px-3 py-1 rounded-full bg-[#E6F0FF] text-[#007BFF] font-semibold text-xs">
                    {service.type}
                  </span>
                </div>
                <div className="text-[#444] mb-1">
                  <b>Target:</b> {target || "Not set"}
                </div>
                <div className="text-[#444] mb-1">
                  <b>Amount:</b> {quantity}
                </div>
                <div className="text-[#444] mb-1">
                  <b>Unit:</b>{" "}
                  ${discounted.toFixed(3)}/ea{" "}
                  <span className="text-[#c7c7c7] line-through">
                    ${service.price.toFixed(3)}/ea
                  </span>
                </div>
                <div className="mt-3 font-extrabold text-lg text-[#007BFF]">
                  Total: ${(discounted * quantity).toFixed(2)}
                </div>
                <div className="text-xs text-[#666] mt-1">
                  Package: <b>{pkg}</b> • Type: <b>{type}</b>
                </div>
              </div>

              {/* Reuse preview so they see it again before paying */}
              <SmartPreview />

              {error && (
                <div className="mt-3 text-[#EF4444] text-center text-sm">{error}</div>
              )}

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
        @keyframes flashSaleBlue {
          0%,
          100% {
            background: #e6f0ff;
            color: #007bff;
          }
          50% {
            background: #d4e4ff;
            color: #005fcc;
          }
        }
        .animate-flashSale {
          animation: flashSaleBlue 2.4s ease-in-out infinite;
        }

        @keyframes previewBar {
          0% {
            transform: translateX(-35%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(10%);
          }
        }
        .animate-preview-bar {
          animation: previewBar 2.8s ease-in-out infinite alternate;
        }

        @keyframes stepGlow {
          0% {
            box-shadow: 0 0 6px rgba(0, 123, 255, 0.25);
          }
          50% {
            box-shadow: 0 0 16px rgba(0, 123, 255, 0.55);
          }
          100% {
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.35);
          }
        }
        .animate-step-glow {
          animation: stepGlow 2.7s ease-in-out infinite;
        }

        ::-webkit-scrollbar {
          width: 0.7em;
          background: #f7f9ff;
        }
        ::-webkit-scrollbar-thumb {
          background: #e6f0ff;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
