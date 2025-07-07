import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import OrderCard from "@/components/OrderCard";

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

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
        setCheckedAuth(true);
      } catch (err) {
        console.error("Auth failed:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (!checkedAuth && loading) {
    return <div className="text-center mt-10">Checking login...</div>;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => {
            localStorage.removeItem("admin_token");
            router.push("/login");
          }}
        >
          Log Out
        </button>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
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
