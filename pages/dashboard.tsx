import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import {
  UserCircle, LogOut, Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, BarChart, List, CheckCircle, Loader2, BadgePercent, Menu, Tag
} from "lucide-react";

// --- Types ---
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

// --- Constants ---
const COLORS = {
  primary: "#007BFF",
  primaryHover: "#005FCC",
  background: "#FFFFFF",
  text: "#111111",
  textSecondary: "#444444",
  muted: "#888888",
  accentBg: "#E6F0FF",
  border: "#CFE4FF",
  success: "#007BFF",
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

const ORDER_STEPS = [
  { label: "Platform" },
  { label: "Service" },
  { label: "Details" },
  { label: "Review" }
];

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

function getDiscountedPrice(price: number) {
  const discount = 0.02 + Math.random() * 0.02;
  const discounted = Math.max(0.01, Number((price * (1 - discount)).toFixed(3)));
  return { discount: Math.round(discount * 100), discounted };
}

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

  // Order Stepper State
  const [orderStep, setOrderStep] = useState(0);
  const [platform, setPlatform] = useState<Platform>(PLATFORMS[0]);
  const [service, setService] = useState<Service>(PLATFORMS[0].services[0]);
  const [quantity, setQuantity] = useState<number>(getQuickAmounts(PLATFORMS[0], PLATFORMS[0].services[0])[0]);
  const [target, setTarget] = useState<string>("");
  const [orderError, setOrderError] = useState<string>("");
  const [orderLoading, setOrderLoading] = useState(false);

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

  const orderPercent = (orderStep / (ORDER_STEPS.length - 1)) * 100;
  const { discount, discounted } = getDiscountedPrice(service.price);

  function handleOrderNext() {
    if (orderStep === 2) {
      if (!target.trim()) {
        setOrderError("Paste your profile link or username.");
        return;
      }
      if (!quantity || quantity < 1) {
        setOrderError("Enter a valid quantity.");
        return;
      }
    }
    setOrderError("");
    setOrderStep(orderStep + 1);
  }
  function handleOrderBack() {
    setOrderError("");
    setOrderStep(orderStep - 1);
  }
  function handleSecureCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!target.trim()) {
      setOrderError("Paste your profile link or username.");
      return;
    }
    setOrderError("");
    setOrderLoading(true);

    const order = {
      platform: platform.name,
      service: service.type,
      amount: quantity,
      reference: target,
      total: Number((discounted * quantity).toFixed(2))
    };
    const orderString = btoa(unescape(encodeURIComponent(JSON.stringify(order))));
    window.location.href = `https://checkout.yesviral.com/checkout?order=${orderString}`;
  }

  const TabContent = () => {
    if (loading)
      return <div className="flex justify-center items-center py-24"><Loader2 className="animate-spin mr-2" /> Loading...</div>;

    if (activeTab === "order") {
      return (
        <div className="max-w-2xl mx-auto">
          <div className="px-2 sm:px-6 pt-6 pb-2">
            <div className="relative mx-auto max-w-lg">
              <div className="relative flex items-center justify-between z-20 mb-4">
                {ORDER_STEPS.map((s, i) => (
                  <div key={s.label} className="flex flex-col items-center flex-1 min-w-0">
                    <div
                      className={`
                        flex items-center justify-center w-9 h-9 font-extrabold text-base border-2 transition
                        ${orderStep === i
                          ? "bg-[#007BFF] text-white border-[#007BFF] shadow-lg scale-110"
                          : orderStep > i
                          ? "bg-[#007BFF] text-white border-[#007BFF]"
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
                            ? COLORS.primary
                            : COLORS.muted,
                        textShadow: orderStep === i ? "0 1px 0 #fff" : "none"
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
                    transition: "width .38s cubic-bezier(.51,1.15,.67,.97)"
                  }}
                />
              </div>
            </div>
          </div>
          <div className="bg-white border border-[#CFE4FF] rounded-2xl shadow-xl px-5 py-8 mb-6 mt-5">
            {orderStep === 0 && (
              <>
                <h3 className="font-black text-2xl mb-8 text-[#111] text-center tracking-tight">Choose Platform</h3>
                <div className="flex justify-center gap-5 flex-wrap mb-8">
                  {PLATFORMS.map((p) => {
                    const Icon = p.icon;
                    return (
                      <button key={p.key}
                        className={`
                          flex flex-col items-center gap-1 px-7 py-5 rounded-xl border-2 font-bold text-base shadow hover:shadow-lg transition
                          ${platform.key === p.key
                            ? "border-[#007BFF] bg-[#E6F0FF] text-[#007BFF] scale-105"
                            : "border-[#CFE4FF] text-[#111111] bg-white"
                          }
                        `}
                        style={{ minWidth: 120, minHeight: 90 }}
                        onClick={() => {
                          setPlatform(p);
                          setService(p.services[0]);
                          setQuantity(getQuickAmounts(p, p.services[0])[0]);
                        }}
                      >
                        <Icon size={30} style={{ color: p.iconColor }} />
                        <span>{p.name}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-end mt-8">
                  <button
                    className="px-6 py-3 rounded-xl font-bold bg-[#007BFF] text-white hover:bg-[#005FCC] shadow transition text-lg"
                    onClick={handleOrderNext}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {orderStep === 1 && (
              <>
                <h3 className="font-black text-2xl mb-8 text-[#111] text-center">
                  <platform.icon size={27} style={{ color: platform.iconColor, marginRight: 7, display: "inline-block", verticalAlign: "middle" }} />
                  {platform.name} Services
                </h3>
                <div className="flex flex-wrap gap-5 justify-center mb-8">
                  {platform.services.map((s) => {
                    const SIcon = s.icon;
                    const { discount, discounted } = getDiscountedPrice(s.price);
                    return (
                      <button
                        key={s.type}
                        className={`
                          flex flex-col items-center gap-1 px-7 py-5 rounded-xl border-2 font-bold text-base shadow hover:shadow-lg transition
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
                          <span className="mt-1 px-2 py-0.5 rounded-full bg-[#e7f7f0] text-[#007BFF] text-xs font-bold flex items-center gap-1 animate-flashSale">
                            <Tag size={14} className="mr-0.5" />-{discount}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-8">
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
            {orderStep === 2 && (
              <>
                <h3 className="font-black text-2xl mb-8 text-[#111] text-center">Order Details</h3>
                <div className="flex flex-col gap-6 max-w-sm mx-auto mb-8">
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
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-[#888]">Total:</span>
                    <span className="font-bold text-[#007BFF] text-xl">
                      ${(discounted * quantity).toFixed(2)}
                      <span className="ml-2 text-sm text-[#c7c7c7] line-through">${(service.price * quantity).toFixed(2)}</span>
                    </span>
                  </div>
                  <span className="text-xs text-[#007BFF] font-semibold animate-flashSale">
                    Flash Sale! {discount}% off for a limited time
                  </span>
                  {orderError && <div className="mt-1 text-[#EF4444] text-center">{orderError}</div>}
                </div>
                <div className="flex justify-between mt-8">
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
            )}
            {orderStep === 3 && (
              <form onSubmit={handleSecureCheckout}>
                <h3 className="font-black text-2xl mb-5 text-[#111] text-center">Review & Secure Checkout</h3>
                <div className="bg-[#F5FAFF] border border-[#CFE4FF] rounded-xl px-6 py-7 mb-7">
                  <div className="flex items-center gap-2 mb-2">
                    <platform.icon size={24} style={{ color: platform.iconColor }} />
                    <span className="font-semibold text-lg">{platform.name}</span>
                    <span className="ml-3 px-3 py-1 rounded-full bg-[#E6F0FF] text-[#007BFF] font-semibold text-xs">{service.type}</span>
                  </div>
                  <div className="text-[#444] mb-1"><b>Target:</b> {target}</div>
                  <div className="text-[#444] mb-1"><b>Amount:</b> {quantity}</div>
                  <div className="text-[#444] mb-1"><b>Unit:</b> ${discounted}/ea <span className="text-[#c7c7c7] line-through">${service.price}/ea</span></div>
                  <div className="mt-2 font-extrabold text-lg text-[#007BFF]">
                    Total: ${(discounted * quantity).toFixed(2)}
                  </div>
                </div>
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
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#E6F0FF" strokeWidth="4" />
                        <path d="M22 12A10 10 0 0 1 12 22" stroke="#007BFF" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <CheckCircle size={20} />
                    )}
                    Secure Checkout
                  </button>
                </div>
              </form>
            )}
          </div>
          <style jsx global>{`
            @keyframes flashSale {
              0%,100% { background: #e7f7f0; color: #007BFF;}
              50% { background: #d9ecff; color: #005FCC;}
            }
            .animate-flashSale { animation: flashSale 2.5s infinite; }
          `}</style>
        </div>
      );
    }

    if (activeTab === "orders") {
      const inProgress = orders.filter(o => o.status !== "Completed");
      return (
        <div>
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2"><List size={22} /> Current Orders</h2>
          {inProgress.length === 0 ? (
            <div className="text-[#888] py-16 text-center">No current orders. Place your first order above!</div>
          ) : (
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
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
                  {inProgress.map(order => (
                    <tr key={order.id} className="border-t">
                      <td className="p-3">{order.id.slice(0, 6)}...</td>
                      <td className="p-3">{order.platform}</td>
                      <td className="p-3">{order.service}</td>
                      <td className="p-3">{order.quantity}</td>
                      <td className="p-3 font-bold text-[#007BFF]">{order.status}</td>
                      <td className="p-3">{new Date(order.created_at).toLocaleString()}</td>
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
      const completed = orders.filter(o => o.status === "Completed");
      return (
        <div>
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2"><CheckCircle size={22} /> Completed Orders</h2>
          {completed.length === 0 ? (
            <div className="text-[#888] py-16 text-center">No completed orders yet.</div>
          ) : (
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
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
                  {completed.map(order => (
                    <tr key={order.id} className="border-t">
                      <td className="p-3">{order.id.slice(0, 6)}...</td>
                      <td className="p-3">{order.platform}</td>
                      <td className="p-3">{order.service}</td>
                      <td className="p-3">{order.quantity}</td>
                      <td className="p-3 font-bold text-[#007BFF]">{order.status}</td>
                      <td className="p-3">{new Date(order.created_at).toLocaleString()}</td>
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
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2"><BarChart size={22} /> Analytics</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 mb-10">
            <DashboardStat label="Orders" value={analytics.total} color="blue" />
            <DashboardStat label="Completed" value={analytics.completed} color="blue" />
            <DashboardStat
              label="Spent"
              value={
                "$" +
                orders
                  .reduce(
                    (sum, o) =>
                      sum +
                      o.quantity *
                        (PLATFORMS.find((p) => p.name === o.platform)?.services.find((s) => s.type === o.service)?.price || 0),
                    0
                  )
                  .toFixed(2)
              }
              color="blue"
            />
            <DashboardStat label="Refill Eligible" value={orders.filter(o => o.status === "Completed").length} color="blue" />
          </div>
        </div>
      );
    }

    if (activeTab === "profile") {
      return (
        <div className="space-y-7">
          <h2 className="text-2xl font-extrabold mb-2 flex items-center gap-2"><UserCircle size={22} /> Account</h2>
          <div>
            <label className="block text-[#111] font-bold mb-1">Email</label>
            <input
              type="email"
              className="border px-3 py-2 rounded-md mr-2 w-full max-w-xs"
              value={newEmail || profileEmail}
              onChange={e => setNewEmail(e.target.value)}
            />
            <button onClick={() => toast.success("Email updated (demo)!")} className="bg-[#007BFF] text-white px-4 py-2 rounded mt-2">
              Update Email
            </button>
          </div>
          <div>
            <label className="block text-[#111] font-bold mb-1">Change Password</label>
            <input
              type="password"
              placeholder="New Password"
              value={passwordData.new}
              onChange={e => setPasswordData({ ...passwordData, new: e.target.value })}
              className="border px-3 py-2 rounded-md mr-2 w-full max-w-xs"
            />
            <button onClick={() => toast.success("Password updated (demo)!")} className="bg-[#007BFF] text-white px-4 py-2 rounded mt-2">
              Update Password
            </button>
          </div>
        </div>
      );
    }

    return <div>Pick a tab…</div>;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let meta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta') as HTMLMetaElement;
        meta.name = "viewport";
        document.head.appendChild(meta);
      }
      meta.setAttribute(
        "content",
        "width=device-width, initial-scale=1"
      );
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
            <Image src="/logo.png" alt="YesViral Logo" width={38} height={38} />
            <span className="text-2xl font-extrabold text-[#007BFF] tracking-tight">Dashboard</span>
          </div>
          <button
            onClick={async () => { await supabase.auth.signOut(); router.push("/login"); }}
            className="flex items-center gap-2 bg-[#EF4444] hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold shadow"
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-5 relative">
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
          {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
          <section className="flex-1 bg-white border border-[#CFE4FF] rounded-2xl shadow-sm p-4 sm:p-8 min-h-[440px]">
            <TabContent />
          </section>
        </div>
      </div>
      <style jsx global>{`
        @keyframes flashSale {
          0%,100% { background: #e7f7f0; color: #007BFF;}
          50% { background: #d9ecff; color: #005FCC;}
        }
        .animate-flashSale { animation: flashSale 2.5s infinite; }
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

function DashboardStat({ label, value, color }: { label: string, value: any, color: string }) {
  const textColor = color === "blue" ? "text-[#007BFF]" : color === "green" ? "text-green-500" : color === "yellow" ? "text-yellow-500" : "";
  return (
    <div className={`p-4 rounded-xl bg-[#F5FAFF] border border-[#CFE4FF] text-center shadow`}>
      <span className={`block text-sm font-semibold mb-1 ${textColor}`}>{label}</span>
      <span className="text-2xl font-extrabold">{value}</span>
    </div>
  );
}