import React, { useState, useEffect } from "react";
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
  HelpCircle,
} from "lucide-react";

/* ========================================================
   FOLLOWIZ-SAFE INPUT SANITIZER
   - Likes/Views → must be full URL (kept as URL, trimmed)
   - Followers/Subscribers → clean username (no @, no domain, no query)
======================================================== */
function sanitizeFollowizInput(raw: string, serviceType: string): string {
  if (!raw) return "";
  let t = raw.trim();
  const lowerType = serviceType.toLowerCase();

  const needsUrl = lowerType === "likes" || lowerType === "views";
  const isUrl = /^https?:\/\//i.test(t);

  // For likes/views: must be a valid URL, just trim and strip spaces
  if (needsUrl) {
    if (!isUrl) return "";
    return t.replace(/\s+/g, "");
  }

  // For followers/subscribers: we want a clean username/handle
  if (isUrl) {
    t = t
      .replace(/^https?:\/\//i, "")
      .replace(/www\./gi, "")
      .replace(/instagram\.com\//gi, "")
      .replace(/tiktok\.com\//gi, "")
      .replace(/youtube\.com\//gi, "")
      .replace(/@/g, "")
      .replace(/\?.*$/, "") // strip query params
      .replace(/\/.*$/, ""); // strip trailing paths
  }

  // Strip any leading @ and weird characters, keep typical handle chars
  t = t.replace(/^@+/, "");
  t = t.replace(/\s+/g, "");
  t = t.replace(/[^a-zA-Z0-9._]/g, "");

  return t;
}

/* ========================================================
   TYPES
======================================================== */
type ServiceType = "Followers" | "Likes" | "Views" | "Subscribers";
type Service = {
  type: ServiceType | string;
  price: number; // base "from" price shown on cards
  icon: JSX.Element;
  packages?: Record<number, number>; // amount -> fixed package price
};
type Platform = {
  key: string;
  name: string;
  color: string;
  icon: JSX.Element;
  services: Service[];
};
type StealthPackageResult = { pkg: string; type: string };

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
   PLATFORM DATA + PACKAGE PRICING
======================================================== */
const PLATFORMS: Platform[] = [
  {
    key: "INSTAGRAM",
    name: "Instagram",
    color: "#E1306C",
    icon: <Instagram className="text-[#E1306C]" size={26} />,
    services: [
      {
        type: "Followers",
        price: 2.99,
        icon: <UserPlus size={17} className="text-[#E1306C]" />,
        packages: {
          50: 2.99,
          100: 3.99,
          250: 7.99,
          500: 11.99,
          1000: 14.99,
          2500: 34.99,
          5000: 59.99,
        },
      },
      {
        type: "Likes",
        price: 2.49,
        icon: <ThumbsUp size={17} className="text-[#E1306C]" />,
        packages: {
          50: 2.49,
          100: 3.49,
          250: 6.49,
          500: 8.99,
          1000: 12.99,
          2500: 24.99,
          5000: 39.99,
        },
      },
      {
        type: "Views",
        price: 0.49,
        icon: <Eye size={17} className="text-[#E1306C]" />,
        packages: {
          500: 0.49,
          1000: 0.69,
          2500: 1.29,
          5000: 1.99,
          10000: 2.99,
          25000: 5.99,
          50000: 9.99,
        },
      },
    ],
  },
  {
    key: "TIKTOK",
    name: "TikTok",
    color: "#00F2EA",
    icon: <Music2 className="text-[#00F2EA]" size={26} />,
    services: [
      {
        type: "Followers",
        price: 2.49,
        icon: <UserPlus size={17} className="text-[#00F2EA]" />,
        packages: {
          50: 2.49,
          100: 3.49,
          250: 7.49,
          500: 10.99,
          1000: 12.99,
          2500: 32.99,
          5000: 57.99,
        },
      },
      {
        type: "Likes",
        price: 1.79,
        icon: <ThumbsUp size={17} className="text-[#00F2EA]" />,
        packages: {
          50: 1.79,
          100: 2.49,
          250: 4.49,
          500: 5.99,
          1000: 7.99,
          2500: 17.99,
          5000: 29.99,
        },
      },
      {
        type: "Views",
        price: 0.39,
        icon: <Eye size={17} className="text-[#00F2EA]" />,
        packages: {
          1000: 0.39,
          2500: 0.79,
          5000: 1.49,
          10000: 2.49,
          25000: 5.49,
          50000: 8.99,
        },
      },
    ],
  },
  {
    key: "YOUTUBE",
    name: "YouTube",
    color: "#FF0000",
    icon: <Youtube className="text-[#FF0000]" size={26} />,
    services: [
      {
        type: "Subscribers",
        price: 7.49,
        icon: <UserPlus size={17} className="text-[#FF0000]" />,
        packages: {
          50: 7.49,
          100: 12.99,
          250: 24.99,
          500: 39.99,
          1000: 69.99,
          2500: 159.99,
          5000: 289.99,
        },
      },
      {
        type: "Likes",
        price: 1.99,
        icon: <ThumbsUp size={17} className="text-[#FF0000]" />,
        packages: {
          50: 1.99,
          100: 2.79,
          250: 4.99,
          500: 6.99,
          1000: 9.99,
          2500: 22.99,
          5000: 38.99,
        },
      },
      {
        type: "Views",
        price: 8.99,
        icon: <Eye size={17} className="text-[#FF0000]" />,
        packages: {
          500: 8.99,
          1000: 14.99,
          2500: 29.99,
          5000: 49.99,
          10000: 79.99,
          25000: 179.99,
          50000: 299.99,
        },
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
   DISCOUNT / PUFFERY SYSTEM
======================================================== */
function getDiscountedPrice(realPrice: number) {
  if (!realPrice || realPrice <= 0) {
    return { discount: 0, discounted: realPrice, original: realPrice };
  }

  const minFactor = 2.1;
  const maxFactor = 2.7;
  const factor = minFactor + Math.random() * (maxFactor - minFactor);

  const original = Number((realPrice * factor).toFixed(2));
  const discountPercent = Math.round(100 - (realPrice / original) * 100);

  return {
    discount: discountPercent,
    discounted: realPrice,
    original,
  };
}

/* ========================================================
   PACKAGE PRICE RESOLVER
======================================================== */
function getPackagePrice(
  platform: Platform,
  service: Service,
  quantity: number
): number {
  if (service.packages && service.packages[quantity]) {
    return service.packages[quantity];
  }
  return service.price;
}

/* ========================================================
   PACKAGE NAME GENERATOR
======================================================== */
function getStealthPackage(
  platform: Platform,
  service: Service
): StealthPackageResult {
  let pkg = "Premium Package";
  let type = "Standard";

  if (platform.key === "INSTAGRAM" && service.type === "Followers")
    pkg = "High-Quality Followers";
  if (platform.key === "INSTAGRAM" && service.type === "Likes")
    pkg = "High-Quality Likes";
  if (platform.key === "INSTAGRAM" && service.type === "Views")
    pkg = "High-Quality Views";

  if (platform.key === "TIKTOK" && service.type === "Followers")
    pkg = "High-Quality Followers";
  if (platform.key === "TIKTOK" && service.type === "Likes")
    pkg = "High-Quality Likes";
  if (platform.key === "TIKTOK" && service.type === "Views")
    pkg = "High-Quality Views";

  if (platform.key === "YOUTUBE" && service.type === "Subscribers")
    pkg = "High-Quality Subscribers";
  if (platform.key === "YOUTUBE" && service.type === "Likes")
    pkg = "High-Quality Likes";
  if (platform.key === "YOUTUBE" && service.type === "Views")
    pkg = "High-Quality Views";

  if (["Followers", "Subscribers", "Likes", "Views"].includes(service.type))
    type = "PREMIUM";

  return { pkg, type };
}

/* ========================================================
   QUICK AMOUNT OPTIONS
======================================================== */
function getQuickAmounts(platform: Platform, service: Service) {
  const type = service.type.toString().toLowerCase();
  const key = platform.key.toUpperCase();

  if (key === "INSTAGRAM" && type === "followers")
    return [50, 100, 250, 500, 1000, 2500, 5000];
  if (key === "INSTAGRAM" && type === "likes")
    return [50, 100, 250, 500, 1000, 2500, 5000];
  if (key === "INSTAGRAM" && type === "views")
    return [500, 1000, 2500, 5000, 10000, 25000, 50000];

  if (key === "TIKTOK" && type === "followers")
    return [50, 100, 250, 500, 1000, 2500, 5000];
  if (key === "TIKTOK" && type === "likes")
    return [50, 100, 250, 500, 1000, 2500, 5000];
  if (key === "TIKTOK" && type === "views")
    return [1000, 2500, 5000, 10000, 25000, 50000];

  if (key === "YOUTUBE" && type === "subscribers")
    return [50, 100, 250, 500, 1000, 2500, 5000];
  if (key === "YOUTUBE" && type === "likes")
    return [50, 100, 250, 500, 1000, 2500, 5000];
  if (key === "YOUTUBE" && type === "views")
    return [500, 1000, 2500, 5000, 10000, 25000, 50000];

  return [100, 500, 1000, 2000, 5000, 10000];
}

/* ========================================================
   SIMPLE COLOR HASH (USED FOR AVATAR IF NEEDED)
======================================================== */
function hashToHsl(seed: string, s = 65, l = 58) {
  let h = 0;
  for (let i = 0; i < seed.length; i++)
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360} ${s}% ${l}%)`;
}

/* ========================================================
   COMPONENT
======================================================== */
type OrderModalProps = {
  open: boolean;
  onClose: () => void;
  initialPlatform?: string;
  initialService?: string;
  initialQuantity?: number; // 🔥 NEW
};

export default function OrderModal({
  open,
  onClose,
  initialPlatform,
  initialService,
  initialQuantity,
}: OrderModalProps) {
  const [step, setStep] = useState(0);

  const [platform, setPlatform] = useState<Platform>(PLATFORMS[0]);
  const [service, setService] = useState<Service | null>(null);

  const [quantity, setQuantity] = useState<number>(100);
  const [target, setTarget] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [lockedDiscount, setLockedDiscount] = useState<{
    discount: number;
    original: number;
  } | null>(null);

  // Email state
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    let selectedPlatform = PLATFORMS[0];
    let selectedService: Service | null = null;
    let nextStep = 0;

    if (initialPlatform) {
      const lower = initialPlatform.toLowerCase();
      const found = PLATFORMS.find(
        (p) =>
          p.key.toLowerCase() === lower ||
          p.name.toLowerCase() === lower
      );

      if (found) {
        selectedPlatform = found;
        if (initialService) {
          const lowerService = initialService.toLowerCase();
          const serv = found.services.find(
            (s) => s.type.toLowerCase() === lowerService
          );
          if (serv) {
            selectedService = serv;
            nextStep = 2;
          } else {
            nextStep = 1;
          }
        } else {
          nextStep = 1;
        }
      }
    }

    setPlatform(selectedPlatform);
    setService(selectedService);
setQuantity(initialQuantity ?? 100);
    setTarget("");
    setEmail("");
    setError("");

    if (selectedService) {
      const d = getDiscountedPrice(selectedService.price);
      setLockedDiscount({ discount: d.discount, original: d.original });
    } else {
      setLockedDiscount(null);
    }

    setStep(nextStep);
  }, [open, initialPlatform, initialService]);

  const isContentEngagement =
    service?.type === "Likes" || service?.type === "Views";

  if (!open) return null;

  const { pkg, type } =
    service ? getStealthPackage(platform, service) : { pkg: "", type: "" };

  const currentPrice = service
    ? getPackagePrice(platform, service, quantity)
    : 0;

  const discount = lockedDiscount?.discount ?? 0;
  const original = lockedDiscount?.original ?? currentPrice;
  const discounted = currentPrice;

  // Email included, quantity added (and amount kept for backwards compat)
  const orderToSend = {
    package: pkg,
    type,
    quantity,
    amount: quantity,
    reference: target,
    email,
    total: Number(discounted.toFixed(2)),
    platform: platform.key,
    service: service?.type.toString(),
  };

  function handleBack() {
    setError("");
    setStep((prev) => Math.max(0, prev - 1));
  }

  /* ========================================================
     DETAILS VALIDATION WITH EMAIL
  ======================================================== */
  function handleNextFromDetails() {
    if (!service) {
      setError("Choose a service first.");
      return;
    }

    const cleaned = sanitizeFollowizInput(
      target,
      service.type.toString()
    );
    const needsUrl =
      service.type.toString().toLowerCase() === "likes" ||
      service.type.toString().toLowerCase() === "views";

    if (!cleaned) {
      setError(
        needsUrl
          ? "Full post/video link required."
          : "Enter a valid username."
      );
      return;
    }

    if (!quantity || quantity < 1) {
      setError("Select a valid amount.");
      return;
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }

    setError("");
    setStep(3);
  }

  /* ========================================================
     CHECKOUT USING SANITIZER + EMAIL
  ======================================================== */
  function handleSecureCheckout(e: React.FormEvent) {
    e.preventDefault();

    if (!service) {
      setError("Choose a service first.");
      return;
    }

    const cleaned = sanitizeFollowizInput(
      target,
      service.type.toString()
    );
    const needsUrl =
      service.type.toString().toLowerCase() === "likes" ||
      service.type.toString().toLowerCase() === "views";

    if (!cleaned) {
      setError(
        needsUrl
          ? "Full post or video URL required."
          : "Enter a valid username."
      );
      return;
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }

    const encoded = btoa(
      unescape(
        encodeURIComponent(
          JSON.stringify({
            ...orderToSend,
            reference: cleaned,
            email,
          })
        )
      )
    );
    window.location.href =
      "https://checkout.yesviral.com/checkout?order=" + encoded;
  }

  function getTargetLabel() {
    if (!service) return "Profile or Link";
    if (
      service.type === "Followers" ||
      service.type === "Subscribers"
    )
      return "Profile or Username";
    return "Post / Video Link";
  }

  function getTargetPlaceholder() {
    if (!service) return "Enter profile or link";

    if (
      service.type === "Followers" ||
      service.type === "Subscribers"
    ) {
      if (platform.key.toLowerCase() === "instagram")
        return "@username or instagram.com/username";
      if (platform.key.toLowerCase() === "tiktok")
        return "@username or tiktok.com/@username";
      if (platform.key.toLowerCase() === "youtube")
        return "Channel URL or @handle";
      return "Profile URL or username";
    }
    if (platform.key.toLowerCase() === "instagram")
      return "Paste Instagram post / reel link";
    if (platform.key.toLowerCase() === "tiktok")
      return "Paste TikTok video link";
    if (platform.key.toLowerCase() === "youtube")
      return "Paste YouTube video link";
    return "Paste post / video link";
  }

  function getHeaderTitle() {
    if (step === 0) return "Choose a platform";
    if (step === 1) return platform.name;
    if (step === 2 || step === 3) {
      if (service) return `${platform.name} ${service.type}`;
      return platform.name;
    }
    return platform.name;
  }

  function ServiceSummary() {
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

        <span className="text-[#0B63E6]">
          {service ? platform.name : "Choose a service"}
        </span>

        {service && (
          <>
            <span className="opacity-40">•</span>
            <span className="inline-flex items-center gap-1 text-[#334155]">
              {service.icon}
              {service.type}
            </span>
          </>
        )}
      </div>
    );
  }

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
        className={
          "flex-none h-11 min-w-[80px] px-3 rounded-full border text-sm font-bold tracking-tight transition-all select-none " +
          (selected
            ? "bg-[#007BFF] text-white border-[#007BFF] shadow-[0_10px_30px_rgba(0,123,255,0.35)]"
            : "bg-white text-[#0B63E6] border-[#DCEBFF] hover:border-[#7FB5FF] hover:bg-[#F6FAFF]")
        }
      >
        {label}
      </button>
    );
  }

  function AmountSelector() {
    if (!service) return null;

    const options = getQuickAmounts(platform, service);
    const format = (v: number) => (v >= 1000 ? `${v / 1000}K` : `${v}`);

    return (
      <div className="w-full max-w-[640px] mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-extrabold text-[#0B63E6]">Amount</h4>
          <div className="hidden sm:block">
            <ServiceSummary />
          </div>
        </div>

        <div className="mb-2 sm:hidden">
          <ServiceSummary />
        </div>

        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 w-full"
          role="radiogroup"
        >
          {options.map((v) => (
            <Pill
              key={v}
              label={format(v)}
              selected={quantity === v}
              onClick={() => setQuantity(v)}
              ariaLabel={`${v}`}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ========================================================
     FORMAT REFERENCE FOR REVIEW (CLICKABLE LINK)
  ======================================================== */
  function formatReference(): { display: string; href: string } {
    if (!service) return { display: "", href: "" };

    const cleaned = sanitizeFollowizInput(
      target,
      service.type.toString()
    );
    const rawTrimmed = target.trim();
    const needsUrl =
      service.type.toString().toLowerCase() === "likes" ||
      service.type.toString().toLowerCase() === "views";

    if (needsUrl) {
      const display = cleaned || rawTrimmed;
      const href = cleaned || "";
      return { display, href };
    }

    // Followers / Subscribers → build profile URLs
    const usernameBase = cleaned || rawTrimmed.replace(/^@+/, "");
    if (!usernameBase) return { display: "", href: "" };

    const display = "@" + usernameBase;
    let href = "";
    const key = platform.key.toLowerCase();

    if (key === "instagram") href = `https://instagram.com/${usernameBase}`;
    else if (key === "tiktok")
      href = `https://www.tiktok.com/@${usernameBase}`;
    else if (key === "youtube")
      href = `https://www.youtube.com/@${usernameBase}`;

    return { display, href };
  }

  const { display: refDisplay, href: refHref } = formatReference();

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-3 py-6 sm:px-4 sm:py-8">
      <div
        className="w-full max-w-xl bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-[#D6E4FF] flex flex-col overflow-hidden"
        style={{ maxHeight: "94vh" }}
      >
        {/* HEADER */}
        <div
          className="w-full border-b px-5 py-5 sm:px-6 sm:py-6 relative"
          style={{
            background: "linear-gradient(to right, #E6F0FF, #FFFFFF)",
            borderColor: COLORS.border,
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full border border-[#E3EDFC] shadow flex items-center justify-center hover:bg-[#F3F7FF] transition"
          >
            <X size={20} className="text-[#007BFF]" />
          </button>

          <div className="flex items-center gap-3 pr-12">
            <div className="w-10 h-10 rounded-2xl bg-white shadow flex items-center justify-center">
              {step === 0 ? (
                <HelpCircle size={28} className="text-[#94A3B8]" />
              ) : (
                platform.icon
              )}
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#2563EB] tracking-wider uppercase">
                YesViral Order
              </div>
              <div className="text-sm font-bold text-[#0F172A]">
                {getHeaderTitle()}
              </div>
            </div>
          </div>

          {/* STEPS INDICATOR */}
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

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6 sm:py-7 bg-[#FAFCFF]">
          {/* STEP 0 — PLATFORM SELECTION */}
          {step === 0 && (
            <div>
              <h3 className="text-center text-xl sm:text-2xl font-black text-[#111]">
                Choose Platform
              </h3>
              <p className="text-center text-sm text-[#64748B] mt-2">
                YesViral’s Top-Rated Growth services to Boost your
                visibility, Elevate your presence and deliver High-Quality
                results.
              </p>

              {/* 4.8/5 STAR RATING */}
              <div className="mt-3 flex items-center justify-center gap-1">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill={i < 4 ? "#007BFF" : "#CFE4FF"}
                      stroke="#007BFF"
                      strokeWidth="1.2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.3l6.18 3.7-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-xs font-semibold text-[#0B63E6]">
                  4.8 / 5 rating by Customers
                </span>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => {
                      setPlatform(p);
                      setService(null);
                      setLockedDiscount(null);
                      setStep(1);
                    }}
                    className={
                      "w-[140px] h-[110px] flex flex-col items-center justify-center rounded-2xl border transition shadow-sm " +
                      (platform.key === p.key
                        ? "bg-[#FFFFFF] border-[#007BFF] shadow-lg scale-[1.03]"
                        : "bg-white border-[#D6E4FF] hover:border-[#7FB5FF]")
                    }
                  >
                    <div className="w-10 h-10 rounded-2xl bg-[#EFF4FF] flex items-center justify-center mb-2">
                      {p.icon}
                    </div>
                    <div className="font-semibold">{p.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — SERVICE SELECT */}
          {step === 1 && (
            <div>
              <h3 className="text-center text-xl sm:text-2xl font-black text-[#111]">
                {platform.name} Services
              </h3>
              <p className="text-center text-sm text-[#64748B] mt-2">
                Choose from our High-Quality services — Followers, Likes, and
                Views.
              </p>

              <div className="mt-6 space-y-3">
                {platform.services.map((s) => {
                  const {
                    discount: disc,
                    discounted: realPrice,
                    original: msrp,
                  } = getDiscountedPrice(s.price);

                  return (
                    <button
                      key={s.type}
                      onClick={() => {
                        setService(s);
                        const d = getDiscountedPrice(s.price);
                        setLockedDiscount({
                          discount: d.discount,
                          original: d.original,
                        });
                        setStep(2);
                      }}
                      className={
                        "w-full flex items-center justify-between p-4 rounded-2xl border shadow-sm transition " +
                        (service?.type === s.type
                          ? "border-[#007BFF] bg-white shadow-lg scale-[1.01]"
                          : "border-[#D6E4FF] bg-white hover:border-[#7FB5FF]")
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-[#EFF4FF] flex items-center justify-center">
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
                            Trusted • High Quality • Secure
                          </div>
                        </div>

                        {disc > 0 && (
                          <span className="text-xs text-[#007BFF] bg-[#E6F0FF] px-2 py-1 rounded-full flex items-center gap-1">
                            <Tag size={12} /> -{disc}% OFF
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="line-through text-xs text-[#9CA3AF]">
                          ${msrp.toFixed(2)}
                        </div>
                        <div className="font-bold text-[#007BFF]">
                          ${realPrice.toFixed(2)}
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
          {step === 2 && (
            <div>
              <h3 className="text-center text-xl sm:text-2xl font-black text-[#111]">
                Order Details
              </h3>

              <div className="mt-6 space-y-6">
                {/* TARGET / USERNAME FIELD */}
                <div>
                  <label className="text-sm font-semibold text-[#007BFF] mb-1 block">
                    {getTargetLabel()}{" "}
                    <span className="text-[#EF4444]">*</span>
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

                  {/* SAFETY WARNING */}
                  <div className="mt-2 flex items-start gap-2 text-xs text-[#EF4444] bg-[#FFECEC] border border-[#FFBDBD] px-3 py-2 rounded-lg shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mt-0.5"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12" y2="16" />
                    </svg>
                    <span className="leading-tight font-medium">
                      Make sure your account is <b>Public</b> and your
                      Username/Link is entered <b>correctly</b>. Incorrect
                      details can delay delivery.
                    </span>
                  </div>
                </div>

                {/* EMAIL FIELD */}
                <div className="mt-6">
                  <label className="text-sm font-semibold text-[#007BFF] mb-1 block">
                    Email <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border border-[#D6E4FF] rounded-xl p-3 text-sm shadow-sm focus:ring-2 focus:ring-[#007BFF] focus:border-[#007BFF]"
                  />
                  <div className="text-xs text-[#64748B] mt-1">
                    We’ll send your order ID and tracking updates here.
                  </div>
                </div>

                <AmountSelector />

                {service && (
                  <div className="text-center text-[#007BFF] font-extrabold text-xl mt-4">
                    Total: ${discounted.toFixed(2)}
                    <span className="text-sm text-[#B0B9C7] line-through ml-2">
                      ${original.toFixed(2)}
                    </span>
                  </div>
                )}

                {error && (
                  <div className="text-center text-sm text-red-500">
                    {error}
                  </div>
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
          {step === 3 && (
            <form onSubmit={handleSecureCheckout}>
              <h3 className="text-center text-xl sm:text-2xl font-black text-[#111]">
                Review & Checkout
              </h3>

              <div className="mt-6 border border-[#CFE4FF] bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] flex items-center justify-center">
                    {platform.icon}
                  </div>
                  <div>
                    <div className="font-bold text-[#111]">
                      {platform.name}
                    </div>
                    <div className="text-xs text-[#2563EB]">
                      {service ? service.type : "Choose a service"}
                    </div>
                  </div>
                </div>

                {service && (
                  <div className="mt-4 space-y-2 text-sm text-[#475569]">
                    <div className="flex justify-between">
                      <b>Package:</b> {pkg} ({type})
                    </div>
                    <div className="flex justify-between">
                      <b>User / Link:</b>{" "}
                      <span className="max-w-[160px] break-words text-right">
                        {refHref ? (
                          <a
                            href={refHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#007BFF] hover:underline break-words inline-flex items-center gap-1"
                          >
                            {refDisplay || "—"}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3 h-3 text-[#007BFF]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        ) : (
                          refDisplay || "—"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <b>Amount:</b> {quantity}
                    </div>
                    <div className="flex justify-between">
                      <b>Price:</b>
                      <span>
                        <span className="text-[#007BFF] font-semibold">
                          ${discounted.toFixed(2)}
                        </span>
                        <span className="line-through text-[#94A3B8] text-xs ml-1">
                          ${original.toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>
                )}

                {service && (
                  <div className="mt-3 pt-3 border-t border-dashed border-[#CFE4FF] flex justify-between text-[#111] font-bold text-lg">
                    <div>Total</div>
                    <div className="text-[#007BFF]">
                      ${discounted.toFixed(2)}
                    </div>
                  </div>
                )}
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
                Private Networks • Encrypted • Discreet Billing
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

function onClickBackSafe(fn: () => void) {
  return fn;
}
