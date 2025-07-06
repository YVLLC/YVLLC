import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import OrderCard from "@/components/OrderCard";

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/admin/orders");
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Not authorized or error:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
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
