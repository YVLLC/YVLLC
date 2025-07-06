import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { service, quantity, link, price } = router.query;

  const handleCheckout = async () => {
    if (!service || !quantity || !link || !price) {
      setError("Missing required checkout details.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/checkout", {
        service,
        quantity,
        link,
        price,
      });

      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        setError("Could not start checkout session.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Error starting payment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (service && quantity && link && price) {
      handleCheckout();
    }
  }, [service, quantity, link, price]);

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">Preparing Your Checkout...</h1>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {loading && <p className="text-sm text-gray-500">Redirecting to Stripe...</p>}
      </div>
    </main>
  );
}
