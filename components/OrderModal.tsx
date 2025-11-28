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

  // INSTAGRAM
  if (platform.key === "instagram" && service.type === "Followers")
    pkg = "High-Quality Instagram Followers";
  if (platform.key === "instagram" && service.type === "Likes")
    pkg = "Premium Instagram Likes";
  if (platform.key === "instagram" && service.type === "Views")
    pkg = "High-Retention Instagram Views";

  // TIKTOK
  if (platform.key === "tiktok" && service.type === "Followers")
    pkg = "High-Quality TikTok Followers";
  if (platform.key === "tiktok" && service.type === "Likes")
    pkg = "Premium TikTok Likes";
  if (platform.key === "tiktok" && service.type === "Views")
    pkg = "High-Retention TikTok Views";

  // YOUTUBE
  if (platform.key === "youtube" && service.type === "Subscribers")
    pkg = "High-Quality YouTube Subscribers";
  if (platform.key === "youtube" && service.type === "Likes")
    pkg = "Premium YouTube Likes";
  if (platform.key === "youtube" && service.type === "Views")
    pkg = "High-Retention YouTube Views";

  if (service.type === "Followers" || service.type === "Subscribers") type = "High-Quality";
  if (service.type === "Likes") type = "Premium";
  if (service.type === "Views") type = "High-Retention";

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
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#EAF2FF] via-[#F5FAFF] to-white" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          loaded && !failed ? "opacity-100" : "opacity-0"
        }`}
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

  const isContentEngagement = service.type === "Likes" || service.type === "Views";
  const isVideo = useMemo(
    () => isContentEngagement && isLink(target),
    [isContentEngagement, target]
  );

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
    // 👇 ADDED (required for Stripe metadata → Followiz webhook)
    platform: platform.key,
    service: service.type.toString(),
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
      if (platform.key === "instagram") return "@username or instagram.com/username";
      if (platform.key === "tiktok") return "@username or tiktok.com/@username";
      if (platform.key === "youtube") return "Channel URL or @handle";
      return "Profile link or username";
    }
    if (platform.key === "instagram") return "Paste your Instagram post / reel link";
    if (platform.key === "tiktok") return "Paste your TikTok video link";
    if (platform.key === "youtube") return "Paste your YouTube video link";
    return "Paste your post / video link";
  }

  // ==============================
  // SERVICE SUMMARY
  // ==============================
  function ServiceSummary() {
    return (
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-sm bg-white/90"
        style={{ borderColor: COLORS.border }}
        aria-live="polite"
      >
        <span
          className="inline-flex items-center justify-center w-5 h-5 rounded-full"
          style={{ background: COLORS.accentBg }}
        >
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
  // AMOUNT SELECTOR
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
          "flex-none h-11 min-w-[80px] px-3.5 rounded-full border text-xs sm:text-sm font-bold tracking-tight",
          "transition-all select-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#BFD9FF]",
          selected
            ? "bg-[#007BFF] text-white border-[#007BFF] shadow-[0_10px_30px_rgba(0,123,255,0.35)] scale-[1.02]"
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <h4 className="text-sm font-extrabold text-[#0B63E6]">
            How many {platform.name} {service.type}?
          </h4>
          <ServiceSummary />
        </div>

        <div
          className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-2.5 w-full"
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
  // PREVIEW MINI
  // ==============================
  function PreviewMini() {
    const hasImg = !!(preview && preview.ok && preview.image);
    const normalized = normalizeHandle(platform, target || "");
    const avatarHue = hashToHsl(normalized || platform.name);

    return (
      <div
        className="w-full max-w-sm rounded-2xl border bg-white shadow-[0_16px_60px_rgba(15,23,42,0.12)] overflow-hidden mx-auto"
        style={{ borderColor: COLORS.border }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 px-3 py-2 border-b bg-gradient-to-r from-[#F5FAFF] to-white"
          style={{ borderColor: "#E0ECFF" }}
        >
          <div
            className="flex items-center justify-center w-7 h-7 rounded-full"
            style={{ background: COLORS.accentBg }}
          >
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

        {/* Media */}
        <div className="relative w-full bg-[#DAE6FF]">
          <div className="relative w-full" style={{ paddingTop: "75%", maxHeight: 140 }}>
            {previewLoading && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#EAF2FF] via-[#F5FAFF] to-white" />
            )}

            {!previewLoading && hasImg && (
              <>
                <ImageSafe src={preview!.image as string} alt="Content preview" />
                {isContentEngagement && isLink(target) && isVideo && (
                  <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 text-white text-[9px] backdrop-blur">
                    <Play size={10} />
                    Video
                  </div>
                )}
              </>
            )}

            {!previewLoading && !hasImg && (
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className="w-[52%] max-w-[120px] aspect-square rounded-2xl shadow-xl grid place-items-center text-white font-extrabold text-xl"
                  style={{
                    background: `linear-gradient(135deg, ${avatarHue}, ${avatarHue.replace(
                      "% 58%)",
                      "% 42%)"
                    )})`,
                  }}
                >
                  {normalized
                    .replace(/^@/, "")
                    .slice(0, 2)
                    .toUpperCase() || platform.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 py-2 bg-white flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="block text-[11px] font-semibold text-[#111] truncate max-w-[220px]">
              {normalized || "—"}
            </span>
            <span className="text-[10px] text-[#6B7280]">
              For display purposes only — Not a real-time account preview
            </span>
          </div>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
            style={{
              color: platform.color,
              background: `${platform.color}14`,
              borderColor: `${platform.color}40`,
            }}
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-3 sm:px-4">
      <div
        className="relative w-full max-w-lg sm:max-w-xl lg:max-w-3xl bg-white rounded-3xl border border-[#E2ECFF] shadow-[0_30px_120px_rgba(15,23,42,0.55)] flex flex-col overflow-hidden max-h-[min(700px,calc(100vh-32px))]"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-20 bg-white/95 border border-[#e3edfc] shadow-md rounded-full p-2 hover:bg-[#f8faff] transition"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} className="text-[#0F172A]" />
        </button>

        {/* Header */}
        <div
          className="w-full px-5 sm:px-8 pt-5 pb-4 border-b bg-gradient-to-r from-[#E6F0FF] via-white to-[#F5FAFF]"
          style={{ borderColor: COLORS.border }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pr-6 sm:pr-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-inner border border-[#D1E2FF]">
                {platform.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                  Secure Social Boost
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="font-black text-lg sm:text-xl tracking-tight"
                    style={{ color: platform.color }}
                  >
                    {platform.name} Order
                  </span>
                  <span className="rounded-full bg-white/80 border border-[#D1E2FF] px-2 py-0.5 text-[10px] font-semibold text-[#0F172A]">
                    Encrypted Checkout
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1 text-[11px] text-[#64748B]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                Active delivery network
              </span>
              <span>Real-time processing after payment — no login required.</span>
            </div>
          </div>

          {/* Steps */}
          <div className="mt-4">
            <div className="relative flex items-center justify-between gap-3">
              {/* Track */}
              <div className="absolute left-3 right-3 top-1/2 h-1.5 rounded-full bg-[#DDE9FF]" />
              <div
                className="absolute left-3 top-1/2 h-1.5 rounded-full bg-gradient-to-r from-[#007BFF] to-[#005FCC] shadow-[0_0_18px_rgba(37,99,235,0.7)] transition-[width]"
                style={{
                  width: `${(step / (steps.length - 1)) * 100}%`,
                  transform: "translateY(-50%)",
                }}
              />
              {steps.map((s, i) => (
                <div key={s.label} className="relative flex flex-1 flex-col items-center min-w-0">
                  <div
                    className={`flex items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${
                      step === i
                        ? "bg-[#0F172A] text-white border-[#0F172A] shadow-[0_8px_20px_rgba(15,23,42,0.45)] scale-110"
                        : step > i
                        ? "bg-white text-[#007BFF] border-[#007BFF] shadow-sm"
                        : "bg-white text-[#94A3B8] border-[#E2ECFF]"
                    }`}
                    style={{ width: 28, height: 28, zIndex: 2 }}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`mt-2 text-[11px] font-semibold tracking-tight ${
                      step === i ? "text-[#0F172A]" : "text-[#94A3B8]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[#F8FBFF] px-4 sm:px-7 py-6">
          {/* STEP 0: PLATFORM */}
          {step === 0 && (
            <div className="max-w-3xl mx-auto">
              <h3 className="font-black text-xl sm:text-2xl mb-2 text-[#0F172A] text-center tracking-tight">
                Choose your platform
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] text-center mb-6">
                Pick where you want to grow. You can always change this before checkout.
              </p>

              <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-5">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.key}
                    className={`group rounded-2xl flex flex-col items-center gap-2 px-5 py-4 border text-sm font-semibold shadow-sm hover:shadow-xl transition-transform duration-200 ${
                      platform.key === p.key
                        ? "border-[#007BFF] bg-white text-[#0F172A] scale-[1.03]"
                        : "border-[#DFE9FF] bg-white/90 text-[#0F172A] hover:border-[#B3CCFF]"
                    }`}
                    onClick={() => {
                      setPlatform(p);
                      setService(p.services[0]);
                      setStep(1);
                      setError("");
                    }}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F1F5FF] group-hover:bg-[#E3EEFF]">
                      {p.icon}
                    </div>
                    <span className="text-sm font-bold">{p.name}</span>
                    <span className="text-[10px] text-[#94A3B8]">
                      Optimized packages for {p.name} growth
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <div className="max-w-3xl mx-auto">
              <h3 className="font-black text-xl sm:text-2xl mb-2 text-[#0F172A] text-center tracking-tight">
                {platform.name} Services
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] text-center mb-6">
                Select what you want to boost. Pricing is per unit, with automatic volume discounts.
              </p>

              <div className="flex flex-col gap-3 sm:gap-4">
                {platform.services.map((s) => {
                  const { discount: disc, discounted: discPrice } = getDiscountedPrice(s.price);
                  const selected = service.type === s.type;
                  return (
                    <button
                      key={s.type}
                      className={`rounded-2xl flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border text-sm sm:text-base font-semibold shadow-sm hover:shadow-xl transition-transform duration-150 ${
                        selected
                          ? "border-[#007BFF] bg-white text-[#0F172A] scale-[1.02]"
                          : "border-[#DCE6FF] bg-white/95 text-[#0F172A] hover:border-[#B3C9FF]"
                      }`}
                      onClick={() => {
                        setService(s);
                        setStep(2);
                        setError("");
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F1F5FF]">
                          {s.icon}
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-sm sm:text-base font-bold">{s.type}</span>
                          <span className="text-[11px] text-[#94A3B8]">
                            {s.type === "Followers" || s.type === "Subscribers"
                              ? "High-retention, realistic delivery"
                              : "Boost engagement for existing content"}
                          </span>
                        </div>
                        {disc > 0 && (
                          <span className="ml-1 px-2 py-0.5 rounded-full bg-[#E6F0FF] text-[#007BFF] text-[10px] font-bold inline-flex items-center gap-1 border border-[#C5DAFF]">
                            <Tag size={12} className="text-[#007BFF]" />
                            -{disc}% today
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-end text-right gap-0.5">
                        <span className="text-[11px] text-[#94A3B8]">From</span>
                        <div className="flex items-center gap-2">
                          <span className="line-through text-[11px] text-[#CBD5F0]">
                            ${s.price.toFixed(2)}
                          </span>
                          <span className="font-extrabold text-sm sm:text-base text-[#007BFF]">
                            ${discPrice.toFixed(2)}/ea
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-center mt-6">
                <button
                  className="text-xs sm:text-sm text-[#007BFF] hover:text-[#005FCC] font-semibold"
                  onClick={handleBack}
                >
                  ← Back to platforms
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DETAILS */}
          {step === 2 && (
            <div className="max-w-3xl mx-auto">
              <h3 className="font-black text-xl sm:text-2xl mb-2 text-[#0F172A] text-center tracking-tight">
                Order details
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] text-center mb-7">
                We never ask for your password. Just your profile or post link so our delivery network
                knows where to send your order.
              </p>

              <div className="space-y-7">
                {/* TARGET INPUT */}
                <div className="flex flex-col gap-2.5">
                  <label className="block font-semibold text-[13px] sm:text-sm text-[#0F172A]">
                    {getTargetLabel()}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      autoFocus
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full border border-[#CFE4FF] rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium outline-none bg-white/95 shadow-[0_8px_30px_rgba(148,163,184,0.12)] focus:border-[#007BFF] focus:ring-2 focus:ring-[#E0EDFF] focus:ring-offset-0 transition"
                      placeholder={getTargetPlaceholder()}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF3FF] px-2 py-0.5 text-[10px] text-[#64748B] border border-[#D7E2FF]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                        No password required
                      </span>
                    </div>
                  </div>
                  <span className="mt-1 text-[11px] sm:text-xs text-[#6B7280]">
                    {isContentEngagement
                      ? "For likes / views, paste the full post or video URL from your browser or share link."
                      : "For followers / subscribers, you can use a username or full profile URL."}
                  </span>
                </div>

                {/* AMOUNT SELECTOR + TOTAL */}
                <div className="flex flex-col gap-3 items-center sm:items-start">
                  <AmountSelector />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between w-full max-w-[640px] gap-1 mt-1">
                    <span className="font-extrabold text-lg sm:text-xl text-[#0F172A]">
                      Total:
                      <span className="ml-1 text-[#007BFF]">
                        ${(discounted * quantity).toFixed(2)}
                      </span>
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#94A3B8]">
                      Base:
                      <span className="ml-1 line-through text-[#CBD5F0]">
                        ${(service.price * quantity).toFixed(2)}
                      </span>
                      <span className="ml-2 text-[#22C55E] font-semibold">
                        You save {discount}%
                      </span>
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="mt-1 text-[#EF4444] text-xs sm:text-sm text-center sm:text-left">
                    {error}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 mt-7">
                <button
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold bg-white text-[#007BFF] border border-[#CFE4FF] hover:bg-[#E6F0FF] shadow-sm transition text-sm sm:text-base"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold bg-[#007BFF] text-white hover:bg-[#005FCC] shadow-[0_14px_45px_rgba(37,99,235,0.65)] transition text-sm sm:text-base"
                  onClick={handleNextFromDetails}
                >
                  Review order
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 3 && (
            <form onSubmit={handleSecureCheckout} className="max-w-3xl mx-auto">
              <h3 className="font-black text-xl sm:text-2xl mb-2 text-[#0F172A] text-center tracking-tight">
                Review & secure checkout
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] text-center mb-6">
                Double-check your details. Your order is processed automatically the moment payment clears.
              </p>

              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
                {/* REVIEW SUMMARY */}
                <div className="bg-white border border-[#CFE4FF] rounded-2xl px-4 sm:px-6 py-5 sm:py-7 shadow-[0_18px_70px_rgba(15,23,42,0.18)] space-y-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F1F5FF] border border-[#D5E3FF]">
                        {platform.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#0F172A]">
                          {platform.name}
                        </span>
                        <span className="text-[11px] text-[#94A3B8]">
                          {service.type} package
                        </span>
                      </div>
                    </div>
                    <span className="ml-1 px-3 py-1 rounded-full bg-[#E6F0FF] text-[#007BFF] text-[11px] font-bold border border-[#C5DAFF]">
                      {service.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#334155]">
                    <div className="space-y-1.5">
                      <div>
                        <span className="font-semibold">Package:</span>{" "}
                        <span className="text-[#0F172A]">
                          {pkg} ({type})
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">Amount:</span>{" "}
                        <span>{quantity.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="break-all">
                        <span className="font-semibold">Username / Link:</span>{" "}
                        <span>{target}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Unit price:</span>{" "}
                        <span className="text-[#007BFF] font-semibold">
                          ${discounted.toFixed(3)}/ea
                        </span>{" "}
                        <span className="text-[#CBD5F0] line-through">
                          ${service.price.toFixed(3)}/ea
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-dashed border-[#E2ECFF] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex flex-col gap-0.5 text-[11px] sm:text-xs text-[#64748B]">
                      <span className="inline-flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                        Instant processing after payment
                      </span>
                      <span>No login required. We never store your credentials.</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[11px] text-[#94A3B8]">Total payable</span>
                      <span className="font-black text-lg sm:text-xl text-[#0F172A]">
                        ${(discounted * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* PREVIEW + BADGES */}
                <div className="space-y-4">
                  <PreviewMini />

                  <div className="bg-white/90 border border-[#E1EBFF] rounded-2xl px-4 py-3 shadow-sm space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#0F172A]">
                      <CheckCircle size={16} className="text-[#22C55E]" />
                      <span className="font-semibold">Bank-grade encrypted checkout</span>
                    </div>
                    <ul className="text-[11px] text-[#6B7280] list-disc list-inside space-y-0.5">
                      <li>Processed by Stripe & YesViral’s delivery network</li>
                      <li>Real-time status tracking via your order ID</li>
                      <li>24/7 automatic delivery — even while you sleep</li>
                    </ul>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 text-[#EF4444] text-xs sm:text-sm text-center">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
                <button
                  type="button"
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold bg-white text-[#007BFF] border border-[#CFE4FF] hover:bg-[#E6F0FF] shadow-sm transition text-sm sm:text-base"
                  onClick={onClickBackSafe(handleBack)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold bg-gradient-to-br from-[#007BFF] to-[#005FCC] hover:from-[#005FCC] hover:to-[#007BFF] text-white shadow-[0_18px_70px_rgba(37,99,235,0.85)] transition text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} />
                  Secure checkout
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 0.6em;
          background: #eef3ff;
        }
        ::-webkit-scrollbar-thumb {
          background: #c7d8ff;
          border-radius: 999px;
        }
      `}</style>
    </div>
  );

  // Avoid TS complaining if used above as callback
  function onClickBackSafe(fn: () => void) {
    return fn;
  }
}
