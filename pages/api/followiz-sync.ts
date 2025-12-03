// path: pages/api/followiz-sync.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import https from "https"; // <— REQUIRED FOR SSL BYPASS
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY;
    if (!FOLLOWIZ_API_KEY) {
      return res.status(500).json({ error: "Missing Followiz API key" });
    }

    // Get all orders that are not completed
    const { data: orders, error } = await supabase
      .from("orders")
      .select("id, followiz_order_id")
      .neq("status", "completed")
      .not("followiz_order_id", "is", null);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Supabase failed" });
    }

    if (!orders || orders.length === 0) {
      return res.status(200).json({ message: "No orders to sync" });
    }

    // Loop through orders
    for (const order of orders) {
      try {
        const followizRes = await axios.get(
          "https://followizaddons.com/api/v2/status",
          {
            params: {
              key: FOLLOWIZ_API_KEY,
              order: order.followiz_order_id,
            },
            httpsAgent: new https.Agent({
              rejectUnauthorized: false, // 🔥 FIX FOR FOLLOWIZ EXPIRED SSL
            }),
          }
        );

        const fw = followizRes.data;
        const status = (fw.status || "").toLowerCase();

        await supabase
          .from("orders")
          .update({ status })
          .eq("id", order.id);

      } catch (err: any) {
        console.error(
          `Followiz API error for order ${order.followiz_order_id}:`,
          err
        );
      }
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error("Sync error:", e);
    return res.status(500).json({ error: "Sync failed" });
  }
}
