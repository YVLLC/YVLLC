// path: pages/api/sync-orders.js
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

// --- Supabase server client (SERVICE ROLE KEY — server-side ONLY) ---
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Followiz API key
const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY;

// Map Followiz raw status -> dashboard status
function mapFollowizStatus(raw) {
  if (!raw) return "processing";
  const s = String(raw).toLowerCase();

  if (s.includes("completed")) return "Completed";
  if (s.includes("partial")) return "Partial";
  if (s.includes("cancel")) return "Canceled";
  if (s.includes("in progress") || s.includes("processing") || s.includes("pending"))
    return "Processing";

  return "Processing";
}

export default async function handler(req, res) {
  // Only allow POST for now
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!FOLLOWIZ_API_KEY) {
    console.error("❌ Missing FOLLOWIZ_API_KEY env var");
    return res.status(500).json({ error: "Followiz API key not configured" });
  }

  try {
    // 1) Get all orders that are NOT completed/canceled and have a Followiz ID
    const { data: orders, error: fetchErr } = await supabase
      .from("orders")
      .select("id, followiz_order_id, status")
      .not("followiz_order_id", "is", null)
      .in("status", ["processing", "Processing", "Pending", "In Progress"]);

    if (fetchErr) {
      console.error("❌ Supabase fetch error:", fetchErr);
      return res.status(500).json({ error: "Failed to load orders" });
    }

    if (!orders || orders.length === 0) {
      return res.status(200).json({ updated: 0, message: "No active orders to sync." });
    }

    let updatedCount = 0;
    const errors = [];

    // 2) Loop through each order and ask Followiz for its current status
    for (const order of orders) {
      try {
        const params = new URLSearchParams({
          key: FOLLOWIZ_API_KEY,
          action: "status",
          order: String(order.followiz_order_id),
        });

        const followizRes = await axios.post("https://followiz.com/api/v2", params);
        const data = followizRes.data;

        const newStatus = mapFollowizStatus(data.status);

        // Skip if status didn't change
        if (newStatus === order.status) continue;

        // 3) Update this order in Supabase
        const { error: updateErr } = await supabase
          .from("orders")
          .update({ status: newStatus })
          .eq("id", order.id);

        if (updateErr) {
          console.error("❌ Supabase update error:", updateErr);
          errors.push({ id: order.id, error: updateErr.message });
          continue;
        }

        updatedCount++;
      } catch (err) {
        console.error(
          "❌ Followiz status check failed for order",
          order.id,
          ":",
          err.response?.data || err.message || err
        );
        errors.push({
          id: order.id,
          error: err.response?.data || err.message || String(err),
        });
      }
    }

    return res.status(200).json({
      updated: updatedCount,
      totalChecked: orders.length,
      errors,
    });
  } catch (err) {
    console.error("❌ sync-orders fatal error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
