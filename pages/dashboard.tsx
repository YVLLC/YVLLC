// pages/dashboard.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RgpcCRfq6GJQepR3xUT0RkiGdN8ZSRu3OR15DfKhpMNj5QgmysYrmGQ8rGCXiI6Vi3B2L5Czmf7cRvIdtKRrSOw00SaVptcQt");

interface Order {
  id: string;
  service: string;
  quantity: number;
  status: string;
  created_at: string;
}

const availableServices = [
  { name: "YouTube Subscribers", price: 0.12 },
  { name: "YouTube Views", price: 0.05 },
  { name: "TikTok Followers", price: 0.10 },
  { name: "TikTok Likes", price: 0.08 },
  { name: "Instagram Followers", price: 0.09 },
  { name: "Instagram Likes", price: 0.07 },
  { name: "Instagram Views", price: 0.04 },
];

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [activeTab, setActiveTab] = useState("services");
  const [orders, setOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileEmail, setProfileEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [passwordData, setPasswordData] = useState({ current: "", new: "" });
  const [analytics, setAnalytics] = useState({ total: 0, completed: 0 });
  const [selectedService, setSelectedService] = useState(availableServices[0].name);
  const [quantity, setQuantity] = useState(100);

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (!session || !session.user) {
        router.push("/login");
        return;
      }

      const email = session.user.email || "";
      const id = session.user.id;
      setUserEmail(email);
      setUserId(id);
      setProfileEmail(email);

      const { data: allOrders } = await supabase
        .from("orders")
        .select("id, service, quantity, status, created_at")
        .eq("email", email)
        .order("created_at", { ascending: false });

      if (allOrders) {
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

  const placeOrder = async () => {
    const selected = availableServices.find((s) => s.name === selectedService);
    const amount = (selected?.price || 0) * quantity;

    const stripe = await stripePromise;
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: { name: selectedService },
            unit_amount: Math.round((selected?.price || 0) * 100),
          },
          quantity,
        }],
        metadata: { email: userEmail, service: selectedService, quantity }
      })
    });

    const session = await res.json();
    if (session.id) {
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } else {
      toast.error("Stripe session creation failed");
    }
  };

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

  const TabContent = () => {
    if (loading) return <p>Loading...</p>;

    if (activeTab === "services") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#111]">Buy Followers, Likes & Views</h2>
          <p className="text-[#555] text-sm">Choose your platform, customize your order, and checkout instantly. Trusted delivery.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {availableServices.map((service) => {
              const isSelected = selectedService === service.name;
              return (
                <div
                  key={service.name}
                  onClick={() => setSelectedService(service.name)}
                  className={`cursor-pointer border rounded-2xl p-4 shadow-sm transition hover:shadow-md ${
                    isSelected ? "border-[#007BFF] bg-[#E6F0FF]" : "border-[#CFE4FF] bg-white"
                  }`}
                >
                  <h4 className="text-lg font-semibold mb-1">{service.name}</h4>
                  <p className="text-sm text-[#666] mb-2">${service.price.toFixed(2)} per unit</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={10}
                      value={isSelected ? quantity : 100}
                      onChange={(e) => isSelected && setQuantity(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-[#CFE4FF] rounded-md text-sm"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedService(service.name);
                        placeOrder();
                      }}
                      className="bg-[#007BFF] text-white text-sm px-4 py-2 rounded hover:bg-[#005FCC]"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (activeTab === "profile") {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-2">Change Email</h3>
            <input
              type="email"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border px-3 py-2 rounded-md mr-2"
            />
            <button onClick={handleEmailChange} className="bg-[#007BFF] text-white px-4 py-2 rounded">
              Update Email
            </button>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Change Password</h3>
            <input
              type="password"
              placeholder="New Password"
              value={passwordData.new}
              onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
              className="border px-3 py-2 rounded-md mr-2"
            />
            <button onClick={handlePasswordChange} className="bg-[#007BFF] text-white px-4 py-2 rounded">
              Update Password
            </button>
          </div>
        </div>
      );
    }

    return <p className="text-sm">Select a tab</p>;
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-[#111]">
      <Toaster position="top-right" />
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
          <div className="w-full md:w-1/4 bg-white p-4 rounded-xl border border-[#CFE4FF] shadow-sm">
            <div className="flex flex-col space-y-2">
              {["services", "orders", "completed", "analytics", "profile", "security"].map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`text-left px-4 py-2 rounded-lg transition font-medium ${
                    activeTab === key ? "bg-[#007BFF] text-white" : "hover:bg-[#E6F0FF] text-[#111]"
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-white p-6 rounded-xl border border-[#CFE4FF] shadow-sm">
            <TabContent />
          </div>
        </div>
      </div>
    </main>
  );
}