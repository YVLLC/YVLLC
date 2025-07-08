// pages/dashboard.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface Order {
  id: string;
  service: string;
  quantity: number;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [editingProfile, setEditingProfile] = useState(false);
  const [analytics, setAnalytics] = useState({ total: 0, completed: 0 });

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
      setUserEmail(email);

      const { data: allOrders, error } = await supabase
        .from("orders")
        .select("id, service, quantity, status, created_at")
        .eq("email", email)
        .order("created_at", { ascending: false });

      if (!error && allOrders) {
        const completed = allOrders.filter((o) => o.status === "Completed");
        setOrders(allOrders.filter((o) => o.status !== "Completed"));
        setCompletedOrders(completed);
        setAnalytics({ total: allOrders.length, completed: completed.length });
      }
      setLoading(false);
    };
    fetchUserAndOrders();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const downloadInvoice = (orderId: string) => {
    const blob = new Blob([`Invoice for Order ID: ${orderId}`], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoice-${orderId}.pdf`;
    link.click();
  };

  const TabContent = () => {
    if (loading) return <p>Loading...</p>;

    switch (activeTab) {
      case "orders":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Active Orders</h3>
            {orders.length === 0 ? (
              <p className="text-[#666]">No active orders found.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 bg-[#F0F8FF] border border-[#CFE4FF] rounded-lg shadow-sm">
                    <div className="flex justify-between text-sm">
                      <span><strong>Service:</strong> {order.service}</span>
                      <span><strong>Qty:</strong> {order.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span><strong>Status:</strong> {order.status}</span>
                      <span><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "completed":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Completed Orders</h3>
            {completedOrders.length === 0 ? (
              <p className="text-[#666]">No completed orders found.</p>
            ) : (
              <div className="space-y-4">
                {completedOrders.map((order) => (
                  <div key={order.id} className="p-4 bg-white border border-green-200 rounded-lg shadow-sm">
                    <div className="flex justify-between text-sm">
                      <span><strong>Service:</strong> {order.service}</span>
                      <span><strong>Qty:</strong> {order.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span><strong>Status:</strong> ✅ {order.status}</span>
                      <span><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-end gap-3 mt-2">
                      <button
                        className="text-sm px-3 py-1 rounded bg-[#007BFF] text-white hover:bg-[#005FCC]"
                        onClick={() => alert(`Reordering service: ${order.service}`)}
                      >
                        Reorder
                      </button>
                      <button
                        className="text-sm px-3 py-1 rounded bg-[#FACC15] text-black hover:bg-yellow-400"
                        onClick={() => downloadInvoice(order.id)}
                      >
                        Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "profile":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Profile</h3>
            <p className="text-sm text-[#333] mb-2">Logged in as: <strong>{userEmail}</strong></p>
            {editingProfile ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="border border-[#CFE4FF] p-2 rounded w-full"
                  placeholder="Enter your display name"
                />
                <button
                  onClick={() => setEditingProfile(false)}
                  className="bg-[#007BFF] text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-[#666] mb-2">Display name: {profileName || "(not set)"}</p>
                <button
                  onClick={() => setEditingProfile(true)}
                  className="text-sm text-[#007BFF] underline"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        );
      case "security":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
            <p className="text-sm text-[#666] mb-4">Secure your account</p>
            <button className="bg-[#007BFF] text-white px-4 py-2 rounded mb-2">
              Reset Password
            </button>
            <br />
            <button className="bg-[#22C55E] text-white px-4 py-2 rounded">
              Enable 2FA (Coming Soon)
            </button>
          </div>
        );
      case "analytics":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Your Analytics</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#E6F0FF] border border-[#CFE4FF] p-4 rounded-lg text-center">
                <h4 className="text-lg font-semibold">Total Orders</h4>
                <p className="text-2xl font-bold text-[#007BFF]">{analytics.total}</p>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                <h4 className="text-lg font-semibold">Completed</h4>
                <p className="text-2xl font-bold text-green-600">{analytics.completed}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-[#111]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="YesViral Logo" width={32} height={32} />
            <h1 className="text-2xl font-extrabold text-[#007BFF]">Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-white bg-[#EF4444] hover:bg-red-600 px-4 py-2 rounded-xl shadow"
          >
            Log Out
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 bg-white p-4 rounded-xl border border-[#CFE4FF] shadow-sm">
            <div className="flex flex-col space-y-2">
              {[
                ["orders", "Orders"],
                ["completed", "Completed Orders"],
                ["analytics", "Analytics"],
                ["profile", "Profile"],
                ["security", "Security"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`text-left px-4 py-2 rounded-lg transition font-medium ${
                    activeTab === key
                      ? "bg-[#007BFF] text-white"
                      : "hover:bg-[#E6F0FF] text-[#111]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white p-6 rounded-xl border border-[#CFE4FF] shadow-sm">
            <TabContent />
          </div>
        </div>
      </div>
    </main>
  );
}
