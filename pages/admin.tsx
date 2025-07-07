import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import OrderCard from "@/components/OrderCard";

interface Order {
  id: string;
  orderId: string;
  service: string;
  link: string;
  quantity: number;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetchOrders = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Session error:", sessionError.message);
        router.push("/login");
        return;
      }

      if (!session?.user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("createdAt", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error.message);
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    };

    checkAuthAndFetchOrders();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
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
