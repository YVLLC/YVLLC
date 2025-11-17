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

type StealthPackageResult = { pkg: string; type: string };

type PreviewData = {
  ok: boolean;
  type?: string;
  image?: string | null;
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
// PACKAGE TYPE PREP
// ==============================
function getStealthPackage(
  platform: Platform,
  service: Service
): StealthPackageResult {
  let pkg = "Premium Package";
  let type = "Standard";

  if (platform.key === "instagram" && service.type === "Followers")
    pkg = "Insta Growth";
  if (platform.key === "instagram" && service.type === "Likes")
    pkg = "Insta Engage";
  if (platform.key === "tiktok") pkg = "TikTok Turbo";
  if (platform.key === "youtube") pkg = "YouTube Boost";

  if (service.type === "Followers" || service.type === "Subscribers")
    type = "Growth";
  if (service.type === "Likes") type = "Engagement";
  if (service.type === "Views") type = "Boost";

  return { pkg, type };
}

// ==============================
// QUICK AMOUNTS
// ==============================
function getQuickAmounts(platform: Platform, service: Service) {
  const type = service.type.toString().toLowerCase();
  const key = platform.key;

  if (key === "instagram" && type === "views")
    return [500, 2000, 5000, 10000, 20000, 50000];
  if (key === "instagram" && type === "followers")
    return [100, 200, 350, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
  if (key === "instagram" && type === "likes")
    return [50, 100, 300, 500, 1000, 2000, 5000, 10000, 20000];
  if (key === "tiktok" && (type === "followers" || type === "likes"))
    return [100, 250, 500, 1000, 2000, 5000, 10000];
  if (key === "tiktok" && type === "views")
    return [1000, 2000, 5000, 10000, 20000, 50000];
  if (key === "youtube" && type === "views")
    return [200, 500, 1000, 2000, 5000, 10000];
  if (key === "youtube" && type === "subscribers")
    return [200, 500, 1000, 2000, 5000, 10000];
  if (key === "youtube" && type === "likes")
    return [250, 500, 1000, 2000, 5000, 10000];

  return [100, 500, 1000, 2000, 5000, 10000, 25000, 50000];
}

// ==============================
// LIVE PREVIEW FETCHER
// ==============================
async function fetchPreview(
  platform: string,
  target: string
): Promise<PreviewData> {
  try {
    const res = await fetch(
      `/api/preview?platform=${platform}&target=${encodeURIComponent(target)}`
    );
    return await res.json();
  } catch (err) {
    console.error("Preview Fetch Error", err);
    return { ok: false };
  }
}

// ==============================
// PROPS
// ==============================
type OrderModalProps = {
  open: boolean;
  onClose: () => void;
  initialPlatform?: string;
  initialService?: string;
};

// ==============================
// COMPONENT
// ==============================
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

  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Lock scroll when modal open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Init state from initial props
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
    setPreview(null);
    setPreviewLoading(false);
  }, [open, initialPlatform, initialService]);

  // Determine whether this is "content engagement" (likes/views are link-only)
  const isContentEngagement =
    service.type === "Likes" || service.type === "Views";

  // Preview fetch effect (only on Details step)
  useEffect(() => {
    if (!open || step !== 2) return;
    const trimmed = target.trim();
    if (!trimmed) {
      setPreview(null);
      setPreviewLoading(false);
      return;
    }

    // If it's followers/subscribers and they only put a username, we still try preview.
    setPreviewLoading(true);
    let cancelled = false;

    (async () => {
      const data = await fetchPreview(platform.key, trimmed);
      if (cancelled) return;
      setPreview(data);
      setPreviewLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [open, step, platform.key, target, service.type]);

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

  // ==============================
  // VALIDATION & NAVIGATION
  // ==============================
  function handleBack() {
    setError("");
    setStep((prev) => Math.max(0, prev - 1));
  }

  function handleNextFromDetails() {
    const trimmed = target.trim();

    if (!trimmed) {
      setError(
        isContentEngagement
          ? "Paste the full post / video link."
          : "Paste your profile link or username."
      );
      return;
    }

    if (isContentEngagement && !trimmed.toLowerCase().includes("http")) {
      setError("For likes / views, please paste a full post or video URL.");
      return;
    }

    if (!quantity || quantity < 1) {
      setError("Select a valid amount.");
      return;
    }

    setError("");
    setStep(3);
  }

  function handleSecureCheckout(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = target.trim();
    if (!trimmed) {
      setError(
        isContentEngagement
          ? "Paste the full post / video link."
          : "Paste your profile link or username."
      );
      return;
    }
    if (isContentEngagement && !trimmed.toLowerCase().includes("http")) {
      setError("For likes / views, please paste a full post or video URL.");
      return;
    }

    setError("");
    const orderString = btoa(
      unescape(encodeURIComponent(JSON.stringify(orderToSend)))
    );
    window.location.href =
      "https://checkout.yesviral.com/checkout?order=" + orderString;
  }

  // ==============================
  // TARGET LABEL & PLACEHOLDER
  // ==============================
  function getTargetLabel() {
    if (service.type === "Followers" || service.type === "Subscribers") {
      return "Profile or Username";
    }
    return "Post / Video Link";
  }

  function getTargetPlaceholder() {
    if (service.type === "Followers" || service.type === "Subscribers") {
      if (platform.key === "instagram")
        return "e.g. @yourusername or instagram.com/yourusername";
      if (platform.key === "tiktok")
        return "e.g. @yourusername or tiktok.com/@yourusername";
      if (platform.key === "youtube")
        return "e.g. Channel URL or @handle";
      return "Profile link or username";
    }

    // Likes / Views
    if (platform.key === "instagram")
      return "Paste your Instagram post / reel link";
    if (platform.key === "tiktok")
      return "Paste your TikTok video link";
    if (platform.key === "youtube")
      return "Paste your YouTube video link";

    return "Paste your post / video link";
  }

  // ==============================
  // PREVIEW CARD
  // ==============================
  function PreviewCard({ compact = false }: { compact?: boolean }) {
    const hasImage = preview && preview.ok && preview.image;

    return (
      <div
        className={
          "w-full rounded-2xl border border-[#CFE4FF] bg-[#F5FAFF] shadow-sm overflow-hidden flex flex-col" +
          (compact ? " max-w-md mx-auto" : "")
        }
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E0ECFF] bg-white/70">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E6F0FF]">
            {platform.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#007BFF] uppercase tracking-wide">
              Live Preview
            </span>
            <span className="text-xs text-[#777]">
              {service.type === "Followers" || service.type === "Subscribers"
                ? "Profile preview (when available)"
                : "Post / video preview"}
            </span>
          </div>
        </div>

        {/* Media */}
        <div className="relative w-full">
          <div className="relative w-full overflow-hidden bg-[#DAE6FF]">
            {/* 16:9 shell so it's never cut weird */}
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              {previewLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border-[3px] border-[#CFE4FF] border-t-[#007BFF] animate-spin" />
                </div>
              )}

              {!previewLoading && hasImage && (
                <div className="absolute inset-0">
                  {/* background image so it always fully covers without cutting */}
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${preview!.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              )}

              {!previewLoading && !hasImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center text-center gap-2 px-4">
                    <div className="w-10 h-10 rounded-xl bg-[#E6F0FF] flex items-center justify-center">
                      {platform.icon}
                    </div>
                    <p className="text-xs text-[#555] font-medium">
                      Preview will appear here for most profiles & posts once
                      you paste a valid link or username.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-white flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#222] truncate max-w-[220px]">
              {target || "Waiting for your profile / link..."}
            </span>
            <span className="text-[11px] text-[#777]">
              This doesn’t affect delivery. It’s just a visual preview.
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#007BFF] bg-[#E6F0FF] px-2 py-1 rounded-full">
            {platform.name}
          </span>
        </div>
      </div>
    );
  }

  // ==============================
  // RENDER
  // ==============================
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

          {/* Step Circles & Labels */}
          <div className="relative w-full flex items-center justify-between mt-4 px-2 z-10">
            {steps.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center flex-1 min-w-0"
              >
                <div
                  className={`flex items-center justify-center rounded-full border-4 font-bold text-base transition-all duration-300 ${
                    step === i
                      ? "bg-[#007BFF] text-white border-[#007BFF] shadow"
                      : step > i
                      ? "bg-[#E6F0FF] text-[#007BFF] border-[#007BFF]"
                      : "bg-[#E6F0FF] text-[#888] border-[#E6F0FF]"
                  }`}
                  style={{
                    width: 36,
                    height: 36,
                    zIndex: 2,
                    boxShadow:
                      step === i ? "0 2px 10px #007BFF20" : undefined,
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

          {/* Animated Line UNDER steps */}
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
              className="absolute left-0 top-1/2 h-2"
              style={{
                width: `${(step / (steps.length - 1)) * 100}%`,
                background:
                  "linear-gradient(90deg, #007BFF 0%, #005FCC 100%)",
                boxShadow: "0 0 12px #007bff66",
                transform: "translateY(-50%)",
                borderRadius: 9999,
                transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>
        </div>

        {/* Content */}
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
                    className={`rounded-xl flex flex-col items-center gap-1 px-6 py-5 border-2 font-bold text-sm shadow hover:shadow-lg transition ${
                      platform.key === p.key
                        ? "border-[#007BFF] bg-[#E6F0FF] text-[#007BFF] scale-105"
                        : "border-[#CFE4FF] text-[#111111] bg-white"
                    }`}
                    style={{
                      minWidth: 110,
                      minHeight: 90,
                    }}
                    onClick={() => {
                      setPlatform(p);
                      setService(p.services[0]);
                      setStep(1);
                      setError("");
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
                  const { discount: disc, discounted: discPrice } =
                    getDiscountedPrice(s.price);
                  return (
                    <button
                      key={s.type}
                      className={`rounded-xl flex items-center justify-between px-6 py-4 border-2 text-lg font-bold shadow hover:shadow-xl transition group ${
                        service.type === s.type
                          ? "border-[#007BFF] bg-[#E6F0FF] text-[#007BFF] scale-105"
                          : "border-[#CFE4FF] text-[#111111] bg-white"
                      }`}
                      onClick={() => {
                        setService(s);
                        setStep(2);
                        setError("");
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {s.icon}
                        <span>{s.type}</span>
                        {disc > 0 && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-[#E6F0FF] text-[#007BFF] text-xs font-bold flex items-center gap-1">
                            <Tag
                              size={14}
                              className="mr-0.5 text-[#007BFF]"
                            />
                            -{disc}%
                          </span>
                        )}
                      </div>
                      <span className="font-normal text-[15px] text-[#888] flex items-center gap-2">
                        <span className="line-through text-[#c7c7c7]">
                          ${s.price.toFixed(2)}
                        </span>
                        <span className="font-bold text-[#007BFF]">
                          ${discPrice.toFixed(2)}/ea
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

          {/* STEP 2: DETAILS */}
          {step === 2 && (
            <div>
              <h3 className="font-black text-2xl mb-7 text-[#111111] text-center">
                Order Details
              </h3>
              <div className="space-y-8">
                {/* LAYOUT: COLUMN ON MOBILE, SIDE-BY-SIDE ON DESKTOP */}
                <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                  <div className="md:w-1/2 w-full space-y-6">
                    {/* TARGET INPUT */}
                    <div className="flex flex-col">
                      <label className="block font-semibold text-[#007BFF] mb-2 text-lg">
                        {getTargetLabel()}
                      </label>
                      <input
                        type="text"
                        autoFocus
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="w-full border border-[#CFE4FF] rounded-xl px-4 py-3 text-base font-medium outline-none bg-white/90 shadow focus:border-[#007BFF] focus:ring-2 focus:ring-[#E6F0FF] transition"
                        placeholder={getTargetPlaceholder()}
                      />
                      <span className="mt-2 text-xs text-[#777]">
                        {
                          isContentEngagement
                            ? "For likes / views, you must paste the full post or video URL."
                            : "For followers / subscribers, you can use a username or full profile URL."
                        }
                      </span>
                    </div>

                    {/* AMOUNT SELECTOR */}
                    <div className="flex flex-col items-center gap-3 w-full">
                      <span className="text-[#111] text-base font-semibold">
                        Amount
                      </span>
                      <div className="flex gap-2 flex-wrap justify-center w-full">
                        {getQuickAmounts(platform, service).map((val) => (
                          <button
                            key={val}
                            type="button"
                            className={`rounded-full px-5 py-2 font-bold border text-sm shadow transition ${
                              quantity === val
                                ? "bg-[#007BFF] text-white border-[#007BFF]"
                                : "bg-[#E6F0FF] text-[#007BFF] border-[#CFE4FF] hover:bg-[#E0ECFF] hover:border-[#007BFF]"
                            }`}
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

                    {error && (
                      <div className="mt-2 text-[#EF4444] text-center text-sm">
                        {error}
                      </div>
                    )}
                  </div>

                  {/* PREVIEW SIDE */}
                  <div className="mt-8 md:mt-0 md:w-1/2 w-full">
                    <PreviewCard />
                  </div>
                </div>
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
                  onClick={handleNextFromDetails}
                >
                  Review
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 3 && (
            <form onSubmit={handleSecureCheckout}>
              <h3 className="font-black text-2xl mb-5 text-[#111] text-center">
                Review & Secure Checkout
              </h3>

              {/* REVIEW SUMMARY */}
              <div className="bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl px-6 py-7 mb-7 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  {platform.icon}
                  <span className="font-semibold text-lg">
                    {platform.name}
                  </span>
                  <span className="ml-3 px-3 py-1 rounded-full bg-[#E6F0FF] text-[#007BFF] font-semibold text-xs">
                    {service.type}
                  </span>
                </div>
                <div className="text-[#444] text-sm">
                  <b>Package:</b> {pkg} ({type})
                </div>
                <div className="text-[#444] text-sm">
                  <b>Target:</b> {target}
                </div>
                <div className="text-[#444] text-sm">
                  <b>Amount:</b> {quantity.toLocaleString()}
                </div>
                <div className="text-[#444] text-sm">
                  <b>Price:</b>{" "}
                  <span className="text-[#007BFF] font-semibold">
                    ${discounted.toFixed(3)}/ea
                  </span>{" "}
                  <span className="text-[#c7c7c7] line-through">
                    ${service.price.toFixed(3)}/ea
                  </span>
                </div>
                <div className="mt-2 font-extrabold text-lg text-[#007BFF]">
                  Total: ${(discounted * quantity).toFixed(2)}
                </div>
              </div>

              {/* PREVIEW AGAIN - COMPACT */}
              <PreviewCard compact />

              {error && (
                <div className="mt-4 text-[#EF4444] text-center text-sm">
                  {error}
                </div>
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
            background: #d3e5ff;
            color: #005fcc;
          }
        }
        .animate-flashSale {
          animation: flashSaleBlue 2.5s infinite;
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
