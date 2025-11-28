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
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
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
    if (service.type === "Followers" || service.type === "Subscribers")
      return "Profile or Username";
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
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-tight"
        style={{ borderColor: COLORS.border, background: "#F7FBFF" }}
        aria-live="polite"
      >
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-full"
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
          "flex-none h-10 min-w-[78px] px-3 rounded-full border text-[12px] font-bold tracking-tight",
          "transition-all select-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#BFD9FF] focus-visible:ring-offset-white",
          selected
            ? "bg-[#007BFF] text-white border-[#007BFF] shadow-[0_10px_30px_rgba(0,123,255,.30)]"
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
      <div className="w-full max-w-[640px] mx-auto">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h4 className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#0B63E6]">
            How many {platform.name} {service.type}?
          </h4>
          <div className="hidden sm:block">
            <ServiceSummary />
          </div>
        </div>

        <div className="mb-3 sm:hidden">
          <ServiceSummary />
        </div>

        {/* GRID — MOBILE FRIENDLY */}
        <div
          className="
            grid 
            grid-cols-3 
            sm:grid-cols-4 
            md:grid-cols-5 
            gap-2 
            w-full
          "
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
        className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border bg-white shadow-[0_18px_55px_rgba(15,23,42,0.12)]"
        style={{ borderColor: COLORS.border }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 border-b bg-white/90 px-3 py-2.5"
          style={{ borderColor: "#E0ECFF" }}
        >
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full"
            style={{ background: COLORS.accentBg }}
          >
            {platform.icon}
          </div>
          <div className="min-w-0">
            <span
              className="block text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ color: COLORS.primary }}
            >
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
                {isContentEngagement && isLink(target) && (
                  <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded-full bg-black/65 px-1.5 py-0.5 text-[9px] text-white backdrop-blur">
                    <Play size={10} />
                    {isVideo ? "Video" : "Post"}
                  </div>
                )}
              </>
            )}

            {!previewLoading && !hasImg && (
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className="grid aspect-square w-[52%] max-w-[120px] place-items-center rounded-2xl text-xl font-extrabold text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${avatarHue}, ${avatarHue.replace(
                      "% 58%)",
                      "% 42%)"
                    )})`,
                  }}
                >
                  {normalized.replace(/^@/, "").slice(0, 2).toUpperCase() ||
                    platform.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between bg-white px-3 py-2.5">
          <div className="min-w-0 pr-2">
            <span className="block max-w-[220px] truncate text-[11px] font-semibold text-[#111]">
              {normalized || "—"}
            </span>
            <span className="text-[10px] text-[#6B7280]">
              For display purposes only — Not a real-time account preview
            </span>
          </div>
          <span
            className="rounded-full border px-2 py-0.5 text-[10px] font-semibold"
            style={{
              color: platform.color,
              background: `${platform.color}14`,
              borderColor: `${platform.color}26`,
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-3 py-6 sm:px-4 sm:py-8 backdrop-blur-md">
      {/* Modal Container */}
      <div
        className="
          relative 
          mx-auto 
          flex 
          w-full 
          max-w-xl 
          flex-col 
          overflow-hidden 
          rounded-3xl 
          border 
          border-[#D6E4FF] 
          bg-white 
          shadow-[0_32px_85px_rgba(15,23,42,0.60)]
        "
        style={{ maxHeight: "94vh" }}
      >
        {/* Header */}
        <div
          className="
            relative 
            w-full 
            border-b 
            px-4 
            pb-3 
            pt-5 
            sm:px-6 
            sm:pb-4 
            sm:pt-6
          "
          style={{
            background:
              "linear-gradient(120deg, #E6F0FF 0%, #FFFFFF 40%, #E6F0FF 100%)",
            borderColor: COLORS.border,
            boxShadow: "0 2px 18px 0 rgba(16, 51, 115, 0.12)",
          }}
        >
          {/* Close Button */}
          <button
            className="
              absolute 
              right-3 
              top-3 
              inline-flex 
              h-9 
              w-9 
              items-center 
              justify-center 
              rounded-full 
              border 
              border-[#E3EDFC] 
              bg-white 
              text-[#0B63E6] 
              shadow-[0_10px_25px_rgba(15,23,42,0.12)] 
              transition 
              hover:bg-[#F8FAFF] 
              active:scale-95
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#007BFF]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-white
            "
            onClick={onClose}
            aria-label="Close order modal"
          >
            <X size={20} />
          </button>

          {/* Platform / Title */}
          <div className="flex items-center gap-2 pr-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.18)]">
              {platform.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
                YesViral • Secure Order
              </p>
              <p className="truncate text-sm font-semibold text-[#111827]">
                {platform.name} {service.type}
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="mt-4 space-y-2">
            <div className="flex w-full items-center justify-between gap-1">
              {steps.map((s, i) => (
                <div
                  key={s.label}
                  className="flex min-w-0 flex-1 flex-col items-center"
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-4 text-[11px] font-bold transition-all duration-300 ${
                      step === i
                        ? "border-[#007BFF] bg-[#007BFF] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.6)]"
                        : step > i
                        ? "border-[#007BFF] bg-[#E6F0FF] text-[#007BFF]"
                        : "border-[#E6F0FF] bg-[#E6F0FF] text-[#9CA3AF]"
                    }`}
                    style={{
                      boxShadow:
                        step === i ? "0 4px 15px rgba(37, 99, 235, 0.4)" : undefined,
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`mt-1.5 truncate text-[10px] font-semibold tracking-tight ${
                      step === i ? "text-[#1D4ED8]" : "text-[#9CA3AF]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="relative mt-1 flex h-2 w-full items-center px-2">
              <div
                className="absolute left-0 h-1 w-full rounded-full"
                style={{
                  background: COLORS.accentBg,
                  boxShadow: "inset 0 1px 2px rgba(15,23,42,0.08)",
                }}
              />
              <div
                className="absolute left-0 h-1 rounded-full"
                style={{
                  width: `${(step / (steps.length - 1)) * 100}%`,
                  background: "linear-gradient(90deg, #007BFF 0%, #005FCC 100%)",
                  boxShadow: "0 0 14px rgba(37,99,235,0.65)",
                  transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto bg-[#F9FBFF] px-4 py-5 sm:px-7 sm:py-7"
          style={{ backgroundImage: "radial-gradient(circle at top, #E8F1FF 0, transparent 58%)" }}
        >
          {/* STEP 0: PLATFORM */}
          {step === 0 && (
            <div className="space-y-6">
              <h3 className="text-center text-[1.35rem] font-black tracking-tight text-[#0F172A] sm:text-[1.5rem]">
                Choose your platform
              </h3>
              <p className="mx-auto max-w-md text-center text-[13px] text-[#64748B]">
                Pick where you want your
                <span className="font-semibold text-[#0B63E6]">&nbsp;YesViral boost</span> —
                we&apos;ll keep it safe, discreet, and optimized for growth.
              </p>
              <div className="mt-2 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
                {PLATFORMS.map((p) => {
                  const isActive = platform.key === p.key;
                  return (
                    <button
                      key={p.key}
                      className={[
                        "group flex w-full max-w-[180px] flex-col items-center justify-between rounded-2xl border px-4 py-4 text-sm font-semibold shadow-sm transition",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9FBFF]",
                        isActive
                          ? "border-[#007BFF] bg-white text-[#0B63E6] shadow-[0_16px_40px_rgba(15,23,42,0.18)] scale-[1.02]"
                          : "border-[#D1E2FF] bg-white/90 text-[#0F172A] hover:border-[#7FB5FF] hover:shadow-[0_10px_28px_rgba(15,23,42,0.08)]",
                      ].join(" ")}
                      style={{ minHeight: 104 }}
                      onClick={() => {
                        setPlatform(p);
                        setService(p.services[0]);
                        setStep(1);
                        setError("");
                      }}
                    >
                      <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EFF4FF] shadow-[0_8px_18px_rgba(15,23,42,0.14)]">
                        {p.icon}
                      </div>
                      <span className="mb-1 text-[14px] font-bold tracking-tight">
                        {p.name}
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">
                        Followers • Likes • Views
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-center text-[1.35rem] font-black tracking-tight text-[#0F172A] sm:text-[1.5rem]">
                {platform.name} services
              </h3>
              <p className="mx-auto max-w-md text-center text-[13px] text-[#64748B]">
                Select exactly what you want to boost. Pricing is
                <span className="font-semibold text-[#0B63E6]">&nbsp;live-discounted</span>
                &nbsp;for YesViral customers.
              </p>
              <div className="space-y-3">
                {platform.services.map((s) => {
                  const { discount: disc, discounted: discPrice } =
                    getDiscountedPrice(s.price);
                  const isActive = service.type === s.type;
                  return (
                    <button
                      key={s.type}
                      className={[
                        "group flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-[15px] font-semibold shadow-sm transition sm:px-5 sm:py-4.5",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9FBFF]",
                        isActive
                          ? "border-[#007BFF] bg-white shadow-[0_20px_45px_rgba(15,23,42,0.2)] scale-[1.01]"
                          : "border-[#D1E2FF] bg-white/95 hover:border-[#7FB5FF] hover:shadow-[0_12px_30px_rgba(15,23,42,0.10)]",
                      ].join(" ")}
                      onClick={() => {
                        setService(s);
                        setStep(2);
                        setError("");
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#EFF4FF]">
                          {s.icon}
                        </div>
                        <div className="flex flex-col items-start">
                          <span
                            className={
                              isActive
                                ? "text-[#0B63E6]"
                                : "text-[#0F172A]"
                            }
                          >
                            {s.type}
                          </span>
                          <span className="text-[11px] font-normal text-[#94A3B8]">
                            High quality • Safe delivery • Real engagement
                          </span>
                        </div>
                        {disc > 0 && (
                          <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#E6F0FF] px-2 py-0.5 text-[11px] font-bold text-[#007BFF]">
                            <Tag size={13} className="text-[#007BFF]" />
                            -{disc}%
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-end text-[13px]">
                        <span className="flex items-center gap-1 text-[#9CA3AF] line-through">
                          ${s.price.toFixed(2)}
                        </span>
                        <span className="text-[13px] font-bold text-[#007BFF]">
                          ${discPrice.toFixed(2)}
                          <span className="text-[11px] font-normal text-[#64748B]">
                            &nbsp;/ 1000
                          </span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  className="text-[13px] font-medium text-[#2563EB] underline-offset-2 hover:underline"
                  onClick={handleBack}
                >
                  ← Back
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DETAILS (NO PREVIEW) */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-center text-[1.35rem] font-black tracking-tight text-[#0F172A] sm:text-[1.5rem]">
                Order details
              </h3>
              <p className="mx-auto max-w-md text-center text-[13px] text-[#64748B]">
                Add your
                <span className="font-semibold text-[#0B63E6]">
                  &nbsp;profile or post
                </span>{" "}
                and choose how strong you want your boost. No password required.
              </p>

              <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
                {/* TARGET INPUT */}
                <div className="flex flex-col">
                  <label className="mb-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
                    {getTargetLabel()}
                  </label>
                  <input
                    type="text"
                    autoFocus
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="
                      w-full 
                      rounded-2xl 
                      border 
                      border-[#CFE4FF] 
                      bg-white/95 
                      px-4 
                      py-3 
                      text-[14px] 
                      font-medium 
                      text-[#0F172A] 
                      shadow-sm
                      placeholder:text-[#A0AEC0]
                      outline-none 
                      transition 
                      focus:border-[#007BFF] 
                      focus:ring-2 
                      focus:ring-[#E6F0FF]
                    "
                    placeholder={getTargetPlaceholder()}
                  />
                  <span className="mt-2 text-[11px] leading-relaxed text-[#8691A6]">
                    {isContentEngagement
                      ? "For likes / views, paste the full post or video URL (no private or deleted posts)."
                      : "For followers / subscribers, you can use a username or full profile URL. Make sure your account is set to public during delivery."}
                  </span>
                </div>

                {/* AMOUNT SELECTOR */}
                <div className="flex flex-col items-center gap-3">
                  <AmountSelector />
                  <div className="mt-2 text-center text-[14px] font-semibold text-[#007BFF]">
                    Total:&nbsp;
                    <span className="text-[18px] font-extrabold">
                      ${(discounted * quantity).toFixed(2)}
                    </span>
                    <span className="ml-2 text-[12px] font-normal text-[#CBD5E1] line-through">
                      ${(service.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="mt-1 text-center text-[13px] font-medium text-[#EF4444]">
                    {error}
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  className="
                    inline-flex 
                    w-full 
                    items-center 
                    justify-center 
                    rounded-2xl 
                    border 
                    border-[#CFE4FF] 
                    bg-[#E6F0FF] 
                    px-5 
                    py-3 
                    text-[14px] 
                    font-semibold 
                    text-[#007BFF] 
                    shadow-sm 
                    transition 
                    hover:bg-[#d7eafd]
                    active:scale-[0.98]
                    sm:w-auto
                  "
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  className="
                    inline-flex 
                    w-full 
                    items-center 
                    justify-center 
                    rounded-2xl 
                    bg-gradient-to-br 
                    from-[#007BFF] 
                    to-[#005FCC] 
                    px-6 
                    py-3 
                    text-[14px] 
                    font-semibold 
                    text-white 
                    shadow-[0_18px_45px_rgba(37,99,235,0.65)] 
                    transition 
                    hover:from-[#005FCC] 
                    hover:to-[#007BFF]
                    active:scale-[0.98]
                    sm:w-auto
                  "
                  onClick={handleNextFromDetails}
                >
                  Review order
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW (with Preview) */}
          {step === 3 && (
            <form onSubmit={handleSecureCheckout} className="space-y-6">
              <h3 className="text-center text-[1.35rem] font-black tracking-tight text-[#0F172A] sm:text-[1.5rem]">
                Review & secure checkout
              </h3>

              {/* REVIEW SUMMARY */}
              <div className="rounded-2xl border border-[#CFE4FF] bg-white/95 px-5 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.14)]">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#EFF4FF]">
                    {platform.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#0F172A]">
                      {platform.name}
                    </span>
                    <span className="text-[11px] font-medium text-[#2563EB]">
                      {service.type}
                    </span>
                  </div>
                  <span className="ml-auto rounded-full bg-[#E6F0FF] px-3 py-1 text-[11px] font-semibold text-[#007BFF]">
                    {type}
                  </span>
                </div>

                <dl className="space-y-1.5 text-[13px] text-[#475569]">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="font-semibold text-[#0F172A]">Package</dt>
                    <dd className="text-right">{pkg}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="font-semibold text-[#0F172A]">
                      Username / Link
                    </dt>
                    <dd className="max-w-[240px] text-right break-words text-[#0F172A]">
                      {target}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="font-semibold text-[#0F172A]">Amount</dt>
                    <dd className="font-semibold text-[#0F172A]">
                      {quantity.toLocaleString()}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="font-semibold text-[#0F172A]">Price</dt>
                    <dd className="flex flex-col items-end">
                      <span className="text-[13px] font-semibold text-[#007BFF]">
                        ${discounted.toFixed(3)}
                        <span className="text-[11px] font-normal text-[#6B7280]">
                          &nbsp;/ unit
                        </span>
                      </span>
                      <span className="text-[11px] text-[#CBD5E1] line-through">
                        ${service.price.toFixed(3)}/unit
                      </span>
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 flex items-baseline justify-between border-t border-dashed border-[#D1E2FF] pt-3">
                  <span className="text-[13px] font-semibold text-[#0F172A]">
                    Estimated total
                  </span>
                  <span className="text-[20px] font-black text-[#007BFF]">
                    ${(discounted * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* PREVIEW */}
              <PreviewMini />

              {error && (
                <div className="mt-2 text-center text-[13px] font-medium text-[#EF4444]">
                  {error}
                </div>
              )}

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  className="
                    inline-flex 
                    w-full 
                    items-center 
                    justify-center 
                    rounded-2xl 
                    border 
                    border-[#CFE4FF] 
                    bg-[#E6F0FF] 
                    px-5 
                    py-3 
                    text-[14px] 
                    font-semibold 
                    text-[#007BFF] 
                    shadow-sm 
                    transition 
                    hover:bg-[#d7eafd]
                    active:scale-[0.98]
                    sm:w-auto
                  "
                  onClick={onClickBackSafe(handleBack)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="
                    inline-flex 
                    w-full 
                    items-center 
                    justify-center 
                    gap-2 
                    rounded-2xl 
                    bg-gradient-to-br 
                    from-[#007BFF] 
                    to-[#005FCC] 
                    px-6 
                    py-3 
                    text-[14px] 
                    font-semibold 
                    text-white 
                    shadow-[0_20px_55px_rgba(37,99,235,0.75)] 
                    transition 
                    hover:from-[#005FCC] 
                    hover:to-[#007BFF]
                    active:scale-[0.98]
                    sm:w-auto
                  "
                >
                  <CheckCircle size={20} />
                  Secure checkout
                </button>
              </div>

              <p className="mt-2 text-center text-[11px] text-[#94A3B8]">
                Encrypted checkout via Stripe • No password required •
                Discreet billing descriptor
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 0.6em;
          background: #f3f6ff;
        }
        ::-webkit-scrollbar-thumb {
          background: #d6e4ff;
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
