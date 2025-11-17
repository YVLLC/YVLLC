// path: components/OrderModal.tsx
import { useState, useEffect, useMemo, useCallback } from "react";
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
  Play,
} from "lucide-react";

// ==============================
// TYPES
// ==============================
type ServiceType = "Followers" | "Likes" | "Views" | "Subscribers";
type Service = { type: ServiceType | string; price: number; icon: JSX.Element };
type Platform = { key: string; name: string; color: string; icon: JSX.Element; services: Service[] };
type StealthPackageResult = { pkg: string; type: string };
type PreviewData = { ok: boolean; type?: string; image?: string | null; error?: string };

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
      { type: "Followers", price: 0.09, icon: <UserPlus size={17} className="text-[#E1306C]" /> },
      { type: "Likes", price: 0.07, icon: <ThumbsUp size={17} className="text-[#E1306C]" /> },
      { type: "Views", price: 0.04, icon: <Eye size={17} className="text-[#E1306C]" /> },
    ],
  },
  {
    key: "tiktok",
    name: "TikTok",
    color: "#00F2EA",
    icon: <Music2 className="text-[#00F2EA]" size={26} />,
    services: [
      { type: "Followers", price: 0.1, icon: <UserPlus size={17} className="text-[#00F2EA]" /> },
      { type: "Likes", price: 0.08, icon: <ThumbsUp size={17} className="text-[#00F2EA]" /> },
      { type: "Views", price: 0.06, icon: <Eye size={17} className="text-[#00F2EA]" /> },
    ],
  },
  {
    key: "youtube",
    name: "YouTube",
    color: "#FF0000",
    icon: <Youtube className="text-[#FF0000]" size={26} />,
    services: [
      { type: "Subscribers", price: 0.12, icon: <UserPlus size={17} className="text-[#FF0000]" /> },
      { type: "Likes", price: 0.09, icon: <ThumbsUp size={17} className="text-[#FF0000]" /> },
      { type: "Views", price: 0.05, icon: <Eye size={17} className="text-[#FF0000]" /> },
    ],
  },
];

const steps = [{ label: "Platform" }, { label: "Service" }, { label: "Details" }, { label: "Review" }];

// ==============================
// DISCOUNT CALC
// ==============================
function getDiscountedPrice(price: number) {
  const discount = 0.02 + Math.random() * 0.02;
  return { discount: Math.round(discount * 100), discounted: Number((price * (1 - discount)).toFixed(3)) };
}

// ==============================
// PACKAGE TYPE PREP
// ==============================
function getStealthPackage(platform: Platform, service: Service): StealthPackageResult {
  let pkg = "Premium Package";
  let type = "Standard";
  if (platform.key === "instagram" && service.type === "Followers") pkg = "Insta Growth";
  if (platform.key === "instagram" && service.type === "Likes") pkg = "Insta Engage";
  if (platform.key === "tiktok") pkg = "TikTok Turbo";
  if (platform.key === "youtube") pkg = "YouTube Boost";

  if (service.type === "Followers" || service.type === "Subscribers") type = "Growth";
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

  if (key === "instagram" && type === "views") return [500, 2000, 5000, 10000, 20000, 50000];
  if (key === "instagram" && type === "followers")
    return [100, 200, 350, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
  if (key === "instagram" && type === "likes") return [50, 100, 300, 500, 1000, 2000, 5000, 10000, 20000];
  if (key === "tiktok" && (type === "followers" || type === "likes")) return [100, 250, 500, 1000, 2000, 5000, 10000];
  if (key === "tiktok" && type === "views") return [1000, 2000, 5000, 10000, 20000, 50000];
  if (key === "youtube" && type === "views") return [200, 500, 1000, 2000, 5000, 10000];
  if (key === "youtube" && type === "subscribers") return [200, 500, 1000, 2000, 5000, 10000];
  if (key === "youtube" && type === "likes") return [250, 500, 1000, 2000, 5000, 10000];
  return [100, 500, 1000, 2000, 5000, 10000, 25000, 50000];
}

// ==============================
// LIVE PREVIEW FETCHER
// ==============================
async function fetchPreview(platform: string, target: string): Promise<PreviewData> {
  try {
    const res = await fetch(`/api/preview?platform=${platform}&target=${encodeURIComponent(target)}`);
    return await res.json();
  } catch {
    return { ok: false, error: "Network error" };
  }
}

// ==============================
// UTILS
// ==============================
const isLink = (t: string) => /^https?:\/\//i.test(t.trim());
function normalizeHandle(platform: Platform, target: string) {
  const raw = target.trim();
  if (!raw) return "";
  if (isLink(raw)) return raw.replace(/^https?:\/\//, "");
  if (raw.startsWith("@")) return raw;
  if (["instagram", "tiktok", "youtube"].includes(platform.key)) return `@${raw}`;
  return raw;
}
function hashToHsl(seed: string, s = 65, l = 58) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360} ${s}% ${l}%)`;
}

// ==============================
// ImageSafe (tiny, no controls)
// ==============================
function ImageSafe({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="absolute inset-0">
      {!loaded && !failed && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#EAF2FF] via-[#F5FAFF] to-white" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded && !failed ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
      {failed && <div className="absolute inset-0 bg-[#EEF4FF]" />}
    </div>
  );
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
export default function OrderModal({ open, onClose, initialPlatform, initialService }: OrderModalProps) {
  const [step, setStep] = useState(0);
  const [platform, setPlatform] = useState<Platform>(PLATFORMS[0]);
  const [service, setService] = useState<Service>(PLATFORMS[0].services[0]);
  const [quantity, setQuantity] = useState<number>(100);
  const [target, setTarget] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Init state
  useEffect(() => {
    if (!open) return;

    let selectedPlatform = PLATFORMS[0];
    let selectedService = PLATFORMS[0].services[0];
    let stepToSet = 0;

    if (initialPlatform) {
      const foundPlat = PLATFORMS.find(
        (p) => p.key === initialPlatform.toLowerCase() || p.name.toLowerCase() === initialPlatform.toLowerCase()
      );
      if (foundPlat) {
        selectedPlatform = foundPlat;
        if (initialService) {
          const foundServ = foundPlat.services.find((s) => s.type.toLowerCase() === initialService.toLowerCase());
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

  const isContentEngagement = service.type === "Likes" || service.type === "Views";
  const isVideo = useMemo(() => isContentEngagement && isLink(target), [isContentEngagement, target]);

  // Preview: ONLY in Review step
  const doFetchPreview = useCallback(
    async () => {
      if (!open || step !== 3) return;
      const trimmed = target.trim();
      if (!trimmed) {
        setPreview(null);
        setPreviewLoading(false);
        return;
      }
      if (isContentEngagement && !isLink(trimmed)) {
        setPreview({ ok: false, error: "Post / video URL required for preview." });
        return;
      }
      setPreviewLoading(true);
      const data = await fetchPreview(platform.key, trimmed);
      setPreview(data);
      setPreviewLoading(false);
    },
    [open, step, target, platform.key, isContentEngagement]
  );

  useEffect(() => {
    if (step !== 3) return;
    const id = setTimeout(() => void doFetchPreview(), 150);
    return () => clearTimeout(id);
  }, [doFetchPreview, step]);

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
      setError(isContentEngagement ? "Paste the full post / video link." : "Paste your profile link or username.");
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
      setError(isContentEngagement ? "Paste the full post / video link." : "Paste your profile link or username.");
      return;
    }
    if (isContentEngagement && !trimmed.toLowerCase().includes("http")) {
      setError("For likes / views, please paste a full post or video URL.");
      return;
    }

    setError("");
    const orderString = btoa(unescape(encodeURIComponent(JSON.stringify(orderToSend))));
    window.location.href = "https://checkout.yesviral.com/checkout?order=" + orderString;
  }

  // ==============================
  // TARGET LABEL & PLACEHOLDER
  // ==============================
  function getTargetLabel() {
    if (service.type === "Followers" || service.type === "Subscribers") return "Profile or Username";
    return "Post / Video Link";
  }

  function getTargetPlaceholder() {
    if (service.type === "Followers" || service.type === "Subscribers") {
      if (platform.key === "instagram") return "e.g. @yourusername or instagram.com/yourusername";
      if (platform.key === "tiktok") return "e.g. @yourusername or tiktok.com/@yourusername";
      if (platform.key === "youtube") return "e.g. Channel URL or @handle";
      return "Profile link or username";
    }
    if (platform.key === "instagram") return "Paste your Instagram post / reel link";
    if (platform.key === "tiktok") return "Paste your TikTok video link";
    if (platform.key === "youtube") return "Paste your YouTube video link";
    return "Paste your post / video link";
  }

  // ==============================
  // SERVICE SUMMARY (concise, above Amount)
  // ==============================
  function ServiceSummary() {
    return (
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold"
        style={{ borderColor: COLORS.border, background: "#F7FBFF" }}
        aria-live="polite"
      >
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full" style={{ background: COLORS.accentBg }}>
          {platform.icon}
        </span>
        <span className="text-[#0B63E6]">{platform.name}</span>
        <span className="opacity-40">•</span>
        <span className="inline-flex items-center gap-1 text-[#334155]">
          {service.icon}
          {service.type}
        </span>
      </div>
    );
  }

  // ==============================
  // AMOUNT SELECTOR — SIMPLE, PREMIUM
  // ==============================
  function Pill({
    label,
    selected,
    onClick,
    ariaLabel,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
    ariaLabel: string;
  }) {
    return (
      <button
        type="button"
        role="radio"
        aria-checked={selected}
        aria-label={ariaLabel}
        onClick={onClick}
        className={[
          "flex-none h-12 min-w-[88px] px-4 rounded-full border text-sm font-bold tracking-tight",
          "transition-all select-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#BFD9FF]",
          selected
            ? "bg-[#007BFF] text-white border-[#007BFF] shadow-[0_8px_18px_rgba(0,123,255,.25)]"
            : "bg-white text-[#0B63E6] border-[#DCEBFF] hover:border-[#7FB5FF] hover:bg-[#F6FAFF]",
        ].join(" ")}
      >
        {label}
      </button>
    );
  }

  function AmountSelector() {
    const options = getQuickAmounts(platform, service);
    const toLabel = (v: number) => (v >= 1000 ? `${v / 1000}K` : `${v}`);
    const ariaService = `${platform.name} ${service.type}`;

    return (
      <div className="w-full max-w-[640px]">
        {/* Dynamic callout: "How many Instagram Followers?" */}
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-extrabold text-[#0B63E6]">
            How many {platform.name} {service.type}?
          </h4>
          <ServiceSummary />
        </div>

        {/* Mobile: horizontal scroll pills */}
        <div
          className="sm:hidden flex overflow-x-auto gap-2 pb-1 snap-x snap-mandatory"
          role="radiogroup"
          aria-label={`Select amount of ${ariaService}`}
        >
          {options.map((v) => (
            <div key={v} className="snap-start">
              <Pill
                label={toLabel(v)}
                selected={quantity === v}
                onClick={() => setQuantity(v)}
                ariaLabel={`${v} ${ariaService}`}
              />
            </div>
          ))}
        </div>

        {/* Desktop: tidy grid */}
        <div
          className="hidden sm:grid grid-cols-3 md:grid-cols-4 gap-2"
          role="radiogroup"
          aria-label={`Select amount of ${ariaService}`}
        >
          {options.map((v) => (
            <Pill
              key={v}
              label={toLabel(v)}
              selected={quantity === v}
              onClick={() => setQuantity(v)}
              ariaLabel={`${v} ${ariaService}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // ==============================
  // PREVIEW MINI (Review-only, small)
  // ==============================
  function PreviewMini() {
    const hasImg = !!(preview && preview.ok && preview.image);
    const normalized = normalizeHandle(platform, target || "");
    const avatarHue = hashToHsl(normalized || platform.name);

    return (
      <div
        className="w-full max-w-sm rounded-xl border bg-white shadow-sm overflow-hidden mx-auto"
        style={{ borderColor: COLORS.border }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b bg-white/80" style={{ borderColor: "#E0ECFF" }}>
          <div className="flex items-center justify-center w-7 h-7 rounded-full" style={{ background: COLORS.accentBg }}>
            {platform.icon}
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold" style={{ color: COLORS.primary }}>
              Preview
            </span>
            <div className="text-[10px] text-[#6B7280]">
              {isContentEngagement ? "Post / video" : "Profile"}
            </div>
          </div>
        </div>

        {/* Media: SMALL 4:3 thumbnail, capped height */}
        <div className="relative w-full bg-[#DAE6FF]">
          <div className="relative w-full" style={{ paddingTop: "75%", maxHeight: 140 }}>
            {previewLoading && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#EAF2FF] via-[#F5FAFF] to-white" />}

            {!previewLoading && hasImg && (
              <>
                <ImageSafe src={preview!.image as string} alt="Content preview" />
                {isContentEngagement && isLink(target) && (
                  <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 text-white text-[9px]">
                    <Play size={10} />
                    Video
                  </div>
                )}
              </>
            )}

            {!previewLoading && !hasImg && (
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className="w-[52%] max-w-[120px] aspect-square rounded-xl shadow grid place-items-center text-white font-extrabold text-xl"
                  style={{
                    background: `linear-gradient(135deg, ${avatarHue}, ${avatarHue.replace("% 58%)", "% 42%)")})`,
                  }}
                >
                  {normalized.replace(/^@/, "").slice(0, 2).toUpperCase() || platform.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 py-2 bg-white flex items-center justify-between">
          <div className="min-w-0">
            <span className="block text-[11px] font-semibold text-[#111] truncate max-w-[220px]">
              {normalized || "—"}
            </span>
            <span className="text-[10px] text-[#6B7280]">Visual only</span>
          </div>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ color: platform.color, background: `${platform.color}14`, border: `1px solid ${platform.color}26` }}
          >
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
            <span className="font-extrabold text-lg tracking-tight" style={{ color: platform.color }}>
              {platform.name}
            </span>
          </div>

          {/* Steps */}
          <div className="relative w-full flex items-center justify-between mt-4 px-2 z-10">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center flex-1 min-w-0">
                <div
                  className={`flex items-center justify-center rounded-full border-4 font-bold text-base transition-all duration-300 ${
                    step === i
                      ? "bg-[#007BFF] text-white border-[#007BFF] shadow"
                      : step > i
                      ? "bg-[#E6F0FF] text-[#007BFF] border-[#007BFF]"
                      : "bg-[#E6F0FF] text-[#888] border-[#E6F0FF]"
                  }`}
                  style={{ width: 36, height: 36, zIndex: 2, boxShadow: step === i ? "0 2px 10px #007BFF20" : undefined }}
                >
                  {i + 1}
                </div>
                <span className={`mt-2 text-xs font-semibold ${step === i ? "text-[#007BFF]" : "text-[#888]"}`}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="relative w-full h-3 mt-2 mb-[-8px] px-3 flex items-center">
            <div className="absolute left-0 top-1/2 w-full h-2 rounded-full" style={{ background: COLORS.accentBg, transform: "translateY(-50%)" }} />
            <div
              className="absolute left-0 top-1/2 h-2"
              style={{
                width: `${(step / (steps.length - 1)) * 100}%`,
                background: "linear-gradient(90deg, #007BFF 0%, #005FCC 100%)",
                boxShadow: "0 0 12px #007bff66",
                transform: "translateY(-50%)",
                borderRadius: 9999,
                transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-7 rounded-b-3xl" style={{ background: COLORS.background }}>
          {/* STEP 0: PLATFORM */}
          {step === 0 && (
            <div>
              <h3 className="font-black text-2xl mb-7 text-[#111111] text-center tracking-tight">Choose Platform</h3>
              <div className="flex justify-center gap-5 sm:gap-8 flex-wrap">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.key}
                    className={`rounded-xl flex flex-col items-center gap-1 px-6 py-5 border-2 font-bold text-sm shadow hover:shadow-lg transition ${
                      platform.key === p.key ? "border-[#007BFF] bg-[#E6F0FF] text-[#007BFF] scale-105" : "border-[#CFE4FF] text-[#111111] bg-white"
                    }`}
                    style={{ minWidth: 110, minHeight: 90 }}
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
                  const { discount: disc, discounted: discPrice } = getDiscountedPrice(s.price);
                  return (
                    <button
                      key={s.type}
                      className={`rounded-xl flex items-center justify-between px-6 py-4 border-2 text-lg font-bold shadow hover:shadow-xl transition group ${
                        service.type === s.type ? "border-[#007BFF] bg-[#E6F0FF] text-[#007BFF] scale-105" : "border-[#CFE4FF] text-[#111111] bg-white"
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
                            <Tag size={14} className="mr-0.5 text-[#007BFF]" />
                            -{disc}%
                          </span>
                        )}
                      </div>
                      <span className="font-normal text-[15px] text-[#888] flex items-center gap-2">
                        <span className="line-through text-[#c7c7c7]">${s.price.toFixed(2)}</span>
                        <span className="font-bold text-[#007BFF]">${discPrice.toFixed(2)}/ea</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <button className="block mx-auto mt-7 text-[#007BFF] underline text-sm" onClick={handleBack}>
                ← Back
              </button>
            </div>
          )}

          {/* STEP 2: DETAILS (NO PREVIEW) */}
          {step === 2 && (
            <div>
              <h3 className="font-black text-2xl mb-7 text-[#111111] text-center">Order Details</h3>
            <div className="space-y-8">
              <div className="flex flex-col gap-6">
                {/* TARGET INPUT */}
                <div className="flex flex-col">
                  <label className="block font-semibold text-[#007BFF] mb-2 text-lg">{getTargetLabel()}</label>
                  <input
                    type="text"
                    autoFocus
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full border border-[#CFE4FF] rounded-xl px-4 py-3 text-base font-medium outline-none bg-white/90 shadow focus:border-[#007BFF] focus:ring-2 focus:ring-[#E6F0FF] transition"
                    placeholder={getTargetPlaceholder()}
                  />
                  <span className="mt-2 text-xs text-[#777]">
                    {isContentEngagement
                      ? "For likes / views, you must paste the full post or video URL."
                      : "For followers / subscribers, you can use a username or full profile URL."}
                  </span>
                </div>

                {/* AMOUNT SELECTOR — SIMPLE PILLS + SERVICE SUMMARY */}
                <div className="flex flex-col items-center gap-3 w-full">
                  <AmountSelector />
                  <span className="font-bold text-[#007BFF] text-xl mt-2">
                    Total: <span className="text-[#007BFF]">${(discounted * quantity).toFixed(2)}</span>
                    <span className="ml-2 text-sm text-[#c7c7c7] line-through">${(service.price * quantity).toFixed(2)}</span>
                  </span>
                </div>

                {error && <div className="mt-2 text-[#EF4444] text-center text-sm">{error}</div>}
              </div>
            </div>

              <div className="flex justify-between mt-8">
                <button
                  className="px-6 py-3 rounded-xl font-bold bg-[#E6F0FF] text-[#007BFF] border border-[#CFE4FF] hover:bg-[#d7eafd] shadow transition text-lg"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button className="px-6 py-3 rounded-xl font-bold bg-[#007BFF] text-white hover:bg-[#005FCC] shadow transition text-lg" onClick={handleNextFromDetails}>
                  Review
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW (Preview lives here, SMALL) */}
          {step === 3 && (
            <form onSubmit={handleSecureCheckout}>
              <h3 className="font-black text-2xl mb-5 text-[#111] text-center">Review & Secure Checkout</h3>

              {/* REVIEW SUMMARY */}
              <div className="bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl px-6 py-7 mb-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  {platform.icon}
                  <span className="font-semibold text-lg">{platform.name}</span>
                  <span className="ml-3 px-3 py-1 rounded-full bg-[#E6F0FF] text-[#007BFF] font-semibold text-xs">{service.type}</span>
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
                  <span className="text-[#007BFF] font-semibold">${discounted.toFixed(3)}/ea</span>{" "}
                  <span className="text-[#c7c7c7] line-through">${service.price.toFixed(3)}/ea</span>
                </div>
                <div className="mt-2 font-extrabold text-lg text-[#007BFF]">Total: ${(discounted * quantity).toFixed(2)}</div>
              </div>

              {/* SMALL PREVIEW */}
              <div className="mb-6">
                <PreviewMini />
              </div>

              {error && <div className="mt-4 text-[#EF4444] text-center text-sm">{error}</div>}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl font-bold bg-[#E6F0FF] text-[#007BFF] border border-[#CFE4FF] hover:bg-[#d7eafd] shadow transition text-lg"
                  onClick={onClickBackSafe(handleBack)}
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
        ::-webkit-scrollbar { width: 0.7em; background: #f7f9ff; }
        ::-webkit-scrollbar-thumb { background: #e6f0ff; border-radius: 8px; }
      `}</style>
    </div>
  );

  // Avoid TS complaining if used above as callback
  function onClickBackSafe(fn: () => void) { return fn; }
}
