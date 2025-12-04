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

/* ============================ Types ============================ */
type ServiceType = "Followers" | "Likes" | "Views" | "Subscribers";
type Service = {
  type: ServiceType | string;
  price: number; // "From" price shown on cards
  icon: React.ElementType;
  iconColor: string;
  packages?: Record<number, number>; // amount -> fixed package price
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
  followiz_order_id: number | null;
  refill_until: string | null; // ⭐ refill column from DB (timestamp)
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
/**
 * PRICING MATCHES OrderModal.tsx
 * - Same "price" (from price)
 * - Same packages (amount -> fixed price)
 */
const PLATFORMS: Platform[] = [
  {
    key: "instagram",
    name: "Instagram",
    icon: Instagram,
    iconColor: "#E1306C",
    services: [
      {
        type: "Followers",
        price: 2.99,
        icon: UserPlus,
        iconColor: "#E1306C",
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
        icon: ThumbsUp,
        iconColor: "#E1306C",
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
        icon: Eye,
        iconColor: "#E1306C",
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
    key: "tiktok",
    name: "TikTok",
    icon: Music2,
    iconColor: "#00F2EA",
    services: [
      {
        type: "Followers",
        price: 2.49,
        icon: UserPlus,
        iconColor: "#00F2EA",
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
        icon: ThumbsUp,
        iconColor: "#00F2EA",
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
        icon: Eye,
        iconColor: "#00F2EA",
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
    key: "youtube",
    name: "YouTube",
    icon: Youtube,
    iconColor: "#FF0000",
    services: [
      {
        type: "Subscribers",
        price: 7.49,
        icon: UserPlus,
        iconColor: "#FF0000",
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
        icon: ThumbsUp,
        iconColor: "#FF0000",
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
        icon: Eye,
        iconColor: "#FF0000",
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

/* ======================= Puffery / Packages ======================= */
function getDiscountedPrice(realPrice: number) {
  if (!realPrice || realPrice <= 0) {
    return { discount: 0, discounted: realPrice, original: realPrice };
  }

  const factor = 2.4; // ~58% off look
  const original = Number((realPrice * factor).toFixed(2));
  const discountPercent = Math.round(100 - (realPrice / original) * 100);

  return {
    discount: discountPercent,
    discounted: realPrice,
    original,
  };
}

/**
 * Resolve fixed package price for the chosen amount.
 * - If no package defined, fallback to "from" price.
 */
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

/* =========================== Helpers ========================== */
function getStealthPackage(platform: Platform, service: Service) {
  let pkg = "Premium Package";
  let type = "Standard";

  // INSTAGRAM
  if (platform.key === "instagram" && service.type === "Followers")
    pkg = "Instagram Followers";
  if (platform.key === "instagram" && service.type === "Likes")
    pkg = "Instagram Likes";
  if (platform.key === "instagram" && service.type === "Views")
    pkg = "Instagram Views";

  // TIKTOK
  if (platform.key === "tiktok" && service.type === "Followers")
    pkg = "TikTok Followers";
  if (platform.key === "tiktok" && service.type === "Likes")
    pkg = "TikTok Likes";
  if (platform.key === "tiktok" && service.type === "Views")
    pkg = "TikTok Views";

  // YOUTUBE
  if (platform.key === "youtube" && service.type === "Subscribers")
    pkg = "YouTube Subscribers";
  if (platform.key === "youtube" && service.type === "Likes")
    pkg = "YouTube Likes";
  if (platform.key === "youtube" && service.type === "Views")
    pkg = "YouTube Views";

  if (service.type === "Followers" || service.type === "Subscribers")
    type = "High-Quality";
  if (service.type === "Likes") type = "Premium";
  if (service.type === "Views") type = "High-Retention";

  return { pkg, type };
}

/**
 * QUICK AMOUNTS – match OrderModal.tsx EXACTLY
 */
function getQuickAmounts(platform: Platform, service: Service): number[] {
  const t = service.type.toString().toLowerCase();
  const k = platform.key.toLowerCase();

  // INSTAGRAM
  if (k === "instagram" && t === "followers")
    return [50, 100, 250, 500, 1000, 2500, 5000];
  if (k === "instagram" && t === "likes")
    return [50, 100, 250, 500, 1000, 2500, 5000];
  if (k === "instagram" && t === "views")
    return [500, 1000, 2500, 5000, 10000, 25000, 50000];

  // TIKTOK
  if (k === "tiktok" && t === "followers")
    return [50, 100, 250, 500, 1000, 2500, 5000];
  if (k === "tiktok" && t === "likes")
    return [50, 100, 250, 500, 1000, 2500, 5000];
  if (k === "tiktok" && t === "views")
    return [1000, 2500, 5000, 10000, 25000, 50000];

  // YOUTUBE
  if (k === "youtube" && t === "subscribers")
    return [50, 100, 250, 500, 1000, 2500, 5000];
  if (k === "youtube" && t === "likes")
    return [50, 100, 250, 500, 1000, 2500, 5000];
  if (k === "youtube" && t === "views")
    return [500, 1000, 2500, 5000, 10000, 25000, 50000];

  return [100, 500, 1000, 2000, 5000, 10000];
}

const isLink = (t: string) => /^https?:\/\//i.test(t.trim());
function getTargetLabel(service: Service) {
  return service.type === "Followers" || service.type === "Subscribers"
    ? "Profile or Username"
    : "Post / Video Link";
}
function getTargetPlaceholder(platform: Platform, service: Service) {
  const isFollow =
    service.type === "Followers" || service.type === "Subscribers";
  if (isFollow) {
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
function normalizeHandle(platform: Platform, target: string) {
  const raw = target.trim();
  if (!raw) return "";
  if (isLink(raw)) return raw.replace(/^https?:\/\//, "");
  if (raw.startsWith("@")) return raw;
  if (["instagram", "tiktok", "youtube"].includes(platform.key))
    return `@${raw}`;
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

/* ====================== ProfileForm (isolated) ================= */
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
    <div className="space-y-7 max-w-xl">
      <h2 className="text-2xl font-extrabold mb-2 flex items-center gap-2 text-[#0F172A]">
        <UserCircle size={22} className="text-[#007BFF]" /> Account Settings
      </h2>
      <p className="text-sm text-[#6B7280] mb-4">
        Manage the details tied to your YesViral account. Changes apply across
        your dashboard and future orders.
      </p>

      {/* Email */}
      <div className="rounded-2xl border border-[#CFE4FF] bg-[#F9FBFF] p-5 shadow-[0_10px_40px_rgba(15,23,42,0.03)]">
        <h3 className="font-semibold text-[#0F172A] mb-2 text-sm">
          Login Email
        </h3>
        <p className="text-xs text-[#6B7280] mb-3">
          Update the email where you receive order confirmations and
          notifications.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <input
            id="email-input"
            type="email"
            className="border border-[#CFE4FF] px-3 py-2.5 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
            placeholder="you@example.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.currentTarget.value)}
          />
          <button
            onClick={onUpdateEmail}
            className="bg-[#007BFF] hover:bg-[#005FCC] text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-[0_10px_30px_rgba(0,123,255,0.35)] transition"
          >
            Update Email
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="rounded-2xl border border-[#CFE4FF] bg-[#FFFFFF] p-5 shadow-[0_10px_40px_rgba(15,23,42,0.03)]">
        <h3 className="font-semibold text-[#0F172A] mb-2 text-sm">
          Change Password
        </h3>
        <p className="text-xs text-[#6B7280] mb-4">
          Update your password. You’ll stay signed in on this device.
        </p>
        <div className="flex flex-col gap-2.5">
          <input
            id="current-password"
            type="password"
            placeholder="Current password"
            value={passwordCurrent}
            onChange={(e) => setPasswordCurrent(e.currentTarget.value)}
            className="border border-[#CFE4FF] px-3 py-2.5 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
          />
          <input
            id="new-password"
            type="password"
            placeholder="New password (6+ characters)"
            value={passwordNew}
            onChange={(e) => setPasswordNew(e.currentTarget.value)}
            className="border border-[#CFE4FF] px-3 py-2.5 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white"
          />
          <div className="pt-1">
            <button
              onClick={onUpdatePassword}
              className="bg-[#007BFF] hover:bg-[#005FCC] text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-[0_10px_30px_rgba(0,123,255,0.35)] transition"
            >
              Update Password
            </button>
          </div>
        </div>
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

  // ⭐ store logged-in Supabase user id for metadata
  const [userId, setUserId] = useState<string | null>(null);

  // Order state
  const [orderStep, setOrderStep] = useState(0);
  const [platform, setPlatform] = useState<Platform>(PLATFORMS[0]);
  const [service, setService] = useState<Service>(PLATFORMS[0].services[0]);
  const [quantity, setQuantity] = useState<number>(
    getQuickAmounts(PLATFORMS[0], PLATFORMS[0].services[0])[0]
  );
  const [target, setTarget] = useState<string>("");
  const [orderError, setOrderError] = useState<string>("");
  const [orderLoading, setOrderLoading] = useState(false);

  // Review preview-only
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const isContentEngagement =
    service.type === "Likes" || service.type === "Views";
  const isVideo = useMemo(
    () => isContentEngagement && isLink(target),
    [isContentEngagement, target]
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

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

      const uId = session.user.id;
      setUserId(uId); // ⭐ store user id for checkout metadata

      const fetchOrdersForUser = async (uid: string) => {
        const { data: allOrders } = await supabase
          .from("orders")
          .select(
            "id, platform, service, quantity, status, created_at, followiz_order_id, refill_until"
          )
          .eq("user_id", uid)
          .order("created_at", { ascending: false });

        if (allOrders) {
          // Strong typing
          setOrders(allOrders as Order[]);
          const completed = allOrders.filter(
            (o: any) => (o.status || "").toLowerCase() === "completed"
          );
          setAnalytics({ total: allOrders.length, completed: completed.length });
        }
      };

      // 🔥 Initial sync with Followiz, then load orders
      try {
        await fetch("/api/followiz-sync", { method: "POST" });
      } catch (e) {
        console.error("Initial followiz-sync failed", e);
      }

      await fetchOrdersForUser(uId);
      setLoading(false);

      // 🔁 Auto-refresh every 15 seconds (sync + fresh orders)
      interval = setInterval(async () => {
        try {
          await fetch("/api/followiz-sync", { method: "POST" });
        } catch (e) {
          console.error("followiz-sync interval error", e);
        }
        await fetchOrdersForUser(uId);
      }, 15000);
    };

    fetchUserAndOrders();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [router]);

  /* ===================== Order handlers ===================== */
  function handleOrderNext() {
    if (orderStep === 2) {
      if (!service) {
        setOrderError("Choose a service first.");
        return;
      }

      const cleaned = sanitizeFollowizInput(target, service.type.toString());
      const needsUrl =
        service.type === "Likes" || service.type === "Views";

      if (!cleaned) {
        setOrderError(
          needsUrl
            ? "Full post / video URL required."
            : "Enter a valid username."
        );
        return;
      }

      if (!quantity || quantity < 1) {
        setOrderError("Enter a valid amount.");
        return;
      }
    }
    setOrderError("");
    setOrderStep((prev) => Math.min(prev + 1, ORDER_STEPS.length - 1));
  }

  function handleOrderBack() {
    setOrderError("");
    setOrderStep((prev) => Math.max(prev - 1, 0));
  }

  function handleSecureCheckout(e: React.FormEvent) {
    e.preventDefault();

    if (!service) {
      setOrderError("Choose a service first.");
      return;
    }

    const cleaned = sanitizeFollowizInput(target, service.type.toString());
    const needsUrl =
      service.type === "Likes" || service.type === "Views";

    if (!cleaned) {
      setOrderError(
        needsUrl
          ? "Full post or video URL required."
          : "Enter a valid username."
      );
      return;
    }

    if (!quantity || quantity < 1) {
      setOrderError("Enter a valid amount.");
      return;
    }

    setOrderError("");
    setOrderLoading(true);

    const { pkg, type } = getStealthPackage(platform, service);
    const currentPrice = getPackagePrice(platform, service, quantity);

    // 🔥 IMPORTANT: include quantity, user_id, and email in the encoded order
    const order = {
      package: pkg,
      type,
      platform: platform.key,
      service: service.type,
      amount: quantity,
      quantity: quantity,
      reference: cleaned,
      total: Number(currentPrice.toFixed(2)),
      user_id: userId || null,
      email: profileEmail || null,
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
        setPreview({
          ok: false,
          error: "Post / video URL required for preview.",
        });
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
    const ServiceIcon = service.icon;
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
          <PlatformIcon size={12} style={{ color: platform.iconColor }} />
        </span>
        <span className="text-[#0B63E6]">{platform.name}</span>
        <span className="opacity-40">•</span>
        <span className="inline-flex items-center gap-1 text-[#334155]">
          <ServiceIcon size={12} style={{ color: service.iconColor }} />
          {service.type}
        </span>
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
            ? "bg[#007BFF] text-white border-[#007BFF] shadow-[0_8px_18px_rgba(0,123,255,.25)] bg-[#007BFF]"
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
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-extrabold text-[#0B63E6]">
            How many {platform.name} {service.type}?
          </h4>
          <div className="hidden sm:block">
            <ServiceSummary />
          </div>
        </div>

        <div className="mb-2 sm:hidden">
          <ServiceSummary />
        </div>

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

  function PreviewMini() {
    const hasImg = !!(preview && preview.ok && preview.image);
    const normalized = normalizeHandle(platform, target || "");
    const avatarHue = hashToHsl(normalized || platform.name);

    return (
      <div
        className="w-full max-w-sm rounded-xl border bg-white shadow-sm overflow-hidden mx-auto"
        style={{ borderColor: COLORS.border }}
      >
        <div
          className="flex itemscenter gap-2 px-3 py-2 border-b bg白/80"
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
              For display purposes only — Not a real-time account preview
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
          <Loader2 className="animate-spin mr-2 text-[#007BFF]" />{" "}
          <span className="text-sm text-[#64748B]">
            Loading your dashboard…
          </span>
        </div>
      );

    if (activeTab === "order") {
      const orderPercent =
        (orderStep / (ORDER_STEPS.length - 1)) * 100;

      // Header title driven by step
      const headerTitle =
        orderStep === 0
          ? "Choose Platform"
          : orderStep === 1
          ? platform.name
          : `${platform.name} ${service.type}`;

      const PlatformIconHeader = platform.icon;

      // For review: clickable username/link display
      const cleanedForReview = sanitizeFollowizInput(
        target,
        service.type.toString()
      );
      const needsUrlForReview =
        service.type === "Likes" || service.type === "Views";
      let refDisplay = "";
      let refHref = "";

      if (needsUrlForReview) {
        refDisplay = cleanedForReview || target.trim();
        refHref = cleanedForReview || "";
      } else {
        const usernameBase =
          cleanedForReview || target.trim().replace(/^@+/, "");
        if (usernameBase) {
          refDisplay = "@" + usernameBase;
          const key = platform.key.toLowerCase();
          if (key === "instagram")
            refHref = `https://instagram.com/${usernameBase}`;
          else if (key === "tiktok")
            refHref = `https://www.tiktok.com/@${usernameBase}`;
          else if (key === "youtube")
            refHref = `https://www.youtube.com/@${usernameBase}`;
        }
      }

      return (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-xl overflow-hidden">
            {/* Premium Header with Stepper */}
            <div
              className="w-full border-b px-5 py-5 sm:px-6 sm:py-6 relative"
              style={{
                background: "linear-gradient(to right, #E6F0FF, #FFFFFF)",
                borderColor: COLORS.border,
              }}
            >
              <div className="flex items-center gap-3 pr-2">
                <div className="w-10 h-10 rounded-2xl bg-white shadow flex items-center justify-center">
                  {orderStep === 0 ? (
                    <HelpCircle
                      size={26}
                      className="text-[#94A3B8]"
                    />
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
                    {headerTitle}
                  </div>
                </div>
              </div>

              {/* Stepper */}
              <div className="mt-4">
                <div className="relative mx-auto max-w-lg">
                  <div className="relative flex items-center justify-between z-20 mb-3">
                    {ORDER_STEPS.map((s, i) => (
                      <div
                        key={s.label}
                        className="flex flex-col items-center flex-1 min-w-0"
                      >
                        <div
                          className={`flex items-center justify-center w-8 h-8 font-extrabold text-xs border-2 transition
                            ${
                              orderStep === i
                                ? "bg-[#007BFF] text-white border-[#007BFF] shadow-lg scale-110"
                                : orderStep > i
                                ? "bg-[#007BFF] text-white border-[#007BFF]"
                                : "bg-[#E6F0FF] text-[#888] border-[#E6F0FF]"
                            }`}
                          style={{
                            marginBottom: 3,
                            borderRadius: "999px",
                            boxShadow:
                              orderStep === i
                                ? "0 2px 10px #007bff22"
                                : undefined,
                          }}
                        >
                          {i + 1}
                        </div>
                        <span
                          className="text-[10px] font-bold text-center whitespace-nowrap mt-1 transition"
                          style={{
                            color:
                              orderStep >= i ? COLORS.primary : COLORS.muted,
                            textShadow:
                              orderStep === i ? "0 1px 0 #fff" : "none",
                          }}
                        >
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="relative w-full h-[5px] rounded-full bg-[#E6F0FF] z-0">
                    <div
                      className="absolute top-0 left-0 h-[5px] rounded-full z-10"
                      style={{
                        width: `${orderPercent}%`,
                        background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.primaryHover} 100%)`,
                        transition:
                          "width .38s cubic-bezier(.51,1.15,.67,.97)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-5 py-6 sm:px-6 sm:py-7 bg-[#FAFCFF]">
              {/* STEP 0: Platform */}
              {orderStep === 0 && (
                <>
                  <h3 className="font-black text-2xl mb-2 text-[#111] text-center tracking-tight">
                    Choose Platform
                  </h3>
                  <p className="text-center text-sm text-[#64748B]">
                    Trust YesViral’s Top-Rated Growth services to Boost your
                    visibility, Elevate your presence, and deliver
                    High-Quality results.
                  </p>

                  {/* 4.8/5 rating line */}
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

                  <div className="mt-6 flex justify-center gap-5 flex-wrap mb-6">
                    {PLATFORMS.map((p) => {
                      const Icon = p.icon;
                      return (
                        <button
                          key={p.key}
                          className={`flex flex-col items-center gap-1 px-7 py-5 rounded-xl border-2 font-bold text-base shadow hover:shadow-lg transition
                            ${
                              platform.key === p.key
                                ? "border-[#007BFF] bg-[#E6F0FF] text-[#007BFF] scale-105"
                                : "border-[#CFE4FF] text-[#111111] bg-white"
                            }`}
                          style={{ minWidth: 120, minHeight: 90 }}
                          onClick={() => {
                            setPlatform(p);
                            const firstService = p.services[0];
                            setService(firstService);
                            setQuantity(
                              getQuickAmounts(p, firstService)[0]
                            );
                          }}
                        >
                          <Icon size={30} style={{ color: p.iconColor }} />
                          <span>{p.name}</span>
                          <span className="text-[11px] text-[#94A3B8]">
                            Followers • Likes • Views
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      className="px-6 py-3 rounded-xl font-bold bg-[#007BFF] text-white hover:bg-[#005FCC] shadow transition text-lg"
                      onClick={handleOrderNext}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {/* STEP 1: Service */}
              {orderStep === 1 && (
                <>
                  <h3 className="font-black text-2xl mb-6 text-[#111] text-center">
                    <span className="inline-flex items-center gap-2">
                      {(() => {
                        const I = platform.icon;
                        return (
                          <I size={27} style={{ color: platform.iconColor }} />
                        );
                      })()}
                      {platform.name} Services
                    </span>
                  </h3>
                  <p className="text-center text-sm text-[#64748B] mb-6">
                    Choose from our High-Quality services — Followers, Likes,
                    and Views.
                  </p>

                  <div className="flex flex-wrap gap-5 justify-center mb-6">
                    {platform.services.map((s) => {
                      const SIcon = s.icon;
                      const isSelected = service.type === s.type;

                      const {
                        discount,
                        discounted: realPrice,
                        original: msrp,
                      } = getDiscountedPrice(s.price);

                      return (
                        <button
                          key={s.type}
                          className={`flex flex-col items-center gap-1 px-7 py-5 rounded-xl border-2 font-bold text-base shadow hover:shadow-lg transition
                            ${
                              isSelected
                                ? "border-[#007BFF] bg-[#E6F0FF] text-[#007BFF] scale-105"
                                : "border-[#CFE4FF] text-[#111111] bg-white"
                            }`}
                          onClick={() => {
                            setService(s);
                            setQuantity(getQuickAmounts(platform, s)[0]);
                          }}
                        >
                          <SIcon size={22} style={{ color: s.iconColor }} />
                          <span>{s.type}</span>
                          <span className="text-xs text-[#888]">
                            From{" "}
                            <span className="font-semibold">
                              ${realPrice.toFixed(2)}
                            </span>
                            <span className="ml-1 line-through text-[#c7c7c7]">
                              ${msrp.toFixed(2)}
                            </span>
                          </span>
                          {isSelected && (
                            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#e7f7f0] text-[#007BFF] text-xs font-bold flex items-center gap-1 animate-flashSale">
                              <Tag size={14} className="mr-0.5" />
                              -{discount}% OFF
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      className="px-6 py-3 rounded-xl font-bold bg-[#E6F0FF] text-[#007BFF] border border-[#CFE4FF] hover:bg-[#d7eafd] shadow transition text-lg"
                      onClick={handleOrderBack}
                    >
                      Back
                    </button>
                    <button
                      className="px-6 py-3 rounded-xl font-bold bg-[#007BFF] text-white hover:bg-[#005FCC] shadow transition text-lg"
                      onClick={handleOrderNext}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {/* STEP 2: Details */}
              {orderStep === 2 && (
                <>
                  <h3 className="font-black text-2xl mb-6 text-[#111] text-center">
                    Order Details
                  </h3>

                  {(() => {
                    const currentPrice = getPackagePrice(
                      platform,
                      service,
                      quantity
                    );
                    const {
                      discount,
                      discounted,
                      original,
                    } = getDiscountedPrice(currentPrice);

                    return (
                      <>
                        <div className="flex flex-col gap-6 max-w-sm mx-auto mb-6">
                          {/* Target input */}
                          <div>
                            <label
                              htmlFor="order-target"
                              className="block font-semibold text-[#007BFF] text-lg mb-2"
                            >
                              {getTargetLabel(service)}
                            </label>
                            <input
                              id="order-target"
                              type="text"
                              className="w-full border border-[#CFE4FF] rounded-xl px-4 py-3 text-base font-medium outline-[#007BFF] bg-white shadow focus:border-[#007BFF] focus:ring-2 focus:ring-[#E6F0FF] transition"
                              placeholder={getTargetPlaceholder(
                                platform,
                                service
                              )}
                              value={target}
                              onChange={(e) =>
                                setTarget(e.currentTarget.value)
                              }
                            />
                            <span className="mt-2 block text-xs text-[#777]">
                              {isContentEngagement
                                ? "Paste the full post or video URL."
                                : "Use @username or full profile URL."}
                            </span>

                            {/* PREMIUM SAFETY WARNING */}
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
                                Make sure your account is <b>public</b> and your
                                username/link is entered <b>correctly</b>.
                                Incorrect details can delay delivery.
                              </span>
                            </div>
                          </div>

                          {/* Amount */}
                          <div className="flex flex-col items-center gap-3 w-full">
                            <AmountSelector />
                            <div className="flex justify-between items-center mt-2 w-full max-w-[640px]">
                              <span className="text-sm text-[#888]">
                                Total:
                              </span>
                              <span className="font-bold text-[#007BFF] text-xl">
                                ${discounted.toFixed(2)}
                                <span className="ml-2 text-sm text-[#c7c7c7] line-through">
                                  ${original.toFixed(2)}
                                </span>
                              </span>
                            </div>
                          </div>

                          <span className="text-xs text-[#007BFF] font-semibold animate-flashSale">
                            Flash Sale! {discount}% off for a limited time
                          </span>
                          {orderError && (
                            <div className="mt-1 text-[#EF4444] text-center">
                              {orderError}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between mt-4">
                          <button
                            className="px-6 py-3 rounded-xl font-bold bg-[#E6F0FF] text-[#007BFF] border border-[#CFE4FF] hover:bg-[#d7eafd] shadow transition text-lg"
                            onClick={handleOrderBack}
                          >
                            Back
                          </button>
                          <button
                            className="px-6 py-3 rounded-xl font-bold bg-[#007BFF] text-white hover:bg-[#005FCC] shadow transition text-lg"
                            onClick={handleOrderNext}
                          >
                            Review
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </>
              )}

              {/* STEP 3: Review */}
              {orderStep === 3 && (
                <form onSubmit={handleSecureCheckout}>
                  {(() => {
                    const currentPrice = getPackagePrice(
                      platform,
                      service,
                      quantity
                    );
                    const {
                      discount,
                      discounted,
                      original,
                    } = getDiscountedPrice(currentPrice);
                    const { pkg, type } = getStealthPackage(platform, service);

                    return (
                      <>
                        <h3 className="font-black text-2xl mb-5 text-[#111] text-center">
                          Review & Secure Checkout
                        </h3>

                        <div className="bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl px-6 py-7 mb-6">
                          <div className="flex items-center gap-2 mb-2">
                            {(() => {
                              const I = platform.icon;
                              return (
                                <I
                                  size={24}
                                  style={{ color: platform.iconColor }}
                                />
                              );
                            })()}
                            <span className="font-semibold text-lg">
                              {platform.name}
                            </span>
                            <span className="ml-3 px-3 py-1 rounded-full bg-[#E6F0FF] text-[#007BFF] font-semibold text-xs">
                              {service.type}
                            </span>
                          </div>
                          <div className="text-[#444] mb-1">
                            <b>Package:</b> {pkg} ({type})
                          </div>
                          <div className="text-[#444] mb-1">
                            <b>Username / Link:</b>{" "}
                            {refHref ? (
                              <a
                                href={refHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#007BFF] hover:underline inline-flex items-center gap-1 break-all"
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
                              refDisplay || target || "—"
                            )}
                          </div>
                          <div className="text-[#444] mb-1">
                            <b>Amount:</b> {quantity}
                          </div>
                          <div className="text-[#444] mb-1">
                            <b>Price:</b>{" "}
                            <span className="text-[#007BFF] font-semibold">
                              ${discounted.toFixed(2)}
                            </span>
                            <span className="ml-2 text-[#c7c7c7] line-through text-sm">
                              ${original.toFixed(2)}
                            </span>
                          </div>
                          <div className="mt-2 font-extrabold text-lg text-[#007BFF]">
                            Total: ${discounted.toFixed(2)}
                          </div>
                        </div>

                        {orderError && (
                          <div className="mt-4 text-[#EF4444] text-center text-sm">
                            {orderError}
                          </div>
                        )}

                        <div className="flex justify-between mt-7">
                          <button
                            type="button"
                            className="px-6 py-3 rounded-xl font-bold bg-[#E6F0FF] text-[#007BFF] border border-[#CFE4FF] hover:bg-[#d7eafd] shadow transition text-lg"
                            onClick={handleOrderBack}
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-3 rounded-xl font-bold bg-gradient-to-br from-[#007BFF] to-[#005FCC] hover:from-[#005FCC] hover:to-[#007BFF] text-white shadow-lg transition text-lg flex items-center gap-2"
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
                          Private Networks • Encrypted • Discreet Billing
                        </p>
                      </>
                    );
                  })()}
                </form>
              )}
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
          `}</style>
        </div>
      );
    }

    if (activeTab === "orders") {
      const inProgress = orders.filter(
        (o) => (o.status || "").toLowerCase() !== "completed"
      );

      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-2xl font-extrabold flex items-center gap-2 text-[#0F172A]">
                <List size={22} className="text-[#007BFF]" /> Current Orders
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                Track every active order placed through YesViral. Status updates
                refresh automatically.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E6F0FF] border border-[#CFE4FF] text-[11px] font-semibold text-[#0F172A]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_0_4px_rgba(34,197,94,0.2)]" />
              Live Status Updates
            </div>
          </div>

          {inProgress.length === 0 ? (
            <div className="border border-dashed border-[#CFE4FF] rounded-2xl py-14 px-4 text-center bg-[#F9FBFF]">
              <p className="text-sm text-[#6B7280]">
                You don&apos;t have any active orders right now.
              </p>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Place an order from the <b>Order</b> tab to see it appear here
                in real-time.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#CFE4FF] bg-white shadow-[0_12px_45px_rgba(15,23,42,0.04)] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E5EDFF] flex items-center justify-between bg-gradient-to-r from-[#F5FAFF] to-[#FFFFFF]">
                <span className="text-xs font-semibold text-[#0F172A]">
                  Active Orders ({inProgress.length})
                </span>
                <span className="text-[10px] text-[#6B7280]">
                  Order ID • Platform • Service • Quantity • Status • Date
                </span>
              </div>
              <div
                className="overflow-x-auto"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <table className="min-w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#F5FAFF] text-left text-[11px] uppercase tracking-wide text-[#6B7280] border-b border-[#E5EDFF]">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Platform</th>
                      <th className="p-3">Service</th>
                      <th className="p-3">Quantity</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Placed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inProgress.map((order, idx) => (
                      <tr
                        key={order.id}
                        className={`border-t border-[#EEF2FF] ${
                          idx % 2 === 0 ? "bg-white" : "bg-[#F9FBFF]"
                        } hover:bg-[#EEF4FF] transition`}
                      >
                        <td className="p-3 font-semibold text-[#0F172A]">
                          {order.followiz_order_id ? (
                            <a
                              href={`/track-order?orderId=${order.followiz_order_id}`}
                              className="text-[#007BFF] hover:underline"
                            >
                              #{order.followiz_order_id}
                            </a>
                          ) : (
                            <span className="text-[#9CA3AF]">Pending…</span>
                          )}
                        </td>
                        <td className="p-3">
                          <PlatformBadge platform={order.platform} />
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#F1F5FF] text-[11px] font-semibold text-[#0F172A]">
                            {order.service}
                          </span>
                        </td>
                        <td className="p-3 text-[#0F172A]">
                          {order.quantity.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <StatusPill status={order.status} />
                        </td>
                        <td className="p-3 text-[#6B7280]">
                          {new Date(order.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === "completed") {
      const completed = orders.filter(
        (o) => (o.status || "").toLowerCase() === "completed"
      );

      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-2xl font-extrabold mb-1 flex items-center gap-2 text-[#0F172A]">
                <CheckCircle size={22} className="text-[#22C55E]" /> Completed
                Orders
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                A history of all orders that have finished processing.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ECFDF3] border border-[#BBF7D0] text-[11px] font-semibold text-[#166534]">
              <CheckCircle size={14} />
              Delivered securely via Private Delivery Networks (PDNS)
            </div>
          </div>

          {completed.length === 0 ? (
            <div className="border border-dashed border-[#CFE4FF] rounded-2xl py-14 px-4 text-center bg-[#F9FBFF]">
              <p className="text-sm text-[#6B7280]">
                No completed orders yet.
              </p>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Once your active orders finish, they&apos;ll appear here.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#CFE4FF] bg-white shadow-[0_12px_45px_rgba(15,23,42,0.04)] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E5EDFF] flex items-center justify-between bg-gradient-to-r from-[#F5FAFF] to-[#FFFFFF]">
                <span className="text-xs font-semibold text-[#0F172A]">
                  Completed Orders ({completed.length})
                </span>
              </div>
              <div
                className="overflow-x-auto"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <table className="min-w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#F5FAFF] text-left text-[11px] uppercase tracking-wide text-[#6B7280] border-b border-[#E5EDFF]">
                      <th className="p-3">Followiz ID</th>
                      <th className="p-3">Platform</th>
                      <th className="p-3">Service</th>
                      <th className="p-3">Quantity</th>
                      <th className="p-3">Status / Refill</th>
                      <th className="p-3">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completed.map((order, idx) => (
                      <tr
                        key={order.id}
                        className={`border-t border-[#EEF2FF] ${
                          idx % 2 === 0 ? "bg-white" : "bg-[#F9FBFF]"
                        } hover:bg-[#EEF4FF] transition`}
                      >
                        <td className="p-3 font-semibold text-[#0F172A]">
                          {order.followiz_order_id ? (
                            <span className="text-[#0F172A]">
                              #{order.followiz_order_id}
                            </span>
                          ) : (
                            <span className="text-[#9CA3AF]">—</span>
                          )}
                        </td>
                        <td className="p-3">
                          <PlatformBadge platform={order.platform} />
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#F1F5FF] text-[11px] font-semibold text-[#0F172A]">
                            {order.service}
                          </span>
                        </td>
                        <td className="p-3 text-[#0F172A]">
                          {order.quantity.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <StatusPill status={order.status} />
                          <RefillBadge refill_until={order.refill_until} />
                        </td>
                        <td className="p-3 text-[#6B7280]">
                          {new Date(order.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === "analytics") {
      const totalOrders = analytics.total;
      const completedCount = analytics.completed;

      const totalFinished = orders.filter((o) =>
        ["completed", "partial", "canceled"].includes(
          (o.status || "").toLowerCase()
        )
      ).length;

      const completionRate =
        totalFinished === 0
          ? 0
          : Math.round((completedCount / totalFinished) * 100);

      // ⭐ Use refill_until instead of fake 30-day-from-created
      const refillEligibleCount = orders.filter((o) => {
        const status = (o.status || "").toLowerCase();
        if (status !== "completed") return false;
        if (!o.refill_until) return false;
        const end = new Date(o.refill_until).getTime();
        if (Number.isNaN(end)) return false;
        return end > Date.now();
      }).length;

      return (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold mb-1 flex items-center gap-2 text-[#0F172A]">
              <BarChart size={22} className="text-[#007BFF]" /> Analytics
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              A quick overview of your YesViral performance based on orders
              placed with this account.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardStat
              label="Total Orders"
              value={totalOrders}
              color="blue"
            />
            <DashboardStat
              label="Completed Orders"
              value={completedCount}
              color="blue"
            />
            <DashboardStat
              label="Completion Rate"
              value={`${completionRate}%`}
              color="blue"
            />
            <DashboardStat
              label="Refill Eligible (Active)"
              value={refillEligibleCount}
              color="blue"
            />
          </div>

          <div className="rounded-2xl border border-[#CFE4FF] bg-gradient-to-br from-[#F5FAFF] to-[#FFFFFF] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-2">
              Activity Summary
            </h3>
            <p className="text-xs text-[#6B7280] mb-4">
              Your orders are processed through YesViral’s private delivery
              networks. High completion rates and consistent ordering patterns
              help keep your delivery smooth and prioritized.
            </p>
            <ul className="text-xs text-[#4B5563] space-y-1.5">
              <li>
                • Orders marked <b>processing</b> are actively being delivered.
              </li>
              <li>
                • Orders marked <b>completed</b> have finished successfully and
                are fully applied to your account.
              </li>
              <li>
                • Refill-eligible orders stay covered until their{" "}
                <b>refill expiration date</b>.
              </li>
              <li>
                • Any issues or delays can be reviewed via your email receipts
                and the <b>Current Orders</b> tab.
              </li>
            </ul>
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
    <main className="min-h-screen bg-[#F3F6FB]">
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
        </div>

        <div className="flex flex-col md:flex-row gap-5 relative">
          <aside
            className={`fixed top-0 left-0 z-30 bg-white border-r border-[#CFE4FF] shadow-xl h-full w-60 transform md:static md:translate-x-0 transition-transform duration-200
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
                      ? "bg-[#007BFF] text-white shadow-[0_10px_30px_rgba(0,123,255,0.45)]"
                      : "hover:bg-[#F5FAFF] text-[#111]"
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}

            {/* Logout INSIDE sidebar at bottom */}
            <div className="mt-10 pt-6 border-t border-[#CFE4FF]">
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/login");
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition text-base w-full bg-[#F9FAFB] text-[#EF4444] hover:bg-[#FEE2E2] border border-[#FECACA]"
              >
                <LogOut size={20} />
                Log Out
              </button>
            </div>
          </aside>
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-20 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          <section className="flex-1 bg-white border border-[#CFE4FF] rounded-2xl shadow-[0_18px_60px_rgba(15,23,42,0.05)] p-4 sm:p-8 min-h-[440px]">
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

/* ========================= Helpers for UI ========================= */
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
    <div className="p-4 rounded-2xl bg-[#F5FAFF] border border-[#CFE4FF] text-center shadow-[0_10px_35px_rgba(15,23,42,0.03)]">
      <span className={`block text-xs font-semibold mb-1 ${textColor}`}>
        {label}
      </span>
      <span className="text-2xl font-extrabold text-[#0F172A]">{value}</span>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const normalized = (status || "").toLowerCase();
  let bg = "#E5E7EB";
  let text = "#374151";
  let label = status || "Unknown";

  if (normalized === "processing") {
    bg = "#E0ECFF";
    text = "#1D4ED8";
    label = "Processing";
  } else if (normalized === "completed") {
    bg = "#DCFCE7";
    text = "#15803D";
    label = "Completed";
  } else if (normalized === "pending") {
    bg = "#FEF9C3";
    text = "#92400E";
    label = "Pending";
  } else if (normalized === "partial") {
    bg = "#FEF3C7";
    text = "#92400E";
    label = "Partial";
  } else if (normalized === "canceled" || normalized === "cancelled") {
    bg = "#FEE2E2";
    text = "#B91C1C";
    label = "Canceled";
  }

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold"
      style={{ backgroundColor: bg, color: text }}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current" />
      {label}
    </span>
  );
}

function PlatformBadge({ platform }: { platform: string }) {
  const key = (platform || "").toLowerCase();
  let Icon = Instagram;
  let color = "#E1306C";

  if (key === "tiktok") {
    Icon = Music2;
    color = "#00F2EA";
  } else if (key === "youtube") {
    Icon = Youtube;
    color = "#FF0000";
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F1F5FF] text-[11px] font-semibold text-[#0F172A]">
      <Icon size={13} style={{ color }} />
      <span className="capitalize">{platform}</span>
    </span>
  );
}

/* ⭐ Refill UI badge (refill expiration) */
function RefillBadge({ refill_until }: { refill_until: string | null }) {
  if (!refill_until) return null;

  const end = new Date(refill_until);
  if (Number.isNaN(end.getTime())) return null;

  const now = new Date();
  const diffMs = end.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (daysLeft <= 0) {
    return (
      <div className="mt-1">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[10px] font-semibold text-[#6B7280]">
          Refill period ended
        </span>
      </div>
    );
  }

  return (
    <div className="mt-1">
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#E6F0FF] text-[10px] font-semibold text-[#007BFF]">
        Refill active · {daysLeft} day{daysLeft === 1 ? "" : "s"} left
      </span>
    </div>
  );
}
