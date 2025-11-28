// path: pages/dashboard/index.tsx
import React, { useEffect, useMemo, useState, useCallback, memo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import {
  UserCircle,
  LogOut,
  Instagram,
  Youtube,
  Music2,
  UserPlus,
  ThumbsUp,
  Eye,
  BarChart,
  List,
  CheckCircle,
  Loader2,
  BadgePercent,
  Menu,
  Tag,
  Play,
  HelpCircle,
} from "lucide-react";

/* ============================ Types ============================ */
type ServiceType = "Followers" | "Likes" | "Views" | "Subscribers";
type Service = {
  type: ServiceType | string;
  price: number;
  icon: React.ElementType;
  iconColor: string;
};
type Platform = {
  key: string;
  name: string;
  icon: React.ElementType;
  iconColor: string;
  services: Service[];
};
interface Order {
  id: string;
  platform: string;
  service: string;
  quantity: number;
  status: string;
  created_at: string;
}
type PreviewData = {
  ok: boolean;
  type?: string;
  image?: string | null;
  error?: string;
};

/* ============================ Theme ============================ */
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

/* ========================== Platforms ========================== */
const PLATFORMS: Platform[] = [
  {
    key: "instagram",
    name: "Instagram",
    icon: Instagram,
    iconColor: "#E1306C",
    services: [
      { type: "Followers", price: 0.09, icon: UserPlus, iconColor: "#E1306C" },
      { type: "Likes", price: 0.07, icon: ThumbsUp, iconColor: "#E1306C" },
      { type: "Views", price: 0.04, icon: Eye, iconColor: "#E1306C" },
    ],
  },
  {
    key: "tiktok",
    name: "TikTok",
    icon: Music2,
    iconColor: "#00F2EA",
    services: [
      { type: "Followers", price: 0.1, icon: UserPlus, iconColor: "#00F2EA" },
      { type: "Likes", price: 0.08, icon: ThumbsUp, iconColor: "#00F2EA" },
      { type: "Views", price: 0.06, icon: Eye, iconColor: "#00F2EA" },
    ],
  },
  {
    key: "youtube",
    name: "YouTube",
    icon: Youtube,
    iconColor: "#FF0000",
    services: [
      { type: "Subscribers", price: 0.12, icon: UserPlus, iconColor: "#FF0000" },
      { type: "Likes", price: 0.09, icon: ThumbsUp, iconColor: "#FF0000" },
      { type: "Views", price: 0.05, icon: Eye, iconColor: "#FF0000" },
    ],
  },
];

const NAV_TABS = [
  { key: "order", label: "Order", icon: <BadgePercent size={19} /> },
  { key: "orders", label: "Current", icon: <List size={19} /> },
  { key: "completed", label: "Completed", icon: <CheckCircle size={19} /> },
  { key: "analytics", label: "Analytics", icon: <BarChart size={19} /> },
  { key: "profile", label: "Account", icon: <UserCircle size={19} /> },
];

const ORDER_STEPS = [
  { label: "Platform" },
  { label: "Service" },
  { label: "Details" },
  { label: "Review" },
];

function getStealthPackage(platform: Platform, service: Service) {
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

/* =========================== Helpers ========================== */
function getQuickAmounts(platform: Platform, service?: Service | null): number[] {
  if (!service) return [100, 500, 1000, 2000, 5000, 10000];

  const t = service.type.toString().toLowerCase();
  const k = platform.key;

  if (k === "instagram" && t === "views")
    return [500, 2000, 5000, 10000, 20000, 50000];
  if (k === "instagram" && t === "followers")
    return [
      100, 200, 350, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000,
    ];
  if (k === "instagram" && t === "likes")
    return [50, 100, 300, 500, 1000, 2000, 5000, 10000, 20000];

  if (k === "tiktok" && (t === "followers" || t === "likes"))
    return [100, 250, 500, 1000, 2000, 5000, 10000];
  if (k === "tiktok" && t === "views")
    return [1000, 2000, 5000, 10000, 20000, 50000];

  if (k === "youtube" && t === "views")
    return [200, 500, 1000, 2000, 5000, 10000];
  if (k === "youtube" && t === "subscribers")
    return [200, 500, 1000, 2000, 5000, 10000];
  if (k === "youtube" && t === "likes")
    return [250, 500, 1000, 2000, 5000, 10000];

  return [100, 500, 1000, 2000, 5000, 10000, 25000, 50000];
}

function getDiscountedPrice(price: number) {
  const discount = 0.02 + Math.random() * 0.02;
  const discounted = Math.max(
    0.01,
    Number((price * (1 - discount)).toFixed(3))
  );
  return { discount: Math.round(discount * 100), discounted };
}

const isLink = (t: string) => /^https?:\/\//i.test(t.trim());

function getTargetLabel(service?: Service | null) {
  if (!service) return "Profile or Link";
  return service.type === "Followers" || service.type === "Subscribers"
    ? "Profile or Username"
    : "Post / Video Link";
}

function getTargetPlaceholder(platform: Platform, service?: Service | null) {
  if (!service) return "Enter profile or link";

  const isFollow =
    service.type === "Followers" || service.type === "Subscribers";
  if (isFollow) {
    if (platform.key === "instagram")
      return "@username or instagram.com/username";
    if (platform.key === "tiktok")
      return "@username or tiktok.com/@username";
    if (platform.key === "youtube")
      return "Channel URL or @handle";
    return "Profile link or username";
  }
  if (platform.key === "instagram")
    return "Paste your Instagram post / reel link";
  if (platform.key === "tiktok") return "Paste your TikTok video link";
  if (platform.key === "youtube") return "Paste your YouTube video link";
  return "Paste your post / video link";
}

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

/* ========================= ImageSafe ========================== */
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

/* ====================== API: preview mock ===================== */
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

/* ====================== ProfileForm (isolated) =================
   WHY: Memoized to prevent remounts while typing. No autoFocus.
=================================================================*/
type ProfileFormProps = {
  initialEmail: string;
};
const ProfileForm = memo(function ProfileForm({
  initialEmail,
}: ProfileFormProps) {
  const [newEmail, setNewEmail] = useState(initialEmail || "");
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  useEffect(() => {
    if (initialEmail && !newEmail) setNewEmail(initialEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEmail]);

  const onUpdateEmail = async () => {
    const email = newEmail.trim();
    if (!email) return toast.error("Enter a valid email.");
    const { error } = await supabase.auth.updateUser({ email });
    if (error) return toast.error(error.message);
    toast.success("Check your NEW email inbox to confirm the change.");
  };

  const onUpdatePassword = async () => {
    if (!passwordNew || passwordNew.length < 6)
      return toast.error("Password must be at least 6 characters.");
    const session = await supabase.auth.getSession();
    const email = session.data.session?.user?.email;
    if (!email) return toast.error("Not signed in.");
    const { error: reauthErr } = await supabase.auth.signInWithPassword({
      email,
      password: passwordCurrent,
    });
    if (reauthErr) return toast.error("Current password is incorrect.");
    const { error } = await supabase.auth.updateUser({ password: passwordNew });
    if (error) return toast.error(error.message);
    toast.success("Password updated.");
    setPasswordCurrent("");
    setPasswordNew("");
  };

  return (
    <div className="space-y-7">
      <h2 className="text-2xl font-extrabold mb-2 flex items-center gap-2">
        <UserCircle size={22} /> Account
      </h2>

      {/* Email */}
      <div className="max-w-md">
        <label
          htmlFor="email-input"
          className="block text-[#111] font-bold mb-2"
        >
          Email
        </label>
        <div className="flex gap-2 items-center">
          <input
            id="email-input"
            type="email"
            className="border border-[#CFE4FF] px-3 py-2 rounded-md w-full"
            placeholder="you@example.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.currentTarget.value)}
          />
          <button
            onClick={onUpdateEmail}
            className="bg[#007BFF] hover:bg-[#005FCC] text-white px-4 py-2 rounded font-bold bg-[#007BFF]"
          >
            Update
          </button>
        </div>
        <p className="text-xs text-[#555] mt-1">
          A confirmation link will be sent to the new email. Your account email only
          changes after you confirm.
        </p>
      </div>

      {/* Password */}
      <div className="max-w-md">
        <label className="block text-[#111] font-bold mb-2">
          Change Password
        </label>
        <div className="flex flex-col gap-2">
          <input
            id="current-password"
            type="password"
            placeholder="Current password"
            value={passwordCurrent}
            onChange={(e) => setPasswordCurrent(e.currentTarget.value)}
            className="border border-[#CFE4FF] px-3 py-2 rounded-md w-full"
          />
          <input
            id="new-password"
            type="password"
            placeholder="New password (6+ chars)"
            value={passwordNew}
            onChange={(e) => setPasswordNew(e.currentTarget.value)}
            className="border border-[#CFE4FF] px-3 py-2 rounded-md w-full"
          />
          <div>
            <button
              onClick={onUpdatePassword}
              className="bg-[#007BFF] hover:bg-[#005FCC] text-white px-4 py-2 rounded font-bold"
            >
              Update Password
            </button>
          </div>
        </div>
        <p className="text-xs text-[#555] mt-1">
          You’ll stay signed in on this device.
        </p>
      </div>
    </div>
  );
});

/* =========================== Page ============================ */
export default function DashboardPage() {
  const router = useRouter();

  // Session / profile
  const [activeTab, setActiveTab] = useState("order");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileEmail, setProfileEmail] = useState("");
  const [analytics, setAnalytics] = useState({ total: 0, completed: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Order state (inline OrderModal flow)
  const [orderStep, setOrderStep] = useState(0);
  const [platform, setPlatform] = useState<Platform>(PLATFORMS[0]);
  const [service, setService] = useState<Service | null>(null);
  const [quantity, setQuantity] = useState<number>(100);
  const [target, setTarget] = useState<string>("");
  const [orderError, setOrderError] = useState<string>("");
  const [orderLoading, setOrderLoading] = useState(false);

  // Locked discount for selected service
  const [priceState, setPriceState] = useState(() =>
    getDiscountedPrice(PLATFORMS[0].services[0].price)
  );
  const discount = priceState.discount;
  const discounted = priceState.discounted;

  // Package details for Review step
  const { pkg, type } = service
    ? getStealthPackage(platform, service)
    : { pkg: "", type: "" };

  // Review preview-only
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const isContentEngagement =
    service?.type === "Likes" || service?.type === "Views";
  const isVideo = useMemo(
    () => isContentEngagement && isLink(target),
    [isContentEngagement, target]
  );

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session || !session.user) {
        router.push("/login");
        return;
      }
      const email = session.user.email || "";
      setProfileEmail(email);

      const { data: allOrders } = await supabase
        .from("orders")
        .select("id, platform, service, quantity, status, created_at")
        .eq("email", email)
        .order("created_at", { ascending: false });

      if (allOrders) {
        setOrders(allOrders as Order[]);
        const completed = allOrders.filter(
          (o: Order) => o.status === "Completed"
        );
        setAnalytics({ total: allOrders.length, completed: completed.length });
      }
      setLoading(false);
    };
    fetchUserAndOrders();
  }, [router]);

  // re-lock discount when service/platform changes
  useEffect(() => {
    if (service) {
      setPriceState(getDiscountedPrice(service.price));
    }
  }, [service, platform]);

  /* ===================== Order handlers ===================== */
  function resetOrder() {
    setOrderStep(0);
    setPlatform(PLATFORMS[0]);
    setService(null);
    setQuantity(100);
    setTarget("");
    setOrderError("");
    setPreview(null);
    setPreviewLoading(false);
  }

  function handleOrderNext() {
    if (orderStep === 2) {
      const trimmed = target.trim();
      if (!trimmed) {
        setOrderError(
          isContentEngagement
            ? "Paste full post / video link."
            : "Paste your profile link or username."
        );
        return;
      }
      if (isContentEngagement && !isLink(trimmed)) {
        setOrderError("Full post or video URL required.");
        return;
      }
      if (!quantity || quantity < 1) {
        setOrderError("Select a valid amount.");
        return;
      }
    }
    setOrderError("");
    setOrderStep(orderStep + 1);
  }

  function handleOrderBack() {
    setOrderError("");
    setOrderStep((prev) => Math.max(0, prev - 1));
  }

  function handleSecureCheckout(e: React.FormEvent) {
    e.preventDefault();

    if (!service) {
      setOrderError("Choose a service first.");
      return;
    }

    const trimmed = target.trim();
    if (!trimmed) {
      setOrderError(
        isContentEngagement
          ? "Paste full post / video link."
          : "Paste your profile link or username."
      );
      return;
    }
    if (isContentEngagement && !isLink(trimmed)) {
      setOrderError("Full post or video URL required.");
      return;
    }

    setOrderError("");
    setOrderLoading(true);

    const { pkg: packageName, type: packageType } = getStealthPackage(
      platform,
      service
    );

    const order = {
      package: packageName,
      type: packageType,
      platform: platform.key,
      service: service.type,
      amount: quantity,
      reference: target,
      total: Number((discounted * quantity).toFixed(2)),
    };

    const orderString = btoa(
      unescape(encodeURIComponent(JSON.stringify(order)))
    );
    window.location.href = `https://checkout.yesviral.com/checkout?order=${orderString}`;
  }

  /* ==================== Preview fetch (review-only) ==================== */
  const doFetchPreview = useCallback(
    async () => {
      if (orderStep !== 3) return;

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
    [orderStep, target, platform.key, isContentEngagement]
  );

  useEffect(() => {
    if (orderStep !== 3) return;

    const id = setTimeout(() => void doFetchPreview(), 150);
    return () => clearTimeout(id);
  }, [orderStep, doFetchPreview]);

  /* ===================== UI bits reused ===================== */
  function ServiceSummary() {
    const PlatformIcon = platform.icon;
    const ServiceIcon = service?.icon;

    return (
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold"
        style={{ borderColor: COLORS.border, background: "#F7FBFF" }}
        aria-live="polite"
      >
        <span
          className="inline-flex items-center justify-center w-5 h-5 rounded-full"
          style={{ background: COLORS.accentBg }}
        >
          {service ? (
            <PlatformIcon size={12} style={{ color: platform.iconColor }} />
          ) : (
            <HelpCircle size={12} className="text-[#94A3B8]" />
          )}
        </span>
        <span className="text-[#0B63E6]">
          {service ? platform.name : "Choose a service"}
        </span>
        {service && ServiceIcon && (
          <>
            <span className="opacity-40">•</span>
            <span className="inline-flex items-center gap-1 text-[#334155]">
              <ServiceIcon size={12} style={{ color: service.iconColor }} />
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
    if (!service) return null;

    const options = getQuickAmounts(platform, service);
    const toLabel = (v: number) => (v >= 1000 ? `${v / 1000}K` : `${v}`);
    const ariaService = `${platform.name} ${service.type}`;

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

  function PreviewMini() {
    const hasImg = !!(preview && preview.ok && preview.image);
    const normalized = normalizeHandle(platform, target || "");
    const avatarHue = hashToHsl(normalized || platform.name);

    return (
      <div
        className="w-full max-w-sm rounded-xl border bg-white shadow-lg overflow-hidden mx-auto"
        style={{ borderColor: COLORS.border }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2 border-b bg-white"
          style={{ borderColor: "#E0ECFF" }}
        >
          <div
            className="flex items-center justify-center w-7 h-7 rounded-full"
            style={{ background: COLORS.accentBg }}
          >
            {(() => {
              const I = platform.icon;
              return <I size={14} style={{ color: platform.iconColor }} />;
            })()}
          </div>
          <div className="min-w-0">
            <span
              className="text-[11px] font-bold"
              style={{ color: COLORS.primary }}
            >
              Preview
            </span>
            <div className="text-[10px] text-[#6B7280]">
              {isContentEngagement ? "Post / video" : "Profile"}
            </div>
          </div>
        </div>

        <div className="relative w-full bg-[#DAE6FF]">
          <div
            className="relative w-full"
            style={{ paddingTop: "75%", maxHeight: 140 }}
          >
            {previewLoading && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#EAF2FF] via-[#F5FAFF] to-white" />
            )}

            {!previewLoading && hasImg && (
              <>
                <ImageSafe
                  src={preview!.image as string}
                  alt="Content preview"
                />
                {isContentEngagement && isLink(target) && (
                  <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 text-white text-[9px]">
                    <Play size={10} /> Video
                  </div>
                )}
              </>
            )}

            {!previewLoading && !hasImg && (
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className="w-[52%] max-w-[120px] aspect-square rounded-xl shadow grid place-items-center text-white font-extrabold text-xl"
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

        <div className="px-3 py-2 bg-white flex items-center justify-between">
          <div className="min-w-0">
            <span className="block text-[11px] font-semibold text-[#111] truncate max-w-[220px]">
              {normalized || "—"}
            </span>
            <span className="text-[10px] text-[#6B7280]">
              Preview only — not live
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* ============================ Tabs ============================ */
  const renderTabContent = () => {
    if (loading)
      return (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="animate-spin mr-2" /> Loading...
        </div>
      );

    if (activeTab === "order") {
      const orderPercent =
        (orderStep / (ORDER_STEPS.length - 1)) * 100;

      const PlatformIconHeader = platform.icon;
      const showQuestion = orderStep === 0 && !service;

      return (
        <div className="max-w-2xl mx-auto">
          <div
            className="w-full bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.16)] border border-[#D6E4FF] overflow-hidden"
          >
            {/* HEADER (from OrderModal) */}
            <div
              className="w-full border-b px-5 py-5 sm:px-6 sm:py-6 relative"
              style={{
                background: "linear-gradient(to right, #E6F0FF, #FFFFFF)",
                borderColor: COLORS.border,
              }}
            >
              {/* RESET BUTTON (acts like close) */}
              <button
                onClick={resetOrder}
                aria-label="Reset order"
                className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full border border-[#E3EDFC] shadow flex items-center justify-center hover:bg-[#F3F7FF] transition"
              >
                <HelpCircle size={20} className="text-[#007BFF]" />
              </button>

              {/* PLATFORM + SERVICE TITLE */}
              <div className="flex items-center gap-3 pr-12">
                <div className="w-10 h-10 rounded-2xl bg-white shadow flex items-center justify-center">
                  {showQuestion ? (
                    <HelpCircle size={28} className="text-[#94A3B8]" />
                  ) : (
                    <PlatformIconHeader
                      size={26}
                      style={{ color: platform.iconColor }}
                    />
                  )}
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#2563EB] tracking-wider uppercase">
                    YesViral Order
                  </div>
                  <div className="text-sm font-bold text-[#0F172A]">
                    {orderStep === 0 && !service
                      ? "Choose a platform"
                      : service
                      ? `${platform.name} ${service.type}`
                      : platform.name}
                  </div>
                </div>
              </div>

              {/* STEPPER */}
              <div className="mt-4">
                <div className="grid grid-cols-4 gap-1">
                  {ORDER_STEPS.map((s, i) => (
                    <div key={s.label} className="flex flex-col items-center">
                      <div
                        className={
                          "w-8 h-8 flex items-center justify-center rounded-full border-4 text-xs font-bold " +
                          (orderStep === i
                            ? "bg-[#007BFF] border-[#007BFF] text-white"
                            : orderStep > i
                            ? "bg-[#E6F0FF] border-[#007BFF] text-[#007BFF]"
                            : "bg-[#E6F0FF] border-[#E6F0FF] text-[#9CA3AF]")
                        }
                      >
                        {i + 1}
                      </div>
                      <div
                        className={
                          "mt-1 text-[10px] font-semibold " +
                          (orderStep === i ? "text-[#007BFF]" : "text-[#9CA3AF]")
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
                      width: `${orderPercent}%`,
                      transition: "width 0.35s ease",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* CONTENT (OrderModal steps inline) */}
            <div className="flex-1 px-5 py-6 sm:px-6 sm:py-7 bg-[#FAFCFF]">
              {/* STEP 0: PLATFORM */}
              {orderStep === 0 && (
                <div>
                  <h3 className="text-center text-xl sm:text-2xl font-black text-[#111]">
                    Choose Platform
                  </h3>
                  <p className="text-center text-sm text-[#64748B] mt-2">
                    Select the platform you want to boost.
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {PLATFORMS.map((p) => {
                      const Icon = p.icon;
                      return (
                        <button
                          key={p.key}
                          onClick={() => {
                            setPlatform(p);
                            setService(null);
                            setQuantity(100);
                            setOrderStep(1);
                          }}
                          className={
                            "w-[140px] h-[110px] flex flex-col items-center justify-center rounded-2xl border transition shadow-sm " +
                            (platform.key === p.key
                              ? "bg-[#FFFFFF] border-[#007BFF] shadow-lg scale-[1.03]"
                              : "bg-white border-[#D6E4FF] hover:border-[#7FB5FF]")
                          }
                        >
                          <div className="w-10 h-10 rounded-2xl bg-[#EFF4FF] flex items-center justify-center mb-2">
                            <Icon size={26} style={{ color: p.iconColor }} />
                          </div>
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-[11px] text-[#94A3B8]">
                            Followers • Likes • Views
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 1: SERVICE */}
              {orderStep === 1 && (
                <div>
                  <h3 className="text-center text-xl sm:text-2xl font-black text-[#111]">
                    {platform.name} Services
                  </h3>
                  <p className="text-center text-sm text-[#64748B] mt-2">
                    Choose what type of engagement you want.
                  </p>

                  <div className="mt-6 space-y-3">
                    {platform.services.map((s) => {
                      const SIcon = s.icon;
                      const { discount: disc, discounted: discPrice } =
                        getDiscountedPrice(s.price);
                      const isSelected = service?.type === s.type;

                      return (
                        <button
                          key={s.type}
                          onClick={() => {
                            setService(s);
                            setQuantity(getQuickAmounts(platform, s)[0]);
                            setOrderStep(2);
                          }}
                          className={
                            "w-full flex items-center justify-between p-4 rounded-2xl border shadow-sm transition " +
                            (isSelected
                              ? "border-[#007BFF] bg-white shadow-lg scale-[1.01]"
                              : "border-[#D6E4FF] bg-white hover:border-[#7FB5FF]")
                          }
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-2xl bg-[#EFF4FF] flex items-center justify-center">
                              <SIcon size={20} style={{ color: s.iconColor }} />
                            </div>
                            <div>
                              <div
                                className={
                                  isSelected
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
                    onClick={handleOrderBack}
                  >
                    ← Back
                  </button>
                </div>
              )}

              {/* STEP 2: DETAILS */}
              {orderStep === 2 && (
                <div>
                  <h3 className="text-center text-xl sm:text-2xl font-black text-[#111]">
                    Order Details
                  </h3>

                  <div className="mt-6 space-y-6">
                    <div>
                      <label className="text-sm font-semibold text-[#007BFF] mb-1 block">
                        {getTargetLabel(service)}
                      </label>
                      <input
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        placeholder={getTargetPlaceholder(platform, service)}
                        className="w-full border border-[#D6E4FF] rounded-xl p-3 text-sm shadow-sm focus:ring-2 focus:ring-[#007BFF] focus:border-[#007BFF]"
                      />
                      <div className="text-xs text-[#64748B] mt-1">
                        {isContentEngagement
                          ? "Paste the full post or video URL."
                          : "Use @username or full profile URL."}
                      </div>
                    </div>

                    <AmountSelector />

                    {service && (
                      <div className="text-center text-[#007BFF] font-extrabold text-xl mt-4">
                        Total: ${(discounted * quantity).toFixed(2)}
                        <span className="text-sm text-[#B0B9C7] line-through ml-2">
                          {(service.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    )}

                    {orderError && (
                      <div className="text-center text-sm text-red-500">
                        {orderError}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
                    <button
                      onClick={handleOrderBack}
                      className="w-full sm:w-auto bg-[#E6F0FF] text-[#007BFF] border border-[#CFE4FF] rounded-xl px-5 py-3 font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleOrderNext}
                      className="w-full sm:w-auto bg-[#007BFF] hover:bg-[#005FCC] text-white rounded-xl px-5 py-3 font-semibold shadow"
                    >
                      Review
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: REVIEW */}
              {orderStep === 3 && (
                <form onSubmit={handleSecureCheckout}>
                  <h3 className="text-center text-xl sm:text-2xl font-black text-[#111]">
                    Review & Checkout
                  </h3>

                  <div className="mt-6 border border-[#CFE4FF] bg-white rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] flex items-center justify-center">
                        {service ? (
                          <PlatformIconHeader
                            size={20}
                            style={{ color: platform.iconColor }}
                          />
                        ) : (
                          <HelpCircle
                            className="text-[#94A3B8]"
                            size={20}
                          />
                        )}
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
                      <>
                        <div className="mt-4 space-y-2 text-sm text-[#475569]">
                          <div className="flex justify-between">
                            <b>Package:</b> {pkg} ({type})
                          </div>
                          <div className="flex justify-between">
                            <b>User / Link:</b>{" "}
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
                                {discounted.toFixed(3)}
                              </span>
                              <span className="line-through text-[#94A3B8] text-xs ml-1">
                                {service.price.toFixed(3)}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-dashed border-[#CFE4FF] flex justify-between text-[#111] font-bold text-lg">
                          <div>Total</div>
                          <div className="text-[#007BFF]">
                            {(discounted * quantity).toFixed(2)}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-6">
                    <PreviewMini />
                  </div>

                  {orderError && (
                    <div className="text-center text-sm text-red-500 mt-3">
                      {orderError}
                    </div>
                  )}

                  <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleOrderBack}
                      className="w-full sm:w-auto bg-[#E6F0FF] text-[#007BFF] border border-[#CFE4FF] rounded-xl px-5 py-3 font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-gradient-to-br from-[#007BFF] to-[#005FCC] text-white rounded-xl px-6 py-3 font-semibold shadow-lg flex items-center justify-center gap-2"
                      disabled={orderLoading}
                    >
                      {orderLoading ? (
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#E6F0FF"
                            strokeWidth="4"
                          />
                          <path
                            d="M22 12A10 10 0 0 1 12 22"
                            stroke="#007BFF"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <CheckCircle size={20} />
                      )}
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
        </div>
      );
    }

    if (activeTab === "orders") {
      const inProgress = orders.filter((o) => o.status !== "Completed");
      return (
        <div>
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2">
            <List size={22} /> Current Orders
          </h2>
          {inProgress.length === 0 ? (
            <div className="text-[#888] py-16 text-center">
              No current orders. Place your first order above!
            </div>
          ) : (
            <div
              className="overflow-x-auto"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#F5FAFF]">
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Platform</th>
                    <th className="p-3 text-left">Service</th>
                    <th className="p-3 text-left">Quantity</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inProgress.map((order) => (
                    <tr key={order.id} className="border-t">
                      <td className="p-3">{order.id.slice(0, 6)}...</td>
                      <td className="p-3">{order.platform}</td>
                      <td className="p-3">{order.service}</td>
                      <td className="p-3">{order.quantity}</td>
                      <td className="p-3 font-bold text-[#007BFF]">
                        {order.status}
                      </td>
                      <td className="p-3">
                        {new Date(order.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === "completed") {
      const completed = orders.filter((o) => o.status === "Completed");
      return (
        <div>
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2">
            <CheckCircle size={22} /> Completed Orders
          </h2>
          {completed.length === 0 ? (
            <div className="text-[#888] py-16 text-center">
              No completed orders yet.
            </div>
          ) : (
            <div
              className="overflow-x-auto"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#F5FAFF]">
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Platform</th>
                    <th className="p-3 text-left">Service</th>
                    <th className="p-3 text-left">Quantity</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {completed.map((order) => (
                    <tr key={order.id} className="border-t">
                      <td className="p-3">{order.id.slice(0, 6)}...</td>
                      <td className="p-3">{order.platform}</td>
                      <td className="p-3">{order.service}</td>
                      <td className="p-3">{order.quantity}</td>
                      <td className="p-3 font-bold text-[#007BFF]">
                        {order.status}
                      </td>
                      <td className="p-3">
                        {new Date(order.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === "analytics") {
      return (
        <div>
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2">
            <BarChart size={22} /> Analytics
          </h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 mb-10">
            <DashboardStat label="Orders" value={analytics.total} color="blue" />
            <DashboardStat
              label="Completed"
              value={analytics.completed}
              color="blue"
            />
            <DashboardStat
              label="Spent"
              value={
                "$" +
                orders
                  .reduce(
                    (sum, o) =>
                      sum +
                      o.quantity *
                        (PLATFORMS.find((p) => p.name === o.platform)?.services.find(
                          (s) => s.type === o.service
                        )?.price || 0),
                    0
                  )
                  .toFixed(2)
              }
              color="blue"
            />
            <DashboardStat
              label="Refill Eligible"
              value={orders.filter((o) => o.status === "Completed").length}
              color="blue"
            />
          </div>
        </div>
      );
    }

    if (activeTab === "profile") {
      return <ProfileForm initialEmail={profileEmail} />;
    }

    return <div>Pick a tab…</div>;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let meta = document.querySelector(
        'meta[name="viewport"]'
      ) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta") as HTMLMetaElement;
        meta.name = "viewport";
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", "width=device-width, initial-scale=1");
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-2">
            <button
              className="block md:hidden p-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Open Navigation"
            >
              <Menu size={28} className="text-[#007BFF]" />
            </button>
            <Image
              src="/logo.png"
              alt="YesViral Logo"
              width={38}
              height={38}
            />
            <span className="text-2xl font-extrabold text-[#007BFF] tracking-tight">
              Dashboard
            </span>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="flex items-center gap-2 bg-[#EF4444] hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold shadow"
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-5 relative">
          <aside
            className={`fixed top-0 left-0 z-30 bg-white border-r border-[#CFE4FF] shadow-md h-full w-60 transform md:static md:translate-x-0 transition-transform duration-200
            rounded-none md:rounded-2xl p-5 md:w-60 md:block
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }`}
          >
            <div className="flex justify-between items-center mb-8 md:hidden">
              <span className="font-extrabold text-lg text-[#007BFF]">
                Menu
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded hover:bg-[#F5FAFF]"
              >
                <LogOut size={22} className="text-[#007BFF]" />
              </button>
            </div>
            {NAV_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition text-base w-full
                  ${
                    activeTab === tab.key
                      ? "bg-[#007BFF] text-white shadow"
                      : "hover:bg-[#F5FAFF] text-[#111]"
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </aside>
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-20 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          <section className="flex-1 bg-white border border-[#CFE4FF] rounded-2xl shadow-sm p-4 sm:p-8 min-h-[440px]">
            {renderTabContent()}
          </section>
        </div>
      </div>

      <style jsx global>{`
        @keyframes flashSale {
          0%,
          100% {
            background: #e7f7f0;
            color: #007bff;
          }
          50% {
            background: #d9ecff;
            color: #005fcc;
          }
        }
        .animate-flashSale {
          animation: flashSale 2.5s infinite;
        }
        @media (max-width: 900px) {
          .max-w-7xl {
            padding: 0 0vw;
          }
        }
        @media (max-width: 600px) {
          .max-w-7xl {
            padding: 0 1vw;
          }
          aside,
          section {
            padding: 12px !important;
          }
          h2 {
            font-size: 1.1rem !important;
          }
          th,
          td {
            font-size: 0.98rem;
          }
          .text-2xl {
            font-size: 1.3rem !important;
          }
        }
        table {
          width: 100%;
        }
        th,
        td {
          white-space: nowrap;
        }
      `}</style>
    </main>
  );
}

/* ========================= Stat Card ========================= */
function DashboardStat({
  label,
  value,
  color,
}: {
  label: string;
  value: any;
  color: string;
}) {
  const textColor =
    color === "blue"
      ? "text-[#007BFF]"
      : color === "green"
      ? "text-green-500"
      : color === "yellow"
      ? "text-yellow-500"
      : "";
  return (
    <div className={`p-4 rounded-xl bg-[#F5FAFF] border border-[#CFE4FF] text-center shadow`}>
      <span className={`block text-sm font-semibold mb-1 ${textColor}`}>
        {label}
      </span>
      <span className="text-2xl font-extrabold">{value}</span>
    </div>
  );
}
