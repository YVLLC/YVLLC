// components/OrderModal.tsx

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

/* ========================================================
   TYPES
======================================================== */
type ServiceType = "Followers" | "Likes" | "Views" | "Subscribers";
type Service = { type: ServiceType | string; price: number; icon: JSX.Element };
type Platform = {
  key: string;
  name: string;
  color: string;
  icon: JSX.Element;
  services: Service[];
};
type StealthPackageResult = { pkg: string; type: string };
type PreviewData = { ok: boolean; type?: string; image?: string | null; error?: string };

/* ========================================================
   COLORS (YESVIRAL BRAND)
======================================================== */
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

/* ========================================================
   PLATFORM DATA
======================================================== */
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
      { type: "Views", price: 0.06, icon: <Eye size={17} className="text-[#00F2EA]" /> },
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

/* ========================================================
   DISCOUNT
======================================================== */
function getDiscountedPrice(price: number) {
  const discount = 0.02 + Math.random() * 0.02;
  return {
    discount: Math.round(discount * 100),
    discounted: Number((price * (1 - discount)).toFixed(3)),
  };
}

/* ========================================================
   PACKAGE NAME
======================================================== */
function getStealthPackage(platform: Platform, service: Service): StealthPackageResult {
  let pkg = "Premium Package";
  let type = "Standard";

  if (platform.key === "instagram" && service.type === "Followers")
    pkg = "High-Quality Instagram Followers";
  if (platform.key === "instagram" && service.type === "Likes")
    pkg = "Premium Instagram Likes";
  if (platform.key === "instagram" && service.type === "Views")
    pkg = "High-Retention Instagram Views";

  if (platform.key === "tiktok" && service.type === "Followers")
    pkg = "High-Quality TikTok Followers";
  if (platform.key === "tiktok" && service.type === "Likes")
    pkg = "Premium TikTok Likes";
  if (platform.key === "tiktok" && service.type === "Views")
    pkg = "High-Retention TikTok Views";

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

/* ========================================================
   QUICK AMOUNTS
======================================================== */
function getQuickAmounts(platform: Platform, service: Service) {
  const type = service.type.toString().toLowerCase();
  const key = platform.key;

  if (key === "instagram" && type === "views") return [500, 2000, 5000, 10000];
  if (key === "instagram" && type === "followers")
    return [100, 200, 500, 1000, 2000, 5000];
  if (key === "instagram" && type === "likes")
    return [50, 100, 300, 500, 1000, 2000];

  if (key === "tiktok" && type === "followers")
    return [100, 250, 500, 1000, 2000];
  if (key === "tiktok" && type === "likes")
    return [100, 250, 500, 1000];
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

/* ========================================================
   PREVIEW FETCH
======================================================== */
async function fetchPreview(platform: string, target: string): Promise<PreviewData> {
  try {
    const res = await fetch(
      `/api/preview?platform=${platform}&target=${encodeURIComponent(target)}`
    );
    return await res.json();
  } catch {
    return { ok: false, error: "Network error" };
  }
}

/* ========================================================
   UTILS
======================================================== */
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

/* ========================================================
   SAFE IMAGE
======================================================== */
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

/* ========================================================
   COMPONENT
======================================================== */
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
  // 🚀 FIX: NO auto-selection on load
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [service, setService] = useState<Service | null>(null);

  const [step, setStep] = useState(0);
  const [quantity, setQuantity] = useState<number>(100);
  const [target, setTarget] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  /* ============================
       LOCK SCROLL
  ============================ */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* ============================
       INIT STATE CORRECTLY
  ============================ */
  useEffect(() => {
    if (!open) return;

    let foundPlatform: Platform | null = null;
    let foundService: Service | null = null;
    let nextStep = 0;

    if (initialPlatform) {
      foundPlatform = PLATFORMS.find(
        (p) =>
          p.key === initialPlatform.toLowerCase() ||
          p.name.toLowerCase() === initialPlatform.toLowerCase()
      ) || null;

      if (foundPlatform) {
        if (initialService) {
          foundService =
            foundPlatform.services.find(
              (s) => s.type.toLowerCase() === initialService.toLowerCase()
            ) || foundPlatform.services[0];
          nextStep = foundService ? 2 : 1;
        } else {
          nextStep = 1;
        }
      }
    }

    setPlatform(foundPlatform);
    setService(foundService);
    setStep(foundPlatform ? nextStep : 0);
    setQuantity(100);
    setTarget("");
    setError("");
    setPreview(null);
    setPreviewLoading(false);
  }, [open, initialPlatform, initialService]);

  const isContentEngagement =
    service?.type === "Likes" || service?.type === "Views";

  const isVideo = useMemo(
    () => isContentEngagement && isLink(target),
    [isContentEngagement, target]
  );

  /* ============================
       FETCH PREVIEW
  ============================ */
  const doFetchPreview = useCallback(
    async () => {
      if (!open || step !== 3) return;
      if (!platform || !service) return;

      const trimmed = target.trim();
      if (!trimmed) {
        setPreview(null);
        setPreviewLoading(false);
        return;
      }

      if (isContentEngagement && !isLink(trimmed)) {
        setPreview({ ok: false, error: "Post / video URL required." });
        return;
      }

      setPreviewLoading(true);
      const data = await fetchPreview(platform.key, trimmed);
      setPreview(data);
      setPreviewLoading(false);
    },
    [open, step, target, platform, service, isContentEngagement]
  );

  useEffect(() => {
    if (step !== 3) return;
    const timer = setTimeout(() => void doFetchPreview(), 150);
    return () => clearTimeout(timer);
  }, [doFetchPreview, step]);

  if (!open) return null;

  /* ============================
       ORDER OBJECT
  ============================ */
  let pkg = "";
  let type = "";
  let discount = 0;
  let discounted = 0;

  if (platform && service) {
    const pack = getStealthPackage(platform, service);
    pkg = pack.pkg;
    type = pack.type;

    const d = getDiscountedPrice(service.price);
    discount = d.discount;
    discounted = d.discounted;
  }

  const orderToSend =
    platform && service
      ? {
          package: pkg,
          type,
          amount: quantity,
          reference: target,
          total: Number((discounted * quantity).toFixed(2)),
          platform: platform.key,
          service: service.type.toString(),
        }
      : null;

  /* ============================
       NAVIGATION
  ============================ */
  function handleBack() {
    setError("");
    setStep((prev) => Math.max(0, prev - 1));
  }

  function handleNextFromDetails() {
    if (!service || !platform) return;

    const trimmed = target.trim();
    if (!trimmed) {
      setError(
        isContentEngagement
          ? "Paste the full post/video link."
          : "Paste the profile or username."
      );
      return;
    }
    if (isContentEngagement && !trimmed.toLowerCase().includes("http")) {
      setError("Full post/video URL required.");
      return;
    }

    setError("");
    setStep(3);
  }

  function handleSecureCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!orderToSend) return;

    const trimmed = target.trim();
    if (!trimmed) {
      setError("Missing input.");
      return;
    }

    const encoded = btoa(
      unescape(encodeURIComponent(JSON.stringify(orderToSend)))
    );
    window.location.href =
      "https://checkout.yesviral.com/checkout?order=" + encoded;
  }

  /* ============================
       LABEL & PLACEHOLDERS
  ============================ */
  function getTargetLabel() {
    if (!service) return "Input";
    if (service.type === "Followers" || service.type === "Subscribers")
      return "Profile or Username";
    return "Post / Video Link";
  }

  function getTargetPlaceholder() {
    if (!service || !platform) return "";

    if (service.type === "Followers" || service.type === "Subscribers") {
      if (platform.key === "instagram")
        return "@username or instagram.com/username";
      if (platform.key === "tiktok") return "@username or tiktok.com/@username";
      if (platform.key === "youtube") return "Channel URL or @handle";
      return "Profile URL or username";
    }

    if (platform.key === "instagram") return "Paste Instagram post / reel link";
    if (platform.key === "tiktok") return "Paste TikTok video link";
    if (platform.key === "youtube") return "Paste YouTube video link";

    return "Paste post / video link";
  }

  /* ============================
       SERVICE SUMMARY BADGE
  ============================ */
  function ServiceSummary() {
    if (!platform || !service) return null;

    return (
      <div
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold"
        style={{ borderColor: COLORS.border, background: "#F7FBFF" }}
      >
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full"
          style={{ background: COLORS.accentBg }}
        >
          {platform.icon}
        </span>
        <span className="text-[#0B63E6]">{platform.name}</span>
        <span className="opacity-40">•</span>
        <span className="flex items-center gap-1 text-[#334155]">
          {service.icon}
          {service.type}
        </span>
      </div>
    );
  }

  /* ============================
       AMOUNT SELECTOR
  ============================ */
  function Pill({
    label,
    selected,
    onClick,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={
          "flex-none h-11 min-w-[80px] px-3 rounded-full border text-sm font-bold transition-all " +
          (selected
            ? "bg-[#007BFF] text-white border-[#007BFF] shadow-md"
            : "bg-white text-[#0B63E6] border-[#DCEBFF] hover:border-[#7FB5FF] hover:bg-[#F6FAFF]")
        }
      >
        {label}
      </button>
    );
  }

  function AmountSelector() {
    if (!platform || !service) return null;

    const options = getQuickAmounts(platform, service);

    return (
      <div className="w-full max-w-[640px] mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-extrabold text-[#007BFF]">
            How many {platform.name} {service.type}?
          </h4>
          <div className="hidden sm:block">{ServiceSummary()}</div>
        </div>

        <div className="mb-3 block sm:hidden">{ServiceSummary()}</div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {options.map((v) => (
            <Pill
              key={v}
              label={v >= 1000 ? `${v / 1000}K` : `${v}`}
              selected={quantity === v}
              onClick={() => setQuantity(v)}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ============================
       MINI PREVIEW
  ============================ */
  function PreviewMini() {
    if (!platform || !service) return null;

    const hasImg = !!(preview && preview.ok && preview.image);
    const normalized = normalizeHandle(platform, target || "");
    const hue = hashToHsl(normalized || platform.name);

    return (
      <div
        className="w-full max-w-sm mx-auto rounded-xl border bg-white shadow overflow-hidden"
        style={{ borderColor: COLORS.border }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2 border-b"
          style={{ borderColor: "#E0ECFF" }}
        >
          <div
            className="h-7 w-7 flex items-center justify-center rounded-full"
            style={{ background: COLORS.accentBg }}
          >
            {platform.icon}
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#007BFF]">Preview</span>
            <div className="text-[10px] text-[#6B7280]">
              {isContentEngagement ? "Post / Video" : "Profile"}
            </div>
          </div>
        </div>

        <div className="relative w-full bg-[#DAE6FF]" style={{ paddingTop: "75%" }}>
          {previewLoading && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#EAF2FF] via-[#F5FAFF] to-white" />
          )}

          {!previewLoading && hasImg && (
            <>
              <ImageSafe src={preview!.image!} alt="Preview" />
              {isLink(target) && isContentEngagement && (
                <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded flex items-center gap-1">
                  <Play size={10} />
                  Video
                </div>
              )}
            </>
          )}

          {!previewLoading && !hasImg && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="h-20 w-20 rounded-xl text-white font-bold text-lg flex items-center justify-center shadow"
                style={{
                  background: `linear-gradient(135deg, ${hue}, ${hue.replace("% 58%)", "% 40%)")})`,
                }}
              >
                {normalized.replace("@", "").slice(0, 2).toUpperCase()}
              </div>
            </div>
          )}
        </div>

        <div className="px-3 py-2 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#111] truncate max-w-[180px]">
              {normalized || "—"}
            </div>
            <div className="text-[10px] text-[#6B7280]">Preview only</div>
          </div>

          <span
            className="text-[10px] px-2 py-0.5 rounded-full border"
            style={{
              background: `${platform.color}20`,
              borderColor: `${platform.color}40`,
              color: platform.color,
            }}
          >
            {platform.name}
          </span>
        </div>
      </div>
    );
  }

  /* ========================================================
      RENDER
  ======================================================== */
  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-3 py-6 sm:px-4 sm:py-8">
      {/* MODAL CONTAINER */}
      <div
        className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-[#D6E4FF] flex flex-col overflow-hidden"
        style={{ maxHeight: "94vh" }}
      >
        {/* HEADER (ONLY when platform is selected) */}
        {platform && service && (
          <div
            className="w-full border-b px-5 py-5 sm:px-6 sm:py-6 relative"
            style={{
              background: "linear-gradient(to right, #E6F0FF, #FFFFFF)",
              borderColor: COLORS.border,
            }}
          >
            {/* CLOSE */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full border border-[#E3EDFC] shadow flex items-center justify-center hover:bg-[#F3F7FF] transition"
            >
              <X size={20} className="text-[#007BFF]" />
            </button>

            {/* PLATFORM TITLE */}
            <div className="flex items-center gap-3 pr-12">
              <div className="w-10 h-10 rounded-2xl bg-white shadow flex items-center justify-center">
                {platform.icon}
              </div>
              <div>
                <div className="text-[11px] font-semibold text-[#2563EB] tracking-wider uppercase">
                  YesViral Order
                </div>
                <div className="text-sm font-bold text-[#0F172A]">
                  {platform.name} {service.type}
                </div>
              </div>
            </div>

            {/* STEPS */}
            <div className="mt-4">
              <div className="grid grid-cols-4 gap-1">
                {steps.map((s, i) => (
                  <div key={s.label} className="flex flex-col items-center">
                    <div
                      className={
                        "w-8 h-8 flex items-center justify-center rounded-full border-4 text-xs font-bold " +
                        (step === i
                          ? "bg-[#007BFF] border-[#007BFF] text-white"
                          : step > i
                          ? "bg-[#E6F0FF] border-[#007BFF] text-[#007BFF]"
                          : "bg-[#E6F0FF] border-[#E6F0FF] text-[#9CA3AF]")
                      }
                    >
                      {i + 1}
                    </div>
                    <div
                      className={
                        "mt-1 text-[10px] font-semibold " +
                        (step === i ? "text-[#007BFF]" : "text-[#9CA3AF]")
                      }
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative w-full h-2 mt-3">
                <div className="absolute inset-0 bg-[#E6F0FF] rounded-full" />
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#007BFF] to-[#005FCC] rounded-full shadow"
                  style={{
                    width: `${(step / (steps.length - 1)) * 100}%`,
                    transition: "width 0.35s ease",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6 sm:py-7 bg-[#FAFCFF]">
          {/* STEP 0 — PLATFORM SELECTION */}
          {step === 0 && (
            <div>
              <h3 className="text-center text-xl sm:text-2xl font-black text-[#111]">
                Choose Platform
              </h3>
              <p className="text-center text-sm text-[#64748B] mt-2">
                Select the platform you want to boost.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => {
                      setPlatform(p);
                      setService(p.services[0]);
                      setStep(1);
                    }}
                    className={
                      "w-[140px] h-[110px] flex flex-col items-center justify-center rounded-2xl border transition shadow-sm " +
                      (platform?.key === p.key
                        ? "border-[#007BFF] bg-white shadow-lg scale-[1.02]"
                        : "border-[#D6E4FF] bg-white hover:border-[#7FB5FF]")
                    }
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] flex items-center justify-center mb-2">
                      {p.icon}
                    </div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-[11px] text-[#94A3B8]">
                      Followers • Likes • Views
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — SERVICE */}
          {step === 1 && platform && (
            <div>
              <h3 className="text-center text-xl sm:text-2xl font-black text-[#111]">
                {platform.name} Services
              </h3>
              <p className="text-center text-sm text-[#64748B] mt-2">
                Choose your boost type.
              </p>

              <div className="mt-6 space-y-3">
                {platform.services.map((s) => {
                  const { discount: disc, discounted: discPrice } =
                    getDiscountedPrice(s.price);

                  return (
                    <button
                      key={s.type}
                      onClick={() => {
                        setService(s);
                        setStep(2);
                      }}
                      className={
                        "w-full flex items-center justify-between p-4 rounded-2xl border shadow-sm transition " +
                        (service?.type === s.type
                          ? "border-[#007BFF] bg-white shadow-md scale-[1.01]"
                          : "border-[#D6E4FF] bg-white hover:border-[#7FB5FF]")
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#EFF4FF] flex items-center justify-center">
                          {s.icon}
                        </div>
                        <div>
                          <div
                            className={
                              service?.type === s.type
                                ? "text-[#007BFF] font-bold"
                                : "font-bold"
                            }
                          >
                            {s.type}
                          </div>
                          <div className="text-[11px] text-[#94A3B8]">
                            Real • High Quality • Safe
                          </div>
                        </div>

                        {disc > 0 && (
                          <span className="text-xs text-[#007BFF] bg-[#E6F0FF] px-2 py-1 rounded-full flex items-center gap-1">
                            <Tag size={12} /> -{disc}%
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="line-through text-xs text-[#9CA3AF]">
                          ${s.price.toFixed(2)}
                        </div>
                        <div className="font-bold text-[#007BFF]">
                          ${discPrice.toFixed(2)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                className="mx-auto block mt-6 text-[#007BFF] underline"
                onClick={handleBack}
              >
                ← Back
              </button>
            </div>
          )}

          {/* STEP 2 — DETAILS */}
          {step === 2 && platform && service && (
            <div>
              <h3 className="text-center text-xl sm:text-2xl font-black text-[#111]">
                Order Details
              </h3>

              <div className="mt-6 space-y-6">
                {/* TARGET INPUT */}
                <div>
                  <label className="text-sm font-semibold text-[#007BFF] mb-1 block">
                    {getTargetLabel()}
                  </label>
                  <input
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder={getTargetPlaceholder()}
                    className="w-full border border-[#D6E4FF] rounded-xl p-3 text-sm shadow-sm focus:ring-2 focus:ring-[#007BFF] focus:border-[#007BFF]"
                  />
                  <div className="text-xs text-[#64748B] mt-1">
                    {isContentEngagement
                      ? "Paste the full post or video URL."
                      : "Use @username or full profile URL."}
                  </div>
                </div>

                {/* AMOUNT */}
                <AmountSelector />

                <div className="text-center text-[#007BFF] font-extrabold text-xl mt-4">
                  Total: ${(discounted * quantity).toFixed(2)}
                  <span className="text-sm text-[#B0B9C7] line-through ml-2">
                    ${(service.price * quantity).toFixed(2)}
                  </span>
                </div>

                {error && (
                  <div className="text-center text-sm text-red-500">{error}</div>
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
                <button
                  onClick={handleBack}
                  className="w-full sm:w-auto bg-[#E6F0FF] text-[#007BFF] border border-[#CFE4FF] rounded-xl px-5 py-3 font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleNextFromDetails}
                  className="w-full sm:w-auto bg-[#007BFF] hover:bg-[#005FCC] text-white rounded-xl px-5 py-3 font-semibold shadow"
                >
                  Review
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — REVIEW */}
          {step === 3 && platform && service && (
            <form onSubmit={handleSecureCheckout}>
              <h3 className="text-center text-xl sm:text-2xl font-black text-[#111]">
                Review & Checkout
              </h3>

              {/* SUMMARY BOX */}
              <div className="mt-6 border border-[#CFE4FF] bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] flex items-center justify-center">
                    {platform.icon}
                  </div>
                  <div>
                    <div className="font-bold text-[#111]">{platform.name}</div>
                    <div className="text-xs text-[#2563EB]">{service.type}</div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-[#475569]">
                  <div className="flex justify-between">
                    <b>Package:</b> {pkg} ({type})
                  </div>
                  <div className="flex justify-between">
                    <b>User / Link:</b>
                    <span className="max-w-[160px] break-words text-right">
                      {target}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <b>Amount:</b> {quantity}
                  </div>
                  <div className="flex justify-between">
                    <b>Price:</b>
                    <span>
                      <span className="text-[#007BFF] font-semibold">
                        ${discounted.toFixed(3)}
                      </span>
                      <span className="line-through text-[#94A3B8] text-xs ml-1">
                        ${service.price.toFixed(3)}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-dashed border-[#CFE4FF] flex justify-between text-[#111] font-bold text-lg">
                  <div>Total</div>
                  <div className="text-[#007BFF]">
                    ${(discounted * quantity).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <PreviewMini />
              </div>

              {error && (
                <div className="text-center text-sm text-red-500 mt-3">
                  {error}
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full sm:w-auto bg-[#E6F0FF] text-[#007BFF] border border-[#CFE4FF] rounded-xl px-5 py-3 font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-br from-[#007BFF] to-[#005FCC] text-white rounded-xl px-6 py-3 font-semibold shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Secure Checkout
                </button>
              </div>

              <p className="mt-3 text-center text-xs text-[#94A3B8]">
                Protected by Stripe • Encrypted • Discreet billing
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 0.5em;
        }
        ::-webkit-scrollbar-thumb {
          background: #d6e4ff;
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}
