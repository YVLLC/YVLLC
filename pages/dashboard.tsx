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
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [editingProfile, setEditingProfile] = useState(false);
  const [analytics, setAnalytics] = useState({ total: 0, completed: 0 });
  const [selectedService, setSelectedService] = useState(availableServices[0].name);
  const [quantity, setQuantity] = useState(100);

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

  const placeOrder = async () => {
    const selected = availableServices.find(s => s.name === selectedService);
    const amount = (selected?.price || 0) * quantity;

    alert(`Checkout Ready: \nService: ${selectedService}\nQty: ${quantity}\nAmount: $${amount.toFixed(2)}`);

    // Here you'd trigger Stripe Checkout or JAP API
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
        <div>
          <h3 className="text-xl font-semibold mb-4">Order Social Media Services</h3>
          <div className="space-y-4">
            <label className="block text-sm font-medium">Choose Service:</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full p-2 border border-[#CFE4FF] rounded"
            >
              {availableServices.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name} — ${service.price.toFixed(2)} per unit
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full p-2 border border-[#CFE4FF] rounded"
              min={10}
            />

            <div className="mt-4">
              <button
                onClick={placeOrder}
                className="bg-[#007BFF] text-white px-6 py-3 rounded font-semibold hover:bg-[#005FCC]"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null; // Other tab content is unchanged for brevity
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
          <div className="w-full md:w-1/4 bg-white p-4 rounded-xl border border-[#CFE4FF] shadow-sm">
            <div className="flex flex-col space-y-2">
              {[
                ["orders", "Orders"],
                ["completed", "Completed Orders"],
                ["services", "Services"],
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

          <div className="flex-1 bg-white p-6 rounded-xl border border-[#CFE4FF] shadow-sm">
            <TabContent />
          </div>
        </div>
      </div>
    </main>
  );
}
