import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import {
  UserCircle, LogOut, Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, BarChart, List, CheckCircle, Lock, Mail, Loader2, BadgePercent, Menu
} from "lucide-react";

const stripePromise = loadStripe("pk_test_51RgpcCRfq6GJQepR3xUT0RkiGdN8ZSRu3OR15DfKhpMNj5QgmysYrmGQ8rGCXiI6Vi3B2L5Czmf7cRvIdtKRrSOw00SaVptcQt");

// --- Data ---
const PLATFORMS = [
  {
    key: "instagram",
    name: "Instagram",
    icon: <Instagram className="text-[#E1306C]" size={22} />,
    services: [
      { type: "Followers", price: 0.09, icon: <UserPlus size={18} className="text-[#E1306C]" /> },
      { type: "Likes", price: 0.07, icon: <ThumbsUp size={18} className="text-[#E1306C]" /> },
      { type: "Views", price: 0.04, icon: <Eye size={18} className="text-[#E1306C]" /> }
    ]
  },
  {
    key: "tiktok",
    name: "TikTok",
    icon: <Music2 className="text-[#00F2EA]" size={22} />,
    services: [
      { type: "Followers", price: 0.10, icon: <UserPlus size={18} className="text-[#00F2EA]" /> },
      { type: "Likes", price: 0.08, icon: <ThumbsUp size={18} className="text-[#00F2EA]" /> },
      { type: "Views", price: 0.06, icon: <Eye size={18} className="text-[#00F2EA]" /> }
    ]
  },
  {
    key: "youtube",
    name: "YouTube",
    icon: <Youtube className="text-[#FF0000]" size={22} />,
    services: [
      { type: "Subscribers", price: 0.12, icon: <UserPlus size={18} className="text-[#FF0000]" /> },
      { type: "Likes", price: 0.09, icon: <ThumbsUp size={18} className="text-[#FF0000]" /> },
      { type: "Views", price: 0.05, icon: <Eye size={18} className="text-[#FF0000]" /> }
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

interface Order {
  id: string;
  platform: string;
  service: string;
  quantity: number;
  status: string;
  created_at: string;
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
  const [platformKey, setPlatformKey] = useState("instagram");
  const [serviceType, setServiceType] = useState("Followers");
  const [quantity, setQuantity] = useState(100);
  const [orderLoading, setOrderLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        setOrders(allOrders);
        const completed = allOrders.filter((o) => o.status === "Completed");
        setAnalytics({ total: allOrders.length, completed: completed.length });
      }
      setLoading(false);
    };
    fetchUserAndOrders();
  }, [router]);

  // Services for chosen platform
  const selectedPlatform = PLATFORMS.find(p => p.key === platformKey);
  const currentService = selectedPlatform?.services.find(s => s.type === serviceType);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Order Placement
  const placeOrder = async () => {
    setOrderLoading(true);
    const stripe = await stripePromise;
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: { name: `${selectedPlatform?.name} ${serviceType}` },
            unit_amount: Math.round((currentService?.price || 0) * 100),
          },
          quantity,
        }],
        metadata: { email: userEmail, platform: selectedPlatform?.name, service: serviceType, quantity }
      })
    });

    const session = await res.json();
    setOrderLoading(false);
    if (session.id) {
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } else {
      toast.error("Could not start checkout.");
    }
  };

  // Profile changes
  const handleEmailChange = async () => {
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) toast.error("Email update failed");
    else toast.success("Email updated successfully");
  };

  const handlePasswordChange = async () => {
    const { error } = await supabase.auth.updateUser({ password: passwordData.new });
    if (error) toast.error("Password update failed");
    else toast.success("Password changed successfully");
  };

  // --- Main Tab Content ---
  const TabContent = () => {
    if (loading)
      return <div className="flex justify-center items-center py-24"><Loader2 className="animate-spin mr-2" /> Loading...</div>;

    // --- Order Tab ---
    if (activeTab === "order") {
      return (
        <div>
          <h2 className="text-2xl font-extrabold mb-3 flex items-center gap-2">Start New Order</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {PLATFORMS.map(platform => (
              <button
                key={platform.key}
                onClick={() => {
                  setPlatformKey(platform.key);
                  setServiceType(platform.services[0].type);
                  setQuantity(100);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-lg font-semibold border-2 transition shadow-sm
                ${platformKey === platform.key
                    ? "bg-[#F5FAFF] border-[#007BFF] text-[#007BFF] scale-[1.03]"
                    : "bg-white border-[#CFE4FF] text-[#333] hover:bg-[#F2F9FF]"
                  }`}
              >
                {platform.icon}
                {platform.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-2">Select Service</h3>
              <div className="flex gap-3 mb-5 flex-wrap">
                {selectedPlatform?.services.map(service => (
                  <button
                    key={service.type}
                    onClick={() => setServiceType(service.type)}
                    className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border-2 text-base font-medium transition
                    ${serviceType === service.type
                        ? "bg-[#E8F1FF] border-[#007BFF] text-[#007BFF]"
                        : "bg-white border-[#CFE4FF] text-[#333] hover:bg-[#F2F9FF]"
                      }`}
                  >
                    {service.icon}
                    {service.type}
                    <span className="text-xs text-[#888]">${service.price}/ea</span>
                  </button>
                ))}
              </div>
              <div className="bg-[#F5FAFF] border border-[#CFE4FF] p-5 rounded-xl flex flex-col gap-3">
                <label className="font-semibold mb-1">Quantity:</label>
                <input
                  type="number"
                  min={10}
                  max={100000}
                  step={10}
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  className="border border-[#CFE4FF] rounded-lg px-4 py-2 w-full text-lg font-medium"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-[#888]">Total:</span>
                  <span className="font-bold text-[#007BFF] text-lg">${((currentService?.price || 0) * quantity).toFixed(2)}</span>
                </div>
                <button
                  className="mt-3 w-full bg-[#007BFF] hover:bg-[#005FCC] text-white py-3 rounded-xl font-bold shadow transition text-lg"
                  onClick={placeOrder}
                  disabled={orderLoading}
                >
                  {orderLoading ? <Loader2 className="animate-spin mr-2 inline" /> : "Place Order"}
                </button>
              </div>
            </div>
            {/* INFO/SECURITY/REFILL */}
            <div className="flex flex-col gap-5 justify-center">
              <div className="bg-white border border-[#CFE4FF] rounded-xl p-5 flex items-center gap-4 shadow-sm">
                <ShieldIcon />
                <div>
                  <span className="font-semibold">Safe & Secure</span>
                  <span className="block text-[#666] text-sm">SSL Checkout, no logins required.</span>
                </div>
              </div>
              <div className="bg-white border border-[#CFE4FF] rounded-xl p-5 flex items-center gap-4 shadow-sm">
                <BadgePercent className="text-[#007BFF]" size={26} />
                <div>
                  <span className="font-semibold">30 Day Refill</span>
                  <span className="block text-[#666] text-sm">If you drop, we refill. No extra cost.</span>
                </div>
              </div>
              <div className="bg-white border border-[#CFE4FF] rounded-xl p-5 flex items-center gap-4 shadow-sm">
                <Mail className="text-[#007BFF]" size={26} />
                <div>
                  <span className="font-semibold">24/7 Live Support</span>
                  <span className="block text-[#666] text-sm">Chat with us any time, any device.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // --- Current Orders Tab ---
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

    // --- Completed Orders Tab ---
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
                      <td className="p-3 font-bold text-green-600">{order.status}</td>
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

    // --- Analytics Tab ---
    if (activeTab === "analytics") {
      return (
        <div>
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2"><BarChart size={22} /> Analytics</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 mb-10">
            <DashboardStat label="Orders" value={analytics.total} color="blue" />
            <DashboardStat label="Completed" value={analytics.completed} color="green" />
            <DashboardStat label="Spent" value={`$${orders.reduce((sum, o) => sum + o.quantity * (PLATFORMS.find(p => p.name === o.platform)?.services.find(s => s.type === o.service)?.price || 0), 0).toFixed(2)}`} color="blue" />
            <DashboardStat label="Refill Eligible" value={orders.filter(o => o.status === "Completed").length} color="yellow" />
          </div>
        </div>
      );
    }

    // --- Profile Tab ---
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
            <button onClick={handleEmailChange} className="bg-[#007BFF] text-white px-4 py-2 rounded mt-2">
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
            <button onClick={handlePasswordChange} className="bg-[#007BFF] text-white px-4 py-2 rounded mt-2">
              Update Password
            </button>
          </div>
        </div>
      );
    }

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
          <aside className={`
            fixed top-0 left-0 z-30 bg-white border-r border-[#CFE4FF] shadow-md h-full w-60 transform md:static md:translate-x-0 transition-transform duration-200
            rounded-none md:rounded-2xl p-5 md:w-60 md:block
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}>
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
      {/* -- Mobile optimization -- */}
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

// --- Dashboard Stat Box ---
function DashboardStat({ label, value, color }: { label: string, value: any, color: string }) {
  const textColor = color === "blue" ? "text-[#007BFF]" : color === "green" ? "text-green-500" : color === "yellow" ? "text-yellow-500" : "";
  return (
    <div className={`p-4 rounded-xl bg-[#F5FAFF] border border-[#CFE4FF] text-center shadow`}>
      <span className={`block text-sm font-semibold mb-1 ${textColor}`}>{label}</span>
      <span className="text-2xl font-extrabold">{value}</span>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="#E6F0FF" />
      <path d="M14 7l7 2v4.5c0 4.13-2.95 7.77-7 8.5-4.05-.73-7-4.37-7-8.5V9l7-2z" stroke="#007BFF" strokeWidth="2" />
      <path d="M11 14l2 2 4-4" stroke="#007BFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
