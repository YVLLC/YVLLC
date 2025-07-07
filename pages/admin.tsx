import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import OrderCard from "@/components/OrderCard";

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/admin/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data.orders || []);
        setAuthorized(true);
      } catch (err) {
        console.error("Not authorized or error:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-[#444] text-sm">Loading admin dashboard...</p>
      </main>
    );
  }

  if (!authorized) return null;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#007BFF]">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-[#EF4444] text-white px-4 py-2 rounded-lg hover:bg-[#dc2626] text-sm"
        >
          Log Out
        </button>
      </div>

      {orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order: any) => (
            <OrderCard
              key={order._id}
              orderId={order.orderId}
              service={order.service}
              usernameOrLink={order.link}
              quantity={order.quantity}
              status={order.status}
              createdAt={order.createdAt}
            />
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </main>
  );
}
