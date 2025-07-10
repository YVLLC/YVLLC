import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import AiBot from "../components/AiBot";
import {
  Instagram, Youtube, Music2, UserPlus, ThumbsUp, Eye, LogOut, BadgePercent, List, CheckCircle, BarChart, UserCircle, Menu, Sun, Moon, Loader2
} from "lucide-react";

const stripePromise = loadStripe("pk_test_51RgpcCRfq6GJQepR3xUT0RkiGdN8ZSRu3OR15DfKhpMNj5QgmysYrmGQ8rGCXiI6Vi3B2L5Czmf7cRvIdtKRrSOw00SaVptcQt");

// ---- DATA ----
const PLATFORMS = [
  {
    key: "instagram",
    name: "Instagram",
    color: "#E1306C",
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
    color: "#00F2EA",
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
    color: "#FF0000",
    icon: <Youtube className="text-[#FF0000]" size={22} />,
    services: [
      { type: "Subscribers", price: 0.12, icon: <UserPlus size={18} className="text-[#FF0000]" /> },
      { type: "Likes", price: 0.09, icon: <ThumbsUp size={18} className="text-[#FF0000]" /> },
      { type: "Views", price: 0.05, icon: <Eye size={18} className="text-[#FF0000]" /> }
    ]
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileEmail, setProfileEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [passwordData, setPasswordData] = useState({ current: "", new: "" });
  const [platformKey, setPlatformKey] = useState("instagram");
  const [serviceType, setServiceType] = useState("Followers");
  const [quantity, setQuantity] = useState(100);
  const [orderLoading, setOrderLoading] = useState(false);
  const [confetti, setConfetti] = useState(false);

  // ---- DARK MODE ----
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  function toggleTheme() { setTheme(t => t === "dark" ? "light" : "dark"); }

  // ---- FETCH USER/ORDERS ----
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
      setOrders(allOrders || []);
      setLoading(false);
    };
    fetchUserAndOrders();
  }, [router]);

  // ---- ORDER PLACE ----
  const selectedPlatform = PLATFORMS.find(p => p.key === platformKey);
  const currentService = selectedPlatform?.services.find(s => s.type === serviceType);
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
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3200);
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } else {
      toast.error("Could not start checkout.");
    }
  };

  // ---- PROFILE ACTIONS ----
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
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // ---- MAIN RETURN ----
  return (
    <main className="min-h-screen font-sans bg-gradient-to-tr from-[#d5e7ff] via-white to-[#e4e2ff] dark:from-[#10151d] dark:to-[#181d26]">
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />}
      <Toaster position="top-right" />
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-5 bg-white/70 dark:bg-[#181d29]/80 shadow-2xl rounded-b-3xl">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={44} height={44} className="rounded-2xl" />
          <span className="font-extrabold text-3xl text-[#0061ff] dark:text-blue-200 tracking-tight drop-shadow-lg">NUTTYBOARD</span>
          <span className="ml-3 bg-gradient-to-r from-yellow-300 to-pink-400 text-white px-4 py-2 rounded-2xl font-extrabold text-xs shadow-lg animate-pulse">ULTRA PREMIUM</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="rounded-xl p-2 bg-blue-50 dark:bg-[#232e3a] text-blue-700 dark:text-blue-200 shadow" title="Toggle dark mode">
            {theme === "dark" ? <Sun size={23} /> : <Moon size={23} />}
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-[#EF4444] hover:bg-red-600 text-white px-4 py-2 rounded-2xl font-extrabold shadow-md">
            <LogOut size={20} /> Log Out
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto mt-10 p-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* ---- ORDER CARD ---- */}
        <section className="rounded-3xl bg-white/90 dark:bg-[#181d29]/95 shadow-2xl p-8 border-2 border-blue-100 dark:border-[#232a36] relative overflow-hidden">
          <div className="absolute -top-10 -right-10 bg-gradient-to-br from-blue-200/40 to-pink-200/40 w-52 h-52 rounded-full blur-2xl opacity-60" />
          <h2 className="text-3xl font-extrabold mb-2 flex items-center gap-2 tracking-tight drop-shadow">Place Order <BadgePercent className="text-[#007BFF]" size={27} /></h2>
          <div className="flex gap-2 mb-6">
            {PLATFORMS.map(platform => (
              <button
                key={platform.key}
                onClick={() => {
                  setPlatformKey(platform.key);
                  setServiceType(platform.services[0].type);
                  setQuantity(100);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold border-2 transition shadow
                ${platformKey === platform.key
                  ? "bg-[#F0F6FF] border-[#007BFF] text-[#007BFF] scale-[1.04]"
                  : "bg-white/70 border-[#CFE4FF] text-[#333] hover:bg-[#F2F9FF]"
                }`}
              >
                {platform.icon} {platform.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mb-4">
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
          <div className="bg-[#F6FAFF] dark:bg-[#222d3c] border border-[#CFE4FF] dark:border-[#232a36] p-5 rounded-xl flex flex-col gap-3 shadow-lg">
            <label className="font-semibold mb-1">Quantity:</label>
            <input
              type="number"
              min={10}
              max={100000}
              step={10}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="border border-[#CFE4FF] dark:border-[#232a36] rounded-lg px-4 py-2 w-full text-lg font-medium bg-white/60 dark:bg-[#202736]"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-[#888]">Total:</span>
              <span className="font-extrabold text-[#007BFF] text-lg">${((currentService?.price || 0) * quantity).toFixed(2)}</span>
            </div>
            <button
              className="mt-3 w-full bg-gradient-to-r from-[#007bff] to-[#36c9f6] hover:from-[#005FCC] hover:to-[#6B99F7] text-white py-4 rounded-xl font-extrabold shadow-2xl transition text-lg tracking-wider"
              onClick={placeOrder}
              disabled={orderLoading}
            >
              {orderLoading ? <Loader2 className="animate-spin mr-2 inline" /> : "Place Order"}
            </button>
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <div className="bg-white/90 dark:bg-[#20263a] border border-[#CFE4FF] dark:border-[#232a36] rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <svg width={28} height={28} viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#E6F0FF" /><path d="M14 7l7 2v4.5c0 4.13-2.95 7.77-7 8.5-4.05-.73-7-4.37-7-8.5V9l7-2z" stroke="#007BFF" strokeWidth="2" /><path d="M11 14l2 2 4-4" stroke="#007BFF" strokeWidth="2" strokeLinecap="round" /></svg>
              <div>
                <span className="font-semibold">Safe & Secure</span>
                <span className="block text-[#666] text-sm">SSL Checkout, no logins required.</span>
              </div>
            </div>
            <div className="bg-white/90 dark:bg-[#20263a] border border-[#CFE4FF] dark:border-[#232a36] rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <BadgePercent className="text-[#007BFF]" size={26} />
              <div>
                <span className="font-semibold">30 Day Refill</span>
                <span className="block text-[#666] text-sm">If you drop, we refill. No extra cost.</span>
              </div>
            </div>
            <div className="bg-white/90 dark:bg-[#20263a] border border-[#CFE4FF] dark:border-[#232a36] rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <UserCircle className="text-[#007BFF]" size={26} />
              <div>
                <span className="font-semibold">24/7 Live Support</span>
                <span className="block text-[#666] text-sm">Chat with us any time, any device.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---- ORDER HISTORY & ACCOUNT ---- */}
        <section className="rounded-3xl bg-white/95 dark:bg-[#181d29]/95 shadow-2xl p-8 border-2 border-pink-100 dark:border-[#232a36] relative overflow-hidden">
          <div className="absolute -top-12 -left-10 bg-gradient-to-br from-pink-200/50 to-blue-200/40 w-52 h-52 rounded-full blur-2xl opacity-60" />
          <h2 className="text-3xl font-extrabold mb-4 flex items-center gap-2 tracking-tight drop-shadow">Your Orders <List className="text-[#e64eb7]" size={27} /></h2>
          {loading ? (
            <div className="flex justify-center items-center py-12"><Loader2 className="animate-spin mr-2" /> Loading…</div>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.length === 0 && (
                <div className="text-blue-400 text-center py-10 text-xl">No orders yet.<br />Place your first order!</div>
              )}
              {orders.map(order => (
                <div key={order.id} className="rounded-2xl p-5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-[#222a38] dark:to-[#232b3a] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-2 border border-blue-100 dark:border-[#232a36]">
                  <div>
                    <div className="font-bold text-[#0061ff] dark:text-blue-200 flex items-center gap-2">
                      {PLATFORMS.find(p => p.name === order.platform)?.icon || <UserCircle size={19} />}
                      {order.platform}
                      <span className="font-normal text-base text-blue-400 ml-2">{order.service}</span>
                    </div>
                    <div className="text-xs text-blue-400">Qty: {order.quantity} • {new Date(order.created_at).toLocaleString()}</div>
                  </div>
                  <div className="font-extrabold text-[#e64eb7] dark:text-pink-300 text-xl">${(PLATFORMS.find(p => p.name === order.platform)?.services.find(s => s.type === order.service)?.price * order.quantity).toFixed(2)}</div>
                  <div className={`rounded-full px-4 py-1 text-xs font-extrabold ${order.status === "Completed"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {order.status}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---- PROFILE/ACCOUNT ---- */}
          <div className="mt-12 mb-2">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><UserCircle className="text-[#0061ff]" /> Account</h3>
            <input
              type="email"
              className="border-2 border-blue-100 dark:border-[#232a36] px-3 py-2 rounded-xl mb-2 w-full bg-white dark:bg-[#232b36] text-lg font-medium"
              value={newEmail || profileEmail}
              onChange={e => setNewEmail(e.target.value)}
            />
            <button onClick={handleEmailChange} className="bg-gradient-to-r from-[#007bff] to-[#36c9f6] text-white px-4 py-2 rounded-lg font-extrabold shadow mt-2">
              Update Email
            </button>
            <input
              type="password"
              placeholder="New Password"
              value={passwordData.new}
              onChange={e => setPasswordData({ ...passwordData, new: e.target.value })}
              className="border-2 border-blue-100 dark:border-[#232a36] px-3 py-2 rounded-xl mt-5 w-full bg-white dark:bg-[#232b36] text-lg font-medium"
            />
            <button onClick={handlePasswordChange} className="bg-gradient-to-r from-[#e64eb7] to-[#ffb2fc] text-white px-4 py-2 rounded-lg font-extrabold shadow mt-2">
              Update Password
            </button>
          </div>
        </section>
      </div>

      {/* AI Bot */}
      <AiBot />

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        body { font-family: 'Inter', sans-serif; }
        .dark body { background: #10151d !important; color: #eee !important; }
        ::selection { background: #99e4ff; }
        .animate-pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity:.6; } 50% { opacity:1; } }
        /* Hide number input arrows */
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
    </main>
  );
}
