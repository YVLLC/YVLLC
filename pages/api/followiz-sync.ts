// path: pages/api/followiz-sync.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Supabase admin client (SERVICE ROLE)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY;
    if (!FOLLOWIZ_API_KEY) {
      console.error("Missing FOLLOWIZ_API_KEY");
      return res.status(500).json({ error: "Missing Followiz API key" });
    }

    // 1. Get all orders that are NOT completed
    const { data: orders, error } = await supabase
      .from("orders")
      .select("id, followiz_order_id")
      .neq("status", "completed")
      .not("followiz_order_id", "is", null);

    if (error) {
      console.error("Supabase fetch error:", error);
      return res.status(500).json({ error: "Failed to load orders" });
    }

    if (!orders || orders.length === 0) {
      return res.status(200).json({ message: "No orders to sync" });
    }

    // 2. For each order, call Followiz
    for (const order of orders) {
      try {
        const followizRes = await axios.get(
          `https://followizaddons.com/api/v2/status`,
          {
            params: {
              key: FOLLOWIZ_API_KEY,
              order: order.followiz_order_id
            }
          }
        );

        const fw = followizRes.data;
        const status = (fw.status || "").toLowerCase();

        // Update order in Supabase
        await supabase
          .from("orders")
          .update({ status })
          .eq("id", order.id);

      } catch (err) {
        console.error(`Followiz API error for order ${order.followiz_order_id}:`, err);
      }
    }

    return res.status(200).json({ updated: true });
  } catch (e) {
    console.error("Sync API error:", e);
    return res.status(500).json({ error: "Sync failed" });
  }
}
