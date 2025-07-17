import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import {
  UserCircle, LogOut, Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, BarChart, List, CheckCircle, Lock, Mail, Loader2, BadgePercent, Menu, Tag
} from "lucide-react";

// --- Type Definitions ---
type ServiceType = "Followers" | "Likes" | "Views" | "Subscribers";
type Service = {
  type: ServiceType | string;
  price: number;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  iconColor: string;
};
type Platform = {
  key: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
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

const stripePromise = loadStripe("pk_test_51RgpcCRfq6GJQepR3xUT0RkiGdN8ZSRu3OR15DfKhpMNj5QgmysYrmGQ8rGCXiI6Vi3B2L5Czmf7cRvIdtKRrSOw00SaVptcQt");

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

const PLATFORMS: Platform[] = [
  {
    key: "instagram",
    name: "Instagram",
    icon: Instagram,
    iconColor: "#E1306C",
    services: [
      { type: "Followers", price: 0.09, icon: UserPlus, iconColor: "#E1306C" },
      { type: "Likes", price: 0.07, icon: ThumbsUp, iconColor: "#E1306C" },
      { type: "Views", price: 0.04, icon: Eye, iconColor: "#E1306C" }
    ]
  },
  {
    key: "tiktok",
    name: "TikTok",
    icon: Music2,
    iconColor: "#00F2EA",
    services: [
      { type: "Followers", price: 0.10, icon: UserPlus, iconColor: "#00F2EA" },
      { type: "Likes", price: 0.08, icon: ThumbsUp, iconColor: "#00F2EA" },
      { type: "Views", price: 0.06, icon: Eye, iconColor: "#00F2EA" }
    ]
  },
  {
    key: "youtube",
    name: "YouTube",
    icon: Youtube,
    iconColor: "#FF0000",
    services: [
      { type: "Subscribers", price: 0.12, icon: UserPlus, iconColor: "#FF0000" },
      { type: "Likes", price: 0.09, icon: ThumbsUp, iconColor: "#FF0000" },
      { type: "Views", price: 0.05, icon: Eye, iconColor: "#FF0000" }
    ]
  }
];

const NAV_TABS = [
  { key: "order", label: "Order", icon: <BadgePercent size={19} /> },
  { key: "orders", label: "Current", icon: <List size={19} /> },
  { key: "completed", label: "Completed", icon: <CheckCircle size={19} /> },
  { key: "analytics", label: "Analytics", icon: <BarChart size={19} /> },
  { key: "profile", label: "Account", icon: <UserCircle size={19} /> },
];

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [activeTab, setActiveTab] = useState("order");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileEmail, setProfileEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [passwordData, setPasswordData] = useState({ current: "", new: "" });
  const [analytics, setAnalytics] = useState({ total: 0, completed: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- order form state ---
  const [orderStep, setOrderStep] = useState(0);
  const [platform, setPlatform] = useState<Platform>(PLATFORMS[0]);
  const [service, setService] = useState<Service>(PLATFORMS[0].services[0]);
  const [quantity, setQuantity] = useState<number>(getQuickAmounts(PLATFORMS[0], PLATFORMS[0].services[0])[0]);
  const [target, setTarget] = useState<string>("");
  const [orderError, setOrderError] = useState<string>("");
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const orderStepperRef = useRef<HTMLDivElement>(null);

  // Fetch user/orders
  useEffect(() => {
    const fetchUserAndOrders = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) {
        router.push("/login");
        return;
      }
      const email = session.user.email || "";
      setUserEmail(email);
      setUserId(session.user.id);
      setProfileEmail(email);

      const { data: allOrders } = await supabase
        .from("orders")
        .select("id, platform, service, quantity, status, created_at")
        .eq("email", email)
        .order("created_at", { ascending: false });

      if (allOrders) {
        setOrders(allOrders as Order[]);
        const completed = allOrders.filter((o: Order) => o.status === "Completed");
        setAnalytics({ total: allOrders.length, completed: completed.length });
      }
      setLoading(false);
    };
    fetchUserAndOrders();
  }, [router]);

  // --- Type-safe quick amounts ---
  function getQuickAmounts(platform: Platform, service: Service): number[] {
    if (platform.key === "instagram" && service.type.toLowerCase() === "views")
      return [500, 2000, 5000, 10000, 20000, 50000];
    if (platform.key === "instagram" && service.type.toLowerCase() === "followers")
      return [100, 200, 350, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
    if (platform.key === "instagram" && service.type.toLowerCase() === "likes")
      return [50, 100, 300, 500, 1000, 2000, 5000, 10000, 20000];
    if (
      platform.key === "tiktok" &&
      (service.type.toLowerCase() === "followers" ||
        service.type.toLowerCase() === "likes")
    )
      return [100, 250, 500, 1000, 2000, 5000, 10000];
    if (platform.key === "tiktok" && service.type.toLowerCase() === "views")
      return [1000, 2000, 5000, 10000, 20000, 50000];
    if (platform.key === "youtube" && service.type.toLowerCase() === "views")
      return [200, 500, 1000, 2000, 5000, 10000];
    if (
      platform.key === "youtube" &&
      service.type.toLowerCase() === "subscribers"
    )
      return [200, 500, 1000, 2000, 5000, 10000];
    if (platform.key === "youtube" && service.type.toLowerCase() === "likes")
      return [250, 500, 1000, 2000, 5000, 10000];
    return [100, 500, 1000, 2000, 5000, 10000, 25000, 50000];
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  function getDiscountedPrice(price: number) {
    const discount = 0.02 + Math.random() * 0.02;
    const discounted = Math.max(0.01, Number((price * (1 - discount)).toFixed(3)));
    return { discount: Math.round(discount * 100), discounted };
  }

  const orderSteps = [
    { label: "Platform" },
    { label: "Service" },
    { label: "Details" },
    { label: "Checkout" }
  ];
  const orderPercent = orderStep === orderSteps.length - 1 ? 100 : Math.max(0, (orderStep / (orderSteps.length - 1)) * 100);
  const { discount, discounted } = getDiscountedPrice(service.price);

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!target.trim()) {
      setOrderError("Paste your profile link or username.");
      return;
    }
    setOrderLoading(true);
    setOrderError("");
    setTimeout(() => {
      setOrderLoading(false);
      setOrderSuccess(true);
      setOrderStep(3);
      setTimeout(() => setOrderSuccess(false), 3000);
    }, 1200);
  }

  // --- Main Tab Content ---
  const TabContent = () => {
    if (loading)
      return <div className="flex justify-center items-center py-24"><Loader2 className="animate-spin mr-2" /> Loading...</div>;

    // --- Order Tab: Animated Stepper, Top Tier ---
    if (activeTab === "order") {
      return (
        <div className="max-w-2xl mx-auto px-1 py-2">
          <div
            className="rounded-2xl bg-white border-2 shadow-xl p-0 overflow-hidden"
            style={{ borderColor: COLORS.border }}
          >
            {/* Stepper */}
            <div className="px-4 pt-7 pb-6 border-b" style={{ background: COLORS.accentBg, borderColor: COLORS.border }}>
              <div className="relative mx-auto max-w-lg" ref={orderStepperRef}>
                <div className="absolute left-0 right-0 top-1/2 h-[5px] rounded-full bg-[#E6F0FF] z-0" style={{transform: "translateY(-50%)"}} />
                <div
                  className="absolute left-0 top-1/2 h-[5px] rounded-full z-10"
                  style={{
                    width: `${orderPercent}%`,
                    background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.primaryHover} 100%)`,
                    transition: "width .35s cubic-bezier(.51,1.15,.67,.97)",
                    transform: "translateY(-50%)"
                  }}
                />
                <div className="relative flex items-center justify-between z-20">
                  {orderSteps.map((s, i) => (
                    <div key={s.label} className="flex flex-col items-center flex-1 min-w-0">
                      <div
                        className={`
                          flex items-center justify-center w-8 h-8 font-extrabold text-base border-2 transition
                          ${orderStep === i
                            ? "bg-[#007BFF] text-white border-[#007BFF] shadow-lg scale-110"
                            : orderStep > i
                            ? "bg-[#22C55E] text-white border-[#22C55E]"
                            : "bg-[#E6F0FF] text-[#888] border-[#E6F0FF]"}
                        `}
                        style={{
                          marginBottom: 3,
                          borderRadius: "1.5rem",
                          boxShadow: orderStep === i ? "0 2px 10px #007bff22" : undefined
                        }}
                      >
                        {i + 1}
                      </div>
                      <span
                        className={`text-xs font-bold text-center whitespace-nowrap mt-1 transition`}
                        style={{
                          color:
                            orderStep === i
                              ? COLORS.primary
                              : orderStep > i
                              ? COLORS.success
                              : COLORS.muted,
                          textShadow: orderStep === i ? "0 1px 0 #fff" : "none"
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Steps */}
            <div className="p-4 sm:p-7">
              {orderStep === 0 && (
                <>
                  <h3 className="font-black text-2xl mb-7 text-[#111] text-center tracking-tight">Choose Platform</h3>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {PLATFORMS.map((p) => {
                      const Icon = p.icon;
                      return (
                        <button
                          key={p.key}
                          className={`
                            flex flex-col items-center gap-1 px-6 py-4 rounded-xl border-2 font-bold text-base shadow hover:shadow-lg transition
                            ${platform.key === p.key
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
                            setQuantity(getQuickAmounts(p, p.services[0])[0]);
                          }}
                        >
                          <Icon size={28} style={{ color: p.iconColor }} />
                          <span>{p.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-end mt-10">
                    <button
                      className="px-5 py-2 rounded-lg font-bold bg-[#007BFF] text-white hover:bg-[#005FCC] shadow transition"
                      onClick={() => setOrderStep(1)}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
              {orderStep === 1 && (
                <>
                  <h3 className="font-black text-2xl mb-7 text-[#111] text-center">
                    <platform.icon size={25} style={{ color: platform.iconColor, marginRight: 7, display: "inline-block", verticalAlign: "middle" }} />
                    {platform.name} Services
                  </h3>
                  <div className="flex flex-wrap gap-4 justify-center mb-5">
                    {platform.services.map((s) => {
                      const SIcon = s.icon;
                      const { discount, discounted } = getDiscountedPrice(s.price);
                      return (
                        <button
                          key={s.type}
                          className={`
                            flex flex-col items-center gap-1 px-6 py-4 rounded-xl border-2 font-bold text-base shadow hover:shadow-lg transition
                            ${service.type === s.type
                              ? "border-[#007BFF] bg-[#E6F0FF] text-[#007BFF] scale-105"
                              : "border-[#CFE4FF] text-[#111111] bg-white"
                            }
                          `}
                          onClick={() => {
                            setService(s);
                            setQuantity(getQuickAmounts(platform, s)[0]);
                          }}
                        >
                          <SIcon size={22} style={{ color: s.iconColor }} />
                          <span>{s.type}</span>
                          <span className="text-xs text-[#888]">${s.price}/ea</span>
                          {discount > 0 && (
                            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#e7f7f0] text-[#22C55E] text-xs font-bold flex items-center gap-1 animate-flashSale">
                              <Tag size={14} className="mr-0.5" />-{discount}%
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-10">
                    <button
                      className="px-5 py-2 rounded-lg font-bold bg-[#E6F0FF] text-[#007BFF] border border-[#CFE4FF] hover:bg-[#d7eafd] shadow transition"
                      onClick={() => setOrderStep(0)}
                    >
                      Back
                    </button>
                    <button
                      className="px-5 py-2 rounded-lg font-bold bg-[#007BFF] text-white hover:bg-[#005FCC] shadow transition"
                      onClick={() => setOrderStep(2)}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
              {orderStep === 2 && (
                <form onSubmit={placeOrder}>
                  <h3 className="font-black text-2xl mb-7 text-[#111] text-center">
                    Order Details
                  </h3>
                  <div className="flex flex-col gap-5 max-w-sm mx-auto">
                    <label className="font-semibold text-[#007BFF] text-lg">
                      Profile or Link
                      <input
                        type="text"
                        autoFocus
                        className="w-full border border-[#CFE4FF] rounded-xl px-4 py-3 mt-2 text-base font-medium outline-[#007BFF] bg-white shadow focus:border-[#007BFF] focus:ring-2 focus:ring-[#E6F0FF] transition"
                        placeholder="Paste your link or username here"
                        value={target}
                        onChange={e => setTarget(e.target.value)}
                      />
                    </label>
                    <label className="font-semibold text-[#007BFF] text-lg">
                      Amount
                      <div className="flex gap-2 flex-wrap mt-2">
                        {getQuickAmounts(platform, service).map(val => (
                          <button
                            key={val}
                            type="button"
                            className={`
                              rounded-full px-5 py-2 font-bold border text-sm shadow
                              ${quantity === val ? "bg-[#007BFF] text-white border-[#007BFF]" : "bg-[#E6F0FF] text-[#007BFF] border-[#CFE4FF]"}
                              hover:bg-[#E6F0FF] hover:border-[#007BFF] transition
                            `}
                            onClick={() => setQuantity(val)}
                          >
                            {val >= 1000 ? `${val/1000}K` : val}
                          </button>
                        ))}
                      </div>
                    </label>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-[#888]">Total:</span>
                      <span className="font-bold text-[#007BFF] text-xl">
                        ${(discounted * quantity).toFixed(2)}
                        <span className="ml-2 text-sm text-[#c7c7c7] line-through">${(service.price * quantity).toFixed(2)}</span>
                      </span>
                    </div>
                    <span className="text-xs text-[#22C55E] font-semibold animate-flashSale">
                      Flash Sale! {discount}% off for a limited time
                    </span>
                    {orderError && <div className="mt-1 text-[#EF4444] text-center">{orderError}</div>}
                    <div className="flex justify-between mt-7">
                      <button
                        type="button"
                        className="px-5 py-2 rounded-lg font-bold bg-[#E6F0FF] text-[#007BFF] border border-[#CFE4FF] hover:bg-[#d7eafd] shadow transition"
                        onClick={() => setOrderStep(1)}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-lg font-bold bg-gradient-to-br from-[#007BFF] to-[#005FCC] hover:from-[#005FCC] hover:to-[#007BFF] text-white shadow-lg transition text-lg flex items-center gap-2"
                        disabled={orderLoading}
                      >
                        {orderLoading ? (
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#E6F0FF" strokeWidth="4" />
                            <path d="M22 12A10 10 0 0 1 12 22" stroke="#007BFF" strokeWidth="4" strokeLinecap="round" />
                          </svg>
                        ) : (
                          <CheckCircle size={20} />
                        )}
                        {orderLoading ? "Processing..." : "Continue to Checkout"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
              {orderStep === 3 && orderSuccess && (
                <div className="text-center py-16">
                  <CheckCircle className="mx-auto mb-3" size={54} style={{ color: COLORS.success }} />
                  <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.primary }}>
                    Thank You! 🎉
                  </h3>
                  <div className="text-[#444] text-base mb-4">
                    Your order was received and is being processed.<br />
                    You’ll receive updates shortly.
                  </div>
                  <button
                    className="mt-5 bg-[#007BFF] text-white px-7 py-3 rounded-xl font-bold text-lg shadow"
                    onClick={() => {
                      setOrderStep(0);
                      setOrderSuccess(false);
                      setTarget("");
                      setQuantity(getQuickAmounts(platform, service)[0]);
                    }}
                  >
                    Place Another Order
                  </button>
                </div>
              )}
            </div>
          </div>
          <style jsx global>{`
            @keyframes flashSale {
              0%,100% { background: #e7f7f0; color: #22C55E;}
              50% { background: #dbffe6; color: #16a34a;}
            }
            .animate-flashSale { animation: flashSale 2.5s infinite; }
            @media (max-width: 650px) {
              .max-w-2xl { max-width: 99vw !important; }
              .rounded-2xl { border-radius: 1.2rem !important; }
              .p-4, .sm\\:p-7 { padding: 1.2rem !important; }
            }
          `}</style>
        </div>
      );
    }

    // ... your other tab content here ...

    return <div>Pick a tab…</div>;
  };

  // --- Responsive Layout ---
  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        {/* HEADER */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-2">
            <button
              className="block md:hidden p-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Open Navigation"
            >
              <Menu size={28} className="text-[#007BFF]" />
            </button>
            <Image src="/logo.png" alt="YesViral Logo" width={38} height={38} />
            <span className="text-2xl font-extrabold text-[#007BFF] tracking-tight">Dashboard</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#EF4444] hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold shadow"
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
        {/* LAYOUT */}
        <div className="flex flex-col md:flex-row gap-5 relative">
          {/* SIDEBAR - Responsive Drawer */}
          <aside className={`fixed top-0 left-0 z-30 bg-white border-r border-[#CFE4FF] shadow-md h-full w-60 transform md:static md:translate-x-0 transition-transform duration-200
            rounded-none md:rounded-2xl p-5 md:w-60 md:block
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
            <div className="flex justify-between items-center mb-8 md:hidden">
              <span className="font-extrabold text-lg text-[#007BFF]">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded hover:bg-[#F5FAFF]">
                <LogOut size={22} className="text-[#007BFF]" />
              </button>
            </div>
            {NAV_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition text-base w-full
                  ${activeTab === tab.key ? "bg-[#007BFF] text-white shadow" : "hover:bg-[#F5FAFF] text-[#111]"}
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </aside>
          {/* Overlay for mobile nav */}
          {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
          {/* MAIN CONTENT */}
          <section className="flex-1 bg-white border border-[#CFE4FF] rounded-2xl shadow-sm p-4 sm:p-8 min-h-[440px]">
            <TabContent />
          </section>
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 900px) {
          .max-w-7xl { padding: 0 0vw; }
        }
        @media (max-width: 600px) {
          .max-w-7xl { padding: 0 1vw; }
          aside, section { padding: 12px !important; }
          h2 { font-size: 1.1rem !important; }
          th, td { font-size: 0.98rem; }
          .text-2xl { font-size: 1.3rem !important; }
        }
        table { width: 100%; }
        th, td { white-space: nowrap; }
      `}</style>
    </main>
  );
}