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
  Play
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
  focus: "#0056B3"
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
        icon: <UserPlus size={17} className="text-[#E1306C]" />
      },
      {
        type: "Likes",
        price: 0.07,
        icon: <ThumbsUp size={17} className="text-[#E1306C]" />
      },
      {
        type: "Views",
        price: 0.04,
        icon: <Eye size={17} className="text-[#E1306C]" />
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
        price: 0.1,
        icon: <UserPlus size={17} className="text-[#00F2EA]" />
      },
      {
        type: "Likes",
        price: 0.08,
        icon: <ThumbsUp size={17} className="text-[#00F2EA]" />
      },
      {
        type: "Views",
        price: 0.06,
        icon: <Eye size={17} className="text-[#00F2EA]" />
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
        icon: <UserPlus size={17} className="text-[#FF0000]" />
      },
      {
        type: "Likes",
        price: 0.09,
        icon: <ThumbsUp size={17} className="text-[#FF0000]" />
      },
      {
        type: "Views",
        price: 0.05,
        icon: <Eye size={17} className="text-[#FF0000]" />
      }
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
function getDiscountedPrice(
  price: number
): { discount: number; discounted: number } {
  const discount = 0.02 + Math.random() * 0.02;
  const discounted = Math.max(0.01, Number((price * (1 - discount)).toFixed(3)));
  return { discount: Math.round(discount * 100), discounted };
}

// --- SAFETY: Stripe-safe checkout info only! ---
function getStealthPackage(
  platform: Platform,
  service: Service
): StealthPackageResult {
  let pkg = "Premium Package";
  let type = "Standard";
  if (platform && service) {
    if (platform.key === "instagram" && service.type === "Followers")
      pkg = "Insta Package";
    if (platform.key === "instagram" && service.type === "Likes")
      pkg = "Insta Plus";
    if (platform.key === "tiktok") pkg = "Ultimate Package";
    if (platform.key === "youtube") pkg = "Pro Package";
    if (service.type === "Followers" || service.type === "Subscribers")
      type = "Growth";
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

  // Lock scroll when modal open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Initialize values based on initial props
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
            (s) => s.type.toLowerCase() === initialService.toLowerCase()
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

  // --- QUICK AMOUNTS ---
  function getQuickAmounts(platform: Platform, service: Service) {
    const type = service.type.toLowerCase();
    if (platform.key === "instagram" && type === "views")
      return [500, 2000, 5000, 10000, 20000, 50000];
    if (platform.key === "instagram" && type === "followers")
      return [100, 200, 350, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
    if (platform.key === "instagram" && type === "likes")
      return [50, 100, 300, 500, 1000, 2000, 5000, 10000, 20000];

    if (
      platform.key === "tiktok" &&
      (type === "followers" || type === "likes")
    )
      return [100, 250, 500, 1000, 2000, 5000, 10000];
    if (platform.key === "tiktok" && type === "views")
      return [1000, 2000, 5000, 10000, 20000, 50000];

    if (platform.key === "youtube" && type === "views")
      return [200, 500, 1000, 2000, 5000, 10000];
    if (platform.key === "youtube" && type === "subscribers")
      return [200, 500, 1000, 2000, 5000, 10000];
    if (platform.key === "youtube" && type === "likes")
      return [250, 500, 1000, 2000, 5000, 10000];

    return [100, 500, 1000, 2000, 5000, 10000, 25000, 50000];
  }

  const { pkg, type } = getStealthPackage(platform, service);
  const { discount, discounted } = getDiscountedPrice(service.price);

  const orderToSend = {
    package: pkg,
    type: type,
    amount: quantity,
    reference: target.trim(),
    total: Number((discounted * quantity).toFixed(2))
  };

  // --- INPUT + VALIDATION HELPERS ---
  const lowerType = service.type.toLowerCase();
  const isEngagementOnContent = lowerType === "likes" || lowerType === "views";
  const isProfileGrowth =
    lowerType === "followers" || lowerType === "subscribers";
  const trimmedTarget = target.trim();
  const looksLikeLink =
    trimmedTarget.startsWith("http://") ||
    trimmedTarget.startsWith("https://");

  const detailsLabel = isEngagementOnContent
    ? "Post / Video Link"
    : "Profile or Channel";
  const detailsPlaceholder = isEngagementOnContent
    ? "Paste the full link to the post or video you want boosted"
    : "Enter your @username or full profile/channel link";

  function validateDetails(): string | null {
    if (!trimmedTarget) {
      if (isEngagementOnContent) {
        return "Paste the full link to the post or video you want boosted.";
      }
      return "Enter your @username or profile/channel link.";
    }
    if (isEngagementOnContent && !looksLikeLink) {
      return "Likes & views require a full post or video link, not just a username.";
    }
    if (!quantity || quantity < 1) {
      return "Enter a valid amount.";
    }
    return null;
  }

  function handleNext() {
    if (step === 2) {
      const err = validateDetails();
      if (err) {
        setError(err);
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
    const err = validateDetails();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    const orderString = btoa(
      unescape(encodeURIComponent(JSON.stringify(orderToSend)))
    );
    window.location.href =
      "https://checkout.yesviral.com/checkout?order=" + orderString;
  }

  // --- REVIEW PREVIEW META (FAKE BUT PREMIUM) ---
  const previewMode: "profile" | "content" | "none" =
    !trimmedTarget.length
      ? "none"
      : isEngagementOnContent || looksLikeLink
      ? "content"
      : "profile";

  const displayHandle = (() => {
    if (!trimmedTarget) return "";
    if (looksLikeLink) return trimmedTarget;
    // username style
    if (trimmedTarget.startsWith("@")) return trimmedTarget;
    return `@${trimmedTarget}`;
  })();

  const avatarInitial =
    previewMode === "profile" && !looksLikeLink && trimmedTarget
      ? trimmedTarget.replace("@", "").charAt(0).toUpperCase()
      : platform.name.charAt(0).toUpperCase();

  const truncatedLink =
    trimmedTarget.length > 40
      ? trimmedTarget.slice(0, 40) + "..."
      : trimmedTarget;

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
            <span
              className="font-extrabold text-lg tracking-tight"
              style={{ color: platform.color }}
            >
              {platform.name}
            </span>
          </div>

          {/* Step Circles & Labels */}
          <div className="relative w-full flex items-center justify-between mt-4 px-2 z-10">
            {steps.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center flex-1 min-w-0"
              >
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
                    boxShadow:
                      step === i ? "0 2px 10px #007BFF20" : undefined
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

          {/* Progress Bar Under Steps */}
          <div className="relative w-full h-3 mt-2 mb-[-8px] px-3 flex items-center">
            <div
              className="absolute left-0 top-1/2 w-full h-2 rounded-full"
              style={{
                background: COLORS.accentBg,
                transform: "translateY(-50%)",
                borderRadius: 9999
              }}
            />
            <div
              className="absolute left-0 top-1/2 h-2 transition-all duration-500"
              style={{
                width: `${(step / (steps.length - 1)) * 100}%`,
                background: COLORS.primary,
                boxShadow: "0 0 10px #007bff55",
                transform: "translateY(-50%)",
                borderRadius: 9999,
                zIndex: 1,
                transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)"
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto px-5 sm:px-8 py-7 rounded-b-3xl"
          style={{ background: COLORS.background }}
        >
          {/* STEP 0 - PLATFORM */}
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

          {/* STEP 1 - SERVICE */}
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
                        <span>{s.type}</span>
                        {discount > 0 && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-[#E6F0FF] text-[#007BFF] text-xs font-bold flex items-center gap-1">
                            <Tag
                              size={14}
                              className="mr-0.5 text-[#007BFF]"
                            />
                            -{discount}%
                          </span>
                        )}
                      </div>
                      <span className="font-normal text-[15px] text-[#888] flex items-center gap-2">
                        <span className="line-through text-[#c7c7c7]">
                          ${s.price.toFixed(2)}
                        </span>
                        <span className="font-bold text-[#007BFF]">
                          ${discounted.toFixed(2)}/ea
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

          {/* STEP 2 - DETAILS */}
          {step === 2 && (
            <div>
              <h3 className="font-black text-2xl mb-7 text-[#111111] text-center">
                Order Details
              </h3>
              <div className="space-y-8">
                {/* Target */}
                <div className="flex flex-col items-center">
                  <label className="block font-semibold text-[#007BFF] mb-2 text-lg">
                    {detailsLabel}
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="w-full border border-[#CFE4FF] rounded-xl px-4 py-3 text-base font-medium outline-[#007BFF] bg-white/90 shadow focus:border-[#007BFF] focus:ring-2 focus:ring-[#E6F0FF] transition"
                    placeholder={detailsPlaceholder}
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                  />
                  <span className="mt-2 text-xs text-[#888] text-center max-w-md">
                    {isEngagementOnContent
                      ? "For likes or views, we only accept direct post / video links (no usernames)."
                      : "For followers or subscribers, you can enter @username or your full profile / channel URL."}
                  </span>
                </div>

                {/* Amount */}
                <div className="mt-5 flex flex-col items-center justify-center gap-3">
                  <div className="flex flex-col items-center gap-1 w-full">
                    <span className="text-[#111] text-base font-semibold">
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
                    <span className="text-xs text-[#007BFF] font-semibold mt-1">
                      Flash Sale! {discount}% off for a limited time
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="mt-2 text-[#EF4444] text-center">{error}</div>
                )}
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

          {/* STEP 3 - REVIEW + PREVIEW */}
          {step === 3 && (
            <form onSubmit={handleSecureCheckout}>
              <h3 className="font-black text-2xl mb-5 text-[#111] text-center">
                Review & Secure Checkout
              </h3>

              <div className="grid sm:grid-cols-[1.1fr_0.9fr] gap-4 sm:gap-5 mb-7">
                {/* Order Summary */}
                <div className="bg-[#F5FAFF] border border-[#CFE4FF] rounded-2xl px-6 py-6">
                  <div className="flex items-center gap-2 mb-3">
                    {platform.icon}
                    <span className="font-semibold text-lg">
                      {platform.name}
                    </span>
                    <span className="ml-3 px-3 py-1 rounded-full bg-[#E6F0FF] text-[#007BFF] font-semibold text-xs">
                      {service.type}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-sm text-[#444]">
                    <div>
                      <b>Target:</b> {displayHandle || trimmedTarget || "—"}
                    </div>
                    <div>
                      <b>Amount:</b> {quantity.toLocaleString()}
                    </div>
                    <div>
                      <b>Unit:</b> ${discounted.toFixed(3)}/ea{" "}
                      <span className="text-[#c7c7c7] line-through">
                        ${service.price.toFixed(3)}/ea
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-dashed border-[#CFE4FF] flex items-center justify-between">
                    <span className="text-sm text-[#007BFF] font-semibold flex items-center gap-1">
                      <Tag size={14} /> Flash Sale Applied
                    </span>
                    <span className="font-extrabold text-xl text-[#007BFF]">
                      ${(discounted * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Smart Preview (FAKE BUT PREMIUM) */}
                <div className="bg-[#020617] rounded-2xl p-4 relative overflow-hidden border border-[#0f172a] shadow-[0_18px_45px_rgba(15,23,42,0.85)]">
                  <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_top,_#38bdf8,_transparent_55%),radial-gradient(circle_at_bottom,_#4f46e5,_transparent_55%)] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#e5f0ff] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-0.5" />
                        Live Preview
                      </span>
                      <span className="text-[11px] text-[#94a3b8] flex items-center gap-1">
                        {platform.icon}
                        <span>{platform.name}</span>
                      </span>
                    </div>

                    {previewMode === "none" && (
                      <div className="flex flex-col items-center justify-center h-[140px] text-center text-xs text-[#94a3b8]">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                          <Play size={22} className="text-[#38bdf8]" />
                        </div>
                        <p className="max-w-[220px]">
                          Your preview will appear here as soon as you add your
                          profile or link.
                        </p>
                      </div>
                    )}

                    {previewMode === "profile" && (
                      <div className="flex items-center gap-3 mt-1">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0ea5e9] via-[#6366f1] to-[#0f172a] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_22px_rgba(59,130,246,0.7)]">
                            {avatarInitial}
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#22C55E] border border-[#020617]">
                            <span className="w-2 h-2 bg-white rounded-full" />
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-white">
                            {displayHandle || "Profile Preview"}
                          </span>
                          <span className="text-[11px] text-[#9ca3af]">
                            {platform.name} profile preview · Followers package
                          </span>
                        </div>
                      </div>
                    )}

                    {previewMode === "content" && (
                      <div className="mt-1 space-y-2">
                        <div className="relative w-full h-[110px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] border border-white/10 flex items-center justify-center">
                          <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_top,_#38bdf8,_transparent_55%),radial-gradient(circle_at_bottom,_#4f46e5,_transparent_55%)]" />
                          <div className="relative z-10 flex flex-col items-center">
                            <div className="w-11 h-11 rounded-full bg-black/60 flex items-center justify-center border border-white/15 shadow-[0_0_18px_rgba(15,23,42,0.8)]">
                              <Play size={24} className="text-white" />
                            </div>
                            <span className="mt-2 text-[11px] text-[#e5e7eb]">
                              {platform.name} content preview
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] text-[#9ca3af]">
                            {truncatedLink || "Waiting for your link..."}
                          </span>
                          <span className="text-[11px] text-[#6b7280]">
                            This is a visual preview only. Your order will be
                            processed instantly after payment.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-4 text-[#EF4444] text-center text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-between mt-4">
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
