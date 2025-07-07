import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import OrderCard from "@/components/OrderCard";

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Check token on mount
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
      } catch (err) {
        console.error("Unauthorized or error:", err);
        localStorage.removeItem("token");
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

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="grid gap-4">
          {orders.length > 0 ? (
            orders.map((order: any) => (
              <OrderCard
                key={order._id}
                orderId={order.orderId}
                service={order.service}
                usernameOrLink={order.link}
                quantity={order.quantity}
                status={order.status}
                createdAt={order.createdAt}
              />
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      )}
    </main>
  );
}
