import { useState } from "react";
import axios from "axios";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/track", { orderId });
      setStatus(res.data.status || "Unknown");
    } catch (err: any) {
      console.error(err);
      setError("Could not find order. Make sure the ID is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-center mb-6">Track Your Order</h1>
      <form onSubmit={handleTrack} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
          className="w-full px-4 py-2 border border-[#CFE4FF] rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-[#007BFF] text-white py-2 rounded-lg hover:bg-[#005FCC]"
        >
          {loading ? "Tracking..." : "Track Order"}
        </button>
      </form>

      {status && (
        <div className="mt-6 p-4 bg-[#E6F0FF] text-[#005FCC] rounded-lg text-center">
          <p className="font-semibold">Status:</p>
          <p className="text-xl">{status}</p>
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-500 text-center">{error}</p>
      )}
    </main>
  );
}
