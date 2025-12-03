// pages/api/followiz-sync.ts
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // REQUIRED to update rows
    );

    const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY!;
    if (!FOLLOWIZ_API_KEY) {
      return res.status(500).json({ error: "Missing FOLLOWIZ_API_KEY" });
    }

    // Get all orders still processing or in-progress
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .in("status", ["processing", "in_progress"]);

    if (error) throw error;

    if (!orders || orders.length === 0) {
      return res.status(200).json({ message: "No orders need updating" });
    }

    let updatedCount = 0;

    for (const order of orders) {
      if (!order.followiz_order_id) continue;

      const url = `https://followiz.com/api/v2/?key=${FOLLOWIZ_API_KEY}&action=status&order=${order.followiz_order_id}`;

      let fw;
      try {
        fw = await fetch(url).then((r) => r.json());
      } catch (err) {
        console.error("Followiz error:", err);
        continue;
      }

      // Map Followiz → YesViral status
      const fwStatus = fw.status?.toLowerCase();
      const mapped =
        fwStatus === "completed"
          ? "completed"
          : fwStatus === "in progress"
          ? "in_progress"
          : fwStatus === "processing"
          ? "processing"
          : fwStatus === "partial"
          ? "partial"
          : fwStatus === "canceled"
          ? "canceled"
          : "processing";

      const { error: updateError } = await supabase
        .from("orders")
        .update({
          status: mapped,
          start_count: fw.start_count || order.start_count || null,
          remains: fw.remains || order.remains || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      if (updateError) {
        console.error("Supabase update error:", updateError);
        continue;
      }

      updatedCount++;
    }

    return res
      .status(200)
      .json({ message: "Sync complete", updated: updatedCount });
  } catch (err) {
    console.error("SYNC ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
