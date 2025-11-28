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
  error?: string;
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

  if (service.type === "Followers" || service.type === "Subscribers")
    type = "High-Quality";
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
  for (let i = 0; i < seed.length; i++)
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
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

  const isContentEngagement =
    service.type === "Likes" || service.type === "Views";
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

    // 👇 REQUIRED for Stripe metadata → Followiz webhook
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
      if (platform.key === "instagram")
        return "@username or instagram.com/username";
      if (platform.key === "tiktok")
        return "@username or tiktok.com/@username";
      if (platform.key === "youtube") return "Channel URL or @handle";
      return "Profile link or username";
    }
    if (platform.key === "instagram")
      return "Paste your Instagram post / reel link";
    if (platform.key === "tiktok") return "Paste your TikTok video link";
    if (platform.key === "youtube") return "Paste your YouTube video link";
    return "Paste your post / video link";
  }

  // ==============================
  // SERVICE SUMMARY (chip)
  // ==============================
  function ServiceSummary() {
    return (
      <div
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm"
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
  // AMOUNT SELECTOR — PILLS
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
          "flex-none h-11 min-w-[80px] rounded-full border text-xs sm:text-sm font-bold tracking-tight px-4",
          "transition-all select-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#BFD9FF]",
          selected
            ? "bg-[#007BFF] text-white border-[#007BFF] shadow-[0_8px_18px_rgba(0,123,255,.30)] scale-[1.03]"
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
        <div className="mb-2 flex items-center justify-between gap-2">
          <h4 className="text-sm font-extrabold text-[#0B63E6]">
            How many {platform.name} {service.type}?
          </h4>
          <ServiceSummary />
        </div>

        <div
          className="
            grid 
            w-full
            grid-cols-3 
            sm:grid-cols-4 
            md:grid-cols-5 
            gap-2
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
  // PREVIEW MINI
  // ==============================
  function PreviewMini() {
    const hasImg = !!(preview && preview.ok && preview.image);
    const normalized = normalizeHandle(platform, target || "");
    const avatarHue = hashToHsl(normalized || platform.name);

    return (
      <div
        className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border bg-white shadow-[0_14px_55px_rgba(15,23,42,0.18)]"
        style={{ borderColor: COLORS.border }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 border-b bg-white/90 px-3 py-2"
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
              className="text-[11px] font-bold uppercase tracking-[0.16em]"
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
          <div
            className="relative w-full"
            style={{ paddingTop: "75%", maxHeight: 150 }}
          >
            {previewLoading && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#EAF2FF] via-[#F5FAFF] to-white" />
            )}

            {!previewLoading && hasImg && (
              <>
                <ImageSafe src={preview!.image as string} alt="Content preview" />
                {isContentEngagement && isLink(target) && (
                  <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[9px] text-white">
                    <Play size={10} />
                    {isVideo ? "Video" : "Post"}
                  </div>
                )}
              </>
            )}

            {!previewLoading && !hasImg && (
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className="grid aspect-square w-[52%] max-w-[120px] place-items-center rounded-xl text-xl font-extrabold text-white shadow-lg"
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
        <div className="flex items-center justify-between bg-white px-3 py-2">
          <div className="min-w-0">
            <span className="block max-w-[220px] truncate text-[11px] font-semibold text-[#111]">
              {normalized || "—"}
            </span>
            <span className="text-[10px] text-[#6B7280]">
              For display purposes only — Not a real-time account preview
            </span>
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              color: platform.color,
              background: `${platform.color}14`,
              border: `1px solid ${platform.color}26`,
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-3 py-6 backdrop-blur-md sm:px-4">
      <div className="relative w-full max-w-3xl animate-[fadeIn_0.25s_ease-out]">
        {/* Glow background */}
        <div className="pointer-events-none absolute inset-[-2px] -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(0,123,255,0.33),transparent_55%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.25),transparent_55%)] opacity-90" />

        {/* CARD */}
        <div className="relative flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[1.8rem] border border-[#CFE4FF] bg-gradient-to-br from-[#F5F9FF] via-white to-[#ECF3FF] shadow-[0_28px_90px_rgba(15,23,42,0.70)]">
          {/* Header */}
          <div className="relative border-b border-[#D9E6FF] bg-gradient-to-r from-[#E6F0FF] via-white to-[#F5F9FF] px-5 pb-4 pt-5 sm:px-7 sm:pt-6">
            <button
              className="absolute right-4 top-4 z-20 rounded-full border border-[#E3EDFC] bg-white p-2 shadow-[0_10px_35px_rgba(0,123,255,0.32)] transition hover:bg-[#f4f7ff]"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={20} className="text-[#007BFF]" />
            </button>

            <div className="flex items-center gap-2 pr-10">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-[0_6px_20px_rgba(0,123,255,0.28)]">
                {platform.icon}
              </div>
              <div>
                <div
                  className="text-sm font-semibold uppercase tracking-[0.16em] text-[#64748B]"
                >
                  YesViral Order
                </div>
                <div
                  className="text-lg font-black tracking-tight sm:text-xl"
                  style={{ color: platform.color }}
                >
                  {platform.name}
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="mt-4 flex w-full items-center justify-between gap-1 px-1">
              {steps.map((s, i) => (
                <div
                  key={s.label}
                  className="flex min-w-0 flex-1 flex-col items-center"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-4 text-xs font-bold transition-all duration-300 sm:h-10 sm:w-10 sm:text-sm ${
                      step === i
                        ? "border-[#007BFF] bg-[#007BFF] text-white shadow-[0_0_0_4px_rgba(59,130,246,0.25)]"
                        : step > i
                        ? "border-[#007BFF] bg-[#E6F0FF] text-[#007BFF]"
                        : "border-[#E2ECFF] bg-[#E6F0FF] text-[#94A3B8]"
                    }`}
                    style={{
                      boxShadow:
                        step === i ? "0 2px 10px #007BFF33" : undefined,
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`mt-2 text-[11px] font-semibold sm:text-xs ${
                      step === i ? "text-[#007BFF]" : "text-[#94A3B8]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative mt-3 flex h-[10px] items-center px-3">
              <div className="absolute left-0 top-1/2 h-[6px] w-full -translate-y-1/2 rounded-full bg-[#E4EEFF]" />
              <div
                className="absolute left-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full"
                style={{
                  width: `${(step / (steps.length - 1)) * 100}%`,
                  background:
                    "linear-gradient(90deg, #007BFF 0%, #005FCC 60%, #22C55E 100%)",
                  boxShadow: "0 0 20px #007bff70",
                  transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-transparent px-4 py-6 sm:px-7 sm:py-7">
            {/* STEP 0: PLATFORM */}
            {step === 0 && (
              <div className="space-y-7">
                <h3 className="text-center text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
                  Choose Your Platform
                </h3>
                <p className="mx-auto max-w-md text-center text-xs sm:text-sm text-[#64748B]">
                  Select where you want to boost your presence. You can always
                  come back and change this before checkout.
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-6">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p.key}
                      className={[
                        "relative flex min-h-[92px] min-w-[112px] flex-col items-center gap-2 rounded-2xl border-2 px-6 py-4 text-sm font-bold shadow-sm transition-all sm:min-w-[130px]",
                        p.key === platform.key
                          ? "border-[#007BFF] bg-[#E6F3FF] text-[#007BFF] shadow-[0_18px_45px_rgba(37,99,235,0.35)] scale-[1.04]"
                          : "border-[#CFE4FF] bg-white text-[#111] hover:border-[#94B9FF] hover:shadow-[0_10px_30px_rgba(148,187,255,0.45)]",
                      ].join(" ")}
                      onClick={() => {
                        setPlatform(p);
                        setService(p.services[0]);
                        setStep(1);
                        setError("");
                      }}
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_10px_26px_rgba(15,23,42,0.16)]">
                        {p.icon}
                      </div>
                      <span>{p.name}</span>
                      {p.key === platform.key && (
                        <span className="absolute -top-3 right-3 rounded-full bg-[#22C55E] px-2 py-0.5 text-[10px] font-semibold text-white shadow-[0_0_12px_rgba(34,197,94,0.75)]">
                          Selected
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 1: SERVICE */}
            {step === 1 && (
              <div>
                <h3 className="mb-3 text-center text-2xl font-black text-[#0F172A] sm:text-3xl">
                  {platform.name} Services
                </h3>
                <p className="mb-6 text-center text-xs sm:text-sm text-[#64748B]">
                  Pick what you want to grow. All options are optimized for
                  safe and high-quality engagement.
                </p>

                <div className="flex flex-col gap-4">
                  {platform.services.map((s) => {
                    const { discount: disc, discounted: discPrice } =
                      getDiscountedPrice(s.price);
                    const selected = service.type === s.type;
                    return (
                      <button
                        key={s.type}
                        className={[
                          "flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left text-sm sm:text-base font-bold shadow-sm transition-all",
                          selected
                            ? "border-[#007BFF] bg-[#E6F3FF] text-[#007BFF] shadow-[0_18px_45px_rgba(37,99,235,0.30)] scale-[1.02]"
                            : "border-[#CFE4FF] bg-white text-[#111] hover:border-[#94B9FF] hover:shadow-[0_12px_30px_rgba(148,187,255,0.4)]",
                        ].join(" ")}
                        onClick={() => {
                          setService(s);
                          setStep(2);
                          setError("");
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-[0_6px_18px_rgba(15,23,42,0.15)]">
                            {s.icon}
                          </div>
                          <div className="flex flex-col">
                            <span>{s.type}</span>
                            <span className="mt-0.5 text-[11px] font-normal text-[#64748B]">
                              Tuned for long-term, natural-looking growth.
                            </span>
                          </div>
                          {disc > 0 && (
                            <span className="ml-2 flex items-center gap-1 rounded-full bg-[#E6F0FF] px-2 py-0.5 text-[11px] font-bold text-[#007BFF]">
                              <Tag
                                size={14}
                                className="mr-[1px] text-[#007BFF]"
                              />
                              -{disc}%
                            </span>
                          )}
                        </div>
                        <span className="flex items-center gap-2 text-[13px] font-semibold text-[#6B7280]">
                          <span className="line-through text-[#c7c7c7]">
                            ${s.price.toFixed(2)}
                          </span>
                          <span className="text-[15px] font-extrabold text-[#007BFF]">
                            ${discPrice.toFixed(2)}/ea
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  className="mx-auto mt-6 block text-xs font-semibold text-[#007BFF] underline"
                  onClick={handleBack}
                >
                  ← Back
                </button>
              </div>
            )}

            {/* STEP 2: DETAILS */}
            {step === 2 && (
              <div className="space-y-7">
                <h3 className="text-center text-2xl font-black text-[#0F172A] sm:text-3xl">
                  Order Details
                </h3>
                <p className="mx-auto max-w-md text-center text-xs sm:text-sm text-[#64748B]">
                  Add your profile or content link and choose how much you want.
                  Your details are encrypted and never shared.
                </p>

                <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                  {/* Left: Inputs */}
                  <div className="space-y-6">
                    {/* TARGET INPUT */}
                    <div className="flex flex-col">
                      <label className="mb-2 text-sm font-semibold text-[#0F172A] sm:text-base">
                        {getTargetLabel()}
                      </label>
                      <input
                        type="text"
                        autoFocus
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="w-full rounded-xl border border-[#CFE4FF] bg-white/95 px-4 py-3 text-sm sm:text-base font-medium text-[#0F172A] shadow-[0_3px_12px_rgba(15,23,42,0.08)] outline-none transition focus:border-[#007BFF] focus:ring-2 focus:ring-[#E6F0FF]"
                        placeholder={getTargetPlaceholder()}
                      />
                      <span className="mt-2 text-[11px] text-[#777] sm:text-xs">
                        {isContentEngagement
                          ? "For likes / views, paste the full post or video URL."
                          : "For followers / subscribers, you can use a username or full profile URL."}
                      </span>
                    </div>

                    {/* AMOUNT SELECTOR */}
                    <div className="flex w-full flex-col items-center gap-3">
                      <AmountSelector />
                      <span className="mt-1 text-lg font-black text-[#007BFF] sm:text-xl">
                        Total:{" "}
                        <span className="text-[#007BFF]">
                          ${(discounted * quantity).toFixed(2)}
                        </span>
                        <span className="ml-2 text-xs font-semibold text-[#c7c7c7] line-through sm:text-sm">
                          ${(service.price * quantity).toFixed(2)}
                        </span>
                      </span>
                    </div>

                    {error && (
                      <div className="mt-1 text-center text-xs font-semibold text-[#EF4444] sm:text-sm">
                        {error}
                      </div>
                    )}
                  </div>

                  {/* Right: Little trust / info card */}
                  <div className="flex flex-col gap-4 rounded-2xl border border-[#DDE8FF] bg-white/70 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.12)]">
                    <div className="flex items-center gap-2">
                      <CheckCircle
                        size={18}
                        className="text-[#22C55E]"
                      />
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
                        Protected Order
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-[#0F172A]">
                      Stealth-optimized growth
                    </div>
                    <p className="text-xs text-[#64748B]">
                      We route orders through our private network so your
                      account stays safe while you get the results you paid for.
                    </p>
                    <ul className="mt-1 space-y-1 text-[11px] text-[#4B5563]">
                      <li>• Encrypted details</li>
                      <li>• Real-time routing after checkout</li>
                      <li>• 30-Day refill on eligible packages</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex justify-between gap-3">
                  <button
                    className="rounded-xl border border-[#CFE4FF] bg-[#E6F0FF] px-6 py-3 text-sm sm:text-base font-bold text-[#007BFF] shadow-sm transition hover:bg-[#d7eafd]"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button
                    className="rounded-xl bg-[#007BFF] px-6 py-3 text-sm sm:text-base font-bold text-white shadow-[0_10px_30px_rgba(37,99,235,0.55)] transition hover:bg-[#005FCC]"
                    onClick={handleNextFromDetails}
                  >
                    Review
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW */}
            {step === 3 && (
              <form onSubmit={handleSecureCheckout} className="space-y-7">
                <h3 className="text-center text-2xl font-black text-[#0F172A] sm:text-3xl">
                  Review & Secure Checkout
                </h3>
                <p className="mx-auto max-w-md text-center text-xs sm:text-sm text-[#64748B]">
                  Double-check your order details. You’ll complete payment on
                  our encrypted checkout with Stripe.
                </p>

                <div className="grid gap-7 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                  {/* REVIEW SUMMARY */}
                  <div className="space-y-4 rounded-2xl border border-[#CFE4FF] bg-[#F5FAFF] px-5 py-6 shadow-[0_14px_40px_rgba(15,23,42,0.15)]">
                    <div className="mb-1 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-[0_8px_24px_rgba(15,23,42,0.2)]">
                        {platform.icon}
                      </div>
                      <span className="text-base font-semibold text-[#0F172A] sm:text-lg">
                        {platform.name}
                      </span>
                      <span className="ml-2 rounded-full bg-[#E6F0FF] px-3 py-1 text-[11px] font-semibold text-[#007BFF]">
                        {service.type}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs sm:text-sm text-[#444]">
                      <div>
                        <b>Package:</b> {pkg} ({type})
                      </div>
                      <div>
                        <b>Username / Link:</b> {target}
                      </div>
                      <div>
                        <b>Amount:</b> {quantity.toLocaleString()}
                      </div>
                      <div>
                        <b>Price:</b>{" "}
                        <span className="font-semibold text-[#007BFF]">
                          ${discounted.toFixed(3)}/ea
                        </span>{" "}
                        <span className="text-xs text-[#c7c7c7] line-through">
                          ${service.price.toFixed(3)}/ea
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-[#D9E6FF] pt-3">
                      <span className="text-sm font-semibold text-[#0F172A]">
                        Total
                      </span>
                      <span className="text-lg font-black text-[#007BFF] sm:text-xl">
                        ${(discounted * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* SMALL PREVIEW */}
                  <div className="space-y-3">
                    <PreviewMini />
                    {error && (
                      <div className="mt-1 text-center text-xs font-semibold text-[#EF4444] sm:text-sm">
                        {error}
                      </div>
                    )}
                    <p className="text-center text-[11px] text-[#6B7280]">
                      After payment, your order is automatically routed to our
                      private delivery network. No login required.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    className="rounded-xl border border-[#CFE4FF] bg-[#E6F0FF] px-6 py-3 text-sm sm:text-base font-bold text-[#007BFF] shadow-sm transition hover:bg-[#d7eafd]"
                    onClick={onClickBackSafe(handleBack)}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#007BFF] to-[#005FCC] px-7 py-3 text-sm sm:text-base font-bold text-white shadow-[0_16px_45px_rgba(37,99,235,0.65)] transition hover:from-[#005FCC] hover:to-[#0047A5]"
                  >
                    <CheckCircle size={19} />
                    Secure Checkout
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
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

  // Avoid TS complaining if used above as callback
  function onClickBackSafe(fn: () => void) {
    return fn;
  }
}
